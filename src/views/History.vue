<template>
  <div>
    <div class="card" v-for="todo in todos" :key="todo.id">
      <div class="card-header text-center">{{ todo.task }}</div>
      <div class="card-body text-center">
        {{ todo.timelimit }}
        {{ todo.datelimit }}

        <button class="btn btn-danger" @click.prevent="deleteTask(todo.id)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import type { todo, finishedTodo } from "@/API";
import * as API from "@/API";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      todos: [] as todo[],
      finishedTodos: [] as finishedTodo[],
      conflicts: [] as todo[],
      merged: [] as todo[],
    };
  },
  async mounted() {
    this.conflicts = await (await API.getTodos()).conflicts;
    this.merged = await (await API.getTodos()).merged;
  },

  methods: {
    deleteTask(id: number) {
      try {
        API.removeTask(id);
      } catch (e) {
        console.error({ error_deleteTask: e });
      }
    },
  },
});
</script>
<style lang="scss" scoped></style>
