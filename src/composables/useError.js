import { useQuasar } from 'quasar'

export default function useError () {
  const $q = useQuasar()

  function errorHandler (error) {
    $q.notify({
      message: error,
      position: 'top'
    })
  }

  return {
    errorHandler
  }
}
