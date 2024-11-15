import { ReceiveAirQuality } from "../../../interface";

export default async function getAirQuality(): Promise<ReceiveAirQuality> {
  const res = await fetch(
    "https://website-api.airvisual.com/v1/cities/ZweMW7yHt8tGQHuGb/measurements?units.temperature=celsius&unit",
    {
      cache: "no-store",
    }
  );
  return await res.json();
}
