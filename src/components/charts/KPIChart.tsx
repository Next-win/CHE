'use client'

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
} from 'recharts'
import { formatNumber } from '@/lib/utils'

interface KPIDataPoint {
  year: number
  valueRegion: number
  valueNational?: number
  sector?: string
  rawRegion?: number
  rawNational?: number
}

interface KPIChartProps {
  data: KPIDataPoint[]
  unit: string
  hasSectorData: boolean
  hasNationalData: boolean
  baseYear?: number
}

const CHE_BLAUW = '#004070'
const CHE_GROEN = '#2fac66'
const CHE_BLAUW_LIGHT = '#0066a4'

export function KPIChart({ data, unit, hasSectorData, hasNationalData, baseYear }: KPIChartProps) {
  if (hasSectorData) {
    return <SectorBarChart data={data} unit={unit} />
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
}

function TimeSeriesChart({ data, unit, hasNationalData }: TimeSeriesChartProps) {
  const sortedData = [...data].sort((a, b) => a.year - b.year)

  const formatValue = (value: number) => {
    if (unit === 'percentage') return `${value}%`
    if (unit === 'hectare') return `${value} ha`
    return formatNumber(value)
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

interface SectorBarChartProps {
  data: KPIDataPoint[]
  unit: string
}

function SectorBarChart({ data, unit }: SectorBarChartProps) {
  const years = [...new Set(data.map(d => d.year))].sort((a, b) => b - a)
  const latestYear = years[0]
  const previousYear = years[1]

  const sectors = [...new Set(data.map(d => d.sector))]
  
  const chartData = sectors.map(sector => {
    const latestData = data.find(d => d.sector === sector && d.year === latestYear)
    const previousData = data.find(d => d.sector === sector && d.year === previousYear)
    return {
      sector,
      [latestYear]: latestData?.valueRegion || 0,
      [`${latestYear}_national`]: latestData?.valueNational,
      [previousYear]: previousData?.valueRegion || 0,
    }
  })

  const formatValue = (value: number) => {
    if (unit === 'percentage') return `${value}%`
    return formatNumber(value)
  }

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={200}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 5, right: 5, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={true} vertical={false} />
        <XAxis 
          type="number" 
          tick={{ fontSize: 12, fill: '#6b7280' }}
          axisLine={{ stroke: '#e5e7eb' }}
          tickFormatter={(value) => unit === 'percentage' ? `${value}%` : value.toString()}
        />
        <YAxis 
          type="category" 
          dataKey="sector" 
          tick={{ fontSize: 11, fill: '#6b7280' }}
          axisLine={{ stroke: '#e5e7eb' }}
          width={100}
        />
        <Tooltip 
          formatter={(value, name) => [
            formatValue(value as number),
            (name as string).includes('national') ? 'Nederland' : (name as string).includes(previousYear?.toString() || '') ? `Regio (${previousYear})` : `Regio (${latestYear})`
          ]}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '12px',
          }}
        />
        <Legend wrapperStyle={{ fontSize: '12px' }} />
        {previousYear && (
          <Bar 
            dataKey={previousYear.toString()} 
            fill={CHE_BLAUW_LIGHT} 
            name={`Regio (${previousYear})`}
            radius={[0, 4, 4, 0]}
          />
        )}
        <Bar 
          dataKey={latestYear.toString()} 
          fill={CHE_BLAUW} 
          name={`Regio (${latestYear})`}
          radius={[0, 4, 4, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
