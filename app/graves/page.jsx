import Form from "./components/Form";
import { addGrave } from "./actions";

export const metadata = {
  title: "GraveFinder | Add a new Grave",
  description: "Generated by create next app",
};

export default async function CreateGrave() {
  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold text-center mt-4">New Grave Entry</h1>
      <div className="m-4 bg-green-700 text-white p-4 rounded-lg">
        <h1 className="mb-3 text-lg">Reminders:</h1>
        <ul className="list-disc pl-4">
          <li className="mb-3">
            Search for the grave entry first to avoid adding duplicates.
          </li>
          <li className="mb-3">
            You can Add missing cemeteries, but ensure no duplicates are
            created.
          </li>
          <li className="mb-3">
            Birth dates, death dates, aliases, and notes are optional but
            recommended.
          </li>
          <li className="mb-3">
            For Location, if the value is stil Point(0,0), then there is no
            location inputted yet
          </li>
          <li className="mb-3">
            Two location input buttons exist:
            <ul className="list-disc pl-4">
              <li>
                The left button uses your device geolocation (if available).
              </li>
              <li>
                The right button allows manual map pinning for precise location.
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <Form action={addGrave} />
    </div>
  );
}
