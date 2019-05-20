<template>
  <div class="todo-item">
    <h2 class="todo-item-title">{{todo.name}}</h2>
    <div class="todo-item-info">
      <div class="todo-item-desc">{{todo.description}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "todoItem",
  props: ["todo"]
};
</script>
 
<style>
.todo-item {
  width: 25vw;
  margin: 5px;
  border-radius: 10px;
  background-image: linear-gradient(to bottom right, , #ffc4007e);
  padding: 20px;
}

/* .todo-item-info {
  display: flex;
  justify-content: space-between;
} */

.todo-item-desc {
  margin-right: 20px;
}
</style>
