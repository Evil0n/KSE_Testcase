<template>
  <div class="wrapper">
    <loader>
      <div class="centralisation">
        <v-card
          class="mx-auto"
          dark
          max-width="400"
        >
          <v-card-title>
            <span class="title font-weight-light"> {{ profile.name }} </span>
          </v-card-title>

          <v-card-text class="headline font-weight-bold">
            {{ profile.name }} (<a :href="profile.html_url">{{ profile.login }}</a>)
          </v-card-text>

          <v-card-actions>
            <v-list-item class="grow width-fix-for-ie">
              <v-list-item-avatar color="grey darken-3">
                <v-img
                  class="elevation-6"
                  :alt="profile.login"
                  :src="profile.avatar_url"
                />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ profile.login }}</v-list-item-title>
              </v-list-item-content>

              <v-row
                align="center"
                justify="end"
              >
                <v-icon class="mr-1">
                  mdi-git
                </v-icon>
                <span class="subheading mr-2">{{ profile.public_repos }}</span>
                <span class="mr-1">·</span>
                <v-icon class="mr-1">
                  mdi-github
                </v-icon>
                <span class="subheading">{{ profile.public_gists }}</span>
                <span class="mr-1">·</span>
                <v-icon class="mr-1">
                  mdi-account-heart
                </v-icon>
                <span class="subheading">{{ profile.followers }}</span>
                <span class="mr-1">·</span>
                <v-icon class="mr-1">
                  mdi-hand-heart
                </v-icon>
                <span class="subheading">{{ profile.following }}</span>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </div>
    </loader>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Loader from '../components/Loader'
export default {
  name: 'Profile',
  components: { Loader },
  computed: {
    ...mapState(['profile'])
  },
  created () {
    this.getProfile(this.$route.params.login)
  },
  methods: {
    ...mapActions(['getProfile'])
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
}

.centralisation {
  justify-content:center;
}

.width-fix-for-ie {
  max-width: 100%;
  min-width: 360px;
}
</style>
