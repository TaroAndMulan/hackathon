// app/products/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";

type Slug = "clinician" | "adults" | "institution";

const copy: Record<Slug, { title: string; tagline: string; bullets: string[] }> = {
  clinician: {
    title: "Clinician",
    tagline: "Screening, triage, and therapy support — built for clinical workflows.",
    bullets: [
      "Fast phobia screening with exportable summaries",
      "Evidence-based exposure modules with safety guards",
      "Session notes & progress snapshots",
    ],
  },
  adults: {
    title: "Adults",
    tagline: "Personalized self-help and exposure practice for everyday life.",
    bullets: [
      "Guided exercises with gentle step-ups",
      "Track streaks, symptoms, and triggers",
      "Share progress with someone you trust",
    ],
  },
  institution: {
    title: "Institution",
    tagline: "Population insights and referral pathways for schools & enterprises.",
    bullets: [
      "Privacy-first trend dashboards",
      "Early signals & routing suggestions",
      "Integrations for HR / student services",
    ],
  },
};

export async function generateStaticParams() {
  return ["clinician", "adults", "institution"].map((slug) => ({ slug }));
}

export default function ProductDetail({
  params,
}: {
  params: { slug: Slug | string };
}) {
  const data = copy[params.slug as Slug];
  if (!data) return notFound();

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#fffbee] via-[#fff9c2] to-[#fff8a0] text-black">
      <div className="mx-auto max-w-4xl px-6 py-14">
        {/* Top bar */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-yellow-700">
            {data.title}
          </h1>
          <div className="flex gap-3">
            <Link
              href="/products"
              className="px-4 py-2 rounded-xl bg-white/80 border border-yellow-300 hover:bg-white transition shadow-sm"
            >
              ← Back to Products
            </Link>
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-yellow-400 border border-yellow-500 hover:bg-yellow-500 transition shadow-md"
            >
              Home
            </Link>
          </div>
        </div>

        {/* Hero */}
        <section className="rounded-2xl border border-yellow-200 bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold">{data.tagline}</h2>
          <div className="mt-3 h-1.5 w-32 rounded bg-yellow-400" />
        

          <ul className="mt-6 grid gap-3 text-sm md:text-base">
            {data.bullets.map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-2 rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-2"
              >
                <span className="mt-1 inline-block h-2 w-2 rotate-45 bg-yellow-400 border border-black" />
                <span>{b}</span>
              </li>
            ))}
          </ul>



          {/* Footer note */}
          <p className="mt-6 text-xs text-neutral-600">
            *No PHI collected in this demo. All data shown is example-only.
          </p>
        </section>
      </div>

      {/* Floating FAB: Ask Chatbot */}
      <Link
        href="/chat"
        aria-label="Ask Chatbot"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-30 rounded-full bg-yellow-400 text-black font-bold px-5 py-3 border border-yellow-500 shadow-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-black/20"
      >
        🐝 Ask Chatbot
      </Link>
    </main>
  );
}
