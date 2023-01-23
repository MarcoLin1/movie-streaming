<template>
  <div class="container">
    <q-card>
      <q-form>
        <template
          v-for="(group, groupIndex) in advancedSearchOptions"
          :key="groupIndex"
        >
          <q-card-section>
            <div class="text-h6">{{ group.title }}</div>
          </q-card-section>
          <q-card-section class="q-py-none">
            <template
              v-for="(option, optionIndex) in group.options"
              :key="optionIndex"
            >
              <q-checkbox
                v-model="group.selectedOptions"
                :label="option.label"
                :val="option.val"
              ></q-checkbox>
            </template>
          </q-card-section>
        </template>
        <q-card-section>
          <div class="text-h6">Release Date</div>
        </q-card-section>
        <q-card-section class="q-py-none">
          <div class="row items-center q-gutter-x-sm">
            <q-input
              filled
              dense
              v-model="startDate"
              hint="YYYY/MM/DD"
              mask="date"
            >
              <template v-slot:append>
                <q-icon
                  name="r_event"
                  class="cursor-pointer"
                >
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      today-btn
                      v-model="startDate"
                      mask="YYYY/MM/DD"
                    ></q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-icon
              name="r_remove"
              size="sm"
              class="negative-mt-md"
            ></q-icon>
            <q-input
              filled
              dense
              v-model="endDate"
              hint="YYYY/MM/DD"
              mask="date"
            >
              <template v-slot:append>
                <q-icon
                  name="event"
                  class="cursor-pointer"
                >
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      today-btn
                      v-model="endDate"
                      mask="YYYY/MM/DD"
                    ></q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </q-card-section>
        <q-card-actions
          align="left"
          class="q-pa-md"
        >
          <q-btn
            label="SEARCH"
            color="primary"
            @click="search"
          ></q-btn>
        </q-card-actions>
      </q-form>
      <q-table
        v-if="resultData.length > 0 || isLoading"
        dense
        title="Result"
        row-key="id"
        :loading="isLoading"
        :columns="columns"
        :rows="resultData"
        :rows-per-page-options="[10, 20, 30]"
      >
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
        <template v-slot:body-cell-runTime="props">
          <q-td :props="props">
            <template v-if="props.row.runtimeStr">
              <span>{{ props.row.runtimeStr }}</span>
            </template>
            <template v-else>
              <span>-</span>
            </template>
          </q-td>
        </template>
        <template v-slot:body-cell-genreList="props">
          <q-td
            class="q-gutter-x-sm"
            :props="props"
          >
            <template
              v-for="(item, itemIndex) in props.row.genreList"
              :key="itemIndex"
            >
              <q-badge
                color="primary"
                :label="item.key"
              ></q-badge>
            </template>
          </q-td>
        </template>
        <template v-slot:body-cell-starList="props">
          <q-td
            class="q-gutter-x-xs"
            :props="props"
          >
            <template
              v-for="star in props.row.starList"
              :key="star.id"
            >
              <q-badge
                color="secondary"
                :label="star.name"
              ></q-badge>
            </template>
          </q-td>
        </template>
        <!-- <template v-slot:body-cell-expand="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn
                round
                dense
                size="sm"
                color="primary"
                :icon="props.expand ? 'remove' : 'add'"
                @click="props.expand = !props.expand"
              ></q-btn>
            </q-td>
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col }}
            </q-td>
          </q-tr>
          <q-tr
            v-show="props.expand"
            :props="props"
          >
            <q-td colspan="100%">
              <div class="text-left">{{ props.row.plot }}</div>
            </q-td>
          </q-tr>
        </template> -->
      </q-table>
    </q-card>
  </div>

</template>

<script>
import { ref, computed } from 'vue'
import { date } from 'quasar'
import { advancedSearch } from 'src/api/movie'
import { GENRES, TITLE_GROUPS, GENRES_OPTIONS, TITLE_GROUPS_OPTIONS } from 'src/constant/options'
import { QUASAR_DATE, RESTFUL_API_DATE } from 'src/constant/date'

export default {
  setup () {
    const startDate = ref('')
    const endDate = ref('')
    const resultData = ref([])
    const isLoading = ref(false)

    const advancedSearchOptions = ref([
      {
        title: GENRES,
        options: GENRES_OPTIONS,
        selectedOptions: []
      },
      {
        title: TITLE_GROUPS,
        options: TITLE_GROUPS_OPTIONS,
        selectedOptions: []
      }
    ])

    const columns = computed(() => {
      return [
        {
          name: 'expand',
          label: '',
          align: 'left',
          autoWidth: false
        },
        {
          name: 'title',
          label: 'Title',
          align: 'left',
          autoWidth: false,
          field: (row) => row.title,
          sortable: true
        },
        {
          name: 'runTime',
          label: 'Run Time',
          align: 'left',
          autoWidth: false,
          field: (row) => row.runtimeStr,
          sortable: true
        },
        {
          name: 'genreList',
          label: 'Genre List',
          align: 'left',
          autoWidth: false,
          field: (row) => row.genreList,
          sortable: false
        },
        {
          name: 'starList',
          label: 'Star List',
          align: 'left',
          autoWidth: false,
          field: (row) => row.starList,
          sortable: false
        }
        // {
        //   name: 'plot',
        //   label: 'Plot',
        //   align: 'center',
        //   autoWidth: false,
        //   field: (row) => row.plot,
        //   sortable: false
        // }
      ]
    })

    async function search () {
      try {
        isLoading.value = true
        const genres = advancedSearchOptions.value.find(item => item.title === GENRES)?.selectedOptions
        const groups = advancedSearchOptions.value.find(item => item.title === TITLE_GROUPS)?.selectedOptions
        const start = convertDate(startDate.value)
        const end = convertDate(endDate.value)
        const releaseDate = start && end
          ? `${start},${end}`
          : start ?? end
        const { data } = await advancedSearch({
          genres: genres.join(),
          groups: groups.join(),
          release_date: releaseDate
        })
        resultData.value = data.results
        console.log('the data ?', data)
      } catch (error) {
        console.log('search error', error)
      } finally {
        isLoading.value = false
      }
    }

    function convertDate (originDate) {
      const exactDate = date.formatDate(originDate, QUASAR_DATE)
      return date.formatDate(exactDate, RESTFUL_API_DATE)
    }

    return {
      startDate,
      endDate,
      advancedSearchOptions,
      columns,
      resultData,
      isLoading,
      search
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
