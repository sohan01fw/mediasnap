import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deleteMultiplePosts } from "../lib/services/userService";
import { toast } from "sonner";

export interface DataRow {
  id: number;
  content: string;
  loc_lat: string;
  loc_lng: string;
  pic_url: string;
  vid_url: string;
  user: {
    name: string;
    pic?: string;
    role: "ADMIN" | "USER";
  };
}

export const AdminDashboard = ({ data }: { data: DataRow[] }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const allSelected = selectedIds.length === data.length;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (ids: string[]) => {
      await deleteMultiplePosts(ids);
    },
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({ queryKey: ["allUsersPosts"] });
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

  const handleDelete = () => {
    if (selectedIds.length === 0) {
      toast.error("Please select at least one post");
      return;
    }
    mutation.mutate(selectedIds);
  };

  return (
    <div className="overflow-x-auto">
      <div className="btn btn-active" onClick={handleDelete}>
        delete
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>
              <input
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
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.id}>
              <td>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectedIds.includes(d.id)}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
