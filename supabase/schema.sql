-- Create schema for Green Aisle application

-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    user_type TEXT NOT NULL CHECK (user_type IN ('couple', 'vendor')),
    phone TEXT,
    location TEXT
);

-- Create weddings table
CREATE TABLE public.weddings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    couple_id UUID REFERENCES auth.users(id) NOT NULL,
    date TIMESTAMP WITH TIME ZONE,
    venue_id UUID REFERENCES public.venues(id),
    guest_count INTEGER,
    budget NUMERIC,
    status TEXT NOT NULL CHECK (status IN ('planning', 'confirmed', 'completed')) DEFAULT 'planning',
    is_exploring_venues BOOLEAN DEFAULT FALSE,
    general_location TEXT
);

-- Create venues table
CREATE TABLE public.venues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip TEXT NOT NULL,
    country TEXT NOT NULL,
    latitude NUMERIC,
    longitude NUMERIC,
    capacity INTEGER,
    description TEXT,
    amenities JSONB,
    is_tented BOOLEAN DEFAULT FALSE,
    price_range TEXT CHECK (price_range IN ('low', 'medium', 'high'))
);

-- Create tented_venue_bookings table
CREATE TABLE public.tented_venue_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    venue_id UUID REFERENCES public.venues(id) NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    couple_id UUID REFERENCES auth.users(id) NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'cancelled')) DEFAULT 'pending',
    is_sharing_enabled BOOLEAN DEFAULT TRUE,
    tent_package_id UUID REFERENCES public.tent_packages(id)
);

-- Create tent_packages table
CREATE TABLE public.tent_packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    size TEXT NOT NULL,
    capacity INTEGER NOT NULL,
    price NUMERIC NOT NULL,
    features JSONB NOT NULL,
    venue_id UUID REFERENCES public.venues(id) NOT NULL
);

-- Create vendors table
CREATE TABLE public.vendors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    business_name TEXT NOT NULL,
    business_type TEXT NOT NULL,
    description TEXT,
    service_area TEXT,
    website TEXT,
    phone TEXT,
    email TEXT,
    rating NUMERIC,
    review_count INTEGER,
    subscription_tier TEXT NOT NULL CHECK (subscription_tier IN ('free', 'standard', 'unlimited')) DEFAULT 'free'
);

-- Create vendor_bookings table
CREATE TABLE public.vendor_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    vendor_id UUID REFERENCES public.vendors(id) NOT NULL,
    wedding_id UUID REFERENCES public.weddings(id),
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    time_slot TEXT NOT NULL CHECK (time_slot IN ('morning', 'afternoon', 'evening', 'full_day', 'multi_day')),
    status TEXT NOT NULL CHECK (status IN ('available', 'pending', 'confirmed', 'cancelled')) DEFAULT 'available',
    notes TEXT
);

-- Create floral_arrangements table
CREATE TABLE public.floral_arrangements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    owner_type TEXT NOT NULL CHECK (owner_type IN ('florist', 'couple', 'shared')),
    owner_id UUID REFERENCES auth.users(id) NOT NULL,
    location TEXT NOT NULL,
    date_available TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('available', 'pending', 'sold')) DEFAULT 'available',
    images JSONB,
    tags TEXT[]
);

-- Create mood_boards table
CREATE TABLE public.mood_boards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title TEXT NOT NULL,
    description TEXT,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    wedding_id UUID REFERENCES public.weddings(id),
    tags TEXT[],
    cover_image TEXT
);

-- Create mood_board_items table
CREATE TABLE public.mood_board_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    mood_board_id UUID REFERENCES public.mood_boards(id) NOT NULL,
    image_url TEXT NOT NULL,
    title TEXT,
    description TEXT,
    tags TEXT[],
    source_url TEXT,
    is_sharable BOOLEAN DEFAULT FALSE,
    location TEXT,
    date TIMESTAMP WITH TIME ZONE
);

-- Create shared_resources table
CREATE TABLE public.shared_resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resource_type TEXT NOT NULL CHECK (resource_type IN ('floral', 'decor', 'tent', 'other')),
    resource_id UUID NOT NULL,
    owner_id UUID REFERENCES auth.users(id) NOT NULL,
    shared_with_id UUID REFERENCES auth.users(id),
    status TEXT NOT NULL CHECK (status IN ('offered', 'requested', 'accepted', 'declined', 'completed')) DEFAULT 'offered',
    price NUMERIC,
    notes TEXT
);

