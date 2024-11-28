import mongoose from "mongoose";
export type Id = mongoose.Types.ObjectId;
export interface InterActionPlan {
  action: string;
  partId: Id;
  placeIds: Id[];
  start: Date;
  end: Date;
  headId: Id;
  body: string;
  _id: Id;
  partName: string;
  //public
}
export interface InterBaanBack {
  name: string;
  fullName: string | null;
  campId: Id;
  peeIds: Id[];
  nongIds: Id[];
  nongHeathIssueIds: Id[];
  peeHeathIssueIds: Id[];
  nongShirtSize: Map<"S" | "M" | "L" | "XL" | "XXL" | "3XL", number>;
  peeShirtSize: Map<"S" | "M" | "L" | "XL" | "XXL" | "3XL", number>;
  songIds: Id[];
  peeModelIds: Id[];
  nongModelId: Id;
  mapPeeCampIdByPartId: Map<Id, Id>; ///////////////////////i
  nongCampMemberCardIds: Id[];
  peeCampMemberCardIds: Id[];
  link: string | null;
  styleId: Id;
  boySleepPlaceId: Id | null;
  girlSleepPlaceId: Id | null;
  normalPlaceId: Id | null;
  mapCampMemberCardIdByUserId: Map<Id, Id>;
  _id: Id;
  nongSleepIds: Id[];
  peeSleepIds: Id[];
  groupRef:
    | "A"
    | "B"
    | "C"
    | "Dog"
    | "E"
    | "F"
    | "G"
    | "H"
    | "J"
    | "K"
    | "L"
    | "M"
    | "N"
    | "P"
    | "Q"
    | "R"
    | "S"
    | "T"
    | "null";
  chatIds: Id[];
  mdTime: Date;
  peeChatIds: Id[];
  nongChatIds: Id[];
  nongSendMessage: boolean;
  nongCampMemberCardHaveHeathIssueIds: Id[];
  peeCampMemberCardHaveHeathIssueIds: Id[];
  nongHaveBottleIds: Id[];
  peeHaveBottleIds: Id[];
  //public
}
export interface InterBuilding {
  name: string;
  placeIds: Id[];
  actionPlanIds: Id[];
  fridayActIds: Id[];
  _id: Id;
  lostAndFoundIds: Id[];
  boySleepBaanIds: Id[];
  girlSleepBaanIds: Id[];
  normalBaanIds: Id[];
  partIds: Id[];
  //public
}
export interface InterCampBack {
  nameId: Id;
  round: number;
  dateStart: Date;
  dateEnd: Date;
  boardIds: Id[];
  peeIds: Id[];
  nongIds: Id[];
  partIds: Id[];
  petoIds: Id[];
  authorizeIds: Id[];
  nongHeathIssueIds: Id[];
  peeHeathIssueIds: Id[];
  petoHeathIssueIds: Id[];
  nongDataLock: boolean;
  nongShirtSize: Map<"S" | "M" | "L" | "XL" | "XXL" | "3XL", number>;
  peeShirtSize: Map<"S" | "M" | "L" | "XL" | "XXL" | "3XL", number>;
  petoShirtSize: Map<"S" | "M" | "L" | "XL" | "XXL" | "3XL", number>;
  nongModelIds: Id[];
  peeModelIds: Id[];
  petoModelIds: Id[];
  nongPendingIds: Map<Id, string>; /////////////i
  nongPassIds: Map<Id, string>; ////////////////////i
  open: boolean;
  peePassIds: Map<Id, Id>; //<userId,partId>               ////////////////////////i
  songIds: Id[];
  nongSureIds: Id[];
  baanIds: Id[];
  nongCampMemberCardIds: Id[];
  peeCampMemberCardIds: Id[];
  petoCampMemberCardIds: Id[];
  link: string | null;
  allDone: boolean;
  lockChangePickup: boolean;
  pictureUrls: string[];
  campStyleId: Id;
  actionPlanIds: Id[];
  workItemIds: Id[];
  nongPaidIds: Id[];
  nongInterviewIds: Map<Id, string>; ////////////////////////////////i
  registerModel: "noPaid" | "noInterview" | "all";
  memberStructure:
    | "nong->highSchool,pee->1year,peto->2upYear"
    | "nong->highSchool,pee->2upYear"
    | "nong->1year,pee->2upYear"
    | "nong->highSchool,pee->allYear"
    | "allYearMix";
  logoUrl: string | null;
  mapCampMemberCardIdByUserId: Map<Id, Id>;
  registerSheetLink: string | null;
  peeLock: boolean;
  outRoundIds: Id[];
  _id: Id;
  campName: string;
  nongSleepIds: Id[];
  peeSleepIds: Id[];
  nongSleepModel:
    | "นอนทุกคน"
    | "เลือกได้ว่าจะค้างคืนหรือไม่"
    | "ไม่มีการค้างคืน";
  peeSleepModel: "นอนทุกคน" | "เลือกได้ว่าจะค้างคืนหรือไม่" | "ไม่มีการค้างคืน";
  groupRefMap: Map<Group, Id>;
  baanBoardId: Id | null;
  partNameIds: Id[];
  partBoardId: Id;
  partCoopId: Id;
  partRegisterId: Id;
  partPeeBaanId: Id;
  groupName: string;
  peeDataLock: boolean;
  petoDataLock: boolean;
  haveCloth: boolean;
  actionPlanOffset: number;
  nongMapIdLtoG: Map<number, Id>;
  peeMapIdLtoG: Map<number, Id>;
  nongMapIdGtoL: Map<Id, number>;
  peeMapIdGtoL: Map<Id, number>;
  currentNong: number;
  currentPee: number;
  mdTime: Date;
  partWelfareId: Id;
  partMedId: Id;
  partPlanId: Id;
  allPetoChatIds: Id[];
  petoSleepIds: Id[];
  nongCampMemberCardHaveHeathIssueIds: Id[];
  peeCampMemberCardHaveHeathIssueIds: Id[];
  petoCampMemberCardHaveHeathIssueIds: Id[];
  nongHaveBottleIds: Id[];
  peeHaveBottleIds: Id[];
  petoHaveBottleIds: Id[];
  partPrStudioId: Id;
  choiceQuestionIds: Id[];
  textQuestionIds: Id[];
  nongAnswerPackIds: Id[];
  peeAnswerPackIds: Id[];
  mapAnswerPackIdByUserId: Map<Id, Id>;
  peeAnswerIds: Id[];
  showCorrectAnswerAndScore: boolean;
  canAnswerTheQuestion: boolean;
  mealIds: Id[];
  foodIds: Id[];
  canNongSeeAllAnswer: boolean;
  canNongSeeAllActionPlan: boolean;
  canNongSeeAllTrackingSheet: boolean;
  canNongAccessDataWithRoleNong: boolean;
  //public
}
export interface InterCampStyle {
  refId: Id;
  types: "camp" | "baan";
  _id: Id;
  //public
}
export interface InterFridayAct {
  company: string;
  date: Date;
  staffId: Id[];
  limit: number;
  studentId: Id[];
  placeId: Id;
  _id: Id;
  //public
}
export interface InterHeathIssue extends HeathIssueBody {
  userId: Id;
  _id: Id;
  campIds: Id[];
  campMemberCardIds: Id[];
  //private
}
export interface InterNameContainer {
  campIds: Id[];
  name: string;
  _id: Id;
  //public
}
export interface InterNongCampBack {
  campId: Id;
  baanId: Id;
  nongIds: Id[];
  nongCampMemberCardIds: Id[];
  _id: Id;
  //mapNongCampIdByUserId: Map<string, string>
  //public
}
export interface InterPartBack {
  nameId: Id;
  campId: Id;
  peeIds: Id[];
  petoIds: Id[];
  peeHeathIssueIds: Id[];
  petoHeathIssueIds: Id[];
  peeShirtSize: Map<"S" | "M" | "L" | "XL" | "XXL" | "3XL", number>;
  petoShirtSize: Map<"S" | "M" | "L" | "XL" | "XXL" | "3XL", number>;
  peeModelIds: Id[];
  petoModelId: Id;
  mapPeeCampIdByBaanId: Map<Id, Id>; /////////////////i
  peeCampMemberCardIds: Id[];
  petoCampMemberCardIds: Id[];
  actionPlanIds: Id[];
  workItemIds: Id[];
  placeId: Id | null;
  mapCampMemberCardIdByUserId: Map<Id, Id>;
  _id: Id;
  partName: string;
  peeSleepIds: Id[];
  chatIds: Id[];
  isAuth: boolean;
  petoSleepIds: Id[];
  peeCampMemberCardHaveHeathIssueIds: Id[];
  petoCampMemberCardHaveHeathIssueIds: Id[];
  peeHaveBottleIds: Id[];
  petoHaveBottleIds: Id[];
  //public
}
export interface InterPartNameContainer {
  campIds: Id[];
  name: string;
  partIds: Id[];
  _id: Id;
  //public
}
export interface InterPeeCamp {
  campId: Id;
  partId: Id;
  baanId: Id;
  peeIds: Id[];
  peeCampMemberCardIds: Id[];
  _id: Id;
  //public
}
export interface InterPetoCamp {
  campId: Id;
  partId: Id;
  petoCampMemberCardIds: Id;
  petoIds: Id[];
  _id: Id;
  //public
}
export interface InterPlace {
  buildingId: Id;
  floor: string;
  room: string;
  actionPlanIds: Id[];
  fridayActIds: Id[];
  boySleepBaanIds: Id[];
  girlSleepBaanIds: Id[];
  normalBaanIds: Id[];
  sleepCap: number;
  actCap: number;
  studyCap: number;
  _id: Id;
  //public
}
export interface InterCampMemberCard {
  userId: Id;
  size: "S" | "M" | "L" | "XL" | "XXL" | "3XL";
  campModelId: Id;
  role: "nong" | "pee" | "peto";
  receive: "baan" | "part";
  received: number;
  _id: Id;
  haveBottle: boolean;
  sleepAtCamp: boolean;
  chatIds: Id[];
  allChatIds: Id[];
  ownChatIds: Id[];
  healthIssueId: Id | null;
  blackListFoodIds: Id[];
  whiteListFoodIds: Id[];
  //private
}
export interface InterSong {
  name: string;
  campIds: Id[];
  baanIds: Id[];
  author: string;
  time: number;
  link: string;
  userLikeIds: Id[];
  _id: Id;
  //public
}
export interface InterUser {
  _id: Id;
  name: string;
  lastname: string;
  nickname: string;
  email: string;
  password: string;
  tel: string;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
  studentId: string;
  gender: "Male" | "Female";
  shirtSize: Size;
  healthIssueId: Id;
  haveBottle: boolean;
  mode: Mode;
  nongCampIds: Id[];
  peeCampIds: Id[];
  petoCampIds: Id[];
  group: Group | "null";
  role: Role;
  filterIds: Id[];
  registerIds: Id[];
  authorizeIds: Id[];
  fridayActIds: Id[];
  fridayActEn: boolean;
  fridayAuth: boolean;
  likeSongIds: Id[];
  campMemberCardIds: Id[];
  lostAndFoundIds: Id[];
  createdAt: Date;
  linkHash: string;
  citizenId: string;
  likeToSleepAtCamp: boolean;
  authPartIds: Id[];
  selectOffsetId: Id;
  displayOffsetId: Id;
  chatIds: Id[];
  nongAnswerPackIds: Id[];
  peeAnswerPackIds: Id[];
  //private
}
export interface InterWorkingItem {
  name: string;
  link: string | null;
  status: "not start" | "in process" | "done";
  partId: Id;
  linkOutIds: Id[];
  fromId: Id | null;
  createBy: Id;
  _id: Id;
  password: string;
  partName: string;
  //public
}
export interface InterSize {
  _id: Id | null;
  sizeS: number;
  sizeM: number;
  sizeL: number;
  sizeXL: number;
  sizeXXL: number;
  size3XL: number;
  //utility
}
export interface InterBaanFront {
  name: string;
  fullName: string | null;
  campId: Id;
  peeIds: Id[];
  nongIds: Id[];
  nongHeathIssueIds: Id[];
  peeHeathIssueIds: Id[];
  nongShirtSize: InterSize; //
  peeShirtSize: InterSize; //
  songIds: Id[];
  peeModelIds: Id[];
  nongModelId: Id;
  nongCampMemberCardIds: Id[];
  peeCampMemberCardIds: Id[];
  link: string | null;
  styleId: Id;
  boySleepPlaceId: Id | null;
  girlSleepPlaceId: Id | null;
  normalPlaceId: Id | null;
  mapCampMemberCardIdByUserId: MapObjectId[];
  _id: Id;
  nongSleepIds: Id[];
  peeSleepIds: Id[];
  groupRef:
    | "A"
    | "B"
    | "C"
    | "Dog"
    | "E"
    | "F"
    | "G"
    | "H"
    | "J"
    | "K"
    | "L"
    | "M"
    | "N"
    | "P"
    | "Q"
    | "R"
    | "S"
    | "T"
    | "null";
  chatIds: Id[];
  mdTime: Date;
  peeChatIds: Id[];
  nongChatIds: Id[];
  nongSendMessage: boolean;
  nongCampMemberCardHaveHeathIssueIds: Id[];
  peeCampMemberCardHaveHeathIssueIds: Id[];
  nongHaveBottleIds: Id[];
  peeHaveBottleIds: Id[];
  //public
}

