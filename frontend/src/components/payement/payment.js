import React from "react";
import './payment.css';

const Payement = () => {
return (
<div class="container">
    <div class="view-account">
        <section class="module">
        	<div class="module-inner">
        		<div class="side-bar">
        			<div class="user-info">
        				
        				<ul class="meta list list-unstyled">
        					<li class="name">Khlil Essouaid</li>
        				</ul>
        			</div>
        			<nav class="side-menu">
        				<ul class="nav">

        					<li class="active"><a href="#"><span class="fa fa-credit-card"></span>&nbsp;&nbsp;Facturation</a></li>

        				</ul>
        			</nav>
        		</div>
        		
        		<div class="content-panel">
        			<h2 class="title" style={{fontWeight:"900"}}>Facturation</h2>
        			<div class="billing">
        				<div class="secure text-center margin-bottom-md">
        					<h3 id="secure" class="margin-bottom-md text-success">
        							<span class="fs1 icon" aria-hidden="true" data-icon=""></span>
                                    Paiement sécurisé par carte de crédit<br/>
        							<small>Il s'agit d'un paiement crypté SSL 128 bits sécurisé</small>
        						</h3>
        					<div class="accepted-cards">
        						<ul class="list-inline">
        							<li><img style={{width:"5%"}} src="https://www.uxfordev.com/demo/1.0.6/assets/images/payment-icon-set/icons/visa-curved-32px.png" alt="Visa"/><img style={{width:"5%",margin:"5px"}} src="https://www.uxfordev.com/demo/1.0.6/assets/images/payment-icon-set/icons/mastercard-curved-32px.png" alt="MasterCard"/></li>
        					
        						</ul>
        					</div>
        				</div>
        				<form id="billing" class="form-horizontal" method="post" action="#" role="form">
        					<div class="form-group">
        						<label class="col-sm-3 control-label">Nom sur la carte</label>
        						<div class="col-sm-9">
        							<input type="text" class="form-control" placeholder="Votre nom"/>
        							<p class="help-block">Comme apparait sur la carte</p>
        						</div>
        					</div>
        					<div class="form-group">
        						<label class="col-sm-3 control-label">Numero de la carte </label>
        						<div class="col-sm-9">
        							<input type="text" class="form-control" placeholder="••••  ••••  ••••  ••••"/>
        							<p class="help-block">Les 16 chiffres au recto de votre carte de crédit.</p>
        						</div>
        					</div>
        					<div class="form-group">
        						<label class="col-sm-3 control-label">Date d'expiration</label>
        						<div class="col-sm-9 form-inline">
        							<select class="form-control">
        								<option value="01">01</option>
        								<option value="01">02</option>
        								<option value="01">03</option>
        								<option value="01">04</option>
        								<option value="01">05</option>
        								<option value="01">06</option>
        								<option value="01">07</option>
        								<option value="01">09</option>
                                        <option value="01">10</option>
                                        <option value="01">11</option>
                                        <option value="01">12</option>
        							</select>
        							<span class="divider">/</span>
        							<select class="form-control">
        								<option value="01">2021</option>
        								<option value="01">2022</option>
        								<option value="01">2023</option>
        								<option value="01">2024</option>
        								<option value="01">2025</option>
        								<option value="01">2026</option>
        								<option value="01">2027</option>
        								<option value="01">2028</option>
        							</select>
        						</div>
        					</div>
                            <p style={{marginLeft:"13px"}} class="help-block">Date d'expiration de votre carte de crédit</p>

        					<div class="form-group">
        						<label class="col-sm-3 control-label">Code de sécurité</label>
        						<div class="col-sm-9">
        							<input type="text" class="form-control" style={{width:"120px"}} placeholder="CVC"/>
        							<p class="help-block">Les 3 derniers chiffre au recto de votre carte</p>
        						</div>
        					</div>
        					<div class="address">
        						<div class="form-group">
        							<label class="col-sm-3 control-label">Adresse</label>
        							<div class="col-sm-9">
        								<input type="text" class="form-control" placeholder="Adresse"/>
        							</div>
        						</div>
        						<div class="form-group">
        							<div class="col-sm-5 col-sm-offset-3" style={{width:"60%",display:"table",float:"left"}}>
        								<input type="text" class="form-control" placeholder="Ville"/>
        							</div>
        							<div style={{width:"40%",display:"table"}} class="col-sm-4">
        								<input type="text" class="form-control" placeholder="Code postal"/>
        							</div>
        						</div>
        						<div class="form-group">
        							<div class="col-sm-4">
        								<input style={{width:"100%"}} type="text" class="form-control" placeholder="Rue"/>
        							</div>
        						</div>
        					</div>
        					<hr/>
        					<div class="action-wrapper text-center">
        						<h4 class="notes margin-bottom-sm">
								Vous serez facturé <span class="text-stronger">-</span> 
        							</h4>
        						<div class="action-btn">
        							<button id="paiement" class="btn btn-success btn-lg">
                                     Paiement&nbsp;
        								<i class="fa fa-chevron-right"></i>
        							</button>
        						</div>
        					</div>
        				</form>
        			</div>
        		</div>
        	</div>
        </section>
    </div>
</div>
);
};

export default Payement;