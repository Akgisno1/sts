import { Schema, models, model, Document, Types } from "mongoose";
import { IPost } from "./Post.model";
import { IUser } from "./User.model";

export interface IComment extends Document {
  postId: Types.ObjectId | IPost;
  authorId: Types.ObjectId | IUser;
  authorName: string;
  text: string;
  createdAt: Date;
}

const CommentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  authorName: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Comment = models.Comment || model<IComment>("Comment", CommentSchema);
export default Comment;