export interface InterCampFront {
  nameId: Id;
  round: number;
  dateStart: Date;
  dateEnd: Date;
  boardIds: Id[];
  peeIds: Id[];
  nongIds: Id[];
  partIds: Id[];
  petoIds: Id[];
  authorizeIds: Id[];
  nongHeathIssueIds: Id[];
  peeHeathIssueIds: Id[];
  petoHeathIssueIds: Id[];
  nongDataLock: boolean;
  nongShirtSize: InterSize;
  peeShirtSize: InterSize;
  petoShirtSize: InterSize;
  nongModelIds: Id[];
  peeModelIds: Id[];
  petoModelIds: Id[];
  nongPendingIds: MyMap[]; /////////////i
  nongPassIds: MyMap[]; ////////////////////i
  open: boolean;
  peePassIds: MapObjectId[]; //<userId,partId>               ////////////////////////i
  songIds: Id[];
  nongSureIds: Id[];
  baanIds: Id[];
  nongCampMemberCardIds: Id[];
  peeCampMemberCardIds: Id[];
  petoCampMemberCardIds: Id[];
  link: string | null;
  allDone: boolean;
  lockChangePickup: boolean;
  pictureUrls: string[];
  campStyleId: Id;
  actionPlanIds: Id[];
  workItemIds: Id[];
  nongPaidIds: Id[];
  nongInterviewIds: MyMap[]; ////////////////////////////////i
  registerModel: "noPaid" | "noInterview" | "all";
  memberStructure:
    | "nong->highSchool,pee->1year,peto->2upYear"
    | "nong->highSchool,pee->2upYear"
    | "nong->1year,pee->2upYear"
    | "nong->highSchool,pee->allYear"
    | "allYearMix";
  logoUrl: string | null;
  mapCampMemberCardIdByUserId: MapObjectId[];
  registerSheetLink: string | null;
  peeLock: boolean;
  outRoundIds: Id[];
  _id: Id;
  campName: string;
  nongSleepIds: Id[];
  peeSleepIds: Id[];
  nongSleepModel:
    | "นอนทุกคน"
    | "เลือกได้ว่าจะค้างคืนหรือไม่"
    | "ไม่มีการค้างคืน";
  peeSleepModel: "นอนทุกคน" | "เลือกได้ว่าจะค้างคืนหรือไม่" | "ไม่มีการค้างคืน";
  baanBoardId: Id | null;
  partNameIds: Id[];
  partBoardId: Id;
  partCoopId: Id;
  partRegisterId: Id;
  partPeeBaanId: Id;
  groupName: string;
  peeDataLock: boolean;
  petoDataLock: boolean;
  haveCloth: boolean;
  actionPlanOffset: number;
  currentNong: number;
  currentPee: number;
  nongMapIdGtoL: MyMap[];
  peeMapIdGtoL: MyMap[];
  mdTime: Date;
  partWelfareId: Id;
  partMedId: Id;
  partPlanId: Id;
  allPetoChatIds: Id[];
  petoSleepIds: Id[];
  nongCampMemberCardHaveHeathIssueIds: Id[];
  peeCampMemberCardHaveHeathIssueIds: Id[];
  petoCampMemberCardHaveHeathIssueIds: Id[];
  nongHaveBottleIds: Id[];
  peeHaveBottleIds: Id[];
  petoHaveBottleIds: Id[];
  partPrStudioId: Id;
  choiceQuestionIds: Id[];
  textQuestionIds: Id[];
  nongAnswerPackIds: Id[];
  peeAnswerPackIds: Id[];
  mapAnswerPackIdByUserId: MapObjectId[];
  peeAnswerIds: Id[];
  showCorrectAnswerAndScore: boolean;
  canAnswerTheQuestion: boolean;
  mealIds: Id[];
  foodIds: Id[];
  canNongSeeAllAnswer: boolean;
  canNongSeeAllActionPlan: boolean;
  canNongSeeAllTrackingSheet: boolean;
  canNongAccessDataWithRoleNong: boolean;
  //public
}
export interface InterPartFront {
  nameId: Id;
  campId: Id;
  peeIds: Id[];
  petoIds: Id[];
  peeHeathIssueIds: Id[];
  petoHeathIssueIds: Id[];
  peeShirtSize: InterSize;
  petoShirtSize: InterSize;
  peeModelIds: Id[];
  petoModelId: Id;
  peeCampMemberCardIds: Id[];
  petoCampMemberCardIds: Id[];
  actionPlanIds: Id[];
  workItemIds: Id[];
  placeId: Id | null;
  mapCampMemberCardIdByUserId: MapObjectId[];
  _id: Id;
  partName: string;
  peeSleepIds: Id[];
  chatIds: Id[];
  isAuth: boolean;
  petoSleepIds: Id[];
  peeCampMemberCardHaveHeathIssueIds: Id[];
  petoCampMemberCardHaveHeathIssueIds: Id[];
  peeHaveBottleIds: Id[];
  petoHaveBottleIds: Id[];
  //public
}
export interface MyMap {
  key: Id;
  value: string;
  //utility
}
export interface InterLostAndFound {
  campId: Id | null;
  type: "lost" | "found";
  name: string;
  detail: string;
  userId: Id;
  placeId: Id | null;
  buildingId: Id | null;
  _id: Id;
  //public
}
export interface Register {
  name: string;
  lastname: string;
  nickname: string;
  email: string;
  password: string;
  gender: "Male" | "Female";
  shirtSize: "S" | "M" | "L" | "XL" | "XXL" | "3XL";
  haveBottle: boolean;
  tel: string;
  citizenId: string;
  likeToSleepAtCamp: boolean;
  //private
}
export interface UpdateCamp {
  nongDataLock: boolean;
  open: boolean;
  link: string | null;
  allDone: boolean;
  lockChangePickup: boolean;
  pictureUrls: string[];
  logoUrl: string | null;
  dateStart: Date;
  dateEnd: Date;
  registerSheetLink: string | null;
  peeLock: boolean;
  groupName: string;
  peeDataLock: boolean;
  petoDataLock: boolean;
  haveCloth: boolean;
  showCorrectAnswerAndScore: boolean;
  canAnswerTheQuestion: boolean;
  canNongSeeAllAnswer: boolean;
  canNongSeeAllActionPlan: boolean;
  canNongSeeAllTrackingSheet: boolean;
  canNongAccessDataWithRoleNong: boolean;
  //public
}
export interface CreateCamp {
  nameId: Id;
  round: number;
  dateStart: Date;
  dateEnd: Date;
  boardIds: Id[];
  registerModel: "noPaid" | "noInterview" | "all";
  memberStructure:
    | "nong->highSchool,pee->1year,peto->2upYear"
    | "nong->highSchool,pee->2upYear"
    | "nong->1year,pee->2upYear"
    | "nong->highSchool,pee->allYear"
    | "allYearMix";
  nongSleepModel:
    | "นอนทุกคน"
    | "เลือกได้ว่าจะค้างคืนหรือไม่"
    | "ไม่มีการค้างคืน";
  peeSleepModel: "นอนทุกคน" | "เลือกได้ว่าจะค้างคืนหรือไม่" | "ไม่มีการค้างคืน";
  //public
}
export interface MapObjectId {
  key: Id;
  value: Id;
  //utility
}
export interface ShowMember {
  //                          id ของ mongodb
  name: string; //
  lastname: string; //                    นามสกุล
  nickname: string; //
  email: string; //             email
  studentId: string | null; //
  gender: "Male" | "Female"; //           เพศ
  shirtSize: "S" | "M" | "L" | "XL" | "XXL" | "3XL"; //
  healthIssueId: Id | null; //
  haveBottle: boolean; //
  group:
    | "A"
    | "B"
    | "C"
    | "Dog"
    | "E"
    | "F"
    | "G"
    | "H"
    | "J"
    | "K"
    | "L"
    | "M"
    | "N"
    | "P"
    | "Q"
    | "R"
    | "S"
    | "T"
    | null; //
  likeSongs: string[]; //
  tel: string; //
  _id: Id;
  sleep: boolean;
  isWearing: boolean;
  spicy: boolean;
  id: number;
  campMemberCardId: Id;
  //private
}
export interface UpdateBaan {
  name: string;
  fullName: string | null;
  baanId: Id;
  link: string | null;
  girlSleepPlaceId: Id | null;
  boySleepPlaceId: Id | null;
  normalPlaceId: Id | null;
  nongSendMessage: boolean;
  //public
}
export type Group =
  | "A"
  | "B"
  | "C"
  | "Dog"
  | "E"
  | "F"
  | "G"
  | "H"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T";
