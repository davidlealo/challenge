import { useState } from 'react'
import { Toaster, toast } from 'sonner'
import { uploadFile } from './services/upload'

import './App.css'
import { type Data } from './services/types'
import { Search } from './steps/Search'

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
  const [data, setData] = useState<Data>([])
  const [file, setFile] = useState<File | null>(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      setFile(files[0])
      setAppStatus(APP_STATUS.READY_UPLOAD)
    }
  }

  const handleSumit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault()

    if (appStatus !== APP_STATUS.READY_UPLOAD || !file) {
      return
    }

    setAppStatus(APP_STATUS.UPLOADING)

    const [err, newData] = await uploadFile(file)
    console.log({ newData })

    if (err) {
      setAppStatus(APP_STATUS.ERROR)
      toast.error(err.message)
      return
    }

    setAppStatus(APP_STATUS.READY_USAGE)
    if (newData) setData(newData)
    toast.success('Archivo subido correctamente')
  }



  const showButton = appStatus === APP_STATUS.READY_UPLOAD || appStatus === APP_STATUS.UPLOADING
  const showInput = appStatus !== APP_STATUS.READY_USAGE

  return (
    <>
      <Toaster />
      <h4>App Challenge</h4>
      {
        showInput && (<form onSubmit={handleSumit}>
          <label>
            <input
              disabled={appStatus === APP_STATUS.UPLOADING}
              onChange={handleInputChange}
              type="file"
              name="file"
              id="file"
              accept='.csv' />
          </label>

          {showButton && (<button disabled={appStatus === APP_STATUS.UPLOADING}>
            {BUTTON_TEXT[appStatus]}
          </button>)}
        </form>)
      }

      {
        appStatus == APP_STATUS.READY_USAGE && (
          <Search initialData={data} />
        )
      }

    </>
  )
}

export default App
