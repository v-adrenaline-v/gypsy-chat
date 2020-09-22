import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseURL: 'https://nane.tada.team/api',
    WS_URL: 'wss://nane.tada.team/ws?name=',
    settings: {
      max_username_length: 0,
      max_room_title_length: 0,
      max_message_length: 0
    },
    connection: null,
    newMessage: null,
    username: '',
    selected: '',
    rooms: [],
    history: []
  },
  getters: {
    humanDate: state => datetime => {
      return new Date(datetime).toGMTString().split(',')[1].slice(1, -7);
    },
    isRoom: state => name => {
      return state.rooms.some((room) => room.name == name);
    },
    getSelected: state => {
      return state.selected;
    },
    getNewMessage: state => {
      return state.newMessage;
    }
  },
  mutations: {
    setUsername: (state, username) => {
      state.username = username;
    },
    clearHistory: state => {
      state.history = [];
    },
    setServerSettings: (state, obj) => {
      state.settings = obj;
    },
    setListRooms: (state, data) => {
      state.rooms = data;
    },
    setRoomHistory: (state, data) => {
      state.history = data;
    },
    select: (state, name) => {
      state.selected = name;
    },
    unselect: (state) => {
      state.selected = '';
    },
    connect: (state, obj) => {
      state.connection = obj;
    },
    send: (state, data) => {
      state.connection.send(data);
    },
    receive: (state) => {
      state.connection.onmessage = (event) => {
        state.newMessage = JSON.parse(event.data);
      }
    },
    close: (state) => {
      state.connection.close();
    }
  },
  actions: {
    openConnection: ({ state, commit }) => {
      commit('connect', new WebSocket(state.WS_URL + state.username));
      commit('receive');
    },
    closeConnection: ({ commit }) => {
      commit('close');
    },
    getServerSettings: ({ state, commit }) => {
      axios.get(state.baseURL + '/settings')
        .then(response => {
          commit('setServerSettings', response.data.result);
        })
    },
    getListRooms: ({ state, commit }) => {
      axios.get(state.baseURL + '/rooms')
        .then(response => {
          commit('setListRooms', response.data.result);
        });
    },
    getRoomHistory: ({ state, commit }) => {
      axios.get(state.baseURL + `/rooms/${state.selected}/history`)
        .then(response => {
          commit('setRoomHistory', response.data.result);
        });
    }
  }
})
