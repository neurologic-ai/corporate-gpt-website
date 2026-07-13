import { pages } from "../content";
import { WorldPage } from "./world-pages";
import type { Metadata } from "next";
export function RoutePage({ id }: { id: string }) { return <WorldPage id={id} page={pages[id]}/> }
export function routeMetadata(id:string):Metadata{const page=pages[id];return{title:page.title,description:page.description}}
