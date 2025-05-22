import axios from 'axios'

export const fetchData = async () => {
    try {
        const response = axios.get('http://localhost:3000/data')
        console.log(response.data)
        return response.data
    } catch(err) {
        console.error(err)
    }
}

export const sendData = async (data) => {
    try {
        const response = await axios.post('http://localhost:3000/data')
        return response.data
    } catch(err) {
        console.error(err)
    }
}