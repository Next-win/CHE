import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent } from '@/components/ui/Card'

export default function OverPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="gradient-che py-16 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Over de Impactmonitor
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-white/90">
              Inzicht in de voortgang op strategische doelen van Regio Foodvalley
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Wat is de Impactmonitor?
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    De Impactmonitor Regio Foodvalley is een online platform dat inzicht geeft 
                    in de voortgang op strategische doelen via KPI&apos;s en trends. Het platform is 
                    gebaseerd op de Strategische Agenda 2026-2030 van Regio Foodvalley en maakt 
                    zichtbaar hoe de regio presteert op thema&apos;s als innovatie, werkgelegenheid, 
                    duurzaamheid en leefkwaliteit.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Achtergrond
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Het lectoraat Dienstbaar Organiseren van de Christelijke Hogeschool Ede (CHE) 
                    ontwikkelt deze impactmonitor in samenwerking met Regio Foodvalley. De monitor 
                    is geïnspireerd op de Blue Delta Monitor Fryslân en biedt een vergelijkbare 
                    structuur en navigatielogica.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    De Strategische Agenda 2026-2030 van Regio Foodvalley vormt de ruggengraat van 
                    de monitor. Hierin zijn twee hoofdthema&apos;s gedefinieerd: Toekomstbestendige 
                    Economie en Verantwoord Groeien, met daaronder negen strategische lijnen.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Strategische Structuur
                  </h2>
                  <div className="space-y-4">
                    <Card className="border-l-4 border-l-[var(--che-blauw)]">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          1. Toekomstbestendige Economie
                        </h3>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>1.1 Toonaangevend in een toekomstbestendig voedselsysteem</li>
                          <li>1.2 Toekomstbestendige agrarische sector</li>
                          <li>1.3 Innovatief en toekomstbestendig MKB</li>
                          <li>1.4 Beschikbaarheid en duurzame inzetbaarheid van mensen</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-[var(--che-groen)]">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          2. Verantwoord Groeien
                        </h3>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>2.1 Schaalsprong in verstedelijking</li>
                          <li>2.2 Natuurherstel en robuust watersysteem</li>
                          <li>2.3 Slim benutten beschikbare ruimte</li>
                          <li>2.4 Duurzame energievoorziening en oplossingen voor netcongestie</li>
                          <li>2.5 Duurzame bereikbaarheid</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="gradient-che text-white">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Ontwikkeld door</h3>
                    <p className="text-sm text-white/90">
                      Lectoraat Dienstbaar Organiseren<br />
                      Christelijke Hogeschool Ede
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Databronnen</h3>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--che-blauw)]">•</span>
                        LISA Werkgelegenheidsregister
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--che-blauw)]">•</span>
                        Innovatiemonitor Regio Foodvalley
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--che-blauw)]">•</span>
                        Monitor Bedrijventerreinen (Provincie Gelderland)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--che-blauw)]">•</span>
                        CBS StatLine
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
                    <p className="text-sm text-gray-600">
                      Voor vragen over de Impactmonitor kunt u contact opnemen met het 
                      lectoraat Dienstbaar Organiseren van de CHE.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
