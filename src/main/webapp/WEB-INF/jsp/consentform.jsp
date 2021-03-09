<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
    <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@page import="java.util.*"%>

<!DOCTYPE html>
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" type="text/css"
	href="assets/vendors/mdi/css/materialdesignicons.min.css">
<link rel="stylesheet" href="assets/css/easy-autocomplete.min.css">
 
<title>NDHM Health ID </title>
<!-- Layout styles -->
<link rel="stylesheet" href="assets/css/bootstrapnew.min.css">
<link rel="stylesheet" href="assets/css/style.css">
<!-- <link rel="stylesheet" href="assets/css/bootstrapnew.min.css"> -->


<link rel="stylesheet" href="assets/css/customstyle.css">
<link rel="stylesheet" href="assets/css/datatables.jquery.ui.min.css">

 <link rel="stylesheet" href="assets/css/jquery.ui.css">
 <link rel="stylesheet" href="assets/css/responsive.jqueryui.min.css"> 
<script src="assets/js/jquery-3.5.1.js"></script>
 <script src="assets/js/bootstrap.min.js"></script>
 <script src="assets/js/jquery.dataTables.min.js"></script>
	<script src="assets/js/dataTables.jqueryui.min.js"></script>
	<script src="assets/js/dataTables.responsive.min.js"></script>
	 <script src="assets/js/responsive.jqueryui.min.js"></script>

  <script src="assets/datepicker/js/gijgo.min.js"></script>	
	 <link rel="stylesheet" href="assets/datepicker/css/gijgo.min.css"> 
	   
<script src="assets/js/util.js"></script>
<script src="assets/js/validation.js"></script>
</head>

<script>
var fromCurrentdate;
var month = new Array();

month[0] = "01";
month[1] = "02";
month[2] = "03";
month[3] = "04";
month[4] = "05";
month[5] = "06";
month[6] = "07";
month[7] = "08";
month[8] = "09";
month[9] = "10";
month[10] = "11";
month[11] = "12"; //January is 0!
$(document).ready(function() {
	 var today = new Date();
	 var time = today.getHours()+":"+today.getMinutes();
	 console.log(time)
	  var dd = String(today.getDate()).padStart(2, '0');
	  var mm = month[today.getMonth()];
	    var yyyy = today.getFullYear();
	    today = dd + '-' + mm + '-' + yyyy;
	    fromCurrentdate = document.getElementsByName("fromCurrent")[0].value;
	    var consentexpiry = new Date();
	    var consentexpirydate =String(consentexpiry.getDate()+1).padStart(2, '0');
	     consentexpiry = consentexpirydate +'-'+mm+'-'+yyyy +" "+time;
	    
	    var  consenttoday = dd+"-"+mm+"-"+yyyy+" "+time;
	     
	     console.log(consenttoday)
   $('#fromCurrent').datepicker({ modal: true, header: true, footer: true ,format: 'dd-mm-yyyy',maxDate:today,
   	change: function (e) {
   		 fromCurrentdate = document.getElementsByName("fromCurrent")[0].value;
   		 //alert(fromCurrentdate)
   		  $('#toCurrent').datepicker({ modal: true, header: true, footer: true ,format: 'dd-mm-yyyy',maxDate:today,minDate:fromCurrentdate});
   		  $('#toCurrent').val(today);
   	
        }
	    });
  // $('#toCurrent').datepicker({ modal: true, header: true, footer: true ,format: 'dd-mm-yyyy',maxDate:today,minDate:fromCurrentdate});
   $('#consentdate').datetimepicker({ datepicker:{minDate:consenttoday}, modal: true, header: true,footer:true ,format: 'dd-mm-yyyy HH:MM',changeMonth: true,changeYear: true,});
   $('#toCurrent').val(today);
   $('#fromCurrent').val(today);
	$('#consentdate').val(consentexpiry);
});


</script>
<body class="bgc-grey-100">
	<script src="assets/js/patientHealthId.js"></script>
<fieldset>
<legend>
<div class="container-fluid my-0 noUserSelect mx-0 px-0">
<div class="row align-items-center">
<div class="col-9 col-sm-7 col-md-7 col-lg-3 col-lg-4-7 ">
<span class="textFitted" style="display: inline-block; font-size: 20px;">
						<p class="text-nowrap" style="font-weight: 600;    font-size: 21px;">
							<span class="text-primary"><img src="assets/images/dashboard/blood-donor-card.svg" width="35" height="35"></span>
								NDHM Health ID Consent
								<span class="text-primary" id="full" style="cursor: pointer;"><img src="assets/images/dashboard/full-screen.png" id="fullscreen-button" width="35" height="35"></span>
						</p>
					</span>

