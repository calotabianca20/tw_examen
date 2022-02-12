import "./Article.css"
function Article(props) {
    const {item} = props;
    return(
        <div>
            <div className="article-container" onClick={()=>props.handleClick(item)}>
                        <div>{item.titlu}</div>
                        <div>{item.rezumat}</div>
                        <div>{item.data}</div>
            </div>
        </div>
     
    );
}

export default Article;