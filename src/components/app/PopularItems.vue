<template>
  <q-item class="column col-12 q-col-gutter-y-md">
    <q-item-section>
      <div class="text-subtitle1 text-weight-bold text-grey-8">Popular TV</div>
    </q-item-section>
    <template
      v-for="tv in topTenTVs"
      :key="tv.id"
    >
      <q-item-section>
        <div class="row full-width">
          <div>
            <q-img
              width="100px"
              height="80px"
              placeholder-src="~assets/init-image.png"
              :src="tv.image"
            ></q-img>
          </div>
          <div class="q-gutter-y-sm q-pl-md">
            <div class="text-weight-bold text-subtitle2">{{ tv.title }}</div>
            <div class="row items-center q-gutter-x-sm">
              <q-icon
                name="r_star"
                color="amber-10"
              ></q-icon>
              <div>{{ tv.imDbRating }}</div>
            </div>
            <div>{{ tv.year }}</div>
          </div>
        </div>
      </q-item-section>
    </template>
    <q-item-section>
      <q-btn
        outline
        color="secondary"
        class="full-width"
        label="See More"
        @click="goToPopularPage"
      ></q-btn>
    </q-item-section>
  </q-item>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getPopularTVs } from 'src/api/movie'

export default {
  setup () {
    const router = useRouter()

    const popularTVs = ref([])

    const topTenTVs = computed(() => {
      return popularTVs.value?.slice(0, 10)
    })

    async function fetchPopularMovies () {
      try {
        const { data } = await getPopularTVs()
        popularTVs.value = data?.items?.map(movie => {
          const { id, rank, title, image, year, imDbRating } = movie
          return {
            id,
            rank,
            title: `${title} (${year})`,
            image,
            year,
            imDbRating
          }
        })
      } catch (error) {
        console.log('error', error)
      }
    }

    function goToPopularPage () {
      router.push({ name: 'popular' })
    }

    onMounted(async () => {
      await fetchPopularMovies()
    })

    return {
      topTenTVs,
      goToPopularPage
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
