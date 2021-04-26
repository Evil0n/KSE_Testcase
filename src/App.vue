<template>
  <v-app>
    <v-app-bar app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            <v-btn to="/">
              Главная
            </v-btn>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <v-footer app>
      <span>&copy; Evil0n {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
