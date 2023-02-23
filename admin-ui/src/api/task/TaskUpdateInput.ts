import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type TaskUpdateInput = {
  completed?: boolean;
  text?: string;
  uid?: UserWhereUniqueInput | null;
};
