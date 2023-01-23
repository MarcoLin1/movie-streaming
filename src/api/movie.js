import { api } from 'src/boot/axios'

const apiKey = process.env.apiKey

export function getInTheatersMovies () {
  return api.get(`InTheaters/${apiKey}`)
}

export function getComingSoonMovies () {
  return api.get(`ComingSoon/${apiKey}`)
}

export function getPopularMovies () {
  return api.get(`MostPopularMovies/${apiKey}`)
}

export function getPopularTVs () {
  return api.get(`MostPopularTVs/${apiKey}`)
}

export function getTop250Movies () {
  return api.get(`Top250Movies/${apiKey}`)
}

export function getTop250TVs () {
  return api.get(`Top250TVs/${apiKey}`)
}

export function advancedSearch (params) {
  console.log('the params ?', params)
  return api.get(`AdvancedSearch/${apiKey}`, {
    params: params
  })
}
