-- Sample KPI data for MVP demonstration
-- This file contains example data points for the KPIs

DO $$
DECLARE
  kpi_banen_id UUID;
  kpi_vestigingen_id UUID;
  kpi_type_innovatie_id UUID;
  kpi_innovatie_grootte_id UUID;
  kpi_digitalisering_id UUID;
  kpi_circulair_id UUID;
  kpi_klimaat_id UUID;
  kpi_uitgifte_id UUID;
  kpi_planaanbod_id UUID;
  kpi_samenwerking_regionaal_id UUID;
  kpi_samenwerking_kennis_id UUID;
BEGIN

  -- Get KPI IDs (these are created by the seed script)
  SELECT id INTO kpi_banen_id FROM kpis WHERE title = 'Aantal banen' LIMIT 1;
  SELECT id INTO kpi_vestigingen_id FROM kpis WHERE title = 'Aantal bedrijfsvestigingen' LIMIT 1;
  SELECT id INTO kpi_type_innovatie_id FROM kpis WHERE title = 'Type innovatie bij bedrijven' LIMIT 1;
  SELECT id INTO kpi_innovatie_grootte_id FROM kpis WHERE title = 'Innovatieactiviteit naar bedrijfsgrootte' LIMIT 1;
  SELECT id INTO kpi_digitalisering_id FROM kpis WHERE title = 'Data-analyse en AI toepassing' LIMIT 1;
  SELECT id INTO kpi_circulair_id FROM kpis WHERE title = 'Circulaire productieprocessen' LIMIT 1;
  SELECT id INTO kpi_klimaat_id FROM kpis WHERE title = 'Emissiereductie en klimaatmaatregelen' LIMIT 1;
  SELECT id INTO kpi_uitgifte_id FROM kpis WHERE title = 'Uitgifte bedrijventerrein' LIMIT 1;
  SELECT id INTO kpi_planaanbod_id FROM kpis WHERE title = 'Beschikbaar planaanbod' LIMIT 1;
  SELECT id INTO kpi_samenwerking_regionaal_id FROM kpis WHERE title = 'Samenwerking innovatie - regionaal' LIMIT 1;
  SELECT id INTO kpi_samenwerking_kennis_id FROM kpis WHERE title = 'Samenwerking met kennisinstellingen' LIMIT 1;

  -- Insert KPI data for "Aantal banen"
  IF kpi_banen_id IS NOT NULL THEN
    INSERT INTO kpi_data (kpi_id, year, value_region, value_national) VALUES
    (kpi_banen_id, 2015, 165000, 8500000),
    (kpi_banen_id, 2016, 168000, 8650000),
    (kpi_banen_id, 2017, 172000, 8800000),
    (kpi_banen_id, 2018, 178000, 9000000),
    (kpi_banen_id, 2019, 183000, 9150000),
    (kpi_banen_id, 2020, 180000, 9000000),
    (kpi_banen_id, 2021, 182000, 9100000),
    (kpi_banen_id, 2022, 188000, 9350000),
    (kpi_banen_id, 2023, 193000, 9500000),
    (kpi_banen_id, 2024, 198000, 9700000)
    ON CONFLICT (kpi_id, year, sector) DO UPDATE SET
      value_region = EXCLUDED.value_region,
      value_national = EXCLUDED.value_national;
  END IF;

  -- Insert KPI data for "Aantal bedrijfsvestigingen"
  IF kpi_vestigingen_id IS NOT NULL THEN
    INSERT INTO kpi_data (kpi_id, year, value_region, value_national) VALUES
    (kpi_vestigingen_id, 2015, 28000, 1450000),
    (kpi_vestigingen_id, 2016, 29500, 1520000),
    (kpi_vestigingen_id, 2017, 31000, 1600000),
    (kpi_vestigingen_id, 2018, 32500, 1680000),
    (kpi_vestigingen_id, 2019, 34000, 1760000),
    (kpi_vestigingen_id, 2020, 35500, 1850000),
    (kpi_vestigingen_id, 2021, 37000, 1940000),
    (kpi_vestigingen_id, 2022, 38500, 2030000),
    (kpi_vestigingen_id, 2023, 40000, 2120000),
    (kpi_vestigingen_id, 2024, 41500, 2210000)
    ON CONFLICT (kpi_id, year, sector) DO UPDATE SET
      value_region = EXCLUDED.value_region,
      value_national = EXCLUDED.value_national;
  END IF;

  -- Insert KPI data for "Type innovatie bij bedrijven" (with sectors)
  IF kpi_type_innovatie_id IS NOT NULL THEN
    INSERT INTO kpi_data (kpi_id, year, value_region, value_national, sector) VALUES
    (kpi_type_innovatie_id, 2018, 45, 42, 'Product'),
    (kpi_type_innovatie_id, 2018, 38, 35, 'Proces'),
    (kpi_type_innovatie_id, 2018, 28, 25, 'Organisatie'),
    (kpi_type_innovatie_id, 2018, 22, 20, 'Markt'),
    (kpi_type_innovatie_id, 2023, 52, 48, 'Product'),
    (kpi_type_innovatie_id, 2023, 44, 40, 'Proces'),
    (kpi_type_innovatie_id, 2023, 32, 28, 'Organisatie'),
    (kpi_type_innovatie_id, 2023, 26, 23, 'Markt')
    ON CONFLICT (kpi_id, year, sector) DO UPDATE SET
      value_region = EXCLUDED.value_region,
      value_national = EXCLUDED.value_national;
  END IF;

  -- Insert KPI data for "Innovatieactiviteit naar bedrijfsgrootte"
  IF kpi_innovatie_grootte_id IS NOT NULL THEN
    INSERT INTO kpi_data (kpi_id, year, value_region, value_national, sector) VALUES
    (kpi_innovatie_grootte_id, 2018, 35, 32, 'Micro (5-10)'),
    (kpi_innovatie_grootte_id, 2018, 52, 48, 'Klein (10-50)'),
    (kpi_innovatie_grootte_id, 2018, 68, 65, 'Middelgroot/groot (50+)'),
    (kpi_innovatie_grootte_id, 2023, 42, 38, 'Micro (5-10)'),
    (kpi_innovatie_grootte_id, 2023, 58, 54, 'Klein (10-50)'),
    (kpi_innovatie_grootte_id, 2023, 75, 72, 'Middelgroot/groot (50+)')
    ON CONFLICT (kpi_id, year, sector) DO UPDATE SET
      value_region = EXCLUDED.value_region,
      value_national = EXCLUDED.value_national;
  END IF;

  -- Insert KPI data for "Data-analyse en AI toepassing"
  IF kpi_digitalisering_id IS NOT NULL THEN
    INSERT INTO kpi_data (kpi_id, year, value_region, value_national) VALUES
    (kpi_digitalisering_id, 2018, 18, 15),
    (kpi_digitalisering_id, 2023, 35, 32)
    ON CONFLICT (kpi_id, year, sector) DO UPDATE SET
      value_region = EXCLUDED.value_region,
      value_national = EXCLUDED.value_national;
  END IF;

  -- Insert KPI data for "Circulaire productieprocessen"
  IF kpi_circulair_id IS NOT NULL THEN
    INSERT INTO kpi_data (kpi_id, year, value_region, value_national) VALUES
    (kpi_circulair_id, 2018, 22, 18),
    (kpi_circulair_id, 2023, 38, 32)
    ON CONFLICT (kpi_id, year, sector) DO UPDATE SET
      value_region = EXCLUDED.value_region,
      value_national = EXCLUDED.value_national;
  END IF;

  -- Insert KPI data for "Emissiereductie en klimaatmaatregelen"
  IF kpi_klimaat_id IS NOT NULL THEN
    INSERT INTO kpi_data (kpi_id, year, value_region, value_national) VALUES
    (kpi_klimaat_id, 2018, 28, 25),
    (kpi_klimaat_id, 2023, 48, 42)
    ON CONFLICT (kpi_id, year, sector) DO UPDATE SET
      value_region = EXCLUDED.value_region,
      value_national = EXCLUDED.value_national;
  END IF;

  -- Insert KPI data for "Uitgifte bedrijventerrein"
  IF kpi_uitgifte_id IS NOT NULL THEN
    INSERT INTO kpi_data (kpi_id, year, value_region) VALUES
    (kpi_uitgifte_id, 2014, 25),
    (kpi_uitgifte_id, 2015, 32),
    (kpi_uitgifte_id, 2016, 28),
    (kpi_uitgifte_id, 2017, 35),
    (kpi_uitgifte_id, 2018, 42),
    (kpi_uitgifte_id, 2019, 38),
    (kpi_uitgifte_id, 2020, 30),
    (kpi_uitgifte_id, 2021, 45),
    (kpi_uitgifte_id, 2022, 52),
    (kpi_uitgifte_id, 2023, 48),
    (kpi_uitgifte_id, 2024, 55)
    ON CONFLICT (kpi_id, year, sector) DO UPDATE SET
      value_region = EXCLUDED.value_region;
  END IF;

  -- Insert KPI data for "Beschikbaar planaanbod"
  IF kpi_planaanbod_id IS NOT NULL THEN
    INSERT INTO kpi_data (kpi_id, year, value_region) VALUES
    (kpi_planaanbod_id, 2020, 180),
    (kpi_planaanbod_id, 2021, 165),
    (kpi_planaanbod_id, 2022, 145),
    (kpi_planaanbod_id, 2023, 125),
    (kpi_planaanbod_id, 2024, 110)
    ON CONFLICT (kpi_id, year, sector) DO UPDATE SET
      value_region = EXCLUDED.value_region;
  END IF;

  -- Insert KPI data for "Samenwerking innovatie - regionaal"
  IF kpi_samenwerking_regionaal_id IS NOT NULL THEN
    INSERT INTO kpi_data (kpi_id, year, value_region, value_national) VALUES
    (kpi_samenwerking_regionaal_id, 2018, 45, 40),
    (kpi_samenwerking_regionaal_id, 2023, 55, 48)
    ON CONFLICT (kpi_id, year, sector) DO UPDATE SET
      value_region = EXCLUDED.value_region,
      value_national = EXCLUDED.value_national;
  END IF;

  -- Insert KPI data for "Samenwerking met kennisinstellingen"
  IF kpi_samenwerking_kennis_id IS NOT NULL THEN
    INSERT INTO kpi_data (kpi_id, year, value_region, value_national) VALUES
    (kpi_samenwerking_kennis_id, 2018, 22, 18),
    (kpi_samenwerking_kennis_id, 2023, 32, 25)
    ON CONFLICT (kpi_id, year, sector) DO UPDATE SET
      value_region = EXCLUDED.value_region,
      value_national = EXCLUDED.value_national;
  END IF;

END $$;
