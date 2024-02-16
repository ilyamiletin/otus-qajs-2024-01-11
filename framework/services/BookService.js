import axios from 'axios'
import { config } from '../config'

const client = axios.create({
    baseURL: config.baseURL,
    validateStatus: () => true,
  })

const getBooks = async () => {
  const response = await client.get('/BookStore/v1/Books')
  
  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

const addBook = async ({ userId, isbn, token }) => {
  const response =  await client.put(`/BookStore/v1/Books/${userId}`, {userId, isbn}, {
    headers: {
        Authorization: `Bearer ${token}`,
      }
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.body,
  }
}

const addListOfBooks = async ({ userId, isbns, token }) => {
  const payload = {
    userId,
    collectionOfIsbns: isbns.map(isbn => ({ isbn })),
  }

  const response = await client.post('/BookStore/v1/Books', payload, {
    headers: {
        Authorization: `Bearer ${token}`,
      },
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.body,
  }
}

export default {
  getAll: getBooks,
  add: addBook,
  addList: addListOfBooks,
}