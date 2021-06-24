import React from "react";
import './FooterPage.css';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="3">
            <h5 className="title">Senteur de Carthage</h5>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title">Nos produits</h5>
            <ul class="ulfooter">
              <li className="list-unstyled">
                <a href="#!">Link 1</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 2</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 3</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 4</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title">Nouveauté</h5>
            <ul class="ulfooter">
              <li className="list-unstyled">
                <a href="#!">Link 1</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 2</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 3</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 4</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title">Contact</h5>
            <ul id="mailfooter">
              <li className="list-unstyled">
                <a>Numero: 50797342</a>
              </li>
              <li className="list-unstyled">
                <a>Mail: khlil_Test@yahoo.com</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com"> Khlil.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;