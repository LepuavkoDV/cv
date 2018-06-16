import axios from 'axios'

const state = {
  achievements: null
}

const mutations = {
  LOAD_ACHIEVEMENTS (state, data) {
    state.achievements = data
  }
}

const actions = {
  loadAchievements: ({commit}) => {
    return axios.get(process.env.API_ENDPOINT + '/api/v1/achievements').then(res => {
      commit('LOAD_ACHIEVEMENTS', res.data)
    })
  },
  addAchievement: ({dispatch}, data) => {
    return axios.post(process.env.API_ENDPOINT + '/api/v1/achievement', data).then(res => {
      dispatch('loadAchievements')
    })
  }
}

export default {
  state, mutations, actions
}