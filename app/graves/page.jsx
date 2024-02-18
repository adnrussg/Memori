import CreateForm from "./components/Form";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { addGrave } from "./actions";

export const metadata = {
  title: "GraveFinder | Add a new Grave",
  description: "Generated by create next app",
};

export default async function CreateGrave() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    redirect("/login");
  }

  return (
    <main>
      <h2 className="text-primary text-center">Add a new Grave</h2>
      <CreateForm
        action={addGrave}
      />
    </main>
  );
}
