-- Criar tabela de produtos
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  old_price DECIMAL(10,2),
  image_url TEXT,
  category VARCHAR(100),
  brand VARCHAR(100),
  code VARCHAR(50) UNIQUE,
  stock INTEGER DEFAULT 0,
  specifications TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);

-- Inserir produtos de exemplo
INSERT INTO products (name, slug, description, price, old_price, image_url, category, brand, code, stock, specifications) VALUES
(
  'Caderno Happy Colorido',
  'caderno-happy-colorido',
  'O Caderno Happy Colorido é perfeito para quem quer deixar os estudos mais divertidos e organizados. Com 80 folhas coloridas de alta qualidade, este caderno oferece uma experiência única de escrita.',
  24.90,
  29.90,
  'https://qvdysthcnzqudlfongep.supabase.co/storage/v1/object/public/product-images/products/caderno-happy-colorido.jpg',
  'Cadernos',
  'Papel Picado',
  'CH001',
  15,
  '80 folhas coloridas em tons pastel, Papel de 75g/m² - ideal para canetas e lápis, Espiral resistente que não enrosca, Capa dura plastificada, Formato: 200mm x 275mm, Pautado com margem'
),
(
  'Kit Morango Milk',
  'kit-morango-milk',
  'O Kit Morango Milk é uma coleção completa para quem ama o estilo kawaii e quer deixar seus materiais escolares super fofos. Este kit traz tudo que você precisa para estudar com muito estilo!',
  89.90,
  NULL,
  'https://qvdysthcnzqudlfongep.supabase.co/storage/v1/object/public/product-images/products/kit-morango-milk.jpg',
  'Kits',
  'Kawaii Collection',
  'KM002',
  8,
  '1 Estojo duplo com zíper, 6 Canetas gel coloridas, 2 Lápis HB com borracha, 1 Régua 15cm temática, 1 Cartela com 50 adesivos, 1 Bloco de notas adesivas, 1 Marca-texto rosa'
),
(
  'Canetas CIS Pastel',
  'canetas-cis-pastel',
  'Set de 6 canetas em cores pastel suaves, perfeitas para anotações, desenhos e organização de estudos. Cores delicadas que combinam com qualquer estilo.',
  32.90,
  NULL,
  'https://qvdysthcnzqudlfongep.supabase.co/storage/v1/object/public/product-images/products/canetas-cis-pastel.webp',
  'Canetas',
  'CIS',
  'CCP003',
  25,
  '6 canetas em cores pastel, Ponta 0.7mm, Tinta gel de alta qualidade, Cores: rosa, azul, lilás, verde, amarelo, coral'
),
(
  'Kit Papelaria Kawaii',
  'kit-papelaria-kawaii',
  'Kit completo com 19 itens fofos e criativos para deixar seus estudos mais divertidos. Perfeito para quem ama o estilo kawaii e quer se organizar com muito charme.',
  149.90,
  179.90,
  'https://qvdysthcnzqudlfongep.supabase.co/storage/v1/object/public/product-images/products/kit-papelaria-kawaii.jpg',
  'Kits',
  'Kawaii World',
  'KPK004',
  12,
  '19 itens inclusos: canetas, lápis, borrachas, réguas, adesivos, bloco de notas, marca-textos, clips decorativos, fita adesiva decorativa'
),
(
  'Apontadores Pastel',
  'apontadores-pastel',
  'Set de 4 apontadores com depósito em cores pastel. Design fofo e funcional, perfeitos para manter seus lápis sempre apontados com estilo.',
  18.90,
  NULL,
  'https://qvdysthcnzqudlfongep.supabase.co/storage/v1/object/public/product-images/products/apontadores-pastel.jpg',
  'Acessórios',
  'Pastel Dreams',
  'AP005',
  30,
  '4 apontadores com depósito, Cores pastel: rosa, azul, lilás, verde, Material resistente, Fácil limpeza'
);

-- Criar bucket para imagens (este comando deve ser executado no painel do Supabase)
--INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Criar política de acesso público para o bucket
--CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');

