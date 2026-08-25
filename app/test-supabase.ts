import { supabase } from "./supabase";

async function testSupabase() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .limit(1);

  if (error) {
    console.error("SUPABASE ERROR:", error);
    return;
  }

  console.log("SUPABASE CONNECTED:", data);
}

testSupabase();