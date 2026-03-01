'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { useState, useEffect, useRef } from 'react'

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Actuele KPI's",
    description: "Real-time indicatoren die de voortgang op strategische doelen van de regio meten.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    title: "Trends & Analyses",
    description: "Ontdek patronen over tijd met interactieve visualisaties en vergelijkingen.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
    title: "Regionale Vergelijkingen",
    description: "Benchmark met provinciale en landelijke cijfers voor context.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: "Open Data",
    description: "Transparante databronnen en methodologie voor betrouwbare inzichten.",
  },
]

const audiences = [
  { 
    image: '/images/homepage/audience-beleid.jpg',
    title: 'Beleidsmakers', 
    desc: 'Monitor beleidsdoelen en onderbouw beslissingen met data',
  },
  { 
    image: '/images/homepage/audience-onderzoek.jpg',
    title: 'Onderzoekers', 
    desc: 'Toegang tot betrouwbare datasets over de regio',
  },
  { 
    image: '/images/homepage/audience-ondernemer.jpg',
    title: 'Ondernemers', 
    desc: 'Ontdek economische kansen en trends in Foodvalley',
  },
  { 
    image: '/images/homepage/audience-burger.jpg',
    title: 'Burgers', 
    desc: 'Transparant inzicht in regionale ontwikkelingen',
  },
]

