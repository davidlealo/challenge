import { useState } from 'react'

import './App.css'

function App() {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ?? []
   console.log(file)
  }

  const handleSumit = (event: React.FormEvent<HTMLElement>) =>{
    event.preventDefault()
    console.log('TODO')
  }
  return (
    <>
      <h4>App Challenge</h4>
      <form onSubmit={handleSumit}>
        <label>
        <input onChange={handleInputChange} type="file" name="file" id="file" accept='.csv'/>
        </label>

        <button>
          Subir archivo
        </button>
      </form>
    </>
  )
}

export default App
