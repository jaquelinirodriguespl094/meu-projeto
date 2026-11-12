import express from 'express'
import Instrumento from './models/Instrumento.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static(__dirname + '/public'))


app.get('/instrumento/add', (req, res) => {
  res.render('instrumento/add')
})


app.post('/instrumento/add/ok', async (req, res) => {
  const { nome, fabricante, preco, tipo } = req.body
  await Instrumento.create({ nome, fabricante, preco, tipo })
  res.render('instrumento/addok', { nome })
})


app.get('/instrumento/lst', async (req, res) => {
  const instrumentos = await Instrumento.find()
  res.render('instrumento/lst', { instrumentos })
})


app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000')
})