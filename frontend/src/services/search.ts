import { type Data, type apiSearchResponse } from "./types"
import { API_HOST } from "../config"

export const searchData = async (search: string): Promise<[Error?, Data?]> => {
    try {
        const res = await fetch(`http://${API_HOST}/api/users?q=${search}`) // Corrige el parámetro de consulta

        if (!res.ok) return [new Error(`Error al buscar: ${res.statusText}`)]
        const json = await res.json() as apiSearchResponse
        return [undefined, json.data]
    } catch (error) {
        if (error instanceof Error) return [error]
    }

    return [new Error('Error desconocido')]
}
