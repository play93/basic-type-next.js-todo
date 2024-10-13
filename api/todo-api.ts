import { Todo } from "@/types/todo.types";

const BASE_URL = "http://localhost:3000";

export const getTodos = async (filter?: "completed" | "pending") => {
  const todoURL = new URL(BASE_URL);

  if (filter === "completed") todoURL.searchParams.set("completed", "true");
  if (filter === "pending") todoURL.searchParams.set("completed", "false");

  const response = await fetch(todoURL.toString(), {
    cache: "no-store",
  });

  const todos: Todo[] = await response.json();

  return todos;
};

// todo 가져오기
export const getTodoDetail = async (id: string) => {
  const todoDetailURL = new URL(`${BASE_URL}/${id}`);

  const response = await fetch(todoDetailURL.toString(), {
    cache: "no-store",
  });

  const todo: Todo = await response.json();

  return todo;
};

// todo 추가하기
export const addTodo = async (title: string) => {
  const todoURL = new URL(BASE_URL);

  const response = await fetch(todoURL.toString(), {
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
  const todoDetailURL = new URL(`${BASE_URL}/${id}`);

  const response = await fetch(todoDetailURL.toString(), {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("삭제에 실패했습니다.");
  }

  const todo: Todo = await response.json();

  return todo;
};

// todo 상태 변경하기 (완료/미완료)
export const toggleTodo = async (id: string, completed: boolean) => {
  const todoDetailURL = new URL(`${BASE_URL}/${id}`);

  const response = await fetch(todoDetailURL.toString(), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
    // body에 뭔가 있다! body에 넣어준게 JSON을 문자열화 한거다! => headers에다가 json이라고 알려줘야함.(서버한테)
    // 안그러면 서버는 그냥 문자열로써 이해하기 때문.
  });

  if (!response.ok) {
    throw new Error("업데이트에 실패했습니다.");
  }

  const todo: Todo = await response.json();

  return todo;
};
