"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Checkbox, MenuItem, Select } from "@mui/material";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GetGroupContainer, BasicCamp, BasicBaan } from "../../../../interface";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { downloadExcel } from "react-export-table-to-excel";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import FinishButton from "@/components/utility/FinishButton";
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  downloadText,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getBackendUrl,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSwop,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  SocketReady,
} from "@/components/utility/setup";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { io } from "socket.io-client";
