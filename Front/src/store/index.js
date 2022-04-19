import { createStore } from 'vuex'

// Importation de axios
const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:3000/api/'
})

// Gestion du state de user
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
    // gestion du status
    setStatus: (state, status) => {
      state.status = status;
    },
    // gestion de la connexion 
    logUser: (state, user) => {
      instance.defaults.headers.common = {'Authorization': `bearer ${user.token}`}
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user;
    },
    // gestion de la déconnexion 
    logoff: (state) => {
      state.user = {
        id: -1,
        token: '',
      }
      localStorage.removeItem('user')
    },
    // gestion des données d'un utilisateur
    userData: (state, userData) => {
      state.userData = userData;
    },
    // gestion des données des utilisateurs
    usersData: (state, usersData) => {
      state.usersData = usersData;
    },
    // gestion des données d'un post
    postData: (state, postData) => {
      state.postData = postData
    },
    // gestion des données des posts
    postsData: (state, postsData) => {
      state.postsData = postsData
    },
    // gestion des données d'un message
    messageData: (state, messageData) => {
      state.messageData = messageData
    },
    // gestion des données des messages
    messagesData: (state, messagesData) => {
      state.messagesData = messagesData
    }
  },
  actions: {
    // appel api création de compte
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
    // appel api connexion au compte
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
    // appel api données des utilisateurs
    getAllUserData: ({commit}) => {
      instance.get('/user')
      .then(res => {
        commit('usersData', res.data)
      })
      .catch(error => console.log(error))
    },
    // appel api données d'un utilisateur
    getUserData: ({commit}) => {
      const userData = JSON.parse(localStorage.getItem('user', user))
      const url = `/user/${userData.userId}`
      instance.get(url)
      .then(res => {
        commit('userData', res.data)
      })
      .catch(error => console.log(error))
    },
    // appel api modification d'un utilisateur
    modifyAccount: ({commit}, user) => {
      return new Promise((resolve, reject) => {
        const userData = JSON.parse(localStorage.getItem('user', user))
        const url = `/user/${userData.userId}`
        instance.put(url, user)
        .then(res => {
          if(!res.data.message) {
            commit('userData', res.data)
          } else {
            commit
          }
          resolve(res)
        })
        .catch(error => {
          commit('setStatus', 'error_modifyAccount');
          reject(error)
        })
      })
    },
    // appel api suppression d'un utilisateur ainsi que ces posts/messages
    deleteAccount: ({commit}, id) => {
      instance.delete(`/user/`+ id.id)
      .then(res => {
        console.log(res)
        commit
      })
      .catch(error => console.log(error))
    },
    // appel api création d'un post'
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
    // appel api données sur les posts
    getPostData: ({commit}) => {
      instance.get('post')
      .then(res => {
        commit('postsData', res.data)
      })
      .catch(error => console.log(error))
    },
    // appel api données sur un post
    getOnePost: ({commit}, id) => {
      return new Promise((resolve, reject) => {
      instance.get('post/'+ id.id)
      .then(res => {
        resolve(res.data)
        commit('postData', res.data)
      })
      .catch(error => reject(error))
    })
    },
    // appel api modification d'un post
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
    // appel api suppression d'un post
    deletePost: ({commit}, id) => {
      instance.delete(`/post/`+ id.id)
      .then(res => {
        console.log(res)
        commit
      })
      .catch(error => console.log(error))
    },
    // appel api création d'un message
    createMessage: ({commit}, message) => {
      return new Promise((resolve, reject) => {
        instance.post('post/message', message)
          .then(res => {
            commit('messageData', res.data);
            console.log(res.data)
            resolve(res)  
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // appel api données des messages
    getMessageData: ({commit}, id) => {
      return new Promise((resolve, reject) => {
      instance.get('post/message/'+ id.id)
      .then(res => {
        resolve(res.data)
        commit('messagesData', res.data)
      })
      .catch(error => reject(error))
    })
  },
  // appel api modification d'un message
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
  // appel api suppression d'un message
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
