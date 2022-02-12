import { useEffect, useState } from "react";
import store from "./ArticleStore";
import "./ReferenceList.css"
import Reference from "./Reference";
import  {useParams} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ReferenceList(){
    const {aid} = useParams();
    const [titlu, setTitlu] =useState("");
    const [data,setData] = useState(null);
    const [listaAutori, setListaAutori]=useState("");

    const [references, setReferences] = useState([]);
    const [selectedReference,setSelectedReference] = useState(null);
    const [isEditing, setIsEditing] = useState(false)

    useEffect(()=>{
        store.getReferences(aid);
        store.emitter.addListener("GET_REFERENCES_SUCCESS",()=>{
            setReferences(store.data);
        })
    },[]);

    useEffect(()=>{
        store.getReferences(aid);
        store.emitter.addListener("GET_REFERENCES_SUCCESS",()=>{
            setReferences(store.data)
        })
    },[aid]);

    const addReference = (aid,ref) =>{
        store.addReference(aid,ref);
    }
    const saveReference = (aid,id,ref) =>{
        console.log(aid,id,ref);
        store.saveReference(aid, id, ref);
    }
    const deleteReference = (aid,id) =>{
        store.deleteReference(aid,id);
    }
    
    const changeFocus = (ref)=>{
        setSelectedReference(ref)
    }
    const edit = ()=>{
        console.log(selectedReference)
        if(selectedReference){
            setIsEditing(true);
            setTitlu(selectedReference.titlu);
            setData(new Date(selectedReference.data));
            setListaAutori(selectedReference.listaAutori);
        }    
    }

    return(
        <div>
            <div>
                <label>Titlu:</label>
                <input value={titlu} onChange={(e)=> setTitlu(e.target.value)} />
            </div>
            <div>
                <label>Data:</label>
                <DatePicker selected={data} onChange ={(data) => setData(data)} />
            </div>
            <div>
                <label>Lista autori:</label>
                <input value={listaAutori} onChange={(e)=> setListaAutori(e.target.value)} />
            </div>
            

            {!isEditing ?  <button onClick={()=>addReference(aid,{titlu,data,listaAutori})}>Adaugare</button> 
            : <button onClick={()=>{setIsEditing(false); saveReference(aid,selectedReference.id,{titlu,data,listaAutori}); setSelectedReference(null)}}>Save changes</button>}
            
            <button className="btn-edit"  onClick={()=>{
                edit();
            }}>Edit</button>
            
            <button className="btn-delete" onClick={()=>{
              if(selectedReference){
                  deleteReference(aid,selectedReference.id);
              }
          }}>Delete</button>

            <div className="references-container">Lista referinte
                {references.map(ref=> <Reference key={ref.id} item={ref} handleClick={changeFocus}></Reference> )}
            </div>
        </div>
    );
}

export default ReferenceList;