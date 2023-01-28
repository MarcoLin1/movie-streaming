<template>
  <q-page class="q-py-xl q-px-md">
    <LoginCard title="Register">
      <q-form
        ref="formRef"
        class="q-mb-lg"
        greedy
        @submit="registerHandler"
      >
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
            />
          </div>
          <div class="row q-col-gutter-md q-pt-md">
            <q-input
              outlined
              lazy-rules
              hide-bottom-space
              v-model="form.firstName"
              label="First Name"
              class="col-6"
            ></q-input>
            <q-input
              outlined
              lazy-rules
              hide-bottom-space
              v-model="form.lastName"
              label="Last Name"
              class="col-6"
            ></q-input>
          </div>
          <div class="q-pt-md">
            <q-input
              outlined
              lazy-rules
              hide-bottom-space
              v-model="form.birthday"
              type="date"
              hint="please input your birthday"
              class="col-6"
            ></q-input>
          </div>
        </q-card-section>
        <q-space class="q-py-xl"></q-space>
        <q-card-actions class="q-px-md">
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
    </LoginCard>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LoginCard from 'src/components/app/LoginCard.vue'

export default {
  name: 'Register',
  components: {
    LoginCard
  },
  setup () {
    const router = useRouter()

    const form = ref({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      birthday: ''
    })

    function backToLogin () {
      router.push({ name: 'login' })
    }

    return {
      form,
      backToLogin
    }
  }
}
</script>
