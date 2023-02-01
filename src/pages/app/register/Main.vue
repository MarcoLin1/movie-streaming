<template>
  <q-page class="q-py-xl q-px-md">
    <q-card class="register-card">
      <q-form
        ref="formRef"
        class="q-mb-lg"
        greedy
        @submit="registerHandler"
      >
        <q-card-section>
          <div class="text-h5 text-center">Register</div>
        </q-card-section>
        <q-card-section>
          <div class="q-col-gutter-md">
            <q-input
              v-model="form.email"
              type="email"
              outlined
              hide-bottom-space
              lazy-rules
              class="col-12"
              label="Email"
            />
            <q-input
              v-model="form.password"
              type="password"
              outlined
              hide-bottom-space
              lazy-rules
              class="col-12"
              label="Password"
              :rules="[ val => val.length >= 6 || 'At least 6 characters']"
            />
            <q-input
              v-model="form.confirmPassword"
              type="password"
              outlined
              hide-bottom-space
              lazy-rules
              class="col-12"
              label="Confirm Password"
              hint="password at least 6 characters"
              :rules="[ val => val.length >= 6 || 'At least 6 characters']"
            />
          </div>
        </q-card-section>
        <q-space class="q-py-lg"></q-space>
        <q-card-actions class="q-pa-md">
          <q-btn
            type="submit"
            class="full-width"
            unelevated
            no-caps
            color="primary"
            label="Register"
          ></q-btn>
          <q-btn
            unelevated
            outline
            color="primary"
            class="full-width q-mt-md"
            label="Back"
            @click="backToLogin"
          ></q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from 'src/api/auth'
import useError from 'src/composables/useError'

export default {
  name: 'Register',
  setup () {
    const router = useRouter()
    const { emailRegister } = useAuth()
    const { errorHandler } = useError()

    const form = ref({
      email: '',
      password: '',
      confirmPassword: ''
    })

    function backToLogin () {
      router.push({ name: 'login' })
    }

    async function registerHandler () {
      if (form.value.password !== form.value.confirmPassword) {
        const message = 'please confirm your password again'
        errorHandler(message)
        return
      }
      await emailRegister(form.value.email, form.value.password)
    }

    return {
      form,
      backToLogin,
      registerHandler
    }
  }
}
</script>

<style lang="scss" scoped>
.register-card {
  margin: 0 auto;
  max-width: 100%;
  width: $app-login-card-width;
}
</style>
