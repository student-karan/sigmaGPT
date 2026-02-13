import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[#0e0e0e]">
      <SignUp  />
    </div>
  );
}
