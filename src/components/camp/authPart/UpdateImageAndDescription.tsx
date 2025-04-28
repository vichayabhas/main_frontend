"use client";
import React from "react";
import {
  GetImageAndDescriptionsPackForUpdate,
  Id,
  ImageAndDescriptionType,
  imageAndDescriptionTypes,
  ShowImageAndDescriptions,
} from "../../../../interface";
import { MenuItem, Select, TextField } from "@mui/material";
import {
  addItemInUseStateArray,
  getBackendUrl,
  modifyElementInUseStateArray,
  removeElementInUseStateArray,
  setMap,
  setTextToInt,
  setTextToString,
  SocketReady,
} from "../../utility/setup";
import editImageAndDescription from "@/libs/camp/editImageAndDescription";
import createImageAndDescriptionContainer from "@/libs/camp/createImageAndDescriptionContainer";
import FinishButton from "@/components/utility/FinishButton";
import TypingImageSource from "@/components/utility/TypingImageSource";
import { io } from "socket.io-client";

const socket = io(getBackendUrl());
export default function UpdateImageAndDescription({
  imageAndDescriptionContainersPack,
  token,
}: {
  imageAndDescriptionContainersPack: GetImageAndDescriptionsPackForUpdate;
  token: string;
}) {
  const [types, setTypes] = React.useState<ImageAndDescriptionType>("normal");
  const [imageUrls, setImageUrls] = React.useState<(string | null)[]>([]);
  const [descriptions, setDescriptions] = React.useState<string[]>([]);
  const [orders, setOrders] = React.useState<number[]>([]);
  const [name, setName] = React.useState<string>("");
  const [_id, set_id] = React.useState<Id | null>(null);
  const [childrenId, setChildrenId] = React.useState<(Id | null)[]>([]);
  const [imageAndDescriptionContainers, setImageAndDescriptionContainers] =
    React.useState(
      imageAndDescriptionContainersPack.imageAndDescriptionContainers
    );
  const updateSocket = new SocketReady<ShowImageAndDescriptions[]>(
    socket,
    "updateImageAndDescriptions"
  );
  const room = imageAndDescriptionContainersPack.baan._id.toString();
  React.useEffect(() => {
    updateSocket.listen(room, setImageAndDescriptionContainers);
    return () => updateSocket.disconnect();
  });
  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      <div
        className="w-[70%] items-center p-10 rounded-3xl"
        style={{
          backgroundColor: "#961A1D",
        }}
      >
        <Select
          variant="standard"
          name="location"
          id="location"
          className="h-[2em] w-[200px]"
        >
          {imageAndDescriptionContainers.map(
            (imageAndDescriptionContainer, i) => (
              <MenuItem
                onClick={() => {
                  setTypes(imageAndDescriptionContainer.types);
                  setChildrenId(
                    imageAndDescriptionContainer.children.map(({ _id }) => _id)
                  );
                  setDescriptions(
                    imageAndDescriptionContainer.children.map(
                      ({ description }) => description
                    )
                  );
                  setOrders(
                    imageAndDescriptionContainer.children.map(
                      ({ order }) => order
                    )
                  );
                  setImageUrls(
                    imageAndDescriptionContainer.children.map(
                      ({ imageUrl }) => imageUrl
                    )
                  );
                  set_id(imageAndDescriptionContainer._id);
                  setName(imageAndDescriptionContainer.name);
                }}
                key={i}
                value={imageAndDescriptionContainer.name}
              >
                {imageAndDescriptionContainer.name}
              </MenuItem>
            )
          )}
          <MenuItem
            onClick={() => {
              setChildrenId((childId) => childId.map(() => null));
              set_id(null);
            }}
            value="สร้างจากของเดิม"
          >
            สร้างจากของเดิม
          </MenuItem>
          <MenuItem
            onClick={() => {
              setTypes("normal");
              setChildrenId([]);
              setDescriptions([]);
              setOrders([]);
              setImageUrls([]);
              set_id(null);
              setName("");
            }}
            value="สร้างจากของใหม่"
          >
            สร้างจากของใหม่
          </MenuItem>
        </Select>
        <div className="flex flex-row items-center">
          <label className="w-2/5 text-2xl text-white">ชื่อ</label>
          <TextField
            name="Name"
            id="Name"
            className="w-3/5 bg-white rounded-2xl shadow-inner"
            sx={{
              backgroundColor: "#f5f5f5",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: " 1rem",
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "#5479FF",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#5479FF",
                },
              },
            }}
            onChange={setTextToString(setName)}
            value={name}
          />
        </div>
        {imageAndDescriptionContainersPack.isOverNight ? (
          <Select
            variant="standard"
            name="location"
            id="location"
            className="h-[2em] w-[200px]"
            value={types}
            renderValue={() => types}
          >
            {imageAndDescriptionTypes.map((v, i) => (
              <MenuItem onClick={() => setTypes(v)} key={i} value={types}>
                {v}
              </MenuItem>
            ))}
          </Select>
        ) : null}
        <table>
          <tr>
            <th>รูปภาพ</th>
            <th>คำบรรยาย</th>
            <th>ลำดับ</th>
          </tr>
          {orders.map((order, i) => (
            <tr key={i}>
              <td>
                <TypingImageSource
                  onChange={setMap(
                    setImageUrls,
                    modifyElementInUseStateArray(i)
                  )}
                  defaultSrc={imageUrls[i]}
                />
              </td>
              <td>
                <TextField
                  name="Name"
                  id="Name"
                  className="w-3/5 bg-white rounded-2xl shadow-inner"
                  sx={{
                    backgroundColor: "#f5f5f5",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: " 1rem",
                        borderColor: "transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "#5479FF",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5479FF",
                      },
                    },
                  }}
                  onChange={setTextToString(
                    setMap(setDescriptions, modifyElementInUseStateArray(i))
                  )}
                  value={descriptions[i]}
                />
              </td>
              <td>
                <TextField
                  name="Name"
                  id="Name"
                  className="w-3/5 bg-white rounded-2xl shadow-inner"
                  sx={{
                    backgroundColor: "#f5f5f5",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: " 1rem",
                        borderColor: "transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "#5479FF",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5479FF",
                      },
                    },
                  }}
                  onChange={setTextToInt(
                    setMap(setOrders, modifyElementInUseStateArray(i))
                  )}
                  value={order.toString()}
                  type="number"
                />
              </td>
            </tr>
          ))}
        </table>
        <FinishButton
          text="add"
          onClick={() => {
            setChildrenId(addItemInUseStateArray<Id | null>(null));
            setDescriptions(addItemInUseStateArray(""));
            setOrders(addItemInUseStateArray(0));
            setImageUrls(addItemInUseStateArray<string | null>(null));
          }}
        />
        <FinishButton
          text="remove"
          onClick={() => {
            setChildrenId(removeElementInUseStateArray);
            setDescriptions(removeElementInUseStateArray);
            setOrders(removeElementInUseStateArray);
            setImageUrls(removeElementInUseStateArray);
          }}
        />
        {_id ? (
          <FinishButton
            text="update"
            onClick={() => {
              editImageAndDescription(
                {
                  _id,
                  types,
                  name,
                  children: childrenId.map((id, i) => ({
                    _id: id,
                    imageUrl: imageUrls[i],
                    description: descriptions[i],
                    order: orders[i],
                  })),
                },
                token,
                updateSocket,
                room
              );
            }}
          />
        ) : (
          <FinishButton
            text="create"
            onClick={() => {
              createImageAndDescriptionContainer(
                {
                  types,
                  name,
                  children: orders.map((order, i) => ({
                    order,
                    imageUrl: imageUrls[i],
                    description: descriptions[i],
                  })),
                  baanId: imageAndDescriptionContainersPack.baan._id,
                },
                token,
                updateSocket,
                room
              );
            }}
          />
        )}
      </div>
    </div>
  );
}
