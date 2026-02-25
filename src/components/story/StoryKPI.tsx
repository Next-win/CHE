'use client'

import { KPIChart } from '@/components/charts/KPIChart'
import { formatNumber } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface KPIDataPoint {
  year: number
  valueRegion: number
  valueNational?: number
  sector?: string
  rawRegion?: number
  rawNational?: number
}

interface StoryKPIProps {
  kpi: {
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
  isAlternate?: boolean
  className?: string
}

export function StoryKPI({ kpi, isAlternate = false, className }: StoryKPIProps) {
  const hasSectorData = kpi.data.some(d => d.sector)
  const hasNationalData = kpi.data.some(d => d.valueNational !== undefined)
  const isIndexData = kpi.unit === 'index'
  
  const latestData = kpi.data
    .filter(d => !d.sector || d.sector === kpi.data[kpi.data.length - 1]?.sector)
    .sort((a, b) => b.year - a.year)[0]

  const getHighlightValue = () => {
    if (!latestData) return null
    
    if (isIndexData) {
      return {
        value: latestData.valueRegion.toFixed(1),
        label: `Index t.o.v. ${kpi.baseYear} (${latestData.year})`,
        suffix: undefined,
      }
    }
    
    if (kpi.unit === 'percentage') {
      return {
        value: latestData.valueRegion,
        label: `Regio Foodvalley (${latestData.year})`,
        suffix: '%',
      }
    }
    
    if (kpi.unit === 'hectare') {
      return {
        value: latestData.valueRegion,
        label: `Regio Foodvalley (${latestData.year})`,
        suffix: ' ha',
      }
    }
    
    return {
      value: formatNumber(latestData.valueRegion),
      label: `Regio Foodvalley (${latestData.year})`,
      suffix: undefined,
    }
  }

  const highlight = getHighlightValue()

  return (
    <section 
      className={cn(
        'py-16 lg:py-24',
        isAlternate ? 'bg-gray-50' : 'bg-white',
        className
      )}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className={cn(
          'grid gap-8 lg:gap-12 items-center',
          isAlternate ? 'lg:grid-cols-[1fr,1.2fr]' : 'lg:grid-cols-[1.2fr,1fr]'
        )}>
          <div className={cn(isAlternate && 'lg:order-2')}>
            <span className="inline-block px-3 py-1 bg-[var(--che-blauw)]/10 rounded-full text-[var(--che-blauw)] text-xs font-semibold mb-4">
              {kpi.source}
            </span>
            
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              {kpi.title}
            </h3>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              {kpi.whatItMeasures}
            </p>

            {highlight && (
              <div className="inline-flex flex-col p-5 bg-gradient-to-br from-[var(--che-blauw)] to-[#3d89be] rounded-xl text-white mb-6">
                <div className="text-4xl lg:text-5xl font-bold">
                  {highlight.value}
                  {highlight.suffix && <span className="text-2xl lg:text-3xl">{highlight.suffix}</span>}
                </div>
                <div className="text-white/80 text-sm mt-1">
                  {highlight.label}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {kpi.frequency}
              </span>
              {kpi.baseYear && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Basisjaar: {kpi.baseYear}
                </span>
              )}
            </div>
          </div>

          <div className={cn(
            'bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-100',
            isAlternate && 'lg:order-1'
          )}>
            <div className="h-[300px] lg:h-[350px]">
              <KPIChart 
                data={kpi.data} 
                unit={kpi.unit}
                hasSectorData={hasSectorData}
                hasNationalData={hasNationalData}
                baseYear={kpi.baseYear}
              />
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
              Bron: {kpi.source}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
