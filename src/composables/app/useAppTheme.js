import { useQuasar } from 'quasar'
import { onMounted, ref } from 'vue'
// import themeVariables from 'src/css/quasar.variables.scss'
import materialIconOutlined from 'quasar/icon-set/material-icons-outlined'

export default function useAdminTheme () {
  const appliedTheme = ref(false)

  function changeIconSetToThemify () {
    const $q = useQuasar()
    // see https://quasar.dev/options/quasar-icon-sets#change-quasar-icon-set-at-runtime
    $q.iconSet.set(materialIconOutlined)

    // change icons in q-component https://github.com/quasarframework/quasar/blob/dev/ui/icon-set/material-icons-outlined.js
    $q.iconSet.field.error = '' // hide all error icon by default
    $q.iconSet.arrow.dropdown = 'o_keyboard_arrow_down'
    $q.iconSet.field.clear = 'r_clear'
  }

  function setBrandColors () {
    // setCssVar didn't work in PROD, so use setProperty directly
    document.body.style.setProperty('--q-primary', 'rgba(25, 118, 210, 1)')
    document.body.style.setProperty('--q-secondary', 'rgba(38, 166, 154, 1)')
    document.body.style.setProperty('--q-accent', 'rgba(156, 39, 176, 1)')
    document.body.style.setProperty('--q-dark', '#1D1D1D')
    document.body.style.setProperty('--q-positive', '#21BA45')
    document.body.style.setProperty('--q-negative', '#C10015')
    document.body.style.setProperty('--q-info', '#31CCEC')
    document.body.style.setProperty('--q-warning', '#F2C037')
  }

  onMounted(() => {
    changeIconSetToThemify()
    setBrandColors()
    appliedTheme.value = true
  })

  return {
    changeIconSetToThemify,
    setBrandColors,
    appliedTheme
  }
}
