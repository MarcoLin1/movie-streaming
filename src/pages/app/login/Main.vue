<template>
  <q-page class="q-py-xl q-px-md">
    <LoginCard :title="'Login'">
      <q-card-section class="text-center">
        <q-form
          ref="formRef"
          class="q-mb-lg"
          greedy
          @submit="loginHandler"
        >
          <div class="row q-col-gutter-md">
            <q-input
              v-model="form.email"
              type="email"
              outlined
              hide-bottom-space
              lazy-rules
              class="col-12"
              :label="'Email'"
            />
            <q-input
              v-model="form.password"
              type="password"
              outlined
              hide-bottom-space
              lazy-rules
              class="col-12"
              :label="'Password'"
            />
            <div class="col-12 row items-center justify-between">
              <q-checkbox
                v-model="rememberPassword"
                color="primary"
                label="Remember for 30 days"
              ></q-checkbox>
              <div
                class="text-right cursor-pointer"
                @click="goToRegister"
              >
                Register
              </div>
            </div>
            <div class="col-12">
              <q-btn
                type="submit"
                class="full-width"
                outline
                unelevated
                no-caps
                color="primary"
                label="Sign in"
              ></q-btn>
            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-space></q-space>
      <q-card-section class="q-pb-lg q-gutter-y-md">
        <SocialBtn
          source='google'
          label='Sign in with Google'
          @click="googleLoginHandler"
        />
        <SocialBtn
          source='facebook'
          label='Sign in with facebook'
          @click="facebookLoginHandler"
        />
      </q-card-section>
    </LoginCard>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from 'src/api/auth'
import LoginCard from 'src/components/app/LoginCard.vue'
import SocialBtn from 'src/components/app/SocialBtn.vue'

export default {
  name: 'Login',
  components: {
    LoginCard,
    SocialBtn
  },
  setup () {
    const router = useRouter()
    const { googleLogin, facebookLogin } = useAuth()

    const rememberPassword = ref(false)
    const form = ref({
      email: '',
      password: ''
    })

    function loginHandler () {
      router.push({ name: 'index' })
    }

    async function googleLoginHandler () {
      await googleLogin()
      router.push({ name: 'index' })
    }

    async function facebookLoginHandler () {
      await facebookLogin()
      router.push({ name: 'index' })
    }

    function goToRegister () {
      router.push({ name: 'register' })
    }

    return {
      form,
      rememberPassword,
      loginHandler,
      googleLoginHandler,
      facebookLoginHandler,
      goToRegister
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
