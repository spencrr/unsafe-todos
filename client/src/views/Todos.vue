<template>
  <div class="todos">
    <ul>
      <li :key="todo.id" v-for="todo in todos">{{todo.name}}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "todos",
  data() {
    return {
      todos: []
    };
  },
  created() {
    axios
      .get("http://localhost:3000/todos", {
        headers: { "Access-Control-Allow-Origin": "*" }
      })
      .then(res => {
        this.todos = res.data;
      });
  }
};
</script>
