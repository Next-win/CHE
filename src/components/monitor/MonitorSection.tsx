'use client'

import { KPIChart } from '@/components/charts/KPIChart'
import { cn } from '@/lib/utils'

interface KPIDataPoint {
  year: number
  valueRegion: number
  valueNational?: number
  sector?: string
  companySize?: string
  successFactor?: string
  municipality?: string
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
  infoText?: string
  data: KPIDataPoint[]
  referenceLines?: { value: number; label: string; color: string }[]
}

interface MonitorSectionProps {
  kpi: KPI
  className?: string
  compact?: boolean
}

function getLatestValue(kpi: KPI) {
  const nonSectorData = kpi.data.filter(d => !d.sector)
  if (nonSectorData.length > 0) {
    const sorted = [...nonSectorData].sort((a, b) => b.year - a.year)
    return sorted[0]
  }
  
  const sectors = [...new Set(kpi.data.map(d => d.sector).filter(Boolean))]
  if (sectors.length > 0) {
    const latestYear = Math.max(...kpi.data.map(d => d.year))
    const sectorData = kpi.data.filter(d => d.year === latestYear && d.sector)
    const maxSector = sectorData.reduce((max, curr) => 
      curr.valueRegion > max.valueRegion ? curr : max
    , sectorData[0])
    return maxSector
  }
  
  return kpi.data[kpi.data.length - 1]
}

function getPreviousValue(kpi: KPI, latestYear: number) {
  const nonSectorData = kpi.data.filter(d => !d.sector && d.year < latestYear)
  if (nonSectorData.length > 0) {
    const sorted = [...nonSectorData].sort((a, b) => b.year - a.year)
    return sorted[0]
  }
  return null
}

