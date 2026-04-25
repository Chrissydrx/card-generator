import { RoleCard } from "../lib/types";

const CARD_W = 252;
const CARD_H = 352;

const CORAL = "#D9654C";
const CREAM = "#FAF8F5";
const INK = "#2D2A26";

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
          border: `3px solid ${CORAL}`,
          borderRadius: 14,
          background: CREAM,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* colored header block */}
        <div
          style={{
            background: CORAL,
            padding: "20px 20px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: "#fff",
              fontSize: 17,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            {card.title || "Neue Rolle"}
          </span>
        </div>

        {/* body */}
        <div
          style={{
            flex: 1,
            padding: "20px 18px 16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              color: INK,
              fontSize: 13,
              lineHeight: 1.55,
              textAlign: "center",
              fontWeight: 500,
              margin: 0,
            }}
          >
            {card.description || "Beschreibung eingeben..."}
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
              color: CORAL,
              fontSize: 9,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              opacity: 0.5,
            }}
          >
            Rolle
          </span>
        </div>
      </div>
    </div>
  );
}
