<template>
  <div class="container">
    <q-card>
      <q-card-section v-if="!movieInfo.id && isLoading">
        <div class="row justify-center items-center loading-effect">
          <q-spinner-orbit
            color="primary"
            size="3rem"
          ></q-spinner-orbit>
        </div>
      </q-card-section>
      <q-card-section v-else-if="!movieInfo.id && !isLoading">
        <div class="column justify-center items-center empty-effect">
          <q-icon
            size="xl"
            name="r_error"
            color="warning"
          ></q-icon>
          <div class="text-h5 text-weight-bold">Empty</div>
          <q-btn
            unelevated
            color="warning"
            label="Back"
            class="q-mt-xl"
            @click="backToIndex"
          ></q-btn>
        </div>
      </q-card-section>
      <div v-else>
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
              <q-card
                class="similar-card cursor-pointer"
                @click="checkDetail(similarItem.id)"
              >
                <q-img
                  class="similar-image"
                  :src="similarItem.image"
                >
                </q-img>
                <q-card-section class="row justify-between items-center q-py-sm no-wrap">
                  <div class="text-subtitle2">{{ similarItem.title }}</div>
                  <div
                    v-if="similarItem.imDbRating !== ''"
                    class="row no-wrap items-center"
                  >
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
    </q-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { extend } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import { getMovieDetail } from 'src/api/movie'

export default {
  setup () {
    const route = useRoute()
    const router = useRouter()
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
    async function checkDetail (id) {
      await getDetail(id)
      router.push({ name: 'detail', params: { id } })
    }

    function backToIndex () {
      router.push({ name: 'index' })
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
      isLoading,
      backToIndex,
      checkDetail
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

.similar-card {
  width: 200px;
}

.similar-image {
  width: 200px;
  height: 300px;
}

.loading-effect {
  min-width: 500px;
  min-height: 500px;
}

.empty-effect {
  min-width: 300px;
  min-height: 300px;
}
</style>
