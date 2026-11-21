export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  id,
}) {
  const centered = align === "center"

  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-snow sm:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-mist sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}
