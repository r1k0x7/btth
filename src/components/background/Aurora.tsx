/**
 * Soft aurora glow blobs painted behind the content. Pure CSS, no JS cost.
 */
export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-40 -top-40 h-[38rem] w-[38rem] animate-aurora rounded-full bg-cultivation/20 blur-[120px]" />
      <div
        className="absolute -right-32 top-10 h-[32rem] w-[32rem] animate-aurora rounded-full bg-energy/20 blur-[120px]"
        style={{ animationDelay: "-8s" }}
      />
      <div
        className="absolute bottom-[-12rem] left-1/3 h-[34rem] w-[34rem] animate-aurora rounded-full bg-flame/15 blur-[130px]"
        style={{ animationDelay: "-16s" }}
      />
    </div>
  );
}
