import './SignUpAdmin.css';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import React, {useState} from 'react';
import Axios from 'axios';


function RegisterAdmin(){
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [fnameReg, setFnameReg] = useState("");
  const [lnameReg, setLnameReg] = useState("");

  const SignUp = () => {
    Axios.post('http://localhost:5000/api/user/register-admin',{
      fname: fnameReg,
      lname: lnameReg,
      email: emailReg,
      password: passwordReg,
    })
  }
    return (
<MDBContainer>
  <MDBRow>
    <MDBCol md="12">
    <body>
      <form>
        <p className="h4 text-center mb-4" id="inscriAdmin">Inscription Administrateur</p>
       
       <div>
        
        <label htmlFor="defaultFormLoginfnameEx" className="grey-text">
          Nom
        </label>
        <input type="text" name="name" placeholder="Nom de famille" id="defaultFormLoginfnameEx" className="form-control" onChange={(e)=>{setLnameReg(e.target.value)}} />
        </div>
         <br />
        <div>
   
        <label htmlFor="defaultFormLoginlnameEx" className="grey-text">
          Prenom
        </label>
        <input type="text" name="lname" placeholder="Prenom" id="defaultFormLoginlnameEx" className="form-control" onChange={(e)=>{setFnameReg(e.target.value)}} />
        </div>
         <br />
        <div>
   
        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
          E-mail
        </label>
        <input type="email" name="email" id="defaultFormLoginEmailEx" placeholder="adresse@email.com" className="form-control" onChange={(e)=>{setEmailReg(e.target.value)}}/>
        </div>
         <br />
        <div>
        
        <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
          Mot de passe
        </label>
        <input type="password" name="password" id="defaultFormLoginPasswordEx" placeholder="••••••••••" className="form-control" onChange={(e)=>{setPasswordReg(e.target.value)}}/>
        <div/>
          <br/>
        <div>
        <label htmlFor="defaultFormLoginCPasswordEx" className="grey-text" >
          Confirmez le mot de passe 
        </label>
        <input type="password" name="confirmPassword" placeholder="••••••••••" id="defaultFormLoginCPasswordEx" className="form-control"/> 
        </div>


        <div className="text-center mt-4">
        <MDBBtn color="blue" type="submit" onClick={SignUp}>Confirmer</MDBBtn>
        </div>
        
      </div>
      </form>
      </body>
    </MDBCol>
  </MDBRow>
</MDBContainer>
);
}

export default RegisterAdmin

