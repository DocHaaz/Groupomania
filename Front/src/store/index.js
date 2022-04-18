import { createStore } from 'vuex'

const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:3000/api/'
})

let user = localStorage.getItem('user')
if (!user) {
  user = {
    id: -1,
    token: '',
  }
} else {
  try {
    user = JSON.parse(user)
    instance.defaults.headers.common = {'Authorization': `bearer ${user.token}`}
  }
  catch {
    user = {
      id: -1,
      token: '',
    }
  }
}

export default createStore({
  state: {
    status: "",
    user: user,
    userData: {
      id: '',
      Lastname: '',
      Firstname: '',
      email: '',
      password: ''
    },
  },
  getters: {
  },
  mutations: {
    setStatus: (state, status) => {
      state.status = status;
    },
    logUser: (state, user) => {
      instance.defaults.headers.common = {'Authorization': `bearer ${user.token}`}
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user;
    },
    logoff: (state) => {
      state.user = {
        id: -1,
        token: '',
      }
      localStorage.removeItem('user')
    },
    userData: (state, userData) => {
      state.userData = userData;
    },
    usersData: (state, usersData) => {
      state.usersData = usersData;
    },
    postData: (state, postData) => {
      state.postData = postData
    },
    postsData: (state, postsData) => {
      state.postsData = postsData
    },
    messageData: (state, messageData) => {
      state.messageData = messageData
    },
    messagesData: (state, messagesData) => {
      state.messagesData = messagesData
    }
  },
  actions: {
    createAccount: ({commit}, user) => {
      return new Promise((resolve, reject) => {
        instance.post('user/signup', user)
          .then(res => {
            commit('logUser', res.data);
            commit('setStatus', 'login');
            resolve(res)
          })
          .catch(error => {
            commit('setStatus', 'error_create');
            reject(error)
          })
      })
    },
    loginAccount: ({commit}, user) => {
      return new Promise((resolve, reject) => {
        instance.post('user/login', user)
        .then(res => {
          commit('logUser', res.data);
          commit('setStatus', 'login');
          resolve(res)
        })
        .catch(error => {
          commit('setStatus', 'error_login');
          reject(error)
        })
      })
    },
    getAllUserData: ({commit}) => {
      instance.get('/user')
      .then(res => {
        commit('usersData', res.data)
      })
      .catch(error => console.log(error))
    },
    getUserData: ({commit}) => {
      const userData = JSON.parse(localStorage.getItem('user', user))
      const url = `/user/${userData.userId}`
      instance.get(url)
      .then(res => {
        commit('userData', res.data)
      })
      .catch(error => console.log(error))
    },
    modifyAccount: ({commit}, user) => {
      return new Promise((resolve, reject) => {
        const userData = JSON.parse(localStorage.getItem('user', user))
        const url = `/user/${userData.userId}`
        instance.put(url, user)
        .then(res => {
          commit('userData', res.data)
          resolve(res)
        })
        .catch(error => {
          commit('setStatus', 'error_login');
          reject(error)
        })
      })
    },
    deleteAccount: ({commit}, id) => {
      instance.delete(`/user/`+ id.id)
      .then(res => {
        console.log(res)
        commit()
      })
      .catch(error => console.log(error))
    },
    createPost: ({commit}, post) => {
      return new Promise((resolve, reject) => {
        instance.post('post', post)
          .then(res => {
            commit('postData', res.data);
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getPostData: ({commit}) => {
      instance.get('post')
      .then(res => {
        console.log(res.data)
        commit('postsData', res.data)
      })
      .catch(error => console.log(error))
    },
    getOnePost: ({commit}, id) => {
      return new Promise((resolve, reject) => {
      instance.get('post/'+ id.id)
      .then(res => {
        console.log(res.data)
        resolve(res.data)
        commit('postData', res.data)
      })
      .catch(error => reject(error))
    })
    },
    modifyPost: ({commit}, post) => {
      return new Promise((resolve, reject) => {
        instance.put('post/'+ post.id, post)
        .then(res => {
          commit('postData', res.data)
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    deletePost: ({commit}, id) => {
      instance.delete(`/post/`+ id.id)
      .then(res => {
        console.log(res)
        commit
      })
      .catch(error => console.log(error))
    },
    createMessage: ({commit}, message) => {
      return new Promise((resolve, reject) => {
        instance.post('post/message', message)
          .then(res => {
            commit('messageData', res.data);
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getMessageData: ({commit}, id) => {
      return new Promise((resolve, reject) => {
      instance.get('post/message/'+ id.id)
      .then(res => {
        console.log(res.data)
        resolve(res.data)
        commit('messagesData', res.data)
      })
      .catch(error => reject(error))
    })
  },
  modifyMessage: ({commit}, message) => {
    return new Promise((resolve, reject) => {
      instance.put('post/message/'+ message.id, message)
      .then(res => {
        commit('messageData', res.data)
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
    })
  },
    deleteMessage: ({commit}, id) => {
      instance.delete(`/post/message/`+ id.id)
      .then(res => {
        console.log(res)
        commit
      })
      .catch(error => console.log(error))
    },
  },
  modules: {
  }
})
