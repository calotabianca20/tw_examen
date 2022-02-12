import { useState } from "react";

function Sortare(props){
    const [criteriu,setCriteriu]=useState(null);
    const [tipSortare,setTipSortare]=useState(null);
    const options = ["titlu","data"];
    const options2 = ["ASC","DESC"];


    const sort=()=>{
       console.log(criteriu,tipSortare)
        if(tipSortare && criteriu) {
            props.handleSort(`?criteriu=${criteriu}&order=${tipSortare}`);
        } 
    }

    return(
        <div className="container-sortare" style={{"border":"1px solid black", "width": "20%","marginTop":"15px"}}>
             <label>Sorteaza</label>
             <div>
                <label for="crit1">Criteriu:</label>
                <select value={criteriu} onChange={(e) => setCriteriu(e.target.value)} style={{"margin-left": "7px"}}>
                        {options.map(option => <option>{option}</option>)}
                </select>
             </div>
            <div>
                <label for="crit2">Sortare:</label>
                <select value={tipSortare} onChange={(e) => setTipSortare(e.target.value)}  style={{"margin-left": "7px"}}>
                        {options2.map(option => <option>{option}</option>)}
                </select>
            </div>
            <button className="btn-sortare" onClick={()=>sort()}>Sorteaza</button>            
        </div>
       
    );
}

export default Sortare;