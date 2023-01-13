<template>
  <q-layout
    view="lhh LpR lfr"
    class="bg-app-background layout"
  >
    <q-header class="bg-app-background">
      <!-- <q-toolbar class="q-py-sm q-px-md container">

      </q-toolbar> -->
    </q-header>
    <q-page-container>
      <q-page class="q-pa-md full-height container">
        <div class="row no-wrap q-gutter-x-sm">
          <div class="col-grow">
            <q-list
              dense
              separator
              class="full-height menu-list"
            >
              <template
                v-for="(group, groupIndex) in menuList"
                :key="groupIndex"
              >
                <q-item class="column q-pb-none q-pr-none">
                  <q-item-section>
                    <div class="text-subtitle1 text-weight-bold text-grey-8">{{ group.title }}</div>
                  </q-item-section>
                  <q-item-section>
                    <template
                      v-for="(subItem, subItemIndex) in group.subGroup"
                      :key="subItemIndex"
                    >
                      <q-item
                        clickable
                        class="q-py-none"
                      >
                        <q-item-section>
                          <q-icon
                            left
                            size="sm"
                            color="grey-7"
                            :name="subItem.icon"
                          ></q-icon>
                        </q-item-section>
                        <q-item-section>
                          <div class="text-subtitle2 text-no-wrap text-weight-bold text-grey-7">{{ subItem.subTitle }}
                          </div>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-item-section>
                </q-item>
              </template>
            </q-list>
          </div>
          <!-- <q-separator vertical></q-separator> -->
          <div class="col-7">
            <q-card class="col-12 bg-primary full-height">
              <router-view />
            </q-card>
          </div>
          <div class="col-grow">
            <q-item class="q-pb-none">
              <q-item-section>
                <q-input
                  rounded
                  standout
                  label="search"
                >
                  <template v-slot:prepend>
                    <q-icon name="r_search"></q-icon>
                  </template>
                </q-input>
              </q-item-section>
            </q-item>
            <q-item class="column col-12 q-pr-none q-col-gutter-y-md">
              <q-item-section>
                <div class="text-subtitle1 text-weight-bold text-grey-8">Popular Movies</div>
              </q-item-section>
              <template
                v-for="(movie, movieIndex) in DUMMY_MOVIES"
                :key="movieIndex"
              >
                <q-item-section>
                  <div class="row full-width">
                    <div>
                      <q-img
                        width="100px"
                        height="80px"
                        :src="movie.image"
                      ></q-img>
                    </div>
                    <div class="q-gutter-y-sm q-pl-md">
                      <div>{{ movie.title }}</div>
                      <div>{{ movie.summary }}</div>
                      <div class="icon">
                        <template
                          v-for="(item, itemIndex) in movie.ratingNumber"
                          :key="itemIndex"
                        >
                          <q-icon
                            size="xs"
                            name="r_star"
                          ></q-icon>
                        </template>
                      </div>
                    </div>
                  </div>
                </q-item-section>
              </template>
              <q-item-section>
                <q-btn
                  outline
                  color="secondary"
                  class="full-width"
                  label="See More"
                ></q-btn>
              </q-item-section>
            </q-item>
            <q-item class="column col-12 q-pr-none q-col-gutter-y-md">
              <q-item-section>
                <div class="text-subtitle1 text-weight-bold text-grey-8">Watch Lists</div>
              </q-item-section>
              <template
                v-for="(movie, movieIndex) in DUMMY_MOVIES"
                :key="movieIndex"
              >
                <q-item-section>
                  <div class="row full-width">
                    <div>
                      <q-img
                        width="100px"
                        height="80px"
                        :src="movie.image"
                      ></q-img>
                    </div>
                    <div class="q-gutter-y-sm q-pl-md">
                      <div>{{ movie.title }}</div>
                      <div>{{ movie.summary }}</div>
                      <div class="icon">
                        <template
                          v-for="(item, itemIndex) in movie.ratingNumber"
                          :key="itemIndex"
                        >
                          <q-icon
                            size="xs"
                            name="r_star"
                          ></q-icon>
                        </template>
                      </div>
                    </div>
                  </div>
                </q-item-section>
              </template>
              <q-item-section>
                <q-btn
                  outline
                  color="secondary"
                  class="full-width"
                  label="See More"
                ></q-btn>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { computed } from 'vue'

export default {
  setup () {
    const menuList = computed(() => {
      return [
        {
          title: 'MENU',
          subGroup: [
            {
              subTitle: 'Home',
              icon: 'r_home'
            },
            {
              subTitle: 'Discover',
              icon: 'r_search'
            },
            {
              subTitle: 'Award',
              icon: 'r_stars'
            },
            {
              subTitle: 'Recent',
              icon: 'r_schedule'
            }
          ]
        },
        {
          title: 'LIBRARY',
          subGroup: [
            {
              subTitle: 'Top Rated',
              icon: 'r_thumb_up'
            },
            {
              subTitle: 'Top 250',
              icon: 'r_star_rate'
            }
          ]
        },
        {
          title: 'CATEGORY',
          subGroup: [
            {
              subTitle: 'Movie',
              icon: 'r_movie'
            },
            {
              subTitle: 'TV Show',
              icon: 'r_tv'
            },
            {
              subTitle: 'Animate',
              icon: 'r_pets'
            }
          ]
        },
        {
          title: 'GENERAL',
          subGroup: [
            {
              subTitle: 'Settings',
              icon: 'r_settings'
            },
            {
              subTitle: 'Log Out',
              icon: 'r_logout'
            }
          ]
        }
      ]
    })

    const DUMMY_MOVIES = computed(() => {
      return [
        {
          title: 'Movie Title 1',
          summary: 'Movie Summary 1',
          ratingNumber: 4,
          image: 'https://placeimg.com/500/300/nature?t=1'
        },
        {
          title: 'Movie Title 2',
          summary: 'Movie Summary 2',
          ratingNumber: 5,
          image: 'https://placeimg.com/500/300/nature?t=1'
        },
        {
          title: 'Movie Title 2',
          summary: 'Movie Summary 2',
          ratingNumber: 2,
          image: 'https://placeimg.com/500/300/nature?t=1'
        }
      ]
    })

    return {
      menuList,
      DUMMY_MOVIES
    }
  }
}
</script>

<style lang="scss">
// $
@import 'src/css/app/theme';
</style>

<style lang="scss" scoped>
.menu-list {
  max-width: $app-list-max-width;
}
</style>
