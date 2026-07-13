import { NativeLink as Link } from "./components/native-link";
import { SiteFooter, SiteHeader } from "./components/site";
export default function NotFound(){return <div className="site-shell"><SiteHeader/><main id="main" className="not-found"><div className="perimeter"><p className="eyebrow">404 · Outside the perimeter</p><h1>This page doesn’t exist.</h1><p>Your data, meanwhile, never left.</p><Link href="/" className="button primary">Back to home</Link></div></main><SiteFooter/></div>}
