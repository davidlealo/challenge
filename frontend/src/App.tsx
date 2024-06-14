import { useState } from 'react'

import './App.css'

const APP_STATUS = {
  IDLE: 'idle',
  ERROR: 'error',
  UPLOADING: 'uploading',
  READY_UPLOAD: 'ready_upload',
  READY_USAGE: 'ready_usage',
} as const 

type appStatusType = typeof APP_STATUS[keyof typeof APP_STATUS]

function App() {
  const [appStatus, setAppStatus] = useState<appStatusType>(APP_STATUS.IDLE)
  const [file, setFile] = useState<File | null>(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ?? []
    
    if (file){
      setFile(file)
      setAppStatus(APP_STATUS.READY_UPLOAD)
    }
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

        {appStatus === APP_STATUS.READY_UPLOAD && (<button>
          Subir archivo
        </button>)}
      </form>
    </>
  )
}

export default App
