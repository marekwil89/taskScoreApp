<template>
  <v-container>

    <v-layout row wrap justify-center>
      <v-flex sm6>
        <v-card>
          <v-toolbar color="pink" dark>
            <v-toolbar-title>Podsumowanie</v-toolbar-title>
          </v-toolbar>
          <v-list>
            <v-list-tile  avatar v-for="user in userList" v-bind:key="user.id">
              <v-list-tile-content>
                <v-list-tile-title>Użytkownik: {{user.firstName}} {{user.lastName}}</v-list-tile-title>
                <!-- <v-list-tile-title>Author: {{task.author.email}}</v-list-tile-title> -->
              </v-list-tile-content>
              <v-list-tile-action class="hidden-sm-and-down">
                <!-- <v-btn icon @click="onDelete(task.id)">
                  <v-icon color="grey lighten-1">delete</v-icon>
                </v-btn> -->
              </v-list-tile-action>
              <v-list-tile-action>
                Punkty: {{user.points}}
                <!-- <v-btn icon :to="`/task/${user.id}`"> -->
                  <!-- <v-icon color="grey lighten-1">send</v-icon> -->
                <!-- </v-btn> -->
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Total',
  data(){
    return{

    }
  },
  computed: {
    // loading(){
    //   return this.$store.store.getters.getLoadingStatus;
    // },
    // error(){
    //   return this.$store.store.getters.getError;
    // },
    userList(){
      this.$store.store.dispatch('getUserList');
      return this.$store.store.getters.loadUserList;
    },
    // logedUser(){
    //   return this.$store.store.getters.getLogedUser;
    // }
  },
  methods: {

  }
}
</script>

<style>
</style>