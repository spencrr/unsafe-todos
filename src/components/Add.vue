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

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
    name: "addTodo",
    methods: {
        add(event: any) {
            let form = event.currentTarget;
            axios
                .post("/todos", {
                    name: form.name.value,
                    desc: form.desc.value
                })
                .then(() => {
                    form.reset();
                    this.$emit("add");
                });
        }
    }
});
</script>

<style>
.add {
    display: inline-block;
}
</style>
