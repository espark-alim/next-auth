'use client';
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
export default function Home() {
  const session = useSession()

  if (session?.data === null) {
    return <button onClick={signIn} >Login</button>
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {session?.data && <Image src={session?.data?.user?.image} width={100} height={100} alt="" />}
      <br />
      {session?.data?.user?.name}
      <br />
      {session?.data && <button button onClick={signOut} >Logout</button>}
    </div >
  );
}
