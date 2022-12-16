import { UserModel } from "../../../models/user.models";

interface CreateNoteDTO {
  title: string;
  description: string;
  user: UserModel;
}
