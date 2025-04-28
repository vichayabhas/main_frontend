"use client";

import FinishButton from "@/components/utility/FinishButton";
import { downloadText } from "@/components/utility/setup";
import React from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { useRouter } from "next/navigation";
import {
  BasicCamp,
  BasicBaan,
  ShowMember,
  Mode,
} from "../../../../../interface";

export default function BaanMembers({
  baan,
  campRole,
  pees,
  nongs,
  camp,
}: {
  camp: BasicCamp;
  baan: BasicBaan;
  campRole: Mode;
  nongs: ShowMember[];
  pees: ShowMember[];
}) {
  const router = useRouter();
  const nongRef = React.useRef(null);
  const peeRef = React.useRef(null);
  const nongDownload = useDownloadExcel({
    currentTableRef: nongRef.current,
    filename: `รายชื่อน้อง${camp.groupName} ${baan.name} จากค่าย ${camp.campName}`,
  });
  const peeDownload = useDownloadExcel({
    currentTableRef: peeRef.current,
    filename: `รายชื่อพี่${camp.groupName} ${baan.name} จากค่าย ${camp.campName}`,
  });
  return (
    <main
      className="text-center p-5 text-white rounded-3xl"
      style={{
        backgroundColor: "#961A1D",
        width: "80%",
        marginLeft: "10%",
        marginTop: "20px",
      }}
    >
      <div>
        <div
          className="text-4xl font-bold"
          style={{
            color: "white",
            marginTop: "30px",
            marginBottom: "10px",
          }}
        >
          รายชื่อน้อง{camp.groupName} {baan.fullName}
        </div>
        <table
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            width: "100%",
          }}
          ref={nongRef}
        >
          <tr style={{ border: "solid", borderColor: "white" }}>
            <th>ชือเล่น</th>
            <th>ชื่อจริง</th>
            <th>นามสกุล</th>
            <th>เพศ</th>
            {campRole !== "nong" ? (
              <>
                <th>ค้างคืนหรือไม่</th>
                <th>id</th>
                <th>รหัสประจำตัวนิสิต</th>
                <th>เบอร์โทรศัพท์</th>
                <th>email</th>
                <th>มีกระติกน้ำหรือไม่</th>
                <th>ขนาดเสื้อ</th>
                <th>กรุ๊ปของนิสิต</th>
                <th>ปัญหาสุขภาพ</th>
              </>
            ) : null}
          </tr>
          {nongs.map((user: ShowMember, i) => {
            return (
              <tr style={{ border: "solid", borderColor: "white" }} key={i}>
                <td>{user.nickname}</td>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{user.gender}</td>
                {campRole !== "nong" ? (
                  <>
                    <td>{user.sleep ? <>ค้างคืน</> : <>ไม่ค้างคืน</>} </td>
                    <td
                      onClick={() => {
                        router.push(`/userProfile/${user._id}`);
                      }}
                    >
                      {user._id.toString()}
                    </td>
                    <td>{user.studentId}</td>
                    <td>{user.tel}</td>
                    <td>{user.email}</td>
                    <td>{user.haveBottle.toString()}</td>
                    <td>{user.shirtSize}</td>
                    <td>{user.group}</td>
                    {user.healthIssueId ? (
                      <td
                        onClick={() => {
                          router.push(
                            `/healthIssue/${user.healthIssueId?.toString()}`
                          );
                        }}
                      >
                        {user.healthIssueId.toString()}
                      </td>
                    ) : (
                      <td> null</td>
                    )}
                  </>
                ) : null}
              </tr>
            );
          })}
        </table>
      </div>
      <FinishButton text={downloadText} onClick={nongDownload.onDownload} />
      <div>
        <div
          className="text-4xl font-bold"
          style={{
            color: "white",
            marginTop: "40px",
            marginBottom: "10px",
          }}
        >
          รายชื่อพี่{camp.groupName} {baan.fullName}
        </div>
        <table
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            width: "100%",
          }}
          ref={peeRef}
        >
          <tr style={{ border: "solid", borderColor: "white" }}>
            <th>ชือเล่น</th>
            <th>ชื่อจริง</th>
            <th>นามสกุล</th>
            <th>เพศ</th>
            {campRole !== "nong" ? (
              <>
                <th>ค้างคืนหรือไม่</th>
                <th>id</th>
                <th>รหัสประจำตัวนิสิต</th>
                <th>เบอร์โทรศัพท์</th>
                <th>email</th>
                <th>มีกระติกน้ำหรือไม่</th>
                <th>ขนาดเสื้อ</th>
                <th>กรุ๊ปของนิสิต</th>
                <th>ปัญหาสุขภาพ</th>
              </>
            ) : null}
          </tr>
          {pees.map((user: ShowMember, i) => (
            <tr style={{ border: "solid", borderColor: "white" }} key={i}>
              <td>{user.nickname}</td>
              <td>{user.name}</td>
              <td>{user.lastname}</td>
              <td>{user.gender}</td>
              {campRole !== "nong" ? (
                <>
                  <td>{user.sleep ? <>ค้างคืน</> : <>ไม่ค้างคืน</>} </td>
                  <td
                    onClick={() => {
                      router.push(`/userProfile/${user._id}`);
                    }}
                  >
                    {user._id.toString()}
                  </td>
                  <td>{user.studentId}</td>
                  <td>{user.tel}</td>
                  <td>{user.email}</td>
                  <td>{user.haveBottle.toString()}</td>
                  <td>{user.shirtSize}</td>
                  <td>{user.group}</td>
                  {user.healthIssueId ? (
                    <td
                      onClick={() => {
                        router.push(
                          `/healthIssue/${user.healthIssueId?.toString()}`
                        );
                      }}
                    >
                      {user.healthIssueId.toString()}
                    </td>
                  ) : (
                    <td> null</td>
                  )}
                </>
              ) : null}
            </tr>
          ))}
        </table>
      </div>
      <FinishButton text={downloadText} onClick={peeDownload.onDownload} />
    </main>
  );
}
