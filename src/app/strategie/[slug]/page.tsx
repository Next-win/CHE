import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StrategieContent } from './StrategieContent'

// Static data for MVP - will be replaced with Supabase data
const strategicLinesData: Record<string, StrategicLineData> = {
  'innovatief-mkb': {
    code: '1.3',
    title: 'Innovatief en toekomstbestendig MKB',
    description: 'Een innovatief en toekomstbestendig MKB dat bijdraagt aan economische groei en werkgelegenheid in Regio Foodvalley. Deze strategische lijn richt zich op het versterken van de innovatiekracht, het bevorderen van transities naar een duurzame economie en het creëren van een aantrekkelijk vestigingsklimaat.',
    subthemes: [
      {
        id: 'structuur',
        title: 'Structuur en ontwikkeling MKB',
        description: 'Inzicht in de structuur en ontwikkeling van het MKB in Regio Foodvalley.',
        keyStat: { value: '+20%', label: 'banengroei sinds 2015' },
        kpis: [
          {
            id: 'banen',
            title: 'Ontwikkeling banen',
            description: 'Ontwikkeling van het aantal banen (index 2015 = 100)',
            whatItMeasures: 'Omvang en ontwikkeling van de werkgelegenheid, weergegeven als indexcijfer ten opzichte van basisjaar 2015. De regio laat een sterkere banengroei zien dan het landelijk gemiddelde, wat duidt op een gezonde en groeiende economie.',
            source: 'LISA',
            frequency: 'Jaarlijks',
            unit: 'index',
            baseYear: 2015,
            data: [
              { year: 2015, valueRegion: 100.0, valueNational: 100.0, rawRegion: 165000, rawNational: 8500000 },
              { year: 2016, valueRegion: 101.8, valueNational: 101.8, rawRegion: 168000, rawNational: 8650000 },
              { year: 2017, valueRegion: 104.2, valueNational: 103.5, rawRegion: 172000, rawNational: 8800000 },
              { year: 2018, valueRegion: 107.9, valueNational: 105.9, rawRegion: 178000, rawNational: 9000000 },
              { year: 2019, valueRegion: 110.9, valueNational: 107.6, rawRegion: 183000, rawNational: 9150000 },
              { year: 2020, valueRegion: 109.1, valueNational: 105.9, rawRegion: 180000, rawNational: 9000000 },
              { year: 2021, valueRegion: 110.3, valueNational: 107.1, rawRegion: 182000, rawNational: 9100000 },
              { year: 2022, valueRegion: 113.9, valueNational: 110.0, rawRegion: 188000, rawNational: 9350000 },
              { year: 2023, valueRegion: 117.0, valueNational: 111.8, rawRegion: 193000, rawNational: 9500000 },
              { year: 2024, valueRegion: 120.0, valueNational: 114.1, rawRegion: 198000, rawNational: 9700000 },
            ],
          },
          {
            id: 'vestigingen',
            title: 'Ontwikkeling bedrijfsvestigingen',
            description: 'Ontwikkeling van het aantal bedrijfsvestigingen (index 2015 = 100)',
            whatItMeasures: 'Omvang en ontwikkeling van het aantal bedrijfsvestigingen, weergegeven als indexcijfer ten opzichte van basisjaar 2015. Het aantal bedrijven groeit gestaag, wat wijst op een aantrekkelijk ondernemersklimaat.',
            source: 'LISA',
            frequency: 'Jaarlijks',
            unit: 'index',
            baseYear: 2015,
            data: [
              { year: 2015, valueRegion: 100.0, valueNational: 100.0, rawRegion: 28000, rawNational: 1450000 },
              { year: 2016, valueRegion: 105.4, valueNational: 104.8, rawRegion: 29500, rawNational: 1520000 },
              { year: 2017, valueRegion: 110.7, valueNational: 110.3, rawRegion: 31000, rawNational: 1600000 },
              { year: 2018, valueRegion: 116.1, valueNational: 115.9, rawRegion: 32500, rawNational: 1680000 },
              { year: 2019, valueRegion: 121.4, valueNational: 121.4, rawRegion: 34000, rawNational: 1760000 },
              { year: 2020, valueRegion: 126.8, valueNational: 127.6, rawRegion: 35500, rawNational: 1850000 },
              { year: 2021, valueRegion: 132.1, valueNational: 133.8, rawRegion: 37000, rawNational: 1940000 },
              { year: 2022, valueRegion: 137.5, valueNational: 140.0, rawRegion: 38500, rawNational: 2030000 },
              { year: 2023, valueRegion: 142.9, valueNational: 146.2, rawRegion: 40000, rawNational: 2120000 },
              { year: 2024, valueRegion: 148.2, valueNational: 152.4, rawRegion: 41500, rawNational: 2210000 },
            ],
          },
        ],
      },
      {
        id: 'innovatie',
        title: 'Innovatiekracht MKB',
        description: 'De innovatieve capaciteit van het MKB, gemeten aan type innovaties en succesfactoren.',
        keyStat: { value: '51%', label: 'bedrijven actief met productinnovatie' },
        kpis: [
          {
            id: 'type-innovatie',
            title: 'Type innovatie bij bedrijven',
            description: 'Percentage bedrijven dat actief is met verschillende typen innovatie',
            whatItMeasures: 'Uit een enquête onder bedrijven binnen de aandachtssectoren blijkt in welke typen innovatie bedrijven actief zijn. Productinnovatie komt het meest voor - meer dan de helft van de respondenten is hierin actief. Dit wordt verklaard doordat het grootste deel van de bedrijvigheid in Regio Foodvalley bestaat uit MKB-bedrijven die actief bezig zijn met het ontwikkelen van slimme producten.',
            source: 'Kwantitatieve Innovatiemonitor Regio Foodvalley 2024 (CHE)',
            frequency: 'Om de 5 jaar',
            unit: 'percentage',
            data: [
              { year: 2018, valueRegion: 49, sector: 'Productinnovatie' },
              { year: 2018, valueRegion: 43, sector: 'Procesinnovatie' },
              { year: 2018, valueRegion: 32, sector: 'Organisatie-innovatie' },
              { year: 2018, valueRegion: 19, sector: 'Marktinnovatie' },
              { year: 2018, valueRegion: 17, sector: 'Externe innovatie' },
              { year: 2023, valueRegion: 51, sector: 'Productinnovatie' },
              { year: 2023, valueRegion: 48, sector: 'Procesinnovatie' },
              { year: 2023, valueRegion: 33, sector: 'Organisatie-innovatie' },
              { year: 2023, valueRegion: 17, sector: 'Marktinnovatie' },
              { year: 2023, valueRegion: 14, sector: 'Externe innovatie' },
            ],
          },
          {
            id: 'innovatie-bedrijfsgrootte',
            title: 'Innovatieactiviteit naar bedrijfsgrootte',
            description: 'Percentage bedrijven met productinnovatie per bedrijfsgrootte',
            whatItMeasures: '(Middel)grote bedrijven hebben duidelijk meer innovatieactiviteiten dan kleinere bedrijven. Grote bedrijven beschikken doorgaans over meer financiële middelen en resources, en hebben mogelijk een eigen innovatieafdeling. De getoonde percentages betreffen productinnovatie.',
            source: 'Kwantitatieve Innovatiemonitor Regio Foodvalley 2024 (CHE)',
            frequency: 'Om de 5 jaar',
            unit: 'percentage',
            data: [
              { year: 2023, valueRegion: 43, sector: 'Micro (5-10 wp)' },
              { year: 2023, valueRegion: 51, sector: 'Klein (10-50 wp)' },
              { year: 2023, valueRegion: 72, sector: '(Middel)groot (50+ wp)' },
            ],
          },
        ],
      },
      {
        id: 'transities',
        title: 'Transities economie van de toekomst',
        description: 'De voortgang van bedrijven op het gebied van digitalisering, circulariteit en verduurzaming.',
        keyStat: { value: '35%', label: 'bedrijven past AI of data-analyse toe' },
        kpis: [
          {
            id: 'digitalisering',
            title: 'Data-analyse en AI toepassing',
            description: 'Aandeel bedrijven dat data-analyse of AI toepast',
            whatItMeasures: 'Mate waarin bedrijven data analyseren en AI inzetten. De regio loopt voor op het landelijk gemiddelde, wat aantoont dat het MKB actief investeert in digitale transformatie.',
            source: 'Innovatiemonitor',
            frequency: 'Om de 4 jaar',
            unit: 'percentage',
            data: [
              { year: 2018, valueRegion: 18, valueNational: 15 },
              { year: 2023, valueRegion: 35, valueNational: 32 },
            ],
          },
          {
            id: 'circulair',
            title: 'Circulaire productieprocessen',
            description: 'Aandeel bedrijven met circulaire processen',
            whatItMeasures: 'Mate waarin bedrijven reststoffen hergebruiken en circulaire principes toepassen in hun productieprocessen. Dit draagt bij aan een duurzamere economie.',
            source: 'Innovatiemonitor',
            frequency: 'Om de 4 jaar',
            unit: 'percentage',
            data: [
              { year: 2018, valueRegion: 22, valueNational: 18 },
              { year: 2023, valueRegion: 38, valueNational: 32 },
            ],
          },
          {
            id: 'klimaat',
            title: 'Emissiereductie en klimaatmaatregelen',
            description: 'Aandeel bedrijven met klimaatmaatregelen',
            whatItMeasures: 'Mate waarin bedrijven actief werken aan het verminderen van hun uitstoot en het nemen van klimaatmaatregelen. Bijna de helft van de bedrijven is hiermee bezig.',
            source: 'Innovatiemonitor',
            frequency: 'Om de 4 jaar',
            unit: 'percentage',
            data: [
              { year: 2018, valueRegion: 28, valueNational: 25 },
              { year: 2023, valueRegion: 48, valueNational: 42 },
            ],
          },
        ],
      },
      {
        id: 'bedrijventerreinen',
        title: 'Ruimte en toekomstbestendige bedrijventerreinen',
        description: 'Beschikbaarheid en kwaliteit van bedrijventerreinen in de regio.',
        keyStat: { value: '55', label: 'hectare uitgegeven in 2024', suffix: ' ha' },
        kpis: [
          {
            id: 'uitgifte',
            title: 'Uitgifte bedrijventerrein',
            description: 'Jaarlijkse uitgifte van bedrijventerrein in hectare',
            whatItMeasures: 'Oppervlakte werklocaties uitgegeven aan gebruikers. De uitgifte fluctueert per jaar, afhankelijk van economische omstandigheden en beschikbaarheid.',
            source: 'Monitor Bedrijventerreinen',
            frequency: 'Jaarlijks',
            unit: 'hectare',
            data: [
              { year: 2014, valueRegion: 25 },
              { year: 2015, valueRegion: 32 },
              { year: 2016, valueRegion: 28 },
              { year: 2017, valueRegion: 35 },
              { year: 2018, valueRegion: 42 },
              { year: 2019, valueRegion: 38 },
              { year: 2020, valueRegion: 30 },
              { year: 2021, valueRegion: 45 },
              { year: 2022, valueRegion: 52 },
              { year: 2023, valueRegion: 48 },
              { year: 2024, valueRegion: 55 },
            ],
          },
          {
            id: 'planaanbod',
            title: 'Beschikbaar planaanbod',
            description: 'Beschikbare hectares bedrijventerrein',
            whatItMeasures: 'Actueel planaanbod verdeeld naar beschikbaarheid. Het aanbod neemt af door toenemende vraag, wat vraagt om strategische ruimtelijke planning.',
            source: 'Monitor Bedrijventerreinen',
            frequency: 'Jaarlijks',
            unit: 'hectare',
            data: [
              { year: 2020, valueRegion: 180 },
              { year: 2021, valueRegion: 165 },
              { year: 2022, valueRegion: 145 },
              { year: 2023, valueRegion: 125 },
              { year: 2024, valueRegion: 110 },
            ],
          },
        ],
      },
      {
        id: 'clusters',
        title: 'Clustervorming en kennis- en innovatie-ecosystemen',
        description: 'Samenwerking tussen bedrijven, kennisinstellingen en overheden (Triple Helix).',
        keyStat: { value: '63%', label: 'foodbedrijven werkt samen met kennisinstellingen' },
        kpis: [
          {
            id: 'samenwerking-kennis',
            title: 'Samenwerking met kennisinstellingen',
            description: 'Percentage bedrijven dat samenwerkt met kennisinstellingen per sector',
            whatItMeasures: 'Voor de werking van de Triple Helix is het van groot belang of bedrijven samenwerken met kennisinstellingen bij innovatie. In het foodcluster, de creatieve industrie en de energie- en milieutechnieksector wordt het meest samengewerkt. Bedrijven werken veel samen met mbo-studenten, zoals via Food Academy Nijkerk (FAN) en Aeres.',
            source: 'Kwantitatieve Innovatiemonitor Regio Foodvalley 2024 (CHE)',
            frequency: 'Om de 5 jaar',
            unit: 'percentage',
            data: [
              { year: 2018, valueRegion: 8, sector: 'Bouw' },
              { year: 2018, valueRegion: 16, sector: 'Creatieve industrie' },
              { year: 2018, valueRegion: 35, sector: 'Energie/Milieu' },
              { year: 2018, valueRegion: 30, sector: 'Food' },
              { year: 2018, valueRegion: 41, sector: 'ICT' },
              { year: 2018, valueRegion: 20, sector: 'Metaal' },
              { year: 2018, valueRegion: 18, sector: 'Overige industrie' },
              { year: 2018, valueRegion: 7, sector: 'Transport' },
              { year: 2023, valueRegion: 46, sector: 'Bouw' },
              { year: 2023, valueRegion: 56, sector: 'Creatieve industrie' },
              { year: 2023, valueRegion: 53, sector: 'Energie/Milieu' },
              { year: 2023, valueRegion: 63, sector: 'Food' },
              { year: 2023, valueRegion: 47, sector: 'ICT' },
              { year: 2023, valueRegion: 32, sector: 'Metaal' },
              { year: 2023, valueRegion: 30, sector: 'Overige industrie' },
              { year: 2023, valueRegion: 21, sector: 'Transport' },
            ],
          },
          {
            id: 'samenwerking-advies',
            title: 'Samenwerking met adviesbureaus',
            description: 'Percentage bedrijven dat samenwerkt met onderzoeks- of adviesbureaus',
            whatItMeasures: 'In de bouwsector en het foodcluster wordt het meest samengewerkt met onderzoeks- of adviesbureaus. Bouwbedrijven werken vooral samen met ingenieurs- en architectenbureaus. In het foodcluster zijn er samenwerkingen op het gebied van marketingadvies en consumentenonderzoek.',
            source: 'Kwantitatieve Innovatiemonitor Regio Foodvalley 2024 (CHE)',
            frequency: 'Om de 5 jaar',
            unit: 'percentage',
            data: [
              { year: 2018, valueRegion: 18, sector: 'Bouw' },
              { year: 2018, valueRegion: 18, sector: 'Creatieve industrie' },
              { year: 2018, valueRegion: 25, sector: 'Energie/Milieu' },
              { year: 2018, valueRegion: 32, sector: 'Food' },
              { year: 2018, valueRegion: 18, sector: 'ICT' },
              { year: 2018, valueRegion: 20, sector: 'Metaal' },
              { year: 2018, valueRegion: 20, sector: 'Overige industrie' },
              { year: 2018, valueRegion: 18, sector: 'Transport' },
              { year: 2023, valueRegion: 43, sector: 'Bouw' },
              { year: 2023, valueRegion: 31, sector: 'Creatieve industrie' },
              { year: 2023, valueRegion: 31, sector: 'Energie/Milieu' },
              { year: 2023, valueRegion: 37, sector: 'Food' },
              { year: 2023, valueRegion: 19, sector: 'ICT' },
              { year: 2023, valueRegion: 32, sector: 'Metaal' },
              { year: 2023, valueRegion: 25, sector: 'Overige industrie' },
              { year: 2023, valueRegion: 32, sector: 'Transport' },
            ],
          },
        ],
      },
    ],
  },
}

export interface StrategicLineData {
  code: string
  title: string
  description: string
  subthemes: Subtheme[]
}

export interface Subtheme {
  id: string
  title: string
  description: string
  keyStat?: {
    value: string
    label: string
    suffix?: string
  }
  kpis: KPI[]
}

export interface KPI {
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

export interface KPIDataPoint {
  year: number
  valueRegion: number
  valueNational?: number
  sector?: string
  rawRegion?: number
  rawNational?: number
}

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function StrategiePage({ params }: PageProps) {
  const { slug } = await params
  const data = strategicLinesData[slug]

  if (!data) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <StrategieContent data={data} />
      <Footer />
    </div>
  )
}

export function generateStaticParams() {
  return Object.keys(strategicLinesData).map((slug) => ({
    slug,
  }))
}
