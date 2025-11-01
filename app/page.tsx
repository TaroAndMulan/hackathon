import Link from "next/link";
import Ballpit from "../components/Ballpit";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#fffbee] via-[#fff9c2] to-[#fff8a0] text-black">
      {/* Ballpit sits ABOVE the background, BELOW content */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Ballpit
          count={150}
          gravity={0.95}
          friction={0.8}
          wallBounce={0.95}
          followCursor={true}
          ambientColor={0xfacc15}
          colors={[0xfcd34d, 0xfef08a, 0xeab308]}
        />
      </div>

      {/* Navigation */}
      <div className="absolute top-6 right-6 z-20 flex gap-4">
        <Link
          href="/products"
          className="px-4 py-2 rounded-xl bg-yellow-400 text-black font-medium border border-yellow-500 hover:bg-yellow-500 hover:scale-105 transition-all shadow-md"
        >
          Products
        </Link>
        <Link
          href="/about"
          className="px-4 py-2 rounded-xl bg-yellow-400 text-black font-medium border border-yellow-500 hover:bg-yellow-500 hover:scale-105 transition-all shadow-md"
        >
          About Us
        </Link>
      </div>

      {/* Hero: big title then paragraph */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 pt-24 pb-10 text-center">
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight">Phöbee</h1>
        <div className="mx-auto mt-3 h-1.5 w-40 md:w-56 rounded bg-yellow-400" />
        <p className="mt-6 text-lg md:text-2xl leading-relaxed text-neutral-800">
          Phobias aren’t just “strong fears”—they’re disabling anxiety disorders
          that can limit life opportunities and overall health. Phöbee aims to
          make evidence-based help simple, clear, and accessible.
        </p>
      </section>

      {/* Bottom honey strip */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500/90 opacity-80" />
    </div>
  );
}
