'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import type { User } from '@supabase/supabase-js'

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/admin/login')
      } else {
        setUser(user)
      }
      setLoading(false)
    }
    checkUser()
  }, [router, supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--che-blauw)]"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/images/che-logo.png"
                alt="CHE Logo"
                width={100}
                height={33}
                className="h-8 w-auto"
              />
              <span className="text-lg font-semibold text-gray-900">
                Admin Panel
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user.email}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Uitloggen
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Dashboard Overview */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-600">
            Beheer KPI data voor de Impactmonitor Regio Foodvalley
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-6 mb-8 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-[var(--che-blauw)]">9</div>
              <div className="text-sm text-gray-600">Strategische Lijnen</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-[var(--che-blauw)]">5</div>
              <div className="text-sm text-gray-600">Subthema&apos;s (MVP)</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-[var(--che-groen)]">25</div>
              <div className="text-sm text-gray-600">KPI&apos;s</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-[var(--che-groen)]">150+</div>
              <div className="text-sm text-gray-600">Datapunten</div>
            </CardContent>
          </Card>
        </div>

        {/* Management Sections */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card variant="interactive">
            <CardHeader>
              <CardTitle>Strategische Lijnen</CardTitle>
              <CardDescription>
                Beheer de strategische lijnen en hun beschrijvingen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/strategic-lines">
                <Button variant="outline" size="sm">
                  Beheren →
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card variant="interactive">
            <CardHeader>
              <CardTitle>KPI Beheer</CardTitle>
              <CardDescription>
                Voeg nieuwe KPI&apos;s toe of bewerk bestaande definities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/kpis">
                <Button variant="outline" size="sm">
                  Beheren →
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card variant="interactive">
            <CardHeader>
              <CardTitle>Data Invoer</CardTitle>
              <CardDescription>
                Voer nieuwe KPI meetgegevens in of importeer bulk data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/data">
                <Button variant="outline" size="sm">
                  Data invoeren →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-[var(--che-blauw)] mb-2">
            Database Setup Instructies
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            Om de database te initialiseren, voer de SQL migratie scripts uit in Supabase:
          </p>
          <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
            <li>Ga naar je Supabase project dashboard</li>
            <li>Open de SQL Editor</li>
            <li>Voer <code className="bg-white px-1 py-0.5 rounded text-xs">supabase/migrations/001_initial_schema.sql</code> uit</li>
            <li>Voer <code className="bg-white px-1 py-0.5 rounded text-xs">supabase/migrations/002_seed_data.sql</code> uit</li>
          </ol>
        </div>
      </main>
    </div>
  )
}
