<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
    <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@page import="java.util.*"%>

<!DOCTYPE html>

<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet"
	href="assets/vendors/mdi/css/materialdesignicons.min.css">

<link rel="stylesheet" href="assets/css/easy-autocomplete.min.css">

<!-- End layout styles -->
 <!--  <link rel="stylesheet" href="assets/css/jquery.ui.css"> -->
 
<link rel="stylesheet" href="assets/css/bootstrapnew.min.css">
<link rel="stylesheet" href="assets/css/style.css">
<link rel="stylesheet" href="assets/css/customstyle.css">
<link rel="stylesheet" href="assets/css/datatables.jquery.ui.min.css">

<link rel="stylesheet" href="assets/jquery-datatables-checkboxes-1.2.12/css/dataTables.checkboxes.css" >
<!-- <link rel="stylesheet" href="assets/css/fixedColumns.dataTables.min.css">
<link rel="stylesheet" href="assets/css/select.dataTables.min.css"> -->

 <link rel="stylesheet" href="assets/css/jquery.ui.css">
 <link rel="stylesheet" href="assets/css/responsive.jqueryui.min.css"> 
<script src="assets/js/jquery-3.5.1.js"></script>
 <script src="assets/js/bootstrap.min.js"></script>
 <script src="assets/js/jquery.dataTables.min.js"></script>
	<script src="assets/js/dataTables.jqueryui.min.js"></script>
	<script src="assets/js/dataTables.responsive.min.js"></script>
	
	 <script src="assets/js/responsive.jqueryui.min.js"></script>
 
	   
<script src="assets/js/util.js"></script>
<script src="assets/js/validation.js"></script>
<!-- Layout styles -->
<link rel="stylesheet" href="assets/vendors/themify/themify-icons.css">
<title>NDHM Health ID </title>
 <script src="assets/js/jquery-3.5.1.js"></script> 
 <script src="assets/js/bootstrap.min.js"></script>
 
 <script src="assets/js/jquery.dataTables.min.js"></script>
	<script src="assets/js/dataTables.jqueryui.min.js"></script>
	<script src="assets/js/dataTables.responsive.min.js"></script>
	
<script  src="assets/jquery-datatables-checkboxes-1.2.12/js/dataTables.checkboxes.min.js"></script>
<!-- 	<script src="assets/js/dataTables.select.min.js"></script>
	<script src="assets/js/dataTables.fixedColumns.min.js"></script> -->
	 <script src="assets/js/responsive.jqueryui.min.js"></script>  
	  <script src="assets/datepicker/js/gijgo.min.js"></script>	
	 <link rel="stylesheet" href="assets/datepicker/css/gijgo.min.css"> 
<script src="assets/js/util.js"></script>
<script src="assets/js/validation.js"></script>

</head>

<style>
.nav-tabs {
    border-bottom: 1px solid #12B796;
    border-bottom-width: 1px;
    border-bottom-style: solid;
}

.nav-tabs .nav-link {
    border-bottom-color:  #12B796;
    border-bottom-style: solid;
    border-bottom-width: 1px;
}

.nav-tabs .nav-link:hover {
 border: 1px solid #12B796;
}

.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
    color: #12B796;
    background-color: #fff;
}

.nav-tabs .nav-link.active {
    border: 1px solid #12B796;
    border-bottom: 1px solid transparent;
}

 #datalist{
    color: #007bff !important;
    text-decoration: none;
    background-color: transparent;
    cursor:pointer
} 
 #datalistlinkedepisodes{
    color: #007bff !important;
    text-decoration: none;
    background-color: transparent;
    cursor:pointer
} 

table.dataTable tr th.select-checkbox.selected::after {
    content: "";
    margin-top: -11px;
    margin-left: -4px;
    text-align: center;
    text-shadow: rgb(176, 190, 217) 1px 1px, rgb(176, 190, 217) -1px -1px, rgb(176, 190, 217) 1px -1px, rgb(176, 190, 217) -1px 1px;
}

