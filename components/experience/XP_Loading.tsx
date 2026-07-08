export function XP_Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-atlas-black text-atlas-ink">
      <div className="text-center" role="status" aria-live="polite">
        <p className="atlas-kicker">Project Atlas</p>
        <h1 className="mt-3 text-3xl font-semibold text-atlas-white">Preparing Atlas</h1>
        <p className="mt-3 text-sm text-atlas-ink/64">Quietly opening the doors.</p>
      </div>
    </main>
  );
}
