import React from 'react';
import * as AiIcons from 'react-icons/ai';
import './cartButton.css' 

function cartbutton() {
    return (
        <a href="/panier">
            <button id="cartbutton" id="cartbutton" class="btn">
            <AiIcons.AiOutlineShoppingCart style={{fontSize:'28px',color:"black",margin:"6px"}}/>
            </button>
        </a>
    );
  }
  export default cartbutton;
