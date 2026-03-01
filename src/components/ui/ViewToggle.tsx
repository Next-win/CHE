'use client'

import { cn } from '@/lib/utils'

export type ViewMode = 'story' | 'dashboard' | 'monitor'

interface ViewToggleProps {
  mode: ViewMode
  onChange: (mode: ViewMode) => void
  variant?: 'light' | 'dark'
  className?: string
}

export function ViewToggle({ mode, onChange, variant = 'light', className }: ViewToggleProps) {
  const isDark = variant === 'dark'
  
  return (
    <div className={cn(
      'inline-flex rounded-lg p-1',
      isDark ? 'bg-white/10' : 'bg-gray-100',
      className
    )}>
      <button
        onClick={() => onChange('monitor')}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
          mode === 'monitor'
            ? isDark 
              ? 'bg-white text-[var(--che-primary)] shadow-sm'
              : 'bg-white text-[var(--che-primary)] shadow-sm'
            : isDark
              ? 'text-white/80 hover:text-white hover:bg-white/10'
              : 'text-gray-600 hover:text-gray-900'
        )}
        title="Monitor weergave in Brainport stijl"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <span className="hidden sm:inline">Monitor</span>
      </button>
      <button
        onClick={() => onChange('story')}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
          mode === 'story'
            ? isDark 
              ? 'bg-white text-[var(--che-primary)] shadow-sm'
              : 'bg-white text-[var(--che-primary)] shadow-sm'
            : isDark
              ? 'text-white/80 hover:text-white hover:bg-white/10'
              : 'text-gray-600 hover:text-gray-900'
        )}
        title="Verhaal weergave met narratief"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span className="hidden sm:inline">Verhaal</span>
      </button>
      <button
        onClick={() => onChange('dashboard')}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
          mode === 'dashboard'
            ? isDark 
              ? 'bg-white text-[var(--che-primary)] shadow-sm'
              : 'bg-white text-[var(--che-primary)] shadow-sm'
            : isDark
              ? 'text-white/80 hover:text-white hover:bg-white/10'
              : 'text-gray-600 hover:text-gray-900'
        )}
        title="Compact dashboard overzicht"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <span className="hidden sm:inline">Dashboard</span>
      </button>
    </div>
  )
}
