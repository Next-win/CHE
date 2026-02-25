import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
  directNaar: [
    { name: 'Admin', href: '/admin' },
    { name: 'Innovatief MKB', href: '/strategie/innovatief-mkb' },
    { name: 'Alle thema\'s', href: '/#themas' },
    { name: 'Contact', href: '/over#contact' },
  ],
  overMonitor: [
    { name: 'Over de monitor', href: '/over' },
    { name: 'Databronnen', href: '/over#databronnen' },
    { name: 'Methodologie', href: '/over#methodologie' },
    { name: 'Partners', href: '/over#partners' },
  ],
  regio: [
    { name: 'Strategische Agenda', href: '/over#agenda' },
    { name: '8 Gemeenten', href: '/over#gemeenten' },
    { name: 'Regio Foodvalley', href: 'https://regiofoodvalley.nl', external: true },
    { name: 'CHE Lectoraat', href: 'https://che.nl', external: true },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#1a2847] text-white">
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left column - Logo and address */}
          <div className="lg:col-span-3">
            <Link href="/" className="inline-block">
              <Image
                src="/images/che-logo-white.svg"
                alt="CHE"
                width={90}
                height={52}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm text-white/70">
              Christelijke Hogeschool Ede
            </p>
            <p className="mt-4 text-sm text-white/60">
              Oude Kerkweg 100<br />
              6717 JS Ede
            </p>
          </div>

          {/* Tagline */}
          <div className="lg:col-span-5">
            <p className="text-xl lg:text-2xl leading-tight" style={{ fontFamily: 'Sohne Breit, sans-serif' }}>
              DE IMPACTMONITOR VOOR REGIO FOODVALLEY.
            </p>
          </div>

          {/* Empty space for alignment */}
          <div className="lg:col-span-4" />
        </div>

        {/* Links grid */}
        <div className="mt-12 pt-12 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Contact column */}
            <div>
              <h3 className="text-sm font-bold mb-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Contact
              </h3>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="mailto:impactmonitor@che.nl" 
                    className="flex items-start gap-3 text-sm text-white/70 hover:text-white transition-colors group"
                  >
                    <svg className="w-5 h-5 shrink-0 mt-0.5 text-white/50 group-hover:text-[#7ac19c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <span>
                      <span className="underline">Stuur een e-mail</span>
                      <span className="block text-white/50 text-xs mt-0.5">impactmonitor@che.nl</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+31318696300" 
                    className="flex items-start gap-3 text-sm text-white/70 hover:text-white transition-colors group"
                  >
                    <svg className="w-5 h-5 shrink-0 mt-0.5 text-white/50 group-hover:text-[#7ac19c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <span>
                      <span className="underline">0318 696 300</span>
                      <span className="block text-white/50 text-xs mt-0.5">Ma t/m vrij 09:00 - 16:30</span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Direct naar column */}
            <div>
              <h3 className="text-sm font-bold mb-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Direct naar
              </h3>
              <ul className="space-y-3">
                {footerLinks.directNaar.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Over de monitor column */}
            <div>
              <h3 className="text-sm font-bold mb-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Over de monitor
              </h3>
              <ul className="space-y-3">
                {footerLinks.overMonitor.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Regio column */}
            <div>
              <h3 className="text-sm font-bold mb-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Regio Foodvalley
              </h3>
              <ul className="space-y-3">
                {footerLinks.regio.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a 
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/70 hover:text-white transition-colors inline-flex items-center gap-1"
                      >
                        {link.name}
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </a>
                    ) : (
                      <Link 
                        href={link.href} 
                        className="text-sm text-white/70 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Social media row - like CHE */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            {/* Legal links */}
            <div className="flex flex-wrap gap-4 text-sm text-white/50">
              <Link href="#" className="hover:text-white transition-colors">
                Privacyverklaring
              </Link>
              <span>•</span>
              <Link href="#" className="hover:text-white transition-colors">
                Disclaimer
              </Link>
            </div>

            {/* Social media icons - like CHE */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/50 mr-2">Social media</span>
              <a 
                href="https://linkedin.com/company/che" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com/che_ede" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com/@che_ede" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Christelijke Hogeschool Ede. Alle rechten voorbehouden.
        </div>
      </div>
    </footer>
  )
}
