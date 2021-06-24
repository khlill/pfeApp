import React, { useState , useEffect} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import './AdminPage.css';


function NouvPord() {
  const [nouvs, setNouvs] = useState([{
    nameProd:'',
    price:'',
    photo:'',
    url:'',
}])
useEffect(()=>{
  fetch("http://localhost:5000/api/nouveaute/all").then(res=>{
      if(res.ok){
          return res.json()
      }
  }).then(jsonRes=>setNouvs(jsonRes));
})


const [input, setInput] = useState({
  nameProd:'',
  price:'',
  photo:'',
  url:'',
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
      photo:input.photo,
      url:input.url,
  }
  console.log(input);
  Axios.put('http://localhost:5000/api/nouveaute/'+id,product);
}


let i = 1;
  return (
    <>
          <body id="bodyajout" style={{backgroundColor:"#454d55"}} >
        <div class="container"><div class=" text-center mt-5 ">
        <h2 style={{color:"#fff"}}>Modifier les <b>Best-seller</b> affichés sur la page d'acceuil</h2>
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
                                                <div class="form-group"> <label for="form_lastname">URL *</label> 
                                                <input id="form_prix"
                                                    min="0" type="text"
                                                    name="price" class="form-control" 
                                                    placeholder="Entrez le prix du produit *"
                                                    required="required" 
                                                    onChange={handleChange}
                                                    value={input.url}/> </div>
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
      <th scope="col">Nom</th>
      <th scope="col">Image</th>
      <th scope="col">Prix</th>
      <th scope="col">URL</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {nouvs.map(nouv=> 
    <tr>
      <th scope="row">{i++}</th>
      <td>{nouv.nameProd}</td>
      <td><img src={`http://localhost:5000/api/nouveaute/photo/${nouv._id}`} id="imgProd"/></td>
      <td>{nouv.price}</td>
      <td>{nouv.url}</td>
      <td>
          <button id="deledit" class="btn btn-warning" onClick={handleClick(nouv._id)} type="submit"><i class="far fa-edit">&nbsp;Éditer</i></button>
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