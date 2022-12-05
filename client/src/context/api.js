import axios from "axios"
import {initialState} from "./reducer"

export const authFetch = axios.create({
        baseURL: "http://localhost:5000/api/v1",
        headers: {
                Authorization: `Bearer ${initialState?.token}`
          }
})

export const apiUrl = "http://localhost:5000/api/v1"
