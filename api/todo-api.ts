import { Todo } from "@/types/todo.types";

export const getTodos = async () => {
  const response = await fetch("http://localhost:5000/todos", {
    cache: "no-store",
  });
  const todos: Todo[] = await response.json();

  return todos;
};

// todo 가져오기
export const getTodoDetail = async (id: string) => {
  const response = await fetch(`http://localhost:5000/todos/${id}`, {
    cache: "no-store",
  });

  const todo: Todo = await response.json();

  return todo;
};

// todo 추가하기
export const addTodo = async (title: string) => {
  const response = await fetch("http://localhost:5000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, completed: false }),
  });

  const todo: Todo[] = await response.json();

  return todo;
};

// todo 삭제하기
export const deleteTodo = async (id: string) => {
  const response = await fetch(`http://localhost:5000/todos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("삭제에 실패했습니다.");
  }

  const todo: Todo = await response.json();

  return todo;
};
