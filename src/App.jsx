import React, { useState } from 'react'
import FileUpload from './components/FileUpload.jsx'
import ResultDisplay from './components/ResultDisplay.jsx'
import { preProcessFile } from './services/api.js'
import './index.css'

function App() {
  const [result, setResult] = useState(null)

  const handleUploadComplete = async (filePath) => {
    try {
      const preprocessingResult = await preProcessFile(filePath)
      setResult(preprocessingResult)
    } catch (error) {
      console.log('Error during preprocessing:', error)
    }
  }

  return (
    <div className='App'>
      <h1>Upload PDF for Analysis</h1>
      <FileUpload onUploadComplete={handleUploadComplete} />
      <ResultDisplay result={result} />
    </div>
  )
}

export default App