export type Size = "S" | "M" | "L" | "XL" | "XXL" | "3XL";
export type RoleCamp = Mode | "peto";
export type Role = RoleCamp | "admin";
export type Mode = "nong" | "pee";
export interface HeathIssueBody {
  food: string;
  chronicDisease: string;
  medicine: string;
  extra: string;
  isWearing: boolean;
  spicy: boolean;
  foodConcern: string;
  foodLimit: FoodLimit;
  //private
}
export interface CreateActionPlan {
  action: string;
  partId: Id;
  placeIds: Id[];
  start: Date;
  end: Date;
  headId: Id;
  body: string;
  //public
}
export interface showActionPlan {
  _id: Id;
  action: string;
  partId: Id;
  placeIds: Id[];
  start: Date;
  end: Date;
  headId: Id;
  body: string;
  headName: string;
  headTel: string;
  partName: string;
  placeName: string[];
  //public
}

export interface CreateWorkingItem {
  name: string;
  link: string | null;
  partId: Id;
  fromId: Id | null;
  password: string;
  //public
}
export interface ShowRegister {
  name: string;
  lastname: string;
  nickname: string;
  userId: Id;
  partId: Id;
  partName: string;
  //private
}
export interface RegisBaan {
  pees: ShowMember[];
  nongs: ShowMember[];
  baan: InterBaanFront;
  //public
}
export interface RegisPart {
  pees: ShowMember[];
  petos: ShowMember[];
  part: InterPartFront;
  //public
}
export interface InterTimeOffset {
  userId: Id;
  day: number;
  hour: number;
  minute: number;
  _id: Id;
  //private
}
export interface UpdateTimeOffsetRaw {
  day: number;
  hour: number;
  minute: number;
  //private
}
export interface UpdateTimeOffset {
  display: UpdateTimeOffsetRaw;
  select: UpdateTimeOffsetRaw;
  //private
}
export interface AddLostAndFound {
  campId: Id | null;
  type: "lost" | "found";
  name: string;
  detail: string;
  placeId: Id | null;
  //public
}
export interface ShowLostAndFound extends InterLostAndFound {
  userName: string;
  userLastName: string;
  userNickname: string;
  buildingName: string;
  room: string;
  floor: string;
  tel: string;
  campName: string;
  //public
}
export interface ShowPlace {
  buildingName: string;
  floor: string;
  room: string;
  _id: Id;
  //public
}
export interface mapObjectIdToLocalId {
  key: string;
  value: string;
  //utility
}
export interface ShowNong {
  name: string; //
  lastname: string; //                    นามสกุล
  nickname: string; //
  gender: "Male" | "Female"; //           เพศ
  id: number;
  //private
}
export interface ShowRegisterNong {
  link: string;
  localId: string;
  user: InterUser;
  //private
}
export interface AllNongRegister {
  pendings: ShowRegisterNong[];
  interviews: ShowRegisterNong[];
  passs: ShowRegisterNong[];
  paids: ShowRegisterNong[];
  sures: ShowRegisterNong[];
  //public
}
export interface InterChat {
  message: string;
  userId: Id;
  campModelId: Id;
  role: RoleCamp;
  typeChat: TypeChat;
  refId: Id; //'น้องคุยส่วนตัวกับพี่','คุยกันในบ้าน' baan,'คุยกันในฝ่าย' part,'พี่คุยกันในบ้าน' baan,'พี่บ้านคุยกัน' part
  campMemberCardIds: Id[];
  date: Date;
  //public
}
export interface ShowChat extends InterChat {
  nickname: string;
  baanName: string;
  partName: string;
  roomName: string;
  //public
}
export interface CreatePeeChat {
  message: string;
  partId: Id;
  //public
}
export interface EditChat {
  message: string;
  id: Id;
  //public
}
export interface CreateBaanChat {
  message: string;
  baanId: Id;
  //public
}
export interface CreateNongChat {
  message: string;
  CampMemberCard: Id;
  //public
}
export const departures = [
  "วิศวกรรมเคมี (Chemical Engineering)",
  "วิศวกรรมเคมีและกระบวนการ (นานาชาติ) (Chemical and Process Engineering)",
  "วิศวกรรมเครื่องกล (Mechanical Engineering)",
  "วิศวกรรมเรือ (Naval Architecture and Marine Engineering)",
  "วิศวกรรมยานยนต์ (Automotive Engineering)",
  "วิศวกรรมไฟฟ้า (Electrical Engineering)",
  "วิศวกรรมโยธา (Civil Engineering)",
  "วิศวกรรมโลหการและวัสดุ (Metallurgical and Materials Engineering)",
  "วิศวกรรมสิ่งแวดล้อม (Environmental Engineering)",
  "วิศวกรรมสำรวจ (Survey Engineering)",
  "วิศวกรรมทรัพยากรธรณี (Georesources Engineering)",
  "วิศวกรรมปิโตรเลียม (Petroleum Engineering)",
  "วิศวกรรมอุตสาหการ (Industrial Engineering)",
  "วิศวกรรมคอมพิวเตอร์ (Computer Engineering)",
  "วิศวกรรมคอมพิวเตอร์และเทคโนโลยีดิจิทัล (หลักสูตร Sandbox) (Computer Engineering and Digital Technology)",
  "วิศวกรรมนิวเคลียร์และรังสี (Nuclear and Radiological Engineering)",
  "วิศวกรรมนาโน (นานาชาติ)** (Nano-Engineering)",
  "วิศวกรรมการออกแบบและการผลิตยานยนต์ (นานาชาติ)** (Automotive Design and Manufacturing Engineering)",
  "วิศวกรรมอากาศยาน (นานาชาติ)** (Aerospace Engineering)",
  "วิศวกรรมสารสนเทศและการสื่อสาร (นานาชาติ)** (Information and Communication Engineering)",
  "วิศวกรรมหุ่นยนต์และปัญญาประดิษฐ์ (นานาชาติ)** (Robotics and Artificial Intelligence Engineering)",
] as const;
export type Departure = (typeof departures)[number];
export const typeChats = [
  "น้องคุยส่วนตัวกับพี่",
  "คุยกันในบ้าน",
  "คุยกันในฝ่าย",
  "พี่คุยกันในบ้าน",
  "พี่บ้านคุยกัน",
] as const;
export type TypeChat = (typeof typeChats)[number];
export type GetChat =
  | "getAllChatFromCampId"
  | "getPartChat"
  | "getNongBaanChat"
  | "getPeeBaanChat"
  | "getNongChat"
  | "getPartPeebaanChat";
