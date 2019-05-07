<template>
  <div id="auth">
    <form @submit.prevent="login">
      <label for="email">Email</label>
      <input required type="email" v-model="email">
      <label for="password">Password</label>
      <input required type="password" v-model="password">
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "auth",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {}
  }
};
</script>

<style>
</style>
