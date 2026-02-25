'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ViewToggle, ViewMode } from '@/components/ui/ViewToggle'
import { KPICard } from '@/components/kpi/KPICard'
import { StoryChapter, StoryKPI } from '@/components/story'
import type { StrategicLineData } from './page'

interface StrategieContentProps {
  data: StrategicLineData
}

export function StrategieContent({ data }: StrategieContentProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('story')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const saved = localStorage.getItem('viewMode')
    if (saved === 'story' || saved === 'dashboard') {
      setViewMode(saved)
    }
  }, [])

  const handleViewChange = (mode: ViewMode) => {
    setViewMode(mode)
    localStorage.setItem('viewMode', mode)
  }

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="gradient-che py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="text-white/80 hover:text-white text-sm">
              Home
            </Link>
            <span className="text-white/60">/</span>
            <span className="text-sm">Strategische lijn {data.code}</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl font-bold bg-white/20 px-3 py-1 rounded">
              {data.code}
            </span>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {data.title}
            </h1>
          </div>
          <p className="max-w-3xl text-lg leading-8 text-white/90">
            {data.description}
          </p>
        </div>
      </section>

      {/* Subtheme Navigation with View Toggle */}
      <section className="border-b border-gray-200 bg-white sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-4">
            <nav className="flex gap-1 overflow-x-auto -mb-px flex-1">
              {data.subthemes.map((subtheme) => (
                <a
                  key={subtheme.id}
                  href={`#${subtheme.id}`}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[var(--che-blauw)] hover:bg-gray-50 rounded-lg whitespace-nowrap transition-colors"
                >
                  {subtheme.title}
                </a>
              ))}
            </nav>
            {isClient && (
              <ViewToggle
                mode={viewMode}
                onChange={handleViewChange}
                className="shrink-0"
              />
            )}
          </div>
        </div>
      </section>

      {/* Content - Story or Dashboard View */}
      {viewMode === 'story' ? (
        <StoryView data={data} />
      ) : (
        <DashboardView data={data} />
      )}
    </main>
  )
}

function StoryView({ data }: { data: StrategicLineData }) {
  let kpiCounter = 0

  return (
    <div>
      {data.subthemes.map((subtheme, index) => (
        <div key={subtheme.id}>
          {/* Chapter Introduction */}
          <StoryChapter
            id={subtheme.id}
            title={subtheme.title}
            description={subtheme.description}
            chapterNumber={index + 1}
            keyStat={subtheme.keyStat}
          />

          {/* KPIs as narrative sections */}
          {subtheme.kpis.map((kpi) => {
            const isAlternate = kpiCounter % 2 === 1
            kpiCounter++
            return (
              <StoryKPI
                key={kpi.id}
                kpi={kpi}
                isAlternate={isAlternate}
              />
            )
          })}

          {/* Visual break between chapters */}
          {index < data.subthemes.length - 1 && (
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          )}
        </div>
      ))}

      {/* Closing section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Wil je alle data in één overzicht?
          </h2>
          <p className="text-gray-600 mb-6">
            Schakel naar de dashboard weergave voor een compact overzicht van alle KPI&apos;s.
          </p>
          <button
            onClick={() => {
              localStorage.setItem('viewMode', 'dashboard')
              window.location.reload()
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--che-blauw)] text-white font-medium rounded-xl hover:bg-[#1a2847] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Bekijk dashboard
          </button>
        </div>
      </section>
    </div>
  )
}

function DashboardView({ data }: { data: StrategicLineData }) {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {data.subthemes.map((subtheme, index) => (
          <section
            key={subtheme.id}
            id={subtheme.id}
            className={`${index > 0 ? 'mt-16 pt-16 border-t border-gray-200' : ''}`}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">{subtheme.title}</h2>
              <p className="mt-2 text-gray-600">{subtheme.description}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {subtheme.kpis.map((kpi) => (
                <KPICard key={kpi.id} kpi={kpi} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
