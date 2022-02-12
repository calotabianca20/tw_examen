import './App.css';
import ArticleList from './componets/ArticleList';
import ReferenceList from './componets/ReferenceList';
import {Switch, Route,BrowserRouter} from "react-router-dom"
import PagRef from './componets/PagRef';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ArticleList}/>      
        <Route exact path="/:aid/references"  component={ReferenceList} />
        <Route exact path="/:aid/references/:rid" component={PagRef}/>
      </Switch>     
    </BrowserRouter>
  );
}

export default App;
