type UI_SectionHeadingProps = {
  kicker?: string;
  title: string;
  summary?: string;
};

export function UI_SectionHeading({ kicker, title, summary }: UI_SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      {kicker ? <p className="atlas-kicker">{kicker}</p> : null}
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-atlas-white md:text-5xl">
        {title}
      </h2>
      {summary ? (
        <p className="mt-4 max-w-2xl text-base leading-8 text-atlas-ink/72 md:text-lg">
          {summary}
        </p>
      ) : null}
    </div>
  );
}
