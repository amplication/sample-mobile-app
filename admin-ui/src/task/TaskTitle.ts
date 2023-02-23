import { Task as TTask } from "../api/task/Task";

export const TASK_TITLE_FIELD = "text";

export const TaskTitle = (record: TTask): string => {
  return record.text || String(record.id);
};
