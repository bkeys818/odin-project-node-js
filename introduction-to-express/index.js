import express from 'express'
import path from 'path'
const __dirname = import.meta.dirname;

const pagesDir = path.join(__dirname, 'pages')

const app = express()

app.use(express.static(pagesDir, { extensions: ['html'] }))

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(pagesDir ,'404.html'))
})

app.listen(8080)