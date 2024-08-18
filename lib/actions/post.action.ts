import { connectDB } from "../mongoose";
import Post from "../models/Post.model";

interface CreateAdoptionProps {
  authorId: string;

  title: string;
  description: string;
  images: string[];
  city: string;
  state: string;
  urgency: string;
}

export async function createAdoptionPost({
  authorId,

  title,
  description,
  images,
  city,
  state,
  urgency,
}: CreateAdoptionProps) {
  try {
    await connectDB();
    if (authorId === null) {
      throw new Error("Author ID is null");
    }
    const newPost = {
      authorId,
      title,
      description,
      images,
      city,
      state,
      urgency,
    };

    await Post.create(newPost);
  } catch (error) {
    throw new Error("Failed to create Post");
  }
}
