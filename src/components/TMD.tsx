import React from "react";
import TMDClient from "./TMDClient";
interface Choice {
  display: string;
  select: string;
}

export default async function TMD({
  path,
  params,
}: {
  path: string;
  params: { select: string };
}) {
  const res = await fetch(
    `https://www.tmd.go.th/forecast/daily/${params.select}`,
    {
      cache: "no-store",
    }
  );
  const res7 = await fetch("https://www.tmd.go.th/forecast/sevenday", {
    cache: "no-store",
  });
  const raw = await res.text();
  const raw7 = await res7.text();
  const out = `<div${raw.split("div")[246]}div>`;
  const confirm = `<h1${raw.split("div")[145].split("h1")[1]}h1>`;
  const op = raw
    .split('onchange="selectFilter()">')[1]
    .split("</select>")[0]
    .split("</option>");
  const seven = `<div${raw7.split("div")[238]}div>`;
  op.pop();
  function getChoice(input: string): Choice {
    return {
      display: input.split(">")[1],
      select: input.split(`<option value='/forecast/daily/`)[1].split(`'`)[0],
    };
  }
  return (
    <div>
      <TMDClient choices={op.map(getChoice)} path={path} />
      <div dangerouslySetInnerHTML={{ __html: confirm }}></div>
      <div dangerouslySetInnerHTML={{ __html: out }}></div>
      <div>7 วันข้างหน้า</div>
      <div dangerouslySetInnerHTML={{ __html: seven }}></div>
    </div>
  );
}
