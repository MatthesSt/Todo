import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  getFirestore,
} from "firebase/firestore";

export interface todo {
  id: number;
  task: string;
  done: boolean;
  timelimit: string;
  datelimit: string;
}
export interface finishedTodo {
  task: string;
  endTime: string;
  id: number;
}

export async function addTodo(todo: todo): Promise<void> {
  if (todo) console.log(todo);
  const todos = JSON.parse(localStorage.getItem("todos") || "[]") as todo[];
  todos.push(todo);
  const docRef = await addDoc(collection(getFirestore(), "todos"), todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
export async function getTodos(): Promise<todo[]> {
  const docs = [] as any[];
  const querySnapshot = await getDocs(collection(getFirestore(), "todos"));
  querySnapshot.forEach((doc) => {
    docs.push(doc);
  });
  const todos = JSON.parse(localStorage.getItem("todos") || "[]") as todo[];
  if (docs.map((task) => ({ ...task.data(), id: task.id })))
    return docs.map((task) => ({ ...task.data(), id: task.id }));
  else return todos;
}
export async function updateTodo(
  id: number,
  taskDone: boolean
): Promise<boolean> {
  // const docRef = await updateDoc(collection(getFirestore(), "todos"), todo);
  const todos = JSON.parse(localStorage.getItem("todos") || "[]") as todo[];
  todos.find((t) => t.id == id)!.done = taskDone;
  localStorage.setItem("todos", JSON.stringify(todos));
  return true;
}

export function deleteTask(id: number): boolean {
  let todos = JSON.parse(localStorage.getItem("todos") || "[]") as todo[];
  todos = todos.filter((t) => t.id != id);
  localStorage.setItem("todos", JSON.stringify(todos));
  return true;
}

export function removeTask(id: number): void {
  let todos = JSON.parse(
    localStorage.getItem("finishedTodos") || "[]"
  ) as todo[];
  todos = todos.filter((t) => t.id != id);
  localStorage.setItem("finishedTodos", JSON.stringify(todos));
}
