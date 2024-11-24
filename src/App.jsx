import React, { useState } from 'react'
import FileUpload from './components/FileUpload.jsx'
import ResultDisplay from './components/ResultDisplay.jsx'
import { preProcessFile } from './services/api.js'
// import './index.css'
import './App.css'

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
    <div className='app-container'>
      {/* Barra lateral */}
      <aside className='sidebar'>
        <ul><li><h2>BrechAPP</h2></li></ul>
        <ul>
          <li>New Conversation</li>
          <li>History</li>
          <li>Settings</li>
        </ul>
      </aside>

      {/* Contenido principal */}
      <main className='main-content'>
        <header className='app-header'>
          <h1>Analyze Your Article</h1>
        </header>
        <div className='content'>
          <FileUpload onUploadComplete={handleUploadComplete} />
          {result && <ResultDisplay result={result} />}
        </div>
      </main>
    </div>
  )
}

export default App
