import React from "react";

function Pics({src}){
    let imgStyles={
        width:100+"%",
        height:"auto"
    }
    return <img src={src} alt="img" alt="slide-img" style={imgStyles}></img>
}

export default Pics;