function formatValue(value: number, unit: string, baseYear?: number) {
  if (unit === 'index') {
    return value.toFixed(1)
  }
  if (unit === 'percentage') {
    return `${value}%`
  }
  if (unit === 'hectare') {
    return `${value} ha`
  }
  if (value >= 1000000) {
    return `€${(value / 1000000).toFixed(1)} miljard`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`
  }
  return value.toString()
}

function generateHeadline(kpi: KPI): string {
  const latest = getLatestValue(kpi)
  if (!latest) return kpi.title
  
  const years = [...new Set(kpi.data.filter(d => !d.sector).map(d => d.year))].sort((a, b) => a - b)
  const hasMultipleYears = years.length > 1
  const previousYearData = hasMultipleYears 
    ? kpi.data.find(d => d.year === years[years.length - 2] && !d.sector)
    : null
  
  if (kpi.unit === 'index' && kpi.baseYear) {
    const growth = latest.valueRegion - 100
    if (growth >= 0) {
      return `${kpi.title} groeit met ${growth.toFixed(0)}% sinds ${kpi.baseYear}`
    }
    return `${kpi.title} daalt met ${Math.abs(growth).toFixed(0)}% sinds ${kpi.baseYear}`
  }
  
  if (kpi.unit === 'percentage') {
    if (kpi.data.some(d => d.sector)) {
      const latestYear = Math.max(...kpi.data.map(d => d.year))
      const sectorData = kpi.data.filter(d => d.year === latestYear && d.sector)
      const topSector = sectorData.reduce((max, curr) => 
        curr.valueRegion > max.valueRegion ? curr : max
      , sectorData[0])
      
      if (topSector) {
        return `${topSector.valueRegion}% van bedrijven actief met ${topSector.sector?.toLowerCase()} in ${latestYear}`
      }
    }
    
    if (previousYearData && latest.valueRegion !== previousYearData.valueRegion) {
      const change = latest.valueRegion - previousYearData.valueRegion
      const direction = change > 0 ? 'stijgt' : 'daalt'
      return `${kpi.title} ${direction} naar ${latest.valueRegion}% in ${latest.year}`
    }
    
    return `${latest.valueRegion}% ${kpi.title.toLowerCase()} in Regio Foodvalley`
  }
  
  if (kpi.unit === 'hectare') {
    if (previousYearData) {
      const change = latest.valueRegion - previousYearData.valueRegion
      if (change > 0) {
        return `Uitgifte bedrijventerrein stijgt naar ${latest.valueRegion} hectare in ${latest.year}`
      } else if (change < 0) {
        return `Uitgifte bedrijventerrein daalt naar ${latest.valueRegion} hectare in ${latest.year}`
      }
    }
    return `${latest.valueRegion} hectare ${kpi.title.toLowerCase()} in ${latest.year}`
  }
  
  return `${kpi.title} in ${latest.year}: ${formatValue(latest.valueRegion, kpi.unit)}`
}

function generateAnalysis(kpi: KPI): string {
  const latest = getLatestValue(kpi)
  if (!latest) return kpi.whatItMeasures
  
  const hasNational = kpi.data.some(d => d.valueNational !== undefined)
  const hasSector = kpi.data.some(d => d.sector)
  
  let analysis = kpi.whatItMeasures
  
  if (hasNational && latest.valueNational) {
    const diff = latest.valueRegion - latest.valueNational
    const comparison = diff > 0 
      ? `De regio scoort ${Math.abs(diff).toFixed(1)} ${kpi.unit === 'percentage' ? 'procentpunt' : 'punten'} hoger dan het landelijk gemiddelde.`
      : diff < 0
      ? `De regio scoort ${Math.abs(diff).toFixed(1)} ${kpi.unit === 'percentage' ? 'procentpunt' : 'punten'} lager dan het landelijk gemiddelde.`
      : 'De regio scoort gelijk aan het landelijk gemiddelde.'
    analysis = `${analysis} ${comparison}`
  }
  
  if (kpi.unit === 'index' && kpi.baseYear) {
    const years = [...new Set(kpi.data.map(d => d.year))].sort((a, b) => a - b)
    const period = `${years[0]}-${years[years.length - 1]}`
    const totalGrowth = latest.valueRegion - 100
    analysis = `${analysis} Over de periode ${period} is de groei ${totalGrowth.toFixed(1)}%.`
  }
  
  return analysis
}

export function MonitorSection({ kpi, className, compact = false }: MonitorSectionProps) {
  const hasSectorData = kpi.data.some(d => d.sector)
  const hasNationalData = kpi.data.some(d => d.valueNational !== undefined)
  const headline = generateHeadline(kpi)
  const analysis = generateAnalysis(kpi)
  
  const latest = getLatestValue(kpi)
  const latestYear = latest?.year
  const previous = latestYear ? getPreviousValue(kpi, latestYear) : null
  
  let changeFromPrevious: number | null = null
  if (latest && previous) {
    changeFromPrevious = ((latest.valueRegion - previous.valueRegion) / previous.valueRegion) * 100
  }

  const hasSuccessFactorData = kpi.data.some(d => d.successFactor)
  const hasMunicipalityData = kpi.data.some(d => d.municipality)
  const chartHeight = hasSuccessFactorData ? 'h-[480px]' : hasMunicipalityData ? 'h-[420px]' : 'h-[360px]'
  const isTextOnly = kpi.unit === 'text' || kpi.data.length === 0

  if (compact) {
    if (isTextOnly) {
      return null
    }
    return (
      <div className={cn('', className)}>
        {/* Compact: Full width chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className={chartHeight}>
            <KPIChart 
              data={kpi.data} 
              unit={kpi.unit}
              hasSectorData={hasSectorData}
              hasNationalData={hasNationalData}
              baseYear={kpi.baseYear}
              chartTitle={kpi.description}
              chartSource={kpi.source}
              chartInfo={kpi.infoText}
              referenceLines={kpi.referenceLines}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('py-12', className)}>
      <h3 className="text-xl lg:text-2xl font-bold text-[var(--che-primary)] mb-4 normal-case font-sans">
        {headline}
      </h3>
      
      <div className={cn('gap-8 items-start', isTextOnly ? '' : 'grid lg:grid-cols-[1fr,1.2fr]')}>
        <div>
          <p className="text-gray-700 leading-relaxed mb-6">
            {analysis}
          </p>
          
          {!isTextOnly && latest && (
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="bg-[var(--che-primary)] text-white px-4 py-3 rounded-lg">
                <div className="text-2xl lg:text-3xl font-bold">
                  {formatValue(latest.valueRegion, kpi.unit, kpi.baseYear)}
                </div>
                <div className="text-white/80 text-sm">
                  Regio Foodvalley ({latestYear})
                </div>
              </div>
              
              {latest.valueNational && (
                <div className="bg-[var(--che-tertiary)] text-white px-4 py-3 rounded-lg">
                  <div className="text-2xl lg:text-3xl font-bold">
                    {formatValue(latest.valueNational, kpi.unit, kpi.baseYear)}
                  </div>
                  <div className="text-white/80 text-sm">
                    Nederland ({latestYear})
                  </div>
                </div>
              )}
              
              {changeFromPrevious !== null && previous && (
                <div className={cn(
                  'px-4 py-3 rounded-lg border-2',
                  changeFromPrevious >= 0 
                    ? 'border-[var(--che-tertiary)] text-[var(--che-tertiary)]' 
                    : 'border-[var(--che-secondary)] text-[var(--che-secondary)]'
                )}>
                  <div className="text-2xl lg:text-3xl font-bold flex items-center gap-1">
                    {changeFromPrevious >= 0 ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    )}
                    {changeFromPrevious >= 0 ? '+' : ''}{changeFromPrevious.toFixed(1)}%
                  </div>
                  <div className="text-sm opacity-80">
                    t.o.v. {previous.year}
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Bron: {kpi.source}
            </span>
            {!isTextOnly && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {kpi.frequency}
              </span>
            )}
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
        
        {!isTextOnly && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 lg:p-6">
            <div className={hasSuccessFactorData ? 'h-[480px]' : hasMunicipalityData ? 'h-[380px]' : 'h-[280px] lg:h-[320px] min-h-[200px]'}>
              <KPIChart 
                data={kpi.data} 
                unit={kpi.unit}
                hasSectorData={hasSectorData}
                hasNationalData={hasNationalData}
                baseYear={kpi.baseYear}
                chartTitle={kpi.description}
                chartSource={kpi.source}
                chartInfo={kpi.infoText}
                referenceLines={kpi.referenceLines}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
