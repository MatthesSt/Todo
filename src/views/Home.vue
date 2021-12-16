<template>
  <div>
    <div
      class="container d-flex flex-column justify-content-center align-items-center"
    >
      <div class="card">
        <div class="card card-header">TODO</div>
        <div class="card card-body">
          <div class="row">
            <form
              @submit.prevent="addTodo()"
              class="d-flex justify-content-center align-items-center pb-3"
            >
              <input
                type="text"
                placeholder="task"
                v-model="task"
                class="rounded-pill p-1 ps-3 me-3"
                required
              />
              <label class="mx-2 fw-bold fs-4">Has to be done until:</label>
              <input
                type="date"
                v-model="datelimit"
                class="rounded-pill p-1 ps-3 me-3"
                required
              />
              <input
                type="time"
                v-model="timelimit"
                class="rounded-pill p-1 ps-3 me-3"
                required
              />
              <button class="btn btn-success rounded-pill" type="submit">
                submit
              </button>
            </form>
          </div>
          <div class="row">
            <div class="col-6">
              <h2>Todo</h2>
              <div
                v-for="todo in todos"
                :key="todo.id"
                class="d-flex flex-column text-start"
              >
                <div v-if="todo.done == false">
                  <div class="card">
                    <div class="card-header text-center">{{ todo.task }}</div>
                    <div class="card-body text-center">
                      {{ todo.timelimit }}
                      {{ todo.datelimit }}
                      <button
                        class="btn btn-success"
                        @click.prevent="changeTaskState(todo.id)"
                      >
                        &#10003;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6">
              <h2>Done</h2>
              <div
                class="d-flex flex-column text-start"
                v-for="todo in todos"
                :key="todo.id"
              >
                <div v-if="todo.done == true">
                  <div class="card">
                    <div class="card-header text-center">{{ todo.task }}</div>
                    <div class="card-body text-center">
                      {{ todo.timelimit }}
                      {{ todo.datelimit }}
                      <button
                        class="btn btn-info"
                        @click.prevent="changeTaskState(todo.id)"
                      >
                        &#171;
                      </button>
                      <button
                        class="btn btn-danger"
                        @click.prevent="deleteTask(todo.id)"
                      >
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import * as API from "../API";
import type { todo } from "../API";

export default defineComponent({
  data() {
    return {
      datelimit: "",
      timelimit: "",
      task: "",
      todos: [] as todo[],
    };
  },
  async mounted() {
    try {
      this.todos = await API.getTodos();
    } catch (e) {
      console.log({ error: e });
    }
  },
  methods: {
    clear() {
      this.datelimit = "";
      this.timelimit = "";
      this.task = "";
    },
    addTodo() {
      let ID = this.todos[this.todos.length - 1]?.id + 1 || 0;
      let newTodo = {
        task: this.task,
        timelimit: this.timelimit,
        datelimit: new Date(this.datelimit).toLocaleDateString(),
        done: false,
        id: ID,
      };
      try {
        API.addTodo(newTodo);
      } catch (e) {
        console.log({ error: e });
        return;
      }
      this.todos.push(newTodo);
      this.clear();
    },
    async changeTaskState(id: number) {
      console.log({ changeTaskState: id });
      let index = this.todos.findIndex((t) => t.id == id);
      console.log({ indexStateChange: index });
      if (this.todos[index].done == false) {
        try {
          if (await API.updateTodo(id, true)) {
            this.todos[index].done = true;
          }
        } catch (e) {
          console.log({ error: e });
        }
      } else {
        try {
          if (await API.updateTodo(id, false)) {
            this.todos[index].done = false;
          }
        } catch (e) {
          console.log({ error: e });
        }
      }
    },
    deleteTask(id: number) {
      console.log({ delete: id });
      try {
        if (API.deleteTask(id)) {
          this.todos = this.todos.filter((t) => t.id != id);
          console.log({ id: id });
        }
      } catch (e) {
        console.log({ error: e });
      }
    },
  },
});
</script>
<style lang="scss" scoped></style>
