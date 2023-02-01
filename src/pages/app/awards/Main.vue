<template>
  <div class="container full-width">
    <q-card
      v-if="allData?.length > 0"
      flat
      bordered
    >
      <q-card-section>
        <div class="text-h5 text-uppercase text-warning">Awards</div>
      </q-card-section>
      <q-card-section>
        <div class="col-12 row justify-center q-gutter-md">
          <template
            v-for="(item, itemIndex) in allData"
            :key="itemIndex"
          >
            <q-img
              class="winner-image col-3 rounded-borders cursor-pointer"
              :src="item.image"
              @click="detailAward(item.id)"
            >
              <div class="text-subtitle1 absolute-bottom text-center">{{ item.title }}</div>
            </q-img>
          </template>
        </div>
      </q-card-section>
    </q-card>
    <q-card v-else>
      <q-card-section class="row justify-center">
        <q-spinner-dots
          color="primary"
          size="2rem"
        ></q-spinner-dots>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { advancedSearch, getDetailAward } from 'src/api/movie'
import useError from 'src/composables/useError'
import BaseDialog from 'src/components/app/BaseDialog.vue'

export default {
  name: 'Awards',
  props: {
    BaseDialog
  },
  setup () {
    const $q = useQuasar()
    const { errorHandler } = useError()

    const allData = ref([])

    async function getOscarMovies () {
      try {
        const { data } = await advancedSearch({
          groups: 'oscar_winners',
          sort: 'year,desc'
        })
        if (data?.errorMessage) {
          throw new Error(data?.errorMessage)
        }
        const winnerResult = data.results.map(item => {
          const year = Number(item.description.replace(/\(/g, '').replace(/\)/g, ''))
          return {
            id: item.id,
            year,
            image: item.image,
            title: item.title
          }
        })
        allData.value = winnerResult.sort((a, b) => b.year - a.year)
      } catch (error) {
        errorHandler(error?.message)
      }
    }

    async function detailAward (id) {
      try {
        const { data } = await getDetailAward(id)
        if (data?.errorMessage) {
          throw new Error(data?.errorMessage)
        }
        const academyAward = data.items[0]
        const oscarWinners = academyAward.outcomeItems
          .find(item => item.outcomeTitle === 'Winner')?.outcomeDetails
          .map(outcome => outcome?.plainText)
        $q.dialog({
          component: BaseDialog,
          componentProps: {
            title: data.fullTitle,
            content: oscarWinners,
            confirmLabel: 'OK',
            showCancelBtn: false,
            persistent: true
          }
        })
      } catch (error) {
        errorHandler(error?.message)
      }
    }

    onMounted(async () => {
      await getOscarMovies()
    })

    return {
      allData,
      getOscarMovies,
      detailAward
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
