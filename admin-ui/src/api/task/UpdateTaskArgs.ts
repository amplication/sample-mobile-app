import { TaskWhereUniqueInput } from "./TaskWhereUniqueInput";
import { TaskUpdateInput } from "./TaskUpdateInput";

export type UpdateTaskArgs = {
  where: TaskWhereUniqueInput;
  data: TaskUpdateInput;
};
