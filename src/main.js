// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import firebaseInit from './firebase';
import * as firebase from 'firebase'
import App from './App'
import Vuetify from 'vuetify'
import('../node_modules/vuetify/dist/vuetify.min.css');
import NaviBar from './components/NaviBar.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
 
Vue.use(Vuetify)

Vue.component('navigation', NaviBar);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created (){
    firebase.initializeApp(firebaseInit),
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.$store.store.dispatch('autoSignIn', user);
        this.$router.push('/')
      } else{
        this.$router.push('/login')
      }
    })
  }
})
