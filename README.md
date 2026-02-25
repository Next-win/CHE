# Impactmonitor Regio Foodvalley

Een online impactmonitor die inzicht geeft in de voortgang op strategische doelen van Regio Foodvalley via KPI's en trends, gebaseerd op de Strategische Agenda 2026-2030.

## Tech Stack

- **Framework**: Next.js 16+ met App Router en TypeScript
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS met CHE huisstijl
- **Charts**: Recharts
- **Fonts**: DM Sans (Google Fonts)
- **Auth**: Supabase Auth

## Getting Started

### Prerequisites

- Node.js 20+
- npm of yarn
- Supabase account

### Installation

1. Clone de repository:
```bash
git clone <repository-url>
cd CHE
```

2. Installeer dependencies:
```bash
npm install
```

3. Maak een `.env.local` bestand aan (kopieer van `.env.local.example`):
```bash
cp .env.local.example .env.local
```

4. Vul de Supabase credentials in:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Database Setup

Voer de SQL migratie scripts uit in je Supabase project:

1. Ga naar [Supabase Dashboard](https://supabase.com/dashboard) → SQL Editor
2. Voer achtereenvolgens uit:
   - `supabase/migrations/001_initial_schema.sql` - Creëert de tabellen
   - `supabase/migrations/002_seed_data.sql` - Vult de structuur (strategische lijnen, subthema's, KPI definities)
   - `supabase/migrations/003_sample_kpi_data.sql` - Voegt voorbeeld KPI data toe

### Development

Start de development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout
│   ├── strategie/[slug]/           # Strategische lijn pagina's
│   ├── admin/                      # Admin panel
│   └── over/                       # Over pagina
├── components/
│   ├── ui/                         # Basis UI componenten
│   ├── charts/                     # Recharts wrappers
│   ├── kpi/                        # KPI cards en detail views
│   └── layout/                     # Header, Footer
├── lib/
│   ├── supabase/                   # Supabase client
│   └── utils.ts                    # Utility functions
└── styles/
    └── globals.css                 # Tailwind + CHE tokens
```

## MVP Scope

De eerste versie (MVP) focust op **Strategische Lijn 1.3: Innovatief en toekomstbestendig MKB** met de volgende subthema's:

1. Structuur en ontwikkeling MKB
2. Innovatiekracht MKB
3. Transities economie van de toekomst
4. Ruimte en toekomstbestendige bedrijventerreinen
5. Clustervorming en kennis- en innovatie-ecosystemen

## CHE Huisstijl

- **CHE Blauw**: `#004070`
- **CHE Groen**: `#2fac66`
- **Font**: DM Sans

## Bronnen

- LISA Werkgelegenheidsregister
- Innovatiemonitor Regio Foodvalley
- Monitor Bedrijventerreinen (Provincie Gelderland)
- CBS StatLine

## Licentie

© Christelijke Hogeschool Ede
