import { ReceiveAirQuality } from "../../../interface";

export default async function getAirQuality(): Promise<ReceiveAirQuality> {
  const res = await fetch(
    "https://website-api.airvisual.com/v1/stations/s7ygLWXNth22qrdZH/measurements?units.temperature=celsius&units",
    {
      cache: "no-store",
    }
  );
  return await res.json();
}
