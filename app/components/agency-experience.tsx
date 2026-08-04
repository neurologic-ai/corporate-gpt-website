"use client";

import { useEffect } from "react";
import Image from "next/image";
import type { SimpleIcon } from "simple-icons";
import {
  siAirtable,
  siBox,
  siDatabricks,
  siDropbox,
  siGithub,
  siGmail,
  siGoogledrive,
  siGoogle,
  siHubspot,
  siJira,
  siNotion,
  siOkta,
  siPostgresql,
  siSap,
  siSnowflake,
  siZendesk,
} from "simple-icons";
import { NativeLink as Link } from "./native-link";
import { SiteFooter, SiteHeader } from "./site";

const clients=[
  {name:"Micron",logo:"/clients/micron.png",width:600,height:150,tag:"SEMICONDUCTOR DIGITAL EXPERT",summary:"Company-specific intelligence optimized semiconductor circuit designs more successfully than a GPT-5.5-based system on held-out work. The exact workflow remains intentionally masked.",metric:"70%",metricLabel:"benchmark win rate vs GPT-5.5",facts:["Held-out benchmark","Specialist optimization","Exact workflow masked"]},
  {name:"Globus Medical",logo:"/clients/globus-medical.png",width:1005,height:219,tag:"PRODUCTION · MEDICAL DEVICES",summary:"A 5,000-user, fully on-prem deployment with cited outputs, customer-controlled infrastructure, and human review retained.",metric:"4–5×",metricLabel:"reported review acceleration",facts:["5,000 users","Fully on-prem","Customer-reported"]},
  {name:"Dubai CommerCity",logo:"/clients/dubai-commercity.svg",width:196,height:35,tag:"PRODUCTION · UAE GOVERNMENT",summary:"A production service gives founders around-the-clock guidance grounded in approved UAE regulations and official program information.",metric:"24/7",metricLabel:"government founder guidance",facts:["Official sources","Public-service production","5–6× reported onboarding"]}
];

const connectorRows:{name:string;icon:SimpleIcon}[][]=[
  [
    {name:"Google Workspace",icon:siGoogle},{name:"Gmail",icon:siGmail},{name:"Google Drive",icon:siGoogledrive},{name:"SAP",icon:siSap},
    {name:"GitHub",icon:siGithub},{name:"Jira",icon:siJira},{name:"Notion",icon:siNotion},{name:"Snowflake",icon:siSnowflake},
  ],
  [
    {name:"PostgreSQL",icon:siPostgresql},{name:"Databricks",icon:siDatabricks},{name:"Dropbox",icon:siDropbox},{name:"Box",icon:siBox},
    {name:"Zendesk",icon:siZendesk},{name:"HubSpot",icon:siHubspot},{name:"Okta",icon:siOkta},{name:"Airtable",icon:siAirtable},
  ],
];

const adaptiveStages=[
  {n:"01",title:"Connect",body:"Bring permitted knowledge, systems, and expert methods into one enterprise context."},
  {n:"02",title:"Act",body:"Turn questions and workflows into governed assistants, agents, and specialist experts."},
  {n:"03",title:"Verify",body:"Measure the result against evidence, policy, and the people accountable for the work."},
  {n:"04",title:"Compound",body:"Promote approved memory, procedures, tools, and specialization into the next release."},
];
const fragmentedTools=["Copilots","Enterprise search","Model APIs","Agent frameworks","Workflow automation","Governance add-ons"];
const intelligenceProducts=["AI Assistants","Governed Agents","Digital Experts"];
const economicsCurve=Array.from({length:8},(_,i)=>i);

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
      reveals.forEach(section=>{
        if(section.classList.contains("is-in"))return;
        const r=section.getBoundingClientRect();
        if(r.top<innerHeight*.94&&r.bottom>0){
          section.classList.add("is-in");
          io.unobserve(section);
        }
      });
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

