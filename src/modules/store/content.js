import axios from 'axios'
import _ from 'lodash'
import Auth from '../utils/auth'
import formatDate from '../utils/formatDate'

const state = {
  content: [],
  list: null
}

const mutations = {
  SET_PAGE_CONTENT (state, data) {
    _.each(data, (item) => {
      state.content = _.reject(state.content, (o) => {
        return o.page === item.page && o.section === item.section
      })
      state.content.push(item)
    })
  },
  LOAD_CONTENTS (state, data) {
    state.list = data
  }
}

const getters = {
  getSectionContent: state => (page, section) => {
    let item = _.find(state.content, (o) => {
      return o.page === page && o.section === section
    })
    if (item !== undefined) {
      return item.content
    }
  },
  getContentById: (state) => (id) => {
    let item = _.find(state.list, (o) => {
      return o._id === id
    })
    if (item !== undefined) {
      return item
    }
  },
  getContentFormattedList: (state) => () => {
    let list = _.flatMap(state.list, (item) => {
      return {
        _id: item._id,
        page: item.page,
        section: item.section,
        content: item.content,
        createdAt: formatDate(item.createdAt)
      }
    })
    return list
  }
}

const actions = {
  getContentList: ({commit, dispatch}) => {
    return axios.get(process.env.API_ENDPOINT + process.env.API_VERSION + '/contents').then(res => {
      commit('LOAD_CONTENTS', res.data)
      dispatch('hideLoading')
    })
  },
  getPageContents: ({commit, dispatch}, page) => {
    return axios.get(process.env.API_ENDPOINT + process.env.API_VERSION + '/contents/' + page).then(res => {
      commit('SET_PAGE_CONTENT', res.data)
      dispatch('hideLoading')
    })
  },
  addPageContent: ({dispatch}, data) => {
    dispatch('showLoading')
    return axios.post(process.env.API_ENDPOINT + process.env.API_VERSION + '/contents', data, {
      headers: Auth.getJWTAuthHeaders()
    }).then(res => {
      dispatch('getPageContents', data.page)
      dispatch('getContentList')
    })
  },
  editPageContent: ({dispatch}, data) => {
    dispatch('showLoading')
    return axios.put(process.env.API_ENDPOINT + process.env.API_VERSION + '/contents/' + data._id, data, {
      headers: Auth.getJWTAuthHeaders()
    }).then(res => {
      dispatch('getContentList')
    })
  },
  removePageContent: ({dispatch}, id) => {
    dispatch('showLoading')
    return axios.delete(process.env.API_ENDPOINT + process.env.API_VERSION + '/contents/' + id, {
      headers: Auth.getJWTAuthHeaders()
    }).then(res => {
      dispatch('getContentList')
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
