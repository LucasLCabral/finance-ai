import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { dark } from "@clerk/themes";
import { redirect } from "next/navigation";

const Home = async () => {
  const {userId} = await auth();
  if(!userId){
    redirect("/login");
  }
  
  return (
    <UserButton showName appearance={{
      baseTheme: dark,
    }}/>
  )
};

export default Home;
