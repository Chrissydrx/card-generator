"use client";

import { RoleCard, RuleCard } from "../lib/types";
import RoleCardFront from "./RoleCardFront";
import RuleCardFront from "./RuleCardFront";
import CardBack from "./CardBack";

export function RoleCardPreview({ card }: { card: RoleCard }) {
  return (
    <div className="flex gap-2">
      <RoleCardFront card={card} scale={0.35} />
      <CardBack type="role" scale={0.35} />
    </div>
  );
}

export function RuleCardPreview({
  card,
  index,
}: {
  card: RuleCard;
  index: number;
}) {
  return (
    <div className="flex gap-2">
      <RuleCardFront card={card} index={index} scale={0.35} />
      <CardBack type="rule" scale={0.35} />
    </div>
  );
}
