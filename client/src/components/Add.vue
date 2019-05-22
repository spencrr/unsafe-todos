<template>
  <div class="add">
    <form action="clear" @keydown.enter="add">
      <label for="name">Name</label>
      <input name="name" type="text">
      <label for="desc">Description</label>
      <input name="desc" type="text">
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "addTodo",
  methods: {
    add(event) {
      let form = event.currentTarget;
      axios
        .post("http://localhost:3000/todos", {
          name: form.name.value,
          desc: form.desc.value
        })
        .then(res => {
          form.reset();
          this.$emit("add");
        });
    }
  }
};
</script>

<style>
.add {
  display: inline-block;
}
</style>
