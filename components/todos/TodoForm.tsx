"use client";

import { useAddTodoMutation } from "@/query/useTodoMutation";
import React from "react";

const TodoForm = () => {
  const { mutateAsync: addTodo } = useAddTodoMutation();

  const onSubmitTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget; // e.currentTarget은 이벤트가 재할당되면서 null이 되지만 form은 그대로 있음.
    const formData = new FormData(form);
    const title = formData.get("title")?.toString().trim();

    if (!title) return;

    await addTodo(title);

    form.reset();
  };

  return (
    <form onSubmit={onSubmitTodo}>
      <input type="text" name="title" placeholder="할 일을 입력하세요" />
      <button type="submit">추가</button>
    </form>
  );
};

export default TodoForm;
