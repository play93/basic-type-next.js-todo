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

const TodoDetailPage = ({ params }: TodoDetailPageProps) => {
  const id = params.id;
  return <div>TodoDetailPage {id}</div>;
};

export default TodoDetailPage;
