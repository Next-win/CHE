'use client'

import { MonitorSection } from './MonitorSection'

interface KPIDataPoint {
  year: number
  valueRegion: number
  valueNational?: number
  sector?: string
  rawRegion?: number
  rawNational?: number
}

interface KPI {
  id: string
  title: string
  description: string
  whatItMeasures: string
  source: string
  frequency: string
  unit: string
  baseYear?: number
  data: KPIDataPoint[]
}

interface Subtheme {
  id: string
  title: string
  description: string
  keyStat?: {
    value: string
    label: string
    suffix?: string
  }
  kpis: KPI[]
}

interface StrategicLineData {
  code: string
  title: string
  description: string
  subthemes: Subtheme[]
}

interface MonitorViewProps {
  data: StrategicLineData
}

export function MonitorView({ data }: MonitorViewProps) {
  return (
    <div className="bg-white min-h-screen">
      {/* Main Content Sections - CHE style */}
      {data.subthemes.map((subtheme, index) => (
        <section
          key={subtheme.id}
          id={subtheme.id}
          className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
              {/* Left: Section Title - CHE style */}
              <div className="lg:w-[35%]">
                <h2 className="text-[40px] text-[var(--che-primary)] leading-[1.05]">
                  {subtheme.title.toUpperCase().split('\n').map((line, i, arr) => (
                    <span key={i}>
                      {line}
                      {i < arr.length - 1 && <br />}
                    </span>
                  ))}
                </h2>
              </div>

              {/* Right: Content */}
              <div className="lg:w-[65%]">
                {/* Intro text - only show if description exists */}
                {subtheme.description && (
                  <p className="text-gray-700 text-base leading-relaxed mb-12">
                    {subtheme.description}
                  </p>
                )}

                {/* KPIs with title and chart */}
                <div className="space-y-12">
                  {subtheme.kpis.map((kpi) => (
                    <div key={kpi.id}>
                      <h3 className="text-lg font-bold text-[var(--che-primary)] mb-4">
                        {kpi.title}
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-6">
                        {kpi.whatItMeasures}
                      </p>
                      <MonitorSection kpi={kpi} compact />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Footer Section - CHE style */}
      <section className="bg-[var(--che-primary)] text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Left: Title */}
            <div className="lg:w-[35%]">
              <h2 className="text-[40px] text-white leading-[1.05]">
                OVER DE<br />DATA
              </h2>
            </div>

            {/* Right: Content */}
            <div className="lg:w-[65%]">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-bold text-white mb-2">Bronnen</h4>
                  <p className="text-white/80 text-sm">
                    LISA, Innovatiemonitor Regio Foodvalley, Monitor Bedrijventerreinen
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">Laatste update</h4>
                  <p className="text-white/80 text-sm">
                    Februari 2026
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">Contact</h4>
                  <p className="text-white/80 text-sm">
                    Neem contact op met het onderzoeksteam van CHE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
