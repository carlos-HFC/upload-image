const express = require('express')
const multer = require('multer')
const path = require('path')

const app = express()

const porta = process.env.PORT || 8080

app.set('view engine', 'ejs')

const storage = multer.diskStorage({
   destination: (req, file, cb) => { //destino do arquivo
      cb(null, 'uploads/')
   },
   filename: (req, file, cb) => { //nome do arquivo com a extensão
      cb(null, file.originalname + Date.now() + path.extname(file.originalname)) //nome do arquivo com a data atual (impedindo arquivos com nomes iguais) e sua extensão
   }
})
const upload = multer({ storage }) //definir o destino do arquivo

app.post('/upload', upload.single('file'), (req, res) => {
   return res.send('arquivo recebido')
})

app.get('/', (req, res) => {
   return res.render('index')
})

app.listen(porta, () => console.log(`Servidor na porta ${porta}`))