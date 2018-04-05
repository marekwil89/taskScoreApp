<template>
  <v-container >
    <v-layout row wrap justify-center>
      <v-flex sm6>
        <v-card>
          <v-toolbar color="pink" dark>
            <v-toolbar-title>{{taskDetail.title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title>{{taskDetail.author.email}}</v-toolbar-title>
          </v-toolbar>    
          <v-card-title primary-title>
            <h3>Opis taska:</h3>
          </v-card-title>
          <v-card-title>
            <p>{{taskDetail.text}}</p>
          </v-card-title>
          <hr>
          <v-list >
            <v-list-tile v-if="logedUser.email !== user.email && logedUser.email === taskDetail.author.email" v-for="user in userList" @click="togglePoint(taskDetail.id, user)" :key="user.id">
              <v-list-tile-content>
                <v-list-tile-title>{{ user.firstName }} {{user.lastName}} ({{user.email}})</v-list-tile-title>
              </v-list-tile-content>
            <v-subheader >Kliknij aby dodać gwiazdkę gwiazdkę</v-subheader>
              <v-list-tile-action>
                <v-icon v-if="!checkEvaluated(user)" color="grey lighten-1">star_border</v-icon>
                <v-icon v-if="checkEvaluated(user)" color="yellow darken-2">star</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
          <v-card-actions>
            <br>
            <v-btn color="pink" dark :to="'/task-list'">
              Cofnij
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'TaskDetail',
  data(){
    return{
      valid: false,
      selectedUser: null
    }
  },
  computed: {
    taskDetail(){
      var paramId = this.$route.params.id;
      this.$store.store.dispatch('getTaskDetail', paramId);
      return this.$store.store.getters.loadTaskDetail;
    },
    userList(){
        this.$store.store.dispatch('getUserList');
        return this.$store.store.getters.loadUserList
    },
    logedUser(){
      return this.$store.store.getters.getLogedUser;
    }
  },
  methods: {
    togglePoint(taskId, user){
      this.selectedUser = user;
      this.$store.store.dispatch('togglePoint', {
        taskId: taskId,
        selectedUser: this.selectedUser
      });
    },
    // removePoint()
    checkEvaluated(user){
      let evaluated = [];

      for(let key in this.taskDetail.evaluated){
        evaluated.push({
            id: key,
            email: this.taskDetail.evaluated[key].email
        })
      }

      return evaluated.some(e => e.email === user.email)
    }
    // onConfirmed(index, done){
    //   this.$store.store.dispatch('setConfirmed', {index, done});
    // }
  }
}
</script>

<style>
</style>