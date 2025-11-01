import Link from "next/link";

type ProductCard = {
  title: string;
  desc: string;
  img: string;
  slug: "clinician" | "adults" | "institution";
};

const products: ProductCard[] = [
  {
    title: "Clinician",
    desc: "Tools for screening, triage, and therapy support designed for clinical workflows.",
    img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1400&auto=format&fit=crop",
    slug: "clinician",
  },
  {
    title: "Adults",
    desc: "Personalized self-help, exposure practice, and progress tracking for everyday life.",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1400&auto=format&fit=crop",
    slug: "adults",
  },
  {
    title: "Institution",
    desc: "Population insights, risk flags, and referral pathways for schools and enterprises.",
    img: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1400&auto=format&fit=crop",
    slug: "institution",
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fffbee] via-[#fff9c2] to-[#fff8a0] text-gray-900">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Top bar */}
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-4xl font-extrabold tracking-tight text-yellow-700">
            Products
          </h1>
          <div className="flex gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-white/80 border border-yellow-300 text-gray-900 hover:bg-white transition shadow-sm"
            >
              ← Home
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 rounded-xl bg-yellow-400 text-gray-900 font-medium border border-yellow-500 hover:bg-yellow-500 hover:scale-105 transition-all shadow-md"
            >
              About
            </Link>
          </div>
        </div>

        {/* Grid of cards */}
        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-yellow-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-300/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/60"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105 group-hover:-translate-y-1"
                />
                {/* subtle honey overlay for legibility */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-yellow-200/60 via-transparent to-transparent" />
              </div>

              <div className="p-5">
                <h2 className="text-xl font-semibold text-yellow-800">
                  {p.title}
                </h2>
                <p className="mt-2 text-sm text-gray-600">{p.desc}</p>

                {/* CTA row */}
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <span className="inline-flex items-center rounded-lg border border-yellow-300 bg-yellow-100 px-3 py-1 text-yellow-900 transition group-hover:translate-x-0.5">
                    Learn more
                  </span>
                </div>
              </div>

              {/* decorative top stripe */}
              <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 opacity-70" />
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
