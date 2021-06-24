import React, {useEffect,useState} from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  const [nouvs, setNouv] = useState([{
    nameProd:'',
    price:'',
    photo:'',url:''
}])
useEffect(()=>{
  fetch("http://localhost:5000/api/nouveaute/all").then(res=>{
      if(res.ok){
          return res.json()
      }
  }).then(jsonRes=>setNouv(jsonRes));
})
let i=0;
  return (
    <div className='cards'>
      <h1>MEILLEURES VENTES</h1>
      <p>DÉCOUVREZ LES MEILLEURES VENTES DU MOMENT</p>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
          {nouvs.map(nouv=> 
            <a href={nouv.url}><CardItem
            id={`a${i++}`}
            src={`http://localhost:5000/api/nouveaute/photo/${nouv._id}`}
            text={nouv.nameProd}
            label={`${nouv.price} DT`}
            /></a> 
          )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;