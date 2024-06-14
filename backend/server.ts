import express from 'express'
import cors from 'cors'
import multer from 'multer'
import csvToJson from 'convert-csv-to-json'


const app = express()
const port = 3000

const storage = multer.memoryStorage()
const upload = multer({ storage })

let userData: Array<Record<string, string>> = []

app.use(cors())

app.post('/api/files', upload.single('file'), async (req, res) => {
    // 1. Extraer el archivo desde la request
    const {file} = req
    // 2. Validar que tenemos el archivo
    if (!file){
        return res.status(500).json({message: 'El archivo es requerido'})
    }
    // 3. Validar el tipo (CSV)
    if (file.mimetype !== 'text/csv'){
        return res.status(500).json({message: 'El archivo debe ser un csv'})
    }
    // 4. Tranformar el archivo (Bufer) a string
    let json: Array<Record<string, string>> = []
    try{
        const rawCsv = Buffer.from(file.buffer).toString('utf-8')
        // 5. Transformar el string CSV a JSON
        json = csvToJson.fieldDelimiter(',').csvStringToJson(rawCsv)
    } catch (error){
        return res.status(500).json({message: 'Error parseando el archivo'})
    }
    // 6. guardar el JS en la BBDD (o en la memoria)
    userData = json

    // 7. Return 200 con el mensaje y el JSON
    return res.status(200).json({data: userData, message: 'Archivo subido exitosamente'})
})

app.get('/api/users', async (req, res)=>{
    // 1. Extraer el parámetro 'q' de la querry desde el request
    const {q} = req.query
    // 2. validar que tenemos el parámetro de la querry
    if (!q){
        return res.status(500).json({
            message: 'El parámetro q de la consulta es obligatorio'
        })
    }

    if (Array.isArray(q)){
        return res.status(500).json({
            message: 'El parámetro q de la consulta debe ser un string'
        })
    }
    // 3. Filtrar los datos desde la bbdd o memoria
    const search = q.toString().toLowerCase()
    const filteredData = userData.filter(row => {
        return Object.values(row).some(value => value.toLowerCase().includes(search))
    })
    // 4. Return 200 con el data filtrado
    return res.status(200).json({data: filteredData})
})

app.listen(port, ()=>{
    console.log(`servidor está corriendo en http://localhost:${port}`)
})