export interface AllPlaceData {
  allPlace: Map<string, InterPlace[]>;
  allBuildings: Map<Id, InterBuilding>;
  //public
}
export interface ChatReady {
  chats: ShowChat[];
  timeOffset: InterTimeOffset;
  mode: Mode;
  groupName: string;
  sendType: {
    id: Id;
    roomType: TypeChat;
  } | null;
  success: boolean;
  roomName: string;
  //private
}
export const foodLimits = [
  "อิสลาม",
  "มังสวิรัติ",
  "เจ",
  "ไม่มีข้อจำกัดด้านความเชื่อ",
] as const;
export type FoodLimit = (typeof foodLimits)[number];
export interface HeathIssuePack {
  heathIssue: HeathIssueBody;
  user: InterUser;
  campMemberCardId: Id;
  //private
}
export interface CampWelfarePack {
  baanWelfares: WelfarePack[];
  partWelfares: WelfarePack[];
  isHavePeto: boolean;
  groupName: string;
  campWelfare: WelfarePack;
  baanHaveBottles: CampNumberData[];
  partHaveBottles: CampNumberData[];
  campBottleNumber: CampNumberData;
  baanSpicyS: CampNumberData[];
  partSpicyS: CampNumberData[];
  campSpicyNumber: CampNumberData;
  baanHalalS: CampNumberData[];
  partHalalS: CampNumberData[];
  campHalalNumber: CampNumberData;
  baanVegetarians: CampNumberData[];
  partVegetarians: CampNumberData[];
  campVegetarianNumber: CampNumberData;
  baanVegans: CampNumberData[];
  partVegans: CampNumberData[];
  campVeganNumber: CampNumberData;
  baanIsWearings: CampNumberData[];
  partIsWearings: CampNumberData[];
  campWearingNumber: CampNumberData;
  meals: InterMeal[];
  _id: Id;
  //public
}
export interface WelfarePack {
  nongHealths: HeathIssuePack[];
  peeHealths: HeathIssuePack[];
  petoHealths: HeathIssuePack[];
  name: string;
  nongSize: InterSize;
  peeSize: InterSize;
  petoSize: InterSize;
  //public
}
export interface GetBaansForPlan {
  name: string;
  fullName: string;
  boy: InterPlace | null;
  girl: InterPlace | null;
  normal: InterPlace | null;
  _id: Id;
  //public
}
export interface GetPartsForPlan {
  name: string;
  place: InterPlace | null;
  _id: Id;
  //public
}
export interface GetAllPlanData {
  name: string;
  baanDatas: GetBaansForPlan[];
  partDatas: GetPartsForPlan[];
  _id: Id;
  groupName: string;
  isOverNightCamp: boolean;
  baanBoySleeps: CampNumberData[];
  baanGirlSleeps: CampNumberData[];
  partBoySleeps: CampNumberData[];
  partGirlSleeps: CampNumberData[];
  boySleepNumber: CampNumberData;
  girlSleepNumber: CampNumberData;
  isHavePeto: boolean;
  baanSleepDatas: CampSleepDataContainer[];
  partSleepDatas: CampSleepDataContainer[];
  //public
}
export interface UpdateBaansForPlan {
  boyId: Id | null;
  girlId: Id | null;
  normalId: Id | null;
  _id: Id;
  //public
}
export interface UpdatePartsForPlan {
  placeId: Id | null;
  _id: Id;
  //public
}
export interface UpdateAllPlanData {
  baanDatas: UpdateBaansForPlan[];
  partDatas: UpdatePartsForPlan[];
  _id: Id;
  //public
}
export interface CampNumberData {
  name: string;
  nongNumber: number;
  peeNumber: number;
  petoNumber: number;
  //utility
}
export interface CampSleepDataContainer {
  name: string;
  nongBoys: InterUser[];
  nongGirls: InterUser[];
  peeBoys: InterUser[];
  peeGirls: InterUser[];
  petoBoys: InterUser[];
  petoGirls: InterUser[];
  //public
}
export interface InterChoiceAnswer {
  userId: Id;
  _id: Id;
  campId: Id;
  questionId: Id;
  answer: Choice | "-";
  score: number;
  containerId: Id;
  //private
}

