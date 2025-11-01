'use client';
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export interface ChromaItem {
  image: string;
  title: string;
  subtitle: string;
  handle?: string;
  location?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
}

export interface ChromaGridProps {
  items?: ChromaItem[];
  className?: string;
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
}

type SetterFn = (v: number | string) => void;

const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  className = '',
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out',
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<SetterFn | null>(null);
  const setY = useRef<SetterFn | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  // 🐝 Demo items in honey gradients (replace #000 with #fffbee / warm whites)
  const demo: ChromaItem[] = [
    {
      image: 'https://i.pravatar.cc/300?img=8',
      title: 'Alex Rivera',
      subtitle: 'Full Stack Developer',
      handle: '@alexrivera',
      borderColor: '#facc15', // yellow-400
      gradient: 'linear-gradient(145deg,#facc15,#fffbee)',
      url: 'https://github.com/',
    },
    {
      image: 'https://i.pravatar.cc/300?img=11',
      title: 'Jordan Chen',
      subtitle: 'DevOps Engineer',
      handle: '@jordanchen',
      borderColor: '#fbbf24', // amber-400
      gradient: 'linear-gradient(210deg,#fbbf24,#fff8a0)',
      url: 'https://linkedin.com/in/',
    },
    {
      image: 'https://i.pravatar.cc/300?img=3',
      title: 'Morgan Blake',
      subtitle: 'UI/UX Designer',
      handle: '@morganblake',
      borderColor: '#fde047', // yellow-300
      gradient: 'linear-gradient(165deg,#fde047,#fffbee)',
      url: 'https://dribbble.com/',
    },
    {
      image: 'https://i.pravatar.cc/300?img=16',
      title: 'Casey Park',
      subtitle: 'Data Scientist',
      handle: '@caseypark',
      borderColor: '#eab308', // yellow-500
      gradient: 'linear-gradient(195deg,#eab308,#fff9c2)',
      url: 'https://kaggle.com/',
    },
    {
      image: 'https://i.pravatar.cc/300?img=25',
      title: 'Sam Kim',
      subtitle: 'Mobile Developer',
      handle: '@thesamkim',
      borderColor: '#f59e0b', // amber-500
      gradient: 'linear-gradient(225deg,#f59e0b,#fff8a0)',
      url: 'https://github.com/',
    },
    {
      image: 'https://i.pravatar.cc/300?img=60',
      title: 'Tyler Rodriguez',
      subtitle: 'Cloud Architect',
      handle: '@tylerrod',
      borderColor: '#facc15',
      gradient: 'linear-gradient(135deg,#facc15,#fffbee)',
      url: 'https://aws.amazon.com/',
    },
  ];

  const data = items?.length ? items : demo;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px') as SetterFn;
    setY.current = gsap.quickSetter(el, '--y', 'px') as SetterFn;
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e: React.PointerEvent) => {
    const r = rootRef.current!.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true,
    });
  };

  const handleCardClick = (url?: string) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCardMove: React.MouseEventHandler<HTMLElement> = (e) => {
    const c = e.currentTarget as HTMLElement;
    const rect = c.getBoundingClientRect();
    c.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    c.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative w-full h-full flex flex-wrap justify-center items-start gap-3 ${className}`}
      style={
        {
          '--r': `${radius}px`,
          '--x': '50%',
          '--y': '50%',
        } as React.CSSProperties
      }
    >
      {data.map((c, i) => (
        <article
          key={i}
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c.url)}
          className="group relative flex flex-col w-[300px] rounded-[20px] overflow-hidden border-2 transition-all duration-300 cursor-pointer hover:-translate-y-1.5 hover:shadow-xl"
          style={
            {
              // border + bg in honey palette
              borderColor: c.borderColor || '#fde047',
              background: c.gradient,
              // warm yellow spotlight instead of white
              '--spotlight-color': 'rgba(250, 204, 21, 0.35)',
            } as React.CSSProperties
          }
        >
          {/* spotlight follows cursor */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)',
            }}
          />
          <div className="relative z-10 flex-1 p-[10px] box-border">
            <img
              src={c.image}
              alt={c.title}
              loading="lazy"
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>

          {/* text is dark for white/yellow theme */}
          <footer className="relative z-10 p-3 text-gray-900 font-sans grid grid-cols-[1fr_auto] gap-x-3 gap-y-1">
            <h3 className="m-0 text-[1.05rem] font-semibold">{c.title}</h3>
            {c.handle && (
              <span className="text-[0.95rem] opacity-70 text-right">
                {c.handle}
              </span>
            )}
            <p className="m-0 text-[0.9rem] opacity-85">{c.subtitle}</p>
            {c.location && (
              <span className="text-[0.85rem] opacity-80 text-right">
                {c.location}
              </span>
            )}
          </footer>
        </article>
      ))}

      {/* 🐝 Base vignette: lighten & warm instead of darken */}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          backdropFilter: 'saturate(1.05) brightness(1.03)', // gentle lift
          WebkitBackdropFilter: 'saturate(1.05) brightness(1.03)',
          background: 'rgba(250, 204, 21, 0.06)', // subtle honey tint
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.04) 30%,rgba(0,0,0,0.08)45%,rgba(0,0,0,0.12)60%,rgba(0,0,0,0.18)75%,rgba(0,0,0,0.26)88%,white 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.04) 30%,rgba(0,0,0,0.08)45%,rgba(0,0,0,0.12)60%,rgba(0,0,0,0.18)75%,rgba(0,0,0,0.26)88%,white 100%)',
        }}
      />

      {/* fade-in blanket when pointer leaves (still warm/bright) */}
      <div
        ref={fadeRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"
        style={{
          backdropFilter: 'saturate(1.02) brightness(1.02)',
          WebkitBackdropFilter: 'saturate(1.02) brightness(1.02)',
          background: 'rgba(253, 224, 71, 0.08)', // yellow-300 tint
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.92)30%,rgba(255,255,255,0.85)45%,rgba(255,255,255,0.72)60%,rgba(255,255,255,0.55)75%,rgba(255,255,255,0.36)88%,transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.92)30%,rgba(255,255,255,0.85)45%,rgba(255,255,255,0.72)60%,rgba(255,255,255,0.55)75%,rgba(255,255,255,0.36)88%,transparent 100%)',
          opacity: 1,
        }}
      />
    </div>
  );
};

export default ChromaGrid;
