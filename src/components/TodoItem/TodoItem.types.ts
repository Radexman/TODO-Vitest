export type TodoItemProps = {
  taskName: string;
  isDone?: boolean;
  handleComplete: (id: string) => void;
  handleDelete: (id: string) => void;
};
