<template>
  <v-row
    align="center"
    justify="center"
    class="my-4"
    style="min-height: calc(100vh - 200px)"
  >
    <v-progress-circular
      v-if="loading"
      :size="50"
      color="amber"
      indeterminate
    />
    <slot v-else />
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Loader',
  computed: {
    ...mapState(['loading'])
  }
}
</script>