function AgencyHero(){return <section className="agency-hero"><div className="agency-hero-copy"><p>CORPORATE GPT · ADAPTIVE ENTERPRISE INTELLIGENCE</p><h1>Own the intelligence<br/>that runs <em>your enterprise.</em></h1><span>Company-specific AI that learns your knowledge, workflows, and expert methods—then turns every approved outcome into lasting institutional capability.</span><div className="agency-actions"><Link href="/briefing">Book a briefing</Link><Link href="/proof">See the proof ↗</Link></div><div className="agency-hero-stats"><b>70% <span>Semiconductor Digital Expert win rate vs GPT-5.5</span></b><b>4–5× <span>reported review acceleration · 5,000 users on-prem</span></b><b>24/7 <span>UAE government founder guidance · official sources</span></b></div></div><div className="sovereign-object" role="img" aria-label="Corporate GPT places AI assistants, governed agents, and digital experts inside a customer-controlled boundary"><div className="object-boundary"><span>YOUR ENTERPRISE BOUNDARY</span><div className="object-ring ring-a"><i>AI ASSISTANTS</i></div><div className="object-ring ring-b"><i>GOVERNED AGENTS</i></div><div className="object-ring ring-c"><i>DIGITAL EXPERTS</i></div><div className="object-core"><Image src="/brand/neurologic-logogram-white.png" alt="" width={150} height={134} priority/><b>CORPORATE GPT</b><small>OWNED INTELLIGENCE</small></div><p>AUTHORITY NEVER EXPANDS BY ITSELF</p></div></div><div className="mobile-scroll-cue" aria-hidden="true"><span>Scroll to enter the system</span><i/></div></section>}

function AdaptiveIntelligence(){return <section className="adaptive-intelligence" id="intelligence-levels"><div className="agency-section-head" data-agency-reveal><div><p>THE POWER OF ADAPTIVE INTELLIGENCE</p><h2>Institutional intelligence<br/>that <em>compounds.</em></h2></div><span>Corporate GPT gets better at your company’s work—not just better at generating text. Every approved outcome can become reusable capability inside your enterprise boundary.</span></div><div className="adaptive-cycle" data-agency-reveal>{adaptiveStages.map(stage=><article key={stage.n}><span>{stage.n}</span><h3>{stage.title}</h3><p>{stage.body}</p></article>)}</div><div className="adaptive-levels" data-agency-reveal><span>ONE SHARED FOUNDATION</span><div><b>AI ASSISTANTS</b><small>for every employee</small></div><i>→</i><div><b>GOVERNED AGENTS</b><small>for recurring work</small></div><i>→</i><div><b>DIGITAL EXPERTS</b><small>for scarce expertise</small></div><em>Nothing self-promotes. Every improvement stays governed, measurable, and reversible.</em></div></section>}

