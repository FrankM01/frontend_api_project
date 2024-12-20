import React, { useState } from 'react'
import axios from 'axios'
import '../FileUpload.css'

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [processingResult, setProcessingResult] = useState(null)
  const [message, setMessage] = useState('')
  const [researchGaps, setResearchGaps] = useState(null)
  const [entropyResults, setEntropyResults] = useState(null)

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
      console.log('Research Gaps:', analyzeResponse.data.research_gaps)
      setMessage('Research Gaps Analyzed Successfully')
    } catch (error) {
      console.error(error)
      setMessage('Error analyzing research gaps')
    }
  }

  const handleValidate = async () => {
    if (!researchGaps || !processingResult) {
      setMessage('Please analyze research gaps first')
      return
    }
    try {
      setMessage('Validating data Entropy...')
      const validateResponse = await axios.post(
        'http://127.0.0.1:8000/validate/',
        {
          research_gaps: researchGaps,
          authors: processingResult.authors,
          institutions: processingResult.institutions,
          technologies: processingResult.technologies,
          sections: processingResult.sections
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      setEntropyResults(validateResponse.data)
      setMessage('Entropy Validated Successfully')
    } catch (error) {
      console.error(error)
      setMessage('Error validating entropy')
    }
  }

  return (
    <div className='file-upload-container'>
      <h2 className='upload-title'>Upload your article</h2>
      <div className='file-upload-section'>
        <input
          type='file'
          accept='application/pdf'
          onChange={handleFileChange}
          className='file-input'
        />
        <button onClick={handleUploadAndProcess} className='upload-button'>
          Process File
        </button>
        <button
          onClick={handleAnalyze}
          className='analyze-button'
          disabled={!processingResult}
        >
          Analyze Research Gaps
        </button>
        <button
          onClick={handleValidate}
          className='validate-button'
          disabled={!researchGaps}
        >
          Validate Entropy
        </button>
      </div>
      {message && <p className='status-message'>{message}</p>}
      {processingResult && (
        <div className='result-section'>
          <h3>Processing Result:</h3>
          <pre>{JSON.stringify(processingResult, null, 2)}</pre>
        </div>
      )}
      {researchGaps && (
        <div className='result-section'>
          <h3>Research Gaps Identified:</h3>
          <p>{researchGaps}</p>
        </div>
      )}
      {entropyResults && (
        <div className='result-section'>
          <h3>Entropy Validation Results:</h3>
          <pre>{JSON.stringify(entropyResults, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default FileUpload
