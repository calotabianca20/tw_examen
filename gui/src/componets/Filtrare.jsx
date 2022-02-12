import { useState } from "react";

function Filtrare(props){
    const [titlu,setTitlu]=useState(null);
    const [titluChecked, setTitluChecked]=useState(false);
    const [an,setAn]=useState(null);
    const [anChecked, setAnChecked]=useState(false);
    const titluri = props.titluri();
    const options2 = [2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021];
    const handleChangeGen = ()=>{
        if(!titluChecked){
            setTitluChecked(true);
        }
        else{
            setTitluChecked(false);
        }
    }
    const handleChangeAn = ()=>{
        if(!anChecked){
            setAnChecked(true);
        }
        else{
            setAnChecked(false);
        }
    }

    const applyFilters=()=>{
        if(titluChecked && anChecked){
            props.filtrare(`?titlu=${titlu}&an=${an}`)
        }
        else if(titluChecked){
                props.filtrare(`?titlu=${titlu}`)
        }
        
        else if(anChecked){
                props.filtrare(`?an=${an}`)
        }    

       
    }

    return(
        <div className="container-filtreaza" style={{"border":"1px solid black", "width": "20%","marginTop":"15px"}}>
             <label>Filtreaza</label>
             <div>
                <input type="checkbox" id="crit1" value="titlu" onChange={()=> handleChangeGen()}/>
                <label for="crit1">Dupa titlu:</label>
                <select value={titlu} onChange={(e) => setTitlu(e.target.value)} style={{"margin-left": "7px"}}>
                        {titluri.map(option => <option>{option}</option>)}
                </select>
             </div>
            <div>
                <input type="checkbox" id="crit2"  value="an" onChange={()=> handleChangeAn()}/>
                <label for="crit2">Dupa an:</label>
                <select value={an} onChange={(e) => setAn(e.target.value)}  style={{"margin-left": "7px"}}>
                        {options2.map(option => <option>{option}</option>)}
                </select>
            </div>
            <button className="btn-filtrare" onClick={()=>applyFilters()}>Aplica filtre</button>
             
        </div>
       
    );
}

export default Filtrare;