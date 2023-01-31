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
                    @click="logoutHandler"
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
          <router-view />
          <div
            v-if="isIndexRoute"
            class="col-grow"
            :class="{'bg-dark text-white' : isDarkMode}"
          >
            <q-item class="q-pb-none">
              <q-item-section>
                <q-input
                  rounded
                  standout
                  v-model="search"
                  label="search"
                  @keydown.enter.prevent="searchingHandler"
                >
                  <template v-slot:prepend>
                    <q-icon name="r_search"></q-icon>
                  </template>
                </q-input>
              </q-item-section>
            </q-item>
            <PopularItems />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { useStore } from 'vuex'
// import { searchingTitle } from 'src/api/movie'
import useScreen from 'src/composables/useScreen'
import useAuth from 'src/api/auth'
import Drawer from 'src/components/app/Drawer.vue'
import PopularItems from 'src/components/app/PopularItems.vue'

export default {
  name: 'AppLayout',
  components: {
    Drawer,
    PopularItems
  },
  setup () {
    const $q = useQuasar()
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const { logout } = useAuth()
    const { onMobile, onTablet, onDesktop, isDarkMode } = useScreen()

    const drawer = ref(true)
    const darkMode = ref(isDarkMode)
    const breadcrumbs = ref([])
    const search = ref('')

    const isIndexRoute = computed(() => route.name === 'index')

    function toggleMenu () {
      drawer.value = !drawer.value
    }

    function toggleDarkMode () {
      $q.dark.toggle()
    }

    async function logoutHandler () {
      await logout()
      router.push({ name: 'login' })
    }

    async function searchingHandler () {
      showLoading()
      await store.dispatch('searching', search.value)
      hideLoading()
      router.push({ name: 'searching' })
    }

    function showLoading () {
      $q.loading.show({
        message: 'Searching right now, please wait...'
      })
    }

    function hideLoading () {
      $q.loading.hide()
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
      isIndexRoute,
      search,
      toggleMenu,
      toggleDarkMode,
      logoutHandler,
      searchingHandler
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
