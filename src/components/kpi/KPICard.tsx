'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { KPIChart } from '@/components/charts/KPIChart'
import { formatNumber } from '@/lib/utils'

interface KPIDataPoint {
  year: number
  valueRegion: number
  valueNational?: number
  sector?: string
  rawRegion?: number
  rawNational?: number
}

interface KPICardProps {
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
}

export function KPICard({ kpi }: KPICardProps) {
  const [showDetails, setShowDetails] = useState(false)
  
  const hasSectorData = kpi.data.some(d => d.sector)
  const hasNationalData = kpi.data.some(d => d.valueNational !== undefined)
  const isIndexData = kpi.unit === 'index'
  
  const latestData = kpi.data
    .filter(d => !d.sector || d.sector === kpi.data[kpi.data.length - 1]?.sector)
    .sort((a, b) => b.year - a.year)[0]
  
  const baseYearData = kpi.baseYear 
    ? kpi.data.find(d => d.year === kpi.baseYear && (!d.sector || d.sector === latestData?.sector))
    : null

  const change = latestData && baseYearData && isIndexData
    ? latestData.valueRegion - 100
    : null

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{kpi.title}</CardTitle>
            <CardDescription className="mt-1">{kpi.description}</CardDescription>
          </div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="ml-2 p-1 text-gray-400 hover:text-gray-600 rounded"
            aria-label={showDetails ? 'Verberg details' : 'Toon details'}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        
        {showDetails && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm">
            <p className="text-gray-700"><strong>Wat meet deze KPI?</strong></p>
            <p className="text-gray-600 mt-1">{kpi.whatItMeasures}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
              <span><strong>Bron:</strong> {kpi.source}</span>
              <span><strong>Frequentie:</strong> {kpi.frequency}</span>
              {kpi.baseYear && <span><strong>Basisjaar:</strong> {kpi.baseYear}</span>}
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        {/* Current Value Summary */}
        {latestData && (
          <div className="mb-4">
            {isIndexData ? (
              <div className="flex items-end gap-4">
                <div>
                  <div className="text-3xl font-bold text-[var(--che-blauw)]">
                    {latestData.valueRegion.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Index t.o.v. {kpi.baseYear} ({latestData.year})
                  </div>
                  {latestData.rawRegion && (
                    <div className="text-xs text-gray-400 mt-1">
                      Absoluut: {formatNumber(latestData.rawRegion)}
                    </div>
                  )}
                </div>
                {change !== null && (
                  <div className={`text-sm font-medium ${change >= 0 ? 'text-[var(--che-groen)]' : 'text-red-500'}`}>
                    {change >= 0 ? '+' : ''}{change.toFixed(1)}%
                    <span className="text-gray-400 font-normal"> sinds {kpi.baseYear}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-end gap-4">
                <div>
                  <div className="text-3xl font-bold text-[var(--che-blauw)]">
                    {formatNumber(latestData.valueRegion)}
                    {kpi.unit === 'percentage' && '%'}
                  </div>
                  <div className="text-sm text-gray-500">
                    Regio Foodvalley ({latestData.year})
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Chart */}
        <div className="flex-1 min-h-[200px]">
          <KPIChart 
            data={kpi.data} 
            unit={kpi.unit}
            hasSectorData={hasSectorData}
            hasNationalData={hasNationalData}
            baseYear={kpi.baseYear}
          />
        </div>

        {/* Source */}
        <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
          Bron: {kpi.source}
        </div>
      </CardContent>
    </Card>
  )
}
