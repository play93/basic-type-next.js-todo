import { getTodoDetail } from "@/api/todo-api";
import TodoItem from "@/components/todos/TodoItem";
import { Todo } from "@/types/todo.types";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "todo detail",
};

interface TodoDetailPageProps {
  params: {
    id: string;
  };
}

const TodoDetailPage = async ({ params }: TodoDetailPageProps) => {
  const id = params.id;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["todos", id],
    queryFn: () => getTodoDetail(id),
  });

  const todo = queryClient.getQueryData<Todo>(["todos", id]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>{todo ? <TodoItem todo={todo} /> : <div>Todo not found</div>}</div>
    </HydrationBoundary>
  );
};

export default TodoDetailPage;
