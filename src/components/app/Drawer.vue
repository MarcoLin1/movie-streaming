<template>
  <q-drawer
    v-model:mode-value="innerDrawer"
    side="left"
    bordered
    :class="[isDarkMode ? 'bg-dark text-white' : 'bg-app-background text-dark']"
    :width="200"
    @update:model-value="updateDrawer"
  >
    <div class="fit q-pt-sm q-px-sm column no-wrap">
      <q-item class="rounded-borders q-mb-md">
        <q-item-section class="text-subtitle2">
          Admin Panel Name
        </q-item-section>
      </q-item>
      <q-list class="q-gutter-y-xs">
        <template
          v-for="(menu, menuIndex) in menuList"
          :key="menuIndex"
        >
          <q-item
            v-if="!menu.group"
            clickable
            dense
            class="menu-item round q-py-sm"
            :to="menu.to"
          >
            <q-item-section side>
              <q-icon
                size="xs"
                :name="menu.icon"
              ></q-icon>
            </q-item-section>
            <q-item-section>{{ menu.label }}</q-item-section>
          </q-item>
          <q-expansion-item
            v-else
            dense
            dense-toggle
            group="menu"
            class="expansion-menu-item"
            header-class="expansion-menu-header q-py-xs"
            :default-opened="isMenuActive(menu.subMenu)"
            :class="{'is-active': isMenuActive(menu.subMenu)}"
            :expand-icon-class="['expand-icon', { 'is-active': isMenuActive(menu.subMenu)}]"
          >
            <template v-slot:header>
              <q-item
                dense
                class="q-pl-none"
                :active="isMenuActive(menu.subMenu)"
              >
                <q-item-section side>
                  <q-icon
                    size="xs"
                    :name="menu.icon"
                  ></q-icon>
                </q-item-section>
                <q-item-section>{{ menu.label }}</q-item-section>
              </q-item>
            </template>
            <q-separator color="lime-1" />
            <q-item
              v-for="(subMenu, subMenuIndex) in menu.subMenu"
              clickable
              dense
              class="q-pl-xl submenu-item"
              active-class="is-active"
              :key="subMenuIndex"
              :to="subMenu.to"
            >
              <q-item-section class="q-ml-none">
                {{ subMenu.label }}
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </template>
      </q-list>
    </div>
  </q-drawer>
</template>

<script>
import { computed, toRef } from 'vue'
import { useRoute } from 'vue-router'
import useScreen from 'src/composables/useScreen'

export default {
  name: 'Drawer',
  props: {
    drawer: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:drawer'],
  setup (props, { emit }) {
    const route = useRoute()
    const { isDarkMode } = useScreen()

    const innerDrawer = toRef(props, 'drawer')

    const menuList = computed(() => {
      return [
        {
          label: 'Home',
          icon: 'r_home',
          to: {
            name: 'index'
          },
          children: [],
          visible: true
        },
        {
          label: 'Discover',
          icon: 'r_search',
          to: {
            name: 'search'
          },
          children: [
            ''
          ],
          visible: true
        },
        {
          label: 'Recent',
          icon: 'r_schedule',
          subMenu: [],
          visible: true
        },
        {
          label: 'Awards',
          icon: 'r_auto_awesome',
          subMenu: [],
          visible: true
        },
        {
          label: 'Top 250',
          icon: 'r_hotel_class',
          group: 'top',
          subMenu: [
            {
              label: 'Movies',
              icon: 'r_movie',
              to: {
                name: 'top-movie'
              },
              visible: true
            },
            {
              label: 'TV',
              icon: 'r_live_tv',
              to: {
                name: 'top-tv'
              },
              visible: true
            }
          ]
        },
        {
          label: 'Category',
          icon: 'r_category',
          group: 'category',
          subMenu: [
            {
              label: 'Movies',
              to: {
                name: 'movies'
              },
              visible: true
            },
            {
              label: 'TV',
              to: {
                name: 'tvs'
              },
              visible: true
            },
            {
              label: 'Anime',
              to: {
                name: 'anime'
              },
              visible: true
            }
          ]
        }
      ]
    })

    function updateDrawer (val) {
      console.log('is update ?', val)
      emit('update:drawer', val)
    }

    function isMenuActive (menu) {
      if (Array.isArray(menu)) {
        return menu.some(element => element.to.name === route.name)
      } else {
        return menu.to.name === route.name || menu.children.includes(route.name)
      }
    }

    return {
      isDarkMode,
      innerDrawer,
      menuList,
      isMenuActive,
      updateDrawer
    }
  }
}
</script>

<style lang="scss" scoped>
// $
@import 'src/css/quasar.variables';

$text-menu-item: white;
.menu-item,
.expansion-menu-item {
  border-radius: 20px;
  overflow: hidden;
}

.menu-item {
  color: inherit;
  opacity: 0.6;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  &.is-active {
    background: $accent;
    color: $text-menu-item;
    opacity: 1;

    .q-icon {
      color: inherit;
    }
  }

  & + .expand-icon {
    color: inherit;
    opacity: 0.4;

    &.is-active {
      opacity: 1;
    }
  }

  .q-item__section--side {
    color: inherit;
  }
}

:deep(.expansion-menu-item) {
  &,
  .q-item__section,
  .q-item__section--side {
    color: inherit;
    opacity: 1;
  }

  .q-item__section--side.expand-icon {
    padding-right: 0;
  }

  &.q-expansion-item--expanded {
    background: $grey-2;
    border-radius: 25px;
    margin-bottom: map-get($space-sm, y);

    .body--dark & {
      background: $grey-10;
    }
  }

  &.is-active {
    background: $accent;
    color: $text-menu-item;
    transition: border-radius 0.2s 0.2s;

    .expansion-menu-header {
      &,
      .q-item__section,
      .q-item__section--side {
        opacity: 1;
        color: $text-menu-item;
      }
    }
  }

  .expansion-menu-header,
  .submenu-item {
    opacity: 0.6;

    &:hover {
      opacity: 0.8;
    }

    &.is-active {
      opacity: 1;
    }
  }

  .q-separator {
    opacity: 0.5;
  }
}

.q-drawer:not(.q-drawer--mini) {
  .expansion-menu-header {
    .q-item {
      width: 100%;
    }

    .expand-icon {
      padding-right: 0;
    }
  }
}
</style>
