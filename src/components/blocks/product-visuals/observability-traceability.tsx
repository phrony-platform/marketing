'use client';

import { ArrowRight, FileSpreadsheet, FileText, Search } from 'lucide-react';

import { RunTraceMockup } from '@/components/blocks/run-trace-section';

import { CodeChip, VisualFrame, visualHeading } from './_shared';

export function ObservabilityHero() {
  return (
    <VisualFrame label="Decision record">
      <RunTraceMockup />
    </VisualFrame>
  );
}

export function ObservabilityMid() {
  const results = [
    {
      id: 'sess_8f2a',
      summary: 'Auto fraud signal 0.78 — escalated to adjuster · approved with note.',
      tone: 'amber' as const,
    },
    {
      id: 'sess_8e91',
      summary: 'Auto fraud signal 0.74 — escalated to adjuster · denied.',
      tone: 'amber' as const,
    },
    {
      id: 'sess_8d04',
      summary: 'Auto fraud signal 0.83 — escalated to senior adjuster · pending.',
      tone: 'rose' as const,
    },
  ];
  return (
    <VisualFrame label="Searchable across every run">
      <div className="p-4 sm:p-5">
        <label
          htmlFor="obs-search-mock"
          className="flex items-center gap-2 border border-white/10 bg-black/40 px-3 py-2"
        >
          <Search className="size-3.5 text-zinc-500" strokeWidth={1.75} aria-hidden />
          <input
            id="obs-search-mock"
            readOnly
            value='claims escalated due to fraud signal > 0.7 in Q1'
            className="w-full bg-transparent font-mono text-[12px] text-zinc-200 outline-none"
          />
          <CodeChip>3 results</CodeChip>
        </label>

        <ul className="mt-4 divide-y divide-white/8 border border-white/10 bg-white/[0.02]">
          {results.map((r) => (
            <li key={r.id} className="flex items-start gap-3 px-3 py-2.5">
              <FileText className="mt-0.5 size-3.5 shrink-0 text-zinc-500" strokeWidth={1.75} aria-hidden />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] tabular-nums text-zinc-100">{r.id}</span>
                  <CodeChip tone={r.tone}>fraud</CodeChip>
                </div>
                <p className="mt-1 truncate text-[11px] text-zinc-400">{r.summary}</p>
              </div>
              <ArrowRight className="size-3.5 text-zinc-600" strokeWidth={1.75} aria-hidden />
            </li>
          ))}
        </ul>
      </div>
    </VisualFrame>
  );
}

export function ObservabilityBottom() {
  return (
    <VisualFrame label="What your team sees · what your auditor gets">
      <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-2 md:divide-x md:divide-y-0">
        {/* Team view */}
        <div className="p-5 sm:p-6">
          <p className={visualHeading}>Team view</p>
          <div className="mt-4 border border-white/10 bg-white/[0.03]">
            <header className="flex items-center justify-between border-b border-white/8 px-3 py-2">
              <span className="font-mono text-[11px] tabular-nums text-zinc-100">sess_8f2a</span>
              <CodeChip tone="emerald">decided</CodeChip>
            </header>
            <ul className="divide-y divide-white/6">
              {['perceive', 'reason', 'act', 'policy', 'handoff'].map((p) => (
                <li
                  key={p}
                  className="flex items-center justify-between px-3 py-1.5 text-[11px] text-zinc-300"
                >
                  <span className="font-mono uppercase tracking-wide text-zinc-500">{p}</span>
                  <span className="font-mono tabular-nums text-zinc-400">0.4s</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Auditor export */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <p className={visualHeading}>Auditor export</p>
            <FileSpreadsheet className="size-3.5 text-zinc-500" strokeWidth={1.75} aria-hidden />
          </div>
          <div className="mt-4 overflow-hidden border border-white/10 bg-white/[0.03] font-mono text-[10px]">
            <div className="grid grid-cols-3 gap-px bg-white/6">
              {['session_id', 'phase', 'duration', 'sess_8f2a', 'perceive', '0.3s', 'sess_8f2a', 'perceive', '0.4s', 'sess_8f2a', 'reason', '0.8s', 'sess_8f2a', 'act', '0.6s', 'sess_8f2a', 'policy', '0.1s', 'sess_8f2a', 'handoff', '0.2s'].map(
                (cell, i) => (
                  <div
                    key={i}
                    className={`bg-zinc-950 px-2 py-1 ${i < 3 ? 'text-zinc-500 uppercase tracking-wide' : 'text-zinc-300'}`}
                  >
                    {cell}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </VisualFrame>
  );
}
