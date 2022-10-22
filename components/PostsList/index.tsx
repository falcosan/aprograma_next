import React from "react";
import NavLink from "next/link";
import { useAppSelector } from "../../store";

export const PostsList = () => {
  const posts = useAppSelector((state) => state.postsSlice.value);
  return (
    <div className="grid gap-6 m-6">
      {posts.map((post) => (
        <NavLink key={post.uuid} href={post.slug}>
          {post.content.title}
        </NavLink>
      ))}
    </div>
  );
};
