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
                class="text-right cursor-pointer text-register"
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
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
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
    const $q = useQuasar()
    const router = useRouter()
    const { googleLogin, facebookLogin, emailLogin } = useAuth()

    const rememberPassword = ref(false)
    const form = ref({
      email: '',
      password: ''
    })

    async function loginHandler () {
      await emailLogin(form.value.email, form.value.password)
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

    watch(rememberPassword, (value) => {
      if (value) {
        $q.cookies.set('loginData', form.value.email, Object.assign({
          expires: '30d',
          path: '/'
        }))
      }
    })

    onMounted(() => {
      const loginEmail = $q.cookies?.get('loginData')
      if (loginEmail) {
        form.value.email = loginEmail
      }
    })

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
.text-register {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    right: 50%;
    left: 50%;
    bottom: -5px;
    border-bottom: 2px solid $primary;
    transition: 0.5s;
  }
  &:hover::after {
    right: 0%;
    left: 0%;
  }
}
</style>
