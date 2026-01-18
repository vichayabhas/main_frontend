"use client";
import React from "react";
import {
  BasicPart,
  GetDataForStaffUpdateRegister,
} from "../../../../interface";
import ImagesFromUrl from "@/components/utility/ImagesFromUrl";
import { Checkbox, MenuItem, Select, TextField } from "@mui/material";
import {
  addItemInUseStateArray,
  copy,
  modifyElementInUseStateArray,
  notEmpty,
  setBoolean,
  setMap,
  setTextToInt,
  setTextToString,
} from "@/components/utility/setup";
import FinishButton from "@/components/utility/FinishButton";
import updateStaffRegister from "@/libs/camp/updateStaffRegister";
export default function CreateStaffRegisterPage({
  data: { camp, parts, oldStaffRegister },
  token,
}: {
  data: GetDataForStaffUpdateRegister;
  token: string;
}) {
  const [links, setLinks] = React.useState<string[]>(
    oldStaffRegister.parts.map((v) => v.link),
  );
  const [ranks, setRanks] = React.useState<number[]>(
    oldStaffRegister.parts.map((v) => v.rank),
  );
  const [selectParts, setSelectParts] = React.useState<BasicPart[]>(
    oldStaffRegister.parts.map((v) => v.part),
  );
  const [selectPart, setSelectPart] = React.useState<BasicPart | null>(null);
  const [wants, setWants] = React.useState<boolean[]>(
    oldStaffRegister.parts.map(() => true),
  );
  const [link, setLink] = React.useState<string>("");
  const [rank, setRank] = React.useState<number>(0);

  return (
    <div>
      <ImagesFromUrl urls={camp.pictureUrls} />
      {camp.campName}
      <table>
        <tr>
          <th>part</th>
          <th>link</th>
          <th>rank</th>
          <th>want</th>
        </tr>
        {selectParts.map((part, index) => (
          <tr key={index}>
            <td>
              <Select value={part.partName} renderValue={copy}>
                {parts.map((part, j) => (
                  <MenuItem
                    key={j}
                    value={part.partName}
                    onClick={() => {
                      setMap(
                        setSelectParts,
                        modifyElementInUseStateArray(index),
                      )(part);
                    }}
                  >
                    {part.partName}
                  </MenuItem>
                ))}
              </Select>
            </td>
            <td>
              <TextField
                value={links[index]}
                onChange={setTextToString(
                  setMap(setLinks, modifyElementInUseStateArray(index)),
                )}
              />
            </td>
            <td>
              <TextField
                value={ranks[index].toString()}
                onChange={setTextToInt(
                  setMap(setRanks, modifyElementInUseStateArray(index)),
                )}
              />
            </td>
            <td>
              <Checkbox
                checked={wants[index]}
                onChange={setBoolean((check) => {
                  if (check) {
                    const currentSelect = wants.filter(copy).length;
                    if (currentSelect < camp.maxRegister) {
                      setMap(
                        setWants,
                        modifyElementInUseStateArray(index),
                      )(true);
                    }
                  } else {
                    setMap(
                      setWants,
                      modifyElementInUseStateArray(index),
                    )(false);
                  }
                })}
              />
            </td>
          </tr>
        ))}
        <tr>
          <td>
            <Select value={selectPart?.partName ?? ""} renderValue={copy}>
              {parts.map((part, j) => (
                <MenuItem
                  key={j}
                  value={part.partName}
                  onClick={() => {
                    setSelectPart(part);
                  }}
                >
                  {part.partName}
                </MenuItem>
              ))}
            </Select>
          </td>
          <td>
            <TextField value={link} onChange={setTextToString(setLink)} />
          </td>
          <td>
            <TextField
              value={rank.toString()}
              onChange={setTextToInt(setRank)}
            />
          </td>
          <td>
            <FinishButton
              onClick={() => {
                if (selectPart) {
                  const currentSelect = wants.filter(copy).length;
                  setSelectParts(addItemInUseStateArray(selectPart));
                  setRanks(addItemInUseStateArray(rank));
                  setLinks(addItemInUseStateArray(link));
                  setWants(
                    addItemInUseStateArray(currentSelect < camp.maxRegister),
                  );
                }
              }}
              text="add"
            />
          </td>
        </tr>
      </table>
      <FinishButton
        text="update"
        onClick={() => {
          updateStaffRegister(
            {
              campId: camp._id,
              parts: selectParts
                .map((part, i) =>
                  wants[i]
                    ? {
                        partId: part._id,
                        link: links[i],
                        rank: ranks[i],
                      }
                    : null,
                )
                .filter(notEmpty),
            },
            token,
          );
        }}
      />
    </div>
  );
}
