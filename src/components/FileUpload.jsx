import React, { useState } from 'react'
import axios from 'axios'

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [processingResult, setProcessingResult] = useState(null)
  const [message, setMessage] = useState('')
  const [researchGaps, setResearchGaps] = useState(null)

  // Manejo de selección de archivo
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  // Manejo de la carga y procesamiento de archivo
  const handleUploadAndProcess = async () => {
    if (!selectedFile) {
      setMessage('Please select a file')
      return
    }

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      setMessage('Uploading and Processing File...')
      const preprocessResponse = await axios.post(
        'http://127.0.0.1:8000/preprocess/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      setProcessingResult(preprocessResponse.data.results)
      setMessage('File Processed Successfully')
    } catch (error) {
      console.error(error)
      setMessage('Error Uploading and Processing File')
    }
  }

  // Manejo de la solicitud de análisis de brechas
  const handleAnalyze = async () => {
    if (!processingResult) {
      setMessage('Please upload and preprocess a file first')
      return
    }

    try {
      setMessage('Analyzing Research Gaps...')
      const analyzeResponse = await axios.post(
        'http://127.0.0.1:8000/analyze/',
        {
          sections: processingResult.sections // Solo envía las secciones necesarias
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      setResearchGaps(analyzeResponse.data.research_gaps)
      setMessage('Research Gaps Analyzed Successfully')
    } catch (error) {
      console.error(error)
      setMessage('Error analyzing research gaps')
    }
  }

  return (
    <div className='file-upload'>
      <input type='file' accept='application/pdf' onChange={handleFileChange} />
      <button onClick={handleUploadAndProcess}>Upload and Process File</button>
      <button onClick={handleAnalyze} disabled={!processingResult}>
        Analyze Research Gaps
      </button>
      {message && <p>{message}</p>}
      {processingResult && (
        <div>
          <h3>Resultado del Procesamiento:</h3>
          <pre>{JSON.stringify(processingResult, null, 2)}</pre>
        </div>
      )}
      {researchGaps && (
        <div>
          <h3>Research Gaps Identified:</h3>
          <p>{researchGaps}</p>
        </div>
      )}
    </div>
  )
}

export default FileUpload
