import { useEffect, useState } from "react";
import store from "./ArticleStore";
import "./ArticleList.css";
import Filtrare from "./Filtrare";
import Sortare from "./Sortare";
import Article from "./Article";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function ArticleList(){
    const [titlu, setTitlu] =useState("");
    const [rezumat,setRezumat] = useState("");
    const [data, setData] = useState(null);

    const [articles, setArticles] = useState([]);
    const [selectedArticle,setSelectedArticle] = useState(null);
    const [isEditing, setIsEditing] = useState(false)

    useEffect(()=>{
        store.getArticles();
        store.emitter.addListener("GET_ARTICLES_SUCCESS",()=>{
            setArticles(store.data)
        })
    },[]);
    const getTitles=()=>{
        const titluri = articles.map(art=>art.titlu);
        return titluri;
    }
    const addArticle = (article) =>{
        store.addArticle(article);
    }
    const saveArticle = (id,article) =>{
        store.saveArticle(id, article);
    }
    const deleteArticle = (id) =>{
        store.deleteArticle(id);
    }
    
    const changeFocus = (article)=>{
        console.log(article);
        setSelectedArticle(article)
    }
    const edit = ()=>{
        console.log(selectedArticle)
        if(selectedArticle){
            setIsEditing(true);
            setTitlu(selectedArticle.titlu);
            setRezumat(selectedArticle.rezumat);
            console.log(selectedArticle.data);
            setData(new Date(selectedArticle.data));
        } 
    }
    const applyFilters = (queryString)=>{
        store.getFilteredArticles(queryString);
        
    }
    const sort = (queryString)=>{
        console.log(queryString);
        store.getSortedArticles(queryString);
        
    }

    return(
        <div>
            <div>
                <label>Articol:</label>
                <input value={titlu} onChange={(e)=> setTitlu(e.target.value)} />
            </div>
            <div>
                <label>Rezumat:</label>
                <input value={rezumat} onChange={(e)=> setRezumat(e.target.value)} />   
            </div>
            <div>
                <label>Data:</label>
                <DatePicker selected={data} onChange ={(data) => setData(data)} />
            </div>

            {!isEditing ? <button className="btn-add" onClick={()=>addArticle({titlu,rezumat,data})}>Adaugare</button> 
            : <button onClick={()=>{setIsEditing(false); saveArticle(selectedArticle.id,{titlu,rezumat,data})}}>Save changes</button>}
            
            <button className="btn-edit"  onClick={()=>{
                edit();
            }}>Edit</button>
            
            <button className="btn-delete" onClick={()=>{
              if(selectedArticle){
                  deleteArticle(selectedArticle.id);
              }
          }}>Delete</button>
            <Filtrare filtrare={applyFilters} titluri={getTitles} />
            <Sortare  handleSort ={sort}/>
            <div className="articles-container">Lista articole
                {articles.map(article=> <Article key={article.id} item={article} handleClick={changeFocus}></Article> )}
            </div>
        </div>
    );
}

export default ArticleList;