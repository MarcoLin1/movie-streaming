<template>
  <div class="container">
    <q-tabs
      narrow-indicator
      inline-label
      align="left"
      v-model="tab"
    >
      <q-tab
        icon="o_tv"
        name="tv"
        label="TV"
      ></q-tab>
      <q-tab
        icon="o_movie"
        name="movie"
        label="Movie"
      ></q-tab>
    </q-tabs>
    <q-tab-panels
      animated
      v-model="tab"
    >
      <q-tab-panel
        name="tv"
        class="q-pa-none"
      >
        <div class="q-py-md bg-app-background">
          <div class="row justify-center q-gutter-md">
            <q-intersection
              v-for="tv in popularTVs"
              class="intersection-item"
              :key="tv.id"
            >
              <q-img
                class="item-image cursor-pointer"
                :src="tv.image"
                @click="goToDetail(tv.id)"
              >
                <div class="text-subtitle1">{{ tv.fullTitle }}</div>
              </q-img>
            </q-intersection>
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel
        name="movie"
        class="q-pa-none"
      >
        <div class="q-py-md bg-app-background">
          <div class="row justify-center q-gutter-md">
            <q-intersection
              v-for="movie in popularMovies"
              class="intersection-item"
              :key="movie.id"
            >
              <q-img
                class="item-image"
                :src="movie.image"
                @click="goToDetail(movie.id)"
              >
                <div class="text-subtitle1">{{ movie.fullTitle }}</div>
              </q-img>
            </q-intersection>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getPopularTVs, getPopularMovies } from 'src/api/movie'
import useScreen from 'src/composables/useScreen'

export default {
  name: 'PopularPage',
  setup () {
    const router = useRouter()
    const { isDarkMode } = useScreen()

    const tab = ref('tv')
    const isLoading = ref(false)
    const popularTVs = ref([])
    const popularMovies = ref([])

    async function fetchPopularTVs () {
      try {
        const { data } = await getPopularTVs()
        popularTVs.value = data.items
      } catch (error) {
        console.log('fetch popular tv failed', error)
      }
    }

    async function fetchPopularMovies () {
      try {
        const { data } = await getPopularMovies()
        popularMovies.value = data.items
      } catch (error) {
        console.log('fetch popular movies failed', error)
      }
    }

    function goToDetail (id) {
      router.push({ name: 'detail', params: { id } })
    }

    onMounted(async () => {
      isLoading.value = true
      const fetchTVs = fetchPopularTVs()
      const fetchMovies = fetchPopularMovies()
      await Promise.all([fetchTVs, fetchMovies])
      isLoading.value = false
    })

    return {
      tab,
      popularTVs,
      popularMovies,
      isLoading,
      isDarkMode,
      goToDetail
    }
  }
}
</script>

<style lang="scss" scoped>
.item-image {
  width: 250px;
  max-height: 280px;
}
.intersection-item {
  width: 260px;
  height: 290px;
}
</style>
