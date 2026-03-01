'use client'

import { useState } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
  LabelList,
} from 'recharts'
import { formatNumber } from '@/lib/utils'

interface KPIDataPoint {
  year: number
  valueRegion: number
  valueNational?: number
  sector?: string
  companySize?: string
  successFactor?: string
  initiative?: string
  initiativeDescription?: string
  initiativeIcon?: string
  municipality?: string
  directGemeente?: number
  directParticulier?: number
  nietDirectGemeente?: number
  nietDirectParticulier?: number
  flexibel?: number
  rawRegion?: number
  rawNational?: number
}

interface ReferenceLine {
  value: number
  label: string
  color: string
}

interface KPIChartProps {
  data: KPIDataPoint[]
  unit: string
  hasSectorData: boolean
  hasNationalData: boolean
  baseYear?: number
  chartTitle?: string
  chartSource?: string
  chartInfo?: string
  referenceLines?: ReferenceLine[]
}

const CHE_BLAUW = '#20315c'
const CHE_GROEN = '#399356'
const CHE_BLAUW_LIGHT = '#3d89be'
const CHE_SECONDARY = '#aa334d'

interface InitiativesOverviewProps {
  data: KPIDataPoint[]
  title?: string
  source?: string
  infoText?: string
}

function InitiativesOverview({ data, title, source, infoText }: InitiativesOverviewProps) {
  const [showInfo, setShowInfo] = useState(false)
  
  const initiatives = data.filter(d => d.initiative).map(d => ({
    name: d.initiative!,
    description: d.initiativeDescription || '',
    icon: d.initiativeIcon || 'default'
  }))

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'energy':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
        )
      case 'leaf':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.5 0-8-3.5-8-8 0-5 4-9 9-12 0 3 1 6 3 8 2 2 5 3 8 3-3 5-7 9-12 9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V11" />
          </svg>
        )
      case 'building':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5V21" />
          </svg>
        )
      case 'users':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
        )
      case 'tree':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64" />
          </svg>
        )
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        {title && (
          <h4 className="text-sm font-semibold text-[#20315c]">{title}</h4>
        )}
        {infoText && (
          <button
            onClick={() => setShowInfo(true)}
            className="ml-2 w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 text-xs font-medium flex items-center justify-center flex-shrink-0"
          >
            i
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
        {initiatives.map((item) => (
          <div key={item.name} className="flex flex-col">
            <div style={{ color: CHE_BLAUW }} className="mb-3">
              {getIcon(item.icon)}
            </div>
            <h5 className="font-semibold text-[#20315c] mb-2 text-sm">
              {item.name}
            </h5>
            <p className="text-sm text-gray-600 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {source && (
        <p className="text-xs text-gray-500 mt-6">Bron: {source}</p>
      )}

      {showInfo && infoText && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-[#20315c]">Toelichting</h3>
              <button
                onClick={() => setShowInfo(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="text-sm text-gray-600 space-y-2">
              {infoText.split('\n').map((line, lineIndex) => {
                if (line.trim().startsWith('- ')) {
                  const bulletContent = line.trim().substring(2)
                  return (
                    <div key={lineIndex} className="flex gap-2 ml-2">
                      <span className="text-[#20315c]">•</span>
                      <span>
                        {bulletContent.split(/(\*\*[^**]+\*\*)/).map((part, i) =>
                          part.startsWith('**') && part.endsWith('**')
                            ? <strong key={i} className="font-bold text-[#20315c]">{part.slice(2, -2)}</strong>
                            : part
                        )}
                      </span>
                    </div>
                  )
                }
                return (
                  <p key={lineIndex}>
                    {line.split(/(\*\*[^**]+\*\*)/).map((part, i) =>
                      part.startsWith('**') && part.endsWith('**')
                        ? <strong key={i} className="font-bold text-[#20315c]">{part.slice(2, -2)}</strong>
                        : part
                    )}
                  </p>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface PlanaanbodChartProps {
  data: KPIDataPoint[]
  title?: string
  source?: string
}

function PlanaanbodChart({ data, title, source }: PlanaanbodChartProps) {
  const chartData = data
    .filter(d => d.municipality)
    .map(d => ({
      municipality: d.municipality!,
      'Direct uitgeefbaar gemeente': d.directGemeente || 0,
      'Direct uitgeefbaar particulier': d.directParticulier || 0,
      'Niet direct uitgeefbaar gemeente': d.nietDirectGemeente || 0,
      'Niet direct uitgeefbaar particulier': d.nietDirectParticulier || 0,
      'Flexibele zone': d.flexibel || 0,
    }))
    .sort((a, b) => {
      const totalA = a['Direct uitgeefbaar gemeente'] + a['Direct uitgeefbaar particulier'] + a['Niet direct uitgeefbaar gemeente'] + a['Niet direct uitgeefbaar particulier'] + a['Flexibele zone']
      const totalB = b['Direct uitgeefbaar gemeente'] + b['Direct uitgeefbaar particulier'] + b['Niet direct uitgeefbaar gemeente'] + b['Niet direct uitgeefbaar particulier'] + b['Flexibele zone']
      return totalA - totalB
    })

  const categories = [
    { key: 'Direct uitgeefbaar gemeente', color: CHE_BLAUW },
    { key: 'Direct uitgeefbaar particulier', color: CHE_BLAUW_LIGHT },
    { key: 'Niet direct uitgeefbaar gemeente', color: CHE_GROEN },
    { key: 'Niet direct uitgeefbaar particulier', color: CHE_SECONDARY },
    { key: 'Flexibele zone', color: '#d1d5db' },
  ]

  return (
    <div className="h-full flex flex-col">
      {title && (
        <h4 className="text-sm font-semibold text-[#20315c] mb-2">{title}</h4>
      )}
      <ResponsiveContainer width="100%" height="100%" minHeight={280}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 80, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={true} vertical={true} />
          <XAxis 
            type="number"
            tick={{ fontSize: 11, fill: '#374151' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
            domain={[0, 70]}
            ticks={[0, 10, 20, 30, 40, 50, 60, 70]}
          />
          <YAxis 
            type="category"
            dataKey="municipality"
            tick={{ fontSize: 11, fill: '#374151' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
            width={75}
          />
          {categories.map((cat) => (
            <Bar 
              key={cat.key}
              dataKey={cat.key} 
              stackId="a"
              fill={cat.color}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
      
      {/* Legenda */}
      <div className="flex flex-wrap gap-3 justify-center mt-2" style={{ fontSize: '10px' }}>
        {categories.map((cat) => (
          <div key={cat.key} className="flex items-center gap-1">
            <div className="w-3 h-3" style={{ backgroundColor: cat.color }}></div>
            <span style={{ color: '#374151' }}>{cat.key}</span>
          </div>
        ))}
      </div>

      {source && (
        <p className="text-xs text-gray-500 mt-3">Bron: {source}</p>
      )}
    </div>
  )
}

export function KPIChart({ data, unit, hasSectorData, hasNationalData, baseYear, chartTitle, chartSource, chartInfo, referenceLines }: KPIChartProps) {
  // Text-only KPI without chart
  if (unit === 'text' || data.length === 0) {
    return null
  }

  const hasCompanySizeData = data.some(d => d.companySize)
  const hasSuccessFactorData = data.some(d => d.successFactor)
  const hasInitiativeData = data.some(d => d.initiative)
  const hasMunicipalityData = data.some(d => d.municipality)
  
  if (hasMunicipalityData) {
    return <PlanaanbodChart data={data} title={chartTitle} source={chartSource} />
  }

  if (hasInitiativeData) {
    return <InitiativesOverview data={data} title={chartTitle} source={chartSource} infoText={chartInfo} />
  }
  
  if (hasSuccessFactorData) {
    return <SuccessFactorBarChart data={data} unit={unit} title={chartTitle} source={chartSource} infoText={chartInfo} />
  }
  
  if (hasCompanySizeData) {
    return <CompanySizeBarChart data={data} unit={unit} title={chartTitle} source={chartSource} infoText={chartInfo} />
  }
  
  if (hasSectorData) {
    return <SectorBarChart data={data} unit={unit} title={chartTitle} source={chartSource} infoText={chartInfo} />
  }

  if (unit === 'index') {
    return (
      <IndexChart 
        data={data} 
        hasNationalData={hasNationalData}
        baseYear={baseYear}
      />
    )
  }

  return (
    <TimeSeriesChart 
      data={data} 
      unit={unit} 
      hasNationalData={hasNationalData}
      referenceLines={referenceLines}
      title={chartTitle}
      source={chartSource}
    />
  )
}

interface IndexChartProps {
  data: KPIDataPoint[]
  hasNationalData: boolean
  baseYear?: number
}

function IndexChart({ data, hasNationalData, baseYear }: IndexChartProps) {
  const sortedData = [...data].sort((a, b) => a.year - b.year)
  
  const allValues = sortedData.flatMap(d => [d.valueRegion, d.valueNational].filter(Boolean)) as number[]
  const minValue = Math.min(...allValues)
  const maxValue = Math.max(...allValues)
  const yMin = Math.floor(Math.min(minValue, 95) / 10) * 10
  const yMax = Math.ceil(Math.max(maxValue, 105) / 10) * 10 + 10

  interface TooltipPayload {
    dataKey: string
    value: number
    color: string
  }

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: number }) => {
    if (active && payload && payload.length) {
      const dataPoint = sortedData.find(d => d.year === label)
      return (
        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg text-sm">
          <p className="font-semibold text-gray-900 mb-2">Jaar: {label}</p>
          {payload.map((entry, index) => {
            const isRegion = entry.dataKey === 'valueRegion'
            const rawValue = isRegion ? dataPoint?.rawRegion : dataPoint?.rawNational
            const name = isRegion ? 'Regio Foodvalley' : 'Nederland'
            return (
              <div key={index} className="mb-1">
                <div className="flex items-center gap-2">
                  <span 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-gray-600">{name}</span>
                </div>
                <div className="ml-5 text-xs">
                  <div>Index: <strong>{entry.value.toFixed(2)}</strong></div>
                  {rawValue && (
                    <div className="text-gray-500">Absoluut: {formatNumber(rawValue)}</div>
                  )}
                </div>
              </div>
            )
          })}
          {baseYear && (
            <p className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-400">
              Index t.o.v. {baseYear} = 100
            </p>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={200}>
      <LineChart
        data={sortedData}
        margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="year" 
          tick={{ fontSize: 12, fill: '#6b7280' }}
          axisLine={{ stroke: '#e5e7eb' }}
        />
        <YAxis 
          domain={[yMin, yMax]}
          tick={{ fontSize: 12, fill: '#6b7280' }}
          axisLine={{ stroke: '#e5e7eb' }}
        />
        <ReferenceLine y={100} stroke="#9ca3af" strokeDasharray="3 3" />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          formatter={(value) => value === 'valueRegion' ? 'Regio Foodvalley' : 'Nederland'}
          wrapperStyle={{ fontSize: '12px' }}
        />
        <Line
          type="monotone"
          dataKey="valueRegion"
          stroke={CHE_BLAUW}
          strokeWidth={2}
          dot={{ fill: CHE_BLAUW, strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6 }}
        />
        {hasNationalData && (
          <Line
            type="monotone"
            dataKey="valueNational"
            stroke={CHE_GROEN}
            strokeWidth={2}
            dot={{ fill: CHE_GROEN, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  )
}

interface TimeSeriesChartProps {
  data: KPIDataPoint[]
  unit: string
  hasNationalData: boolean
  referenceLines?: ReferenceLine[]
  title?: string
  source?: string
}

function TimeSeriesChart({ data, unit, hasNationalData, referenceLines, title, source }: TimeSeriesChartProps) {
  const sortedData = [...data].sort((a, b) => a.year - b.year)

  const formatValue = (value: number) => {
    if (unit === 'percentage') return `${value}%`
    if (unit === 'hectare') return `${value} ha`
    return formatNumber(value)
  }

  const useBarChart = referenceLines && referenceLines.length > 0

  const refLineColors: Record<string, string> = {
    green: CHE_GROEN,
    blue: CHE_SECONDARY,
  }

  const allValues = sortedData.map(d => d.valueRegion)
  const refLineValues = referenceLines?.map(r => r.value) || []
  const maxValue = Math.max(...allValues, ...refLineValues)
  const yMax = Math.ceil(maxValue / 5) * 5

  if (useBarChart) {
    return (
      <div className="h-full flex flex-col">
        {title && (
          <h4 className="text-sm font-semibold text-[#20315c] mb-2">{title}</h4>
        )}
        <ResponsiveContainer width="100%" height="100%" minHeight={280}>
          <BarChart
            data={sortedData}
            margin={{ top: 20, right: 80, left: 10, bottom: 20 }}
          >
            <defs>
              <pattern id="hatchPattern" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" stroke={CHE_BLAUW_LIGHT} strokeWidth="1.5" />
              </pattern>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 11, fill: '#374151' }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
            />
            <YAxis 
              domain={[0, yMax]}
              tick={{ fontSize: 11, fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
            />
            <Tooltip 
              formatter={(value) => [formatValue(value as number), 'Uitgifte']}
              labelFormatter={(label) => `Jaar: ${label}`}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <ReferenceArea 
              x1={2024} 
              y1={13.9} 
              y2={40} 
              fill="url(#hatchPattern)"
              fillOpacity={0.8}
            />
            {referenceLines?.map((refLine, index) => (
              <ReferenceLine 
                key={index}
                y={refLine.value} 
                stroke={refLineColors[refLine.color] || refLine.color}
                strokeWidth={2}
                strokeDasharray={refLine.color === 'green' ? '0' : '0'}
              />
            ))}
            <Bar 
              dataKey="valueRegion" 
              fill={CHE_BLAUW}
              radius={[0, 0, 0, 0]}
              maxBarSize={40}
              legendType="none"
            >
              <LabelList 
                dataKey="valueRegion" 
                position="top" 
                formatter={(value) => String(value).replace('.', ',')}
                style={{ fontSize: '10px', fill: '#374151', fontWeight: 500 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        {/* Legenda */}
        <div className="flex flex-wrap gap-6 justify-center mt-2" style={{ fontSize: '12px' }}>
          <div className="flex items-center gap-2">
            <div className="w-5 h-0.5" style={{ backgroundColor: CHE_GROEN }}></div>
            <span style={{ color: '#374151' }}>Gemiddelde van 2014-2024 (13,9)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-0.5" style={{ backgroundColor: CHE_SECONDARY }}></div>
            <span style={{ color: '#374151' }}>Beoogde ruimte per jaar</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="16" height="12" className="flex-shrink-0">
              <defs>
                <pattern id="legendHatch" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="4" stroke="#3d89be" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="16" height="12" fill="url(#legendHatch)" />
            </svg>
            <span style={{ color: '#374151' }}>Verschil gemiddelde en beoogde ruimte</span>
          </div>
        </div>
        
        {source && (
          <p className="text-xs text-gray-500 mt-4">Bron: {source}</p>
        )}
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={200}>
      <LineChart
        data={sortedData}
        margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="year" 
          tick={{ fontSize: 12, fill: '#6b7280' }}
          axisLine={{ stroke: '#e5e7eb' }}
        />
        <YAxis 
          tick={{ fontSize: 12, fill: '#6b7280' }}
          axisLine={{ stroke: '#e5e7eb' }}
          tickFormatter={(value) => {
            if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
            if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
            return value.toString()
          }}
        />
        <Tooltip 
          formatter={(value, name) => [
            formatValue(value as number),
            name === 'valueRegion' ? 'Regio Foodvalley' : 'Nederland'
          ]}
          labelFormatter={(label) => `Jaar: ${label}`}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '12px',
          }}
        />
        <Legend 
          formatter={(value) => value === 'valueRegion' ? 'Regio Foodvalley' : 'Nederland'}
          wrapperStyle={{ fontSize: '12px' }}
        />
        <Line
          type="monotone"
          dataKey="valueRegion"
          stroke={CHE_BLAUW}
          strokeWidth={2}
          dot={{ fill: CHE_BLAUW, strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6 }}
        />
        {hasNationalData && (
          <Line
            type="monotone"
            dataKey="valueNational"
            stroke={CHE_GROEN}
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: CHE_GROEN, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  )
}

interface CompanySizeBarChartProps {
  data: KPIDataPoint[]
  unit: string
  title?: string
  source?: string
  infoText?: string
}

function CompanySizeBarChart({ data, unit, title, source, infoText }: CompanySizeBarChartProps) {
  const [showInfo, setShowInfo] = useState(false)
  const sectors = [...new Set(data.map(d => d.sector))]
  const companySizes = ['Micro', 'Klein', '(Middel)groot']
  
  const chartData = sectors.map(sector => {
    const micro = data.find(d => d.sector === sector && d.companySize === 'Micro')
    const klein = data.find(d => d.sector === sector && d.companySize === 'Klein')
    const groot = data.find(d => d.sector === sector && d.companySize === '(Middel)groot')
    return {
      sector,
      micro: micro?.valueRegion || 0,
      klein: klein?.valueRegion || 0,
      groot: groot?.valueRegion || 0,
    }
  })

  const formatLabel = (value: unknown) => {
    if (unit === 'percentage') return `${value}%`
    return String(value)
  }

  const allValues = chartData.flatMap(d => [d.micro, d.klein, d.groot])
  const maxValue = Math.max(...allValues)
  const yMax = Math.ceil(maxValue / 10) * 10 + 10

  const yTicks = unit === 'percentage' 
    ? [0, 10, 20, 30, 40, 50, 60, 70, 80].filter(t => t <= yMax)
    : undefined

  const sizeColors: Record<string, string> = {
    micro: CHE_BLAUW,
    klein: CHE_GROEN,
    groot: CHE_SECONDARY,
  }

  const sizeLabels: Record<string, string> = {
    micro: 'Micro',
    klein: 'Klein',
    groot: '(Middel)groot',
  }

  return (
    <div className="h-full flex flex-col relative">
      <div className="flex items-start justify-between mb-2">
        {title && (
          <h4 className="text-sm font-semibold text-[#20315c]">{title}</h4>
        )}
        {infoText && (
          <button
            onClick={() => setShowInfo(true)}
            className="ml-2 w-5 h-5 rounded-full bg-[#20315c] text-white text-xs font-bold flex items-center justify-center hover:bg-[#3d89be] transition-colors flex-shrink-0"
            title="Meer informatie"
          >
            i
          </button>
        )}
      </div>

      {/* Info Modal */}
      {showInfo && infoText && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-[#20315c]">Informatie</h3>
              <button
                onClick={() => setShowInfo(false)}
                className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1"
              >
                Sluiten
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 text-sm text-gray-700 leading-relaxed">
              {infoText.split('\n').map((line, lineIndex) => {
                const isBullet = line.startsWith('- ')
                const content = isBullet ? line.slice(2) : line
                
                const formattedContent = content.split(/(\*\*[^*]+\*\*)/).map((part, i) => 
                  part.startsWith('**') && part.endsWith('**') 
                    ? <strong key={i} className="font-bold text-[#20315c]">{part.slice(2, -2)}</strong>
                    : part
                )
                
                if (isBullet) {
                  return (
                    <div key={lineIndex} className="flex items-start gap-2 ml-2 my-1">
                      <span className="text-[#20315c] mt-1">•</span>
                      <span>{formattedContent}</span>
                    </div>
                  )
                }
                
                return (
                  <p key={lineIndex} className={line === '' ? 'h-3' : 'my-1'}>
                    {formattedContent}
                  </p>
                )
              })}
            </div>
          </div>
        </div>
      )}

      <ResponsiveContainer width="100%" height="100%" minHeight={200}>
        <BarChart
          data={chartData}
          margin={{ top: 25, right: 20, left: 20, bottom: 40 }}
          barCategoryGap="15%"
        >
          <defs>
            <filter id="barShadowSize" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="3" dy="3" stdDeviation="3" floodOpacity="0.25" />
            </filter>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis 
            dataKey="sector" 
            tick={{ fontSize: 11, fill: '#374151' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
            interval={0}
            angle={0}
            textAnchor="middle"
          />
          <YAxis 
            domain={[0, yMax]}
            ticks={yTicks}
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
            tickFormatter={(value) => unit === 'percentage' ? `${value}%` : value.toString()}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg text-sm min-w-[220px]">
                    <p className="font-semibold text-[#20315c] mb-2">{title || 'Innovatieactiviteit naar bedrijfsgrootte'}</p>
                    <div className="text-gray-600 mb-2">
                      <span>Type: </span>
                      <span className="font-medium text-gray-900">{label}</span>
                    </div>
                    <div className="space-y-2 pt-2 border-t border-gray-100">
                      {payload.map((item, index) => {
                        const key = item.dataKey as string
                        const value = item.value as number
                        const color = sizeColors[key]
                        const sizeLabel = sizeLabels[key]
                        return (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span 
                                className="w-3 h-3 rounded-sm" 
                                style={{ backgroundColor: color }}
                              />
                              <span>{sizeLabel}</span>
                            </div>
                            <span className="font-medium text-gray-900">{formatLabel(value)}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Legend 
            formatter={(value) => <span style={{ color: '#374151' }}>{sizeLabels[value as string] || value}</span>}
            wrapperStyle={{ fontSize: '12px' }}
            verticalAlign="bottom"
          />
          <Bar 
            dataKey="micro" 
            fill={CHE_BLAUW} 
            name="micro"
            radius={[0, 0, 0, 0]}
            maxBarSize={35}
            style={{ filter: 'url(#barShadowSize)' }}
          >
            <LabelList 
              dataKey="micro" 
              position="top" 
              formatter={formatLabel}
              style={{ fontSize: '11px', fill: '#374151', fontWeight: 500 }}
            />
          </Bar>
          <Bar 
            dataKey="klein" 
            fill={CHE_GROEN} 
            name="klein"
            radius={[0, 0, 0, 0]}
            maxBarSize={35}
            style={{ filter: 'url(#barShadowSize)' }}
          >
            <LabelList 
              dataKey="klein" 
              position="top" 
              formatter={formatLabel}
              style={{ fontSize: '11px', fill: '#374151', fontWeight: 500 }}
            />
          </Bar>
          <Bar 
            dataKey="groot" 
            fill={CHE_SECONDARY} 
            name="groot"
            radius={[0, 0, 0, 0]}
            maxBarSize={35}
            style={{ filter: 'url(#barShadowSize)' }}
          >
            <LabelList 
              dataKey="groot" 
              position="top" 
              formatter={formatLabel}
              style={{ fontSize: '11px', fill: '#374151', fontWeight: 500 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {source && (
        <p className="text-xs text-gray-500 -mt-4">Bron: {source}</p>
      )}
    </div>
  )
}

interface SuccessFactorBarChartProps {
  data: KPIDataPoint[]
  unit: string
  title?: string
  source?: string
  infoText?: string
}

const CHE_GROEN_LIGHT = '#7ac19c'
const CHE_BEIGE = '#c4b896'

function SuccessFactorBarChart({ data, unit, title, source, infoText }: SuccessFactorBarChartProps) {
  const [showInfo, setShowInfo] = useState(false)
  const sectors = [...new Set(data.map(d => d.sector))]
  const successFactors = ['Kennis', 'Arbeid en talent', 'Technologie']
  
  const chartData = sectors.map(sector => {
    const result: Record<string, string | number> = { sector: sector || '' }
    successFactors.forEach(factor => {
      const dataPoint = data.find(d => d.sector === sector && d.successFactor === factor)
      const key = factor.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z_]/g, '')
      result[key] = dataPoint?.valueRegion || 0
    })
    return result
  })

  const formatLabel = (value: unknown) => {
    if (unit === 'percentage') return `${value}%`
    return String(value)
  }

  const allValues = data.filter(d => successFactors.includes(d.successFactor || '')).map(d => d.valueRegion)
  const maxValue = Math.max(...allValues)
  const yMax = Math.ceil(maxValue / 10) * 10 + 10

  const yTicks = unit === 'percentage' 
    ? [0, 10, 20, 30, 40, 50, 60, 70, 80].filter(t => t <= yMax)
    : undefined

  const factorColors: Record<string, string> = {
    kennis: CHE_BLAUW,
    arbeid_en_talent: CHE_GROEN,
    technologie: CHE_SECONDARY,
  }

  const factorLabels: Record<string, string> = {
    kennis: 'Kennis',
    arbeid_en_talent: 'Arbeid en talent',
    technologie: 'Technologie',
  }

  const factorKeys = Object.keys(factorColors)

  return (
    <div className="h-full flex flex-col relative">
      <div className="flex items-start justify-between mb-2">
        {title && (
          <h4 className="text-sm font-semibold text-[#20315c]">{title}</h4>
        )}
        {infoText && (
          <button
            onClick={() => setShowInfo(true)}
            className="ml-2 w-5 h-5 rounded-full bg-[#20315c] text-white text-xs font-bold flex items-center justify-center hover:bg-[#3d89be] transition-colors flex-shrink-0"
            title="Meer informatie"
          >
            i
          </button>
        )}
      </div>

      {/* Info Modal */}
      {showInfo && infoText && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-[#20315c]">Informatie</h3>
              <button
                onClick={() => setShowInfo(false)}
                className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1"
              >
                Sluiten
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 text-sm text-gray-700 leading-relaxed">
              {infoText.split('\n').map((line, lineIndex) => {
                const isBullet = line.startsWith('- ')
                const content = isBullet ? line.slice(2) : line
                
                const formattedContent = content.split(/(\*\*[^*]+\*\*)/).map((part, i) => 
                  part.startsWith('**') && part.endsWith('**') 
                    ? <strong key={i} className="font-bold text-[#20315c]">{part.slice(2, -2)}</strong>
                    : part
                )
                
                if (isBullet) {
                  return (
                    <div key={lineIndex} className="flex items-start gap-2 ml-2 my-1">
                      <span className="text-[#20315c] mt-1">•</span>
                      <span>{formattedContent}</span>
                    </div>
                  )
                }
                
                return (
                  <p key={lineIndex} className={line === '' ? 'h-3' : 'my-1'}>
                    {formattedContent}
                  </p>
                )
              })}
            </div>
          </div>
        </div>
      )}

      <ResponsiveContainer width="100%" height="100%" minHeight={420}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 140, bottom: 50 }}
          barCategoryGap="20%"
          barGap={4}
        >
          <defs>
            <filter id="barShadowFactor" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.2" />
            </filter>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
          <XAxis 
            type="number"
            domain={[0, yMax]}
            ticks={yTicks}
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
            tickFormatter={(value) => unit === 'percentage' ? `${value}%` : value.toString()}
          />
          <YAxis 
            type="category"
            dataKey="sector" 
            tick={{ fontSize: 11, fill: '#374151' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
            width={120}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg text-sm min-w-[240px]">
                    <p className="font-semibold text-[#20315c] mb-2">{title || 'Succesfactoren'}</p>
                    <div className="text-gray-600 mb-2">
                      <span>Sector: </span>
                      <span className="font-medium text-gray-900">{label}</span>
                    </div>
                    <div className="space-y-1.5 pt-2 border-t border-gray-100">
                      {payload.map((item, index) => {
                        const key = item.dataKey as string
                        const value = item.value as number
                        const color = factorColors[key]
                        const factorLabel = factorLabels[key]
                        return (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span 
                                className="w-3 h-3 rounded-sm" 
                                style={{ backgroundColor: color }}
                              />
                              <span className="text-xs">{factorLabel}</span>
                            </div>
                            <span className="font-medium text-gray-900">{formatLabel(value)}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Legend 
            formatter={(value) => <span style={{ color: '#374151' }}>{factorLabels[value as string] || value}</span>}
            wrapperStyle={{ fontSize: '12px' }}
            verticalAlign="bottom"
          />
          {factorKeys.map(key => (
            <Bar 
              key={key}
              dataKey={key} 
              fill={factorColors[key]} 
              name={key}
              radius={[0, 0, 0, 0]}
              barSize={14}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
      {source && (
        <p className="text-xs text-gray-500 -mt-2">Bron: {source}</p>
      )}
    </div>
  )
}

interface SectorBarChartProps {
  data: KPIDataPoint[]
  unit: string
  title?: string
  source?: string
  infoText?: string
}

function SectorBarChart({ data, unit, title, source, infoText }: SectorBarChartProps) {
  const [showInfo, setShowInfo] = useState(false)
  const years = [...new Set(data.map(d => d.year))].sort((a, b) => b - a)
  const latestYear = years[0]
  const previousYear = years[1]

  const sectors = [...new Set(data.map(d => d.sector))]
  
  const chartData = sectors.map(sector => {
    const latestData = data.find(d => d.sector === sector && d.year === latestYear)
    const previousData = data.find(d => d.sector === sector && d.year === previousYear)
    return {
      sector,
      latest: latestData?.valueRegion || 0,
      previous: previousData?.valueRegion || 0,
    }
  })

  const formatLabel = (value: unknown) => {
    if (unit === 'percentage') return `${value}%`
    return String(value)
  }

  const allValues = chartData.flatMap(d => [d.latest, d.previous])
  const maxValue = Math.max(...allValues)
  const yMax = Math.ceil(maxValue / 10) * 10 + 10

  const yTicks = unit === 'percentage' 
    ? [0, 10, 20, 30, 40, 50, 60].filter(t => t <= yMax)
    : undefined

  return (
    <div className="h-full flex flex-col relative">
      <div className="flex items-start justify-between mb-2">
        {title && (
          <h4 className="text-sm font-semibold text-[#20315c]">{title}</h4>
        )}
        {infoText && (
          <button
            onClick={() => setShowInfo(true)}
            className="ml-2 w-5 h-5 rounded-full bg-[#20315c] text-white text-xs font-bold flex items-center justify-center hover:bg-[#3d89be] transition-colors flex-shrink-0"
            title="Meer informatie"
          >
            i
          </button>
        )}
      </div>

      {/* Info Modal */}
      {showInfo && infoText && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-[#20315c]">Informatie</h3>
              <button
                onClick={() => setShowInfo(false)}
                className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1"
              >
                Sluiten
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 text-sm text-gray-700 leading-relaxed">
              <h4 className="font-bold text-[#20315c] mb-3">Definitie innovatie en innovatietypen</h4>
              <p className="mb-4">Innovatie is een vernieuwing die tot verbetering leidt, zo luidt de eenvoudigste definitie voor innovatie. We maken een onderscheid in verschillende soorten innovatie:</p>
              <ol className="list-decimal list-outside ml-5 space-y-2 mb-6">
                <li><span className="font-bold">Productinnovatie:</span> een introductie van een nieuw of sterk verbeterd product (goed of dienst)</li>
                <li><span className="font-bold">Procesinnovatie:</span> een vernieuwing of sterke verbetering van het productieproces, de distributie of van activiteiten die de productie ondersteunen</li>
                <li><span className="font-bold">Organisatie innovatie:</span> een vernieuwing of sterke verbetering van de organisatie van het bedrijf (management, besluitvorming, kwaliteitsbeheer, opleiding medewerkers)</li>
                <li><span className="font-bold">Externe innovatie:</span> nieuwe vormen van samenwerking met andere partijen</li>
                <li><span className="font-bold">Marktinnovatie:</span> nieuwe of sterke verbetering van marketing via productontwerp, -verpakking, -promotie of prijsstelling</li>
              </ol>
              <h4 className="font-bold text-[#20315c] mb-3">Onderzoeksaanpak</h4>
              <p className="mb-3">Om een goed beeld te krijgen van de manier waarop bedrijven in Regio Foodvalley aan innovaties werken, is een enquête gehouden onder bedrijven die tot de acht aandachtssectoren behoren, zoals gedefinieerd in de Innovatiemonitor. Uit deze groep bedrijven is een steekproef getrokken van ruim 1.500 bedrijven die minimaal vijf werknemers hebben. De selectie van de bedrijven heeft plaatsgevonden met behulp van de Provinciale Werkgelegenheid Enquête (PWE) en het Provinciaal ArbeidsplaatsenRegister (PAR).</p>
              <p>De bedrijven in de steekproef kregen per post een brief toegestuurd met een link naar de digitale enquête, gevolgd door een herinneringsbrief met de mogelijkheid om de vragenlijst schriftelijk in te vullen. De bedrijven die daarop niet hebben gereageerd, zijn vervolgens nagebeld. In totaal hebben 300 bedrijven de enquêtevragen beantwoord, wat overeenkomt met het aantal respondenten dat in 2018 de vragenlijst heeft ingevuld.</p>
            </div>
          </div>
        </div>
      )}

      <ResponsiveContainer width="100%" height="100%" minHeight={200}>
      <BarChart
        data={chartData}
        margin={{ top: 25, right: 20, left: 20, bottom: 40 }}
        barCategoryGap="20%"
      >
        <defs>
          <filter id="barShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="3" dy="3" stdDeviation="3" floodOpacity="0.25" />
          </filter>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
        <XAxis 
          dataKey="sector" 
          tick={{ fontSize: 11, fill: '#374151' }}
          axisLine={{ stroke: '#e5e7eb' }}
          tickLine={false}
          interval={0}
          angle={0}
          textAnchor="middle"
        />
        <YAxis 
          domain={[0, yMax]}
          ticks={yTicks}
          tick={{ fontSize: 11, fill: '#6b7280' }}
          axisLine={{ stroke: '#e5e7eb' }}
          tickLine={false}
          tickFormatter={(value) => unit === 'percentage' ? `${value}%` : value.toString()}
        />
        <Tooltip 
          cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg text-sm min-w-[220px]">
                  <p className="font-semibold text-[#20315c] mb-2">{title || 'Type innovatie'}</p>
                  <div className="text-gray-600 mb-2">
                    <span>Type: </span>
                    <span className="font-medium text-gray-900">{label}</span>
                  </div>
                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    {payload.map((item, index) => {
                      const year = item.dataKey === 'latest' ? latestYear : previousYear
                      const value = item.value as number
                      const color = item.dataKey === 'latest' ? CHE_GROEN : CHE_BLAUW
                      return (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span 
                              className="w-3 h-3 rounded-sm" 
                              style={{ backgroundColor: color }}
                            />
                            <span>{year}</span>
                          </div>
                          <span className="font-medium text-gray-900">{formatLabel(value)}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Legend 
          formatter={(value) => <span style={{ color: '#374151' }}>{value === 'latest' ? latestYear : previousYear}</span>}
          wrapperStyle={{ fontSize: '12px' }}
          verticalAlign="bottom"
        />
        <Bar 
          dataKey="latest" 
          fill={CHE_GROEN} 
          name="latest"
          radius={[0, 0, 0, 0]}
          maxBarSize={40}
          style={{ filter: 'url(#barShadow)' }}
        >
          <LabelList 
            dataKey="latest" 
            position="top" 
            formatter={formatLabel}
            style={{ fontSize: '11px', fill: '#374151', fontWeight: 500 }}
          />
        </Bar>
        <Bar 
          dataKey="previous" 
          fill={CHE_BLAUW} 
          name="previous"
          radius={[0, 0, 0, 0]}
          maxBarSize={40}
          style={{ filter: 'url(#barShadow)' }}
        >
          <LabelList 
            dataKey="previous" 
            position="top" 
            formatter={formatLabel}
            style={{ fontSize: '11px', fill: '#374151', fontWeight: 500 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
      {source && (
        <p className="text-xs text-gray-500 -mt-4">Bron: {source}</p>
      )}
    </div>
  )
}
