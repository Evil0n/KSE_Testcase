import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Home from '../src/pages/Home'
import initStore from '../src/store/store'
import Vuetify from 'vuetify'
import ghUsersMock from '../mocks/ghUsersMock'

describe('Home.vue', () => {
  let actions
  let store
  let vuetify
  let wrapper
  let $router

  beforeEach(() => {
    const el = document.createElement('div')
    el.setAttribute('data-app', true)
    document.body.appendChild(el)

    const localVue = createLocalVue()
    localVue.use(Vuex)

    vuetify = new Vuetify()

    initStore.state = {
      loading: false,
      page: 1,
      perPage: 1,
      total: 2,
      users: ghUsersMock,
      profile: {},
      sort: 'repositories-desc',
      userSearch: '',
      lastQuery: undefined
    }

    actions = {
      getUsers: jest.fn()
    }

    store = new Vuex.Store({
      ...initStore,
      actions
    })

    $router = {
      push: jest.fn()
    }

    wrapper = mount(Home, {
      localVue,
      vuetify,
      store,
      mocks: { $router }
    })
  })

  it('Вызывает действие хранилища "getUsers" по смене направления сортировки', async () => {
    await wrapper.vm.$nextTick()
    wrapper.find('.v-select__selections').trigger('click')
    await wrapper.vm.$nextTick()
    wrapper.find('.v-list-item.v-list-item--link').trigger('click')
    expect(actions.getUsers).toHaveBeenCalled()
  })

  it('Ввод в поисковую строку вызывает "getUsers"', async () => {
    await wrapper.vm.$nextTick()
    const input = wrapper.find('.v-text-field__slot input')
    input.value = 'Github username'
    input.trigger('input')
    await wrapper.vm.$nextTick()
    expect(actions.getUsers).toHaveBeenCalled()
  })

  it('Переключение страницы вызывает "getUsers"', async () => {
    await wrapper.vm.$nextTick()
    wrapper.find('[aria-label="Goto Page 2"]').trigger('input')
    await wrapper.vm.$nextTick()
    expect(actions.getUsers).toHaveBeenCalled()
  })

  it('Клик по таблице открывает страницу пользователя', async () => {
    await wrapper.vm.$nextTick()
    wrapper.find('td').trigger('click')
    expect($router.push).toHaveBeenCalled()
  })
})
