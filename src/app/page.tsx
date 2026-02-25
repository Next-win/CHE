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

const themeCategories = [
  {
    code: '1',
    title: 'Toekomstbestendige Economie',
    themes: [
      { code: '1.1', title: 'Toekomstbestendig voedselsysteem', available: false },
      { code: '1.2', title: 'Agrarische sector', available: false },
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
                  DE IMPACTMONITOR REGIO FOODVALLEY
                </h1>

                {/* Subtitle - like CHE */}
                <p className="text-base lg:text-lg text-white/80 mb-8 max-w-lg leading-relaxed">
                  Volg de voortgang op de strategische doelen en ontdek data over economie, duurzaamheid en leefbaarheid.
                </p>

                {/* CTA Button - exactly like CHE red button */}
                <Link
                  href="/strategie/innovatief-mkb"
                  className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#aa334d] text-white font-semibold rounded-lg hover:bg-[#8f2b41] transition-all duration-300 text-[15px]"
                >
                  Bekijk Innovatief MKB
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

            {/* CTA button - like CHE "Ontdek meer over CHE" */}
            <div className="flex justify-center">
              <Link
                href="#themas"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-300 text-[#20315c] font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 text-[15px]"
              >
                Ontdek meer over de monitor
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================
            "WIJ ZIJN ER VOOR JOU" SECTION - Like CHE audience section
        ============================================ */}
        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="mx-auto max-w-[1400px] px-6">
            <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-20">
              {/* Left side title - like CHE */}
              <div className="lg:w-1/3 lg:sticky lg:top-40">
                <h2 className="text-[1.75rem] sm:text-[2rem] lg:text-[2.5rem] text-[#399356] leading-tight mb-4">
                  VOOR WIE IS DE MONITOR?
                </h2>
                <p className="text-gray-600 text-lg">
                  Data en inzichten voor iedereen die werkt aan de toekomst van de regio.
                </p>
              </div>

              {/* Right side cards - like CHE persona cards */}
              <div className="lg:w-2/3 grid sm:grid-cols-2 gap-5">
                {audiences.map((item) => (
                  <Link
                    key={item.title}
                    href="#themas"
                    className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {/* Audience image - like CHE persona images */}
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    
                    {/* Card content */}
                    <div className="p-5 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-[#20315c] text-lg mb-1" style={{ fontFamily: 'DM Sans, sans-serif', textTransform: 'none' }}>
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-[#20315c] group-hover:translate-x-1 transition-all shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
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
            {/* Section header - like CHE */}
            <div className="text-center mb-12">
              <h2 className="text-[1.75rem] sm:text-[2rem] lg:text-[2.5rem] leading-tight mb-4">
                STRATEGISCHE THEMA&apos;S
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                De Strategische Agenda 2026-2030 van Regio Foodvalley bevat 9 thema&apos;s verdeeld over twee hoofdlijnen.
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
                            <div className="w-10 h-10 rounded-lg bg-[#399356] flex items-center justify-center text-white font-bold text-sm shrink-0">
                              {theme.code}
                            </div>
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
                            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-white/60 font-bold text-sm shrink-0">
                              {theme.code}
                            </div>
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

            {/* CTA - like CHE "Lees meer" links */}
            <div className="flex justify-center mt-10">
              <Link
                href="/over"
                className="inline-flex items-center gap-3 px-7 py-3.5 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 text-[15px]"
              >
                Lees meer over de agenda
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================
            "PROFITEER VAN FLEXIBEL" SECTION - Feature highlight
        ============================================ */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-[1400px] px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Feature image - like CHE */}
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                  <Image
                    src="/images/homepage/feature.jpg"
                    alt="Data-gedreven beleid"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#20315c]/80 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="text-4xl font-bold">50+</div>
                    <div className="text-white/80">KPI&apos;s beschikbaar</div>
                  </div>
                </div>
              </div>

              {/* Content - like CHE */}
              <div>
                <h2 className="text-[1.75rem] sm:text-[2rem] lg:text-[2.5rem] text-[#20315c] leading-tight mb-6">
                  DATA-GEDREVEN BELEID VOOR DE REGIO
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  De Impactmonitor brengt alle relevante data over de regio samen op één plek. 
                  Van economische groei tot duurzaamheidsindicatoren - alles overzichtelijk 
                  gepresenteerd met interactieve visualisaties.
                </p>
                <Link
                  href="/strategie/innovatief-mkb"
                  className="inline-flex items-center gap-2 text-[#399356] font-semibold hover:gap-3 transition-all text-lg group"
                >
                  Bekijk de data
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            "AGENDA" / NEWS SECTION - Like CHE events carousel
        ============================================ */}
        <section className="py-20 lg:py-28 bg-[#20315c] text-white">
          <div className="mx-auto max-w-[1400px] px-6">
            {/* Section header */}
            <h2 className="text-[1.75rem] sm:text-[2rem] lg:text-[2.5rem] leading-tight mb-12">
              LAATSTE NIEUWS
            </h2>

            {/* News cards carousel - like CHE */}
            <div className="relative">
              <div 
                ref={carouselRef}
                className="grid md:grid-cols-3 gap-6"
              >
                {newsItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.slug}
                    className="group bg-[#aa334d] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {/* News image */}
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#aa334d]/60 to-transparent" />
                    </div>
                    
                    {/* Content */}
                    <div className="p-5">
                      <div className="text-white/70 text-sm mb-2">
                        {item.type} / {item.date}
                      </div>
                      <h3 className="text-lg font-bold leading-tight mb-4" style={{ fontFamily: 'DM Sans, sans-serif', textTransform: 'none' }}>
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                        Meer nieuws
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Carousel navigation - like CHE */}
              <div className="flex items-center justify-end gap-2 mt-8">
                <button
                  onClick={() => scrollNews('prev')}
                  disabled={newsIndex === 0}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollNews('next')}
                  disabled={newsIndex >= newsItems.length - 1}
                  className="w-10 h-10 rounded-full bg-[#aa334d] hover:bg-[#8f2b41] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="flex justify-center mt-10">
              <Link
                href="#"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 text-[15px]"
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
