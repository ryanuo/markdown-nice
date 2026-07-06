import axios from 'axios'

export const axiosGithub = axios.create({
  baseURL: 'https://api.github.com',
  headers: { Accept: 'application/json' },
})

export const axiosJSON = axios.create({
  headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
})

export const axiosMdnice = axios.create({
  baseURL: 'https://math.mdnice.com',
})
