import { type Data } from "./types"
import { type apiSearchResponse } from "./types"

export const searchData = async (search: string): Promise<[Error?, Data?]> =>{

    try{
        const res = await fetch(`http://localhost:4000/api/users?=${search}`)

        if(!res.ok) return [new Error(`Error al buscar: ${res.statusText}`)]
        const json = await res.json() as apiSearchResponse
        return [undefined, json.data]
    } catch (error){
        if(error instanceof Error) return [error]
    }

    return [new Error('Error desconocido')]
}