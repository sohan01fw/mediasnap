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
