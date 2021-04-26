import { isEquivalentObjects } from '../utils/isEquivalentObjects'

export default {
  state: () => ({
    loading: false,
    page: 1,
    perPage: 10,
    total: 0,
    users: [],
    profile: {},
    sort: 'repositories-desc',
    userSearch: '',
    lastQuery: undefined
  }),
  mutations: {
    setUsers (state, users) {
      this.$set(state, 'users', users)
    },
    setProfile (state, profile) {
      this.$set(state, 'profile', profile)
    },
    setTotal (state, total) {
      state.total = total
    },
    setPage (state, page) {
      state.page = page
    },
    setSort (state, sort) {
      state.sort = sort
    },
    setUserSeach (state, userSearch) {
      state.userSearch = userSearch
    },
    setLastQuery (state, lastQuery) {
      state.lastQuery = lastQuery
    },
    setPerPage (state, perPage) {
      state.perPage = perPage
    },
    setLoading (state, loading) {
      state.loading = !!loading
    }
  },
  actions: {
    async getUsers ({ commit, state }, payload) {
      commit('setLoading', true)
      const params = {
        page: state.page,
        q: `type:user sort:${state.sort} ${state.userSearch} in:user`,
        per_page: state.perPage
      }
      if (!state.lastQuery || !isEquivalentObjects(params, state.lastQuery)) {
        const { data } = await this.$http.get('https://api.github.com/search/users', { params })

        commit('setUsers', data.items)
        commit('setLastQuery', params)
        commit('setTotal', data.total_count)
      }
      commit('setLoading', false)
    },

    async getProfile ({ commit, state }, login) {
      commit('setLoading', true)

      const { data } = await this.$http.get(`https://api.github.com/users/${login}`)

      commit('setProfile', data)
      commit('setLoading', false)
    }
  }
}
