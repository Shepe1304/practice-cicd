"use client";

// import { createClient } from "@/lib/supabase/client";
import { supabase } from "@/lib/supabase/client";
import { FormEvent, useEffect, useState } from "react";

export default function Instruments() {
  const [addition, setAddition] = useState("");
  type Instrument = {
    id: number;
    name: string;
  };

  const [instruments, setInstruments] = useState<Instrument[]>([]);

  // const supabase = createClient();

  useEffect(() => {
    const fetchInstruments = async () => {
      const { data } = await supabase.from("instruments").select();
      setInstruments(data ?? []);
    };

    fetchInstruments();
  }, []);

  const handleAddingItem = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase
      .from("instruments")
      .insert({ name: addition });

    if (!error) {
      const { data: updatedData } = await supabase.from("instruments").select();
      setInstruments(updatedData ?? []);
      setAddition("");
    } else {
      console.error('Error inserting instrument:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        🎵 Instrument List
      </h1>

      <div>
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

      <form onSubmit={handleAddingItem} className="mt-4 flex gap-2">
        <input
          type="text"
          value={addition}
          onChange={(e) => setAddition(e.target.value)}
          placeholder="Add new instrument"
          className="border border-gray-300 px-3 py-2 rounded-md w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add
        </button>
      </form>
    </div>
  );
}