</div>
<div class="col-3 col-sm-5 col-md-7 col-lg-9 col-lg-9-5 d-flex justify-content-end mb-3">
						<hr class="lineBetween">
						<button type="button" class="btn btn-sm rounded-lg refreshBtn" onclick="location.reload();" id="refresh">
							<img src="assets/images/dashboard/refresh.png" id="refresh" class="imgclass">
						</button>
						</div>

</div>
</div>
</legend>
 <div class="container-fluid my-0 noUserSelect mx-0 px-0"> 

					<div class="content-wrapper">
					 
						<div class="row">
							<div class="col-md-12  collapse show" id="SEARCHID">
								<div class="card cardstylecr"  >

									<div class="card-body">
									<div class="row">
									<div class="col-md-3"></div>
									<div class="col-md-4">
									<div class="row">
									<div class="col-sm-3">
									<p class="pclass text-nowrap" >CR No.<span style="color:red;">*</span> </p>
									</div>
									<div class="col-sm-9">
									<input type ="text" id="crno" name ="crno" minlength="12" style="border-radius: 0px !important;" maxlength="15" placeholder="Please Enter CR Number" autocomplete="on" class="form-control"  onkeypress="return validateNumeric(event)"><br>
									<div id="entercrno" style="display:none">Enter CR Number</div>
									</div>
									</div>
									</div>
									<div class="col-md-3" >
									<button type="button" class="btn btn-primary"  onclick = "submit()" >
								<span class="text-nowrap" style="margin-top: -7px;" > Go <i class="mdi mdi-chevron-double-right" ></i> </span>
							</button>
									</div>
									</div>
									
									</div>
									</div>
									</div>
									 <div class ="col-md-10"></div>
									<div class="col-2 col-md-2">
									<button id="container2ExpandBtn" class="btn btn-sm btn-warning ml-auto"  type="button" onclick="myfunction2()" >
					<i class="mdi mdi-arrow-up-bold-circle "></i>
					
				</button>
									</div>
									<!-- <div class="mx-md-1 mx-md-point5 d-flex justify-content-end border-top-lg border-primary">
									  <div class="panel-heading active" role="tab" id="headingOne">
				 <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne"></a></div>
			</div> -->
									
									</div>
									<div class="row grid-margin data-none" id="CONSENTDIV">
									<div class ="col-md-4" ><h1 id="display"></h1></div>
					<div class="col-md-2">
<button type="button" class="btn btn-consent" onclick="consentRequestModal()" >
								<span class="text-nowrap" style="margin-top: -7px;" >Consent Request</span>
							</button>					</div>
					
					<div class="col-md-2">
<button type="button" class="btn btn-consent" style="background: #ffc107" onclick="ndhmConsentpatdetails()" >
								<span class="text-nowrap" style="margin-top: -7px;" > View Consent Data</span>
							</button>					</div>
							<!-- <div class="col-md-2">
