import React, {useEffect,useState} from 'react';
import './Cart.css';
import payement from './payement.png'

function Cart() {
    const [carts, setCarts] = useState([{
        items:[],
        subTotal:''
    }])
    useEffect(()=>{
        fetch("http://localhost:5000/cart").then(res=>{
            if(res.ok){
                return res.json()
            }
        }).then(jsonRes=>setCarts(jsonRes));
        console.log(carts);
      })
    return (
      <div className="App">  
          <section class="section-pagetop bg">
          <div class="container">
              <h2 id="title-page">Votre panier</h2>
          </div> 
          </section>
          
          <section class="section-content padding-y">
          <div class="container">
          
          <div class="row">
              <main class="col-md-9">
          <div class="card">
          
          <table class="table table-borderless table-shopping-cart">
          <thead class="text-muted">
          <tr class="small text-uppercase">
          <th scope="col">Produit</th>
          <th scope="col" width="120">Quantité</th>
          <th scope="col" width="120">Prix</th>
          <th scope="col" class="text-right" width="200"> </th>
          </tr>
          </thead>
          <tbody>
         
          <tr>
              <td>
                  <figure class="itemside">
                      <div class="aside"><img src="https://via.placeholder.com/100" class="img-sm" id="imgpanier"/></div>
                      <figcaption class="info">
                          <a href="#" class="title text-dark" id="Prodname"></a>
                         
                      </figcaption>
                  </figure>
              </td>
              <td> 
                <input type="number" class="qte" min="1" max="20"></input>
              </td>
              <td> 
                  <div class="price-wrap"> 
                      <var class="price"> DT</var> <br/>
                  </div> 
              </td>
              <td class="text-right"> 
              <a data-original-title="Save to Wishlist" id="wishlist" title="" href="" class="btn btn-light mr-2" data-toggle="tooltip"> <i class="fa fa-heart"></i></a> 
              <a href="" class="btn btn-light" id="supprimer">Supprimer</a>
              <a href="" class="btn btn-light btn-round" id="trash"><i class="far fa-trash-alt"></i></a>
              </td>
          </tr>
          
          </tbody>
          </table>
          
          <div class="card-body border-top">
              <a href="/payement" id="faireachat" class="btn btn-khlil float-md-right"> Faire l'achat <i class="fa fa-chevron-right"></i> </a>
              <a href="/produits" id="retour" class="btn btn-light"> <i class="fa fa-chevron-left"></i> Continuer vos achats </a>
          </div>  
          </div> 
          
          <div class="alert alert-success mt-3">
              <p class="icontext"><i style={{fontColor:"green"}} class="icon text-success fa fa-truck"></i> Livraison gratuite à partir de 50 DT d'achat</p>
          </div>
          
              </main>
              <aside class="col-md-3">
                  <div class="card mb-3">
                      <div class="card-body">
                      <form>
                          <div class="form-group">
                              <label>Vous avez un coupon?</label>
                              <div class="input-group">
                                  <input type="text" class="form-control" name="" placeholder="Coupon code" />
                                  <span class="input-group-append"> 
                                      <button class="btn btn-khlil" id="envoyer">Envoyer</button>
                                  </span>
                              </div>
                          </div>
                      </form>
                      </div> 
                  </div>  
                  <div class="card">
                      <div class="card-body">
                              <dl class="dlist-align">
                              <dt>Prix total:</dt>
                              <dd class="text-right">DT</dd>
                              </dl>
                              <dl class="dlist-align">
                              <dt>Réduction:</dt>
                              <dd class="text-right">- DT</dd>
                              </dl>
                              <dl class="dlist-align">
                              <dt>Total:</dt>
                              <dd class="text-right  h5"><strong>- DT</strong></dd>
                              </dl>
                              <hr />
                              <p class="text-center mb-3">
                                  <img id="pay" src={payement}></img>
                              </p>
                              
                      </div> 
                  </div>  
              </aside> 
          </div>
          
          </div> 
          </section>
         
          <section class="section-name bg padding-y">
          <div class="container">
          <h6>Politique de paiement et de remboursement </h6>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          
          </div>
          </section>  
      </div>
    );
  }
  export default Cart;