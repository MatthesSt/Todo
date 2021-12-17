import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  getFirestore,
  doc,
  DocumentReference,
} from "firebase/firestore";

export interface todo {
  id: number;
  task: string;
  done: boolean;
  timelimit: string;
  datelimit: string;
}
export interface createdTodo {
  task: string;
  done: boolean;
  timelimit: string;
  datelimit: string;
}
export interface returnTodo {
  merged: todo[];
  conflicts: todo[];
}
export interface finishedTodo {
  task: string;
  endTime: string;
  id: number;
}

export async function addTodo(todo: createdTodo): Promise<todo> {
  const todos = JSON.parse(localStorage.getItem("todos") || "[]");
  try {
    const docRef = await addDoc(collection(getFirestore(), "todos"), todo);
    todos.push({ ...todo, id: docRef.id });
    localStorage.setItem("todos", JSON.stringify(todos));
    await updateDoc(doc(getFirestore(), "todos", docRef.id), {
      ...todo,
      id: docRef.id,
    });
    return { ...todo, id: JSON.parse(docRef.id) };
  } catch (e) {
    console.log({ error_addTodo: e });
  }
  return [] as unknown as todo;
}

export async function getTodos(): Promise<returnTodo> {
  let docs = [] as any[];
  const querySnapshot = await getDocs(collection(getFirestore(), "todos"));
  querySnapshot.forEach((doc) => {
    docs.push(doc);
  });
  docs = docs.map((task) => ({ ...task.data(), id: task.id }));
  const LsTodos = JSON.parse(localStorage.getItem("todos") || "[]") as todo[];

  const LsFbMerged = [];
  const LsFbConflicts = [];

  for (const doc of docs) {
    if (
      LsTodos.find((todo) => todo.id == doc.id)?.done == doc.done ||
      !LsTodos.find((todo) => todo.id == doc.id)
    ) {
      LsFbMerged.push(doc);
    } else if (
      LsTodos.find((todo) => todo.id == doc.id) &&
      LsTodos.find((todo) => todo.id == doc.id)?.done !== doc.done
    ) {
      LsFbConflicts.push(doc);
    } else {
      console.error({
        error_getTodos: `couldn't handle doc when merging Ls and Fb ${doc}`,
      });
    }
  }

  const offlineTodos = LsTodos.filter(
    (todo) => JSON.stringify(todo.id)?.length < 15
  );
  if (offlineTodos.length) {
    try {
      await offlineTodos.forEach((todo) => LsFbMerged.push(addTodo(todo)));
    } catch (e) {
      console.log({ error_offlineTodoFilter: e });
    }
  }
  return { merged: LsFbMerged, conflicts: LsFbConflicts } || [];
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

export async function getNewID(): Promise<number> {
  const id = 0;
  const DocRef = await getDocs(collection(getFirestore(), "todos"));
  return id;
}