<button type="button" class="btn btn-consent" style="background: #04aeff;" onclick="firpatdetail()" >
								<span class="text-nowrap" style="margin-top: -7px;" >FIR Data</span>
							</button>					</div> -->
							<div class ="col-md-4"></div>
					</div>
					
					<div id="fhir_display" class="card cardstyle grid-margin data-none" >
					<div class="card-body grid-margin" >
					<div class ="row">
					<div class = "col-md-6">
					<h12 id="total_records"></h12>
					</div>
					</div>
					<div id ="record_date"></div>
					</div>
					</div>
					<div id="CONSENTDATA" class="card cardstyle grid-margin data-none" >
					<div class="row">
								<div class="col-md-12">
								<a class="nav-item nav-link active" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="true"><img src="assets/images/dashboard/consent.svg" style="height: 44px;"/>&nbsp;&nbsp;Consent List</a>
								</div></div>
										<div class="card-body">
										<!-- <div class="table-responsive"> -->
									  <table id="DataTable11" class="display responsive nowrap" style="width:100%">
        <thead>
           <tr> 
                                                          <th >Date</th> 
													    <th data-priority="1" width="10%" >NDHM Health ID</th>
														<th data-priority="4"  width="20%">Purpose of Request</th> 
														<th  width="30%"  class="none">Heatlh Info Type</th> 
														<th data-priority="5"  width="10%">Health Info From</th>
														<th data-priority="6" width="10%">Health Info To</th> 
														<th data-priority="7"  width="10%" class="none">Consent Expiry</th> 
														<th data-priority="2"  width="10%">Status</th>  
														<th data-priority="3"  width="10%">View</th>  
												</tr>
        </thead>
        <tbody>
        </tbody>
        </table> 	
       <!-- </div> -->
		
            				</div>
										</div>
										  <div class="modal fade" id="fhirpatdetails">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                          <div class="modal-header" style="    padding: 8px;">
                         <h4 class="modal-title">FHIR Details</h4>
                                <button type="button" class="close" data-dismiss="modal" >&times;</button>
                               
                            </div>
                          <div class="modal-body" style="    padding: 0px;">
                        
										<div class="row">
								<div class="col-md-12">
								<a class="nav-item nav-link active" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="true"><img src="assets/images/dashboard/report.svg" style="height: 44px;"/>&nbsp;&nbsp;Report Details</a>
								</div></div>
								 <table id="DataTable111" class="display responsive nowrap" style="width:100%">
        <thead>
           <tr> 
														<th data-priority="1">Requisition Date</th>
														<th data-priority="5">Lab Name</th>
														<th data-priority="4">Test Name</th>
														<th data-priority="2">Status</th>
														<th data-priority="3">Report</th>
														
												</tr>
        </thead>
        <tbody>
        </tbody>
        </table> 	
									
                          </div>
                          </div>
                          </div>
                          </div>
                          
											
									<div id="PATIENTDETAIL" class="card cardstyle grid-margin data-none" >
										<div class="card-body">
										<div class="row" id="patientdetail">
										<div class="col-md-11">
						                   <h5 id="patientname" class="namedisplay"></h5>
									</div>
										</div>
										<div class="row">
										<div class="col-md-2">
										<div class="row align-items-center no-gutters pb-1">
					
						<p id="patDetails-icon-p" class="col-1 col-md-12 d-flex justify-content-center" style="font-weight: bold; font-size: 26px;margin-bottom:-8px"></p>
						<div id="patDetails-icon-status" class="col-11 col-md-12 d-flex justify-content-center overflow-hidden opdspecial"></div>
						</div>
										</div>
										<div class="col-md-10">
										<div class="row">
										<div class="col-md-2">
										<h12>Gender: <h13 id="patient_gender"></h13></h12>
										</div>
										<div class="col-md-2">
										<h12>Age: <h13 id="patientage"></h13></h12>
										</div>
										<div class="col-md-2">
										<h12>DOB: <h13 id="patient_dob"></h13></h12>
										</div>
										<div class="col-md-3">
										<h12>Patient Status: <h13 id=patient_status></h13></h12>
										</div>
										<div class="col-md-3">
										<h12>Mobile No: <h13 id="patient_mobile_no"></h13></h12>
										</div>
										</div>
										<div class="row">
										<div class="col-md-2">
										<h12>Category: <h13 id="patient_category"></h13></h12>
										</div>
										<div class="col-md-4">
										<h12>Patient NDHM Health ID: <h13 id="patient_health_id"></h13></h12>
										</div>
										<div class="col-md-3">
										<h12>Gurdian Name: <h13 id="patient_guardian"></h13></h12>
										</div>
										<div class="col-md-3">
										<h12>Address: <h13 id="patient_address"></h13></h12>
										</div>
										
										</div>
										</div>
										</div>
									</div>
									</div>
									
								  <div class="modal fade" id="Confirmdata">
                    <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header" style="    padding: 8px;">
                         <h4 class="modal-title"><img src="assets/images/dashboard/for-you.svg" style=" height: 39px;width: 66px;"></h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                               
                            </div>
                          <div class="modal-body" style="    padding: 0px;">
                          <div class ="row">
                          <div class="col-md-4"></div>
                          <div class="col-md-4">
                          <div class="input-group-text-consent" style="color: #2f6dc6c7;">&nbsp;Thank you. </div>
                          </div>
                          <div class="col-md-4"></div>
                          </div>
                          <div class ="row">
                           <div class="col-md-2"></div>
                          <div class="col-md-6">
                          <div class="input-group-text-consent" style="color: #2f6dc6c7;">Your Consent Request has been created Successfully.</div>
                          </div>
                          <div class="col-md-2"></div>
                          </div>
                          </div>
								</div>
								</div>
								</div>
								</div>
								</div>
								<div  class="modal fade" id="mymodal">
								<div class="modal-dialog modal-lg">
                        <div class="modal-content">
<div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>

</div>

  <div class="modal-body">
  <div id="ex1" style="height:500px"></div>
  </div>
 </div>
 </div>
