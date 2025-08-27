const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuração do Supabase
const supabaseUrl = 'https://qvdysthcnzqudlfongep.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2ZHlzdGhjbnpxdWRsZm9uZ2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMjcwNDcsImV4cCI6MjA3MTcwMzA0N30.6JdLH3EoXXbesIVzP-QkIDZGxykBWOR8LrBUNUhHyAQ';

const supabase = createClient(supabaseUrl, supabaseKey);

// Lista de todas as imagens para upload
const imagesToUpload = [
  // Banners
  {
    localPath: '/home/ubuntu/marketplace-papelaria/images/banners/banner_material_escolar.jpg',
    bucketPath: 'banners/banner_material_escolar.jpg',
    bucket: 'product-images'
  },
  {
    localPath: '/home/ubuntu/marketplace-papelaria/images/banners/banner_papelaria_fofa.png',
    bucketPath: 'banners/banner_papelaria_fofa.png',
    bucket: 'product-images'
  },
  
  // Logo
  {
    localPath: '/home/ubuntu/marketplace-papelaria/images/logo.png',
    bucketPath: 'logo/logo.png',
    bucket: 'product-images'
  },
  
  // Produtos
  {
    localPath: '/home/ubuntu/marketplace-papelaria/images/products/apontadores_faber.jpg',
    bucketPath: 'products/apontadores_faber.jpg',
    bucket: 'product-images'
  },
  {
    localPath: '/home/ubuntu/marketplace-papelaria/images/products/caderno_colorido.jpg',
    bucketPath: 'products/caderno_colorido.jpg',
    bucket: 'product-images'
  },
  {
    localPath: '/home/ubuntu/marketplace-papelaria/images/products/caderno_happy.jpg',
    bucketPath: 'products/caderno_happy.jpg',
    bucket: 'product-images'
  },
  {
    localPath: '/home/ubuntu/marketplace-papelaria/images/products/caderno_rosa.jpg',
    bucketPath: 'products/caderno_rosa.jpg',
    bucket: 'product-images'
  },
  {
    localPath: '/home/ubuntu/marketplace-papelaria/images/products/caderno_verde.png',
    bucketPath: 'products/caderno_verde.png',
    bucket: 'product-images'
  },
  {
    localPath: '/home/ubuntu/marketplace-papelaria/images/products/canetas_bic.jpg',
    bucketPath: 'products/canetas_bic.jpg',
    bucket: 'product-images'
  },
  {
    localPath: '/home/ubuntu/marketplace-papelaria/images/products/canetas_cis.webp',
    bucketPath: 'products/canetas_cis.webp',
    bucket: 'product-images'
  },
  {
    localPath: '/home/ubuntu/marketplace-papelaria/images/products/canetas_mrpen.jpg',
    bucketPath: 'products/canetas_mrpen.jpg',
    bucket: 'product-images'
  },
  {
    localPath: '/home/ubuntu/marketplace-papelaria/images/products/kit_morango.jpg',
    bucketPath: 'products/kit_morango.jpg',
    bucket: 'product-images'
  },
  {
    localPath: '/home/ubuntu/marketplace-papelaria/images/products/kit_papelaria.jpg',
    bucketPath: 'products/kit_papelaria.jpg',
    bucket: 'product-images'
  }
];

async function uploadImage(imageInfo) {
  try {
    console.log(`📤 Fazendo upload: ${imageInfo.bucketPath}`);
    
    // Verificar se o arquivo existe
    if (!fs.existsSync(imageInfo.localPath)) {
      console.log(`❌ Arquivo não encontrado: ${imageInfo.localPath}`);
      return false;
    }
    
    // Ler o arquivo
    const fileBuffer = fs.readFileSync(imageInfo.localPath);
    const fileExt = path.extname(imageInfo.localPath);
    const contentType = getContentType(fileExt);
    
    // Fazer upload para o Supabase Storage
    const { data, error } = await supabase.storage
      .from(imageInfo.bucket)
      .upload(imageInfo.bucketPath, fileBuffer, {
        contentType: contentType,
        upsert: true // Sobrescrever se já existir
      });
    
    if (error) {
      console.log(`❌ Erro no upload de ${imageInfo.bucketPath}:`, error.message);
      return false;
    }
    
    console.log(`✅ Upload realizado com sucesso: ${imageInfo.bucketPath}`);
    
    // Obter URL pública
    const { data: publicData } = supabase.storage
      .from(imageInfo.bucket)
      .getPublicUrl(imageInfo.bucketPath);
    
    console.log(`🔗 URL pública: ${publicData.publicUrl}`);
    return true;
    
  } catch (err) {
    console.log(`❌ Erro inesperado no upload de ${imageInfo.bucketPath}:`, err.message);
    return false;
  }
}

function getContentType(fileExt) {
  const contentTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif'
  };
  return contentTypes[fileExt.toLowerCase()] || 'image/jpeg';
}

async function uploadAllImages() {
  console.log('🚀 Iniciando upload de todas as imagens...\n');
  
  let successCount = 0;
  let failCount = 0;
  
  for (const imageInfo of imagesToUpload) {
    const success = await uploadImage(imageInfo);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
    console.log(''); // Linha em branco para separar
  }
  
  console.log('📊 RESUMO DO UPLOAD:');
  console.log(`✅ Sucessos: ${successCount}`);
  console.log(`❌ Falhas: ${failCount}`);
  console.log(`📁 Total: ${imagesToUpload.length}`);
  
  if (failCount > 0) {
    console.log('\n⚠️  ALGUMAS IMAGENS FALHARAM NO UPLOAD!');
    console.log('Verifique as permissões do bucket "product-images" no Supabase.');
    console.log('O bucket precisa ter permissões de INSERT e UPDATE para a anon key.');
  } else {
    console.log('\n🎉 TODAS AS IMAGENS FORAM ENVIADAS COM SUCESSO!');
  }
}

// Executar o upload
uploadAllImages().catch(console.error);

