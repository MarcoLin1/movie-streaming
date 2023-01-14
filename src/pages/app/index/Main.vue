<template>
  <div class="container">
    <div style="max-width: 300px;">
      <q-tabs
        v-model="tab"
        mobile-arrows
        outside-arrows
        align="left"
        class="text-primary"
      >
        <q-tab
          name="mails"
          label="Mail"
        ></q-tab>
        <q-tab
          name="alarms"
          label="Alarms"
        ></q-tab>
        <q-tab
          name="movies"
          label="Movies"
        ></q-tab>
      </q-tabs>
    </div>
    <div class="main-image">
      <q-img
        loading="lazy"
        src="https://placeimg.com/500/300/nature?t=1"
        :ratio="16/9"
      >
        <template v-slot:error>
          <div class="absolute-full flex flex-center text-white text-weight-bold">Cannot Load Image</div>
        </template>
        <div class="absolute-bottom-left q-ma-xl main-movie-btn cursor-pointer">
          Watch Now
        </div>
      </q-img>
    </div>
    <q-item>
      <q-item-section>
        <div class="col-12 row justify-between q-pt-md">
          <div class="text-weight-bold text-subtitle1 text-grey-8">Now Playing</div>
          <div class="">
            <q-button-group push>
              <q-btn
                push
                icon="r_arrow_back"
              ></q-btn>
              <q-btn
                push
                icon="r_arrow_forward"
              ></q-btn>
            </q-button-group>
          </div>
        </div>
      </q-item-section>
    </q-item>
    <q-item class="q-px-none">
      <q-item-section>
        <div class="col-12 row justify-between q-gutter-x-md q-gutter-y-sm">
          <template
            v-for="(movie, movieIndex) in nowPlayingMovies"
            :key="movieIndex"
          >
            <q-img
              :width="onDesktop ? '200px' : '180px'"
              height="200px"
              :src="movie.src"
            >
              <div class="absolute-bottom-left q-ma-sm second-movie-btn cursor-pointer">Watch Now</div>
              <div class="absolute-top-right q-ma-sm add-movie-btn cursor-pointer">+</div>
            </q-img>
          </template>
        </div>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <div class="col-12 row justify-between q-pt-md">
          <div class="text-weight-bold text-subtitle1 text-grey-8">Top Rated Movies</div>
          <div class="">
            <q-button-group push>
              <q-btn
                push
                icon="r_arrow_back"
              ></q-btn>
              <q-btn
                push
                icon="r_arrow_forward"
              ></q-btn>
            </q-button-group>
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
              :width="onDesktop ? '200px' : '180px'"
              height="200px"
              :src="movie.src"
            >
            </q-img>
          </template>
        </div>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import useScreen from 'src/composables/useScreen'

export default {
  setup () {
    const { onMobile, onTablet, onDesktop } = useScreen()

    const tab = ref(null)

    const nowPlayingMovies = computed(() => {
      return [
        {
          src: 'https://placeimg.com/500/300/nature?t=2'
        },
        {
          src: 'https://placeimg.com/500/300/nature?t=3'
        },
        {
          src: 'https://placeimg.com/500/300/nature?t=4'
        },
        {
          src: 'https://placeimg.com/500/300/nature?t=5'
        }
      ]
    })

    const topRatedMovies = computed(() => {
      return [
        {
          src: 'https://placeimg.com/500/300/nature?t=2'
        },
        {
          src: 'https://placeimg.com/500/300/nature?t=3'
        },
        {
          src: 'https://placeimg.com/500/300/nature?t=4'
        }
      ]
    })

    return {
      onMobile,
      onTablet,
      onDesktop,
      tab,
      nowPlayingMovies,
      topRatedMovies
    }
  }
}
</script>

<style lang="scss" scoped>
.main-movie-btn {
  padding: 1rem 4rem;
  background-color: $secondary;
  opacity: 0.8;
  font-size: 1.2rem;
  font-weight: bold;
}

.second-movie-btn {
  background-color: $secondary;
  opacity: 0.8;
  padding: 0.5rem 0.8rem;
  font-weight: bold;
}

.add-movie-btn {
  padding: 0.3rem 0.7rem;
  background-color: $dark;
}
</style>
