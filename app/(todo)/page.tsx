import { getTodos } from "@/api/todo-api";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import TodoController from "@/components/todos/TodoController";
import TodoForm from "@/components/todos/TodoForm";
import TodoList from "@/components/todos/TodoList";
import { Separator } from "@/components/ui/separator";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

//서버사이드렌더링에 포함된 것들은 프리패치로 미리 가져와서 초기 로딩 없이 화면에 렌더링해줄 수 있음.

const TodoPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["todos", undefined],
    queryFn: () => getTodos(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["todos", "pending"],
    queryFn: () => getTodos("pending"),
  });

  await queryClient.prefetchQuery({
    queryKey: ["todos", "completed"],
    queryFn: () => getTodos("completed"),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-12">
        <section className="flex flex-low justify-between">
          <h1 className="font-black text-4xl">TODO LIST</h1>
          <DarkModeToggle />
        </section>

        <Separator />

        <div className="space-y-4">
          <TodoController />
          <TodoList />
        </div>

        <TodoForm />
      </div>
    </HydrationBoundary>
  );
};

export default TodoPage;
