import { RuleCard } from "../lib/types";

const CARD_W = 252;
const CARD_H = 352;

export default function RuleCardFront({
  card,
  index,
  scale = 1,
}: {
  card: RuleCard;
  index: number;
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
        className="absolute rounded-2xl bg-linear-to-br from-violet-600 via-indigo-600 to-cyan-500 p-[3px]"
      >
        <div className="relative flex h-full w-full flex-col items-center justify-center rounded-[13px] bg-linear-to-br from-violet-700/90 via-indigo-600/90 to-cyan-500/90 px-5 py-6 text-white">
          {/* card number */}
          <span className="absolute top-3 right-4 font-black text-xs opacity-40">
            #{index + 1}
          </span>

          {/* top ornament */}
          <div className="mb-3 text-2xl leading-none opacity-70">🃏</div>

          {/* rule text */}
          <p className="flex-1 flex items-center text-center text-base leading-relaxed font-bold">
            {card.text || "Regel eingeben..."}
          </p>

          {/* bottom ornament */}
          <div className="mt-2 text-lg leading-none opacity-50">🍺</div>
        </div>
      </div>
    </div>
  );
}
