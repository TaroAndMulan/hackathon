// app/about/page.tsx
"use client";

import Link from "next/link";
import BlurText from "@/components/BlurText";
import ChromaGrid, { ChromaItem } from "@/components/ChromaGrid";

const team: ChromaItem[] = [
  {
    image: "https://i.pravatar.cc/300?img=1",
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@sarahjohnson",
    borderColor: "#facc15",
    gradient: "linear-gradient(145deg,#facc15,#fffbee)",
    url: "https://github.com/sarahjohnson",
  },
  {
    image: "https://i.pravatar.cc/300?img=2",
    title: "Mike Chen",
    subtitle: "Backend Engineer",
    handle: "@mikechen",
    borderColor: "#fbbf24",
    gradient: "linear-gradient(145deg,#fbbf24,#fffbee)",
    url: "https://linkedin.com/in/mikechen",
  },
  {
    image: "https://i.pravatar.cc/300?img=3",
    title: "Emma Patel",
    subtitle: "Product Designer",
    handle: "@emmapatel",
    borderColor: "#fde047",
    gradient: "linear-gradient(145deg,#fde047,#fffbee)",
    url: "#",
  },
  {
    image: "https://i.pravatar.cc/300?img=4",
    title: "Lucas Lee",
    subtitle: "AI Researcher",
    handle: "@lucaslee",
    borderColor: "#facc15",
    gradient: "linear-gradient(145deg,#facc15,#fffbee)",
    url: "#",
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#fffbee] via-[#fff9c2] to-[#fff8a0] text-gray-900 overflow-x-hidden">
      {/* Top nav */}
      <nav className="fixed top-0 right-0 z-50 p-4 md:p-6">
        <div className="flex gap-2 md:gap-3">
          <Link
            href="/"
            className="px-3 md:px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm text-gray-900 text-sm md:text-base border border-yellow-500/30 hover:bg-white hover:border-yellow-500/50 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            ← Home
          </Link>
          <Link
            href="/products"
            className="px-3 md:px-4 py-2 rounded-xl bg-yellow-400 text-gray-900 text-sm md:text-base font-medium border border-yellow-500 hover:bg-yellow-500 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Products
          </Link>
        </div>
      </nav>

      {/* Hero section */}
      <header className="relative pt-20 pb-12 md:pt-28 md:pb-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center space-y-6 md:space-y-8">
          {/* Heading */}
          <BlurText
            text="About Phöbee"
            delay={120}
            animateBy="words"
            direction="top"
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
          />

          {/* Subheading / mission */}
          <p className="text-base md:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto px-4 font-medium drop-shadow-sm">
            We are a small team of clinicians, engineers, and designers on a mission
            to make fear care accessible—turning evidence-based methods into gentle,
            game-like tools that fit real life.
          </p>
        </div>
      </header>

      {/* Team section */}
      <section className="relative w-full py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-800">
            Meet Our Team
          </h2>
          <ChromaGrid
            items={team}
            radius={280}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
          />
        </div>
      </section>

      {/* Spacer for footer */}
      <div className="h-24 md:h-32" />

      {/* Footer accent */}
      <footer className="fixed bottom-0 left-0 right-0 h-10 md:h-12 bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 opacity-70 shadow-[0_-4px_12px_rgba(0,0,0,0.1)]" />
    </div>
  );
}