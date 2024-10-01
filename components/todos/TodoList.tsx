import { getTodos } from "@/api/todo-api";
import Link from "next/link";
import React from "react";

const TodoList = async () => {
  const todos = await getTodos();
  return (
    <ul>
      {todos.map(({ id, text, completed }) => (
        <li key={id}>
          <Link href={`/todo/${id}`}>
            {text} - {completed ? "완료됨" : "미완료"}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
