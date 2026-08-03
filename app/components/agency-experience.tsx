"use client";

import { useEffect } from "react";
import Image from "next/image";
import { NativeLink as Link } from "./native-link";
import { SiteFooter, SiteHeader } from "./site";

const clients=[
  {name:"Globus Medical",logo:"/clients/globus-medical.png",width:1005,height:219,tag:"PRODUCTION · MEDICAL DEVICES",summary:"A 5,000-user, fully on-prem deployment with cited outputs, customer-controlled infrastructure, and human review retained.",metric:"4–5×",metricLabel:"reported review acceleration",facts:["5,000 users","Fully on-prem","Customer-reported"]},
  {name:"Dubai CommerCity",logo:"/clients/dubai-commercity.svg",width:196,height:35,tag:"PRODUCTION · UAE PUBLIC COMMERCE",summary:"A production service for founders, available around the clock and constrained to approved official sources.",metric:"5–6×",metricLabel:"reported onboarding speed",facts:["24/7 service","Official sources","Customer-reported"]},
  {name:"Micron",logo:"/clients/micron.png",width:600,height:150,tag:"PAID METHOD PROOF · SEMICONDUCTOR",summary:"A specialist engineering-optimization method was tested on held-out cases inside a controlled engagement. The exact workflow remains intentionally masked.",metric:"70%",metricLabel:"held-out benchmark wins",facts:["10 held-out cases","57% fewer median steps","Not a production claim"]}
];

const products=[
  {n:"01",eyebrow:"ENTERPRISE SEARCH · GROUNDED MODE",title:"Just ask, in plain English.",body:"Grounded-answer mode routes each question across permissioned company knowledge, attributes the sources it uses, and can refuse when evidence is insufficient.",stat:"CITED",statLabel:"grounded-answer mode",image:"/product/enterprise-search.webp",width:2200,height:1365,href:"/platform/know"},
  {n:"02",eyebrow:"ENTERPRISE SEARCH · DATABASE MODE",title:"From a question to a chart.",body:"Describe the number you need. The agent can prepare and run an approved query against a connected database, visualise the result, and export it under the deployed control model.",stat:"LIVE",statLabel:"connected database",image:"/product/database-mode.webp",width:2200,height:1407,href:"/platform/know"},
  {n:"03",eyebrow:"AGENT BUILDER",title:"Agents that take action.",body:"Connect approved systems, tools, and specialist agents in a visual workflow. Human approvals stay exactly where the business requires them.",stat:"HITL",statLabel:"approval gates",image:"/product/agent-builder.webp",width:2200,height:1323,href:"/platform/build"},
  {n:"04",eyebrow:"AI WORKSPACE",title:"One place for every agent.",body:"Assistants, governed workflows, and digital experts—published and managed inside one enterprise workspace.",stat:"ONE",statLabel:"governed workspace",image:"/product/ai-workspace.webp",width:2200,height:1816,href:"/platform/work"}
];

