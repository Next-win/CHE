-- Seed strategic lines
INSERT INTO strategic_lines (code, title, slug, description, sort_order) VALUES
('1.1', 'Toonaangevend in een toekomstbestendig voedselsysteem', 'toekomstbestendig-voedselsysteem', 'Regio Foodvalley als toonaangevende regio in de ontwikkeling van een toekomstbestendig voedselsysteem.', 1),
('1.2', 'Toekomstbestendige agrarische sector', 'agrarische-sector', 'Een veerkrachtige en innovatieve agrarische sector die bijdraagt aan duurzame voedselproductie.', 2),
('1.3', 'Innovatief en toekomstbestendig MKB', 'innovatief-mkb', 'Een innovatief en toekomstbestendig MKB dat bijdraagt aan economische groei en werkgelegenheid in de regio.', 3),
('1.4', 'Beschikbaarheid en duurzame inzetbaarheid van mensen', 'human-capital', 'Voldoende gekwalificeerde mensen die duurzaam inzetbaar zijn op de arbeidsmarkt.', 4),
('2.1', 'Schaalsprong in verstedelijking', 'verstedelijking', 'Een schaalsprong in woningbouw en voorzieningen met behoud van leefkwaliteit.', 5),
('2.2', 'Natuurherstel en robuust watersysteem', 'natuur-water', 'Herstel van natuur en een robuust watersysteem dat bestand is tegen klimaatverandering.', 6),
('2.3', 'Slim benutten beschikbare ruimte', 'ruimtegebruik', 'Optimaal en duurzaam gebruik van de beschikbare ruimte in de regio.', 7),
('2.4', 'Duurzame energievoorziening en oplossingen voor netcongestie', 'energie', 'Een duurzame energievoorziening met oplossingen voor netcongestie.', 8),
('2.5', 'Duurzame bereikbaarheid', 'bereikbaarheid', 'Duurzame en efficiënte bereikbaarheid binnen en buiten de regio.', 9)
ON CONFLICT (code) DO UPDATE SET
  title = EXCLUDED.title,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order;

-- Get the ID for strategic line 1.3 (Innovatief MKB)
DO $$
DECLARE
  innovatief_mkb_id UUID;
  subtheme_structuur_id UUID;
  subtheme_innovatie_id UUID;
  subtheme_transities_id UUID;
  subtheme_ruimte_id UUID;
  subtheme_clusters_id UUID;