const themeIcons: Record<string, React.ReactNode> = {
  '1.1': ( // Toekomstbestendig voedselsysteem - appel/voedsel icoon
    <svg className="w-6 h-6 text-white/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2c1 0 2.5.5 2.5 2s-1 2-2.5 2m0-4c-1 0-2.5.5-2.5 2s1 2 2.5 2m0-4v4m-5 2c-2.5 1.5-4 4.5-4 8 0 4 3 6 6 6 1.5 0 2.5-.5 3-1 .5.5 1.5 1 3 1 3 0 6-2 6-6 0-3.5-1.5-6.5-4-8-1-.5-2-1-3-1h-4c-1 0-2 .5-3 1z" />
    </svg>
  ),
  '1.2': ( // Agrarische sector - schuur/boerderij icoon
    <svg className="w-6 h-6 text-white/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M4 21V10l8-7 8 7v11M9 21v-6h6v6M12 3v3M7 10h2M15 10h2" />
    </svg>
  ),
  '1.3': ( // Innovatief MKB - lightbulb/innovatie icoon
    <svg className="w-6 h-6 text-white/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  ),
  '1.4': ( // Human Capital - mensen icoon
    <svg className="w-6 h-6 text-white/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
  '2.1': ( // Verstedelijking - gebouwen/stad icoon
    <svg className="w-6 h-6 text-white/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  ),
  '2.2': ( // Natuur & Water - water druppel icoon
    <svg className="w-6 h-6 text-white/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.5 0-7-3.5-7-7 0-4 7-11 7-11s7 7 7 11c0 3.5-2.5 7-7 7z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18c-2 0-3.5-1.5-3.5-3.5" />
    </svg>
  ),
  '2.3': ( // Ruimtegebruik - kaart/grid icoon
    <svg className="w-6 h-6 text-white/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
    </svg>
  ),
  '2.4': ( // Energie - bliksem icoon
    <svg className="w-6 h-6 text-white/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  '2.5': ( // Bereikbaarheid - weg/route icoon
    <svg className="w-6 h-6 text-white/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
}

const themeCategories = [
  {
    code: '1',
    title: 'Toekomstbestendige Economie',
    themes: [
      { code: '1.1', title: 'Toekomstbestendig voedselsysteem', available: false },
      { code: '1.2', title: 'Toekomstbestendige agrarische sector', available: false },
      { code: '1.3', title: 'Innovatief MKB', available: true, slug: 'innovatief-mkb' },
      { code: '1.4', title: 'Human Capital', available: false },
    ],
  },
  {
    code: '2',
    title: 'Verantwoord Groeien',
    themes: [
      { code: '2.1', title: 'Verstedelijking', available: false },
      { code: '2.2', title: 'Natuur & Water', available: false },
      { code: '2.3', title: 'Ruimtegebruik', available: false },
      { code: '2.4', title: 'Energie', available: false },
      { code: '2.5', title: 'Bereikbaarheid', available: false },
    ],
  },
]

const newsItems = [
  {
    type: 'Nieuwsbericht',
    date: '25 februari 2026',
    title: 'Impactmonitor Regio Foodvalley gelanceerd',
    slug: '#',
    image: '/images/homepage/news-1.jpg',
  },
  {
    type: 'Update',
    date: '20 februari 2026',
    title: 'Nieuwe KPI\'s toegevoegd voor Innovatief MKB',
    slug: '#',
    image: '/images/homepage/news-2.jpg',
  },
  {
    type: 'Blog',
    date: '15 februari 2026',
    title: 'Hoe de regio werkt aan een toekomstbestendig voedselsysteem',
    slug: '#',
    image: '/images/homepage/news-3.jpg',
  },
]

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [newsIndex, setNewsIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollNews = (direction: 'prev' | 'next') => {
    if (direction === 'next' && newsIndex < newsItems.length - 1) {
      setNewsIndex(newsIndex + 1)
    } else if (direction === 'prev' && newsIndex > 0) {
      setNewsIndex(newsIndex - 1)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white overflow-x-hidden">
      <Header />
      
      <main className="flex-1">
        {/* ============================================
            HERO SECTION - Like CHE.nl (goes behind fixed header)
        ============================================ */}
        <section className="relative min-h-screen flex flex-col overflow-hidden">
          {/* Background image with gradient overlay from bottom to top */}
          <div className="absolute inset-0">
            {/* Hero background image */}
            <Image
              src="/images/homepage/hero.jpg"
              alt="Impactmonitor Regio Foodvalley"
              fill
              className="object-cover"
              priority
            />
            
            {/* Gradient from bottom (blue) to top (transparent) - like CHE */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#20315c] via-[#20315c]/70 to-transparent" />
          </div>

          {/* Floating badge - like CHE "Open Avond" badge */}
          <div className={`absolute top-32 lg:top-40 right-6 lg:right-[calc((100%-1400px)/2+24px)] xl:right-[calc((100%-1400px)/2+80px)] z-10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="w-36 h-36 lg:w-44 lg:h-44 rounded-full bg-[#aa334d] flex flex-col items-center justify-center text-white text-center p-4 shadow-2xl animate-float">
              <span className="text-[10px] lg:text-xs uppercase tracking-wider text-white/80">Nu beschikbaar</span>
              <span className="text-xl lg:text-2xl font-black leading-tight mt-1" style={{ fontFamily: 'Sohne Breit, sans-serif' }}>
                DATA
              </span>
              <span className="text-xs lg:text-sm mt-1">Innovatief MKB</span>
            </div>
          </div>

          {/* Content positioned at bottom with mt-auto */}
          <div className="relative mt-auto w-full">
            <div className="mx-auto max-w-[1400px] px-6 pb-16 lg:pb-24">
              <div className={`max-w-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {/* Main heading - CHE style uppercase bold */}
                <h1 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] leading-[1.1] text-white mb-6">
                  IMPACTMONITOR REGIO FOODVALLEY
                </h1>

                {/* Subtitle - like CHE */}
                <p className="text-base lg:text-lg text-white/80 mb-8 max-w-lg leading-relaxed">
                  Inzicht in trends en ontwikkelingen van de Strategische Agenda Regio Foodvalley
                </p>

                {/* CTA Button - like CHE red button */}
                <Link
                  href="/strategie/innovatief-mkb"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#aa334d] text-white font-semibold rounded-full hover:bg-[#8f2b41] transition-all duration-300 text-[15px]"
                >
                  Bekijk de Impactmonitor
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            "WAAROM" SECTION - Like CHE "Waarom studeren aan de CHE?"
        ============================================ */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-[1400px] px-6">
            {/* Section header with green title - exactly like CHE */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16">
              <h2 className="text-[1.75rem] sm:text-[2rem] lg:text-[2.5rem] text-[#399356] leading-tight max-w-md">
                WAAROM DE IMPACTMONITOR?
              </h2>
              
              {/* Features grid - 2x2 like CHE */}
              <div className="grid sm:grid-cols-2 gap-x-16 gap-y-10 lg:max-w-2xl">
                {features.map((feature) => (
                  <div key={feature.title} className="group">
                    <div className="w-12 h-12 mb-4 text-[#20315c]">
                      {feature.icon}
                    </div>
                    <h3 className="font-bold text-[#20315c] text-lg mb-2" style={{ fontFamily: 'DM Sans, sans-serif', textTransform: 'none' }}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-[15px] leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA button - like CHE "Ontdek meer over CHE" with line through */}
            <div className="flex justify-center relative">
              {/* Horizontal line behind button */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 -translate-y-1/2" />
              <Link
                href="#themas"
                className="relative z-10 inline-flex items-center justify-center px-8 py-3 bg-white border border-[#20315c]/30 text-[#20315c] font-medium rounded-full hover:bg-gray-50 hover:border-[#20315c]/50 transition-all duration-300 text-[15px]"
              >
                Ontdek meer over de Impactmonitor
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================
            "WIJ ZIJN ER VOOR JOU" SECTION - Like CHE audience section
        ============================================ */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-[1400px] px-6">
            {/* Same layout as WAAROM section - title left, cards right */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
              {/* Left side title - like CHE with light blue color */}
              <h2 className="text-[1.75rem] sm:text-[2rem] lg:text-[2.5rem] text-[#3d89be] leading-tight max-w-md">
                VOOR WIE IS DE IMPACTMONITOR?
              </h2>

              {/* Right side cards - same width as features grid above */}
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-24 lg:max-w-2xl pt-16">
                {audiences.map((item) => (
                  <Link
                    key={item.title}
                    href="#themas"
                    className="group relative"
                  >
                    {/* Image that overflows above the card - portrait format like CHE */}
                    <div className="absolute -top-16 left-4 w-[90px] h-[125px] z-10">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Light grey card like CHE - shorter height */}
                    <div className="bg-[#e9eef3] h-[160px] flex flex-col justify-end p-5 pb-6 hover:bg-[#dfe5ec] transition-colors duration-300">
                      {/* Title row with arrow */}
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-[#20315c] text-[15px]" style={{ fontFamily: 'DM Sans, sans-serif', textTransform: 'none' }}>
                          {item.title}
                        </h3>
                        <svg className="w-5 h-5 text-[#20315c] group-hover:translate-x-1 transition-all shrink-0 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                      </div>
                      <p className="text-gray-500 text-sm leading-snug">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            "HOE GA JIJ STUDEREN" SECTION - Theme comparison like CHE
        ============================================ */}
        <section id="themas" className="py-20 lg:py-28 bg-[#20315c] text-white scroll-mt-32">
          <div className="mx-auto max-w-[1400px] px-6">
            {/* Section header - like CHE, left aligned */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16 mb-12">
              <h2 className="text-[1.75rem] sm:text-[2rem] lg:text-[2.5rem] leading-tight mb-4 lg:mb-0 lg:w-[35%] lg:shrink-0">
                STRATEGISCHE AGENDA
              </h2>
              <p className="text-white text-[14px] leading-relaxed lg:w-[65%]">
                In Regio Foodvalley werken ondernemers, onderwijs en overheden samen aan het voedselsysteem van de toekomst. Deze ambitie is vastgelegd in de Strategische Agenda 2026-2030 en bestaat uit twee hoofdlijnen: een toekomstbestendige economie en verantwoord groeien. De Impactmonitor Regio Foodvalley geeft een zo volledig mogelijk beeld en duiding van trends en ontwikkelingen van de Strategische Agenda.
              </p>
            </div>

            {/* Ambitie block above the two main columns */}
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 lg:p-8 mb-6">
              <h3 className="text-xl lg:text-2xl font-bold mb-2">
                AMBITIE 2026-2030
              </h3>
              <p className="text-white text-[14px]">
                Toonaangevend in het voedselsysteem van de toekomst
              </p>
            </div>

            {/* Theme columns - like CHE study type comparison */}
            <div className="grid lg:grid-cols-2 gap-6">
              {themeCategories.map((category) => (
                <div key={category.code} className="bg-white/5 backdrop-blur rounded-2xl p-6 lg:p-8">
                  {/* Category header */}
                  <h3 className="text-xl lg:text-2xl font-bold mb-6">
                    {category.title}
                  </h3>
                  
                  {/* Theme list */}
                  <div className="space-y-3">
                    {category.themes.map((theme) => (
                      <div key={theme.code}>
                        {theme.available ? (
                          <Link
                            href={`/strategie/${theme.slug}`}
                            className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors group"
                          >
                            {themeIcons[theme.code]}
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{theme.title}</span>
                                <span className="w-2 h-2 bg-[#399356] rounded-full animate-pulse" />
                              </div>
                              <span className="text-sm text-white/60">Nu beschikbaar</span>
                            </div>
                            <svg className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </Link>
                        ) : (
                          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl opacity-50">
                            <div className="opacity-60">{themeIcons[theme.code]}</div>
                            <div className="flex-1">
                              <span className="font-medium text-white/60">{theme.title}</span>
                              <span className="block text-sm text-white/40">Binnenkort beschikbaar</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Brede Welvaart block below the two main columns */}
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 lg:p-8 mt-6">
              <h3 className="text-xl lg:text-2xl font-bold mb-2">
                BREDE WELVAART
              </h3>
              <p className="text-white text-[14px] mb-6">
                In een regio waar het goed wonen, werken, recreëren en ondernemen is
              </p>
              
              {/* Brede Welvaart items - with icons like CHE */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Link
                  href="/strategie/goed-wonen"
                  className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors group"
                >
                  <svg className="w-6 h-6 text-white/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                  <div className="flex-1">
                    <span className="font-medium">Goed wonen</span>
                  </div>
                  <svg className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                
                <Link
                  href="/strategie/goed-werken"
                  className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors group"
                >
                  <svg className="w-6 h-6 text-white/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                  </svg>
                  <div className="flex-1">
                    <span className="font-medium">Goed werken</span>
                  </div>
                  <svg className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                
                <Link
                  href="/strategie/goed-recreeren"
                  className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors group"
                >
                  <svg className="w-6 h-6 text-white/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                  <div className="flex-1">
                    <span className="font-medium">Goed recreëren</span>
                  </div>
                  <svg className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                
                <Link
                  href="/strategie/goed-ondernemen"
                  className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors group"
                >
                  <svg className="w-6 h-6 text-white/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                  </svg>
                  <div className="flex-1">
                    <span className="font-medium">Goed ondernemen</span>
                  </div>
                  <svg className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* ============================================
            "DATA-GEDREVEN BELEID" SECTION - Like CHE identity section
        ============================================ */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-[1400px] px-6">
            <div className="flex flex-col lg:flex-row lg:gap-20">
              {/* Title left - like CHE */}
              <div className="lg:w-[35%] lg:shrink-0 mb-8 lg:mb-0">
                <h2 className="text-[1.75rem] sm:text-[2rem] lg:text-[2.5rem] text-[#20315c] leading-tight">
                  DATA-GEDREVEN BELEID VOOR DE REGIO
                </h2>
              </div>

              {/* Content right - like CHE */}
              <div className="lg:w-[65%]">
                <p className="text-[#20315c] text-[15px] leading-relaxed">
                  De Impactmonitor geeft een zo volledig mogelijk beeld en duiding van trends en ontwikkelingen van de Strategische Agenda Regio Foodvalley. Het geeft cruciale voeding aan de discussie onder de betrokkenen, waarbij economische vooruitgang wordt geplaatst in de context van andere maatschappelijke opgaven.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            "SAMENWERKEN OF VRAGEN?" CTA - Like CHE contact banner
        ============================================ */}
        <section className="bg-[#20315c] pt-16 lg:pt-24">
          <div className="mx-auto max-w-[1400px] px-6">
            <div className="bg-[#aa334d] py-12 lg:py-16 px-8 lg:px-12">
              <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
                <h2 className="text-[1.5rem] sm:text-[1.75rem] lg:text-[2rem] text-white leading-tight mb-4 lg:mb-0 lg:w-[35%] lg:shrink-0">
                  SAMENWERKEN OF VRAGEN?
                </h2>
                <div className="lg:w-[65%]">
                  <p className="text-white/90 text-[15px] leading-relaxed mb-6">
                    Heb je een vraag, een onderzoeksvraagstuk of wil je samenwerken? We kijken graag samen met jou naar de mogelijkheden.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#aa334d] font-medium rounded-full hover:bg-white/90 transition-all duration-300 text-[15px]"
                  >
                    Neem contact op
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            "AGENDA" / NEWS SECTION - Like CHE events carousel
        ============================================ */}
        <section className="py-20 lg:py-28 bg-[#20315c] text-white">
          <div className="mx-auto max-w-[1400px] px-6">
            {/* Section header - title left aligned */}
            <h2 className="text-[1.75rem] sm:text-[2rem] lg:text-[2.5rem] leading-tight mb-12 lg:w-[30%]">
              LAATSTE NIEUWS
            </h2>

            {/* News cards - like CHE, offset to align with title end */}
            <div className="relative lg:ml-[30%]">
              <div 
                ref={carouselRef}
                className="grid md:grid-cols-3 gap-6"
              >
                {newsItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.slug}
                    className="group block"
                  >
                    {/* News image - fixed aspect ratio */}
                    <div className="aspect-[4/3] relative overflow-hidden mb-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Content - white background, fixed height */}
                    <div className="bg-white p-5 pt-4 h-[180px] flex flex-col">
                      <div className="text-[#20315c]/60 text-sm mb-2">
                        {item.type} / {item.date}
                      </div>
                      <h3 className="text-[#20315c] text-base font-bold leading-tight mb-4 flex-1" style={{ fontFamily: 'DM Sans, sans-serif', textTransform: 'none' }}>
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[#20315c] text-sm font-medium group-hover:gap-3 transition-all mt-auto">
                        Meer nieuws
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Carousel navigation - like CHE with red buttons */}
              <div className="flex items-center justify-end gap-2 mt-8">
                <button
                  onClick={() => scrollNews('prev')}
                  disabled={newsIndex === 0}
                  className="w-10 h-10 rounded-full bg-[#aa334d] hover:bg-[#8f2b41] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollNews('next')}
                  disabled={newsIndex >= newsItems.length - 1}
                  className="w-10 h-10 rounded-full bg-[#aa334d] hover:bg-[#8f2b41] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>

            {/* CTA */}
            {/* CTA button with line through - like CHE */}
            <div className="flex justify-center mt-16 relative">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20 -translate-y-1/2" />
              <Link
                href="#"
                className="relative z-10 inline-flex items-center justify-center px-8 py-3 bg-[#20315c] border border-white/40 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300 text-[15px]"
              >
                Meer nieuws
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================
            PARTNERS SECTION - Like CHE footer area
        ============================================ */}
        <section className="py-16 lg:py-20 bg-gray-50">
          <div className="mx-auto max-w-[1400px] px-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-xl font-bold text-[#20315c] mb-2" style={{ fontFamily: 'DM Sans, sans-serif', textTransform: 'none' }}>
                  Een samenwerking van
                </h3>
                <p className="text-gray-600">
                  De Impactmonitor is een initiatief van het lectoraat Dienstbaar Organiseren.
                </p>
              </div>
              <div className="flex items-center gap-8">
                <Image
                  src="/images/che-logo.svg"
                  alt="CHE"
                  width={100}
                  height={58}
                  className="h-12 w-auto"
                />
                <span className="text-gray-300 text-2xl">×</span>
                <Image
                  src="/images/foodvalley-icon.svg"
                  alt="Regio Foodvalley"
                  width={120}
                  height={70}
                  className="h-12 w-auto"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
