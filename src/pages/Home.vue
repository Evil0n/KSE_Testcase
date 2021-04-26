<template>
  <div>
    <v-row>
      <v-select
        label="Сортировка по количеству репозиториев"
        :items="sortOptions"
        :value="sort"
        placeholder="Сортировка по репозиториям"
        item-value="value"
        item-text="label"
        @input="handleDirectionChange"
      />
      <v-text-field
        label="Поиск по пользователям"
        placeholder="Имя пользователя..."
        :value="userSearch"
        @input="handleUserSearchChange"
      />
    </v-row>

    <loader>
      <v-data-table
        :headers="headers"
        :items="users"
        hide-default-footer
        class="elevation-1"
        @click:row="handleRowClick"
      >
        <template #item.avatar_url="{ item }">
          <v-avatar class="my-2">
            <img
              :src="item.avatar_url"
              :alt="item.login"
            >
          </v-avatar>
        </template>
      </v-data-table>
    </loader>
    <v-row justify="center">
      <v-pagination
        class="mb-4"
        :value="page"
        :length="Math.ceil(total/perPage)"
        :total-visible="5"
        @input="handleCurrentChange"
      />
      <v-select
        class="ml-2"
        style="margin-top: -3px; max-width: 150px"
        label="Элементов на страницу"
        :items="[10, 20, 50, 100]"
        :value="perPage"
        @input="handleSizeChange"
      />
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import Loader from '../components/Loader'
import { throttle, debonce } from '../utils/throttleDebonce'

export default {
  name: 'Home',
  components: { Loader },
  data () {
    return {
      headers: [
        { text: 'Id', value: 'id', sortable: false },
        { text: 'Login', sortable: false, value: 'login' },
        { text: 'Avatar', value: 'avatar_url', sortable: false }
      ],
      sortOptions: [
        {
          value: 'repositories-asc',
          label: 'По возрастанию'
        },
        {
          value: 'repositories-desc',
          label: 'По убыванию'
        }
      ]
    }
  },
  computed: {
    ...mapState(['users', 'page', 'perPage', 'total', 'sort', 'userSearch']),
    searchThrottler () {
      return throttle(this.getUsers, 1000)
    },
    searchDeboncer () {
      return debonce(this.getUsers, 1000)
    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    ...mapActions(['getUsers']),
    ...mapMutations(['setPage', 'setPerPage', 'setSort', 'setUserSeach']),
    handleSizeChange (e) {
      this.setPage(1)
      this.setPerPage(e)
      this.getUsers()
    },
    handleCurrentChange (e) {
      this.setPage(e)
      this.getUsers()
    },
    handleDirectionChange (e) {
      this.setSort(e)
      this.getUsers()
    },
    handleUserSearchChange (e) {
      this.setUserSeach(e)
      this.searchThrottler()
      this.searchDeboncer()
    },
    handleRowClick (e) {
      this.$router.push(`/profile/${e.login}`)
    }
  }
}
</script>
