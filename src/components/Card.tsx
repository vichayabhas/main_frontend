// import Image from "next/image";

// import InteractiveCard from "./InteractiveCard";
// import { Rating, Typography } from "@mui/material";
// //import { Router } from "next/router";
// //import { useRouter } from "next/navigation";

// //export default function ProductCard({hospitalName,imgSrc,onCompare}:{hospitalName:string,imgSrc:string,onCompare:Function}){
// export default function Card({
//   hospitalName,
//   imgSrc,
//   onRating,
//   value,
//   link, //onCarSelected
// }: {
//   hospitalName: string;
//   imgSrc: string;
//   onRating?: Function;
//   value?: number | null;
//   link: string;
//   //onCarSelected :Function
// }) {
//   //const router = useRouter()
//   function onCarSelected(){
//     //router.push(link)

//   }

//   // const compareRedeucer =(ratingList:Map<string,number>, action:{type:string; hospitalName:string;rating:number})=>{
//   //     switch(action.type){
//   //         case 'add':{
//   //             ratingList.set(action.hospitalName,action.rating)
//   //             return(new Map(ratingList))
//   //             //return(ratingList)
//   //         }
//   //         case 'remove':{
//   //             ratingList.delete(action.hospitalName);
//   //             return(new Map(ratingList))
//   //         }
//   //         // case 'new':{
//   //         //     return(new Map([
//   //         //         ['Chulalongkorn Hospital', 5],
//   //         //         ['Rajavithi Hospital', 5],+
//   //         //         ['Thammasat University Hospital', 5],
//   //         //         ]))
//   //         // }
//   //         default: return(ratingList)
//   //     }

//   //}
//   // const[ratingList,ratingChange]=useReducer(compareRedeucer,new Map<string,number>([
//   //     ['Chulalongkorn Hospital', 5],
//   //     ['Rajavithi Hospital', 5],
//   //     ['Thammasat University Hospital', 5],
//   //     ]))

//   // function onCarSelected(){
//   //     alert("You Select    " + carName)
//   // }

//   return (
//     <InteractiveCard contentName={hospitalName} link={link} /*onCarSelected={()=>{onCarSelected}}*/>
//       <div className="w-full h-[70%] relative rounded-t-lg">
//         <Image
//           src={imgSrc}
//           alt="Product"
//           fill={true}
//           style={{ objectFit: "cover" }}
//           //   height={200}
//           //   width={100}
//         />
//       </div>

//       <div className="w-full h-[30%] p-[10px]">
//         <div>{hospitalName}</div>
//         {
//           onRating? <Rating
//           name={hospitalName + " Rating"}
//           id={hospitalName + " Rating"}
//           data-testid={hospitalName + " Rating"}
//           value={value}
//           onChange={(e, newValue) => {
//             onRating(hospitalName, newValue);
//           }}
//           onClick={(e) => {
//             e.stopPropagation();
//           }}
//         /> :''
//         }

//       </div>
//     </InteractiveCard>
//   );
// } //

// //
// /*
// <button className='block-h-[10%] text-sm rounded-md bg-sky-600 hover:bg-indigo' mx-2 px-1 py-1>
//                 Compare
//             </button>
// */

// /*
// import Image from 'next/image';
// import InteractiveCard from './InteractiveCard';
// import Rating from '@mui/material/Rating';

// export default function Card({hospitalName, imgSrc, onRating, value} :
// {hospitalName:string, imgSrc:string, onRating:Function, value:number | null}) {
//     return (
//         <InteractiveCard contentName={hospitalName}>
//             <div className='w-full h-[70%] relative rounded-t-lg'>
//                 <Image src={imgSrc}
//                 alt='Picture'
//                 fill={true}
//                 className='object-cover rounded-t-lg'/>
//             </div>
//             <div className='w-full h-[15%] p-[10px]'>{hospitalName}</div>
//             <Rating name={`${hospitalName} Rating`} value={value}
//             onChange={(e, newValue) => {onRating(hospitalName, newValue)}}
//             onClick={(e)=>{e.stopPropagation();}}
//             id={`${hospitalName} Rating`}
//             data-testid={`${hospitalName} Rating`}/>
//         </InteractiveCard>
//     );
// }

// */
"use client";
import Image from "next/image";
import React from "react";
import InteractiveCard from "./InteractiveCard";


import { ClockIcon } from "@mui/x-date-pickers";

import { Id, InterCampFront } from "../../interface";
//import { Router } from "next/router";
//import { useRouter } from "next/navigation";

export default function Card({
  hospitalName,
  onRating,
  link,
  camp,
}: {
  hospitalName: string;
  onRating: (input:string)=>void;
  value?: number | null;
  link: string;
  imgSrc: string | null;
  id: Id;
  camp: InterCampFront;
  //onCarSelected :Function
}) {
  //  const session=await getServerSession()
  console.log(camp.logoUrl);

  return (
    <InteractiveCard
      contentName={hospitalName}
      link={link} /*onCarSelected={()=>{onCarSelected}}*/
    >
      <div
        className="flex flex-row h-auto"
        onClick={() => {
          onRating(`/camp/${camp._id}`);
        }}
      >
        <div className="w-1/5 h-auto relative rounded-t-lg">
          {camp.logoUrl ? (
            <Image
              src={camp.logoUrl}
              alt="Massage Shop Picture"
              fill={true}
              className="object-cover rounded-t-lg"
            />
          ) : null}
        </div>

        <div className="w-3/5 h-auto p-[10px]">
          <div className="text-left pl-5">
            <div className="text-3xl">{hospitalName}</div>

            <div className="text-2xl my-10">
              <ClockIcon className="mr-5" />
              {camp.open ? <>เปิดรับสมัคร</> : <>ปิดรับสมัครแล้ว</>}
            </div>
          </div>
        </div>
        <div className="w-1/5 h-auto bg-slate-800 rounded-xl hover:bg-slate-600"></div>
      </div>
    </InteractiveCard>
  );
} //
/*<div className="text-2xl my-10">
              {campDetail.dateStart.toISOString()}
            </div>
            <div className="text-2xl my-10">
              {campDetail.dateEnd.toISOString()}
            </div>*/
