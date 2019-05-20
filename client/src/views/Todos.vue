<template>
  <div class="todos">
    <TodoItem :todo="todo" :key="todo.id" v-for="todo in todos"/>
  </div>
</template>

<script>
import axios from "axios";
import TodoItem from "@/components/TodoItem";

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
  },
  components: {
    TodoItem
  }
};
</script>

<style scoped>
.todos {
  display: flex;
  width: 75vw;
  margin: 0 auto;
}
</style>

