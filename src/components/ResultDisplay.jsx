import React from 'react'
import '../ResultDisplay.css' // Crea un archivo CSS para estilos personalizados

function ResultDisplay({ result }) {
  if (!result) return null

  const renderResult = (data) => {
    if (typeof data === 'object' && !Array.isArray(data)) {
      return (
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {renderResult(value)}
            </li>
          ))}
        </ul>
      )
    } else if (Array.isArray(data)) {
      return (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{renderResult(item)}</li>
          ))}
        </ul>
      )
    } else {
      return <span>{String(data)}</span>
    }
  }

  return (
    <div className='result-display'>
      <h3>Analysis Result:</h3>
      <div className='result-content'>{renderResult(result)}</div>
    </div>
  )
}

export default ResultDisplay
