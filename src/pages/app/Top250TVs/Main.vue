<template>
  <div class="container">
    <div class="text-h5 q-mb-md">Top 250 TVs</div>
    <q-table
      row-key="name"
      v-model:pagination="pagination"
      class="top-tv-table"
      :class="{'bg-app-background': !isDarkMode}"
      :dark="isDarkMode"
      :loading="isLoading"
      :filter="search"
      :columns="columns"
      :rows="top250TVs"
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
          <div
            class="row items-center q-gutter-x-md no-wrap cursor-pointer"
            @click="goToDetail(props.row.id)"
          >
            <q-img
              class="item-image"
              :src="props.row.image"
            />
            <div class="text-subtitle2 text-weight-bold">{{ props.row.title }}</div>
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getTop250TVs } from 'src/api/movie'
import useScreen from 'src/composables/useScreen'

export default {
  name: 'Top250TVs',
  setup () {
    const router = useRouter()
    const { isDarkMode } = useScreen()
    const isLoading = ref(false)
    const search = ref(null)

    const top250TVs = ref([])
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
          autoWidth: false,
          field: (row) => row.title,
          sortable: true
        },
        {
          name: 'year',
          label: 'Year',
          align: 'left',
          autoWidth: false,
          field: (row) => row.year,
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

    async function fetchTop250TVs () {
      try {
        isLoading.value = true
        const { data } = await getTop250TVs()
        top250TVs.value = data.items
      } catch (error) {
        console.log('fetch top 250 movies failed', error)
      } finally {
        isLoading.value = false
      }
    }

    function goToDetail (id) {
      router.push({ name: 'detail', params: { id } })
    }

    onMounted(async () => {
      await fetchTop250TVs()
    })

    return {
      isLoading,
      isDarkMode,
      search,
      pagination,
      columns,
      top250TVs,
      goToDetail
    }
  }
}
</script>

<style lang="scss" scoped>
.top-tv-table {
  min-width: 800px;
}
.item-image {
  width: 150px;
  height: 200px;
}
</style>
