import { auth } from "@/auth";
import StartupForm from "@/components/StartupForm/StartupForm";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return <StartupForm />;
};

export default page;
