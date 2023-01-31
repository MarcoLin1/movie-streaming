import { searchingTitle } from 'src/api/movie'

export async function searching ({ commit }, keyword) {
  try {
    const { data } = await searchingTitle(keyword)
    commit('searchingResult', data.results)
  } catch (error) {
    console.log('searching failed', error)
  }
}
