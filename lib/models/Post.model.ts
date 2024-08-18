import { Schema, models, model, Document, Types } from "mongoose";
import { IUser } from "./User.model";
import { IComment } from "./Comment.model";

export interface IPost extends Document {
  authorId: Types.ObjectId | IUser;

  title: string;
  description: string;
  images: string[];
  city: string;
  state: string;
  urgency: string;
  likes: Types.ObjectId[] | IUser[];
  comments: Types.ObjectId[] | IComment[];
  createdAt: Date;
  views: number;
}

const PostSchema = new Schema<IPost>({
  authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },

  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String, required: true }],
  city: { type: String, required: true },
  state: { type: String, required: true },
  urgency: { type: String, default: "no" },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  createdAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
});

const Post = models?.Post || model<IPost>("Post", PostSchema);
export default Post;
