export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export async function chat(question: string) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, top_k: 4 }),
  });
  if (!res.ok) throw new Error(`Chat failed: ${res.status}`);
  return res.json();
}

export async function ingest(texts: string[]) {
  const res = await fetch(`${API_BASE}/ingest`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texts }),
  });
  if (!res.ok) throw new Error(`Ingest failed: ${res.status}`);
  return res.json();
}