import { UI_Button } from "@/components/foundation/UI_Button";

export default function NotFound() {
  return (
    <main id="main-content" className="atlas-container grid min-h-screen place-items-center py-24">
      <section className="max-w-xl rounded-[var(--radius-large)] border border-atlas-line/10 bg-atlas-glass/7 p-8 text-center">
        <p className="atlas-kicker">Route Not Found</p>
        <h1 className="mt-3 text-4xl font-semibold text-atlas-white">Return to the Entrance Hall.</h1>
        <p className="mt-4 text-atlas-ink/70">
          This path does not currently belong to the Atlas journey.
        </p>
        <UI_Button href="/" className="mt-6">
          Back to Arrival
        </UI_Button>
      </section>
    </main>
  );
}
