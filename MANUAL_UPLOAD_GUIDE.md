# 📋 GUIA PARA UPLOAD MANUAL DAS IMAGENS NO SUPABASE

Como o upload automático está falhando devido às políticas de segurança, você precisará fazer o upload das imagens manualmente no painel do Supabase.

## 🗂️ **ESTRUTURA DE PASTAS NO BUCKET `product-images`**

Crie as seguintes pastas no bucket `product-images`:

### **1. Pasta `banners/`**
Faça upload dos seguintes arquivos:
- `banner_material_escolar.jpg` (de `/home/ubuntu/marketplace-papelaria/images/banners/`)
- `banner_papelaria_fofa.png` (de `/home/ubuntu/marketplace-papelaria/images/banners/`)

### **2. Pasta `logo/`**
Faça upload do seguinte arquivo:
- `logo.png` (de `/home/ubuntu/marketplace-papelaria/images/`)

### **3. Pasta `products/`**
Faça upload dos seguintes arquivos:
- `apontadores_faber.jpg` (de `/home/ubuntu/marketplace-papelaria/images/products/`)
- `caderno_colorido.jpg` (de `/home/ubuntu/marketplace-papelaria/images/products/`)
- `caderno_happy.jpg` (de `/home/ubuntu/marketplace-papelaria/images/products/`)
- `caderno_rosa.jpg` (de `/home/ubuntu/marketplace-papelaria/images/products/`)
- `caderno_verde.png` (de `/home/ubuntu/marketplace-papelaria/images/products/`)
- `canetas_bic.jpg` (de `/home/ubuntu/marketplace-papelaria/images/products/`)
- `canetas_cis.webp` (de `/home/ubuntu/marketplace-papelaria/images/products/`)
- `canetas_mrpen.jpg` (de `/home/ubuntu/marketplace-papelaria/images/products/`)
- `kit_morango.jpg` (de `/home/ubuntu/marketplace-papelaria/images/products/`)
- `kit_papelaria.jpg` (de `/home/ubuntu/marketplace-papelaria/images/products/`)

## 📝 **PASSO A PASSO PARA UPLOAD MANUAL:**

### **1. Acesse o Painel do Supabase**
- Vá para: https://qvdysthcnzqudlfongep.supabase.co
- Faça login na sua conta

### **2. Navegue até o Storage**
- No menu lateral, clique em **"Storage"**
- Clique no bucket **"product-images"**

### **3. Crie as Pastas**
- Clique em **"Create folder"**
- Crie as pastas: `banners`, `logo`, `products`

### **4. Faça Upload dos Arquivos**
- Entre em cada pasta
- Clique em **"Upload file"**
- Selecione os arquivos correspondentes de acordo com a lista acima
- **IMPORTANTE:** Mantenha os nomes dos arquivos exatamente como listado

### **5. Verifique as URLs Públicas**
Após o upload, as URLs das imagens serão:
- `https://qvdysthcnzqudlfongep.supabase.co/storage/v1/object/public/product-images/banners/banner_material_escolar.jpg`
- `https://qvdysthcnzqudlfongep.supabase.co/storage/v1/object/public/product-images/banners/banner_papelaria_fofa.png`
- `https://qvdysthcnzqudlfongep.supabase.co/storage/v1/object/public/product-images/logo/logo.png`
- E assim por diante...

## ✅ **APÓS O UPLOAD MANUAL**

Quando terminar o upload manual, me avise e eu atualizarei o código Next.js para usar essas URLs do Supabase. As imagens aparecerão automaticamente no site!

## 🔍 **VERIFICAÇÃO**

Para verificar se o upload foi bem-sucedido, você pode acessar diretamente uma URL como:
`https://qvdysthcnzqudlfongep.supabase.co/storage/v1/object/public/product-images/logo/logo.png`

Se a imagem aparecer, o upload foi realizado com sucesso!

