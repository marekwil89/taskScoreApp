<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex sm8>
        <v-btn color="pink" dark @click.stop="addTaskModal = true">Dodaj task</v-btn>
      </v-flex>
    </v-layout>

    <v-dialog v-model="addTaskModal" max-width="600px">
      <v-card>
        <v-toolbar color="pink" dark>
          <v-toolbar-title>Dodaj task</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
        <v-form v-model="valid" @submit.prevent="onSubmit()">
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field label="Tytuł taska" v-model="newTask.title" :rules="textRules" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field :textarea=true label="Opis taska" v-model="newTask.text" :rules="textRules" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <br>
              <v-btn block @click.stop="addTaskModal=false" color="primary" type="submit" :loading="loading" :disabled="!valid || loading">Dodaj</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="addTaskModal=false">Zamknij</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <br>

    <v-layout v-if="!taskList.length" row wrap justify-center>
      <v-flex sm8>
        <h2>Nikt nie dodał jescze taska</h2>
      </v-flex>
    </v-layout>

    <v-layout v-if="taskList.length > 0" row wrap justify-center>
      <v-flex sm8>
        <v-card>
          <v-toolbar color="pink" dark>
            <v-toolbar-title>Lista tasków</v-toolbar-title>
          </v-toolbar>
          <v-list>
            <v-list-tile  avatar v-for="task in taskList" v-bind:key="task.id">
              <v-list-tile-content>
                <v-list-tile-title>Tytuł: {{task.title}}</v-list-tile-title>
                <v-list-tile-title>Author: {{task.author.email}}</v-list-tile-title>
              </v-list-tile-content>
              <!-- <v-list-tile-action class="hidden-sm-and-down">
                <v-btn icon @click="onDelete(task.id)">
                  <v-icon color="grey lighten-1">delete</v-icon>
                </v-btn>
              </v-list-tile-action> -->
              <v-list-tile-action>
                <v-btn icon :to="`/task/${task.id}`">
                  <v-icon color="grey lighten-1">send</v-icon>
                </v-btn>
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
  name: 'TaskList',
  data(){
    return{
      addTaskModal: false,
      valid: false,
      newTask: {
        title: '',
        author: ''
      },
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
    taskList(){
      this.$store.store.dispatch('getTaskList');
      return this.$store.store.getters.loadTaskList;
    },
    logedUser(){
      return this.$store.store.getters.getLogedUser;
    }
  },
  methods: {
    onSubmit(){
      this.$store.store.dispatch('addTask', this.newTask);
    },
    onDelete(id){
      // this.$store.store.dispatch('deleteTodo', id);
    },
    // onPickFile () {
    //   this.$refs.fileInput.click()
    // },
    // onFilePicked (event) {
    //   const files = event.target.files
    //   let filename = files[0].name
    //   if (filename.lastIndexOf('.') <= 0) {
    //     return alert('Please add a valid file!')
    //   }
    //   const fileReader = new FileReader()
    //   fileReader.addEventListener('load', () => {
    //     this.imageUrl = fileReader.result
    //   })
    //   fileReader.readAsDataURL(files[0])
    //   this.newTodo.image = files[0]
    // }
  }
}
</script>

<style>
</style>