import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import Axios from 'axios';
import Swal from 'sweetalert2';


function Slider() {
  const [sliders, setSliders] = useState([{
    title:'',
    description:'',
    photo:'',
    url:''
}])
useEffect(()=>{
  fetch("http://localhost:5000/api/slider/all").then(res=>{
      if(res.ok){
          return res.json()
      }
  }).then(jsonRes=>setSliders(jsonRes));
})
const [input, setInput] = useState({
  title:'',
  description:'',
  url:'',
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
function editSLider(id){
  const slider ={
      title: input.title,
      description: input.description,
      url: input.url,
      photo: input.photo
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
          Axios.put('http://localhost:5000/api/slider/'+id,slider); 
          Swal.fire(
          'Modifié!',
          'slider modifiée avec succée',
          'success'
        )
      }
    })
}

function handleClick(event){
  event.preventDefault();
  const slider ={
    title: input.title,
    description:input.description,
    photo:input.photo,
    url:input.url
  }
  console.log(input);
  Axios.post('http://localhost:5000/api/slider',slider);
  Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'slider ajouté avec succée',
      showConfirmButton: false,
      timer: 1500
    })
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
          Axios.delete("http://localhost:5000/api/slider/" + id);
          Swal.fire(
          'Supprimé!',
          'Slider supprimée avec succée',
          'success'
        )
      }
    })
}

let i=1;

  return (
    <>
    <body id='adminbody'>
    <div class="container"><div class=" text-center mt-5 ">
    <h2 style={{color:"#fff"}} >Ajouter ou éditer un slider</h2>
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
                                            <div class="form-group"> <label for="form_name">Titre</label>
                                            <input id="form_name" 
                                            type="text"
                                            name="title"
                                            onChange={handleChange}
                                            value={input.title}
                                            class="form-control"
                                            placeholder="Entrez le titre du slider *"/> </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group"> <label for="form_name">Description</label>
                                            <input id="form_name" 
                                            type="text"
                                            name="description"
                                            onChange={handleChange}
                                            value={input.description}
                                            class="form-control"
                                            placeholder="Entrez la description du slider *"/> </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group"> <label for="form_email">Image </label> 
                                            <input id="file" 
                                            type="file" 
                                            name="photo"
                                            class="form-control" 
                                            placeholder="Entrez une image *" 
                                            required="required"
                                            onChange={handleChange}
                                            value={input.photo}/></div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group"> <label for="form_email">URL </label> 
                                            <input id="file" 
                                            type="text" 
                                            name="url"
                                            onChange={handleChange}
                                            value={input.url}
                                            class="form-control" 
                                            placeholder="URL de la page de destination *" 
                                            required="required"/></div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12"> <input type="submit" onClick={handleClick} class="btn btn-success btn-send pt-2 btn-block " value="Ajouter"/>  </div>
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
     <div class="col-8"><p id="titre" style={{float:"left"}} class="h2">Choix du slider: </p></div>
    </div>
    
    <div class="table-responsive">
    <table class="table table-hover table-dark">
  <thead> 
    <tr>
      <th scope="col">#</th>
      <th scope="col">Titre</th>
      <th scope="col">Description</th>
      <th scope="col">Photo</th>
    </tr>
  </thead>
  <tbody>
  {sliders.map(slider=>
    <tr>
      <th scope="row">{i++}</th>
      <td>{slider.title}</td>
      <td>{slider.description}</td>
      <td><img src={`http://localhost:5000/api/slider/photo/${slider._id}`} id="imgProd"/></td>
      <td>
          <button id="deledit" onClick={() => deleteItem(slider._id)} class="btn btn-danger" type="submit"><i class="far fa-trash-alt">Supprimer</i></button>
          <button id="deledit" onClick={() => editSLider(slider._id)} class="btn btn-warning" type="submit"><i class="far fa-edit"></i>Éditer</button>
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

export default Slider;