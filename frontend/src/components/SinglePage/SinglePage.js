import './singlepage.css'
import React, {useEffect,useState} from 'react';


function SinglePage() {
    var idArray= window.location.pathname.split('/');
    var id = idArray[2];
 

    const [produits, setProduits] = useState([{
        nameProd:'',
        description:'',
        price:'',
        category:'',
        quantity:'',
        photo:'',
    }])
    useEffect(()=>{
        fetch("http://localhost:5000/api/product/"+id).then(res=>{
            if(res.ok){
                return res.json()
            }
        }).then(jsonRes=>setProduits(jsonRes));
      })
      
    return (
      <div className="App">
      <section class="section-content padding-y bg">
          <div class="container" id="cont">
          <article class="card">
              <div class="card-body">
                      <div class="row">
                          <aside class="col-md-6">
                                  <article class="gallery-wrap">
                                      <div class="card img-big-wrap">
                                          <a href="#"> <img id="mainImg" src={`http://localhost:5000/api/product/photo/${id}`} /></a>
                                      </div> 
                                      <div class="thumbs-wrap">
                                   
                                      </div>
                                  </article>
                          </aside>
                          <main class="col-md-6">
                              <article>
                                  {/*<a href="#" class="text-primary btn-link">{produits.category.name}</a>*/}
                                  <h3 class="title">{produits.nameProd}</h3>
                                  <div>                           
                                      <span class="label-rating mr-3 text-muted">-/10</span>
                                      <a href="#" id="wish" class="btn-link mr-3 text-muted"> <i class="fa fa-heart"></i>Liste des souhaits </a>
                                  </div> 
                                  <hr />
                      
                                  <div class="mb-3">
                                      <h6 id='h6'>DESCRIPTION</h6>
                                      <ul class="list-dots mb-0">
                                          <p id="descrip">{produits.description}</p>
                                      </ul>
                                  </div>
                                  <div class="mb-3">
                                      <h6 id='h6'>INGREDIENTS</h6>
                                      <ul class="list-dots mb-0">
                                          <p id="descrip">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    asperiores harum, deserunt neque illo sequi cupiditate, placeat iure labore obcaecati</p>
                                      </ul>
                                  </div>
                                  
                                  <div class="form-group">
                                             
                                  </div>
          
                                  <div class="mb-3">
                                      <var class="price h4" style={{fontStyle:"normal"}}> {produits.price}DT</var>                                   
                                    </div> 
                                  <div class="mb-4">
                                      <a href="#" class="btn btn-khlil mr-1">Acheter</a>
                                      <a href="#" class="btn btn-light">Ajouter au panier</a>
                                  </div>
                                  
                              </article> 
                          </main>
                      </div> 
              </div> 
          </article>
          <article class="card mt-5">
              <div class="card-body">
                  <div class="row">
                      <aside class="col-md-12">
                          <h5 id="aimer" style={{marginLeft:"35%",fontWeight:"700",marginBottom:"2%"}}>VOUS POURRIEZ AUSSI AIMER</h5>
                          <div class="container">
                         <div class="row">
                          <div class="col-md-4">
                  <figure class="card card-product-grid">
                      <div class="img-wrap"> 
                          <img src={`http://localhost:5000/api/product/photo/60b7cdd22c8b1e432c8f643b`} />
                      </div> 
                      <figcaption class="info-wrap">
                          <div class="fix-height">
                              <a href="#" class="title" id="prodtitle">Nom du produit</a>
                              <div class="price-wrap mt-2">
                                  <span class="price">-DT</span>
                              </div>
                          </div>
                          <a href="#" class="btn btn-block btn-khlil">Ajouter au panier</a>  
                      </figcaption>
                  </figure>
              </div> 
              <div class="col-md-4">
                  <figure class="card card-product-grid">
                      <div class="img-wrap"> 
                          <img src={`http://localhost:5000/api/product/photo/60c4bf22abfdfa422ce587c9`} />
                      </div> 
                      <figcaption class="info-wrap">
                          <div class="fix-height">
                              <a href="#" class="title" id="prodtitle">Nom du produit</a>
                              <div class="price-wrap mt-2">
                                  <span class="price">-DT</span>
                              </div>
                          </div>
                          <a href="#" class="btn btn-block btn-khlil">Ajouter au panier</a>  
                      </figcaption>
                  </figure>
              </div>
              <div class="col-md-4">
                  <figure class="card card-product-grid">
                      <div class="img-wrap"> 
                          <img src={`http://localhost:5000/api/product/photo/60ca879d8c9fb80f74980609`} />
                      </div> 
                      <figcaption class="info-wrap">
                          <div class="fix-height">
                              <a href="#" class="title" id="prodtitle">Nom du produit</a>
                              <div class="price-wrap mt-2">
                                  <span class="price">-DT</span>
                              </div>
                          </div>
                          <a href="#" class="btn btn-block btn-khlil">Ajouter au panier</a>  
                      </figcaption>
                  </figure>
              </div> 
              </div>
              </div>
                      </aside>
                  </div>    
                  <hr />
                  <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
              </div> 
          </article>
          </div>
          <article class="card mt-5">
              <div class="card-body" id="card">
                  <div class="row">
                  <h5 id="aimer" style={{marginLeft:"42%",fontWeight:"700",marginBottom:"2%"}}>Rédigez un commentaire</h5>
                  <div class="container justify-content-center">
    <div class="d-flex justify-content-center pt-3 pb-2"> <input type="text" name="text" placeholder="Ajouter un commentaire" class="form-control addtxt"/> </div>
    <div class="d-flex justify-content-center py-2">
        <div class="second py-2 px-2"> <span class="text1">Type your note, and hit enter to add it</span>
            <div class="d-flex justify-content-between py-1 pt-2">
                <div><span class="text2">Khlil</span></div>
                <div><span class="text3">12-04-2021</span><span class="thumbup"><i class="fa fa-thumbs-o-up"></i></span></div>
            </div>
        </div>
    </div>
    <div class="d-flex justify-content-center py-2">
        <div class="second py-2 px-2"> <span class="text1">Type your note, and hit enter to add it</span>
            <div class="d-flex justify-content-between py-1 pt-2">
                <div><span class="text2">Porte</span></div>
                <div><span class="text3">13-04-2021</span><span class="thumbup"><i class="fa fa-thumbs-o-up"></i></span></div>
            </div>
        </div>
    </div>
</div>
                    </div>
              </div> 
          </article>
          
          


         
</section>
</div>
    );
  }
  export default SinglePage;

