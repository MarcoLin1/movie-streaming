<template>
  <q-btn
    no-caps
    unelevated
    class="full-width q-py-sm"
    :outline='outline'
    :color="color"
    :class="{'bg-primary': source === 'facebook'}"
  >
    <div class="row items-center q-gutter-x-md no-wrap">
      <q-img
        v-if="source === 'google'"
        class="transform-logo"
        width="24px"
        src="~assets/google-logo.svg"
      ></q-img>
      <q-img
        v-else-if="source === 'facebook'"
        class="transform-logo"
        width="24px"
        src="~assets/facebook-logo.svg"
      ></q-img>
      <div>{{ label }}</div>
    </div>
  </q-btn>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'SocialBtn',
  props: {
    label: String,
    source: String
  },
  setup (props) {
    const color = computed(() => {
      switch (props.source) {
        case 'google':
          return 'grey'
        case 'facebook':
          return 'white'
        default:
          return 'grey'
      }
    })

    const outline = computed(() => {
      switch (props.source) {
        case 'google':
          return true
        case 'facebook':
          return true
        default:
          return false
      }
    })

    return {
      color,
      outline
    }
  }
}
</script>
