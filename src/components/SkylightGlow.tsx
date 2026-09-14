// Light through the skylights, as it falls on the dining-room wall.
export function SkylightGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-[30%] right-[14%] h-[110%] w-[16%] rotate-[30deg] bg-gradient-to-b from-white/75 via-white/25 to-transparent blur-2xl" />
      <div className="absolute -top-[30%] right-[34%] h-[100%] w-[7%] rotate-[30deg] bg-gradient-to-b from-white/60 via-white/15 to-transparent blur-xl" />
    </div>
  );
}
