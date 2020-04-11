import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    user: {id: 'user_001', name: 'User 001'},
    categories: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community'],
    todos: [ 
            {
              id: 1, 
              desc:'Get the towel!',
              done: false 
            },
            {
              id: 2,
              desc: 'Feed the dogs!',
              done:true
            },
            {
              id: 3,
              desc: 'Buy milk!',
              done:true
            
          ]
  },
  getters: {
    categoriesLength: state =>{
      return state.categories.length
    },
    doneTodos : state=>{
      return state.todos.filter(todo=>todo.done)
    },
    activeTodosCount: (state,getters)=>{
      return state.todos.length - getters.doneTodos.length
    },
    getEventById:(state) => (id) => {
      return state.events.find(event.id===id)
    }
  },
  mutations: {
    INCREMENT_COUNT : (state,value) =>{
      state.count += value
    }
  },
  actions: {}
})
