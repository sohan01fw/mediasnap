import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserPosts } from "../lib/services/userService";
import { useAuthContext } from "../lib/hooks/useAuth";
import { toast } from "sonner";
import { PostCard } from "./PostCard";

type PostWithUser = {
  id: string;
  content: string;
  created_at: string;
  pic_url?: string;
  vid_url?: string;
  user_id: string;
  users: {
    id: string;
    name: string;
    pic: string;
    role: string;
  };
};

export const Posts = () => {
  const { user } = useAuthContext();
  const userId = user?.id || "";
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<PostWithUser[]>({
    queryKey: ["posts", userId],
    queryFn: () => getUserPosts(userId),
    enabled: !!userId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    toast.error("Error fetching posts");
    return <div>Error loading posts.</div>;
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-6">No posts to display.</div>
    );
  }
  queryClient.invalidateQueries(["posts", userId]);
  return (
    <div className="space-y-6 flex justify-center mt-10">
      {data.map((post) => (
        <PostCard
          key={post.id}
          user={{
            id: post.users.id,
            name: post.users.name,
            pic: post.users.pic,
            role: post.users.role,
          }}
          post={{
            id: post.id,
            content: post.content,
            created_at: post.created_at,
            pic_url: post.pic_url,
            vid_url: post.vid_url,
          }}
        />
      ))}
    </div>
  );
};
