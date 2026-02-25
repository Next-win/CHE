'use client'

import { cn } from '@/lib/utils'

interface StoryChapterProps {
  id: string
  title: string
  description: string
  chapterNumber: number
  keyStat?: {
    value: string | number
    label: string
    suffix?: string
  }
  className?: string
}

export function StoryChapter({
  id,
  title,
  description,
  chapterNumber,
  keyStat,
  className,
}: StoryChapterProps) {
  const gradients = [
    'from-[#20315c] to-[#3d89be]',
    'from-[#399356] to-[#7ac19c]',
    'from-[#3d89be] to-[#20315c]',
    'from-[#aa334d] to-[#d45f7a]',
    'from-[#20315c] to-[#399356]',
  ]

  const gradient = gradients[chapterNumber % gradients.length]

  return (
    <section
      id={id}
      className={cn(
        'relative py-20 lg:py-28 overflow-hidden scroll-mt-20',
        className
      )}
    >
      <div className={cn('absolute inset-0 bg-gradient-to-br', gradient)} />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px]" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 mb-6">
          <span className="text-white/90 text-sm font-medium">
            Hoofdstuk {chapterNumber}
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6 leading-tight">
          {title.toUpperCase()}
        </h2>

        <p className="text-lg lg:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-10">
          {description}
        </p>

        {keyStat && (
          <div className="inline-flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="text-5xl lg:text-6xl font-bold text-white mb-2">
              {keyStat.value}
              {keyStat.suffix && <span className="text-3xl lg:text-4xl">{keyStat.suffix}</span>}
            </div>
            <div className="text-white/70 text-sm lg:text-base">
              {keyStat.label}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
