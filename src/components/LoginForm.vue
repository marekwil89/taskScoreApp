<template>
  <v-container>
    <v-layout style="height: 70vh" row wrap justify-center align-center>
      <v-flex xs12 sm4>
        <v-form class="login-form" v-model="valid" @submit.prevent="onSubmit()">
          <h3 class="display-1">Zaloguj się</h3>
          
          <br>

          <v-text-field label="Email" v-model="user.email" :rules="emailRules" required></v-text-field>
          <v-text-field label="Hasło" v-model="user.password" type="password" :rules="passwordRules" required></v-text-field>
          <v-alert v-if="error" color="error" value="true">{{error.message}}</v-alert>
          
          <br>
          
          <v-btn block color="primary" type="submit" :loading="loading" :disabled="!valid || loading">Zaloguj się</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'LoginForm',
  data(){
    return{
      valid: false,
      user: {
        email: '',
        password: ''
      },
      emailRules: [
        (v) => !!v || 'Email jest wymagany',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'To nie jest email'
      ],
      passwordRules: [
        (v) => !!v || 'Hasło jest wymagane'
      ],
    }
  },
  computed: {
    loading(){
        return this.$store.store.getters.getLoadingStatus;
    },
    error(){
        return this.$store.store.getters.getError;
    },
    logedUser(){
    //   return this.$store.store.getters.getLogedUser;
    }
  },
  watch: {
    // logedUser (value) {
    //   if (!value) {
    //     this.$router.push('/login')
    //     }
    //   else{
    //     this.$router.push('/')
    //   }
    // }
  },
  methods: {
    onSubmit(){
      this.$store.store.dispatch('loginUser', this.user);
    }
  }
}
</script>

<style scoped>
    .login-form{
        padding: 20px;
    }
</style>