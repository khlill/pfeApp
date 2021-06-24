import React, { useState , useEffect} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import './AdminPage.css';


function NouvPord() {
  const [nouvs, setNouvs] = useState([{
    nameProd:'',
    price:'',
    id:'',
}])
useEffect(()=>{
  fetch("http://localhost:5000/api/id/all").then(res=>{
      if(res.ok){
          return res.json()
      }
  }).then(jsonRes=>setNouvs(jsonRes));
})
function editProd(id){
  const newId ={
      nameProd: input.nameProd,
      id: input.id,
      price: input.price,
  }
  Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ffbb33',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, modifiez-le !'
    }).then((result) => {
      if (result.isConfirmed) {
          Axios.put('http://localhost:5000/api/id/'+id,newId); 
          Swal.fire(
          'Modifié!',
          'nouveau produit modifiée avec succée',
          'success'
        )
      }
    })
}

function deleteId(id) {
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
          Axios.delete("http://localhost:5000/api/id/" + id);
          Swal.fire(
          'Supprimé!',
          'Slider supprimée avec succée',
          'success'
        )
      }
    })
}

const [input, setInput] = useState({
  nameProd:'',
  price:'',
  id:'',
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
function handleClick(id){
  const product ={
      nameProd: input.nameProd,
      price:input.price,
      id:input.id,
  }
  console.log(input);
  Axios.put('http://localhost:5000/api/id/',product);
}


let i = 1;
  return (
    <>
          <body id="bodyajout" style={{backgroundColor:"#454d55"}} >
        <div class="container"><div class=" text-center mt-5 ">
        <h2 style={{color:"#fff"}}>Ajouter l'id</h2> <p style={{color:"#fff"}}> du produit que vous voulez ajouter en tant que nouveau produit</p>
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
                                            <div class="col-md-12">
                                                <div class="form-group"> <label for="form_email">ID *</label> 
                                                <a style={{marginLeft:"2%"}} href="/admin-dashboard">accéder à l'id des produit</a>
                                                  <input id="file" 
                                                    type="text" 
                                                    name="photo"
                                                    class="form-control" 
                                                    placeholder="Entrez l'id *" 
                                                    required="required"
                                                    onChange={handleChange}
                                                    value={input.id}/>
                                                </div>
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
      <th scope="col">ID</th>
      <th scope="col">Nom</th>
      <th scope="col">Prix</th>
    </tr>
  </thead>
  <tbody>
  {nouvs.map(nouv=> 
    <tr>
      <th scope="row">{i++}</th>
      <td>{nouv.id}</td>
      <td>{nouv.nameProd}</td>
      <td>{nouv.price}</td>
      <td>
          <button id="deledit" class="btn btn-danger" onClick={() => deleteId(nouv._id)}  type="submit"><i class="far fa-edit">&nbsp;Supprimer</i></button>
          <button id="deledit" class="btn btn-warning" onClick={() => editProd(nouv._id)} type="submit"><i class="far fa-edit">&nbsp;Éditer</i></button>
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

export default NouvPord;