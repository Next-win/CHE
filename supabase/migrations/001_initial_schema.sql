-- Create strategic_lines table
CREATE TABLE IF NOT EXISTS strategic_lines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(10) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subthemes table
CREATE TABLE IF NOT EXISTS subthemes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  strategic_line_id UUID NOT NULL REFERENCES strategic_lines(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create kpis table
CREATE TABLE IF NOT EXISTS kpis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subtheme_id UUID NOT NULL REFERENCES subthemes(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  what_it_measures TEXT,
  source VARCHAR(255),
  measurement_frequency VARCHAR(100),
  unit VARCHAR(50),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create kpi_data table
CREATE TABLE IF NOT EXISTS kpi_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kpi_id UUID NOT NULL REFERENCES kpis(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  value_region DECIMAL,
  value_national DECIMAL,
  sector VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(kpi_id, year, sector)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_subthemes_strategic_line ON subthemes(strategic_line_id);
CREATE INDEX IF NOT EXISTS idx_kpis_subtheme ON kpis(subtheme_id);
CREATE INDEX IF NOT EXISTS idx_kpi_data_kpi ON kpi_data(kpi_id);
CREATE INDEX IF NOT EXISTS idx_kpi_data_year ON kpi_data(year);
CREATE INDEX IF NOT EXISTS idx_strategic_lines_slug ON strategic_lines(slug);

-- Enable Row Level Security
ALTER TABLE strategic_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE subthemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpis ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpi_data ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on strategic_lines" ON strategic_lines
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on subthemes" ON subthemes
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on kpis" ON kpis
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on kpi_data" ON kpi_data
  FOR SELECT USING (true);

-- Create policies for authenticated write access
CREATE POLICY "Allow authenticated insert on strategic_lines" ON strategic_lines
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on strategic_lines" ON strategic_lines
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on strategic_lines" ON strategic_lines
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert on subthemes" ON subthemes
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on subthemes" ON subthemes
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on subthemes" ON subthemes
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert on kpis" ON kpis
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on kpis" ON kpis
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on kpis" ON kpis
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert on kpi_data" ON kpi_data
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on kpi_data" ON kpi_data
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on kpi_data" ON kpi_data
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables
CREATE TRIGGER update_strategic_lines_updated_at
  BEFORE UPDATE ON strategic_lines
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subthemes_updated_at
  BEFORE UPDATE ON subthemes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_kpis_updated_at
  BEFORE UPDATE ON kpis
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_kpi_data_updated_at
  BEFORE UPDATE ON kpi_data
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
