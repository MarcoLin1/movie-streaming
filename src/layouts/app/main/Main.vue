<template>
  <q-layout
    view="lhh LpR lfr"
    class="bg-app-background layout"
  >
    <q-header :class="isDarkMode ? 'bg-transparent text-white' : 'bg-transparent text-dark'">
      <q-toolbar>
        <q-btn
          v-if="onTablet"
          flat
          round
          size=".85em"
          icon="ti-list"
          @click="toggleMenu"
        ></q-btn>
        <div
          v-else
          class="q-pl-sm q-pr-md text-minor"
        >
          <q-breadcrumbs
            gutter="sm"
            class="q-px-xs"
            active-color="dark"
          >
            <q-breadcrumbs-el
              icon="ti-dashboard"
              class="link-default"
              :to="{ name: 'admin-index'}"
            ></q-breadcrumbs-el>
            <q-breadcrumbs-el
              v-for="(breadcrumb, breadcrumbIndex) in breadcrumbs"
              :key="breadcrumbIndex"
              :label="breadcrumb"
            ></q-breadcrumbs-el>
          </q-breadcrumbs>
        </div>
        <q-space></q-space>
        <div class="row q-gutter-x-xs">
          <q-btn
            flat
            no-caps
            size=".85em"
            :rounded="!onTablet"
            :round="onTablet"
          >
            <q-icon
              v-if="onTablet"
              name="ti-face-smile"
            ></q-icon>
            <div
              v-else
              class="row items-center q-gutter-x-sm q-pl-sm q-pr-none"
            >
              <q-icon
                name="ti-face-smile"
                class="negative-ml-xs"
              ></q-icon>
              <span class="negative-mr-sm">Hello</span>
              <q-popup-proxy
                anchor="bottom right"
                self="top right"
              >
                <q-list :class="{'bg-white': !isDarkMode, 'bg-dark': isDarkMode}">
                  <q-item
                    clickable
                    tag="label"
                  >
                    <q-item-section
                      avatar
                      class="no-min-width q-pr-sm"
                    >
                      <q-toggle
                        dense
                        size="2em"
                        color="accent"
                        class="q-mr-xs"
                        v-model="darkMode"
                        @update:model-value="toggleDarkMode"
                      ></q-toggle>
                    </q-item-section>
                    <q-item-section>Dark Mode</q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    @click="logout"
                  >
                    <q-item-section
                      avatar
                      class="no-min-width q-pr-md"
                    >
                      <q-icon
                        name="ti-shift-right"
                        size="xs"
                      ></q-icon>
                    </q-item-section>
                    <q-item-section>Logout</q-item-section>
                  </q-item>
                </q-list>
              </q-popup-proxy>
            </div>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container :class="{'bg-dark text-white' : isDarkMode}">
      <q-page class="q-pa-md full-height container">
        <div class="row no-wrap q-gutter-x-sm">
          <Drawer v-model="drawer" />
          <div class="col-grow">
            <router-view />
          </div>
          <div
            class="col-grow"
            :class="{'bg-dark text-white' : isDarkMode}"
          >
            <q-item class="q-pb-none">
              <q-item-section>
                <q-input
                  rounded
                  standout
                  label="search"
                >
                  <template v-slot:prepend>
                    <q-icon name="r_search"></q-icon>
                  </template>
                </q-input>
              </q-item-section>
            </q-item>
            <q-item class="column col-12 q-col-gutter-y-md">
              <q-item-section>
                <div class="text-subtitle1 text-weight-bold text-grey-8">Popular Movies</div>
              </q-item-section>
              <template
                v-for="(movie, movieIndex) in DUMMY_MOVIES"
                :key="movieIndex"
              >
                <q-item-section>
                  <div class="row full-width">
                    <div>
                      <q-img
                        width="100px"
                        height="80px"
                        :src="movie.image"
                      ></q-img>
                    </div>
                    <div class="q-gutter-y-sm q-pl-md">
                      <div>{{ movie.title }}</div>
                      <div>{{ movie.summary }}</div>
                      <div class="icon">
                        <template
                          v-for="(item, itemIndex) in movie.ratingNumber"
                          :key="itemIndex"
                        >
                          <q-icon
                            size="xs"
                            name="r_star"
                          ></q-icon>
                        </template>
                      </div>
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
                ></q-btn>
              </q-item-section>
            </q-item>
            <q-item class="column col-12 q-col-gutter-y-md">
              <q-item-section>
                <div class="text-subtitle1 text-weight-bold text-grey-8">Watch Lists</div>
              </q-item-section>
              <template
                v-for="(movie, movieIndex) in DUMMY_MOVIES"
                :key="movieIndex"
              >
                <q-item-section>
                  <div class="row full-width">
                    <div>
                      <q-img
                        width="100px"
                        height="80px"
                        :src="movie.image"
                      ></q-img>
                    </div>
                    <div class="q-gutter-y-sm q-pl-md">
                      <div>{{ movie.title }}</div>
                      <div>{{ movie.summary }}</div>
                      <div class="icon">
                        <template
                          v-for="(item, itemIndex) in movie.ratingNumber"
                          :key="itemIndex"
                        >
                          <q-icon
                            size="xs"
                            name="r_star"
                          ></q-icon>
                        </template>
                      </div>
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
                ></q-btn>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import useScreen from 'src/composables/useScreen'
import Drawer from 'src/components/app/Drawer.vue'

export default {
  components: {
    Drawer
  },
  setup () {
    const $q = useQuasar()
    const { onMobile, onTablet, onDesktop, isDarkMode } = useScreen()

    const drawer = ref(true)
    const darkMode = ref(isDarkMode)
    const breadcrumbs = ref([])

    const DUMMY_MOVIES = computed(() => {
      return [
        {
          title: 'Movie Title 1',
          summary: 'Movie Summary 1',
          ratingNumber: 4,
          image: 'https://placeimg.com/500/300/nature?t=1'
        },
        {
          title: 'Movie Title 2',
          summary: 'Movie Summary 2',
          ratingNumber: 5,
          image: 'https://placeimg.com/500/300/nature?t=1'
        },
        {
          title: 'Movie Title 2',
          summary: 'Movie Summary 2',
          ratingNumber: 2,
          image: 'https://placeimg.com/500/300/nature?t=1'
        }
      ]
    })

    function toggleMenu () {
      drawer.value = !drawer.value
    }

    function toggleDarkMode () {
      $q.dark.toggle()
    }

    watch([onTablet, onDesktop], ([onTabletValue, onDesktopValue]) => {
      drawer.value = !onTabletValue || onDesktopValue
    })

    return {
      onMobile,
      onTablet,
      onDesktop,
      isDarkMode,
      drawer,
      darkMode,
      breadcrumbs,
      DUMMY_MOVIES,
      toggleMenu,
      toggleDarkMode
    }
  }
}
</script>

<style lang="scss">
// $
@import 'src/css/app/theme';
</style>

<style lang="scss" scoped>
.menu-list {
  max-width: $app-list-max-width;
}
</style>
