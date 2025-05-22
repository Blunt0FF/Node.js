import { useState, useEffect } from 'react'

import './App.css'
import { sendData } from './api'

function App() {

  const [backMessage, setBackMessage] = useState(null)

  // 1. в чем отличие useEffect от useLayoutEffect
  //2. Что будет если не указать массив зависимостей в useEffect
  // 3. Как работае useEffect, какие у него параметры
  useEffect(() => {
    const getMessage =async  () => {
      const response = await sendData()
      setBackMessage(response)
    }

    getMessage()
    console.log('app was uploaded')
  }, [])

  console.log(backMessage);
  
  return (
    <>
    {backMessage && backMessage?.message}
    </>
  )
}

export default App