BEGIN
  SELECT id INTO innovatief_mkb_id FROM strategic_lines WHERE code = '1.3';

  -- Insert subthemes for 1.3 Innovatief MKB
  INSERT INTO subthemes (strategic_line_id, title, description, sort_order) VALUES
  (innovatief_mkb_id, 'Structuur en ontwikkeling MKB', 'Inzicht in de structuur en ontwikkeling van het MKB in Regio Foodvalley, inclusief werkgelegenheid, bedrijfsvestigingen en sectorale verdeling.', 1),
  (innovatief_mkb_id, 'Innovatiekracht MKB', 'De innovatieve capaciteit van het MKB, gemeten aan de hand van type innovaties, succesfactoren en knelpunten in het innovatieproces.', 2),
  (innovatief_mkb_id, 'Transities economie van de toekomst', 'De voortgang van bedrijven op het gebied van digitalisering, circulariteit en verduurzaming.', 3),
  (innovatief_mkb_id, 'Ruimte en toekomstbestendige bedrijventerreinen', 'Beschikbaarheid en kwaliteit van bedrijventerreinen in de regio.', 4),
  (innovatief_mkb_id, 'Clustervorming en kennis- en innovatie-ecosystemen', 'Samenwerking tussen bedrijven, kennisinstellingen en overheden in innovatie-ecosystemen.', 5)
  ON CONFLICT DO NOTHING;

  -- Get subtheme IDs
  SELECT id INTO subtheme_structuur_id FROM subthemes WHERE strategic_line_id = innovatief_mkb_id AND sort_order = 1;
  SELECT id INTO subtheme_innovatie_id FROM subthemes WHERE strategic_line_id = innovatief_mkb_id AND sort_order = 2;
  SELECT id INTO subtheme_transities_id FROM subthemes WHERE strategic_line_id = innovatief_mkb_id AND sort_order = 3;
  SELECT id INTO subtheme_ruimte_id FROM subthemes WHERE strategic_line_id = innovatief_mkb_id AND sort_order = 4;
  SELECT id INTO subtheme_clusters_id FROM subthemes WHERE strategic_line_id = innovatief_mkb_id AND sort_order = 5;

  -- Insert KPIs for Subthema 1: Structuur en ontwikkeling MKB
  INSERT INTO kpis (subtheme_id, title, description, what_it_measures, source, measurement_frequency, unit, sort_order) VALUES
  (subtheme_structuur_id, 'Aantal banen', 'Totaal aantal banen in Regio Foodvalley', 'Omvang en ontwikkeling van de werkgelegenheid', 'LISA', 'Jaarlijks', 'aantal', 1),
  (subtheme_structuur_id, 'Aantal bedrijfsvestigingen', 'Totaal aantal bedrijfsvestigingen in de regio', 'Omvang en ontwikkeling van het aantal bedrijfsvestigingen', 'LISA', 'Jaarlijks', 'aantal', 2),
  (subtheme_structuur_id, 'Banen per sector', 'Verdeling van banen over verschillende sectoren', 'Verdeling en ontwikkeling van werkgelegenheid over sectoren', 'LISA', 'Jaarlijks', 'aantal', 3),
  (subtheme_structuur_id, 'Bedrijfsvestigingen per sector', 'Verdeling van bedrijfsvestigingen per sector', 'Verdeling en ontwikkeling van bedrijfsvestigingen per sector', 'LISA', 'Jaarlijks', 'aantal', 4),
  (subtheme_structuur_id, 'Banen per grootteklasse', 'Verdeling van werkgelegenheid naar bedrijfsomvang', 'Verdeling van werkgelegenheid naar bedrijfsomvang', 'LISA', 'Jaarlijks', 'aantal', 5),
  (subtheme_structuur_id, 'Toegevoegde waarde per sector', 'Economische bijdrage per sector', 'Economische bijdrage en ontwikkeling van sectoren', 'LISA, bewerking CHE', 'Jaarlijks', 'miljoen euro', 6),
  (subtheme_structuur_id, 'Locatiequotiënt per sector', 'Relatieve sterkte van sectoren t.o.v. Nederland', 'Mate waarin sectoren relatief sterker of zwakker vertegenwoordigd zijn in de regio ten opzichte van Nederland', 'LISA, bewerking CHE', 'Jaarlijks', 'ratio', 7)
  ON CONFLICT DO NOTHING;

  -- Insert KPIs for Subthema 2: Innovatiekracht MKB
  INSERT INTO kpis (subtheme_id, title, description, what_it_measures, source, measurement_frequency, unit, sort_order) VALUES
  (subtheme_innovatie_id, 'Type innovatie bij bedrijven', 'Verdeling van innovatietypen (product, proces, organisatie, markt)', 'Type innovatie waarin bedrijven in Regio Foodvalley actief zijn', 'Innovatiemonitor', 'Om de 4 jaar', 'percentage', 1),
  (subtheme_innovatie_id, 'Innovatieactiviteit naar bedrijfsgrootte', 'Innovatie uitgesplitst naar micro, klein en middelgroot/groot', 'Innovatieactiviteit uitgesplitst naar bedrijfsomvang', 'Innovatiemonitor', 'Om de 4 jaar', 'percentage', 2),
  (subtheme_innovatie_id, 'Succesfactoren innovatieproces', 'Factoren die bijdragen aan succesvol innoveren', 'Succesfactoren die bedrijven ervaren in hun innovatieproces', 'Innovatiemonitor', 'Om de 4 jaar', 'percentage', 3),
  (subtheme_innovatie_id, 'Knelpunten innovatieproces', 'Belemmeringen die bedrijven ervaren bij innovatie', 'Knelpunten die bedrijven ervaren in hun innovatieproces', 'Innovatiemonitor', 'Om de 4 jaar', 'percentage', 4),
  (subtheme_innovatie_id, 'Gebruik overheidssubsidies', 'Mate van gebruik van subsidies en fiscale maatregelen', 'Mate waarin bedrijven gebruik maken van overheidssubsidies en fiscale maatregelen', 'Innovatiemonitor', 'Om de 4 jaar', 'percentage', 5)
  ON CONFLICT DO NOTHING;

  -- Insert KPIs for Subthema 3: Transities economie van de toekomst
  INSERT INTO kpis (subtheme_id, title, description, what_it_measures, source, measurement_frequency, unit, sort_order) VALUES
  (subtheme_transities_id, 'Digitale administratie en informatieprocessen', 'Aandeel bedrijven met gedigitaliseerde processen', 'Mate waarin bedrijven digitale gegevens geautoriseerd vastleggen', 'Innovatiemonitor', 'Om de 4 jaar', 'percentage', 1),
  (subtheme_transities_id, 'Data-analyse en AI toepassing', 'Aandeel bedrijven dat data-analyse of AI toepast', 'Mate waarin bedrijven data analyseren en AI inzetten', 'Innovatiemonitor', 'Om de 4 jaar', 'percentage', 2),
  (subtheme_transities_id, 'Automatisering en robotisering', 'Aandeel bedrijven met automatisering/robotisering', 'Mate waarin routinematige arbeid wordt vervangen door machines', 'Innovatiemonitor', 'Om de 4 jaar', 'percentage', 3),
  (subtheme_transities_id, 'Circulaire productieprocessen', 'Aandeel bedrijven met circulaire processen', 'Mate waarin bedrijven reststoffen hergebruiken', 'Innovatiemonitor', 'Om de 4 jaar', 'percentage', 4),
  (subtheme_transities_id, 'Emissiereductie en klimaatmaatregelen', 'Aandeel bedrijven met klimaatmaatregelen', 'Mate waarin bedrijven uitstoot verminderen', 'Innovatiemonitor', 'Om de 4 jaar', 'percentage', 5),
  (subtheme_transities_id, 'Gebruik hernieuwbare energie', 'Aandeel bedrijven dat hernieuwbare energie gebruikt', 'Mate waarin fossiele brandstoffen vervangen worden door hernieuwbare energie', 'Innovatiemonitor', 'Om de 4 jaar', 'percentage', 6)
  ON CONFLICT DO NOTHING;

  -- Insert KPIs for Subthema 4: Ruimte en toekomstbestendige bedrijventerreinen
  INSERT INTO kpis (subtheme_id, title, description, what_it_measures, source, measurement_frequency, unit, sort_order) VALUES
  (subtheme_ruimte_id, 'Uitgifte bedrijventerrein', 'Jaarlijkse uitgifte van bedrijventerrein in hectare', 'Oppervlakte werklocaties uitgegeven aan gebruikers', 'Monitor Bedrijventerreinen', 'Jaarlijks', 'hectare', 1),
  (subtheme_ruimte_id, 'Beschikbaar planaanbod', 'Beschikbare hectares bedrijventerrein', 'Actueel planaanbod verdeeld naar beschikbaarheid', 'Monitor Bedrijventerreinen', 'Jaarlijks', 'hectare', 2),
  (subtheme_ruimte_id, 'Niet te accommoderen ruimtevraag', 'Ruimtevraag die niet binnen aanbod past', 'Omvang vraag die niet gehuisvest kan worden', 'Monitor Bedrijventerreinen', 'Jaarlijks', 'hectare', 3),
  (subtheme_ruimte_id, 'Toekomstbestendige maatregelen', 'Aandeel terreinen met verduurzaming', 'Aandeel bedrijventerreinen met toekomstbestendigheidsmaatregelen', 'Monitor Bedrijventerreinen', 'Jaarlijks', 'percentage', 4),
  (subtheme_ruimte_id, 'Nieuwe bedrijventerreinen', 'Geplande uitbreiding of ontwikkeling', 'Geplande uitbreiding van werklocaties', 'Monitor Bedrijventerreinen', 'Jaarlijks', 'hectare', 5)
  ON CONFLICT DO NOTHING;

  -- Insert KPIs for Subthema 5: Clustervorming en kennis- en innovatie-ecosystemen
  INSERT INTO kpis (subtheme_id, title, description, what_it_measures, source, measurement_frequency, unit, sort_order) VALUES
  (subtheme_clusters_id, 'Samenwerking innovatie - regionaal', 'Mate van lokale en regionale samenwerking bij innovatie', 'Mate waarin bedrijven lokaal en regionaal samenwerken bij innovatie', 'Innovatiemonitor', 'Om de 4 jaar', 'percentage', 1),
  (subtheme_clusters_id, 'Samenwerking innovatie - internationaal', 'Mate van internationale samenwerking bij innovatie', 'Mate waarin bedrijven internationaal samenwerken bij innovatie', 'Innovatiemonitor', 'Om de 4 jaar', 'percentage', 2),
  (subtheme_clusters_id, 'Samenwerking met kennisinstellingen', 'Mate van samenwerking met kennisinstellingen', 'Mate waarin bedrijven samenwerken met kennisinstellingen bij innovatie', 'Innovatiemonitor', 'Om de 4 jaar', 'percentage', 3),
  (subtheme_clusters_id, 'Samenwerking met onderzoeks- en adviesbureaus', 'Mate van samenwerking met onderzoeksbureaus', 'Mate waarin bedrijven samenwerken met onderzoeks- en adviesbureaus bij innovatie', 'Innovatiemonitor', 'Om de 4 jaar', 'percentage', 4),
  (subtheme_clusters_id, 'Actieve kennis- en innovatieclusters', 'Aanwezigheid van regionale ecosystemen', 'Aanwezigheid en ontwikkeling van regionale ecosystemen', 'Provincie Gelderland', 'Jaarlijks', 'aantal', 5)
  ON CONFLICT DO NOTHING;

END $$;
