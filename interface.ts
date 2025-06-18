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
  imageAndDescriptionContainerIds: Id[];
  jobIds: Id[];
  mirrorIds: Id[];
  canReadMirror: boolean;
  canWriteMirror: boolean;
  groupContainerIds: Id[];
  defaultGroupId: Id | null;

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
  nongDataLock: boolean;
  nongModelIds: Id[];
  peeModelIds: Id[];
  petoModelIds: Id[];
  nongPendingIds: Map<Id, string>;
  nongPassIds: Map<Id, string>;
  open: boolean;
  peePassIds: Map<Id, Id>;
  songIds: Id[];
  nongSureIds: Id[];
  baanIds: Id[];
  link: string | null;
  allDone: boolean;
  lockChangePickup: boolean;
  pictureUrls: string[];
  campStyleId: Id;
  actionPlanIds: Id[];
  workItemIds: Id[];
  nongPaidIds: Id[];
  nongInterviewIds: Map<Id, string>;
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
  nongSleepModel:
    | "นอนทุกคน"
    | "เลือกได้ว่าจะค้างคืนหรือไม่"
    | "ไม่มีการค้างคืน";
  peeSleepModel: "นอนทุกคน" | "เลือกได้ว่าจะค้างคืนหรือไม่" | "ไม่มีการค้างคืน";
  groupRefMap: Map<Group, Id>;
  baanBoardId: Id | null;
  partNameIds: Id[];
  partBoardId: Id;
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
  allPetoChatIds: Id[];
  nongCampMemberCardHaveHeathIssueIds: Id[];
  peeCampMemberCardHaveHeathIssueIds: Id[];
  petoCampMemberCardHaveHeathIssueIds: Id[];
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
  lockChangeQuestion: boolean;
  jobIds: Id[];
  canReadTimeOnMirror: boolean;
  nongCall: string;
  boyZoneLadyZoneState: BoyZoneLadyZoneState;
  canNongSeeBaanOrder: boolean;
  scoreIds: Id[];
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
  mapPeeCampIdByBaanId: Map<Id, Id>;
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
  petoSleepIds: Id[];
  peeCampMemberCardHaveHeathIssueIds: Id[];
  petoCampMemberCardHaveHeathIssueIds: Id[];
  peeHaveBottleIds: Id[];
  petoHaveBottleIds: Id[];
  auths: AuthType[];
  jobIds: Id[];
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
  baanJobIds: Id[];
  partJobIds: Id[];
  mirrorSenderIds: Id[];
  mirrorReceiverIds: Id[];
  mirrorBaanIds: Id[];
  subGroupIds: Id[];
  orderIds: Id[];
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
  healthIssueId: Id | null;
  haveBottle: boolean;
  mode: Mode;
  nongCampIds: Id[];
  peeCampIds: Id[];
  petoCampIds: Id[];
  group: Group | null;
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
  nongAnswerPackIds: Id[];
  peeAnswerPackIds: Id[];
  gewertzSquareBookingIds: Id[];
  departureAuths: Departure[];
  extraAuth: ExtraAuths[];
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
  nongShirtSize: InterSize;
  peeShirtSize: InterSize;
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
  imageAndDescriptionContainerIds: Id[];
  jobIds: Id[];
  mirrorIds: Id[];
  canReadMirror: boolean;
  canWriteMirror: boolean;
  groupContainerIds: Id[];
  defaultGroupId: Id | null;
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
  nongPendingIds: MyMap[];
  nongPassIds: MyMap[];
  open: boolean;
  peePassIds: MapObjectId[];
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
  allPetoChatIds: Id[];
  petoSleepIds: Id[];
  nongCampMemberCardHaveHeathIssueIds: Id[];
  peeCampMemberCardHaveHeathIssueIds: Id[];
  petoCampMemberCardHaveHeathIssueIds: Id[];
  nongHaveBottleIds: Id[];
  peeHaveBottleIds: Id[];
  petoHaveBottleIds: Id[];
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
  lockChangeQuestion: boolean;
  jobIds: Id[];
  canReadTimeOnMirror: boolean;
  nongCall: string;
  boyZoneLadyZoneState: BoyZoneLadyZoneState;
  canNongSeeBaanOrder: boolean;
  scoreIds: Id[];
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
  petoSleepIds: Id[];
  peeCampMemberCardHaveHeathIssueIds: Id[];
  petoCampMemberCardHaveHeathIssueIds: Id[];
  peeHaveBottleIds: Id[];
  petoHaveBottleIds: Id[];
  auths: AuthType[];
  jobIds: Id[];
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
  lockChangeQuestion: boolean;
  updatePart: UpdateAuthCamp[];
  canReadTimeOnMirror: boolean;
  nongCall: string;
  canNongSeeBaanOrder: boolean;
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
  defaultPartNameAndAuths: CreateAuthCamp[];
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
  canReadMirror: boolean;
  canWriteMirror: boolean;
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
export interface ShowActionPlan {
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
  baan: BasicBaan;
  //public
}
export interface RegisPart {
  pees: ShowMember[];
  petos: ShowMember[];
  part: BasicPart;
  //public
}
export interface InterTimeOffset {
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
  user: BasicUser;
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
  _id: Id;
  //public
}
export interface ShowChat extends InterChat {
  nickname: string;
  baanName: string;
  partName: string;
  roomName: string;
  canReadInModeNong: boolean;
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
  allBuildings: Map<Id, string>;
  //public
}
export interface ChatReady {
  chats: ShowChat[];
  timeOffset: InterTimeOffset;
  mode: Mode;
  sendType: {
    id: Id;
    roomType: TypeChat;
  } | null;
  success: boolean;
  roomName: string;
  userId: Id;
  subscribe: string;
  camp: BasicCamp;
  //private
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const foodLimits = [
  "อิสลาม",
  "มังสวิรัติ",
  "เจ",
  "ไม่มีข้อจำกัดด้านความเชื่อ",
] as const;
export type FoodLimit = (typeof foodLimits)[number];
export interface HeathIssuePack {
  heathIssue: HeathIssueBody;
  user: BasicUser;
  campMemberCardId: Id;
  //private
}
export interface CampWelfarePack {
  baanWelfares: WelfarePack[];
  partWelfares: WelfarePack[];
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
  camp: BasicCamp;
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
  boy: InterPlace | null;
  girl: InterPlace | null;
  normal: InterPlace | null;
  baan: BasicBaan;
  //public
}
export interface GetPartForPlan {
  name: string;
  place: InterPlace | null;
  _id: Id;
  //public
}
export interface GetAllPlanData {
  baanDatas: GetBaansForPlan[];
  partDatas: GetPartForPlan[];
  baanBoySleeps: CampNumberData[];
  baanGirlSleeps: CampNumberData[];
  partBoySleeps: CampNumberData[];
  partGirlSleeps: CampNumberData[];
  boySleepNumber: CampNumberData;
  girlSleepNumber: CampNumberData;
  baanSleepDatas: CampSleepDataContainer[];
  partSleepDatas: CampSleepDataContainer[];
  camp: BasicCamp;
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
  boyZoneLadyZoneState: BoyZoneLadyZoneState;
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
  nongBoys: BasicUser[];
  nongGirls: BasicUser[];
  peeBoys: BasicUser[];
  peeGirls: BasicUser[];
  petoBoys: BasicUser[];
  petoGirls: BasicUser[];
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
  user: BasicUser;
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
  camp: BasicCamp;
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
  camp: BasicCamp;
  time: Date;
  listPriority: boolean;
  displayOffset: UpdateTimeOffsetRaw;
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
  campHealthIssuePack: ShowHealthIssuePack;
  camp: BasicCamp;
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
  baan: BasicBaan;
  camp: BasicCamp;
  boy: InterPlace | null;
  girl: InterPlace | null;
  normal: InterPlace | null;
  nongHealths: HeathIssuePack[];
  peeHealths: HeathIssuePack[];
  baanJobs: GetJob[];
  pees: ShowMember[];
  nongs: ShowMember[];
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
  user: BasicUser;
  camp: BasicCamp;
  campMemberCard: InterCampMemberCard;
  baan: BasicBaan;
  normal: ShowPlace | null;
  boy: ShowPlace | null;
  girl: ShowPlace | null;
  pees: ShowMember[];
  nongs: ShowMember[];
  meals: GetMeals[];
  healthIssue: HeathIssueBody;
  displayOffset: UpdateTimeOffsetRaw;
  mirrorData: GetMirrorPack;
  defaultGroup: GetGroupContainer | null;
  groups: GetGroupContainer[];
  items: InterItem[];
  baanOrders: ShowOrder[];
  campMemberCardOrders: ShowOrder[];
  //private
}
export interface GetPeeData {
  user: BasicUser;
  camp: BasicCamp;
  campMemberCard: InterCampMemberCard;
  baan: BasicBaan;
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
  part: BasicPart;
  petoParts: ShowMember[];
  peeParts: ShowMember[];
  imageAndDescriptions: ShowImageAndDescriptions[];
  baanJobs: GetJob[];
  partJobs: GetJob[];
  mirrorData: GetMirrorPack;
  defaultGroup: GetGroupContainer | null;
  groups: GetGroupContainer[];
  items: InterItem[];
  campMemberCardOrders: ShowOrder[];
  baanOrders: ShowOrder[];
  partOrders: ShowOrder[];
  //private
}
export interface GetPetoData {
  user: BasicUser;
  camp: BasicCamp;
  campMemberCard: InterCampMemberCard;
  meals: GetMeals[];
  healthIssue: HeathIssueBody;
  displayOffset: UpdateTimeOffsetRaw;
  selectOffset: UpdateTimeOffsetRaw;
  partPlace: ShowPlace | null;
  part: BasicPart;
  petos: ShowMember[];
  pees: ShowMember[];
  partJobs: GetJob[];
  items: InterItem[];
  campMemberCardOrders: ShowOrder[];
  partOrders: ShowOrder[];
  //private
}
export interface GetMenuSongs {
  songs: ShowSong[];
  likeSongIds: Id[];
  authBaans: {
    data: BasicBaan;
    showName: string;
  }[];
  authCamps: BasicCamp[];
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
    data: BasicBaan;
    showName: string;
  }[];
  authCamps: BasicCamp[];
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
export interface SongCount {
  song: InterSong;
  count: number;
}
export interface ShowCampSong {
  nongLike: number;
  peeLike: number;
  petoLike: number;
  name: string;
  campNames: string[];
  baanNames: string[];
  author: string;
  time: number;
  link: string;
  like: number;
  _id: Id;
  //public
}
export interface AuthSongsCamp {
  camp: BasicCamp;
  baans: BasicBaan[];
  authCamp: boolean;
  songs: ShowCampSong[];
  userLikeSongIds: Id[];
}
export interface ShowCampSongReady {
  _id: Id;
  songIds: Id[];
  userLikeSongIds: Id[];
  showCampSongs: ShowCampSong[];
  camp: BasicCamp;
  baan: BasicBaan;
  //private
}
export interface BasicUser {
  _id: Id;
  name: string;
  lastname: string;
  nickname: string;
  gender: "Male" | "Female";
  shirtSize: Size;
  haveBottle: boolean;
  mode: Mode;
  group: Group | null;
  role: Role;
  fridayActEn: boolean;
  fridayAuth: boolean;
  likeToSleepAtCamp: boolean;
  gewertzSquareBookingIds: Id[];
  departureAuths: Departure[];
  extraAuth: ExtraAuths[];
  //private
}
export interface BasicBaan {
  name: string;
  fullName: string | null;
  campId: Id;
  link: string | null;
  _id: Id;
  mdTime: Date;
  nongSendMessage: boolean;
  songIds: Id[];
  canReadMirror: boolean;
  canWriteMirror: boolean;
  mirrorIds: Id[];
  nongIds: Id[];
  peeIds: Id[];
  //public
}
export interface BasicCamp {
  nameId: Id;
  round: number;
  dateStart: Date;
  dateEnd: Date;
  nongDataLock: boolean;
  open: boolean;
  songIds: Id[];
  link: string | null;
  allDone: boolean;
  lockChangePickup: boolean;
  pictureUrls: string[];
  registerModel: "noPaid" | "noInterview" | "all";
  memberStructure:
    | "nong->highSchool,pee->1year,peto->2upYear"
    | "nong->highSchool,pee->2upYear"
    | "nong->1year,pee->2upYear"
    | "nong->highSchool,pee->allYear"
    | "allYearMix";
  logoUrl: string | null;
  registerSheetLink: string | null;
  peeLock: boolean;
  _id: Id;
  campName: string;
  nongSleepModel:
    | "นอนทุกคน"
    | "เลือกได้ว่าจะค้างคืนหรือไม่"
    | "ไม่มีการค้างคืน";
  peeSleepModel: "นอนทุกคน" | "เลือกได้ว่าจะค้างคืนหรือไม่" | "ไม่มีการค้างคืน";
  groupName: string;
  peeDataLock: boolean;
  petoDataLock: boolean;
  haveCloth: boolean;
  actionPlanOffset: number;
  mdTime: Date;
  showCorrectAnswerAndScore: boolean;
  canAnswerTheQuestion: boolean;
  mealIds: Id[];
  canNongSeeAllAnswer: boolean;
  canNongSeeAllActionPlan: boolean;
  canNongSeeAllTrackingSheet: boolean;
  canNongAccessDataWithRoleNong: boolean;
  lockChangeQuestion: boolean;
  canReadTimeOnMirror: boolean;
  nongCall: string;
  boyZoneLadyZoneState: BoyZoneLadyZoneState;
  canNongSeeBaanOrder: boolean;
  nongIds: Id[];
  peeIds: Id[];
  petoIds: Id[];
  boardIds: Id[];
  baanIds: Id[];
  partIds: Id[];
  //public
}
export interface BasicPart {
  nameId: Id;
  campId: Id;
  peeIds: Id[];
  petoIds: Id[];
  _id: Id;
  partName: string;
  peeSleepIds: Id[];
  auths: AuthType[];
  //public
}
export interface SystemInfo {
  systemMode: string;
  endEmail: string;
  studentIdLength: number;
  studentIdLastTwoDigit: string;
}
export interface RegisterData {
  regisParts: RegisPart[];
  regisBaans: RegisBaan[];
  peeRegisters: ShowRegister[];
  camp: BasicCamp;
  partMap: MyMap[];
  nongRegister: AllNongRegister;
  partBoardIdString: string;
}
export type QuestionCategory =
  | "พี่พี่"
  | "น้องค่าย"
  | "น้องที่ยืนยันแล้ว"
  | "น้องที่ยืนยันแล้ว"
  | "น้องที่จ่ายตังแล้ว"
  | "น้องที่ผ่านเข้าค่าย"
  | "น้องที่ผ่านสัมภาษณ์"
  | "น้องที่สมัครเข้ามา";
export interface TriggerChoiceQuestion {
  index: number;
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
export interface TriggerTextQuestion {
  question: string;
  index: number;
  score: number;
  order: number;
  //public
}
export interface ScoreEvent {
  score: number;
  i: number;
  j: number;
}
export interface CampState {
  camp: BasicCamp;
  state:
    | "notRegister"
    | "pending"
    | "interview"
    | "pass"
    | "paid"
    | "sure"
    | "peePass"
    | "nong"
    | "pee"
    | "peto";
  questions: GetAllQuestion;
  link: string;
  user: BasicUser;
}
export const authTypes = [
  "ทะเบียน",
  "ตรวจคำตอบข้อเขียน",
  "สวัสดิการ",
  "พยาบาล",
  "แก้ไขคำถาม",
  "หัวหน้าพี่เลี้ยง",
  "แผน",
  "กิจ",
  "pr/studio",
  "แก้ไขรูปภาพและคำอธิบายได้ทุกบ้าน",
  "แก้ไขรูปภาพและคำอธิบายได้เฉพาะบ้านตัวเอง",
  "แก้ไขกลุ่มได้",
  "สามารถจัดการของได้",
] as const;
export type AuthType = (typeof authTypes)[number];
export interface CreateAuthCamp {
  partName: DefaultPartName;
  auths: AuthType[];
}
export const defaultPartNames = [
  "board",
  "ประสาน",
  "ทะเบียน",
  "พี่บ้าน",
  "สวัสดิการ",
  "พยาบาล",
  "แผน",
  "PR/studio",
] as const;
export type DefaultPartName = (typeof defaultPartNames)[number];
export interface UpdateAuthCamp {
  id: Id;
  auths: AuthType[];
}
export const imageAndDescriptionTypes = ["boy", "girl", "normal"] as const;
export type ImageAndDescriptionType = (typeof imageAndDescriptionTypes)[number];
export interface InterImageAndDescription {
  imageUrl: string | null;
  description: string;
  order: number;
  _id: Id;
}
export interface InterImageAndDescriptionContainer {
  baanId: Id;
  childIds: Id[];
  types: ImageAndDescriptionType;
  _id: Id;
  name: string;
}
export interface EditImageAndDescription {
  imageUrl: string | null;
  description: string;
  order: number;
  _id: Id | null;
}
export interface CreateImageAndDescription {
  imageUrl: string | null;
  description: string;
  order: number;
}
export interface EditImageAndDescriptionContainer {
  types: ImageAndDescriptionType;
  _id: Id;
  name: string;
  children: EditImageAndDescription[];
}
export interface ShowImageAndDescriptions {
  types: ImageAndDescriptionType;
  _id: Id | null;
  name: string;
  children: InterImageAndDescription[];
  baanId: Id | null;
}
export interface CreateImageAndDescriptionContainer {
  types: ImageAndDescriptionType;
  name: string;
  children: CreateImageAndDescription[];
  baanId: Id;
}
export interface GetImageAndDescriptionsPackForUpdate {
  imageAndDescriptionContainers: ShowImageAndDescriptions[];
  baan: BasicBaan;
  isOverNight: boolean;
}
export const jobGenderRequires = [
  "ไม่กำหนด",
  "ให้ความสำคัญ",
  "เท่านั้น",
] as const;
export type JobGenderRequire = (typeof jobGenderRequires)[number];
export interface InterJobAssign {
  types: "baan" | "part";
  refId: Id;
  name: string;
  reqType: JobGenderRequire;
  memberIds: Id[];
  _id: Id;
  male: number;
  female: number;
  sum: number;
  userIds: Id[];
}
export interface InterBaanJob {
  baanId: Id;
  jobId: Id;
  memberIds: Id[];
  _id: Id;
  userIds: Id[];
}
export interface InterTimeRegister {
  _id: Id;
  refId: Id;
  time: Date;
  campMemberCardId: Id;
}
export interface CreateJobAssign {
  types: "baan" | "part";
  refId: Id;
  name: string;
  reqType: JobGenderRequire;
  male: number;
  female: number;
  sum: number;
}
export interface UpdateJobAssign {
  name: string;
  reqType: JobGenderRequire;
  _id: Id;
  male: number;
  female: number;
  sum: number;
  types: "baan" | "part";
}
export interface GetJob {
  name: string;
  reqType: JobGenderRequire;
  male: number;
  female: number;
  sum: number;
  _id: Id;
  passMales: BasicUser[];
  failMales: BasicUser[];
  passFemales: BasicUser[];
  failFemales: BasicUser[];
  timeRegisterId: Id | null;
  timeRegisters: InterTimeRegister[];
}
export interface RegisterJob {
  types: "baan" | "part";
  addJobIds: Id[];
  campMemberCardId: Id;
  removeTimeRegisterIds: Id[];
  fromId: Id;
}
export interface InterMirror {
  senderCampMemberCardId: Id;
  receiverId: Id;
  message: string;
  types: "baan" | "user";
  _id: Id;
  time: Date;
}
export interface CreateMirror {
  senderCampMemberCardId: Id;
  receiverId: Id;
  message: string;
  types: "baan" | "user";
}
export interface UpdateMirror {
  message: string;
  _id: Id;
}
export interface GetMirrorUser extends InterMirror {
  sender: BasicUser;
  receiver: BasicUser;
}
export interface GetMirrorBaan extends InterMirror {
  sender: BasicUser;
  receiver: BasicBaan;
}
export interface GetMirrorPack {
  userReceivers: GetMirrorUser[];
  userSenders: GetMirrorUser[];
  baanReceivers: GetMirrorBaan[];
  baanSenders: GetMirrorBaan[];
}
export const socketEvents = [
  "newChat",
  "updateChat",
  "registerUpdate",
  "scoreTextAnswer",
  "questionAction",
  "trigTextQuestion",
  "trigChoiceQuestion",
  "deleteQuestion",
  "updateQuestion",
  "registerSubGroup",
  "updateSubGroup",
  "updateGroupByAnyone",
  "updatePlanData",
  "createFood" /*room=mealId*/,
  "updateFood" /*room=foodId*/,
  "createMeal" /*room=campId*/,
  "updateMeal" /*room=mealId*/,
  "updateBaan",
  "updateCamp",
  "updatePart",
  "updateImageAndDescriptions",
  "triggerMeals",
  "realTimeAuthPart",
  "newSong",
  "updateBaanSong",
  "updateCampSong",
  "updateActionPlans",
  "updateActionPlan",
  "updateTrackingSheets",
  "updateTrackingSheet",
  "sendMirrorBaan",
  "receiveMirrorBaan",
  "sendMirrorUser",
  "receiveMirrorUser",
  "partUpdateOrder",
  "baanUpdateOrder",
  "campMemberCardUpdateOrder",
  "campUpdateOrder",
  "updateItem",
  "updatePartJob",
  "updateBaanJob",
  "updateGewertzSquareBookingAll",
  "updateGewertzSquareBookingOwn",
] as const;
export type SocketEvent = (typeof socketEvents)[number];
export type QuestionType =
  | "addText"
  | "addChoice"
  | "removeText"
  | "removeChoice";
export interface QuestionDeleteAction {
  deleteChoiceIds: Id[];
  deleteTextIds: Id[];
}
export const groupGenderTypes = [
  "เลือกเพศตามคนแรก",
  "คละเพศ",
  "กำหนดตอนสร้างกลุ่มย่อย",
] as const;
export type GroupGenderType = (typeof groupGenderTypes)[number];
export const groupRoleTypes = [
  "เลือกพี่หรือน้องตามคนแรก",
  "คละพี่และน้อง",
  "กำหนดตอนสร้างกลุ่มย่อย",
] as const;
export type GroupRoleType = (typeof groupRoleTypes)[number];
export const subGroupGenderTypes = [
  "ชายเท่านั้น",
  "หญิงเท่านั้น",
  "คละเพศ",
] as const;
export type SubGroupGenderType = (typeof subGroupGenderTypes)[number];
export const subGroupRoleTypes = [
  "น้องเท่านั้น",
  "พี่เท่านั้น",
  "คละพี่และน้อง",
] as const;
export type SubGroupRoleType = (typeof subGroupRoleTypes)[number];
export interface InterSubGroup {
  genderType: SubGroupGenderType;
  roleType: SubGroupRoleType;
  containerId: Id;
  limit: number;
  _id: Id;
  name: string;
  campMemberCardIds: Id[];
  isWearing: boolean;
  spicy: boolean;
  foodLimit: FoodLimit;
}
export interface InterGroupContainer {
  baanId: Id;
  subGroupIds: Id[];
  genderType: GroupGenderType;
  roleType: GroupRoleType;
  canAnybodyCreateSubGroup: boolean;
  isDefault: boolean;
  _id: Id;
  name: string;
  userIds: Id[];
}
export interface CreateGroupContainer {
  baanId: Id;
  genderType: GroupGenderType;
  roleType: GroupRoleType;
  canAnybodyCreateSubGroup: boolean;
  name: string;
}
export interface UpdateGroupContainer {
  _id: Id;
  name: string;
  canAnybodyCreateSubGroup: boolean;
  isDefault: boolean;
}
export interface UpdateSubGroup {
  limit: number;
  _id: Id;
  name: string;
}
export interface CreateSubGroup {
  containerId: Id;
  limit: number;
  name: string;
  isMany: boolean;
  count: number;
  start: number;
  gender: "male" | "female" | null;
  role: Mode | null;
}
export interface GetSubGroup extends InterSubGroup {
  users: BasicUser[];
}
export interface GetGroupContainer extends InterGroupContainer {
  subGroups: GetSubGroup[];
  peesThatNotInGroup: BasicUser[];
  nongsThatNotInGroup: BasicUser[];
}
export interface RegisterGroup {
  addId: Id | null;
  removeId: Id | null;
  campMemberCardId: Id;
  containerId: Id;
}
export interface GetGroupContainerForAdmin {
  groups: GetGroupContainer[];
  baan: BasicBaan;
  camp: BasicCamp;
}
export interface GroupContainerPack {
  group: GetGroupContainer;
  subGroupIds: Id[];
}
export interface CreateSubGroupByAnyone {
  containerId: Id;
  limit: number;
  name: string;
  gender: "male" | "female" | null;
  role: Mode | null;
}
export interface GetActionPlanForEdit {
  pees: ShowMember[];
  petos: ShowMember[];
  actionPlan: ShowActionPlan;
  places: InterPlace[];
  selectOffset: UpdateTimeOffsetRaw;
}
export interface GetCampForUpdate {
  baans: BasicBaan[];
  camp: BasicCamp;
  parts: BasicPart[];
  remainPartName: MyMap[];
}
export interface GetMealForUpdate {
  foods: InterFood[];
  meal: InterMeal;
  camp: BasicCamp;
  selectOffset: UpdateTimeOffsetRaw;
  displayOffset: UpdateTimeOffsetRaw;
}
export interface OwnRegisterCampData {
  campName: string;
  role: string;
  baan: string;
  size: Size;
}
export const boyZoneLadyZoneStates = [
  "ปิดสมบูรณ์",
  "เพศตรงข้ามออกจากโซน",
  "ตรวจตรา",
  "พร้อมอาบน้ำ",
  "เปิดสมบูรณ์",
  "ปิดแต่ยังเก็บของยังไม่หมด",
] as const;
export type BoyZoneLadyZoneState = (typeof boyZoneLadyZoneStates)[number];
export const boyZoneLadyZoneStateForNongs = boyZoneLadyZoneStates.filter(
  (v) => v == "เปิดสมบูรณ์" || v == "ปิดสมบูรณ์" || v == "เพศตรงข้ามออกจากโซน"
);
export type BoyZoneLadyZoneStateForNong =
  (typeof boyZoneLadyZoneStateForNongs)[number];

export interface TriggerCampMemberCard {
  meals: GetMeals[];
  campMemberCardId: Id;
}
export interface CreateMealOut {
  meals: InterMeal[];
  triggers: TriggerCampMemberCard[];
}
export interface UpdateMealOut {
  meal: InterMeal;
  triggers: TriggerCampMemberCard[];
}
export interface CreateFoodOut {
  foods: InterFood[];
  triggers: TriggerCampMemberCard[];
}
export interface UpdateFoodOut {
  food: InterFood;
  triggers: TriggerCampMemberCard[];
}
export interface UpdateBaanOut {
  baan: BasicBaan;
  boy: InterPlace | null;
  girl: InterPlace | null;
  normal: InterPlace | null;
}
export interface PlanUpdateOut {
  baanTriggers: UpdateBaanOut[];
  planTrigger: PlanTrigger;
  partTriggers: UpdatePartOut[];
}
export interface PlanTrigger {
  baanDatas: GetBaansForPlan[];
  partDatas: GetPartForPlan[];
  boyZoneLadyZoneState: BoyZoneLadyZoneState;
}
export interface UpdatePartOut {
  place: InterPlace | null;
  _id: Id;
}
export interface UpdateCampOut {
  camp: BasicCamp;
  parts: BasicPart[];
}
export interface GetAllPlaceDataSetup extends InterBuilding {
  places: InterPlace[];
}
export interface UpdateSongPageOut {
  baans: UpdateSongs[];
  camps: UpdateSongs[];
}
export interface TriggerActionPlan {
  forParts: ShowActionPlan[];
  forCamps: ShowActionPlan[];
  campId: Id;
  partId: Id;
}
export interface TriggerWorkingItem {
  forParts: InterWorkingItem[];
  forCamps: InterWorkingItem[];
  campId: Id;
  partId: Id;
}
export interface TriggerMirrorBaan {
  senders: GetMirrorBaan[];
  receivers: GetMirrorBaan[];
  senderId: Id;
  receiverId: Id;
}
export interface TriggerMirrorUser {
  senders: GetMirrorUser[];
  receivers: GetMirrorUser[];
  senderId: Id;
  receiverId: Id;
}
export interface InterItem {
  name: string;
  orderIds: Id[];
  campId: Id;
  remain: number;
  canNongOrder: boolean;
  _id: Id;
  imageLink: string | null;
  canNongSeeOrder: boolean;
  canNongSee: boolean;
}
export interface InterOrder {
  itemId: Id;
  time: Date;
  count: number;
  fromId: Id;
  types: "part" | "baan";
  campMemberCardId: Id;
  placeId: Id;
  _id: Id;
  isComplete: boolean;
}
export interface ShowOrder {
  time: Date;
  count: number;
  types: "part" | "baan";
  campMemberCardId: Id;
  place: ShowPlace;
  _id: Id;
  fromName: string;
  fromUser: BasicUser;
  item: InterItem;
  isComplete: boolean;
}
export interface CreateItem {
  name: string;
  campId: Id;
  canNongOrder: boolean;
  imageLink: string | null;
  canNongSee: boolean;
  remain: number;
  canNongSeeOrder: boolean;
}
export interface CreateOrder {
  itemId: Id;
  time: Date;
  count: number;
  fromId: Id;
  types: "part" | "baan";
  campMemberCardId: Id;
  placeId: Id;
}
export interface UpdateItem {
  name: string;
  canNongOrder: boolean;
  imageLink: string | null;
  remain: number;
  canNongSee: boolean;
  canNongSeeOrder: boolean;
  _id: Id;
}
export interface TriggerOrder {
  campMemberCardId: Id;
  campMemberCardOrders: ShowOrder[];
  fromId: Id;
  fromOrders: ShowOrder[];
  campId: Id;
  campOrders: ShowOrder[];
  items: InterItem[];
  types: "part" | "baan";
}
export interface GetOrderForAdmin {
  items: InterItem[];
  displayOffset: UpdateTimeOffsetRaw;
  orders: ShowOrder[];
  camp: BasicCamp;
}
export interface TriggerJob {
  event: "updatePartJob" | "updateBaanJob";
  jobs: GetJob[];
  roomId: Id;
}
export interface GetAdminData {
  campNameContainers: InterNameContainer[];
  partNameContainers: InterPartNameContainer[];
  users: BasicUser[];
}
export interface UniversityStaffRegister {
  name: string;
  lastname: string;
  nickname: string;
  email: string;
  password: string;
  tel: string;
  //private
}
export interface InterUniversityStaff {
  name: string;
  lastname: string;
  nickname: string;
  email: string;
  password: string;
  tel: string;
  shortActivityIds: Id[];
  selectOffsetId: Id;
  displayOffsetId: Id;
  gewertzSquareBookingIds: Id[];
  fridayActEn: boolean;
  departureAuths: Departure[];
  _id: Id;
  extraAuth: ExtraAuths[];
  //private
}
export const userTypes = [
  "student",
  "universityStaff",
  "gewertzSquare",
] as const;
export type UserType = (typeof userTypes)[number];
export const gewertzSquareRoomTypes = [
  "Spark1",
  "Spark2",
  "Spark3",
  "Spark1&2",
  "Spark2&3",
  "Spark1&2&3",
  "E-III",
  "Demo form",
] as const;
export type GewertzSquareRoomType = (typeof gewertzSquareRoomTypes)[number];
export const gewertzSquareAvailableTimes = [
  8, 9, 10, 11, 12, 13, 14, 15, 16,
] as const;
export type GewertzSquareAvailableTime =
  (typeof gewertzSquareAvailableTimes)[number];
export const gewertzSquareMaxContinue = 3;
export interface InterGewertzSquareBooking {
  day: number;
  month: number;
  year: number;
  time: GewertzSquareAvailableTime;
  room: GewertzSquareRoomType;
  userId: Id;
  userType: UserType;
  _id: Id;
  tel: string;
  period: number;
}
export interface BookingGewertzSquareRoom {
  day: number;
  month: number;
  year: number;
  time: GewertzSquareAvailableTime;
  room: GewertzSquareRoomType;
  tel: string;
  period: number;
}
export interface CommonUser {
  gewertzSquareBookingIds: Id[];
  _id: Id;
  name: string;
  lastname: string;
  fridayActEn: boolean;
  departureAuths: Departure[];
  tel: string;
  email: string;
  extraAuth: ExtraAuths[];
}
export interface GetGewertzSquareBooking {
  all: InterGewertzSquareBooking[];
  own: InterGewertzSquareBooking[];
}
export interface UpdateBookingGewertzSquareRoom
  extends BookingGewertzSquareRoom {
  _id: Id;
}
export interface UpdateUniversityStaff {
  name: string;
  lastname: string;
  nickname: string;
  email: string;
  tel: string;
  //private
}
export interface GewertzSquareRegister {
  name: string;
  lastname: string;
  tel: string;
  password: string;
  email: string;
}
export interface UpdateGewertzSquareAccount {
  name: string;
  lastname: string;
  email: string;
  tel: string;
  //private
}
export const extraAuths = ["gewertz square admin"] as const;
export type ExtraAuths = (typeof extraAuths)[number];
