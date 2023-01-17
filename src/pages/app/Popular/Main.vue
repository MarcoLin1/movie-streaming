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
        <q-table
          row-key="name"
          v-model:pagination="pagination"
          :class="{'bg-app-background': !isDarkMode}"
          :dark="isDarkMode"
          :loading="isLoading"
          :filter="search"
          :columns="columns"
          :rows="popularTVs"
          :rows-per-page-options="[10, 20, 30]"
        >
          <template v-slot:top-right>
            <q-input
              dense
              clearable
              rounded
              standout
              debounce="300"
              v-model="search"
            >
              <template
                v-if="!search"
                v-slot:append
              >
                <q-icon name="r_search"></q-icon>
              </template>
            </q-input>
          </template>
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                :auto-width="col.autoWidth"
              >
                <span class="text-subtitle1 text-weight-bold">{{ col.label }}</span>
              </q-th>
            </q-tr>
          </template>
          <template v-slot:body-cell-title="props">
            <q-td :props="props">
              <div class="row items-center q-gutter-x-md no-wrap">
                <img
                  class="popular-image"
                  :src="props.row.image"
                >
                <div class="text-subtitle2 text-weight-bold">{{ props.row.title }}</div>
              </div>
            </q-td>
          </template>
        </q-table>
      </q-tab-panel>
      <q-tab-panel
        name="movie"
        class="q-pa-none"
      >
        <q-table
          row-key="name"
          v-model:pagination="pagination"
          :class="{'bg-app-background': !isDarkMode}"
          :dark="isDarkMode"
          :loading="isLoading"
          :filter="search"
          :columns="columns"
          :rows="popularMovies"
          :rows-per-page-options="[10, 20, 30]"
        >
          <template v-slot:top-right>
            <q-input
              dense
              clearable
              rounded
              standout
              debounce="300"
              v-model="search"
            >
              <template
                v-if="!search"
                v-slot:append
              >
                <q-icon name="r_search"></q-icon>
              </template>
            </q-input>
          </template>
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                :auto-width="col.autoWidth"
              >
                <span class="text-subtitle1 text-weight-bold">{{ col.label }}</span>
              </q-th>
            </q-tr>
          </template>
          <template v-slot:body-cell-title="props">
            <q-td :props="props">
              <div class="row items-center q-gutter-x-md no-wrap">
                <img
                  class="popular-image"
                  :src="props.row.image"
                >
                <div class="text-subtitle2 text-weight-bold">{{ props.row.title }}</div>
              </div>
            </q-td>
          </template>
        </q-table>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { getPopularTVs, getPopularMovies } from 'src/api/movie'
import useScreen from 'src/composables/useScreen'

export default {
  name: 'PopularPage',
  setup () {
    const { isDarkMode } = useScreen()

    const tab = ref('tv')
    const isLoading = ref(false)
    const search = ref(null)
    const popularTVs = ref([])
    const popularMovies = ref([])
    const pagination = ref({
      rowsPerPage: 10,
      sortBy: 'rank',
      descending: false
    })

    const columns = computed(() => {
      return [
        {
          name: 'title',
          label: 'Title',
          align: 'left',
          autoWidth: true,
          field: (row) => row.fullTitle,
          sortable: true
        },
        {
          name: 'rank',
          label: 'Rank',
          align: 'center',
          autoWidth: true,
          field: (row) => Number(row.rank),
          sortable: true
        },
        {
          name: 'rankUpDown',
          label: 'Rank Up',
          align: 'center',
          autoWidth: true,
          field: (row) => row.rankUpDown,
          sortable: false
        },
        {
          name: 'rating',
          label: 'Rating',
          align: 'center',
          autoWidth: true,
          field: (row) => Number(row.imDbRating),
          sortable: true
        },
        {
          name: 'ratingCount',
          label: 'Rating Count',
          align: 'center',
          autoWidth: true,
          field: (row) => Number(row.imDbRatingCount),
          sortable: true
        }
      ]
    })

    async function fetchPopularTVs () {
      const { data } = await getPopularTVs()
      popularTVs.value = data.items
      console.log('popular tv', data)
    }

    async function fetchPopularMovies () {
      const { data } = await getPopularMovies()
      popularMovies.value = data.items
      console.log('popular movie', data)
    }

    onMounted(async () => {
      try {
        isLoading.value = true
        const fetchTVs = fetchPopularTVs()
        const fetchMovies = fetchPopularMovies()
        await Promise.all([fetchTVs, fetchMovies])
      } catch (error) {
        console.log('fetch TVs failed', error)
      } finally {
        isLoading.value = false
      }
    })

    return {
      tab,
      columns,
      popularTVs,
      popularMovies,
      search,
      isLoading,
      pagination,
      isDarkMode
    }
  }
}
</script>

<style lang="scss" scoped>
.popular-image {
  width: 100px;
}
</style>