table.dataTable.display tbody>tr.odd.selected>.sorting_1, table.dataTable.order-column.stripe tbody>tr.odd.selected>.sorting_1 {
    background-color: #a6b4cd8c;
}
table.dataTable.stripe tbody>tr.odd.selected, table.dataTable.stripe tbody>tr.odd>.selected, table.dataTable.display tbody>tr.odd.selected, table.dataTable.display tbody>tr.odd>.selected {
    background-color: #e1e6f1;
}


</style>

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
								NDHM Health ID Linkage 
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
					
						<div class="row grid-margin">
						
							<div class="col-md-12 collapse show" id="SEARCHID">
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
									<form></form>
									<input type ="text" id="crno" name ="crno" minlength="12" maxlength="15" placeholder="Please Enter CR Number" autocomplete="on" class="form-control"  onkeypress="return validateNumeric(event)"><br>
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
									 <div class ="col-md-10">
									<div align="center" class="d-none" id="episodeCount">
									<a class="nav-item nav-link active" id="datalist" onclick="healthrecordmodal()" ></a>
									<a class="nav-item nav-link active" id="datalistlinkedepisodes" onclick="navigate_event()" ></a>
									</div>
									</div> 
									<div class="col-2 col-md-2">
									<button id="container2ExpandBtn" class="btn btn-sm btn-warning ml-auto"  type="button" onclick="myfunction2()" >
					<i class="mdi mdi-arrow-up-bold-circle "></i>
					
				</button>
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
						<div id="patDetails-icon-status" class="col-11 col-md-12 d-flex justify-content-center overflow-hidden"></div>
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
										<h12>NDHM Health ID: <h13 id="patient_health_id"></h13></h12>
										</div>
										<div class="col-md-3">
										<h12>Gurdian Name: <h13 id="patient_guardian"></h13></h12>
										</div>
										<div class="col-md-3">
										<h12>Address: <h13 id="patient_address"></h13></h12>
										</div>
			<input type="text" name="patConsentNdhmHealthId" style="display:none" id="patConsentNdhmHealthId" class ="form-control inputtag inputform" value="" placeholder="">
										
										</div>
										</div>
										</div>
									</div>
									
			
										</div>
										
								<div id="patienthealth" class="card cardstyle grid-margin data-none" >
								<div class="row">
								<div class="col-md-6">
								<a class="nav-item nav-link active" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="true"> NDHM Health Data</a>
								</div>
								 <div class="col-md-6">
								
								</div> 
								</div>
								<div class="row align-items-center">
								<div class="col-md-4">
								<div class="input-group d-flex flex-nowrap">
									<div class="input-group-prepend">
										<div class="input-group-text">NDHM Health ID</div>
									</div>
									<input type="text" class="form-control inputtag" id="patNdhmHealthId" name ="patNdhmHealthId" placeholder="Enter Health ID" maxlength="" minlength="8" value="">
								<i class="mdi mdi-account-edit" onclick="editpatHealthid()" style="cursor:pointer"></i>
								</div>
								</div>
								 <div class="col-md-2">
			
									<button type="button" class="btn btn-primary data-none" id="VERIFYHEALTHID"  onclick = "verifyhealthid()" >
								<span class="text-nowrap" style="margin-top: -7px;" >Verify <i class="mdi mdi-chevron-double-right" ></i> </span>
							</button>
							<img src="assets/images/dashboard/check.svg" style="height: 45px;margin-top: -11px;"class ="data-none" id="VERIMAGE"/>
							<br><span class="text-nowrap data-none"  style="color:#FF0000;"id="INVALIDDATA">Invalid Health Id </span>
							</div> 
							
								<div class="col-md-3 data-none" id="VERIFYDATA">
								<div class="input-group d-flex flex-nowrap">
									<div class="input-group-prepend">
										<div class="input-group-text">KYC and Link By </div>
									</div>
									<select class="form-control inputtag" tabindex="-1" name="verifydata" id="selectauthMode"  >
                                          </select>
									<!-- <input type="text" class="form-control inputtag"  maxlength="" minlength="8" value="Mobile OTP" readonly> -->
								</div>
								</div>
								<div class="col-md-1 data-none" id="VERIFYDATABTN">
									<button type="button" class="btn btn-primary" id="OTPBUTTON"  onclick = "getOTP()" >
								<span class="text-nowrap" style="margin-top: -7px;" > Go <i class="mdi mdi-chevron-double-right" ></i> </span>
							</button>
									</div>
									<div class ="col-md-2 data-none" id="CONSENTCHECK">
									<a onclick="consentRequestModal()" style="    text-decoration: underline; cursor:pointer;color:#007bff!important">
								<span class="text-nowrap"  >Click Here To Add Your Consent Request</span>
							</a>
									</div>
									<div class="col-md-2 data-none" id="VERIFYCHECK" >
									<input type="checkbox" name="type" id="iskyc" style="margin-top: 6px; display:none;">&nbsp;&nbsp;<span class="text-nowrap"  style="color:#1f73c7!important;font-weight: 600 ;display:none;">Only KYC</span>
									</div> 

								</div>
								<div class="row align-items-center"  >
								<div class="col-md-10 data-none" id="VERIFYONLY" style="    margin-bottom: 6px;">
								<button type="button" class="btn btn-primary"  onclick = "isVerifyonly()" >
								<span class="text-nowrap" style="margin-top: -5px;" >Save Details<i class="mdi mdi-chevron-double-right" ></i> </span>
							</button>
								</div>
																	
                        <input type="text"  style="opacity: 0;" class="data-done" id="qrInputElm" placeholder="" maxlength="" minlength="" value=""/>
								</div>
								<div class="row align-items-center data-none" id="qrScanElemntdiv">
								<div class="col-md-3">
								<h12>Name: <h13 id="patNameInput"></h13></h12>
								</div>
								<div class="col-md-2">
										<h12>Gender: <h13 id="patGenderInput"></h13></h12>
										</div>
								<div class="col-md-2">
										<h12>DOB: <h13 id="patDobInput"></h13></h12>
										</div>	
										<div class="col-md-3">
										<h12>Address: <h13 id="patAddressInput"></h13></h12>
										</div>				
								</div>
								<div class="row data-none" id="ERRORMESSAGE">
								<p class="col-12 d-flex errorclass" align="center">Something Went Wrong .Please try later!!</p>
								</div>
								<div class="data-none" id="MOBILEOTP">
								<div class="row align-items-center" >
								<div class="col-md-4">
								<div class="input-group d-flex flex-nowrap">
									<div class="input-group-prepend">
										<div class="input-group-text">OTP</div>
									</div>
									
									<input type="text" class="form-control inputtag"  id="mobileOtp" name="mobileOtp" placeholder="Enter OTP "maxlength="6" minlength="6" value="" onkeypress="return validateNumeric(event)">
								</div>
								</div>
								<div class="col-md-3" >
									<button type="button" class="btn btn-primary"  onclick = "getHealthDetail()" >
								<span class="text-nowrap" style="margin-top: -7px;" > Go <i class="mdi mdi-chevron-double-right" ></i> </span>
							</button>
									</div>
								</div>
								</div>
								<div class="row data-none" id="ERRORMESSAGEOTP">
								<p class="col-12 d-flex errorclass" align="center">Something Went Wrong .Please try later!!</p>
								</div>
								<div class="row data-none" id="ERRORMESSAGEDEMO">
								<p class="col-12 d-flex errorclass" align="center">Demographics details mismatched with NDHM Health Id.</p>
								</div>
								</div>
								
								<div id="linkedEpisodesList" class="card cardstyle grid-margin data-none">
								<div class="row align-items-center">
								<div class="col-md-12">
								<a class="nav-item nav-link active namedisplay" > Linked Episodes</a>
								</div>
								</div>
									<div class="row align-items-center">
								<div class="col-md-12">
								<h13 id="linkeddata"></h13>
								</div>
								</div>
								</div>
								<div id="NHDMHEALTHDETAIL" class="card cardstyle grid-margin data-none" >
								<div class="row align-items-center">
								<div class="col-md-12">
								<a class="nav-item nav-link active namedisplay" > Your Health ID Validated Successfully.</a>
								</div>
								</div>
										<div class="row align-items-center data-none" >
										<div class="col-md-11">
										<a class="nav-item nav-link active"  data-toggle="tab" href="#nav-profile" 
										role="tab" aria-controls="nav-profile" aria-selected="true" id="ndhm_health_id"></a>
									</div>
										</div>
								<div class="row align-items-center grid-margin data-none">
								<div class="col-md-1">
										<div class="row align-items-center no-gutters pb-1">
					
						<p id="patNdhm-icon-p" class="col-1 col-md-12 d-flex justify-content-center" style="font-weight: bold; font-size: 26px;margin-bottom:-8px;margin-left:10px"></p>
						</div>
										</div>
										
						<div class ="col-md-11">
						<div class="row">
						<div class="col-md-3">
										<h12>Patient Name: <h13 id="ndhm_name"></h13></h12>
										</div>
										<div class="col-md-3">
										<h12>Date of Birth: <h13 id="ndhm_dob"></h13></h12>
										</div>
										<div class="col-md-3">
										<h12>Gender: <h13 id="ndhm_gender"></h13></h12>
										</div>
										<div class="col-md-3">
										<h12>Mobile No: <h13 id="ndhm_mobile_no"></h13></h12>
										</div>
										
										</div>
										
										<div class="row">
										<div class="col-md-6">
										<h12>Patient Address: <h13 id="ndhm_address"></h13></h12>
										</div>
										<!-- div class="col-md-3">
										<h12>NDHM Health ID: <h13 id="ndhm_health_id"></h13></h12>
										</div> -->
										<!-- <div class="col-md-4">
										<h12>NDHM Heatlh ID Code: <h13 id="ndhm_health_id_code"></h13></h12>
										</div> -->
										
										</div>
										
						</div>
								</div>
								<div class ="row align-items-center grid-margin " id="linkageconsent">
								<div class="col-md-12 data-none">