const clamp=(v:number)=>Math.max(0,Math.min(1,v));
function AgencyMotion(){
  useEffect(()=>{
    const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile=innerWidth<800;
    const reveals=[...document.querySelectorAll<HTMLElement>("[data-agency-reveal]")];
    const io=new IntersectionObserver(es=>es.forEach(e=>{
      if(e.isIntersecting){
        (e.target as HTMLElement).classList.add("is-in");
        io.unobserve(e.target);
      }
    }),{threshold:.12,rootMargin:"0px 0px -40px"});
    reveals.forEach(x=>io.observe(x));

    const horizontals=[...document.querySelectorAll<HTMLElement>("[data-agency-horizontal]")];
    const architectures=[...document.querySelectorAll<HTMLElement>("[data-agency-architecture]")];
    let raf=0;
    const frame=()=>{
      horizontals.forEach(section=>{
          const r=section.getBoundingClientRect();
          const p=clamp(-r.top/Math.max(1,r.height-innerHeight));
          const stage=section.querySelector<HTMLElement>("[data-agency-stage]");
          const track=section.querySelector<HTMLElement>("[data-agency-track]");
          if(!stage||!track)return;
          const max=Math.max(0,track.scrollWidth-stage.clientWidth);
          track.style.transform=mobile||reduced?"none":`translate3d(${-p*max}px,0,0)`;
          section.style.setProperty("--agency-p",String(p));
          const counter=!mobile?section.querySelector<HTMLElement>("[data-product-counter]"):null;
          const count=track.children.length;
          if(counter&&count){
            const current=Math.min(count,Math.round(p*(count-1))+1);
            counter.textContent=`${String(current).padStart(2,"0")} / ${String(count).padStart(2,"0")}`;
            counter.setAttribute("aria-label",`Product chapter ${current} of ${count}`);
          }
          if(!mobile){
            section.querySelector<HTMLElement>("[data-product-progress]")?.setAttribute("aria-valuenow",String(Math.round(p*100)));
          }
      });
      architectures.forEach(section=>{
          const r=section.getBoundingClientRect();
          const p=clamp((innerHeight*.65-r.top)/Math.max(1,r.height+innerHeight*.3));
          section.style.setProperty("--arch-p",String(reduced?1:p));
      });
    };
    const mark=()=>{if(!raf)raf=requestAnimationFrame(()=>{raf=0;frame()})};
    addEventListener("scroll",mark,{passive:true});
    addEventListener("resize",mark,{passive:true});

    const carouselCleanups:(()=>void)[]=[];
    if(mobile){
      document.querySelectorAll<HTMLElement>("[data-mobile-carousel]").forEach(track=>{
        const section=track.closest<HTMLElement>("section");
        const name=track.dataset.mobileCarousel;
        const items=[...track.children] as HTMLElement[];
        if(!section||!name||items.length<2)return;

        const counter=section.querySelector<HTMLElement>(`[data-${name}-counter]`);
        const progress=section.querySelector<HTMLElement>(`[data-${name}-progress]`);
        const previous=section.querySelector<HTMLButtonElement>(`[data-${name}-previous]`);
        const next=section.querySelector<HTMLButtonElement>(`[data-${name}-next]`);
        let current=0;
        let scrollRaf=0;

        const update=()=>{
          scrollRaf=0;
          const left=track.scrollLeft;
          current=items.reduce((best,item,index)=>
            Math.abs(item.offsetLeft-left)<Math.abs(items[best].offsetLeft-left)?index:best,0);
          if(counter){
            counter.textContent=`${String(current+1).padStart(2,"0")} / ${String(items.length).padStart(2,"0")}`;
            counter.setAttribute("aria-label",`${name} slide ${current+1} of ${items.length}`);
          }
          const value=Math.round(((current+1)/items.length)*100);
          if(progress){
            progress.style.setProperty("--carousel-p",String(value/100));
            progress.setAttribute("aria-valuenow",String(value));
          }
        };
        const requestUpdate=()=>{
          if(!scrollRaf)scrollRaf=requestAnimationFrame(update);
        };
        const goTo=(index:number)=>{
          current=(index+items.length)%items.length;
          track.scrollTo({left:items[current].offsetLeft,behavior:reduced?"auto":"smooth"});
          requestUpdate();
        };
        const goPrevious=()=>goTo(current-1);
        const goNext=()=>goTo(current+1);

        track.addEventListener("scroll",requestUpdate,{passive:true});
        previous?.addEventListener("click",goPrevious);
        next?.addEventListener("click",goNext);
        update();

        carouselCleanups.push(()=>{
          cancelAnimationFrame(scrollRaf);
          track.removeEventListener("scroll",requestUpdate);
          previous?.removeEventListener("click",goPrevious);
          next?.removeEventListener("click",goNext);
        });
      });
    }

    mark();
    return()=>{
      cancelAnimationFrame(raf);
      removeEventListener("scroll",mark);
      removeEventListener("resize",mark);
      io.disconnect();
      carouselCleanups.forEach(cleanup=>cleanup());
    };
  },[]);
  return null;
}

