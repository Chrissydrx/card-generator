const CARD_W = 252;
const CARD_H = 352;

export default function CardBack({
  type,
  scale = 1,
}: {
  type: "role" | "rule";
  scale?: number;
}) {
  const isRole = type === "role";

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
        className={`absolute rounded-2xl p-[3px] ${
          isRole
            ? "bg-linear-to-br from-pink-500 via-rose-500 to-orange-400"
            : "bg-linear-to-br from-violet-600 via-indigo-600 to-cyan-500"
        }`}
      >
        <div
          className={`flex h-full w-full flex-col items-center justify-center rounded-[13px] ${
            isRole
              ? "bg-linear-to-br from-pink-900 via-rose-800 to-orange-900"
              : "bg-linear-to-br from-violet-900 via-indigo-900 to-cyan-900"
          }`}
        >
          {/* diagonal pattern overlay */}
          <div
            className="absolute inset-0 rounded-[13px] opacity-[0.07]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 8px,
                white 8px,
                white 9px
              )`,
            }}
          />

          {/* center content */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="text-4xl">{isRole ? "🎭" : "🃏"}</div>
            <div
              className={`font-black text-2xl uppercase tracking-[0.3em] ${
                isRole ? "text-pink-300" : "text-cyan-300"
              }`}
            >
              {isRole ? "ROLLE" : "REGEL"}
            </div>
            <div className="mt-1 text-xl opacity-60">
              {isRole ? "🍹" : "🍺"}
            </div>
          </div>

          {/* corner ornaments */}
          <span
            className={`absolute top-3 left-3 text-xs font-bold opacity-20 ${
              isRole ? "text-pink-200" : "text-cyan-200"
            }`}
          >
            ✦
          </span>
          <span
            className={`absolute top-3 right-3 text-xs font-bold opacity-20 ${
              isRole ? "text-pink-200" : "text-cyan-200"
            }`}
          >
            ✦
          </span>
          <span
            className={`absolute bottom-3 left-3 text-xs font-bold opacity-20 ${
              isRole ? "text-pink-200" : "text-cyan-200"
            }`}
          >
            ✦
          </span>
          <span
            className={`absolute bottom-3 right-3 text-xs font-bold opacity-20 ${
              isRole ? "text-pink-200" : "text-cyan-200"
            }`}
          >
            ✦
          </span>
        </div>
      </div>
    </div>
  );
}
