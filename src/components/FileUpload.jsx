import React, { useState } from 'react'
import axios from 'axios'

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [processingResult, setProcessingResult] = useState(null)
  const [message, setMessage] = useState('')

  // Manejo de selección de archivo
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  // Manejo de la carga de archivo
  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a file')
      return
    }

    // Create a new FormData object
    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      setMessage('Uploading and Processing File...')
      // Enviar el archivo al endpoint /preprocess/
      const preprocessResponse = await axios.post(
        'http://127.0.0.1:8000/preprocess/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      // Almacenar el resultado
      setProcessingResult(preprocessResponse.data.results)
      setMessage('File Processed Successfully')
    } catch (error) {
      console.error(error)
      setMessage('Error Uploading or Processing File')
    }
  }

  return (
    <div className='file-upload'>
      <input type='file' accept='application/pdf' onChange={handleFileChange} />
      <button onClick={handleUpload}> Upload and Process File </button>
      {message && <p>{message}</p>}
      {processingResult && (
        <div>
          <h3>Resultado del Procesamiento:</h3>
          <pre>{JSON.stringify(processingResult, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default FileUpload