<!-- 										 <span class="text-nowrap"  style="color:#007bff !important;font-weight: 600">Do You Want To Add .</span>&nbsp;&nbsp;
 -->										<a onclick="consentRequestModal()" style="    text-decoration: underline; cursor:pointer;color:#007bff!important">
								<span class="text-nowrap"  >Click Here To Add Your Consent Request</span>
							</a>
										</div>
								<div class="col-md-12">
										 <input type="checkbox" name="type" id="linkid" style="margin-top: 6px;">&nbsp;&nbsp;<span class="text-nowrap"  style="color:#1f73c7!important;font-weight: 600">Do You Want To Link  Health Record With Your Health Id.</span>
										</div>
										</div>
								<div class="row ">
								<div class ="col-md-12">
								<div align="center" class="grid-margin">
							 <button type="button" class="btn btn-primary"  onclick="confirmdata()" >
								<span class="text-nowrap" style="margin-top: -7px;" > Confirm</span>
							</button>
								</div>
								</div>
								</div>
								
 
                </div>
					
							  <div class="modal fade" id="healthIdRecord">
                    <div class="modal-dialog modal-lg modal-width">
                        <div class="modal-content">
                          <div class="modal-header" style="    padding: 8px;">
                         <h4 class="modal-title">Health Records</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                               
                            </div>
                          <div class="modal-body" style="    padding: 0px;">
                         <div id="app1" class="mx-md-1 mx-md-point5 p-2 rounded-lg bg-white ">
  <div class="tabs" id="__BVID__4"><!---->
  <ul class="nav nav-tabs" role="tablist">
   <li class="nav-item">
      <a class="nav-link active" data-toggle="tab" href="#opd_data" id="OPD"><img src="assets/images/dashboard/consultation.svg" class="imgclass">&nbsp;OPD Records&nbsp;</a>
    </li>
    <li class="nav-item">
      <a class="nav-link " data-toggle="tab" href="#ipd_data" id="IPD"><img src="assets/images/dashboard/ipd.svg" class="imgclass">&nbsp;IPD Records&nbsp;</a>
    </li>
  </ul>
  
  <div class="tab-content">
  <div id="opd_data" class=" tab-pane active"><br>
