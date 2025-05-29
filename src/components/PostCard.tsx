import React from "react";

type UserType = {
  id: string;
  name: string;
  pic: string;
  role: string;
};

type PostType = {
  id: string;
  content: string;
  created_at: string;
  pic_url?: string;
  vid_url?: string;
};

interface PostCardProps {
  user: UserType;
  post: PostType;
}

export const PostCard: React.FC<PostCardProps> = ({ user, post }) => {
  const date = new Date(post.created_at).toLocaleString();

  return (
    <div className="bg-white rounded-2xl shadow p-4 w-60 h-auto">
      <div className="flex items-center space-x-3">
        <img
          src={user.pic}
          alt={`${user.name} avatar`}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold text-gray-900">{user.name}</p>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>

      <p className="mt-4 text-gray-800">{post.content}</p>

      {(post.pic_url || post.vid_url) && (
        <div className="mt-4 space-y-4">
          {post.pic_url && (
            <img
              src={post.pic_url}
              alt="Post image"
              className="w-full rounded-xl object-cover"
            />
          )}
          {post.vid_url && (
            <video src={post.vid_url} controls className="w-full rounded-xl" />
          )}
        </div>
      )}
    </div>
  );
};
