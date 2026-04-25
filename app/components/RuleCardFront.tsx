import { RuleCard } from "../lib/types";

const CARD_W = 252;
const CARD_H = 352;

const TEAL = "#2E8C80";
const CREAM = "#FAF8F5";
const INK = "#2D2A26";

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
          border: `3px solid ${TEAL}`,
          borderRadius: 14,
          background: CREAM,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* colored top bar */}
        <div
          style={{
            background: TEAL,
            height: 6,
            flexShrink: 0,
          }}
        />

        {/* card number */}
        <div
          style={{
            padding: "12px 16px 0",
            textAlign: "right",
          }}
        >
          <span
            style={{
              color: TEAL,
              fontSize: 12,
              fontWeight: 800,
              opacity: 0.45,
            }}
          >
            #{index + 1}
          </span>
        </div>

        {/* rule text */}
        <div
          style={{
            flex: 1,
            padding: "8px 22px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              color: INK,
              fontSize: 14,
              lineHeight: 1.55,
              textAlign: "center",
              fontWeight: 600,
              margin: 0,
            }}
          >
            {card.text || "Regel eingeben..."}
          </p>
        </div>

        {/* bottom label */}
        <div
          style={{
            padding: "0 0 10px",
            textAlign: "center",
          }}
        >
          <span
            style={{
              color: TEAL,
              fontSize: 9,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              opacity: 0.5,
            }}
          >
            Regel
          </span>
        </div>
      </div>
    </div>
  );
}
