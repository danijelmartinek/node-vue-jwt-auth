import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: null,
        userEmails: []
    },
    mutations: {
        authUser(state) {
            if(!state.user){
                axios.get("/api/auth")
                .then(res => {
                    if(res.data.success == true){
                        state.user = res.data.userData
                    }
                })
            }
        },
        logoutUser(state) {
            axios.get("/api/logout")
            .then(res => {
                if(res.data.success == true){
                    state.user = null
                }
            })
        },
        getEmails(state) {
            axios.get("/api/emails")
            .then(res => {
                if(res.data.success == true){
                    state.userEmails = res.data.userEmails
                }
            })
        }
    }
});