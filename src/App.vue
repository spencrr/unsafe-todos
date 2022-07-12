<template>
    <div id="app">
        <div id="nav">Todos</div>
        <div class="todos">
            <Add @add="fillTodos" />
            <button @click="fillTodos">Add</button>
            <br>
            <button @click="delTodos">Delete All</button>
            <div class="todo-items">
                <TodoItem :todo="todo" :key="todo.id" v-for="todo in todos" @delete="fillTodos"
                    @editing="shouldPoll = false" @doneEditing="shouldPoll = true" />
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import axios from "axios";
import TodoItem from "@/components/TodoItem.vue";
import Add from "@/components/Add.vue";

import { defineComponent } from "vue";

interface Todo {
    done: boolean,
    id: string
}

export default defineComponent({
    name: "todos",
    data() {
        const data: {
            todos: Todo[],
            polling: number | undefined,
            shouldPoll: boolean
        } = {
            todos: [],
            polling: undefined,
            shouldPoll: true
        };
        return data;
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
            axios.get("/todos").then(res => {
                this.todos = res.data.map((t: { done: string, id: string }) => {
                    return { ...t, done: t.done === "true" }
                });
            });
        },
        delTodos() {
            let requests = this.todos.map(todo => axios.delete(`/todos/${todo.id}`));
            axios.all(requests).then(() => (this.todos = []));
        }
    },
    components: {
        TodoItem,
        Add
    }
});
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
    padding: 0;
}

html {
    height: 100%;
    background: linear-gradient(to bottom left, #fff, #aaa);
}

.todo-items {
    display: flex;
    width: 75vw;
    margin: 0 auto;
    flex-wrap: wrap;
    justify-content: space-around;
    transition: cubic-bezier(0.075, 0.82, 0.165, 1);
}
</style>
