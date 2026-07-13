import { notFound } from "next/navigation";
import { pages } from "../content";
import { BriefingPage } from "../components/inner-page";
import { WorldPage } from "../components/world-pages";

export default async function CatchAll({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const key = slug.join("/");
  if (key === "briefing") return <BriefingPage/>;
  const page = pages[key];
  if (!page) notFound();
  return <WorldPage id={key} page={page}/>;
}
