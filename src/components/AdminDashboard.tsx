import React from "react";
import type { Post } from "../lib/services/mediaService";

interface DataRow {
  id: number;
  avatarUrl: string;
  name: string;
  location: string;
  company: string;
  position: string;
  favoriteColor: string;
}

// Mock data
export const mockData: DataRow[] = [
  {
    id: 1,
    avatarUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
    name: "Hart Hagerty",
    location: "United States",
    company: "Zemlak, Daniel and Leannon",
    position: "Desktop Support Technician",
    favoriteColor: "Purple",
  },
  {
    id: 2,
    avatarUrl: "https://img.daisyui.com/images/profile/demo/3@94.webp",
    name: "Brice Swyre",
    location: "China",
    company: "Carroll Group",
    position: "Tax Accountant",
    favoriteColor: "Red",
  },
  {
    id: 3,
    avatarUrl: "https://img.daisyui.com/images/profile/demo/4@94.webp",
    name: "Marjy Ferencz",
    location: "Russia",
    company: "Rowe-Schoen",
    position: "Office Assistant I",
    favoriteColor: "Crimson",
  },
  {
    id: 4,
    avatarUrl: "https://img.daisyui.com/images/profile/demo/5@94.webp",
    name: "Yancy Tear",
    location: "Brazil",
    company: "Wyman-Ledner",
    position: "Community Outreach Specialist",
    favoriteColor: "Indigo",
  },
];

const AdminDashboard = ({ data }: { data: any }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Name</th>
            <th>pic</th>
            <th>text</th>
            <th>vid_url</th>
            <th>pic_url</th>
            <th>map</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d: any) => (
            <tr key={d.id}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <h3>{d.user.name}</h3>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{d.name}</div>

                    {/* <div className="text-sm opacity-50">{d.location}</div> */}
                    <div>
                      <img src={d.user.pic} alt={`${d.name} avatar`} />
                    </div>
                  </div>
                </div>
              </td>
              <td>
                {/* {row.company} */}
                <br />
                <span className="badge badge-ghost badge-sm">
                  {/* {row.position} */}
                </span>
              </td>
              {/* <td>{row.favoriteColor}</td> */}
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
