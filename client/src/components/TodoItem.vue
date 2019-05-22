<template>
  <div class="todo-item">
    <label for="done">Done</label>
    <input name="done" type="checkbox" :checked="todo.done" v-model="todo.done" @change="update">
    <div :class="{done: todo.done}" class="todo-item-info">
      <input
        class="todo-item-title"
        @blur="update"
        @keydown.enter="update"
        v-model="todo.name"
        @focus="editing"
      >
      <input
        class="todo-item-desc"
        @blur="update"
        @keydown.enter="update"
        v-model="todo.desc"
        @focus="editing"
      >
    </div>
    <label for="delete">Delete</label>
    <input type="checkbox" name="delete" @click="setDeleted">
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "todoItem",
  props: ["todo"],
  methods: {
    update() {
      axios.patch(`http://localhost:3000/todos/${this.todo.id}`, this.todo);
      this.$emit("doneEditing");
    },
    setDeleted() {
      axios.delete(`http://localhost:3000/todos/${this.todo.id}`).then(() => {
        this.$emit("delete");
      });
    },
    editing() {
      this.$emit("editing");
    }
  }
};
</script>
 
<style>
.todo-item {
  width: 25vw;
  margin: 5px;
  border-radius: 10px;
  background-image: linear-gradient(to bottom right, #e839ff7e, #ffc4007e);
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.05);
  padding: 20px;
}
.todo-item-title,
.todo-item-desc {
  background: none;
  border: none;
  text-align: center;
  text-decoration: inherit;
}

.todo-item-title {
  font-weight: bold;
  font-size: 200%;
  width: 100%;
}
.done {
  text-decoration: line-through;
}
.todo-item-delete {
  padding: 0;
}
</style>
