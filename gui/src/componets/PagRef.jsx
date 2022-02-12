import {useEffect,useState} from "react"
import {useParams} from "react-router-dom"
import store from "./ArticleStore";
import Reference from "./Reference";
function PagRef(){
   const [data,setData] = useState([]); 
   const {aid,rid} = useParams(); 
   useEffect(()=>{
    store.getReference(aid,rid);
    store.emitter.addListener("GET_REFERENCE_SUCCESS",()=>{
        setData(store.data)
        console.log(data);
    })
    },[aid,rid]);
    return(
        <div>
            {
                data.map(ref => <Reference key={ref.id} item={ref}/>)
            }
        </div>
    );
}

export default PagRef;