const { createClient } = require("@supabase/supabase-js")
const fs = require("fs")
const path = require("path")

// Configuração do Supabase
const supabaseUrl = "https://qvdysthcnzqudlfongep.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2ZHlzdGhjbnpxdWRsZm9uZ2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMjcwNDcsImV4Y3CI6MjA3MTcwMzA0N30.6JdLH3EoXXbesIVzP-QkIDZGxykBWOR8LrBUNUhHyAQ"
const supabase = createClient(supabaseUrl, supabaseKey)

// Mapeamento das imagens
const imageMapping = {
  "caderno-happy-colorido.jpg": "../../marketplace-papelaria/images/products/caderno_happy.jpg",
  "kit-morango-milk.jpg": "../../marketplace-papelaria/images/products/kit_morango.jpg",
  "canetas-cis-pastel.webp": "../../marketplace-papelaria/images/products/canetas_cis.webp",
  "kit-papelaria-kawaii.jpg": "../../marketplace-papelaria/images/products/kit_papelaria.jpg",
  "apontadores-pastel.jpg": "../../marketplace-papelaria/images/products/apontadores_faber.jpg",
  "banner_material_escolar.jpg": "../../marketplace-papelaria/images/banners/banner_material_escolar.jpg",
  "banner_papelaria_fofa.png":"../../marketplace-papelaria/images/banners/banner_papelaria_fofa.png"
}

async function uploadImages() {
  console.log("Iniciando upload das imagens para o Supabase Storage...")
  
  for (const [fileName, filePath] of Object.entries(imageMapping)) {
    try {
      const fullPath = path.resolve(__dirname, filePath)
      
      // Verificar se o arquivo existe
      if (!fs.existsSync(fullPath)) {
        console.log(`❌ Arquivo não encontrado: ${fullPath}`)
        continue
      }
      
      // Ler o arquivo
      const fileBuffer = fs.readFileSync(fullPath)
      
      // Determinar o tipo MIME
      const ext = path.extname(fileName).toLowerCase()
      let contentType = "image/jpeg"
      if (ext === ".png") contentType = "image/png"
      if (ext === ".webp") contentType = "image/webp"
      
      // Upload para o Supabase Storage
      const { data, error } = await supabase.storage
        .from("product-images")
        .upload(fileName, fileBuffer, {
          contentType: contentType,
          upsert: true // Substitui se já existir
        })
      
      if (error) {
        console.log(`❌ Erro ao fazer upload de ${fileName}:`, error.message)
      } else {
        console.log(`✅ Upload realizado com sucesso: ${fileName}`)
        
        // Obter URL público
        const { data: publicData } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName)
        
        console.log(`   URL: ${publicData.publicUrl}`)
      }
      
    } catch (err) {
      console.log(`❌ Erro ao processar ${fileName}:`, err.message)
    }
  }
  
  console.log("\nUpload concluído!")
}

// Executar o upload
uploadImages().catch(console.error)


