import React, { useState , useEffect} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

import './ajout.css';


const AjoutCat = ({}) => {
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
    console.log(categories)

    
    const [input, setInput] = useState({
        nom:''
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
        const category ={
            name: input.nom
        }
        console.log(input);
        Axios.post('http://localhost:5000/api/category',category);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Catégorie ajouté avec succée',
            showConfirmButton: false,
            timer: 1500
          })
    }
    function editCateg(id){
        const category ={
            name: input.nom
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
                Axios.put('http://localhost:5000/api/category/'+id,category); 
                Swal.fire(
                'Modifié!',
                'Catégorie modifiée avec succée',
                'success'
              )
            }
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
                Axios.delete("http://localhost:5000/api/category/" + id);
                Swal.fire(
                'Supprimé!',
                'Catégorie supprimée avec succée',
                'success'
              )
            }
          })
      }
      let i = 1;
    return (
    <body id="bodyajout" style={{backgroundColor:"#212529", marginTop:"-3.2%" }}>
    <div class="container"><div class=" text-center mt-5 ">
    <h2 style={{color:"#fff"}}>Ajouter une catégorie</h2>
    <p style={{fontSize:"11px",color:"#fff"}} >*(pour modifier une catégorie, remplissez le champ a modifié et cliquez sur Éditer)</p>
        </div>
        <div class="row ">
            <div class="col-lg-7 mx-auto">
                <div class="card mt-2 mx-auto p-4 bg-light">
                    <div class="card-body bg-light">
                        <div class="container">
                            <form id="contact-form" role="form" >
                                <div class="controls">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group"> <label for="form_name">Nom de la catégorie *</label> 
                                            <input id="form_name" 
                                            onChange={handleChange}  
                                            type="text" 
                                            value={input.nom} 
                                            name="nom" class="form-control" 
                                            placeholder="Entrez le nom de la catégorie *" 
                                            required="required" /> </div>
                                        </div>
                                        <div class="col-md-12"> <input type="submit" class="btn btn-success btn-send pt-2 btn-block" onClick={handleClick} value="Ajouter"/></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div> 
            </div> 
        </div>
    </div>
    <div class="row" id="parent" style={{margin:"2% 0 0 0"}}>
     <div class="col-8"><p id="titre" style={{float:"left",margin:"0 0 1% 2%"}} class="h2">Catégories </p></div>
    </div>
    <div class="table-responsive">
    <table class="table table-hover table-dark">
  <thead>
    <tr>
      <th scope="col" style={{fontWeight:"900",color:"#7d8da8"}}>#</th>
      <th scope="col" style={{fontWeight:"900",color:"#7d8da8"}}>id</th>
      <th scope="col" style={{fontWeight:"900",color:"#7d8da8"}}>Nom de la catégorie</th>
    </tr>
  </thead>
  <tbody>
        {categories.map(category=>
        <tr>
        <td style={{fontWeight:"600",color:'#7d8da8'}}>{i++}</td>
        <th scope="row">{category._id}</th>
        <td >{category.name}</td>
        <td>
            <button id="deledit" class="btn btn-danger" onClick={() => deleteItem(category._id)} type="submit"><i class="far fa-trash-alt">&nbsp;Supprimer</i></button>
            <button id="deledit" class="btn btn-warning" onClick={() => editCateg(category._id)} type="submit"><i class="far fa-edit">&nbsp;Éditer</i></button>
        </td>
        </tr>
        )}
  </tbody>
</table>
</div>
</body>
    );
  }
  export default AjoutCat;