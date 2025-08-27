# 📋 LISTA COMPLETA DE IMAGENS PARA O SUPABASE STORAGE

## 🗂️ **ESTRUTURA DE PASTAS E ARQUIVOS NO BUCKET `product-images`**

### **📁 Pasta `banners/`**
```
banners/banner_material_escolar.jpg
banners/banner_papelaria_fofa.png
```

### **📁 Pasta `logo/`**
```
logo/logo.png
```

### **📁 Pasta `products/` (Imagens dos Produtos)**
```
products/caderno-happy-colorido.jpg
products/kit-morango-milk.jpg
products/canetas-cis-pastel.webp
products/kit-papelaria-kawaii.jpg
products/apontadores-pastel.jpg
```

---

## 🔗 **URLs FINAIS QUE SERÃO GERADAS NO SUPABASE**

### **Banners:**
- `https://qvdysthcnzqudlfongep.supabase.co/storage/v1/object/public/product-images/banners/banner_material_escolar.jpg`
- `https://qvdysthcnzqudlfongep.supabase.co/storage/v1/object/public/product-images/banners/banner_papelaria_fofa.png`

### **Logo:**
- `https://qvdysthcnzqudlfongep.supabase.co/storage/v1/object/public/product-images/logo/logo.png`

### **Produtos:**
- `https://qvdysthcnzqudlfongep.supabase.co/storage/v1/object/public/product-images/products/caderno-happy-colorido.jpg`
- `https://qvdysthcnzqudlfongep.supabase.co/storage/v1/object/public/product-images/products/kit-morango-milk.jpg`
- `https://qvdysthcnzqudlfongep.supabase.co/storage/v1/object/public/product-images/products/canetas-cis-pastel.webp`
- `https://qvdysthcnzqudlfongep.supabase.co/storage/v1/object/public/product-images/products/kit-papelaria-kawaii.jpg`
- `https://qvdysthcnzqudlfongep.supabase.co/storage/v1/object/public/product-images/products/apontadores-pastel.jpg`

---

## 📝 **MAPEAMENTO: ARQUIVO LOCAL → NOME NO SUPABASE**

### **Banners:**
- `/home/ubuntu/marketplace-papelaria/images/banners/banner_material_escolar.jpg` → `banners/banner_material_escolar.jpg`
- `/home/ubuntu/marketplace-papelaria/images/banners/banner_papelaria_fofa.png` → `banners/banner_papelaria_fofa.png`

### **Logo:**
- `/home/ubuntu/marketplace-papelaria/images/logo.png` → `logo/logo.png`

### **Produtos:**
- `/home/ubuntu/marketplace-papelaria/images/products/caderno_happy.jpg` → `products/caderno-happy-colorido.jpg`
- `/home/ubuntu/marketplace-papelaria/images/products/kit_morango.jpg` → `products/kit-morango-milk.jpg`
- `/home/ubuntu/marketplace-papelaria/images/products/canetas_cis.webp` → `products/canetas-cis-pastel.webp`
- `/home/ubuntu/marketplace-papelaria/images/products/kit_papelaria.jpg` → `products/kit-papelaria-kawaii.jpg`
- `/home/ubuntu/marketplace-papelaria/images/products/apontadores_faber.jpg` → `products/apontadores-pastel.jpg`

---

## ⚠️ **ATENÇÃO: NOMES EXATOS OBRIGATÓRIOS**

**Os nomes dos arquivos no Supabase DEVEM ser exatamente como listado acima, incluindo:**
- ✅ Hífens (-) em vez de underscores (_)
- ✅ Extensões corretas (.jpg, .png, .webp)
- ✅ Estrutura de pastas correta (banners/, logo/, products/)

**Se os nomes não estiverem exatos, as imagens NÃO aparecerão no site!**

---

## 🚀 **PASSO A PASSO PARA UPLOAD MANUAL**

### **1. Acesse o Supabase Storage**
- Vá para: https://qvdysthcnzqudlfongep.supabase.co
- Storage → bucket `product-images`

### **2. Crie as Pastas**
- Crie pasta `banners`
- Crie pasta `logo`  
- Crie pasta `products`

### **3. Faça Upload dos Arquivos**
- Entre em cada pasta
- Faça upload dos arquivos com os nomes EXATOS da lista acima
- **IMPORTANTE:** Renomeie os arquivos se necessário para corresponder aos nomes listados

### **4. Verificação**
Teste uma URL como:
`https://qvdysthcnzqudlfongep.supabase.co/storage/v1/object/public/product-images/logo/logo.png`

Se a imagem aparecer, o upload foi bem-sucedido!

---

## ✅ **APÓS O UPLOAD**

Quando terminar o upload manual com os nomes corretos, me avise e eu atualizarei o código Next.js. As imagens aparecerão automaticamente no site!

