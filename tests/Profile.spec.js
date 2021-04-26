import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Profile from '../src/pages/Profile'
import initStore from '../src/store/store'
import Vuetify from 'vuetify'
import ghUserProfileMock from '../mocks/ghUserProfileMock'

describe('Profile.vue', () => {
  let actions
  let store
  let vuetify
  let wrapper
  let $route

  beforeEach(() => {
    const el = document.createElement('div')
    el.setAttribute('data-app', true)
    document.body.appendChild(el)

    const localVue = createLocalVue()
    localVue.use(Vuex)

    $route = {
      params: {
        login: ghUserProfileMock.login
      }
    }

    vuetify = new Vuetify()

    initStore.state = {
      loading: false,
      profile: ghUserProfileMock
    }

    actions = {
      getProfile: jest.fn()
    }

    store = new Vuex.Store({
      ...initStore,
      actions
    })

    wrapper = mount(Profile, {
      localVue,
      vuetify,
      store,
      mocks: {
        $route
      }
    })
  })

  it('Страница профиля отрисовывается', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.v-list-item__title')).toBeDefined()
  })
})
