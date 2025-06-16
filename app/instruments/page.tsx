import { createClient } from "@/utils/supabase/server";

export default async function Instruments() {
  const supabase = await createClient();

  const { data: instruments } = await supabase.from("instruments").select();
  // console.log(instruments);

  // return <pre>{JSON.stringify(instruments, null, 2)}</pre>;
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        🎵 Instrument List
      </h1>

      {Array.isArray(instruments) && instruments.length > 0 ? (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-2 px-4 border-b border-gray-200">
                ID
              </th>
              <th className="text-left py-2 px-4 border-b border-gray-200">
                Name
              </th>
            </tr>
          </thead>
          <tbody>
            {instruments.map((instrument) => (
              <tr key={instrument.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-100">
                  {instrument.id}
                </td>
                <td className="py-2 px-4 border-b border-gray-100 capitalize">
                  {instrument.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 italic">No instruments found.</p>
      )}
    </div>
  );
}
