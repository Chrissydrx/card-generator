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
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          padding: "10px 10px 8px",
        }}
      >
        <div
          style={{
            flex: 1,
            width: "100%",
            minHeight: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- html2canvas PDF export needs a plain img */}
          <img
            src="/image.png"
            alt=""
            width={220}
            height={280}
            style={{
              maxWidth: "100%",
              maxHeight: 280,
              width: "auto",
              height: "auto",
              objectFit: "contain",
              objectPosition: "center",
            }}
            draggable={false}
          />
        </div>

        <span
          style={{
            color: "rgba(255,255,255,0.95)",
            fontSize: 10,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            marginTop: 6,
            flexShrink: 0,
          }}
        >
          {isRole ? "Rolle" : "Regel"}
        </span>
      </div>
    </div>
  );
}
