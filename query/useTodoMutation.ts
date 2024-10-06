import { deleteTodo } from "@/api/todo-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// mutation을 붙임 => 비동기로 내보내는 훅 이라는 것
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
