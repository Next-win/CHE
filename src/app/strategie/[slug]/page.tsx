import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StrategieContent } from './StrategieContent'

// Static data for MVP - will be replaced with Supabase data
const strategicLinesData: Record<string, StrategicLineData> = {
  'innovatief-mkb': {
    code: '1.3',
    title: 'Innovatief en toekomstbestendig MKB',
    description: 'Het mkb is de motor van de economie in Regio Foodvalley. Innovatieve ondernemers zorgen voor werkgelegenheid, vernieuwing en economische veerkracht. Om ook in de toekomst succesvol te zijn, moeten bedrijven aan de slag met thema\'s die bepalend zijn voor de economie van de toekomst, zoals digitalisering, robotisering en energietransitie. De Strategische Agenda zet in op een krachtig en toekomstgericht mkb. Deze Impactmonitor volgt de voortgang.',
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
        description: '',
        keyStat: { value: '51%', label: 'bedrijven actief met productinnovatie' },
        kpis: [
          {
            id: 'type-innovatie',
            title: 'Productinnovatie meest voorkomende vorm van innovatie',
            description: 'Innovatietypen waarin bedrijven in Regio Foodvalley actief zijn',
            whatItMeasures: 'In Regio Foodvalley is productinnovatie de meest voorkomende vorm van vernieuwing. Veel bedrijven werken actief aan de ontwikkeling van nieuwe of sterk verbeterde producten en diensten. Dit sluit aan bij het ondernemende karakter van de regio, waar continu wordt gezocht naar slimme toepassingen en uitbreiding van activiteiten.\n\nInnovatie krijgt daarnaast vorm in slimmere processen, sterkere interne organisatie en nieuwe manieren om de markt te benaderen. Nieuwe vormen van externe innovatie komen relatief minder vaak voor. In vergelijking met 2018 zijn de verschillen beperkt, al is een duidelijke toename zichtbaar in procesinnovaties. Dat laat zien dat bedrijven niet alleen vernieuwen in wat zij aanbieden, maar ook in hoe zij hun processen organiseren en optimaliseren.',
            source: 'Kwantitatieve Innovatiemonitor Regio Foodvalley 2024',
            frequency: 'Om de 5 jaar',
            unit: 'percentage',
            infoText: `Definitie innovatie en innovatietypen

Innovatie is een vernieuwing die tot verbetering leidt, zo luidt de eenvoudigste definitie voor innovatie. We maken een onderscheid in verschillende soorten innovatie:

1. Productinnovatie: een introductie van een nieuw of sterk verbeterd product (goed of dienst)
2. Procesinnovatie: een vernieuwing of sterke verbetering van het productieproces, de distributie of van activiteiten die de productie ondersteunen
3. Organisatie innovatie: een vernieuwing of sterke verbetering van de organisatie van het bedrijf (management, besluitvorming, kwaliteitsbeheer, opleiding medewerkers)
4. Externe innovatie: nieuwe vormen van samenwerking met andere partijen
5. Marktinnovatie: nieuwe of sterke verbetering van marketing via productontwerp, -verpakking, -promotie of prijsstelling

Onderzoeksaanpak

Om een goed beeld te krijgen van de manier waarop bedrijven in Regio Foodvalley aan innovaties werken, is een enquête gehouden onder bedrijven die tot de acht aandachtssectoren behoren. Uit deze groep bedrijven is een steekproef getrokken van ruim 1.500 bedrijven die minimaal vijf werknemers hebben. De selectie van de bedrijven heeft plaatsgevonden met behulp van de Provinciale Werkgelegenheid Enquête (PWE) en het Provinciaal ArbeidsplaatsenRegister (PAR).

De bedrijven in de steekproef kregen per post een brief toegestuurd met een link naar de digitale enquête, gevolgd door een herinneringsbrief met de mogelijkheid om de vragenlijst schriftelijk in te vullen. De bedrijven die daarop niet hebben gereageerd, zijn vervolgens nagebeld. In totaal hebben 300 bedrijven de enquêtevragen beantwoord, wat overeenkomt met het aantal respondenten dat in 2018 de vragenlijst heeft ingevuld.`,
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
            title: 'Innovatiekracht verschilt naar bedrijfsomvang',
            description: 'Innovatieactiviteit naar bedrijfsgrootte',
            whatItMeasures: 'De mate waarin bedrijven innoveren verschilt naar bedrijfsomvang. Middelgrote en grote bedrijven ontplooien duidelijk meer innovatieactiviteiten dan kleine bedrijven en microbedrijven. Zij beschikken doorgaans over meer financiële middelen en capaciteit om innovaties te ontwikkelen en hebben mogelijk een eigen innovatieafdeling.\n\nMicrobedrijven zijn minder breed actief op het gebied van innovatie dan kleine bedrijven. Een uitzondering vormt innovatie in samenwerking met externe partijen: hierin zijn juist de kleinste bedrijven relatief actief. Innovatie in Regio Foodvalley krijgt daarmee op verschillende manieren vorm, afhankelijk van schaal en organisatie.',
            source: 'Kwantitatieve Innovatiemonitor Regio Foodvalley 2024',
            frequency: 'Om de 5 jaar',
            unit: 'percentage',
            infoText: `**Definitie bedrijfsgrootte**
In deze monitor wordt onderscheid gemaakt tussen drie bedrijfsgrootteklassen, gebaseerd op het aantal werkzame personen per vestiging:

- **Microbedrijven:** 5 tot 10 werknemers
- **Kleine bedrijven:** 10 tot 50 werknemers
- **Middelgrote en grote bedrijven:** 50 of meer werknemers`,
            data: [
              { year: 2023, valueRegion: 43, sector: 'Productinnovatie', companySize: 'Micro' },
              { year: 2023, valueRegion: 51, sector: 'Productinnovatie', companySize: 'Klein' },
              { year: 2023, valueRegion: 72, sector: 'Productinnovatie', companySize: '(Middel)groot' },
              { year: 2023, valueRegion: 40, sector: 'Procesinnovatie', companySize: 'Micro' },
              { year: 2023, valueRegion: 50, sector: 'Procesinnovatie', companySize: 'Klein' },
              { year: 2023, valueRegion: 59, sector: 'Procesinnovatie', companySize: '(Middel)groot' },
              { year: 2023, valueRegion: 27, sector: 'Organisatie innovatie', companySize: 'Micro' },
              { year: 2023, valueRegion: 34, sector: 'Organisatie innovatie', companySize: 'Klein' },
              { year: 2023, valueRegion: 46, sector: 'Organisatie innovatie', companySize: '(Middel)groot' },
              { year: 2023, valueRegion: 18, sector: 'Externe innovatie', companySize: 'Micro' },
              { year: 2023, valueRegion: 10, sector: 'Externe innovatie', companySize: 'Klein' },
              { year: 2023, valueRegion: 23, sector: 'Externe innovatie', companySize: '(Middel)groot' },
              { year: 2023, valueRegion: 13, sector: 'Marktinnovatie', companySize: 'Micro' },
              { year: 2023, valueRegion: 17, sector: 'Marktinnovatie', companySize: 'Klein' },
              { year: 2023, valueRegion: 26, sector: 'Marktinnovatie', companySize: '(Middel)groot' },
            ],
          },
        ],
      },
      {
        id: 'bedrijventerreinen',
        title: 'Ruimte en\nbedrijven\nterreinen',
        description: '',
        keyStat: { value: '5,1', label: 'hectare uitgegeven in 2024', suffix: ' ha' },
        kpis: [
          {
            id: 'uitgifte',
            title: 'Uitgifte bedrijventerreinen blijft achter bij regionale behoefte',
            description: 'Uitgifte van bedrijventerreinen in de periode 2014-2024 in netto hectares',
            whatItMeasures: 'De uitgifte van bedrijventerreinen in Regio Foodvalley is in 2024 licht toegenomen ten opzichte van 2023, maar blijft structureel achter bij de vraag. In totaal is in 2024 5,1 hectare uitgegeven, terwijl jaarlijks circa 40 tot 44 hectare nodig is om te voldoen aan de regionale ambities richting 2030. Daarmee blijft de kloof tussen vraag en beschikbaar aanbod aanzienlijk.\n\nDe beperkte uitgifte hangt samen met hardnekkige knelpunten. Netcongestie vormt een belangrijke belemmering voor de ontwikkeling en ingebruikname van nieuwe kavels. Daarnaast zorgen planologische procedures, stijgende bouw- en grondkosten en ecologische beperkingen voor vertraging.\n\nHistorisch gezien lag de uitgifte in de regio aanzienlijk hoger, met duidelijke pieken in eerdere jaren. Sinds 2022 blijft het jaarlijkse niveau echter steken op maximaal vijf hectare. Zonder versnelling in planvorming en aanpassingen aan het energienet bestaat het risico dat de regio onvoldoende ruimte kan bieden aan nieuwe en groeiende bedrijven. Dit kan gevolgen hebben voor de economische ontwikkeling en het innovatieve profiel van Regio Foodvalley.',
            source: 'Monitor Bedrijventerreinen Regio Foodvalley 2024',
            frequency: 'Jaarlijks',
            unit: 'hectare',
            data: [
              { year: 2014, valueRegion: 13.3 },
              { year: 2015, valueRegion: 11.1 },
              { year: 2016, valueRegion: 18.9 },
              { year: 2017, valueRegion: 34 },
              { year: 2018, valueRegion: 16.7 },
              { year: 2019, valueRegion: 28.8 },
              { year: 2020, valueRegion: 7.1 },
              { year: 2021, valueRegion: 13.3 },
              { year: 2022, valueRegion: 3.6 },
              { year: 2023, valueRegion: 0.68 },
              { year: 2024, valueRegion: 5.1 },
            ],
            referenceLines: [
              { value: 13.9, label: 'Gemiddelde van 2014-2024 (13,9)', color: 'green' },
              { value: 40, label: 'Beoogde ruimte per jaar', color: 'blue' },
            ],
          },
          {
            id: 'planaanbod',
            title: 'Planaanbod verschilt sterk per gemeente',
            description: 'Actueel planaanbod bedrijventerreinen in hectares per gemeente',
            whatItMeasures: 'Volgens IBIS bevindt een groot deel van het actuele planaanbod in Regio Foodvalley zich in Ede. Het grootste deel daarvan valt in de categorie niet direct uitgeefbaar particulier. Dit betekent dat er in theorie veel terreinen beschikbaar zijn, maar dat deze nog niet direct door bedrijven benut kunnen worden.\n\nIn Wageningen bestaat het planaanbod voornamelijk uit direct uitgeefbare gronden. In Scherpenzeel valt het aanbod onder niet direct uitgeefbaar gemeente, in het bijzonder de uitbreiding van bedrijventerrein \'t Zwarte Land. Het participatietraject voor dit terrein wordt binnenkort opgestart door de initiatiefnemer.\n\nNijkerk beschikt over planaanbod in zowel de categorie direct uitgeefbaar gemeente als niet direct uitgeefbaar gemeente. In Barneveld bevindt het grootste deel van het planaanbod zich in de categorie niet direct uitgeefbaar gemeente. Daarbij geeft de gemeente aan dat zij alleen zicht heeft op gronden waarbij zij zelf betrokken is, zoals bedrijventerrein Harselaar 1b, dat grotendeels uit privaat eigendom bestaat. Renswoude heeft voornamelijk planaanbod in de categorie niet direct uitgeefbaar gemeente en daarnaast een klein aandeel niet direct uitgeefbaar particulier.',
            source: 'IBIS, peildatum juni 2025',
            frequency: 'Jaarlijks',
            unit: 'planaanbod',
            data: [
              { year: 2025, valueRegion: 0, municipality: 'Barneveld', directGemeente: 1, directParticulier: 6, nietDirectGemeente: 53, nietDirectParticulier: 0, flexibel: 0 },
              { year: 2025, valueRegion: 0, municipality: 'Ede', directGemeente: 2, directParticulier: 13, nietDirectGemeente: 0, nietDirectParticulier: 17, flexibel: 10 },
              { year: 2025, valueRegion: 0, municipality: 'Nijkerk', directGemeente: 1, directParticulier: 0, nietDirectGemeente: 2, nietDirectParticulier: 0, flexibel: 0 },
              { year: 2025, valueRegion: 0, municipality: 'Scherpenzeel', directGemeente: 0, directParticulier: 0, nietDirectGemeente: 7, nietDirectParticulier: 0, flexibel: 0 },
              { year: 2025, valueRegion: 0, municipality: 'Wageningen', directGemeente: 5, directParticulier: 6, nietDirectGemeente: 2, nietDirectParticulier: 0, flexibel: 0 },
              { year: 2025, valueRegion: 0, municipality: 'Renswoude', directGemeente: 0, directParticulier: 0, nietDirectGemeente: 2, nietDirectParticulier: 1, flexibel: 0 },
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
            source: 'Kwantitatieve Innovatiemonitor Regio Foodvalley 2024',
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
            source: 'Kwantitatieve Innovatiemonitor Regio Foodvalley 2024',
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
  infoText?: string
  data: KPIDataPoint[]
  referenceLines?: { value: number; label: string; color: string }[]
}

export interface KPIDataPoint {
  year: number
  valueRegion: number
  valueNational?: number
  sector?: string
  companySize?: string
  successFactor?: string
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
