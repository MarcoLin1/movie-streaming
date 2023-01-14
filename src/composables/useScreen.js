import { useQuasar } from 'quasar'
import { computed } from 'vue'

export default function useScreen () {
  const $q = useQuasar()

  const breakpoints = computed(() => ({
    retina: $q.screen.sizes.xl,
    desktop: $q.screen.sizes.lg,
    tablet: $q.screen.sizes.md,
    mobile: $q.screen.sizes.sm
  }))

  const onDesktop = computed(() => $q.screen.gt.sm)
  const onTablet = computed(() => $q.screen.lt.md)
  const onMobile = computed(() => $q.screen.lt.sm)

  const isDarkMode = computed(() => $q.dark.isActive)

  return {
    breakpoints,
    onDesktop,
    onTablet,
    onMobile,
    isDarkMode
  }
}
