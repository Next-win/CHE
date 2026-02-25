'use client'

import { cn } from '@/lib/utils'

interface KeyStatProps {
  value: string | number
  label: string
  suffix?: string
  sublabel?: string
  trend?: {
    value: number
    label: string
  }
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function KeyStat({
  value,
  label,
  suffix,
  sublabel,
  trend,
  variant = 'primary',
  size = 'md',
  className,
}: KeyStatProps) {
  const variants = {
    primary: 'bg-gradient-to-br from-[var(--che-blauw)] to-[#3d89be] text-white',
    secondary: 'bg-gradient-to-br from-[var(--che-groen)] to-[#7ac19c] text-white',
    outline: 'bg-white border-2 border-[var(--che-blauw)] text-[var(--che-blauw)]',
  }

  const sizes = {
    sm: {
      container: 'p-4 rounded-xl',
      value: 'text-3xl',
      suffix: 'text-xl',
      label: 'text-xs',
    },
    md: {
      container: 'p-5 rounded-xl',
      value: 'text-4xl lg:text-5xl',
      suffix: 'text-2xl lg:text-3xl',
      label: 'text-sm',
    },
    lg: {
      container: 'p-6 lg:p-8 rounded-2xl',
      value: 'text-5xl lg:text-6xl',
      suffix: 'text-3xl lg:text-4xl',
      label: 'text-base',
    },
  }

  const sizeStyles = sizes[size]

  return (
    <div
      className={cn(
        'inline-flex flex-col',
        variants[variant],
        sizeStyles.container,
        className
      )}
    >
      <div className={cn('font-bold leading-none', sizeStyles.value)}>
        {value}
        {suffix && <span className={sizeStyles.suffix}>{suffix}</span>}
      </div>
      
      <div className={cn(
        'mt-2',
        sizeStyles.label,
        variant === 'outline' ? 'text-gray-600' : 'opacity-80'
      )}>
        {label}
      </div>

      {sublabel && (
        <div className={cn(
          'mt-1 text-xs',
          variant === 'outline' ? 'text-gray-500' : 'opacity-60'
        )}>
          {sublabel}
        </div>
      )}

      {trend && (
        <div className={cn(
          'mt-3 pt-3 border-t flex items-center gap-2',
          variant === 'outline' ? 'border-gray-200' : 'border-white/20'
        )}>
          <span className={cn(
            'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
            trend.value >= 0 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          )}>
            {trend.value >= 0 ? (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            ) : (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            )}
            {trend.value >= 0 ? '+' : ''}{trend.value}%
          </span>
          <span className={cn(
            'text-xs',
            variant === 'outline' ? 'text-gray-500' : 'opacity-60'
          )}>
            {trend.label}
          </span>
        </div>
      )}
    </div>
  )
}