-- Create transactions table
CREATE TABLE public.transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    buyer_id UUID REFERENCES auth.users(id) NOT NULL,
    seller_id UUID REFERENCES auth.users(id) NOT NULL,
    resource_type TEXT NOT NULL CHECK (resource_type IN ('floral', 'decor', 'tent', 'other')),
    resource_id UUID NOT NULL,
    amount NUMERIC NOT NULL,
    platform_fee NUMERIC NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'refunded', 'cancelled')) DEFAULT 'pending',
    payment_method TEXT,
    delivery_method TEXT NOT NULL CHECK (delivery_method IN ('pickup', 'delivery')),
    delivery_notes TEXT
);

-- Create notifications table
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('message', 'resource_share', 'transaction', 'system')),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    related_id UUID
);

-- Create nearby_venues function
CREATE OR REPLACE FUNCTION nearby_venues(lat NUMERIC, lng NUMERIC, radius_miles NUMERIC)
RETURNS TABLE (
    id UUID,
    name TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    distance_miles NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        v.id,
        v.name,
        v.address,
        v.city,
        v.state,
        (
            3959 * acos(
                cos(radians(lat)) * 
                cos(radians(v.latitude)) * 
                cos(radians(v.longitude) - radians(lng)) + 
                sin(radians(lat)) * 
                sin(radians(v.latitude))
            )
        ) AS distance_miles
    FROM venues v
    WHERE v.latitude IS NOT NULL AND v.longitude IS NOT NULL
    HAVING (
        3959 * acos(
            cos(radians(lat)) * 
            cos(radians(v.latitude)) * 
            cos(radians(v.longitude) - radians(lng)) + 
            sin(radians(lat)) * 
            sin(radians(v.latitude))
        )
    ) <= radius_miles
    ORDER BY distance_miles;
END;
$$ LANGUAGE plpgsql;

-- Create nearby_weddings function
CREATE OR REPLACE FUNCTION nearby_weddings(venue_id UUID, date TIMESTAMP WITH TIME ZONE, days_range INTEGER)
RETURNS TABLE (
    id UUID,
    couple_id UUID,
    date TIMESTAMP WITH TIME ZONE,
    venue_id UUID,
    venue_name TEXT,
    distance_days INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        w.id,
        w.couple_id,
        w.date,
        w.venue_id,
        v.name AS venue_name,
        ABS(EXTRACT(DAY FROM (w.date - date))) AS distance_days
    FROM weddings w
    JOIN venues v ON w.venue_id = v.id
    WHERE 
        (w.venue_id = venue_id OR 
         v.id IN (SELECT id FROM nearby_venues(
             (SELECT latitude FROM venues WHERE id = venue_id),
             (SELECT longitude FROM venues WHERE id = venue_id),
             5
         )))
        AND w.date IS NOT NULL
        AND ABS(EXTRACT(DAY FROM (w.date - date))) <= days_range
    ORDER BY distance_days;
END;
$$ LANGUAGE plpgsql;

-- Row Level Security Policies

-- Profiles: Users can read all profiles but only update their own
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Weddings: Couples can manage their own weddings, vendors can view weddings they're booked for
ALTER TABLE public.weddings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Couples can view their own weddings"
    ON public.weddings FOR SELECT
    USING (auth.uid() = couple_id);

CREATE POLICY "Vendors can view weddings they're booked for"
    ON public.weddings FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM vendor_bookings vb
            JOIN vendors v ON vb.vendor_id = v.id
            WHERE vb.wedding_id = weddings.id
            AND v.user_id = auth.uid()
        )
    );

CREATE POLICY "Couples can insert their own weddings"
    ON public.weddings FOR INSERT
    WITH CHECK (auth.uid() = couple_id);

CREATE POLICY "Couples can update their own weddings"
    ON public.weddings FOR UPDATE
    USING (auth.uid() = couple_id);

-- Venues: Public read access, admin write access
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Venues are viewable by everyone"
    ON public.venues FOR SELECT
    USING (true);

-- Tented Venue Bookings: Couples can manage their own bookings
ALTER TABLE public.tented_venue_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Couples can view their own bookings"
    ON public.tented_venue_bookings FOR SELECT
    USING (auth.uid() = couple_id);

CREATE POLICY "Couples can insert their own bookings"
    ON public.tented_venue_bookings FOR INSERT
    WITH CHECK (auth.uid() = couple_id);

CREATE POLICY "Couples can update their own bookings"
    ON public.tented_venue_bookings FOR UPDATE
    USING (auth.uid() = couple_id);

-- Tent Packages: Public read access
ALTER TABLE public.tent_packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tent packages are viewable by everyone"
    ON public.tent_packages FOR SELECT
    USING (true);

-- Vendors: Vendors can manage their own profiles, public read access
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vendors are viewable by everyone"
    ON public.vendors FOR SELECT
    USING (true);

CREATE POLICY "Vendors can update their own profile"
    ON public.vendors FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Vendors can insert their own profile"
    ON public.vendors FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Vendor Bookings: Vendors can manage their own bookings, couples can view bookings for their wedding
