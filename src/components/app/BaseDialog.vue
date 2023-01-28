<template>
  <q-dialog
    ref="dialogRef"
    :persistent="persistent"
    @hide="onDialogHide"
  >
    <q-card :class="['q-dialog-plugin', cardClass]">
      <q-card-section>
        <div class="row items-center justify-between relative-position">
          <div class="text-h6 text-wrap q-mr-xl">{{ title }}</div>
          <q-btn
            v-if="showCloseBtn"
            round
            flat
            icon="r_clear"
            size="md"
            class="absolute-top-right negative-mr-sm negative-mt-xs"
            @click="onCancelClick"
          ></q-btn>
        </div>
      </q-card-section>
      <q-card-section
        v-if="icon"
        class="text-center q-mt-sm q-py-lg"
      >
        <q-icon
          size="xl"
          :name="icon"
        ></q-icon>
      </q-card-section>
      <q-card-section
        v-if="content && !Array.isArray(content)"
        :class="contentClass"
      >
        {{ content }}
      </q-card-section>
      <q-card-section
        v-else-if="content && Array.isArray(content)"
        :class="contentClass"
      >
        <q-list
          dense
          bordered
          separator
        >
          <template
            v-for="(item, itemIndex) in content"
            :key="itemIndex"
          >
            <q-item v-ripple>
              <q-item-section avatar>
                <q-icon
                  name="r_emoji_events"
                  color="orange"
                ></q-icon>
              </q-item-section>
              <q-item-section>
                {{ item }}
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-card-section>
      <q-card-actions
        align="center"
        class="q-pa-md q-gutter-sm"
      >
        <q-btn
          v-if="showCancelBtn"
          outline
          color="primary"
          class="btn-primary col-grow"
          :label="buttonLabels.cancel"
          @click="onCancelClick"
        ></q-btn>
        <q-btn
          v-if="showConfirmBtn"
          unelevated
          color="primary"
          class="btn-primary col-grow"
          :label="buttonLabels.confirm"
          @click="onOKClick"
        ></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { computed } from 'vue'
import { useDialogPluginComponent } from 'quasar'

export default {
  name: 'BaseDialog',
  props: {
    cardClass: String,
    contentClass: [String, Array],
    title: String,
    content: String,
    icon: String,
    cancelLabel: String,
    confirmLabel: String,
    persistent: {
      type: Boolean,
      default: false
    },
    showCloseBtn: {
      type: Boolean,
      default: true
    },
    showConfirmBtn: {
      type: Boolean,
      default: true
    },
    showCancelBtn: {
      type: Boolean,
      default: true
    }
  },
  emits: [...useDialogPluginComponent.emits],
  setup (props) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    const buttonLabels = computed(() => {
      return {
        cancel: props.cancelLabel,
        confirm: props.confirmLabel
      }
    })
    return {
      dialogRef,
      onDialogHide,
      onOKClick () {
        onDialogOK()
      },
      onCancelClick: onDialogCancel,
      buttonLabels
    }
  }
}
</script>