export const choices = ["A", "B", "C", "D", "E"] as const;
export type Choice = (typeof choices)[number];
export interface InterChoiceQuestion {
  campId: Id;
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  _id: Id;
  scoreA: number;
  scoreB: number;
  scoreC: number;
  scoreD: number;
  scoreE: number;
  nongAnswerA: number;
  nongAnswerB: number;
  nongAnswerC: number;
  nongAnswerD: number;
  nongAnswerE: number;
  peeAnswerA: number;
  peeAnswerB: number;
  peeAnswerC: number;
  peeAnswerD: number;
  peeAnswerE: number;
  correct: Choice | "-";
  order: number;
  answerIds: Id[];
  //public
}
export interface EditChoiceQuestion {
  _id: Id | null;
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  scoreA: number;
  scoreB: number;
  scoreC: number;
  scoreD: number;
  scoreE: number;
  correct: Choice | "-";
  order: number;
  //public
}
export interface InterTextQuestion {
  question: string;
  _id: Id;
  campId: Id;
  answerIds: Id[];
  score: number;
  order: number;
  //public
}
export interface EditTextQuestion {
  question: string;
  _id: Id | null;
  score: number;
  order: number;
  //public
}
export interface InterAnswerContainer {
  choiceAnswerIds: Id[];
  textAnswerIds: Id[];
  campId: Id;
  userId: Id;
  _id: Id;
  role: RoleCamp;
  //private
}
export interface InterTextAnswer {
  _id: Id;
  answer: string;
  userId: Id;
  questionId: Id;
  score: number;
  containerId: Id;
  //private
}
export interface ChoiceAnswerPack {
  answer: Choice | "-";
  questionId: Id;
  answerId: Id | null;
  //private
}
export interface TextAnswerPack {
  answer: string;
  questionId: Id;
  answerId: Id | null;
  //private
}
export interface AnswerPack {
  campId: Id;
  textAnswers: TextAnswerPack[];
  choiceAnswers: ChoiceAnswerPack[];
  //private
}
export interface EditQuestionPack {
  campId: Id;
  texts: EditTextQuestion[];
  choices: EditChoiceQuestion[];
  //public
}
export interface GetChoiceQuestion extends InterChoiceQuestion {
  answer: Choice | "-";
  answerId: Id | null;
  //private
}
export interface GetTextQuestion extends InterTextQuestion {
  answer: string;
  answerId: Id | null;
  answerScore: number;
  //private
}
export interface GetAllQuestion {
  choices: GetChoiceQuestion[];
  texts: GetTextQuestion[];
  canAnswerTheQuestion: boolean;
  //private
}
export interface UserAndAllQuestionPack {
  user: InterUser;
  questions: GetAllQuestion;
  //private
}
export interface GetAllAnswerAndQuestion {
  nongsAnswers: UserAndAllQuestionPack[];
  peeAnswers: UserAndAllQuestionPack[];
  mainChoices: InterChoiceQuestion[];
  mainTexts: InterTextQuestion[];
  nongPendingAnswers: UserAndAllQuestionPack[]; /////////////i
  nongPassAnswers: UserAndAllQuestionPack[];
  nongSureAnswers: UserAndAllQuestionPack[];
  nongPaidAnswers: UserAndAllQuestionPack[];
  nongInterviewAnswers: UserAndAllQuestionPack[];
  success: boolean;
  groupName: string;
  //public
}
export interface ScoreTextQuestion {
  id: Id | null;
  score: number;
  //private
}
export interface ScoreTextQuestions {
  scores: ScoreTextQuestion[][];
  campId: Id;
  //public
}
export interface InterFood {
  campId: Id;
  isWhiteList: boolean;
  peeIds: Id[];
  nongIds: Id[];
  petoIds: Id[];
  nongHeathIssueIds: Id[];
  peeHeathIssueIds: Id[];
  petoHeathIssueIds: Id[];
  nongCampMemberCardIds: Id[];
  peeCampMemberCardIds: Id[];
  petoCampMemberCardIds: Id[];
  name: string;
  mealId: Id;
  lists: FoodLimit[];
  _id: Id;
  isSpicy: boolean;
  listPriority: boolean;
  //public
}
export interface InterMeal {
  time: Date;
  campId: Id;
  foodIds: Id[];
  roles: RoleCamp[];
  _id: Id;
  //public
}
export interface CreateFood {
  campId: Id;
  isWhiteList: boolean;
  name: string;
  mealId: Id;
  lists: FoodLimit[];
  isSpicy: boolean;
  listPriority: boolean;
  //public
}
export interface CreateMeal {
  time: Date;
  campId: Id;
  roles: RoleCamp[];
  //public
}
export interface UpdateFood {
  isWhiteList: boolean;
  nongCampMemberCardIds: Id[];
  peeCampMemberCardIds: Id[];
  petoCampMemberCardIds: Id[];
  name: string;
  lists: FoodLimit[];
  _id: Id;
  isSpicy: boolean;
  listPriority: boolean;
  //public
}
export interface GetFoodForUpdate {
  isWhiteList: boolean;
  nongHealths: HeathIssuePack[];
  peeHealths: HeathIssuePack[];
  petoHealths: HeathIssuePack[];
  nongCampMemberCardIds: Id[];
  peeCampMemberCardIds: Id[];
  petoCampMemberCardIds: Id[];
  name: string;
  lists: FoodLimit[];
  _id: Id;
  isSpicy: boolean;
  camp: InterCampFront;
  time: Date;
  listPriority: boolean;
  //public
}
export interface GetMeals {
  time: Date;
  whiteLists: InterFood[];
  blackLists: InterFood[];
  //private
}
export interface ReceiveAirQuality {
  id: string;
  measurements: {
    hourly: {
      ts: string; //date
      aqi: number;
      pm25?: {
        aqi: number;
        concentration: number;
      };
    }[];
  };
  //public
}
export interface CampHealthIssuePack {
  baanHealthIssuePacks: ShowHealthIssuePack[];
  partHealthIssuePacks: ShowHealthIssuePack[];
  isHavePeto: boolean;
  groupName: string;
  campHealthIssuePack: ShowHealthIssuePack;
  //public
}
export interface ShowHealthIssuePack {
  nongHealths: HeathIssuePack[];
  peeHealths: HeathIssuePack[];
  petoHealths: HeathIssuePack[];
  name: string;
  //public
}
export interface GetCoopData {
  baan: InterBaanFront;
  camp: InterCampFront;
  boy: InterPlace | null;
  girl: InterPlace | null;
  normal: InterPlace | null;
  nongHealths: HeathIssuePack[];
  peeHealths: HeathIssuePack[];
  //public
}
export interface UpdateMeal {
  mealId: Id;
  time: Date;
  roles: RoleCamp[];
  //public
}
export interface SuccessBase<T> {
  success: boolean;
  data: T;
  //utility
}
export interface UpdateActionPlan {
  action: string;
  placeIds: Id[];
  start: Date;
  end: Date;
  headId: Id;
  body: string;
  //public
}
export interface GetNongData {
  user: InterUser;
  camp: InterCampFront;
  campMemberCard: InterCampMemberCard;
  baan: InterBaanFront;
  normal: ShowPlace | null;
  boy: ShowPlace | null;
  girl: ShowPlace | null;
  pees: ShowMember[];
  nongs: ShowMember[];
  meals: GetMeals[];
  healthIssue: HeathIssueBody;
  displayOffset: UpdateTimeOffsetRaw;
  //private
}
export interface GetPeeData {
  user: InterUser;
  camp: InterCampFront;
  campMemberCard: InterCampMemberCard;
  baan: InterBaanFront;
  normal: ShowPlace | null;
  boy: ShowPlace | null;
  girl: ShowPlace | null;
  peeBaans: ShowMember[];
  nongBaans: ShowMember[];
  meals: GetMeals[];
  healthIssue: HeathIssueBody;
  displayOffset: UpdateTimeOffsetRaw;
  selectOffset: UpdateTimeOffsetRaw;
  partPlace: ShowPlace | null;
  part: InterPartFront;
  petoParts: ShowMember[];
  peeParts: ShowMember[];
  //private
}
export interface GetPetoData {
  user: InterUser;
  camp: InterCampFront;
  campMemberCard: InterCampMemberCard;
  meals: GetMeals[];
  healthIssue: HeathIssueBody;
  displayOffset: UpdateTimeOffsetRaw;
  selectOffset: UpdateTimeOffsetRaw;
  partPlace: ShowPlace | null;
  part: InterPartFront;
  petos: ShowMember[];
  pees: ShowMember[];
  //private
}
export interface GetMenuSongs {
  songs: ShowSong[];
  likeSongIds: Id[];
  authBaans: {
    data: InterBaanFront;
    showName: string;
  }[];
  authCamps: InterCampFront[];
  //private
}
export interface ShowSong {
  name: string;
  campNames: string[];
  baanNames: string[];
  author: string;
  time: number;
  link: string;
  like: number;
  _id: Id;
  baanRelates: string[];
  campRelates: string[];
  //private
}
export interface CreateSong {
  name: string;
  author: string;
  time: number;
  link: string;
  //public
}
export interface ShowSongPage {
  song: ShowSong;
  authBaans: {
    data: InterBaanFront;
    showName: string;
  }[];
  authCamps: InterCampFront[];
  likeSongIds: Id[];
  //private
}
export interface UpdateSongs {
  _id: Id;
  songIds: Id[];
  //public
}
export interface UpdateSongPage {
  userLikeSongIds: Id[];
  baans: UpdateSongs[];
  camps: UpdateSongs[];
  //private
}
