import { LoaderCircle } from "lucide-react";
export function SearchFeedback({ label = "Searching properties" }: { label?: string }) {
  return <div role="status" aria-live="polite" className="col-span-full flex min-h-64 flex-col items-center justify-center gap-5 text-muted-foreground">
    <LoaderCircle className="h-7 w-7 animate-spin text-gold motion-reduce:animate-none" />
    <span className="text-sm">{label}…</span>
    <div aria-hidden="true" className="grid w-full max-w-xl grid-cols-3 gap-4">
      {[0, 1, 2].map(i => <div key={i} className="h-24 animate-pulse rounded-lg border border-border bg-muted motion-reduce:animate-none" />)}
    </div>
  </div>;
}