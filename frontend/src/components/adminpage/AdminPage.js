import React, { useState , useEffect} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import './AdminPage.css';


function AdminPage() {
  const [produits, setProduits] = useState([{
    nameProd:'',
    description:'',
    price:'',
    category:'',
    quantity:'',
    photo:'',
}])
useEffect(()=>{
  fetch("http://localhost:5000/api/product/search").then(res=>{
      if(res.ok){
          return res.json()
      }
  }).then(jsonRes=>setProduits(jsonRes));
})

const [categories, setCategories] = useState([{
  name:'',
}])
useEffect(()=>{
  fetch("http://localhost:5000/api/category/all").then(res=>{
      if(res.ok){
          return res.json()
      }
  }).then(jsonRes=>setCategories(jsonRes));
})

const [input, setInput] = useState({
  nameProd:'',
  description:'',
  price:'',
  category:'',
  quantity:'',
  photo:'',
});
function handleChange(event) {
  const{name,value}=event.target;
  setInput(prevInput =>{
  return{
      ...prevInput,
      [name]:value
  }
  })
}
function handleClick(event){
  event.preventDefault();
  const product ={
      nameProd: input.nameProd,
      description:input.description,
      price:input.price,
      category:input.category,
      quantity:input.quantity,
      photo:input.photo
  }
  console.log(input);
  Axios.post('http://localhost:5000/api/product',product);
}
function deleteItem(id) {
  Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'GREEN',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, supprimez-le !'
    }).then((result) => {
      if (result.isConfirmed) {
          Axios.delete("http://localhost:5000/api/product/" + id);
          Swal.fire(
          'Supprimé!',
          'Produit supprimée avec succée',
          'success'
        )
      }
    })
}
let i = 1;
  return (
    <>
          <body id="bodyajout" style={{backgroundColor:"#454d55"}} >
        <div class="container"><div class=" text-center mt-5 ">
        <h2 style={{color:"#fff"}}>Ajouter ou modifier un produit</h2>
        <p style={{fontSize:"11px",color:"#fff"}} >*(pour modifier un produit, remplissez le champ a modifié et cliquez sur Éditer)</p>
            </div>
            <div class="row ">
                <div class="col-lg-7 mx-auto">
                    <div class="card mt-2 mx-auto p-4 bg-light">
                        <div class="card-body bg-light">
                            <div class="container">
                                <form id="contact-form" role="form">
                                    <div class="controls">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group"> <label for="form_name">Nom du produit *</label> 
                                                  <input id="form_name" 
                                                    type="text" name="nameProd" 
                                                    class="form-control" 
                                                    placeholder="Entrez le nom du produit *" 
                                                    required="required"
                                                    onChange={handleChange}
                                                    value={input.nameProd} /> 
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group"> <label for="form_lastname">Prix *</label> 
                                                <input id="form_prix"
                                                    min="0" type="number"
                                                    name="price" class="form-control" 
                                                    placeholder="Entrez le prix du produit *"
                                                    required="required" 
                                                    onChange={handleChange}
                                                    value={input.price}/> </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group"> <label for="form_email">Image *</label> 
                                                  <input id="file" 
                                                    type="file" 
                                                    name="photo"
                                                    class="form-control" 
                                                    placeholder="Entrez une image *" 
                                                    required="required"
                                                    onChange={handleChange}
                                                    value={input.photo}/>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group"> <label for="form_need" >Catégorie</label>
                                                <select style={{height:"37px",width:"100%",borderColor:'#4950575c',borderRadius:"4px"}} onChange={handleChange} value={input.category} name="category">
                                                <option selected >-Sélectionnez la catégorie-</option>
                                                {categories.map(category=>
                                                    <option
                                                    >{category.name}</option>
                                                )}
                                                </select> </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12" style={{marginTop:"-2%"}} >
                                                <div class="form-group"> <label for="form_need" >Entrez la quantité*</label>
                                                <input id="form_prix"
                                                    min="0" type="Number"
                                                    name="quantity" class="form-control" 
                                                    placeholder="Entrez la quantité au stock *"
                                                    required="required" 
                                                    onChange={handleChange}
                                                    value={input.quantity}/></div>
                                            </div>
                                   
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group"> <label for="form_message">Description *</label> 
                                                <textarea id="form_message" cols="33" rows="5" 
                                                    name="description" 
                                                    class="form-control"  
                                                    onChange={handleChange}
                                                    value={input.description}
                                                    placeholder="Entrez la description de votre produit."
                                                    rows="4" required="required">
                                                </textarea> </div>
                                            </div>
                                            <div class="col-md-12"> 
                                              <input type="submit" onClick={handleClick} class="btn btn-success btn-send pt-2 btn-block " value="Ajouter"/> 
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div> 
                </div> 
            </div>
        </div>
   
    <div class="row" id="parent">
     <div class="col-8"><p id="titre" style={{float:"left",margin:"0 0 0 2%"}} class="h2">Liste des produits</p></div>
    </div>
    <div class="table-responsive">
    <table class="table table-hover table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Id</th>
      <th scope="col">Nom</th>
      <th scope="col">Image</th>
      <th scope="col">Prix</th>
      <th scope="col">Quantité</th>
      <th scope="col">Catégorie</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {produits.map(product=> 
    <tr>
      <th scope="row">{i++}</th>
      <td>{product._id}</td>
      <td>{product.nameProd}</td>
      <td><img src={`http://localhost:5000/api/product/photo/${product._id}`} id="imgProd"/></td>
      <td>{product.price}</td>
      <td>{product.quantity}</td>
      <td>{product.category.name}</td>
      <td>
          <button id="deledit" class="btn btn-danger" onClick={() => deleteItem(product._id)} type="submit"><i class="far fa-trash-alt">&nbsp;Supprimer</i></button>
          <button id="deledit" class="btn btn-warning"  type="submit"><i class="far fa-edit">&nbsp;Éditer</i></button>
      </td>
    </tr>
        )}
  </tbody>
</table>
</div>
</body>
    </>
  );
}

export default AdminPage;