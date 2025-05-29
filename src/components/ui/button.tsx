import { FaTrash } from "react-icons/fa";
import { useUserPostsDelStore } from "../../lib/stores/useUserStore";
export default function GoogleBtn({
  handleGoogleSignIn,
}: {
  handleGoogleSignIn: () => void;
}) {
  return (
    <button className="btn w-full" onClick={handleGoogleSignIn}>
      <img
        src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
        className="w-5 h-5 mr-2"
      />
      Continue with Google
    </button>
  );
}

export function DelBtnForSelectedPosts() {
  const { delPostsCount } = useUserPostsDelStore();
  return (
    <div className="flex items-center gap-2 btn bg-gray-700 m-5  text-white">
      <FaTrash />
      <span>Delete</span>
      <span className="badge badge-neutral">{delPostsCount}</span>
    </div>
  );
}
