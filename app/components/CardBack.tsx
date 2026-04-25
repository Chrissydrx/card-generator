const CARD_W = 252;
const CARD_H = 352;

const CORAL = "#D9654C";
const TEAL = "#2E8C80";

export default function CardBack({
  type,
  scale = 1,
}: {
  type: "role" | "rule";
  scale?: number;
}) {
  const isRole = type === "role";
  const color = isRole ? CORAL : TEAL;

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
          borderRadius: 14,
          background: color,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* dot grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.08,
            backgroundImage: `radial-gradient(circle, #fff 1.2px, transparent 1.2px)`,
            backgroundSize: "16px 16px",
            backgroundPosition: "8px 8px",
          }}
        />

        {/* inner frame */}
        <div
          style={{
            position: "absolute",
            inset: 12,
            border: "2px solid rgba(255,255,255,0.2)",
            borderRadius: 8,
          }}
        />

        {/* center label */}
        <span
          style={{
            position: "relative",
            color: "#fff",
            fontSize: 22,
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.3em",
          }}
        >
          {isRole ? "Rolle" : "Regel"}
        </span>
      </div>
    </div>
  );
}
