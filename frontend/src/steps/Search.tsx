import { useEffect, useState } from "react"
import { Data } from "../services/types"
import { searchData } from "../services/search"
import { Toaster, toast } from "sonner"

export const Search = ({initialData: {initialData: Data}}) => {
    const [data, setData] = useState<Data>(initialData)
    
    const [search, setSearch] = useState<string>('')

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    useEffect(() =>{
        const newPathName = search === ''
            ? window.location.pathname
            : `?q=${search}`

        window.history.replaceState({}, '', newPathName)
    }, [search])

    useEffect(() =>{
        searchData(search)
        .then(response => {
            const [err, newData] = response
            if (err){
                toast.error(err.message)
                return
            }

            if(newData) setData(newData)
        })
    })

    return (
        <div>
            <h1>Search</h1>
            <form>
                <input onChange={handleSearch} type="search" name="" id="" placeholder="Buscar información..."/>
            </form>
            <ul>{
                data.map((row, index) => (
                    <li key={row.id}>
                        <article>
                           <h2>{index}</h2>
                           <ul>
                            {
                                Object.keys(row).map(key => (
                                    <li>
                                        <strong>{key}</strong>: {row[key]}
                                    </li>
                                ))
                            }
                            </ul> 
                        </article>
                    </li>
                ))
            }
            </ul>
        </div>
    )

}