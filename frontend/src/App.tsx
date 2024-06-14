import { useState } from 'react'

import './App.css'

const APP_STATUS = {
  IDLE: 'idle',
  ERROR: 'error',
  UPLOADING: 'uploading',
  READY_UPLOAD: 'ready_upload',
  READY_USAGE: 'ready_usage',
} as const 

const BUTTON_TEXT = {
  [APP_STATUS.READY_UPLOAD]: 'Subir archivo',
  [APP_STATUS.UPLOADING]: 'Subiendo ...'
}

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
    
    if(appStatus !== APP_STATUS.READY_UPLOAD || !file){
      return 
    }

    setAppStatus(APP_STATUS.UPLOADING)
  }

  

  const showButton = appStatus === APP_STATUS.READY_UPLOAD || appStatus === APP_STATUS.UPLOADING 

  return (
    <>
      <h4>App Challenge</h4>
      <form onSubmit={handleSumit}>
        <label>
        <input 
        disabled={appStatus === APP_STATUS.UPLOADING}
        onChange={handleInputChange} 
        type="file" 
        name="file" 
        id="file" 
        accept='.csv'/>
        </label>

        {showButton && (<button disabled={appStatus === APP_STATUS.UPLOADING}>
          {BUTTON_TEXT[appStatus]}
        </button>)}
      </form>
    </>
  )
}

export default App
