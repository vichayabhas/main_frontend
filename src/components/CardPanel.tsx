/*'use client'
import { useReducer } from "react"
import ProductCard from "./Card"
import Card from "./Card"
import Link from "next/link"
import { useRouter } from "next/router"
export default function CardPanel(){
    const router = useRouter()
    const compareRedeucer =(ratingList:Map<string, number | null>, action:{type:string, hospitalName:string, rating:number | null}) => {
        switch(action.type){
            case 'add':{
                ratingList.set(action.hospitalName,action.rating)
                return(new Map(ratingList))
            }
            case 'remove':{
                ratingList.delete(action.hospitalName);
                return(new Map(ratingList))
            }
            case 'new':{
                return(new Map([
                    ['Chulalongkorn Hospital', 5],
                    ['Rajavithi Hospital', 5],
                    ['Thammasat University Hospital', 5],
                    ]))
            }
            default: return(ratingList)
        }
        

    }
    const[ratingList,ratingChange]=useReducer(compareRedeucer,new Map<string,number | null>([
        ['Chulalongkorn Hospital', 5],
        ['Rajavithi Hospital', 5],
        ['Thammasat University Hospital', 5],
    ]))
    const mockHospital = [
        {hid:"001",name:'Chulalongkorn Hospital',image:"/img/chula.jpg"},
        {hid:"002",name:'Rajavithi Hospital', image:"/img/rajavithi.jpg"},
        {hid:"003",name:"Thammasat University Hospital",image:"/img/thammasat.jpg"},
        
    ]

    return (
        <div>
            <div style={{margin:"20px", display:"flex", flexDirection:"row",
            flexWrap:"wrap", justifyContent:"space-around", alignContent:"space-around"}}>
                {
                    mockHospital.map((hospitalItem)=>(
                        <div  className="w-1/5" >
                            <Link href={`/hospital/${hospitalItem.hid}`}>
                        
                        <Card hospitalName={hospitalItem.name} imgSrc={hospitalItem.image} value={ratingList.get(hospitalItem.name) ?? 0}
              onRating={(hospital:string, ratings:number | null)=>ratingChange({type:'add', hospitalName:hospital, rating:ratings}) }
              link={`/hospital/${hospitalItem.hid}`} //onCarSelected=(()=>{router.push(`/hospital/${hospitalItem.hid}`)})
              /></Link>
</div>       
                    ))
                }
                </div>

            <div className="w-full text-xl font-medium">Rating List: {ratingList.size}</div>
            {Array.from(ratingList).map(([hospital, rating]) => (
                <div key={hospital} data-testid={hospital} 
                onClick={()=>{ratingChange({type:'remove', hospitalName:hospital, rating:0});}}>
                    {hospital}: {rating}
                </div>
            ))}
        </div>
    );

}




*/
