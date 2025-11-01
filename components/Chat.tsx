"use client";
import { useState } from "react";
import { chat, ingest } from "@/lib/api";

type RetrievedChunk = {
  content: string;
  score?: number; // optional if backend may not send it
  // you can keep other fields too
  // sourceId?: string;
};

export default function Chat() {
  const [q, setQ] = useState("");
  const [answer, setAnswer] = useState<string>("");
  const [context, setContext] = useState<RetrievedChunk[]>([]);
  const [busy, setBusy] = useState(false);
  const [ingestText, setIngestText] = useState("");

  async function onAsk(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    setBusy(true);
    try {
      const res = await chat(q.trim());
      setAnswer(res.answer);
      // ensure the array is the right shape
      setContext((res.context as RetrievedChunk[]) || []);
    } finally {
      setBusy(false);
    }
  }

  async function onIngest() {
    if (!ingestText.trim()) return;
    setBusy(true);
    try {
      await ingest([ingestText]);
      setIngestText("");
      alert("Ingested!");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-white via-amber-50 to-white text-black">
      <div className="mx-auto max-w-3xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-amber-300 text-black shadow-sm">
            🐝
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">IRIS RAG Chatbot</h1>
        </div>

        {/* Ingest Card */}
        <div className="rounded-2xl border border-amber-300 bg-white shadow-sm">
          <div className="border-b border-amber-200 px-4 py-3">
            <h2 className="text-sm font-semibold tracking-wide">Add to Knowledge Base</h2>
          </div>
          <div className="p-4 space-y-3">
            <label htmlFor="ingest" className="sr-only">
              Ingest text
            </label>
            <textarea
              id="ingest"
              className="w-full rounded-xl border border-amber-300 bg-white p-3 text-sm shadow-inner placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
              rows={4}
              placeholder="Paste some text to add to the IRIS vector store (ad-hoc demo)"
              value={ingestText}
              onChange={(e) => setIngestText(e.target.value)}
            />
            <button
              onClick={onIngest}
              disabled={busy}
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-black bg-amber-300 px-4 py-2 text-sm font-semibold text-black shadow hover:bg-amber-400 disabled:opacity-60"
            >
              {busy ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  Working…
                </span>
              ) : (
                "Add to Knowledge Base"
              )}
            </button>
          </div>
        </div>

        {/* Ask Row */}
        <form
          onSubmit={onAsk}
          className="flex gap-2 rounded-2xl border border-amber-300 bg-white p-2 shadow-sm"
        >
          <label htmlFor="ask" className="sr-only">
            Ask a question
          </label>
          <input
            id="ask"
            className="flex-1 rounded-xl border border-transparent bg-white p-3 text-sm placeholder:text-neutral-500 focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="Ask a question…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button
            disabled={busy}
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-4 py-2 text-sm font-bold text-black shadow hover:bg-amber-500 disabled:opacity-60"
          >
            {busy ? (
              <span className="inline-flex items-center gap-2">
                {/* note: 'border-top-transparent' isn't a Tailwind class; use border-t-transparent */}
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                Thinking…
              </span>
            ) : (
              "Ask"
            )}
          </button>
        </form>

        {/* Answer / Context */}
        {answer && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 shadow-sm">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide">
                Answer
              </div>
              <div className="leading-relaxed">{answer}</div>
            </div>

            {!!context.length && (
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wide">
                  Retrieved Chunks
                </div>
                <ul className="space-y-2">
                  {context.map((c, idx) => (
                    <li key={idx} className="rounded-xl border border-amber-300 bg-white p-3 shadow-sm">
                      <div className="mb-1">
                        {typeof c.score === "number" && (
                          <span className="inline-flex items-center rounded-md bg-amber-200 px-2 py-0.5 text-[11px] font-semibold">
                            score {c.score.toFixed(4)}
                          </span>
                        )}
                      </div>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {c.content}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Footer hint */}
        <p className="pt-2 text-center text-xs text-neutral-600">
          <span className="font-semibold text-amber-600">Tip:</span> Press Enter to ask. Keep it short for the pitch.
        </p>
      </div>
    </div>
  );
}
