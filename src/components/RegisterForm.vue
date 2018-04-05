<template>
  <v-container>
    <v-layout style="height: 70vh" row wrap justify-center align-center>
      <v-flex xs12 sm4>
        <v-form class="register-form" v-model="valid" @submit.prevent="onSubmit()">
          <h3 class="display-1">Rejestracja</h3>
          
          <br>
          <v-text-field label="Imię" v-model="newUser.firstName" :rules="textRules" required></v-text-field>
          <v-text-field label="Nazwisko" v-model="newUser.lastName" :rules="textRules" required></v-text-field>
          <v-text-field label="E-mail" v-model="newUser.email" :rules="emailRules" required></v-text-field>
          <v-text-field label="Hasło" v-model="newUser.password" type="password" :rules="passwordRules" required></v-text-field>

          
          <v-alert v-if="error" color="error" value="true">{{error.message}}</v-alert>
          
          <br>
          <v-btn block color="primary" type="submit" :loading="loading" :disabled="!valid || loading">Sign up</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'RegisterForm',
  data(){
    return{
      valid: false,
      newUser: {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
      },
      emailRules: [
        (v) => !!v || 'Email jest wymagany',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'To nie jest email'
      ],
      passwordRules: [
        (v) => !!v || 'Hasło jest wymagane'
      ],
      textRules: [
        (v) => !!v || 'To pole jest wymagane'
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
    },
  },
  methods: {
    onSubmit(){
      this.$store.store.dispatch('registerUser', this.newUser)
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
}
</script>

<style scoped>
    .display-3{
        text-align: center;
    }

    .register-form{
        padding: 20px;
    }

</style>