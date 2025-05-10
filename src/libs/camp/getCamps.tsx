import { getBackendUrl } from "@/components/utility/setup";
import { BasicCamp } from "../../../interface";

export default async function getCamps(): Promise<BasicCamp[]> {
  const response = await fetch(`${getBackendUrl()}/camp/getCamps`, {
    cache: "no-store",
  });
  // console.log(`${backendUrl}/camp/getCamps`)

  if (!response.ok) {
    throw new Error("Fail");
  }
  const buf = await response.json();
  //console.log(buf)

  return buf;
}