</div>
								  <!-- Button to Open the Modal -->
                <div class="modal fade" id="ModalViewInfo">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">

                            <!-- Modal Header -->
                            <div class="modal-header">
                                <h4 class="modal-title" >Consent Form Request</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                               
                            </div>

                            <!-- Modal body -->
                            <div class="modal-body" >
                              <div class ="row">
                              <div class="col-12">
                              <div align="right">
                              <span class ="text-danger">All the fields are mandatory.</span>
                              </div>
                              </div>
                              </div>
                              <form id="myForm">
                              <div class="row">
                            <div class="col-md-3">
                             <div class="input-group-text-consent">Patient Health ID :</div>
                             </div>
                             <div class="col-md-6">
                             <span class="clearable">
  <input type="text" name="patConsentNdhmHealthId" id="patConsentNdhmHealthId" class ="form-control inputtag inputform" value="" placeholder="">
  <i class="clearable__clear">&times;</i>

</span>
  <label>@sbx</label>
                                                        
                             </div>
								</div>
                           
                            
                             <div class="row">
                             <div class="col-md-3">
										<div class="input-group-text-consent">Purpose of Request :</div>
									</div>
									<div class="col-md-5">
									<select class="form-control  inputtag inputform" tabindex="-1" name="patNdhmPurposeCode" >
                                            <option value ="CAREMGT">Care Management</option>
                                            <option value ="BTG">Break the Glass</option>
                                            <option value ="PUBHLTH">Patient Health</option>
                                            <option value = "HPAYMT">Health Care Payment</option>
                                            <option value ="DSRCH">Disease Specific Healthcare Research</option>
                                            <option value ="PATRQT">Self Requested</option>
                                       </select>
								</div>
                            </div>
                              
                              
                              <div class="row">
                            <div class="col-md-3">
										<div class="input-group-text-consent">Health info from :</div>	
								</div>
								<div class="col-md-5">	
                    <input  name="fromCurrent" id="fromCurrent" data-dateFormat="dd-mm-yyyy" class=" datepicker form-control inputtag inputform " tabindex="1">							
                            </div>
                            </div>
                            <div class="row">
                             <div class="col-md-3">
										<div class="input-group-text-consent">Health info to :</div>	
								</div>
								<div class="col-md-5">	
                           <input name ="toCurrent" id="toCurrent"  style="font-size: 14px;"data-dateFormat="dd-mm-yyyy" class=" datepicker form-control inputtag inputform " tabindex="1">							
                            </div>
                            </div>
                
                               <div class="row">
                           
                            <div class="col-md-3">
										<div class="input-group-text-consent">Health info type :</div>	
								</div>
								<div class="col-md-9">
		<div class="row">
		<div class="col-md-6">
		 <label class="checkbox-inline" style="padding: 0.5rem 0;">
      <input type="checkbox" name="type" value="OPConsultation">&nbsp;OP Consultation
    </label>
		</div>
		
		<div class="col-md-6">
		 <label class="checkbox-inline" style="padding: 0.5rem 0;">
      <input type="checkbox" name="type" value="DiagnosticReport">&nbsp;Diagnostic Report
    </label>
		</div>
		</div>
		<div class="row">
		<div class="col-md-6">
		<label class="checkbox-inline" style="padding: 0.5rem 0;">
     <input type="checkbox" name="type" value="DischargeSummary">&nbsp;Discharge Summary
    </label>
		</div>
		
		<div class="col-md-6">
		<label class="checkbox-inline" style="padding: 0.5rem 0;">
     <input type="checkbox" name="type" value="Prescription">&nbsp;Prescription
    </label>
		</div>
		</div>
		</form>
          </div>
                            
                            </div>
                            
                            <div class="row grid-margin ">
                            <div class="col-md-3">
										<div class="input-group-text-consent">Consent Expiry :</div>	
								</div>
								<div class="col-md-5">	
<input   id="consentdate" name="consentdate" data-dateFormat="dd-mm-yyyy HH:MM" class=" datepicker form-control inputtag inputform " tabindex="1">							
                            </div>
                            </div>
                           
                            </div>
                            <div class ="row grid-margin">
                              <div class="col-12">
                              <div align="center">
                             <button type="button" class="btn btn-consent" onclick="saveConsentData()" id="requestsend" >
								<span class="text-nowrap" style="margin-top: -7px;" > Request Send</span>
							</button>
                              </div>
                              </div>
                              </div>
                            </div>
                            
                        </div>
                    </div>
								 </div>

					
		
								

</fieldset>

<script src="assets/js/popper.min.js"></script>
<script src="assets/js/misc.js"></script>
<script src="assets/js/tippy-bundle.umd.min.js"></script>
<script src="assets/js/tippy.js"></script>
<script>
$(".clearable").each(function() {
	  
	  var $inp = $(this).find("input:text"),
	      $cle = $(this).find(".clearable__clear");

	  $inp.on("input", function(){
	    $cle.toggle(!!this.value);
	  });
	  
	  $cle.on("touchstart click", function(e) {
	    e.preventDefault();
	    $inp.val("").trigger("input");
	  });
	  
	});
</script>


</body>

</html>