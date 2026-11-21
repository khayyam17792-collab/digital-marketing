function WebsiteVisual() {
  return (
    <div className="flex h-full flex-col justify-end bg-[radial-gradient(circle_at_top_left,rgba(122,104,242,0.35),transparent_42%),linear-gradient(160deg,#171f34,#0c111c)] p-5">
      <div className="rounded-xl border border-white/10 bg-ink/70 p-3 shadow-2xl">
        <div className="mb-3 flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-white/25" />
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/10" />
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2 space-y-2">
            <div className="h-2 w-10 rounded-full bg-accent" />
            <div className="h-4 w-full rounded bg-white/80" />
            <div className="h-2 w-4/5 rounded bg-white/20" />
            <div className="h-6 w-16 rounded-full bg-violet" />
          </div>
          <div className="col-span-3 grid grid-cols-2 gap-2">
            <div className="h-16 rounded-lg bg-white/10" />
            <div className="h-16 rounded-lg bg-accent/30" />
            <div className="col-span-2 h-8 rounded-lg bg-white/8" />
          </div>
        </div>
      </div>
    </div>
  )
}

function SocialVisual() {
  return (
    <div className="relative h-full overflow-hidden bg-[linear-gradient(165deg,#1a1630,#101624)]">
      <div className="absolute left-6 top-6 w-36 rounded-2xl border border-white/10 bg-white/8 p-3 backdrop-blur">
        <div className="mb-3 h-16 rounded-xl bg-violet/70" />
        <div className="h-2 w-20 rounded bg-white/70" />
        <div className="mt-2 h-2 w-14 rounded bg-white/25" />
      </div>
      <div className="absolute right-8 top-14 w-40 rounded-2xl border border-white/10 bg-navy p-3 shadow-2xl">
        <div className="mb-3 h-20 rounded-xl bg-[linear-gradient(135deg,#c9bfff,#5c47e6)]" />
        <div className="flex gap-1">
          <span className="h-1.5 w-8 rounded bg-white/70" />
          <span className="h-1.5 w-5 rounded bg-white/30" />
        </div>
      </div>
      <div className="absolute bottom-5 left-10 right-10 flex gap-2">
        {["#5c47e6", "#c9bfff", "#ffffff33", "#ffffff1a"].map((color) => (
          <span key={color} className="h-2 flex-1 rounded-full" style={{ background: color }} />
        ))}
      </div>
    </div>
  )
}

function BrandVisual() {
  return (
    <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_70%_20%,rgba(201,191,255,0.18),transparent_30%),linear-gradient(180deg,#12182a,#0b0f18)]">
      <div className="text-center">
        <div className="mx-auto grid size-20 place-items-center rounded-3xl border border-white/15 bg-white/5">
          <span className="font-display text-4xl font-bold text-snow">A</span>
        </div>
        <div className="mt-5 flex justify-center gap-2" aria-hidden="true">
          <span className="size-4 rounded-full bg-violet" />
          <span className="size-4 rounded-full bg-accent" />
          <span className="size-4 rounded-full bg-snow" />
          <span className="size-4 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  )
}

function CampaignVisual() {
  return (
    <div className="flex h-full items-end bg-[linear-gradient(145deg,#182038,#0d1220)] p-5">
      <div className="grid w-full grid-cols-3 gap-3">
        {[
          { h: "h-16", label: "Awareness" },
          { h: "h-24", label: "Consideration" },
          { h: "h-20", label: "Action" },
        ].map((bar) => (
          <div key={bar.label} className="flex flex-col justify-end gap-2">
            <div className={`${bar.h} rounded-xl bg-gradient-to-t from-violet to-accent/80`} />
            <p className="text-[10px] tracking-wide text-mist">{bar.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const visuals = {
  website: WebsiteVisual,
  social: SocialVisual,
  brand: BrandVisual,
  campaign: CampaignVisual,
}

export default function ProjectVisual({ type }) {
  const Visual = visuals[type] ?? WebsiteVisual
  return (
    <div className="aspect-[16/10] overflow-hidden" aria-hidden="true">
      <div className="h-full transition duration-700 group-hover:scale-[1.03]">
        <Visual />
      </div>
    </div>
  )
}
