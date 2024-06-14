import { useEffect, useState } from "react"
import { Data } from "../services/types"

export const Search = ({initialData: {initialData: Data}}) => {
    const [data, setData] = useState<Data>(initialData)
    
    const [search, setSearch] = useState<string>('')

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    useEffect(() =>{
        if(search === ''){
            window.history.pushState({}, '', window.location.pathname)
            return 
        }

        window.history.pushState({}, '', `?q=${search}`)
    }, [search])

    return (
        <div>
            <h1>Search</h1>
            <form>
                <input onChange={handleSearch} type="search" name="" id="" placeholder="Buscar información..."/>
            </form>
        </div>
    )

}