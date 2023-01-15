<template>
  <router-view />
</template>
<script>
import { defineComponent, watch } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup () {
    const route = useRoute()

    watch(() => route.matched[0]?.meta?.appClass, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        const app = document.querySelector('#q-app')
        app?.classList.remove(oldValue)
        app?.classList.add(newValue)
      }
    })
  }
})
</script>
