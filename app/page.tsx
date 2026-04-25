"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { RoleCard, RuleCard } from "./lib/types";
import { exportToPdf } from "./lib/pdf-export";
import { RoleCardEditor, RuleCardEditor } from "./components/CardEditor";
import RoleCardFront from "./components/RoleCardFront";
import RuleCardFront from "./components/RuleCardFront";
import CardBack from "./components/CardBack";

type Tab = "roles" | "rules";

let _idCounter = 0;
function nextId() {
  return `card-${++_idCounter}`;
}

function createRoleCards(n: number): RoleCard[] {
  return Array.from({ length: n }, () => ({
    id: nextId(),
    title: "",
    description: "",
  }));
}

function createRuleCards(n: number): RuleCard[] {
  return Array.from({ length: n }, () => ({
    id: nextId(),
    text: "",
  }));
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("roles");
  const [roleCards, setRoleCards] = useState<RoleCard[]>([]);
  const [ruleCards, setRuleCards] = useState<RuleCard[]>([]);
  const [mounted, setMounted] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const renderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRoleCards(createRoleCards(6));
    setRuleCards(createRuleCards(40));
    setMounted(true);
  }, []);

  const handleExport = useCallback(async () => {
    if (!renderRef.current || exporting) return;
    setExporting(true);
    setProgress({ current: 0, total: 0 });
    try {
      await exportToPdf(renderRef.current, (current, total) => {
        setProgress({ current, total });
      });
    } catch (err) {
      console.error("PDF export failed:", err);
      alert("PDF-Export fehlgeschlagen. Bitte versuche es erneut.");
    } finally {
      setExporting(false);
    }
  }, [exporting]);

  const totalCards = roleCards.length + ruleCards.length;

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="text-white/40 text-sm">Lade...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-gray-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🍻</span>
            <div>
              <h1 className="bg-linear-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-xl font-black tracking-tight text-transparent">
                Trinkspiel Kartengenerator
              </h1>
              <p className="text-xs text-white/40">
                {roleCards.length} Rollen · {ruleCards.length} Regeln ·{" "}
                {totalCards} Karten gesamt
              </p>
            </div>
          </div>

          <button
            onClick={handleExport}
            disabled={exporting || totalCards === 0}
            className="flex items-center gap-2 rounded-xl bg-linear-to-r from-pink-500 to-purple-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-pink-500/25 transition-all hover:shadow-pink-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {exporting ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                {progress.total > 0
                  ? `${progress.current}/${progress.total}`
                  : "Exportiere..."}
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                    clipRule="evenodd"
                  />
                </svg>
                PDF exportieren
              </>
            )}
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="mx-auto w-full max-w-4xl px-4 pt-6">
        <div className="flex gap-1 rounded-xl bg-white/5 p-1">
          <button
            onClick={() => setActiveTab("roles")}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-bold transition-all ${
              activeTab === "roles"
                ? "bg-linear-to-r from-pink-500/20 to-rose-500/20 text-pink-300 shadow-inner"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            🎭 Rollenkarten ({roleCards.length})
          </button>
          <button
            onClick={() => setActiveTab("rules")}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-bold transition-all ${
              activeTab === "rules"
                ? "bg-linear-to-r from-indigo-500/20 to-cyan-500/20 text-indigo-300 shadow-inner"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            🃏 Regelkarten ({ruleCards.length})
          </button>
        </div>
      </div>

      {/* Card editor area */}
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6">
        {activeTab === "roles" ? (
          <RoleCardEditor cards={roleCards} onChange={setRoleCards} />
        ) : (
          <RuleCardEditor cards={ruleCards} onChange={setRuleCards} />
        )}
      </main>

      {/* Hidden render area for PDF export */}
      <div
        ref={renderRef}
        className="pointer-events-none fixed left-[-9999px] top-0"
        aria-hidden="true"
      >
        {/* One back per type (reused for all cards of that type) */}
        <div data-card-back data-card-type="role">
          <CardBack type="role" />
        </div>
        <div data-card-back data-card-type="rule">
          <CardBack type="rule" />
        </div>
        {/* Role card fronts */}
        {roleCards.map((card) => (
          <div key={`role-${card.id}`} data-card-front data-card-type="role">
            <RoleCardFront card={card} />
          </div>
        ))}
        {/* Rule card fronts */}
        {ruleCards.map((card, i) => (
          <div key={`rule-${card.id}`} data-card-front data-card-type="rule">
            <RuleCardFront card={card} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
