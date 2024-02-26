import Form from "./components/Form";
import { addGrave } from "./actions";

export const metadata = {
  title: "GraveFinder | Add a new Grave",
  description: "Generated by create next app",
};

export default async function CreateGrave() {
  return (
    <main>
      <h2 className="text-primary text-center">Add a new Grave</h2>
      <Form
        action={addGrave}
      />
    </main>
  );
}
