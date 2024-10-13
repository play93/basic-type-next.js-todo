"use client";

import { useTodoStore } from "@/store/useTodoStore";
import TodoItem from "./TodoItem";
import { useTodoQuery } from "@/query/useTodoQuery";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const TodoList = () => {
  const [parent] = useAutoAnimate(/* optional config */);
  const { completed } = useTodoStore();
  const { data: todos, isLoading } = useTodoQuery(
    completed ? "completed" : "pending"
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul className="flex flex-col gap-2" ref={parent}>
      {todos?.map((todo) => (
        <li key={todo.id}>
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
