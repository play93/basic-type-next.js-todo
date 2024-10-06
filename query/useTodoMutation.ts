import { addTodo, deleteTodo, toggleTodo } from "@/api/todo-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

//todo 추가
export const useAddTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
};

// mutation을 붙임 => 비동기로 내보내는 훅 이라는 것
// todo 삭제
export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo, // (id:string) => deleteTodo(id)
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
};

// todo 완료/미완료 상태변경
interface ToggleTodoMutationParams {
  id: string;
  completed: boolean;
}

export const useToggleTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, completed }: ToggleTodoMutationParams) =>
      toggleTodo(id, completed),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
};
