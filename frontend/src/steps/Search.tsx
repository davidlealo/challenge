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
        if(!search){
            setData(initialData)
            return
        }

        searchData(search)
        .then(response => {
            const [err, newData] = response
            if (err){
                toast.error(err.message)
                return
            }

            if(newData) setData(newData)
        }, [search, initialData])
    })

    return (
        <div>
            <h1>Search</h1>
            <form>
                <input onChange={handleSearch} type="search" name="" id="" placeholder="Buscar información..."/>
            </form>
            <ul>{
                data.map((row) => (
                    <li key={row.id}>
                        <article>
                           {Object.entries(row).map(([key, value]) => <p key={key}><strong>{key}</strong>:{value}</p>)}
                        </article>
                    </li>
                ))
            }
            </ul>
        </div>
    )

}