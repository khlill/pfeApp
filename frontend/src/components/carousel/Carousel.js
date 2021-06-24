import React , {useEffect, useState} from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Pic1 from './pics/i1.jpg'
import Pic2 from './pics/i2.jpg'
import Pic3 from './pics/i3.jpg'

import 'bootstrap/dist/css/bootstrap.min.css'

function Slider() {
  const [sliders, setSliders] = useState([{

}])
useEffect(()=>{
  fetch("http://localhost:5000/api/slider/all").then(res=>{
      if(res.ok){
          return res.json()
      }
  }).then(jsonRes=>setSliders(jsonRes));
})
  return (
    <Carousel>
  {sliders.map(slider=>
      <Carousel.Item>
        <img 
          className="d-block w-100" 
          src={`http://localhost:5000/api/slider/photo/${slider._id}`}
          alt="First slide" 
        />
        <Carousel.Caption >
          <h3 style={{fontWeight:"900"}}>{slider.title}</h3><br/>
          <p>{slider.description}</p>
        </Carousel.Caption>
      </Carousel.Item>
    )}
    </Carousel>
  )
}

export default Slider
