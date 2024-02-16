import axios from 'axios'
// import supertest from 'supertest'
import { config } from '../config'

const client = axios.create({
    baseURL: config.baseURL,
    validateStatus: () => true,
  })

const replaceBook = async ({ userId, fromIsbn, toIsbn, token }) => {
  const response = await client.put(`/BookStore/v1/Books/${fromIsbn}`, {userId, isbn: toIsbn}, {
    headers: {
        Authorization: `Bearer ${token}`,
      },
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}


const addListOfBooks = async ({ userId, isbns, token }) => {
  const payload = {
    userId,
    collectionOfIsbns: isbns.map(isbn => ({ isbn })),
  }

  const response = await client.post(`/BookStore/v1/Books`, payload, {
    headers: {
        Authorization: `Bearer ${token}`,
      },
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}


const removeAllBooks = async ({ userId, token }) => {
  const response = await client.delete(`/BookStore/v1/Books?UserId=${userId}`, {
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

  const getBookUser = async ({ isbns }) => {
    const response = await client.get(`/BookStore/v1/Book?ISBN=${isbns}`)

    return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

const removeOneBook = async ({ userId, token, isbn }) => {
    // const payload = {
    //     userId,
    //     isbn,
    //   }

  //   const response = await supertest(config.baseURL)
  //     .delete(`/BookStore/v1/Book`)
  //     .set('Authorization', `Bearer ${token}`)
  //     .set('Accept', 'application/json')
  //     .send(payload)
  //   return {
  //     headers: response.headers,
  //     status: response.status,
  //     data: response.body,
  //   }
  // }

    const response = await client.delete(`/BookStore/v1/Book`, {
        data: {
          isbn,
          userId
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    
    return {
        headers: response.headers,
        status: response.status,
        data: response.data,
    }
  }

export default {
  replace: replaceBook,
  addList: addListOfBooks,
  removeAll: removeAllBooks,
  getBookUser,
  removeOneBook,
}