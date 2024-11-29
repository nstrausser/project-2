-- Run as superuser
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Set JWT secret
ALTER DATABASE postgres SET "app.jwt_secret" TO 'fMNev2JZhjppn_gveOdIJVfiFzfcbaPYPaFUs9lO_vE';

-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.installation_rolls CASCADE;
DROP TABLE IF EXISTS public.installations CASCADE;
DROP TABLE IF EXISTS public.appointments CASCADE;
DROP TABLE IF EXISTS public.ppf_rolls CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- Create tables
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    role TEXT NOT NULL DEFAULT 'Installer' CHECK (role IN ('Lead', 'Installer', 'Training')),
    joined_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.ppf_rolls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku TEXT NOT NULL,
    roll_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    length_feet NUMERIC NOT NULL,
    width_inches NUMERIC NOT NULL,
    price NUMERIC NOT NULL,
    category TEXT NOT NULL,
    manufacturer TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.installations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    vehicle_type TEXT NOT NULL,
    film_used NUMERIC NOT NULL,
    time_spent INTEGER NOT NULL,
    customer_satisfaction INTEGER CHECK (customer_satisfaction BETWEEN 1 AND 5),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.installation_rolls (
    installation_id UUID REFERENCES public.installations(id) ON DELETE CASCADE,
    roll_id UUID REFERENCES public.ppf_rolls(id) ON DELETE CASCADE,
    square_feet_used NUMERIC NOT NULL,
    PRIMARY KEY (installation_id, roll_id)
);

CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    vehicle_info TEXT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    estimated_duration INTEGER NOT NULL,
    installer_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled')),
    service_type TEXT NOT NULL CHECK (service_type IN ('Full Body', 'Partial Body', 'Custom', 'Touch Up')),
    estimated_square_feet NUMERIC NOT NULL,
    quoted_price NUMERIC NOT NULL,
    deposit NUMERIC,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_ppf_rolls_sku ON public.ppf_rolls(sku);
CREATE INDEX IF NOT EXISTS idx_ppf_rolls_roll_id ON public.ppf_rolls(roll_id);
CREATE INDEX IF NOT EXISTS idx_installations_user_id ON public.installations(user_id);
CREATE INDEX IF NOT EXISTS idx_installations_date ON public.installations(date);
CREATE INDEX IF NOT EXISTS idx_appointments_installer_id ON public.appointments(installer_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_ppf_rolls_updated_at ON ppf_rolls;
CREATE TRIGGER update_ppf_rolls_updated_at
    BEFORE UPDATE ON ppf_rolls
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_installations_updated_at ON installations;
CREATE TRIGGER update_installations_updated_at
    BEFORE UPDATE ON installations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_appointments_updated_at ON appointments;
CREATE TRIGGER update_appointments_updated_at
    BEFORE UPDATE ON appointments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ppf_rolls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.installations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.installation_rolls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view all users" ON public.users;
CREATE POLICY "Users can view all users"
    ON public.users FOR SELECT
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Users can insert users" ON public.users;
CREATE POLICY "Users can insert users"
    ON public.users FOR INSERT
    TO authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Users can update users" ON public.users;
CREATE POLICY "Users can update users"
    ON public.users FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Users can delete users" ON public.users;
CREATE POLICY "Users can delete users"
    ON public.users FOR DELETE
    TO authenticated
    USING (true);

-- PPF Rolls policies
DROP POLICY IF EXISTS "Authenticated users can view all PPF rolls" ON public.ppf_rolls;
CREATE POLICY "Authenticated users can view all PPF rolls"
    ON public.ppf_rolls FOR SELECT
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert PPF rolls" ON public.ppf_rolls;
CREATE POLICY "Authenticated users can insert PPF rolls"
    ON public.ppf_rolls FOR INSERT
    TO authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update PPF rolls" ON public.ppf_rolls;
CREATE POLICY "Authenticated users can update PPF rolls"
    ON public.ppf_rolls FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can delete PPF rolls" ON public.ppf_rolls;
CREATE POLICY "Authenticated users can delete PPF rolls"
    ON public.ppf_rolls FOR DELETE
    TO authenticated
    USING (true);

-- Similar policies for other tables
-- Installations
DROP POLICY IF EXISTS "Authenticated users can manage installations" ON public.installations;
CREATE POLICY "Authenticated users can manage installations"
    ON public.installations FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Installation Rolls
DROP POLICY IF EXISTS "Authenticated users can manage installation_rolls" ON public.installation_rolls;
CREATE POLICY "Authenticated users can manage installation_rolls"
    ON public.installation_rolls FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Appointments
DROP POLICY IF EXISTS "Authenticated users can manage appointments" ON public.appointments;
CREATE POLICY "Authenticated users can manage appointments"
    ON public.appointments FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Grant permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, authenticated;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO postgres, authenticated;

-- Insert sample data
INSERT INTO public.users (email, first_name, last_name, role) VALUES
    ('matt@example.com', 'Matt', 'Anderson', 'Lead'),
    ('shawn@example.com', 'Shawn', 'Williams', 'Installer'),
    ('brandon@example.com', 'Brandon', 'Davis', 'Installer'),
    ('kevin@example.com', 'Kevin', 'Thompson', 'Training');

-- Sample PPF rolls
INSERT INTO public.ppf_rolls (sku, roll_id, name, length_feet, width_inches, price, category, manufacturer) VALUES
    ('XPL-CL-60', 'R123456', 'XPEL Ultimate Plus', 100, 60, 899.99, 'Clear Protection Film', 'XPEL'),
    ('3M-PS-48', 'R789012', '3M Pro Series', 75, 48, 749.99, 'Clear Protection Film', '3M'),
    ('SNT-PR-60', 'R345678', 'SunTek Premium', 100, 60, 879.99, 'Clear Protection Film', 'SunTek');</content>