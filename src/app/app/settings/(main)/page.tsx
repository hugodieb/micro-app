import { auth } from "@/services/auth";
import { ProfileForm } from "./_components/form";

export default async function Page() {
  const sesssion = await auth()

  return (
    <ProfileForm defaultValues={sesssion?.user}/>
  )  
}