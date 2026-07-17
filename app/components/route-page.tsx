import { pages } from "../content";
import { WorldPage } from "./world-pages";
import type { Metadata } from "next";
export function RoutePage({ id }: { id: string }) { return <WorldPage id={id} page={pages[id]}/> }
export function routeMetadata(id:string):Metadata{const page=pages[id];const path=`/${id}`;return{title:page.title,description:page.description,alternates:{canonical:path},openGraph:{title:page.title,description:page.description,url:path,type:"website",images:[{url:"/og-corporate-gpt.png",width:1200,height:630,alt:`${page.title} — Corporate GPT`}]},twitter:{card:"summary_large_image",title:page.title,description:page.description,images:["/og-corporate-gpt.png"]}}}
