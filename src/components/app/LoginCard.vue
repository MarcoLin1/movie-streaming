<template>
  <q-page class="q-py-xl q-px-md">
    <q-card class="login-form-card column">
      <q-card-section class="text-center q-py-lg negative-mb-md">
        <div class="text-h5 text-weight-bold q-px-lg">{{ title }}</div>
      </q-card-section>
      <slot></slot>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'LoginCard',
  props: {
    title: String
  },
  setup () {

  }
}
</script>

<style lang="scss" scoped>
.login-form-card {
  margin: 0 auto;
  max-width: 100%;
  // minus padding & header height
  min-height: calc(100vh - 60px - #{map-get($space-xl, y)} * 4);
  width: $app-login-card-width;

  &.no-min-height {
    min-height: auto;
  }

  &__back-btn {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(map-get($space-xs, x), -50%);
  }
}
</style>
