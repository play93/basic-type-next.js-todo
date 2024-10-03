import { getTodoDetail } from "@/api/todo-api";
import TodoItem from "@/components/todos/TodoItem";
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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <TodoItem id={id} />
      </div>
    </HydrationBoundary>
  );
};

export default TodoDetailPage;
