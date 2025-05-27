import authpic from "../../assets/auth.jpg";

export default function AuthImage() {
  return (
    <div className=" hidden md:w-1/2 md:flex items-center justify-center bg-neutral text-neutral-content p-8">
      <div className="text-center ">
        <img src={authpic} alt="Code Illustration" className="w-full h-full " />
        <h2 className="text-2xl font-bold mb-2">Connect. Chat. Create.</h2>
        <p className="text-sm opacity-70">
          "Code meets conversation – experience seamless real-time interaction."
        </p>
      </div>
    </div>
  );
}