<!--          <h4 class="card-title-opd"><img src="assets/images/dashboard/consultation.svg" class="imgclass">&nbsp; OPD Record </h4>

 -->  
   <table id="DataTableopdEpisode" class="display responsive nowrap" style="width:100%">
        <thead>
           <tr> 
                                                   <th><div align="center"></div></th>
                                                         <th>Visit Date</th> 
                                                         <th>Department (Unit)</th>
                                                         <th data-priority="3">Status</th>
													    <th data-priority="2">Clinical Reports</th>
<!-- 													    <th>IsLinked</th>
 -->												</tr>
        </thead>
        <tbody>
        </tbody>
        </table>
        
         
        </div>
    <div id="ipd_data" class=" tab-pane fade"><br>
<!--     <h4 class="card-title-ipd"><img src="assets/images/dashboard/hospitalisation.svg" class="imgclass">&nbsp; IPD Record</h4>
 -->    <table id="DataTableipdEpisode" class="display responsive nowrap" style="width:100%">
        <thead>
           <tr> 
                                                        <th><div align="center"></div></th>
                                                        
                                                          <th>Admission Date</th>
                                                          <th data-priority="1">Department (Unit)</th>
                                                          <th data-priority="3">Status</th>
													     <th data-priority="4">Discharge Date</th> 
													    <th data-priority="2">Discharge Summary</th>  
													    
												</tr>
        </thead>
        <tbody>
        </tbody>
        </table>
           
        </div>
         
        </div>
  </div>
  </div>
  
                          </div>
                  
                   <div class="modal-footer">  
                   <div class = "col-md-12">     
               <div align="center">
            <button type="button" class="btn btn-primary" id="linked_data" onclick="saveunlinkedData()">Save</button>
           </div>
           </div>
           </div>
    </div>
								</div>
								</div>
								</div>
								
								<!-- for Report pdf view -->
								<div  class="modal fade" id="reportpdfModal">
								<div class="modal-dialog modal-lg modal-width1">
                        <div class="modal-content">
