import { RoleCard } from "../lib/types";

const CARD_W = 252;
const CARD_H = 352;

export default function RoleCardFront({
  card,
  scale = 1,
}: {
  card: RoleCard;
  scale?: number;
}) {
  return (
    <div
      style={{ width: CARD_W * scale, height: CARD_H * scale }}
      className="relative shrink-0 select-none overflow-hidden"
    >
      <div
        style={{
          width: CARD_W,
          height: CARD_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
        className="absolute rounded-2xl bg-linear-to-br from-pink-500 via-rose-500 to-orange-400 p-[3px]"
      >
        <div className="flex h-full w-full flex-col items-center rounded-[13px] bg-linear-to-br from-pink-600/90 via-rose-500/90 to-orange-400/90 px-5 py-6 text-white">
          {/* top ornament */}
          <div className="mb-1 text-2xl leading-none opacity-70">🎭</div>

          {/* title */}
          <h3 className="mb-3 text-center font-black text-xl uppercase tracking-widest drop-shadow-md">
            {card.title || "Neue Rolle"}
          </h3>

          {/* divider */}
          <div className="mb-3 h-px w-3/4 bg-white/40" />

          {/* description */}
          <p className="flex-1 text-center text-sm leading-relaxed font-medium opacity-90">
            {card.description || "Beschreibung eingeben..."}
          </p>

          {/* bottom ornament */}
          <div className="mt-2 text-lg leading-none opacity-50">🍹</div>
        </div>
      </div>
    </div>
  );
}
