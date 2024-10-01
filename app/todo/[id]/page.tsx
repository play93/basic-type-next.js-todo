import { getTodoDetail } from "@/api/todo-api";
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
  const { completed, text } = await getTodoDetail(id);

  return (
    <div>
      TodoDetailPage {text} - {completed ? "완료됨" : "미완료"}
    </div>
  );
};

export default TodoDetailPage;
