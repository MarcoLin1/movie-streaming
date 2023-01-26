<template>
  <div class="container">
    <q-card>
      <div v-if="movieInfo.id !== ''">
        <q-card-section>
          <div class="col-12 row no-wrap q-gutter-x-sm">
            <q-img
              class="col-5 poster-image"
              :src="movieInfo?.image"
            ></q-img>
            <div class="column col-shrink">
              <q-card-section class="q-pb-none">
                <div class="text-weight-bold text-h5">{{ movieInfo.title }}</div>
              </q-card-section>
              <q-card-section class="q-pb-none">
                <div class="row items-center justify-between no-wrap">
                  <div class="row items-center">
                    <q-icon
                      name="r_star"
                      size="sm"
                      color="yellow"
                      class="q-pr-sm"
                    ></q-icon>
                    <div class="text-subtitle1 text-weight-bold">{{ movieInfo.imDbRating }}</div>
                  </div>
                  <div class="row q-gutter-x-sm items-center">
                    <div class="text-weight-bold">Director: </div>
                    <template
                      v-for="director in directorList"
                      :key="director.id"
                    >
                      <div>{{ director.name }}</div>
                    </template>
                  </div>
                  <div class="row q-gutter-x-sm items-center">
                    <div class="text-weight-bold">Writer: </div>
                    <template
                      v-for="writer in writerList"
                      :key="writer.id"
                    >
                      <div>{{ writer.name }}</div>
                    </template>
                  </div>
                </div>
              </q-card-section>
              <q-card-section class="q-pb-none">
                <div class="text-subtitle2">
                  {{ movieInfo.plot }}
                </div>
              </q-card-section>
              <q-card-section class="q-pb-none">
                <div class="text-subtitle1 text-weight-bold q-pb-sm">Keywords:</div>
                <div class="row q-gutter-sm">
                  <template
                    v-for="(keyword, keywordIndex) in keywordList"
                    :key="keywordIndex"
                  >
                    <q-badge
                      outline
                      rounded
                      color="orange"
                      :label="keyword"
                    ></q-badge>
                  </template>
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-subtitle1 text-weight-bold q-pb-md">Actors:</div>
                <div class="row q-gutter-sm">
                  <template
                    v-for="actor in actorList"
                    :key="actor.id"
                  >
                    <div class="column items-center justify-center">
                      <q-img
                        class="actor-image"
                        :src="actor.image"
                      >
                      </q-img>
                      <div class="text-caption">{{ actor.name }}</div>
                    </div>
                  </template>
                </div>
              </q-card-section>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-h5 text-weight-bold q-pb-md">More Like This</div>
          <div class="row q-gutter-md">
            <template
              v-for="similarItem in similarList"
              :key="similarItem.id"
            >
              <q-card class="similar-movie">
                <q-img :src="similarItem.image">
                </q-img>
                <q-card-section class="row justify-between q-py-sm">
                  <div class="text-subtitle2">{{ similarItem.title }}</div>
                  <div class="row">
                    <q-icon
                      size="sm"
                      color="yellow"
                      name="r_star"
                    ></q-icon>
                    <div class="text-subtitle2">{{ similarItem.imDbRating }}</div>
                  </div>
                </q-card-section>
              </q-card>
            </template>
          </div>
        </q-card-section>
      </div>
      <div
        v-else
        class="row justify-center items-center loading-effect"
      >
        <q-card-section>
          <q-spinner-orbit
            color="primary"
            size="3rem"
          ></q-spinner-orbit>
        </q-card-section>
      </div>
    </q-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { extend } from 'quasar'
import { useRoute } from 'vue-router'
import { getMovieDetail } from 'src/api/movie'

export default {
  setup () {
    const route = useRoute()
    const actorList = ref([])
    const directorList = ref([])
    const similarList = ref([])
    const writerList = ref([])
    const keywordList = ref([])
    const movieInfo = ref({
      id: '',
      title: '',
      imDbRating: '',
      image: '',
      plot: ''
    })
    const isLoading = ref(false)

    async function getDetail (id) {
      try {
        isLoading.value = true
        const { data } = await getMovieDetail(id)
        actorList.value = data.actorList
        directorList.value = data.directorList
        keywordList.value = data.keywordList
        similarList.value = data.similars
        writerList.value = data.writerList
        movieInfo.value = extend(true, {}, {
          id: data.id,
          title: data.title,
          imDbRating: data.imDbRating,
          image: data.image,
          plot: data.plot
        })
      } catch (error) {
        console.log('get detail error', error)
      } finally {
        isLoading.value = false
      }
    }

    onMounted(async () => {
      await getDetail(route.params.id)
    })

    return {
      actorList,
      directorList,
      keywordList,
      similarList,
      writerList,
      movieInfo,
      isLoading
    }
  }
}
</script>

<style lang="scss" scoped>
.actor-image {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}

.similar-movie {
  width: 200px;
}

.loading-effect {
  min-width: 500px;
  min-height: 500px;
}
</style>