function AgencyHero(){return <section className="agency-hero"><div className="agency-hero-copy"><p>CORPORATE GPT · ADAPTIVE ENTERPRISE INTELLIGENCE</p><h1>Own the intelligence<br/>that runs <em>your enterprise.</em></h1><span>Company-specific AI built from your knowledge, workflows, and expert methods—operated inside your stack and improved only through approved outcomes.</span><div className="agency-actions"><Link href="/briefing">Design the enterprise mandate</Link><Link href="/proof">Inspect the evidence ↗</Link></div><div className="agency-hero-stats"><b>5,000 <span>reported users fully on-prem</span></b><b>70% <span>paid method proof; not production</span></b><b>24/7 <span>reported production availability</span></b></div></div><div className="sovereign-object" role="img" aria-label="Corporate GPT places AI assistants, governed agents, and digital experts inside a customer-controlled boundary"><div className="object-boundary"><span>YOUR ENTERPRISE BOUNDARY</span><div className="object-ring ring-a"><i>AI ASSISTANTS</i></div><div className="object-ring ring-b"><i>GOVERNED AGENTS</i></div><div className="object-ring ring-c"><i>DIGITAL EXPERTS</i></div><div className="object-core"><Image src="/brand/neurologic-logogram-white.png" alt="" width={150} height={134} priority/><b>CORPORATE GPT</b><small>OWNED INTELLIGENCE</small></div><p>AUTHORITY NEVER EXPANDS BY ITSELF</p></div></div><div className="mobile-scroll-cue" aria-hidden="true"><span>Scroll to enter the system</span><i/></div></section>}

function IntelligenceLevels(){const levels=[
  {n:"01",status:"LIVE PRODUCT",title:"AI Assistants",audience:"EVERY EMPLOYEE",body:"Cited answers, analysis, drafting, and enterprise search across the sources each person is already permitted to use.",outcome:"Knowledge becomes available at the moment of work."},
  {n:"02",status:"ACTIVATION DELIVERABLE",title:"Governed Agents",audience:"EVERY FUNCTION",body:"Multi-step workflows that use approved tools, pause at human authority gates, and leave a reconstructable audit trail.",outcome:"Recurring work becomes reliable operating capacity."},
  {n:"03",status:"METHOD PROVEN · ACTIVATION",title:"Digital Experts",audience:"CRITICAL DOMAINS",body:"Specialist methods encoded, benchmarked on held-out work, and promoted only when domain owners accept the evidence.",outcome:"Expert judgment becomes a versioned enterprise asset."}
];return <section className="intelligence-levels" id="intelligence-levels"><div className="agency-section-head" data-agency-reveal><div><p>ONE PLATFORM · THREE LEVELS</p><h2>Start useful.<br/>Become <em>institutional.</em></h2></div><span>Corporate GPT grows from individual assistance to governed action to domain-specific expertise—without changing identity, evidence, authority, or audit systems.</span></div><div className="intelligence-level-grid">{levels.map(level=><article key={level.n} data-agency-reveal><div><span>{level.n}</span><small>{level.status}</small></div><p>{level.audience}</p><h3>{level.title}</h3><span>{level.body}</span><b>{level.outcome}</b></article>)}</div><div className="shared-foundation" data-agency-reveal><span>SHARED ENTERPRISE FOUNDATION</span>{["Identity & permissions","Enterprise context","Model & tool policy","Evaluation & authority","Audit & rollback"].map(item=><b key={item}>{item}</b>)}</div></section>}

