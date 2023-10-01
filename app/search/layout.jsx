import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// components
import Navigationbar from "@/app/components/Navbar";
import BottomNavbar from "../components/BottomNavbar";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function SearchLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  let profile;
  if (data.session) {
    // Get the user's profile data from Supabase.
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.session.user.id)
      .single();
    profile = profileData;
  }

  return (
    <div>
      {data.session && (
        <>
          <Navigationbar user={data.session.user} profile={profile} />
        </>
      )}
      {!data.session && <Navigationbar />}
      {children}
    </div>
  );
}
