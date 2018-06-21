import axios from 'axios'

const state = {
  groups: null
}

const mutations = {
  LOAD_GROUPS (state, data) {
    state.groups = data
  }
}

const actions = {
  loadGroups: ({commit}) => {
    return axios.get(process.env.API_ENDPOINT + process.env.API_VERSION + '/groups').then(res => {
      commit('LOAD_GROUPS', res.data)
    })
  },
  addGroup: ({dispatch}, data) => {
    console.log(data)
    return axios.post(process.env.API_ENDPOINT + process.env.API_VERSION + '/group', data).then(res => {
      dispatch('loadGroups')
    })
  },
  addSkill: ({dispatch}, data) => {
    return axios.post(process.env.API_ENDPOINT + process.env.API_VERSION + '/skill', data).then(res => {
      dispatch('loadGroups')
    })
  }
}

export default {
  state, mutations, actions
}