export function ClientProof({expanded=false}:{expanded?:boolean}){return <section className={`client-proof ${expanded?"expanded":""}`}><div className="agency-section-head" data-agency-reveal><div><p>STATUS-LABELED EVIDENCE</p><h2>Proof where the reviews <em>are hardest.</em></h2></div><span>Production outcomes and paid method proofs are labeled separately. Benchmark details are shared; sensitive operating context is deliberately masked.</span></div><div className="mobile-client-guide"><span>Swipe through customer evidence</span><b data-clients-counter aria-live="polite">01 / 03</b></div><div className="client-case-grid" data-mobile-carousel="clients" role="region" aria-label="Customer evidence carousel" tabIndex={0}>{clients.map((c,i)=><article key={c.name} data-agency-reveal><div className="client-case-top"><span>0{i+1}</span><small>{c.tag}</small></div><div className="client-card-logo"><Image src={c.logo} alt={`${c.name} logo`} width={c.width} height={c.height} sizes="(max-width: 760px) 180px, 220px"/></div><h3>{c.name}</h3><p>{c.summary}</p><div className="client-metric"><strong>{c.metric}</strong><span>{c.metricLabel}</span></div><div className="client-facts">{c.facts.map(x=><b key={x}>{x}</b>)}</div>{expanded&&<Link href="/briefing">Discuss this evidence ↗</Link>}</article>)}</div><div className="mobile-client-progress" data-clients-progress role="progressbar" aria-label="Customer evidence progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={33}><i/></div></section>}

function ArchitectureStory(){const layers=[{name:"KNOW",desc:"Permitted enterprise truth and visible evidence",owner:"GROUND"},{name:"WORK",desc:"Assistants, workspaces, artifacts, and governed action",owner:"DELIVER"},{name:"LEARN",desc:"Memory, retrieval, procedures, and approved specialization",owner:"IMPROVE"},{name:"BUILD",desc:"Connectors, tools, skills, agents, and expert methods",owner:"REUSE"},{name:"TRUST",desc:"Identity, authority, evaluation, audit, and rollback",owner:"GOVERN"}];return <section className="architecture-story" data-agency-architecture><div className="architecture-copy" data-agency-reveal><p>FIVE SHARED CAPABILITIES</p><h2>Three levels.<br/><em>One governed stack.</em></h2><span>KNOW grounds the work. WORK carries it forward. LEARN improves accepted capability. BUILD makes it reusable. TRUST governs what every person and system may see, do, learn, and release.</span><Link href="/platform">Explore the operating system ↗</Link></div><div className="architecture-stack">{layers.map((x,i)=><div className={`arch-layer arch-${i}`} key={x.name} style={{"--layer":i} as React.CSSProperties}><span>0{i+1}</span><div><h3>{x.name}</h3><p>{x.desc}</p></div><b>{x.owner}</b></div>)}<small>ONE IDENTITY · ONE CONTEXT · ONE AUTHORITY MODEL</small></div></section>}

function ProductHorizontal(){return <section className="agency-horizontal" data-agency-horizontal><div className="agency-horizontal-stage" data-agency-stage><div className="product-story-head"><p>THE PRODUCT · REAL INTERFACES</p><h2>Ask anything. <em>Automate anything.</em></h2><span>Swipe or use the controls</span><b className="mobile-product-counter" data-product-counter aria-live="polite">01 / 04</b></div><div className="agency-product-track" data-agency-track data-mobile-carousel="product" role="region" aria-label="Corporate GPT product screens" tabIndex={0}>{products.map(p=><article key={p.n}><div className="product-panel-copy"><span>{p.n} / 04</span><small>{p.eyebrow}</small><h3>{p.title}</h3><p>{p.body}</p><div><strong>{p.stat}</strong><em>{p.statLabel}</em></div><Link href={p.href}>Explore this capability ↗</Link></div><div className="product-shot"><Image src={p.image} alt={`${p.title} Corporate GPT product interface`} width={p.width} height={p.height} sizes="(max-width: 760px) calc(100vw - 68px), 55vw"/></div></article>)}</div><div className="mobile-product-controls"><button type="button" data-product-previous aria-label="Previous product screen">←</button><button type="button" data-product-next aria-label="Next product screen">→</button></div><div className="agency-horizontal-progress" data-product-progress role="progressbar" aria-label="Product screen progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={25}><i/></div></div></section>}

function CorporateLLM(){return <section className="corporate-llm compounding-intelligence"><div className="agency-section-head" data-agency-reveal><div><p>WHY ADAPTIVE ENTERPRISE INTELLIGENCE</p><h2>Model access rents inference.<br/><em>AEI compounds capability.</em></h2></div><span>Frontier models improve for everyone. Corporate GPT compounds customer-specific memory, retrieval, procedures, tools, evaluation sets, and—where contracted—adapters inside the enterprise boundary.</span></div><div className="llm-equation" data-agency-reveal><div><span>MINUTES</span><h3>Memory</h3><p>Session, project, and organizational memory helps every task begin with context.</p></div><b>→</b><div><span>WEEKS</span><h3>Retrieval</h3><p>Approved outcomes improve which sources and procedures perform on your work.</p></div><b>→</b><div><span>PER RELEASE</span><h3>Specialization</h3><p>Expert methods and adapters are promoted only after held-out evaluation.</p></div><b>→</b><div className="owned"><span>THE RULE</span><h3>Nothing self-promotes.</h3><p>Every candidate must earn human authorization and remain reversible.</p></div></div></section>}

function AgentFlow(){return <section className="agent-flow"><div className="agency-section-head" data-agency-reveal><div><p>THE AUTHORITY CHAIN</p><h2>Capability increases.<br/><em>Authority never moves itself.</em></h2></div><span>Identity and source authority precede every step. Audit, evaluation, monitoring, and rollback follow every consequential outcome.</span></div><div className="flow-rail" data-agency-reveal><div><span>01</span><i>◎</i><h3>Evidence</h3><p>Material claims point to permitted sources. Insufficient evidence triggers abstention or escalation.</p></div><b>→</b><div><span>02</span><i>⌘</i><h3>Policy & scope</h3><p>Model routing, tool access, data paths, and action limits are explicit for the task.</p></div><b>→</b><div className="approval"><span>03</span><i>✓</i><h3>Human authority</h3><p>Consequential actions and capability promotion pause for the named decision owner.</p></div><b>→</b><div><span>04</span><i>↺</i><h3>Versioned release</h3><p>Accepted outcomes are attributable, monitored, and reversible through a defined rollback path.</p></div></div></section>}

function Economics(){return <section className="economics-proof"><div className="economics-card cost-card" data-agency-reveal><p>OWNED CAPACITY</p><h2>Success should raise utilization.<br/><em>Not the invoice.</em></h2><div className="cost-graph" role="img" aria-label="Illustrative comparison: usage-priced AI cost rises with accepted outcomes while committed enterprise capacity is governed as utilization"><span className="axis-y">TOTAL COST</span><span className="axis-x">ACCEPTED OUTCOMES →</span><i className="rent-line"/><i className="own-line"/><b className="rent-label">USAGE-PRICED AI · METER RISES</b><b className="own-label">COMMITTED CAPACITY · UTILIZATION RISES</b></div><p className="economics-copy">Meterless internal usage applies within the contracted capacity envelope. Routing, frontier escalation, infrastructure, and external spend caps remain explicit and governed.</p></div><div className="economics-card outcome-card" data-agency-reveal><p>THE CONTROLLING METRIC</p><h2>Cost per accepted outcome.<br/><em>One accountable equation.</em></h2><div className="outcome-equation" role="img" aria-label="Total governed cost divided by accepted business outcomes equals cost per accepted outcome"><div><span>CAPACITY</span><span>PLATFORM</span><span>OPERATIONS</span><span>HUMAN REVIEW</span></div><b>÷</b><strong>ACCEPTED<br/>OUTCOMES</strong><i>= COST / ACCEPTED OUTCOME</i></div><p className="economics-copy">Forecast the full cost, reconcile actuals, and govern variance. Customer-specific assumptions and exclusions are attached to the commercial model.</p></div></section>}

function DeploymentRail(){return <section className="deployment-rail"><div className="agency-section-head" data-agency-reveal><div><p>THE ACCEPTANCE CLOCK</p><h2>Every date is a test.<br/><em>Not a promise.</em></h2></div><span>One agreement can activate all three levels. Contracted milestones, dependencies, owners, and acceptance evidence govern each workstream.</span></div><div className="deployment-track" data-agency-reveal data-mobile-track role="region" aria-label="Activation acceptance milestones" tabIndex={0}><article><span>DAY 30</span><h3>Architecture & baselines accepted</h3><p>Approve the boundary, data paths, owners, initial evaluation sets, and the baseline for each outcome.</p></article><article><span>DAY 60</span><h3>Candidate workflows reviewed</h3><p>Put assistants and the first bounded workflow in front of the people who own the real work.</p></article><article><span>DAY 90</span><h3>First contracted evidence accepted</h3><p>Accept, remedy, or reject the first outcome against the evidence standard defined in the agreement.</p></article><article><span>MONTHS 4–12</span><h3>Expand accepted capability</h3><p>Promote only what earns authorization, then extend the pattern across teams and expert domains.</p></article></div></section>}

function AgencyCTA(){return <section className="agency-cta"><p>THE ENTERPRISE MANDATE</p><h2>Approve one mandate.<br/><em>Put three outcomes on the clock.</em></h2><div><span>Name the executive sponsor</span><span>Choose the deployment boundary</span><span>Agree what evidence will count</span></div><Link href="/briefing">Build the activation plan ↗</Link></section>}

export function AgencyHome(){return <div className="agency-site"><AgencyMotion/><SiteHeader/><main id="main"><AgencyHero/><IntelligenceLevels/><ClientProof/><ArchitectureStory/><ProductHorizontal/><CorporateLLM/><AgentFlow/><Economics/><DeploymentRail/><AgencyCTA/></main><SiteFooter/></div>}