<div class="modal-header">
<h4 class="modal-title"></h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>

</div>

  <div class="modal-body">
  <div id="reportpdf" style="height:500px"></div>
  </div>
 </div>
 </div>
</div>
								  <div class="modal fade" id="Confirmdata">
                    <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header" style="    padding: 8px;">
                         <h4 class="modal-title"><img src="assets/images/dashboard/for-you.svg" style=" height: 39px;width: 66px;"></h4>
                                <button type="button" class="close" data-dismiss="modal" onclick="location.reload();">&times;</button>
                               
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
                          <div class="input-group-text-consent" style="color: #2f6dc6c7;">Your details has been saved Successfully.</div>
                          </div>
                          <div class="col-md-2"></div>
                          </div>
                          </div>
								</div>
								</div>
								</div>
								
									  <div class="modal fade" id="DataError">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                          <div class="modal-header" style="    padding: 8px;">
                         <h4 class="modal-title"><img src="assets/images/dashboard/warning.svg" style=" height: 39px;width: 66px;"></h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                               
                            </div>
                          <div class="modal-body" style="padding: 0px;">
                          <div class ="row">
                          <div class="col-md-12">
                          <div class="input-group-text-consent" style="color: #FF0000;">&nbsp;Data Cannot be Saved. NDHM Health ID Details doesn't match with Patient Demographic Details. </div>
                          </div>
                          </div>
                          
                          <div class ="row">
                          <div class="col-md-4"></div>
                          <div class="col-md-4">
                          <div class="input-group-text-consent" style="color: #FF0000;">&nbsp;Please Provide Valid Health ID. </div>
                          </div>
                          <div class="col-md-4"></div>
                          </div>
                          </div>
								</div>
								</div>
								</div>
								
								
							<!-- 	For Consent Request -->
							
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
  <i class="clearable__clear">&times;</i></span><label>@sbx</label>
                                                        
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
		
								

</fieldset>
    <%--     <html:hidden property="status" name="patientformFB"/>
		<html:hidden property ="transactionId" name ="patientformFB"/> --%>
<script src="assets/js/popper.min.js"></script>
<script src="assets/js/misc.js"></script>
<script src="assets/js/tippy-bundle.umd.min.js"></script>
<script src="assets/js/tippy.js"></script>


</body>

</html>