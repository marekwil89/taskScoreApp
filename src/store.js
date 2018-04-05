import Vue from 'vue'
import Vuex from 'vuex'
// import {db} from './firebase';

import * as firebase from 'firebase'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        taskList: [],
        taskDetail: {},
        userList: [],
        // todoList: [],
        // todoDetail: {},
        logedUser: null,
        error: null,
        loading: false
    },
    getters: {
        loadTaskList: (state) => {
            return state.taskList
        },
        loadTaskDetail: (state) => {
            return state.taskDetail
        },
        loadUserList: (state) => {
            return state.userList
        },
        getError: (state) => {
            return state.error
        },
        getLoadingStatus: (state) => {
            return state.loading;
        },
        getLogedUser: (state) => {
            return state.logedUser
        }
    },
    mutations: {
        setTaskList (state, payload){
            state.taskList = payload
        },
        setTaskDetail (state, payload){
            state.taskDetail = payload
        },
        setUserList (state, payload){
            state.userList = payload
        },
        setUser (state, payload) {
            state.logedUser = payload
        },
        setError (state, payload) {
            state.error = payload
        },
        setLoading (state, payload) {
            state.loading = payload
        }
    },
    actions: {
        getTaskDetail: ({commit, getters}, payload) => {
            firebase.database().ref('/tasks/' + payload).once('value').then(function(data) {
                let task = {}
                const obj = data.val()
                task = {
                    id: payload,
                    title: obj.title,
                    text: obj.text,
                    author: obj.author,
                    evaluated: obj.evaluated
                }
                commit('setTaskDetail', task);
            });
        },
        getTaskList: ({commit, getters}) => {
            firebase.database().ref('/tasks/').once('value').then((data)=>{
                const tasks = [];
                const obj = data.val();

                for(let key in obj){

                    tasks.push({
                        id: key,
                        title: obj[key].title,
                        author: obj[key].author
                    })
                }
                commit('setTaskList', tasks); 
            })
        },
        togglePoint: ({commit, getters}, payload) => {
            let points = 0;

            firebase.database().ref('/tasks/' + payload.taskId + '/evaluated/' + payload.selectedUser.id ).once('value', (snapshot)=>{
                if(snapshot.val()){
                    console.log('Odejmuje plusa')
                    firebase.database().ref('tasks/' +  payload.taskId + '/evaluated/' + payload.selectedUser.id).remove();

                    firebase.database().ref('/users/' + payload.selectedUser.id ).once('value', (snapshot)=>{
                        points = snapshot.val().points -= 1;
        
                        firebase.database().ref('/users/' + payload.selectedUser.id ).update({points: points});
                    })

                    return false;
                }
                console.log('dodaje plusa')
                firebase.database().ref('/tasks/' + payload.taskId + '/evaluated/' + payload.selectedUser.id  ).set({email: payload.selectedUser.email });

                firebase.database().ref('/users/' + payload.selectedUser.id ).once('value', (snapshot)=>{
                    points = snapshot.val().points += 1;
    
                    firebase.database().ref('/users/' + payload.selectedUser.id ).update({points: points});
                })

            })
        },
        deleteTodo: ({commit, getters}, payload) => {
            // console.log(payload);
            // firebase.database().ref('todos/' + getters.getLogedUser.id).child(payload).remove();
        },
        setConfirmed: ({commit, getters}, payload) => {
            // firebase.database().ref('todos/' + getters.getLogedUser.id).child(payload.index).update({
            //     done: payload.done
            // });
        },
        addTask: ({commit, getters}, payload) => {
            firebase.database().ref('/tasks/').push({
                author: getters.getLogedUser,
                title: payload.title,
                text: payload.text,
                evaluated: [{
                    id: null
                }]
            })
            
            // .then((data) => {
            //     key = data.key
            //     return key
            // })
            // .then(key => {
            //     const filename = payload.image.name
            //     const ext = filename.slice(filename.lastIndexOf('.'))
            //     return firebase.storage().ref('todos/' + key + '.' + ext).put(payload.image)
            // })
            // .then(fileData => {
            //     return firebase.database().ref('todos/' + getters.getLogedUser.id).child(key).update({imageUrl: fileData.metadata.downloadURLs[0]})
            // })
        },
        getUserList: ({commit, getters}) => {
            firebase.database().ref('/users/').once('value').then((data)=>{
                commit('setUserList', data.val()); 
            })
        },

        autoSignIn: ({commit}, user) => {
            const logedUser = {
                email: user.email,
                photoURL: user.photoURL,
                id: user.uid
            }
            commit('setUser', logedUser)
        },
        logout: ({commit}) => {
            firebase.auth().signOut();
            commit('setUser', null);
        },
        registerUser: ({commit}, newUser) => {
            commit('setLoading', true);
            firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then((user) => {
                commit('setLoading', false);

                firebase.database().ref('/users/' + user.uid).set({
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: user.email,
                    id: user.uid,
                    points: 0
                })
            })
            .catch((error) => {
                commit('setLoading', false);
                commit('setError', error);
            })
        },
        loginUser: ({commit}, user) => {
            commit('setLoading', true);
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((user) => {
                commit('setLoading', false);
                commit('setError', null);
            })
            .catch((error) => {
                commit('setLoading', false);
                commit('setError', error);
            })
        },
        updateAvatar: ({commit, getters}, payload) => {
            // commit('setLoading', true);
            // const filename = payload.name
            // const ext = filename.slice(filename.lastIndexOf('.'))

            // firebase.storage().ref('users/' + getters.getLogedUser.id + '.' + ext).put(payload)
            // .then((fileData)=> {
            //     firebase.auth().currentUser.updateProfile({
            //         photoURL: fileData.metadata.downloadURLs[0]
            //     }).then(()=>{
            //         commit('setUser', {...getters.getLogedUser, photoURL: firebase.auth().currentUser.photoURL})
            //         commit('setLoading', false);
            //     })
            // });
        }
    }
})

export default {
    store: store
}