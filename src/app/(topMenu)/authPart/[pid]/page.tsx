import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AllAnswerAndQuestionPage from "@/components/AllAnswerAndQuestionPage";
import AllInOneLock from "@/components/AllInOneLock";
import BackToHome from "@/components/BackToHome";
import PlanServer from "@/components/PlanServer";
import RegisterPartServer from "@/components/RegisterPartServer";
import { stringToId } from "@/components/setup";
import UpdateBaanServer from "@/components/UpdateBaanServer";
import UpdateCampServer from "@/components/UpdateCampServer";
import WelfareServer from "@/components/WelfareServer";
import getAllAnswerAndQuestion from "@/libs/camp/getAllAnswerAndQuestion";
import getCamp from "@/libs/camp/getCamp";
import getPart from "@/libs/camp/getPart";
import getPeeCamp from "@/libs/camp/getPeeCamp";
import getCampMemberCardByCampId from "@/libs/user/getCampMemberCardByCampId";
import getTimeOffset from "@/libs/user/getTimeOffset";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import React from "react";
export default async function Baan({ params }: { params: { pid: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const token = session.user.token;
  const partId = stringToId(params.pid);
  const user = await getUserProfile(session.user.token);
  const part = await getPart(partId);
  const camp = await getCamp(part.campId);
  const selectOffset = await getTimeOffset(user.selectOffsetId);
  const campMemberCard = await getCampMemberCardByCampId(part.campId, token);
  if (
    !user.authPartIds.includes(camp.partBoardId) &&
    !user.authPartIds.includes(camp.partCoopId) &&
    !user.authPartIds.includes(camp.partRegisterId) &&
    !user.authPartIds.includes(camp.partWelfareId) &&
    !user.authPartIds.includes(camp.partPlanId)
  ) {
    return <BackToHome />;
  }
  const dataInput = await getAllAnswerAndQuestion(camp._id, token);
  switch (partId.toString()) {
    case camp.partCoopId.toString(): {
      switch (campMemberCard.role) {
        case "nong": {
          return <BackToHome />;
        }
        case "pee": {
          const peeCamp = await getPeeCamp(campMemberCard.campModelId, token);
          return (
            <AllInOneLock token={token} lock={user.mode == "nong"} pushToHome>
              <UpdateBaanServer baanId={peeCamp.baanId} />
              <AllAnswerAndQuestionPage
                token={token}
                dataInput={dataInput}
                campIdInput={camp._id.toString()}
              />
            </AllInOneLock>
          );
        }
        case "peto": {
          return (
            <AllInOneLock token={token} lock={user.mode == "nong"} pushToHome>
              {camp.baanIds.map((baanId, i) => (
                <UpdateBaanServer key={i} baanId={baanId} />
              ))}
              <AllAnswerAndQuestionPage
                token={token}
                dataInput={dataInput}
                campIdInput={camp._id.toString()}
              />
            </AllInOneLock>
          );
        }
      }
      break;
    }
    case camp.partBoardId.toString(): {
      return (
        <AllInOneLock
          token={token}
          lock={user.mode == "nong"}
          pushToHome
          bypass
        >
          <UpdateCampServer campId={camp._id} token={token} />
          <RegisterPartServer campId={camp._id} token={token} isBoard={true} />
          <WelfareServer
            campId={camp._id}
            token={token}
            partIdString={part._id.toString()}
            selectOffset={selectOffset}
          />
          <PlanServer campId={camp._id} token={token} />
          <AllAnswerAndQuestionPage
            token={token}
            dataInput={dataInput}
            campIdInput={camp._id.toString()}
          />
        </AllInOneLock>
      );
    }
    case camp.partRegisterId.toString(): {
      return (
        <AllInOneLock token={token} lock={user.mode == "nong"} pushToHome>
          <RegisterPartServer campId={camp._id} token={token} isBoard={false} />
          <AllAnswerAndQuestionPage
            token={token}
            dataInput={dataInput}
            campIdInput={camp._id.toString()}
          />
        </AllInOneLock>
      );
    }
    case camp.partWelfareId.toString(): {
      return (
        <AllInOneLock token={token} lock={user.mode == "nong"} pushToHome>
          <WelfareServer
            campId={camp._id}
            token={token}
            partIdString={part._id.toString()}
            selectOffset={selectOffset}
          />
        </AllInOneLock>
      );
    }
    case camp.partPlanId.toString(): {
      return (
        <AllInOneLock token={token} lock={user.mode == "nong"} pushToHome>
          <PlanServer campId={camp._id} token={token} />
        </AllInOneLock>
      );
    }
  }
}
