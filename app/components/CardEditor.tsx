"use client";

import { RoleCard, RuleCard } from "../lib/types";
import { RoleCardPreview, RuleCardPreview } from "./CardPreview";

let _idCounter = 1000;
function genId() {
  return `card-${++_idCounter}`;
}

export function RoleCardEditor({
  cards,
  onChange,
}: {
  cards: RoleCard[];
  onChange: (cards: RoleCard[]) => void;
}) {
  const add = () =>
    onChange([...cards, { id: genId(), title: "", description: "" }]);

  const remove = (id: string) => onChange(cards.filter((c) => c.id !== id));

  const update = (id: string, patch: Partial<RoleCard>) =>
    onChange(cards.map((c) => (c.id === id ? { ...c, ...patch } : c)));

  return (
    <div className="space-y-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur"
        >
          {/* preview */}
          <div className="hidden shrink-0 sm:block">
            <RoleCardPreview card={card} />
          </div>

          {/* fields */}
          <div className="flex flex-1 flex-col gap-2">
            <input
              type="text"
              placeholder="Titel (z.B. Der Barkeeper)"
              value={card.title}
              onChange={(e) => update(card.id, { title: e.target.value })}
              className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm font-bold text-white placeholder:text-white/30 focus:border-pink-400 focus:outline-none"
            />
            <textarea
              placeholder="Beschreibung eingeben..."
              value={card.description}
              onChange={(e) =>
                update(card.id, { description: e.target.value })
              }
              rows={3}
              className="resize-none rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-pink-400 focus:outline-none"
            />
          </div>

          {/* delete */}
          <button
            onClick={() => remove(card.id)}
            className="shrink-0 rounded-lg p-2 text-white/40 transition-colors hover:bg-red-500/20 hover:text-red-400"
            title="Karte löschen"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ))}

      {/* add button */}
      <button
        onClick={add}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-pink-400/30 py-4 text-sm font-bold text-pink-300/60 transition-colors hover:border-pink-400/60 hover:text-pink-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        Rollenkarte hinzufügen
      </button>
    </div>
  );
}

export function RuleCardEditor({
  cards,
  onChange,
}: {
  cards: RuleCard[];
  onChange: (cards: RuleCard[]) => void;
}) {
  const add = () => onChange([...cards, { id: genId(), text: "" }]);

  const remove = (id: string) => onChange(cards.filter((c) => c.id !== id));

  const update = (id: string, text: string) =>
    onChange(cards.map((c) => (c.id === id ? { ...c, text } : c)));

  return (
    <div className="space-y-3">
      {cards.map((card, i) => (
        <div
          key={card.id}
          className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur"
        >
          {/* preview */}
          <div className="hidden shrink-0 sm:block">
            <RuleCardPreview card={card} index={i} />
          </div>

          {/* field */}
          <div className="flex flex-1 flex-col gap-1">
            <span className="text-xs font-bold text-indigo-300/50">
              Regel #{i + 1}
            </span>
            <textarea
              placeholder="Regel eingeben..."
              value={card.text}
              onChange={(e) => update(card.id, e.target.value)}
              rows={2}
              className="resize-none rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-indigo-400 focus:outline-none"
            />
          </div>

          {/* delete */}
          <button
            onClick={() => remove(card.id)}
            className="shrink-0 rounded-lg p-2 text-white/40 transition-colors hover:bg-red-500/20 hover:text-red-400"
            title="Karte löschen"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ))}

      {/* add button */}
      <button
        onClick={add}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-indigo-400/30 py-4 text-sm font-bold text-indigo-300/60 transition-colors hover:border-indigo-400/60 hover:text-indigo-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        Regelkarte hinzufügen
      </button>
    </div>
  );
}
