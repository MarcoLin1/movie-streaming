<template>
  <div class="container">
    <div
      class="q-mb-sm"
      style="max-width: 350px;"
      :class="{'bg-dark' : isDarkMode}"
    >
      <q-tabs
        v-model="tab"
        mobile-arrows
        outside-arrows
        align="left"
      >
        <q-tab
          name="leonardo"
          label="Leonardo"
        ></q-tab>
        <q-tab
          name="inception"
          label="Inception"
        ></q-tab>
        <q-tab
          name="inception2"
          label="Inception2"
        ></q-tab>
      </q-tabs>
    </div>
    <div class="main-image">
      <q-carousel
        animated
        v-model="tab"
        navigation
        arrows
        autoplay
        transition-prev="slide-right"
        transition-next="slide-left"
      >
        <q-carousel-slide
          class="rounded-borders"
          name="leonardo"
          :img-src="'https://m.media-amazon.com/images/M/MV5BMjEzNzg0Mjk0Ml5BMl5BanBnXkFtZTcwMjI1ODkwMw@@._V1_Ratio2.4000_AL_.jpg'"
        >
          <div class="main-movie-caption absolute-bottom-left q-ma-md">
            <div class="text-h6">Leonardo DiCaprio</div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide
          class="rounded-borders"
          name="inception"
          :img-src="'https://m.media-amazon.com/images/M/MV5BMTU4MDk3MjUzNF5BMl5BanBnXkFtZTcwNTc0OTk1Mw@@._V1_Ratio2.3800_AL_.jpg'"
        >
          <div class="main-movie-caption absolute-bottom-left q-ma-md">
            <div class="text-h6">Inception</div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide
          class="rounded-borders"
          name="inception2"
          :img-src="'https://m.media-amazon.com/images/M/MV5BMTY1Nzk4ODUwMF5BMl5BanBnXkFtZTcwMzc0OTk1Mw@@._V1_Ratio2.3800_AL_.jpg'"
        >
          <div class="main-movie-caption absolute-bottom-left q-ma-md">
            <div class="text-h6">Inception</div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
    <q-item>
      <q-item-section>
        <div class="col-12 row justify-between q-pt-md">
          <div class="text-weight-bold text-subtitle1 text-grey-8">Now Playing</div>
          <div class="">
            <q-btn-group outline>
              <q-btn
                outline
                icon="r_arrow_back"
                @click="prevMovies('now')"
              ></q-btn>
              <q-btn
                outline
                icon="r_arrow_forward"
                @click="nextMovies('now')"
              ></q-btn>
            </q-btn-group>
          </div>
        </div>
      </q-item-section>
    </q-item>
    <q-item class="q-px-none">
      <q-item-section>
        <div class="col-12 row justify-between q-gutter-x-sm q-gutter-y-sm">
          <template
            v-for="(movie, movieIndex) in nowPlayingMovies"
            :key="movieIndex"
          >
            <q-img
              class="rounded-borders"
              height="200px"
              placeholder-src="~assets/init-image.png"
              :width="onDesktop ? '200px' : '180px'"
              :src="movie.image"
            >
              <div class="absolute-bottom-left q-ma-sm main-movie-caption main-movie-caption-mobile cursor-pointer">
                {{movie.title}}
              </div>
              <div class="absolute-top-right q-ma-sm add-movie-btn cursor-pointer">+</div>
            </q-img>
          </template>
        </div>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <div class="col-12 row justify-between q-pt-md">
          <div class="text-weight-bold text-subtitle1 text-grey-8">Upcoming Movies</div>
          <div class="">
            <q-btn-group outline>
              <q-btn
                outline
                icon="r_arrow_back"
                @click="prevMovies"
              ></q-btn>
              <q-btn
                outline
                icon="r_arrow_forward"
                @click="nextMovies"
              ></q-btn>
            </q-btn-group>
          </div>
        </div>
      </q-item-section>
    </q-item>
    <q-item class="q-px-none">
      <q-item-section>
        <div class="col-12 row justify-between q-gutter-x-sm q-gutter-y-sm">
          <template
            v-for="(movie, movieIndex) in upcomingMovies"
            :key="movieIndex"
          >
            <q-img
              class="rounded-borders"
              placeholder-src="~assets/init-image.png"
              height="200px"
              :width="onDesktop ? '200px' : '180px'"
              :src="movie.image"
            >
              <div class="absolute-bottom-left upcoming-caption q-ma-sm cursor-pointer">{{ movie.releaseState }}</div>
            </q-img>
          </template>
        </div>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import useScreen from 'src/composables/useScreen'
import { getInTheatersMovies, getComingSoonMovies } from 'src/api/movie'

export default {
  setup () {
    const { onMobile, onTablet, onDesktop, isDarkMode } = useScreen()

    const tab = ref('leonardo')
    const moviesData = ref([])
    const upcomingData = ref([])
    const sliceNowPlayingMovies = ref(0)
    const sliceUpcomingMovie = ref(0)

    const nowPlayingMovies = computed(() => {
      const endIndex = sliceNowPlayingMovies.value + 4
      return moviesData.value.slice(sliceNowPlayingMovies.value, endIndex)
    })

    const upcomingMovies = computed(() => {
      const endIndex = sliceUpcomingMovie.value + 4
      return upcomingData.value.slice(sliceUpcomingMovie.value, endIndex)
    })

    async function getNowPlayingMovies () {
      try {
        const { data } = await getInTheatersMovies()
        moviesData.value = data.items?.map(movie => {
          return {
            id: movie.id,
            image: movie.image,
            title: movie.title,
            rating: movie.imDbRating,
            year: movie.year,
            releaseState: movie.releaseState
          }
        })
      } catch (error) {
        console.log('the error', error)
      }
    }

    async function getUpComingMovies () {
      try {
        const { data } = await getComingSoonMovies()
        upcomingData.value = data.items?.map(movie => {
          return {
            id: movie.id,
            image: movie.image,
            title: movie.title,
            rating: movie.imDbRating,
            year: movie.year,
            releaseState: movie.releaseState
          }
        })
      } catch (error) {
        console.log(error)
      }
    }

    function nextMovies (type) {
      if (type === 'now') {
        sliceNowPlayingMovies.value += 5
      } else {
        sliceUpcomingMovie.value += 5
      }
    }

    function prevMovies (type) {
      if (type === 'now') {
        sliceNowPlayingMovies.value -= 5
      } else {
        sliceUpcomingMovie.value -= 5
      }
    }

    onMounted(async () => {
      await getNowPlayingMovies()
      await getUpComingMovies()
    })

    return {
      onMobile,
      onTablet,
      onDesktop,
      isDarkMode,
      tab,
      nowPlayingMovies,
      upcomingMovies,

      nextMovies,
      prevMovies
    }
  }
}
</script>

<style lang="scss" scoped>
.main-movie-caption {
  text-align: center;
  padding: 12px;
  color: white;
  font-weight: bold;
  background-color: $app-movie-intro;
  &-mobile {
    padding: 0.5rem;
    background-color: $app-movie-watch-btn;
  }
}

.upcoming-caption {
  padding: 0.5rem;
}

.add-movie-btn {
  padding: 0.3rem 0.7rem;
  background-color: grey;
}
</style>
