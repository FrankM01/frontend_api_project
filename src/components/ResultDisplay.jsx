import React from 'react'

function ResultDisplay({ result }) {
  if (!result) return null
  return (
    <div className='result-display'>
      <h3>Analysis result:</h3>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  )
}

export default ResultDisplay
