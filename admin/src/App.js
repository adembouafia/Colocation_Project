import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Home from './views/home/home';
import Layout from './views/home/layout';
import Add_categorie from './views/home/categorie/add_categorie';
import List_categorie from './views/home/categorie/list_categorie';
import Add_colocation from './views/home/colocation/add_colocation';
import List_colocation from './views/home/colocation/list_colocation';
import Add_annonce from './views/home/annonce/add_annonce';
import Update_categorie from './views/home/categorie/update_categorie';
import List_annonce from './views/home/annonce/list_annonce';
import Update_annonce from './views/home/annonce/update_annonce';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
        <Route path="/" element={<Layout />} />
        <Route path="/addcat" element={<Add_categorie/>}/>
        <Route path="/listcat" element={<List_categorie/>}/>
        <Route path="/addco" element={<Add_colocation/>}/>
        <Route path="/listco" element={<List_colocation/>}/>
        <Route path="/addann" element={<Add_annonce/>}/>
        <Route path="/listann" element={<List_annonce/>}/>
        <Route path="/updatecat/:id" element={<Update_categorie/>}/>
        <Route path="/updateann/:id" element={<Update_annonce/>}/>
        
  
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
