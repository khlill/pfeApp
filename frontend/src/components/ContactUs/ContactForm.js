import React from "react";
import './ContactUs.css';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'


const FormPage = () => {
return (
<MDBContainer>
  <MDBRow>
   <MDBCol md="12">
    <body>    
    <Jumbotron fluid>
       <Container>
         <h1 id="titrejumbo">INFORMATIONS SUR LE MAGASIN</h1>
         <div class="container">
           <div class="row">
             <div id="position" class="col-4 mt-5 pl-5"> <i id="mark" class="fas fa-map-marker-alt"></i>         
              Senteur de Carthage Zone Industrielle El kalaa 2036 <br/>
             </div>
             <div id="tel" class="col-4 mt-5 pl-5">    
             <i id="phone" class="fas fa-phone-alt"></i>Appelez-nous:<br/>+21673687841
             </div>
             <div id="mail" class="col-4 mt-5 ">       
             <i id="at" class="fas fa-at"></i><br id="thisbr"/><br id="thisbr"/>&nbsp;Envoyez-nous un email:<br/>hello@senteursdecarthage.com
             </div>
           </div>
         </div>
      </Container>
    </Jumbotron>
        <form>
        <p id="contactus" className="h4 text-center mb-4">CONTACTEZ NOUS</p>
        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
          E-mail
        </label>
        <input type="email" id="defaultFormLoginEmailEx" className="form-control" placeholder="Votre e-mail..."/>
        <br />
        <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
          Pièce jointe
        </label>
        <input type="file" class="form-control" id="customFile" /><br/>
        <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
          Message
        </label> 
        <textarea class="form-control" id="exampleFormControlTextarea1" placeholder="Comment pouvez-vous nous aidez ?" rows="3"></textarea>
        <div className="text-center mt-4">
          <MDBBtn color="transparent" type="submit">Envoyer</MDBBtn>
        </div>
      </form>
      </body>
    </MDBCol>
  </MDBRow>
</MDBContainer>
);
};

export default FormPage;