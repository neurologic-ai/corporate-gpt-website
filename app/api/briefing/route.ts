import { NextResponse } from "next/server";
import { createHash } from "node:crypto";

const MAX_BODY_BYTES = 32_000;
const REQUIRED_FIELDS = [
  "name",
  "email",
  "company",
  "role",
  "industry",
  "deployment",
  "outcome1",
  "outcome2",
  "outcome3",
  "evidence",
] as const;

type BriefingPayload = Record<string, unknown>;

function clean(value: unknown, maxLength = 1_200) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function buildMessage(payload: BriefingPayload) {
  const rows = [
    ["Name", clean(payload.name, 120)],
    ["Work email", clean(payload.email, 160)],
    ["Company", clean(payload.company, 160)],
    ["Role", clean(payload.role, 120)],
    ["Industry", clean(payload.industry, 120)],
    ["Deployment boundary", clean(payload.deployment, 160)],
    ["Outcome 1 — decision or deliverable", clean(payload.outcome1)],
    ["Outcome 2 — governed recurring work", clean(payload.outcome2)],
    ["Outcome 3 — scarce expertise", clean(payload.outcome3)],
    ["Systems and data", clean(payload.systems)],
    ["Accepted evidence", clean(payload.evidence)],
    ["Security or procurement constraints", clean(payload.constraints)],
  ];

  return rows.map(([label, value]) => `${label}:\n${value || "—"}`).join("\n\n");
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: "invalid_origin" }, { status: 403 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "request_too_large" }, { status: 413 });
  }

  let payload: BriefingPayload;
  try {
    payload = (await request.json()) as BriefingPayload;
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  if (clean(payload.website, 200)) {
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  const startedAt = Number(payload.startedAt);
  const elapsed = Date.now() - startedAt;
  if (!Number.isFinite(startedAt) || elapsed < 1_000 || elapsed > 86_400_000) {
    return NextResponse.json({ error: "invalid_submission_window" }, { status: 429 });
  }

  if (REQUIRED_FIELDS.some((field) => !clean(payload[field]))) {
    return NextResponse.json({ error: "missing_required_field" }, { status: 400 });
  }

  const email = clean(payload.email, 160);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.BRIEFING_FROM_EMAIL;
  const to = process.env.BRIEFING_TO_EMAIL;
  if (!apiKey || !from || !to) {
    return NextResponse.json({ error: "submission_service_unconfigured" }, { status: 503 });
  }

  const company = clean(payload.company, 160);
  const result = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": createHash("sha256").update(`${email}:${startedAt}`).digest("hex"),
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Corporate GPT enterprise briefing — ${company}`,
      text: buildMessage(payload),
    }),
  });

  if (!result.ok) {
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 202 });
}
