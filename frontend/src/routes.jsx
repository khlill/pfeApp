import './App.css';
import { Route,BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar/Navbar";
import Carousel from "./components/carousel/Carousel";
import Cards from './components/carditem/Cards';
import Cards2 from './components/carditem2/Cards';
import FooterPage from './components/footer/FooterPage';
import FormPage from './components/Login/Login';
import ContactForm from './components/ContactUs/ContactForm';
import Produits from './components/Produits/Produits';
import Cart from './components/Panier/Cart';
import SinglePage from './components/SinglePage/SinglePage';
import Oublie from './components/mdpOublié/MdpOublie';
import Payement from './components/payement/payment';
import Register from './components/SignUp/SignUp';
import NavbarAdmin from './components/adminpage/NavbarAdmin';
import AdminPage from './components/adminpage/AdminPage';
import CartButton from './components/CartButton';
import Nouveaute from './components/Nouveaute/Nouveaute'
import RegisterAdmin from './components/SignUpAdmin/SignUpAdmin'
import LoginAdmin from './components/LoginAdmin/Login'
import Slider from './components/adminpage/Slider'
import AjoutCat from './components/adminpage/ajoutcateg'
import NewProd from './components/adminpage/nouvProd'
import AjoutId from './components/adminpage/ajoutId'
import Cadeau from './components/adminpage/Cadeau'



function Routes() {
  return (
    <div>
      <Router>
     
        <Route path="/" exact>
          <Navbar />
          <Carousel />
          <Cards />
          <Cards2 />
          <CartButton /> 
          <FooterPage />
        </Route>

        <Route path="/produits">
        <Navbar />
          <Produits/>
          <CartButton />
          <FooterPage />
        </Route>

        <Route path="/UnProduit/:id" exact>
          <Navbar />
          <SinglePage/>
          <CartButton /> 
          <FooterPage />
        </Route>
       
        <Route path="/panier">
          <Navbar/>
          <Cart/>
          <FooterPage />
        </Route>
       
        <Route path="/contact">
          <Navbar />
          <ContactForm />
          <CartButton /> 
          <FooterPage />
        </Route>
       
        <Route path="/sign-up">
          <Navbar />
          <Register/>
          <FooterPage />
        </Route>
        
        <Route path="/sign-in">
          <Navbar />
          <FormPage/>
          <FooterPage />
        </Route>
       
        <Route path="/mdpOublie">
          <Navbar/>
          <Oublie/>
          <FooterPage />
        </Route>
        
        <Route path="/payement">
          <Navbar/>
          <Payement/>
          <CartButton /> 
          <FooterPage />
        </Route>
       
        <Route path="/nouveaute">
          <Navbar />
          <Nouveaute/>
          <CartButton /> 
          <FooterPage />
        </Route>

        <Route path="/admin-dashboard">
          <NavbarAdmin/>
          <AdminPage/>
        </Route>

        <Route path="/a1d2m0i5n">
          <NavbarAdmin/>
          <LoginAdmin/>
          <RegisterAdmin/>
        </Route>

        <Route path="/1slidereditk2">
          <NavbarAdmin/>
          <Slider/>
        </Route>

        <Route path="/1Categorie2">
          <NavbarAdmin/>
          <AjoutCat/>
        </Route>

        <Route path="/1New2Prod">
          <NavbarAdmin/>
          <NewProd/>
        </Route>

        <Route path="/ajoutId">
          <NavbarAdmin/>
          <AjoutId/>
        </Route>

        <Route path="/C1adea2u">
          <NavbarAdmin/>
          <Cadeau/>
        </Route>

      </Router>
    </div>
  );
}

export default Routes;
