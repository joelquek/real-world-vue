import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    eventsTotal: 0,
    events: [],
    event:{},
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
            }
          ]
  },
  getters: {
    categoriesLength: state => state.categories.length,
    doneTodos : state=> state.todos.filter(todo=>todo.done),
    activeTodosCount: (state,getters)=> state.todos.length - getters.doneTodos.length,
    getEventById:(state) => (id) => state.events.find(event => event.id===id)
  },
  mutations: {
    INCREMENT_COUNT : (state,value) =>{
      state.count += value
    },
    ADD_EVENT(state,event){
      state.events.push(event)
    },
    SET_EVENTS(state,events){
      state.events = events
    },
    SET_EVENTS_TOTAL(state,value){
      state.eventsTotal = value
    },
    SET_EVENT(state,event){
      state.event = event
    }
  },
  actions: {
    updateCount({state,commit}, incrementBy){
      if(state.user){
        commit('INCREMENT_COUNT',incrementBy)
      }
    },
    createEvent({commit},event){
      return EventService
            .postEvent(event)
            .then(()=>{
              commit('ADD_EVENT', event.data)  
            })
    },
    fetchEvents({commit}, {perPage, page}){
      EventService.getEvents(perPage, page)
        .then(response=>{
          commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']));
          commit('SET_EVENTS', response.data)
        })
        .catch(error=>{
          console.log('There was an error: ', error.response)
        })
    },
    fetchEvent({commit,getters}, id){

      var event = getters.getEventById(id)

      if(event){
        commit('SET_EVENT', event)
      }else{
        EventService.getEvent(id)
        .then(response =>{
          commit('SET_EVENT', response.data)
        })
        .catch(error=>{
          console.log('There was an error: ', error.response)
        })
      }
    }
  }
})
