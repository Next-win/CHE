'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MonitorView } from '@/components/monitor'
import type { StrategicLineData } from './page'

interface StrategieContentProps {
  data: StrategicLineData
}

export function StrategieContent({ data }: StrategieContentProps) {
  return (
    <main className="flex-1">
      {/* Hero Section - CHE Style */}
      <MonitorHero data={data} />

      {/* Content - Monitor View */}
      <MonitorView data={data} />
    </main>
  )
}

function MonitorHero({ data }: { data: StrategicLineData }) {
  return (
    <div className="relative overflow-hidden">
      {/* Section 1: Background image with breadcrumb and title */}
      <section 
        className="pt-24 lg:pt-28 pb-32 lg:pb-40 relative bg-white bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/che-gradient-training.png)'
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-[var(--che-primary)] transition-colors">
                Home
              </Link>
              <span>{'>'}</span>
              <Link href="/" className="hover:text-[var(--che-primary)] transition-colors">
                Impactmonitor
              </Link>
              <span>{'>'}</span>
              <span className="text-gray-700">{data.title}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-[40px] tracking-tight text-[var(--che-primary)] mb-5">
            {data.title.toUpperCase()}
          </h1>
        </div>
      </section>

      {/* Section 2: Blue section with text left, image right (overlapping upward) */}
      <section className="relative bg-[var(--che-primary)]">
        <div className="mx-auto max-w-7xl relative">
          <div className="flex flex-col lg:flex-row">
            {/* Left: Text content */}
            <div className="w-full lg:w-[45%] px-4 sm:px-6 lg:px-8 py-10 lg:py-16 text-white">
              <p className="text-white text-base lg:text-lg leading-relaxed max-w-md">
                {data.description}
              </p>
            </div>

            {/* Right: Image that overflows upward */}
            <div className="w-full lg:w-[55%] relative lg:absolute lg:right-12 lg:top-0 lg:-translate-y-1/3">
              <div className="relative h-[280px] sm:h-[350px] lg:h-[420px] xl:h-[480px] overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero-mkb-suncircle.jpg"
                  alt="Innovatief MKB in Regio Foodvalley"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Extra padding at bottom for the image overflow space on desktop */}
        <div className="hidden lg:block h-16" />

        {/* Snelle Navigatie Section - within blue area */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 lg:pb-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Left: Title */}
            <div className="lg:w-[35%]">
              <h2 className="text-[40px] text-white leading-[1.05]">
                SNELLE<br />NAVIGATIE
              </h2>
            </div>

            {/* Right: Theme links - full width list style */}
            <div className="lg:w-[65%]">
              <div className="flex flex-col">
                {data.subthemes.map((subtheme) => (
                  <a
                    key={subtheme.id}
                    href={`#${subtheme.id}`}
                    className="group flex items-center justify-between py-4 border-t border-white/20 text-white hover:text-white/80 transition-colors"
                  >
                    <span className="text-[15px] font-bold">{subtheme.title}</span>
                    <svg 
                      className="w-5 h-5 flex-shrink-0" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

