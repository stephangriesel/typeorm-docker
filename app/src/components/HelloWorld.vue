<template>
  <div class="hello">
    <button @click="fetchData">Test!</button>
    <p v-if="user">{{ user }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data(){
    return {
      user: ""
    }
  },
  methods: {
    fetchData() {
      fetch('http://localhost:3050/users', {
        method: "GET",
      })
        .then((response) => {
          response.json().then((data) => {
            this.user = data[0].firstName; 
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
