import axios from 'axios'

export const preProcessFile = async (fileName) => {
  try {
    const response = await axios.post('http://localhost:8000/preprocess/', {
      file_name: fileName
    })
    return response.data
  } catch (error) {
    console.log('Error during preprocessing:', error)
    throw error
  }
}
