export function Header() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header
      className="sticky top-0 z-40 px-4 pt-4 pb-3"
      style={{
        background: "linear-gradient(180deg, oklch(0.38 0.14 22) 0%, oklch(0.32 0.12 22 / 0.98) 100%)",
        boxShadow: "0 2px 20px oklch(0.22 0.05 30 / 0.3)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/assets/generated/naam-punya-seva-logo-transparent.dim_200x200.png"
            alt="Naam Punya Seva"
            className="w-10 h-10 rounded-full object-cover"
            style={{ boxShadow: "0 0 12px oklch(0.78 0.16 72 / 0.5)" }}
          />
          <div>
            <h1
              className="font-cinzel text-lg font-bold leading-tight"
              style={{ color: "oklch(0.88 0.14 72)", textShadow: "0 0 12px oklch(0.78 0.16 72 / 0.4)" }}
            >
              Naam Punya Seva
            </h1>
            <p className="text-xs font-devanagari" style={{ color: "oklch(0.78 0.10 72)" }}>
              नाम • पुण्य • सेवा
            </p>
          </div>
        </div>
        <div className="text-right">
          <div
            className="text-xl font-devanagari om-pulse"
            style={{ color: "oklch(0.88 0.16 72)", textShadow: "0 0 16px oklch(0.78 0.16 72 / 0.6)" }}
          >
            ॐ
          </div>
          <p className="text-xs font-crimson" style={{ color: "oklch(0.72 0.10 72)" }}>
            {today.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
          </p>
        </div>
      </div>
    </header>
  );
}
