import express from 'express'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors())

app.post('/api/files', async (req, res) => {
    // 1. Extraer el archivo desde la request
    // 2. Validar que tenemos el archivo
    // 3. Validar el tipo (CSV)
    // 4. Tranformar el archivo (Bufer) a string
    // 5. Transformar el string a CSV
    // 6. guardar el JS en la BBDD (o en la memoria)
    // 7. Return 200 con el mensaje y el JSON
    return res.status(200).json({data: [], message: 'Archivo subido exitosamente'})
})



app.listen(port, ()=>{
    console.log(`servidor está corriendo en http://localhost:${port}`)
})
