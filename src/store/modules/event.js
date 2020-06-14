import EventService from '@/services/EventService'

export const namespaced = true

export const state = {
    eventsTotal: 0,
    events: [],
    event:{}
}

export const mutations ={
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
}

export const actions = {
      createEvent({commit, dispatch},event){
        return EventService
              .postEvent(event)
              .then(()=>{
                commit('ADD_EVENT', event)  
                const notification ={
                  type: 'success',
                  message : 'Your event has been created!'
                }
                dispatch('notification/add', notification, {root: true})
              })
              .catch(error => {
                const notification = {
                  type : 'error',
                  message : 'There was a problem creating your event : ' + error.message
                }
                dispatch('notification/add', notification, { root : true })
                throw error
              })
      },
      fetchEvents({commit, dispatch}, {perPage, page}){
        EventService.getEvents(perPage, page)
          .then(response=>{
            commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']));
            commit('SET_EVENTS', response.data)
          })
          .catch(error=>{
            const notification = {
              type : 'error',
              message : 'There was a problem fetching events : ' + error.message
            }
            dispatch('notification/add', notification, { root : true })
          })
      },
      fetchEvent({commit,getters, dispatch}, id){
  
        var event = getters.getEventById(id)
  
        if(event){
          commit('SET_EVENT', event)
        }else{
          return EventService.getEvent(id)
          .then(response =>{
            commit('SET_EVENT', response.data)
          })
          .catch(error=>{
            const notification = {
              type : 'error',
              message : 'There was a problem fetching event : ' + error.message
            }
            dispatch('notification/add', notification, { root : true })
          })
        }
      }
}

export const getters = {
    categoriesLength: state => state.categories.length,
    doneTodos : state=> state.todos.filter(todo=>todo.done),
    activeTodosCount: (state,getters)=> state.todos.length - getters.doneTodos.length,
    getEventById:(state) => (id) => state.events.find(event => event.id===id)
}