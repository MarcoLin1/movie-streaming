import { api } from 'src/boot/axios'

const apiKey = process.env.apiKey

export function getInTheatersMovies () {
  return api.get(`InTheaters/${apiKey}`)
}

export function getComingSoonMovies () {
  return api.get(`ComingSoon/${apiKey}`)
}
