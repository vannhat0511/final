import './App.css';
import Header from './components/header';
import Show from './components/Show_product';
import Footer from './components/footer';
import { Routes,Route} from "react-router-dom";
import ShowProduct from './Admin/api';
function App() {
  return (
    <div>
         <Header/>
         <Routes>    
              <Route path='/' element={<Show/>}/>
              <Route path='/Admin' element={<ShowProduct/>}/>;
              {/* <Route path='/Add' element={<Add></Add>} />
              <Route path="/Edit/:id" element={<Edit></Edit>}/>
              <Route path="/product/:id" element={<ProductDetail></ProductDetail>} /> */}
          </Routes>
         <Footer/>
         <Routes>   
         </Routes>
    </div>
     
  );
}

export default App;