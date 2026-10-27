-- ==============================================================================
-- Sinfimiz To'purarlari - Supabase Database Schema, Realtime & RLS Policies
-- Ushbu SQL kodini Supabase Dashboard -> SQL Editor bo'limiga nusxalab "Run" tugmasini bosing
-- ==============================================================================

-- 1. Futbolchilar jadvali (players)
CREATE TABLE IF NOT EXISTS public.players (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  jersey_number INTEGER NOT NULL DEFAULT 10,
  position TEXT NOT NULL DEFAULT 'Hujumchi',
  class_name TEXT NOT NULL DEFAULT '8-D sinf',
  goals INTEGER NOT NULL DEFAULT 0,
  assists INTEGER NOT NULL DEFAULT 0,
  matches INTEGER NOT NULL DEFAULT 0,
  season TEXT DEFAULT 'Bahor Kubogi 2025',
  photo_url TEXT DEFAULT '/players/sanoqulov-oltinbek.jpg',
  bio TEXT DEFAULT '',
  foot TEXT DEFAULT 'O‘ng',
  height TEXT DEFAULT '175 sm',
  mvp_count INTEGER DEFAULT 0,
  yellow_cards INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Jamoa ma'lumotlari jadvali (team_info)
CREATE TABLE IF NOT EXISTS public.team_info (
  id TEXT PRIMARY KEY DEFAULT 'main_team',
  name TEXT NOT NULL DEFAULT '8-D Sinf',
  grade TEXT DEFAULT '8-D Sinf',
  school TEXT DEFAULT 'Ixtisoslashtirilgan Maktab-Internati',
  motto TEXT DEFAULT 'Futbol faqat o‘yin emas, bu hayot tarzi!',
  founded_year INTEGER DEFAULT 2024,
  stadium TEXT DEFAULT 'Maktab Asosiy Maydoni (8-Arena)',
  logo_url TEXT DEFAULT '/logo.jpg',
  team_photo_url TEXT DEFAULT '/team-banner.jpg',
  description TEXT DEFAULT 'Bizning 8-D sinf futbol jamoamiz maktab birinchiligida faol ishtirok etmoqda. Jamoamiz intizom, jipslik va halol o‘yin qoidalariga asoslanadi.',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Barcha 9 nafar rasmiy futbolchini dastlabki yuklash (Seed Data)
INSERT INTO public.players (id, name, jersey_number, position, class_name, goals, assists, matches, season, photo_url, bio, foot, height, mvp_count)
VALUES
  ('p2', 'Sanoqulov Oltinbek', 7, 'Hujumchi', '8-D sinf', 0, 0, 0, 'Bahor Kubogi 2025', '/players/sanoqulov-oltinbek.jpg', 'Jamoaning asosiy hujumchisi, to‘purari va assistenti. Tezkor va chaqqon harakat qiladigan yetakchi to‘purar.', 'O‘ng', '178 sm', 0),
  ('p1', 'Eshmamatov Ibrohim', 4, 'Himoyachi', '8-D sinf', 0, 0, 0, 'Bahor Kubogi 2025', '/players/eshmamatov-ibrohim.jpg', 'Jamoaning ishonchli markaziy himoyachisi. Raqib hujumlarini qaytarish va to‘pni olib qo‘yishda faol.', 'O‘ng', '176 sm', 0),
  ('p3', 'Xusanov Ozodbek', 45, 'Himoyachi', '8-D sinf', 0, 0, 0, 'Bahor Kubogi 2025', '/players/xusanov-ozodbek.jpg', 'Qanot himoyachisi. Tartibli va intizomli himoyalanish uslubiga ega.', 'O‘ng', '177 sm', 0),
  ('p4', 'Qahramonov Samariddin', 8, 'Yarim himoyachi', '8-D sinf', 0, 0, 0, 'Bahor Kubogi 2025', '/players/qahramonov-samariddin.jpg', 'Maydon markazidagi dirijyor va yarim himoyachi. Aniq uzatmalar ustasi.', 'O‘ng', '175 sm', 0),
  ('p5', 'Abdumannonov Ibrohim', 1, 'Darvozabon', '8-D sinf', 0, 0, 0, 'Bahor Kubogi 2025', '/players/abdumannonov-ibrohim.jpg', 'Jamoaning asosiy posboni. Penaltilarni qaytarish va darvoza daxlsizligini saqlash bo‘yicha ishonchli.', 'O‘ng', '180 sm', 0),
  ('p6', 'Salaydinov Miraziz', 9, 'Hujumchi', '8-D sinf', 0, 0, 0, 'Bahor Kubogi 2025', '/players/salaydinov-miraziz.jpg', 'Tezkor va texnikali hujumchi. Raqib jarima maydonchasida xavfli vaziyatlar yaratishga usta.', 'O‘ng', '174 sm', 0),
  ('p7', 'Xayrullayev Javohir', 2, 'Himoyachi', '8-D sinf', 0, 0, 0, 'Bahor Kubogi 2025', '/players/xayrullayev-javohir.jpg', 'Ishonchli va matonatli himoyachi. Jismoniy kurashlarda mustahkam hamda to‘pni olib qo‘yishda faol.', 'O‘ng', '178 sm', 0),
  ('p8', 'Xolyorov Ibrohim', 11, 'Hujumchi', '8-D sinf', 0, 0, 0, 'Bahor Kubogi 2025', '/players/xolyorov-ibrohim.jpg', 'Iqtidorli va g‘ayratli hujumchi. Qulay vaziyatlardan to‘p kiritish va hujumlarni gol bilan yakunlashga intiladi.', 'O‘ng', '175 sm', 0),
  ('p9', 'Misirov Umidjon', 3, 'Himoyachi', '8-D sinf', 0, 0, 0, 'Bahor Kubogi 2025', '/players/misirov-umidjon.jpg', 'Ishonchli va tartibli himoyachi. Mudofaa chizig‘ida to‘pni olib qo‘yish va jamoaviy intizomda faol.', 'O‘ng', '176 sm', 0)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  jersey_number = EXCLUDED.jersey_number,
  position = EXCLUDED.position,
  photo_url = EXCLUDED.photo_url;

-- 4. Jamoa ma'lumotlarini dastlabki yuklash
INSERT INTO public.team_info (id, name, grade, school, motto, founded_year, stadium, logo_url, team_photo_url, description)
VALUES
  ('main_team', '8-D Sinf', '8-D Sinf', 'Ixtisoslashtirilgan Maktab-Internati', 'Futbol faqat o‘yin emas, bu hayot tarzi!', 2024, 'Maktab Asosiy Maydoni (8-Arena)', '/logo.jpg', '/team-banner.jpg', 'Bizning 8-D sinf futbol jamoamiz maktab birinchiligida faol ishtirok etmoqda.')
ON CONFLICT (id) DO NOTHING;

-- 5. Row Level Security (RLS) xavfsizlik siyosatlari
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_info ENABLE ROW LEVEL SECURITY;

-- Barcha tashrif buyuruvchilar ma'lumotlarni o'qiy oladi (Public Read)
DROP POLICY IF EXISTS "Public players read" ON public.players;
CREATE POLICY "Public players read"
  ON public.players FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Public team_info read" ON public.team_info;
CREATE POLICY "Public team_info read"
  ON public.team_info FOR SELECT
  USING (true);

-- Admin amallari: O'zgartirish va qo'shish ruxsati
DROP POLICY IF EXISTS "Allow players modification" ON public.players;
CREATE POLICY "Allow players modification"
  ON public.players FOR ALL
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow team_info modification" ON public.team_info;
CREATE POLICY "Allow team_info modification"
  ON public.team_info FOR ALL
  USING (true)
  WITH CHECK (true);

-- 6. Realtime (WebSockets) faollashtirish: Barcha qurilmalarga darhol xabar yuborish
ALTER PUBLICATION supabase_realtime ADD TABLE public.players;
ALTER PUBLICATION supabase_realtime ADD TABLE public.team_info;

-- 7. Xavfsiz RPC funksiyasi: Gollar yoki assistlarni atomar oshirish / kamaytirish
CREATE OR REPLACE FUNCTION public.increment_player_stat(
  p_id TEXT,
  p_field TEXT,
  p_amount INT DEFAULT 1
)
RETURNS SETOF public.players
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF p_field = 'goals' THEN
    UPDATE public.players
    SET goals = GREATEST(0, goals + p_amount), updated_at = now()
    WHERE id = p_id;
  ELSIF p_field = 'assists' THEN
    UPDATE public.players
    SET assists = GREATEST(0, assists + p_amount), updated_at = now()
    WHERE id = p_id;
  ELSIF p_field = 'matches' THEN
    UPDATE public.players
    SET matches = GREATEST(0, matches + p_amount), updated_at = now()
    WHERE id = p_id;
  END IF;

  RETURN QUERY SELECT * FROM public.players WHERE id = p_id;
END;
$$;
