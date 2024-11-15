import React from "react";
export default async function TMD() {
  const res = await fetch("https://www.tmd.go.th/forecast/daily", {
    cache: "no-store",
  });
  const raw = await res.text();
  const out = `<div${raw.split("div")[246]}div>`;
  const confirm = `<h1${raw.split("div")[145].split("h1")[1]}h1>`;
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: confirm }}></div>
      <div dangerouslySetInnerHTML={{ __html: out }}></div>
    </div>
  );
}
