import "./Reference.css"
function Reference(props) {
    const {item} = props;
    return(
        <div>
            <div className="reference-container" onClick={()=>props.handleClick(item)}>
                        <div>{item.titlu}</div>
                        <div>{item.data}</div>
                        <div>{item.listaAutori}</div>
            </div>
        </div>
     
    );
}

export default Reference;