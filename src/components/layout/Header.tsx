'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const mainNavigation = [
  {
    name: 'Thema\'s',
    href: '#themas',
    children: [
      { name: 'Alle thema\'s', href: '/#themas' },
      { name: 'Toekomstbestendige Economie', href: '/#themas', hasSubmenu: true },
      { name: 'Toekomstbestendig voedselsysteem', href: '/strategie/toekomstbestendig-voedselsysteem' },
      { name: 'Agrarische sector', href: '/strategie/agrarische-sector' },
      { name: 'Innovatief MKB', href: '/strategie/innovatief-mkb', available: true },
      { name: 'Human Capital', href: '/strategie/human-capital' },
      { name: 'Verantwoord Groeien', href: '/#themas', hasSubmenu: true },
      { name: 'Verstedelijking', href: '/strategie/verstedelijking' },
      { name: 'Natuur & Water', href: '/strategie/natuur-water' },
      { name: 'Ruimtegebruik', href: '/strategie/ruimtegebruik' },
      { name: 'Energie', href: '/strategie/energie' },
      { name: 'Bereikbaarheid', href: '/strategie/bereikbaarheid' },
    ],
    promoTitle: 'Bekijk de data',
    promoText: 'Ontdek de voortgang op de strategische doelen van Regio Foodvalley met actuele KPI\'s en visualisaties.',
    promoLink: '/strategie/innovatief-mkb',
    promoLinkText: 'Bekijk Innovatief MKB',
  },
  {
    name: 'Regio Foodvalley',
    href: '/over',
    children: [
      { name: 'Over de regio', href: '/over' },
      { name: 'Strategische Agenda 2026-2030', href: '/over#agenda' },
      { name: '8 Gemeenten', href: '/over#gemeenten' },
      { name: 'Partners', href: '/over#partners' },
    ],
    promoTitle: 'Samen werken aan de toekomst',
    promoText: 'Regio Foodvalley is een samenwerkingsverband van 8 gemeenten die werken aan een toekomstbestendig voedselsysteem.',
    promoLink: '/over',
    promoLinkText: 'Lees meer over de regio',
  },
  {
    name: 'Data & Methode',
    href: '/over#data',
    children: [
      { name: 'Databronnen', href: '/over#databronnen' },
      { name: 'Methodologie', href: '/over#methodologie' },
      { name: 'Open Data', href: '/over#opendata' },
    ],
    promoTitle: 'Transparante data',
    promoText: 'Alle data is gebaseerd op betrouwbare bronnen en transparante methodologie.',
    promoLink: '/over#data',
    promoLinkText: 'Bekijk de methodologie',
  },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeDropdown = () => {
    setActiveDropdown(null)
  }

  return (
    <>
      {/* Top bar - overlaps header like CHE */}
      <div className="fixed top-0 right-[60px] z-[60] hidden lg:block">
        <div className="flex items-center h-9 gap-6 bg-[#20315c] text-white text-sm px-6">
          <Link href="/over" className="hover:text-[#7ac19c] transition-colors">
            Over de monitor
          </Link>
          <Link href="/admin" className="hover:text-[#7ac19c] transition-colors">
            Admin
          </Link>
        </div>
      </div>

      {/* Main header - container size like CHE */}
      <header 
        className={`
          fixed z-50 left-0 right-0 transition-all duration-300
          lg:top-6 top-0
        `}
      >
        <div className="mx-auto max-w-[1400px] px-6">
          <div className={`
            transition-all duration-300 px-6
            ${scrolled ? 'bg-white shadow-lg' : 'bg-white'}
          `}>
            <div className="flex h-[72px] items-center justify-between">
            {/* Logo - extends above header like CHE */}
            <Link href="/" className="flex items-center shrink-0 -mt-8">
              <Image
                src="/images/che-logo.svg"
                alt="CHE - Christelijke Hogeschool Ede"
                width={110}
                height={64}
                className="h-16 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation - exactly like CHE */}
            <nav className="hidden lg:flex lg:items-center lg:gap-1">
              {mainNavigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                  className={`
                    px-5 py-2.5 text-[15px] font-medium transition-colors relative
                    ${activeDropdown === item.name
                      ? 'text-[#20315c]' 
                      : 'text-gray-700 hover:text-[#20315c]'
                    }
                  `}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Right side actions - exactly like CHE */}
            <div className="flex items-center gap-1">
              {/* Favorites button - like CHE */}
              <button
                className="p-2.5 text-gray-600 hover:text-[#20315c] transition-colors relative"
                aria-label="Favorieten"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                {/* Badge indicator */}
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#aa334d] rounded-full" />
              </button>

              {/* Search button - like CHE */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 text-gray-600 hover:text-[#20315c] transition-colors"
                aria-label="Zoeken"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>

              {/* Mobile menu button - like CHE hamburger */}
              <button
                type="button"
                className="lg:hidden p-2.5 text-gray-600 hover:text-[#20315c] transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  )}
                </svg>
              </button>
            </div>
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdown - exactly like CHE */}
        {activeDropdown && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/20 z-40"
              onClick={closeDropdown}
              style={{ top: scrolled ? '72px' : '96px' }}
            />
            
            {/* Dropdown content */}
            <div className="absolute top-full left-0 right-0 bg-white shadow-xl z-50 animate-fade-in border-t border-gray-100">
              <div className="mx-auto max-w-[1400px] px-6 py-10">
                <div className="flex justify-between">
                  {/* Left side - Title and links */}
                  <div className="flex-1 max-w-xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl text-[#20315c] font-bold" style={{ fontFamily: 'DM Sans, sans-serif', textTransform: 'none' }}>
                        {activeDropdown}
                      </h3>
                      <button
                        onClick={closeDropdown}
                        className="flex items-center gap-2 text-gray-500 hover:text-[#20315c] transition-colors text-sm"
                      >
                        Sluiten
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <nav className="space-y-1">
                      {mainNavigation.find(n => n.name === activeDropdown)?.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={closeDropdown}
                          className={`
                            flex items-center justify-between py-2.5 text-[15px] transition-colors border-b border-gray-100
                            ${child.hasSubmenu 
                              ? 'text-[#20315c] font-semibold mt-4 first:mt-0' 
                              : 'text-gray-700 hover:text-[#20315c]'
                            }
                            ${child.available ? 'text-[#399356] font-medium' : ''}
                          `}
                        >
                          <span className="flex items-center gap-2">
                            {child.name}
                            {child.available && (
                              <span className="w-2 h-2 bg-[#399356] rounded-full animate-pulse" />
                            )}
                          </span>
                          {!child.hasSubmenu && (
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                          )}
                        </Link>
                      ))}
                    </nav>
                  </div>

                  {/* Right side - Promo card like CHE */}
                  <div className="hidden xl:block w-[380px] ml-16">
                    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#20315c] to-[#1a2847] aspect-[4/3]">
                      {/* Decorative circle badge - like CHE Open Avond badge */}
                      <div className="absolute top-4 right-4 w-28 h-28 rounded-full bg-[#aa334d] flex flex-col items-center justify-center text-white text-center p-2">
                        <span className="text-[10px] uppercase tracking-wide">Nu beschikbaar</span>
                        <span className="text-lg font-bold leading-tight" style={{ fontFamily: 'Sohne Breit, sans-serif' }}>DATA</span>
                        <span className="text-[10px]">Innovatief MKB</span>
                      </div>
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#20315c] to-transparent">
                        <p className="text-white/80 text-sm mb-4">
                          {mainNavigation.find(n => n.name === activeDropdown)?.promoText}
                        </p>
                        <Link
                          href={mainNavigation.find(n => n.name === activeDropdown)?.promoLink || '/'}
                          onClick={closeDropdown}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#aa334d] text-white text-sm font-semibold rounded-lg hover:bg-[#8f2b41] transition-colors"
                        >
                          {mainNavigation.find(n => n.name === activeDropdown)?.promoLinkText}
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Mobile menu - like CHE */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[72px] bg-white z-40 overflow-y-auto animate-fade-in">
            <div className="px-6 py-6">
              <nav className="space-y-1">
                {mainNavigation.map((item) => (
                  <div key={item.name} className="border-b border-gray-100">
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      className="flex items-center justify-between w-full py-4 text-lg font-medium text-[#20315c]"
                    >
                      {item.name}
                      <svg 
                        className={`w-5 h-5 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                    
                    {activeDropdown === item.name && (
                      <div className="pb-4 pl-4 space-y-2 animate-fade-in">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={() => {
                              setMobileMenuOpen(false)
                              setActiveDropdown(null)
                            }}
                            className={`
                              block py-2 text-[15px] transition-colors
                              ${child.hasSubmenu 
                                ? 'text-[#20315c] font-semibold mt-2' 
                                : 'text-gray-600 hover:text-[#20315c]'
                              }
                              ${child.available ? 'text-[#399356] font-medium' : ''}
                            `}
                          >
                            <span className="flex items-center gap-2">
                              {child.name}
                              {child.available && (
                                <span className="w-2 h-2 bg-[#399356] rounded-full animate-pulse" />
                              )}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Mobile links */}
                <div className="pt-4 space-y-2">
                  <Link
                    href="/over"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 text-[15px] text-gray-600 hover:text-[#20315c]"
                  >
                    Over de monitor
                  </Link>
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 text-[15px] text-gray-600 hover:text-[#20315c]"
                  >
                    Admin
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}

        {/* Search overlay - like CHE */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg animate-fade-in z-50">
            <div className="mx-auto max-w-[1400px] px-6 py-8">
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Zoeken op de website"
                    className="w-full px-5 py-4 pl-14 text-lg border border-gray-200 rounded-xl focus:outline-none focus:border-[#399356] focus:ring-2 focus:ring-[#399356]/20 bg-gray-50"
                    autoFocus
                  />
                  <svg className="w-6 h-6 absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-center text-sm text-gray-500 mt-4">
                  Geen resultaten
                </p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* No spacer - hero goes behind header */}
    </>
  )
}
