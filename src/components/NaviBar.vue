<template>
  <v-toolbar dark color="pink">
    <v-toolbar-title v-if="logedUser">{{logedUser.email}}</v-toolbar-title>
    <v-spacer></v-spacer>
    
    <!-- <v-btn icon to="/login" flat><v-icon>Logowanie</v-icon></v-btn> -->
    <v-btn v-if="!logedUser" dark to="/login" flat>Zaloguj się</v-btn>
    <v-btn v-if="logedUser" dark to="/total" flat>Podsumowanie</v-btn>
    <v-btn v-if="!logedUser" dark to="/register" flat>Zarejestruj się</v-btn>
    <v-btn v-if="logedUser" dark to="/task-list" flat>Lista tasków</v-btn>
    <v-btn v-if="logedUser" dark @click="onLogout()" flat>Wyloguj się</v-btn>
    <!-- <v-btn icon v-if="logedUser" flat><v-icon to="/profile">power_settings_new</v-icon></v-btn> -->
    <!-- <v-btn icon v-if="logedUser" to="/profile" flat><v-icon v-if="logedUser" to="/profile">portrait</v-icon></v-btn>
    <v-btn icon v-if="logedUser" to="/" flat><v-icon v-if="logedUser" to="/profile">list</v-icon></v-btn>
    <v-btn icon v-if="logedUser" @click="onLogout()" flat><v-icon v-if="logedUser" to="/profile">power_settings_new</v-icon></v-btn>
    <v-btn v-if="!logedUser" to="/register" flat>Sign up</v-btn>
    <v-btn v-if="!logedUser" to="/login" flat>Sign in</v-btn> -->
  </v-toolbar>
</template>

<script>
export default {
  name: 'NaviBar',
  data(){
    return{
      valid: false
    }
  },    
  methods: {
    onLogout(){
      this.$router.push('/login')
      this.$store.store.dispatch('logout');
    }
  },
  computed: {
    logedUser(){
      return this.$store.store.getters.getLogedUser;
    }
  }
}
</script>

<style scoped>
</style>