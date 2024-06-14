import { type Data } from "./types"
import { type apiUploadResponse} from "./types"
import { API_HOST } from "../config"

export const uploadFile = async (file: File): Promise<[Error?, Data?]> =>{
    const formData = new FormData()
    formData.append('file', file)

    try{
        const res = await fetch(`http://${API_HOST}/api/files`, {
            method: 'POST',
            body: formData
        })
        if(!res.ok) return [new Error(`Error a subir el archivo: ${res.statusText}`)]
        const json = await res.json() as apiUploadResponse
        return [undefined, json.data]
    } catch (error){
        if(error instanceof Error) return [error]
    }

    return [new Error('Error desconocido')]
}