<template>
  <div class="todos">
    <Add @add="fillTodos"/>
    <button @click="fillTodos">Add</button>
    <br>
    <button @click="delTodos">Delete</button>
    <div class="todo-items">
      <TodoItem
        :todo="todo"
        :key="todo.id"
        v-for="todo in todos"
        @delete="fillTodos"
        @editing="shouldPoll=false"
        @doneEditing="shouldPoll=true"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TodoItem from "@/components/TodoItem";
import Add from "@/components/Add";

export default {
  name: "todos",
  data() {
    return {
      todos: [],
      polling: null,
      shouldPoll: true
    };
  },
  created() {
    this.fillTodos();
    this.polling = setInterval(() => {
      if (this.shouldPoll) {
        this.fillTodos();
      }
    }, 10000);
  },
  destroyed() {
    clearInterval(this.polling);
  },
  methods: {
    fillTodos() {
      axios.get("http://localhost:3000/todos").then(res => {
        this.todos = res.data.map(e => {
          e.done = e.done === "true";
          return e;
        });
      });
    },
    delTodos() {
      let requests = this.todos.map(todo =>
        axios.delete(`http://localhost:3000/todos/${todo.id}`)
      );
      axios.all(requests).then(() => (this.todos = []));
    }
  },
  components: {
    TodoItem,
    Add
  }
};
</script>

<style scoped>
.todo-items {
  display: flex;
  width: 75vw;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: space-around;
  transition: cubic-bezier(0.075, 0.82, 0.165, 1);
}
</style>

