<template>
  <q-layout
    view="lhh LpR lfr"
    class="bg-app-background layout"
  >
    <q-header class="bg-transparent">
      <q-toolbar class="q-pa-md container">
        <q-toolbar-title>
          <div class="text-dark text-weight-bold text-uppercase">Movie Streaming</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container class="container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import useAppTheme from 'src/composables/app/useAppTheme'

export default {
  name: 'LoginLayout',
  setup () {
    useAppTheme()
  }
}
</script>

<style lang="scss">
// $
@import 'src/css/app/theme';
</style>
