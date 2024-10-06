"use client";

import TodoItem from "./TodoItem";
import { useTodoQuery } from "@/query/useTodoQuery";

const TodoList = () => {
  const { data: todos, isLoading } = useTodoQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {todos?.map((todo) => (
        <li key={todo.id}>
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
