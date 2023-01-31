<template>
  <div class="container full-width">
    <div class="text-h5 q-mb-lg">Searching Result</div>
    <div class="row col-12 q-gutter-md">
      <template
        v-for="item in searchingResult"
        :key="item.id"
      >
        <div class="column">
          <q-img
            class="result-image rounded-borders cursor-pointer"
            spinner-color="white"
            :src="item.image"
            @click="goToDetail(item.id)"
          ></q-img>
          <div class="text-subtitle1 text-weight-bold text-center">{{ item.title }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const store = useStore()
    const router = useRouter()

    const searchingResult = computed(() => store.getters.searchingResult)

    console.log('the search result', searchingResult)
    function goToDetail (id) {
      router.push({ name: 'detail', params: { id } })
    }

    return {
      searchingResult,
      goToDetail
    }
  }
}
</script>

<style lang="scss" scoped>
.result-image {
  width: 260px;
  height: 290px;
}
</style>
