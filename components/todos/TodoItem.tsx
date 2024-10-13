"use client";

import { useToggleTodoMutation } from "@/query/useTodoMutation";
import { Todo } from "@/types/todo.types";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import TodoDeleteButton from "./TodoDeleteButton";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const { mutate: toggleTodo } = useToggleTodoMutation();

  const { id, completed, title } = todo;

  return (
    <div className="flex flex-row justify-between items-center rounded-2xl bg-[#f5f5f5] p-4 hover:bg-[#ebebeb]">
      <div className="flex flex-row items-center gap-2">
        <Checkbox
          checked={completed}
          onCheckedChange={(checked) =>
            checked !== "indeterminate" &&
            toggleTodo({ id, completed: checked })
          } // checked가 알 수 없음 (결정되지 않음)이 아닐 때만 toggleTodo해줘라 라는 뜻
        />

        <Link
          className="hover:underline dark:text-black"
          href={`/todo/${todo.id}`}
        >
          {title}
        </Link>
      </div>

      <div className=" flex flex-row gap-2">
        {/* <Button variant="destructive" onClick={() => deleteTodo(id)}>
          삭제
        </Button> */}
        {/* <Button
          variant="outline"
          onClick={() => toggleTodo({ id, completed: !completed })}
        >
          {completed ? "완료됨" : "미완료"}
        </Button> */}

        <TodoDeleteButton id={id} />
      </div>
    </div>
  );
};

export default TodoItem;
