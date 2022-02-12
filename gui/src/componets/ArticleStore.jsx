import axios from "axios"
const {EventEmitter} = require("fbemitter")

const SERVER = 
`${window.location.protocol}//${window.location.hostname}:8080`
console.log(SERVER);
class ArticleStore {  
    constructor(){
        this.data = [];
        this.emitter = new EventEmitter();
    }

    async getArticles(){
        axios.get(`${SERVER}/articles`)
        .then(response=>{
            this.data = response.data;
            this.emitter.emit("GET_ARTICLES_SUCCESS")
        })
        .catch(error=>{
            this.emitter.emit("GET_ARTICLES_ERROR")
            console.warn(error);
        })
    }
    

    async getFilteredArticles(queryString){
        console.log(queryString);
        axios.get(`${SERVER}/articles${queryString}`)
        .then(response=>{
            this.data = response.data;
            this.emitter.emit("GET_ARTICLES_SUCCESS")
        })
        .catch(error=>{
            this.emitter.emit("GET_ARTICLES_ERROR")
            console.warn(error);
        })
    }

    async getSortedArticles(queryString){
        console.log(queryString);
        axios.get(`${SERVER}/articles${queryString}`)
        .then(response=>{
            this.data = response.data;
            this.emitter.emit("GET_ARTICLES_SUCCESS")
        })
        .catch(error=>{
            this.emitter.emit("GET_ARTICLES_ERROR")
            console.warn(error);
        })
    }

    async addArticle(article){
        console.log(article);
        axios.post(`${SERVER}/articles`, article)
        .then(response =>{
            if(!response.ok){
                throw response;
            }
            this.getArticles();       
        })   
        .catch(error=>{
            this.emitter.emit("ADD_ARTICLE_ERROR")
            console.warn(error);
        })
    }

    async saveArticle(id, article){
        axios.put(`${SERVER}/articles/${id}`,article)
        .then(response=>{
            if(!response.ok){
                throw response;
            }
            this.getArticles();
        })
        .catch(error=>{
            this.emitter.emit("SAVE_ARTICLE_ERROR")
            console.warn(error);
        })
    }

    async deleteArticle(id){
        axios.delete(`${SERVER}/articles/${id}`)
        .then(response=>{
            if(!response.ok){
                throw response;
            }
            
            this.getArticles();
        })
        .catch(error=>{
            this.emitter.emit("DELETE_ARTICLE_ERROR")
            console.warn(error);
        })
    }


    async getReferences(aid){
        axios.get(`${SERVER}/articles/${aid}/references`)
        .then(response=>{
            this.data = response.data;
            this.emitter.emit("GET_REFERENCES_SUCCESS")
        })
        .catch(error=>{
            this.emitter.emit("GET_REFERENCES_ERROR")
            console.warn(error);
        })
    }

    async getReference(aid,rid){
        console.log(aid,rid);
        axios.get(`${SERVER}/articles/${aid}/references/${rid}`)
        .then(response=>{
            this.data = response.data;
            console.log(this.data);
            this.emitter.emit("GET_REFERENCE_SUCCESS")
        })
        .catch(error=>{
            this.emitter.emit("GET_REFERENCE_ERROR")
            console.warn(error);
        })
    }

    async addReference(aid, reference){
        axios.post(`${SERVER}/articles/${aid}/references`, reference)
        .then(response =>{
            if(!response.ok){
                throw response;
            }
            this.getReferences(aid);
        })   
        .catch(error=>{
            this.emitter.emit("ADD_REFERENCE_ERROR")
            console.warn(error);
        })
    }

    async saveReference(aid,rid, reference){
        axios.put(`${SERVER}/articles/${aid}/references/${rid}`,reference)
        .then(response=>{
            if(!response.ok){
                throw response;
            }
            this.getReferences(aid);
        })
        .catch(error=>{
            this.emitter.emit("SAVE_REFERENCE_ERROR")
            console.warn(error);
        })
    }

    async deleteReference(aid,rid){
        axios.delete(`${SERVER}/articles/${aid}/references/${rid}`)
        .then(response=>{
            if(!response.ok){
                throw response;
            }
            
            this.getReferences(aid);
        })
        .catch(error=>{
            this.emitter.emit("DELETE_REFERENCE_ERROR")
            console.warn(error);
        })
    }

}

const store = new ArticleStore();
export default store;