export function ClientProof({expanded=false}:{expanded?:boolean}){return <section className={`client-proof ${expanded?"expanded":""}`}><div className="agency-section-head" data-agency-reveal><div><p>MEASURED IN THE REAL WORLD</p><h2>Proof where the reviews <em>are hardest.</em></h2></div><span>Benchmark evidence, production scale, and public-service availability—each stated at the level the evidence supports, with sensitive workflow detail masked.</span></div><div className="mobile-client-guide"><span>Swipe through customer evidence</span><b data-clients-counter aria-live="polite">01 / 03</b></div><div className="client-case-grid" data-mobile-carousel="clients" role="region" aria-label="Customer evidence carousel" tabIndex={0}>{clients.map((c,i)=><article key={c.name} data-agency-reveal><div className="client-case-top"><span>0{i+1}</span><small>{c.tag}</small></div><div className="client-card-logo"><Image src={c.logo} alt={`${c.name} logo`} width={c.width} height={c.height} sizes="(max-width: 760px) 180px, 220px"/></div><h3>{c.name}</h3><p>{c.summary}</p><div className="client-metric"><strong>{c.metric}</strong><span>{c.metricLabel}</span></div><div className="client-facts">{c.facts.map(x=><b key={x}>{x}</b>)}</div>{expanded&&<Link href="/briefing">Discuss this evidence ↗</Link>}</article>)}</div><div className="mobile-client-progress" data-clients-progress role="progressbar" aria-label="Customer evidence progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={33}><i/></div></section>}

function AssemblyStory(){return <section className="assembly-story"><div className="assembly-heading" data-agency-reveal><p>ONE PLATFORM · NOT ANOTHER TOOL</p><h2>Stop assembling enterprise AI<br/><em>one tool at a time.</em></h2><span>Point solutions make every team rebuild identity, permissions, context, policy, evaluation, and audit. Corporate GPT gives every AI experience one reusable foundation.</span></div><div className="assembly-compare"><div className="assembly-fragments" data-agency-reveal><span>THE FRAGMENTED STACK</span>{fragmentedTools.map((item,i)=><article key={item}><small>0{i+1}</small><b>{item}</b><em>REBUILD CONTROLS</em></article>)}</div><div className="assembly-platform" data-agency-reveal><span>CORPORATE GPT</span>{intelligenceProducts.map((item,i)=><article key={item}><small>0{i+1}</small><b>{item}</b></article>)}<div><b>ONE SHARED ENTERPRISE FOUNDATION</b><p>Identity · context · model policy · evaluation · authority · audit · rollback</p></div></div></div><p className="assembly-close" data-agency-reveal>One enterprise mandate. One reusable foundation. Institutional intelligence that compounds.</p></section>}

function ConnectorMark({name,icon}:{name:string;icon:SimpleIcon}){return <div className="connector-mark"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d={icon.path}/></svg><span>{name}</span></div>}

function ConnectorEcosystem(){return <section className="connector-ecosystem"><div className="connector-heading" data-agency-reveal><p>THE SYSTEMS YOU ALREADY RUN</p><h2>Works with your enterprise.<br/><em>Governed as one.</em></h2><span>Every connection inherits identity, permissions, policy, and audit. Exact authentication, read/write scope, and deployment compatibility are confirmed for your stack.</span></div><div className="connector-core" aria-hidden="true"><Image src="/brand/neurologic-logogram-white.png" alt="" width={64} height={57}/><b>CORPORATE GPT</b><small>GOVERNED CONNECTOR LAYER</small></div><div className="connector-marquees" role="region" aria-label="Representative enterprise connector ecosystem">{connectorRows.map((row,rowIndex)=><div className={`connector-window row-${rowIndex+1}`} key={rowIndex}><div className="connector-track">{[...row,...row].map((connector,index)=><div key={`${connector.name}-${index}`} aria-hidden={index>=row.length}><ConnectorMark {...connector}/></div>)}</div></div>)}</div><p className="connector-rule">Integration is a catalog, not a project. <Link href="/integrations">Explore 70+ connector patterns ↗</Link></p></section>}

function ProductHorizontal(){return <section className="agency-horizontal" data-agency-horizontal><div className="agency-horizontal-stage" data-agency-stage><div className="product-story-head"><p>THE PRODUCT · REAL INTERFACES</p><h2>One place to ask,<br/><em>act, and build.</em></h2><span>Swipe or use the controls</span><b className="mobile-product-counter" data-product-counter aria-live="polite">01 / 04</b></div><div className="agency-product-track" data-agency-track data-mobile-carousel="product" role="region" aria-label="Corporate GPT product screens" tabIndex={0}>{products.map(p=><article key={p.n}><div className="product-panel-copy"><span>{p.n} / 04</span><small>{p.eyebrow}</small><h3>{p.title}</h3><p>{p.body}</p><div><strong>{p.stat}</strong><em>{p.statLabel}</em></div><Link href={p.href}>Explore this capability ↗</Link></div><div className="product-shot"><Image src={p.image} alt={`${p.title} Corporate GPT product interface`} width={p.width} height={p.height} sizes="(max-width: 760px) calc(100vw - 68px), 55vw"/></div></article>)}</div><div className="mobile-product-controls"><button type="button" data-product-previous aria-label="Previous product screen">←</button><button type="button" data-product-next aria-label="Next product screen">→</button></div><div className="agency-horizontal-progress" data-product-progress role="progressbar" aria-label="Product screen progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={25}><i/></div></div></section>}

function AgentFlow(){return <section className="agent-flow"><div className="agency-section-head" data-agency-reveal><div><p>THE AUTHORITY CHAIN</p><h2>Capability increases.<br/><em>Authority never moves itself.</em></h2></div><span>Identity and source authority precede every step. Audit, evaluation, monitoring, and rollback follow every consequential outcome.</span></div><div className="flow-rail" data-agency-reveal><div><span>01</span><i>◎</i><h3>Evidence</h3><p>Material claims point to permitted sources. Insufficient evidence triggers abstention or escalation.</p></div><b>→</b><div><span>02</span><i>⌘</i><h3>Policy & scope</h3><p>Model routing, tool access, data paths, and action limits are explicit for the task.</p></div><b>→</b><div className="approval"><span>03</span><i>✓</i><h3>Human authority</h3><p>Consequential actions and capability promotion pause for the named decision owner.</p></div><b>→</b><div><span>04</span><i>↺</i><h3>Versioned release</h3><p>Accepted outcomes are attributable, monitored, and reversible through a defined rollback path.</p></div></div></section>}

function Economics(){return <section className="economics-proof"><div className="economics-card cost-card" data-agency-reveal><div className="economics-heading"><div><p>OWNED CAPACITY</p><h2>Your AI cost should not grow<br/><em>with every task.</em></h2></div><span>Metered APIs accelerate with usage. Corporate GPT lets you fill a committed capacity band, then expand deliberately when the business is ready.</span></div><div className="capacity-graph" role="img" aria-label="Illustrative cost structure: metered API spend accelerates as enterprise usage grows, while Corporate GPT committed capacity increases in planned steps"><span className="capacity-axis-y">TOTAL AI COST</span><span className="capacity-axis-x">ENTERPRISE USAGE →</span><div className="capacity-grid" aria-hidden="true"/><div className="capacity-gap" aria-hidden="true"/><div className="api-curve" aria-hidden="true">{economicsCurve.map(i=><i key={i}/>)}</div><div className="capacity-steps" aria-hidden="true">{economicsCurve.slice(0,4).map(i=><i key={i}/>)}</div><b className="api-label">METERED API SPEND</b><b className="capacity-label">COMMITTED CAPACITY</b><em className="break-even"><i/>CONFIGURATION-SPECIFIC BREAK-EVEN</em></div><div className="capacity-terms"><span>UNLIMITED INTERNAL USAGE <b>WITHIN CAPACITY</b></span><span>FRONTIER BURST <b>BY POLICY</b></span><span>EXTERNAL SPEND <b>CAPPED</b></span></div><p className="economics-copy">Illustrative structure only. Capacity sizing, model routing, infrastructure, support, external spend, and break-even are confirmed for each deployment.</p></div></section>}

function DeploymentRail(){return <section className="deployment-rail"><div className="agency-section-head" data-agency-reveal><div><p>THE ACCEPTANCE CLOCK</p><h2>Every date is a test.<br/><em>Not a promise.</em></h2></div><span>One agreement can activate all three levels. Contracted milestones, dependencies, owners, and acceptance evidence govern each workstream.</span></div><div className="deployment-track" data-agency-reveal data-mobile-track role="region" aria-label="Activation acceptance milestones" tabIndex={0}><article><span>DAY 30</span><h3>Architecture & baselines accepted</h3><p>Approve the boundary, data paths, owners, initial evaluation sets, and the baseline for each outcome.</p></article><article><span>DAY 60</span><h3>Candidate workflows reviewed</h3><p>Put assistants and the first bounded workflow in front of the people who own the real work.</p></article><article><span>DAY 90</span><h3>First contracted evidence accepted</h3><p>Accept, remedy, or reject the first outcome against the evidence standard defined in the agreement.</p></article><article><span>MONTHS 4–12</span><h3>Expand accepted capability</h3><p>Promote only what earns authorization, then extend the pattern across teams and expert domains.</p></article></div></section>}

function AgencyCTA(){return <section className="agency-cta"><p>START WITH ONE REAL WORKFLOW</p><h2>See Corporate GPT<br/><em>on your hardest work.</em></h2><span>Bring one workflow. Leave with a practical activation path.</span><Link href="/briefing">Book a briefing ↗</Link></section>}

export function AgencyHome(){return <div className="agency-site"><AgencyMotion/><SiteHeader/><main id="main"><AgencyHero/><AdaptiveIntelligence/><AssemblyStory/><ConnectorEcosystem/><ClientProof/><ProductHorizontal/><AgentFlow/><Economics/><DeploymentRail/><AgencyCTA/></main><SiteFooter/></div>}
