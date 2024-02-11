import axios from 'axios'
import { config } from '../config'

const client = axios.create({
    baseURL: config.baseURL,
    validateStatus: () => true,
  })

const generateToken = async ({userName, password}) => {
    const response = await client.post('/Account/v1/GenerateToken', {
        userName,
        password,
    })

    return {
        headers: response.headers,
        status: response.status,
        data: response.data,
    }
}

const authorized = async ({ userName, password }) => {
    const response = await client.post('/Account/v1/Authorized', {
        userName,
        password
    })
    return {
        headers: response.headers,
        status: response.status,
        data: response.data,
    }
}

export default {
  generateToken,
  authorized,
}