ALTER TABLE public.vendor_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vendors can view their own bookings"
    ON public.vendor_bookings FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM vendors v
            WHERE vendor_bookings.vendor_id = v.id
            AND v.user_id = auth.uid()
        )
    );

CREATE POLICY "Couples can view bookings for their wedding"
    ON public.vendor_bookings FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM weddings w
            WHERE vendor_bookings.wedding_id = w.id
            AND w.couple_id = auth.uid()
        )
    );

CREATE POLICY "Vendors can insert their own bookings"
    ON public.vendor_bookings FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM vendors v
            WHERE vendor_bookings.vendor_id = v.id
            AND v.user_id = auth.uid()
        )
    );

CREATE POLICY "Vendors can update their own bookings"
    ON public.vendor_bookings FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM vendors v
            WHERE vendor_bookings.vendor_id = v.id
            AND v.user_id = auth.uid()
        )
    );

-- Floral Arrangements: Public read access, owners can manage their own
ALTER TABLE public.floral_arrangements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Floral arrangements are viewable by everyone"
    ON public.floral_arrangements FOR SELECT
    USING (true);

CREATE POLICY "Owners can update their own floral arrangements"
    ON public.floral_arrangements FOR UPDATE
    USING (auth.uid() = owner_id);

CREATE POLICY "Owners can insert their own floral arrangements"
    ON public.floral_arrangements FOR INSERT
    WITH CHECK (auth.uid() = owner_id);

-- Mood Boards: Owners can manage their own, public boards are viewable by everyone
ALTER TABLE public.mood_boards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public mood boards are viewable by everyone"
    ON public.mood_boards FOR SELECT
    USING (is_public OR auth.uid() = user_id);

CREATE POLICY "Owners can update their own mood boards"
    ON public.mood_boards FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Owners can insert their own mood boards"
    ON public.mood_boards FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Mood Board Items: Owners can manage their own, public board items are viewable by everyone
ALTER TABLE public.mood_board_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public mood board items are viewable by everyone"
    ON public.mood_board_items FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM mood_boards mb
            WHERE mood_board_items.mood_board_id = mb.id
            AND (mb.is_public OR mb.user_id = auth.uid())
        )
    );

CREATE POLICY "Owners can update their own mood board items"
    ON public.mood_board_items FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM mood_boards mb
            WHERE mood_board_items.mood_board_id = mb.id
            AND mb.user_id = auth.uid()
        )
    );

CREATE POLICY "Owners can insert their own mood board items"
    ON public.mood_board_items FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM mood_boards mb
            WHERE mood_board_items.mood_board_id = mb.id
            AND mb.user_id = auth.uid()
        )
    );

-- Shared Resources: Participants can view and manage their own
ALTER TABLE public.shared_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Participants can view their own shared resources"
    ON public.shared_resources FOR SELECT
    USING (auth.uid() = owner_id OR auth.uid() = shared_with_id);

CREATE POLICY "Owners can insert their own shared resources"
    ON public.shared_resources FOR INSERT
    WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Participants can update their own shared resources"
    ON public.shared_resources FOR UPDATE
    USING (auth.uid() = owner_id OR auth.uid() = shared_with_id);

-- Transactions: Participants can view and manage their own
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Participants can view their own transactions"
    ON public.transactions FOR SELECT
    USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

CREATE POLICY "Buyers can insert their own transactions"
    ON public.transactions FOR INSERT
    WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Participants can update their own transactions"
    ON public.transactions FOR UPDATE
    USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

-- Notifications: Users can view and manage their own
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications"
    ON public.notifications FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
    ON public.notifications FOR UPDATE
    USING (auth.uid() = user_id);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger to all tables
CREATE TRIGGER update_profiles_modtime
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_weddings_modtime
    BEFORE UPDATE ON weddings
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_venues_modtime
    BEFORE UPDATE ON venues
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_tented_venue_bookings_modtime
    BEFORE UPDATE ON tented_venue_bookings
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_tent_packages_modtime
    BEFORE UPDATE ON tent_packages
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_vendors_modtime
    BEFORE UPDATE ON vendors
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_vendor_bookings_modtime
    BEFORE UPDATE ON vendor_bookings
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_floral_arrangements_modtime
    BEFORE UPDATE ON floral_arrangements
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_mood_boards_modtime
    BEFORE UPDATE ON mood_boards
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_mood_board_items_modtime
    BEFORE UPDATE ON mood_board_items
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_shared_resources_modtime
    BEFORE UPDATE ON shared_resources
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_transactions_modtime
    BEFORE UPDATE ON transactions
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_notifications_modtime
    BEFORE UPDATE ON notifications
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();
