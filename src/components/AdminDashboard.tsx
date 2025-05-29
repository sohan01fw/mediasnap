import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  deleteMultiplePosts,
  updateUserRole,
} from "../lib/services/userService";
import { toast } from "sonner";
import { useUserPostsDelStore } from "../lib/stores/useUserStore";
import { DelBtnForSelectedPosts } from "./ui/button";

export interface DataRow {
  id: number;
  content: string;
  loc_lat: string;
  loc_lng: string;
  pic_url: string;
  vid_url: string;
  user: {
    id: string;
    name: string;
    pic?: string;
    role: "ADMIN" | "USER";
  };
}

export const AdminDashboard = ({ data }: { data: DataRow[] }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const allSelected = selectedIds.length === data.length;
  const queryClient = useQueryClient();
  const { setDelPostsCount } = useUserPostsDelStore();
  const mutation = useMutation({
    mutationFn: async (ids: string[]) => {
      await deleteMultiplePosts(ids);
    },
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({ queryKey: ["allUsersPosts"] });
      setSelectedIds([]);
      setDelPostsCount(0);
      toast.success("Posts deleted successfully");
    },
    onError: (error) => {
      console.log("error", error);
      toast.error("Error deleting posts");
    },
  });

  const toggleSelectAll = () => {
    setSelectedIds(allSelected ? [] : data.map((d) => String(d.id)));
  };

  const toggleSelectOne = (id: number | string) => {
    const strId = String(id);
    setSelectedIds((prev) =>
      prev.includes(strId) ? prev.filter((i) => i !== strId) : [...prev, strId],
    );
  };

  useEffect(() => {
    setDelPostsCount(selectedIds.length);
  }, [selectedIds]);
  const handleDelete = () => {
    console.log(selectedIds);
    if (selectedIds.length === 0) {
      toast.error("Please select at least one post");
      return;
    }
    mutation.mutate(selectedIds);
  };

  const roleMutation = useMutation({
    mutationFn: async ({
      id,
      role,
    }: {
      id: string;
      role: "ADMIN" | "USER";
    }) => {
      await updateUserRole(id, role);
    },
    onSuccess: () => {
      toast.success("Role updated successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.log("error", error);
      toast.error("Error updating role");
    },
  });
  const changeRole = (id: string, role: "ADMIN" | "USER") => {
    roleMutation.mutate({ id, role });
  };
  return (
    <div className="overflow-x-auto">
      <div className="btn btn-active" onClick={handleDelete}>
        <DelBtnForSelectedPosts />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                disabled={data.length === 0}
                type="checkbox"
                className="checkbox"
                checked={allSelected}
                onChange={toggleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Text</th>
            <th>Image</th>
            <th>Video</th>
            <th>Map</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.id}>
              <td>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectedIds.includes(String(d.id))}
                  onChange={() => toggleSelectOne(d.id)}
                />
              </td>
              <td className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask rounded-full h-12 w-12">
                    <img
                      src={
                        d.user?.pic ||
                        "https://placehold.co/100x100?text=Avatar"
                      }
                      alt={`${d.user?.name} avatar`}
                    />
                  </div>
                </div>
                <div className="font-bold">{d.user?.name}</div>
              </td>
              <td>{d.content}</td>
              <td>
                {d.pic_url ? (
                  <img src={d.pic_url} className="w-20 h-20 object-cover" />
                ) : (
                  "-"
                )}
              </td>
              <td>
                {d.vid_url ? (
                  <a
                    href={d.vid_url}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Video
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td>
                {d.loc_lat && d.loc_lng ? (
                  <a
                    href={`https://maps.google.com/?q=${d.loc_lat},${d.loc_lng}`}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Map
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td>
                <select
                  className="select  w-32 max-w-md"
                  defaultValue={d.user.role}
                  onChange={(e) =>
                    changeRole(
                      String(d.user.id),
                      e.target.value as "ADMIN" | "USER",
                    )
                  }
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
