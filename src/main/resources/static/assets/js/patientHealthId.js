$('#ModalViewInfo').modal({backdrop: 'static', keyboard: false, show: true});
var transactionID;
var crno;
var patNdhmHealthId
var hospitalcode;
var isverified;
var isconsentLinkId;
var isKyc;
var tmpData =[];
var reportfile = {};
function validateNumeric(e)
{
	var key;
	var keychar;
	if (window.event)
	   key = window.event.keyCode;
	else if (e)
	   key = e.which;
	else
	   return true;
	keychar = String.fromCharCode(key);
	keychar = keychar.toLowerCase();

	// control keys
	if ((key==null) || (key==0) || (key==8) ||
		(key==9) || (key==13) || (key==27) )
	   return true;

	if (key == 13)
       return submit();
    
	// numbers
	else if ((("0123456789").indexOf(keychar) > -1))
	   return true;
	else
	   return false;
}


function submit(){
	
	 crno = document.getElementsByName('crno')[0].value;
	 hospitalcode = crno.slice(0,5);
	if(crno.length < 12){
      alert("Crno cannot be less than 12 digits.");
		}
	else{
	$(".content-wrapper").prepend('<div id="preloader" class="loading"></div>');
	$.ajax({
		
		
		async:"true",
		url : "ndhm-linkage/patient-demographics", 
		type:"POST",
		dataType: 'json',
		 data : {
			 crNo: crno,
			 hospitalCode: hospitalcode,
			 searchType:1
		 },
				
		 success: function(response) {
			 $("#preloader").remove();
			 console.log(response)
			//var a = JSON.parse(response)
			
			 var a = response
		    	var patient_detail = a.patDetails[0];
		    		patient_name= patient_detail.patientName;
		    		patient_age = patient_detail.patAge;
		    		patient_gender = patient_detail.patGender;
		    		patient_dob = patient_detail.patDOB;
		    		patient_mobile_no = patient_detail.patMobileNo;
		    		patient_address = patient_detail.patAddress;
		    		patient_category = patient_detail.patCategory;
		    		patient_status = patient_detail.patStatus;
		    		patient_crnumber =patient_detail.patHospitalHealthId;
		    		patient_health_id = patient_detail.patNdhmHealthId;
		    		patient_guardian=patient_detail.patGuardianName;
			    	
		    	document.getElementById("patientname").innerHTML = patient_name +'<h12 style="float:right">CR No: <h13 id="patient_crnumber"></h13></h12>';
		    	document.getElementById("patientage").innerHTML = patient_age;
		    	document.getElementById("patient_gender").innerHTML = patient_gender;
		    	document.getElementById("patient_dob").innerHTML = patient_dob;
		    	document.getElementById("patient_mobile_no").innerHTML = patient_mobile_no;
		    	document.getElementById("patient_crnumber").innerHTML = patient_crnumber;
		    	var ConsentNdhmHealthId  = patient_health_id.split("@")[0];
		    	patndhmdob= patient_dob.split("-")[2];
		    	var age = patient_age.split(" ")[0];
		    	document.getElementById("patConsentNdhmHealthId").value = ConsentNdhmHealthId;
		    	if(patient_address=="")
			    	{
		    		document.getElementById("patient_address").innerHTML = "N.A.";
			    	}
		    	else{
		    	document.getElementById("patient_address").innerHTML = patient_address;
		    	}
		       document.getElementById("patient_category").innerHTML = patient_category;
		       if(patient_guardian==""){
		    	   document.getElementById("patient_guardian").innerHTML = "N.A";
			       }
		       else{
		    	   document.getElementById("patient_guardian").innerHTML = patient_guardian;
			       }
		       if(patient_health_id==""){
		    	   document.getElementById("patient_health_id").innerHTML = "N.A";
			       }
		       else{
		    	   document.getElementById("patient_health_id").innerHTML = patient_health_id;
			       }
		    	document.getElementById("patient_status").innerHTML = patient_status; 
		    	if(patient_gender=="Male"){
		    		
			    if(age < 12){
			    	 document.getElementById("patDetails-icon-p").innerHTML='<i class="mdi mdi-baby" id="patDetails-icon-m" style="color: #007BFF; font-size: 40px;"></i>';
			    }
			    else {
			    	 document.getElementById("patDetails-icon-p").innerHTML='<i class="mdi mdi-human-male" id="patDetails-icon-m" style="color: #007BFF; font-size: 40px;"></i>';
			    }
			    	}
		    	else if(patient_gender=="Female")
			    	{
			      if(age < 12 ){
				    	 document.getElementById("patDetails-icon-p").innerHTML='<i class="mdi mdi-baby" id="patDetails-icon-m" style="color: #E83E8C; font-size: 40px;"></i>';
				    }
			      else {
			    	  document.getElementById("patDetails-icon-p").innerHTML='<i class="mdi mdi-human-female" id="patDetails-icon-m" style="color: #E83E8C;; font-size: 40px;"></i>';

			      }
			    				    	 
			    	}
		    	else {
		    		document.getElementById("patDetails-icon-p").innerHTML='<span class="patientDetail" id="patDetails-icon-t"><img height="35" width="35" src="assets/images/dashboard/transgender.svg"></span>';
			    	}
		    	if(patient_status=="Emergency OPD"){
		    		document.getElementById("patDetails-icon-status").innerHTML = '<span class="patStatusSpan emgcOpdSpan">EMERGENCY OPD</span>';
			    	}
		    	else if (patient_status=="SPECIAL OPD"){
		    		document.getElementById("patDetails-icon-status").innerHTML = '<span class="patStatusSpan spclOpdSpan ">SPECIAL OPD</span>';
			    	}
		    	else {
		    		document.getElementById("patDetails-icon-status").innerHTML = '<span class="patStatusSpan opdSpan" >'+patient_status+'</span>';
			    	}
		    	
		    	$("#PATIENTDETAIL").removeClass("data-none");
		    	$('#patienthealth').removeClass("data-none");
		    	$('#CONSENTDIV').removeClass("data-none");
		    	$('#CONSENTDATA').addClass("data-none");
		    	$('#ERRORMESSAGEOTP').addClass("data-none");
		    	$('#ERRORMESSAGE').addClass("data-none");
				$('#ERRORMESSAGEDEMO').addClass("data-none");
				$('#NHDMHEALTHDETAIL').addClass("data-none")
				$('#MOBILEOTP').addClass("data-none");
				$('#fhir_display').addClass("data-none");
		    	
				/*$('#episodeCount').removeClass("data-none");
	    		viewLinkedEpisodeList();*/
		    	if(patient_health_id==""||patient_health_id==null || patient_health_id=="-"){
		    		//document.getElementById("patNdhmHealthId").readOnly = false;
		    		$('#AUTHMODE').addClass("data-none");
		    		$('#VERIFYHEALTHID').removeClass("data-none");
		    		
		    		
		    	}
		    	else {
		    		document.getElementById("patNdhmHealthId").value=patient_health_id;
		    		document.getElementById("patNdhmHealthId").readOnly = true;
		    		$('#AUTHMODE').removeClass("data-none");
		    		$('#VERIFYHEALTHID').addClass("data-none");
		    		verifyhealthid();
		    		

		    		
		    	}
		 },
		    	 error: function(e){
		    		 $("#preloader").remove();
		            alert('Error: ' + e);
		         }
	         

});
}
	}
	
	/*$(function() {
        $("#SEARCHID").on('show.bs.collapse hidden.bs.collapse', function() {
            $("#AddDId").find('.mdi').toggleClass('mdi-arrow-up-bold-circle mdi-arrow-down-bold-circle');
        });
	});*/

	
	function getOTP(){
		$('#VERIFYONLY').addClass("data-none");
	 patNdhmHealthId = document.getElementsByName("patNdhmHealthId")[0].value;
	 hospitalcode = crno.slice(0,5);
	 if( document.getElementById("iskyc").checked == true){
		    isKyc = "1";
		    $('#linkageconsent').addClass("data-none");
		    }
		    else {
		    	 isKyc = "0";
		    }
	 console.log(isKyc +"-------"+isverified)
	 authenticationMode = document.getElementsByName("verifydata")[0].value;
	if(document.getElementsByName("patNdhmHealthId")[0].value==""){
		alert("Please Enter Health Id");
	}
	else {
		$(".content-wrapper").prepend('<div id="preloader" class="loading"></div>');
		$.ajax({
			type:"POST",
			aysnc:true,
			url : "ndhm-linkage/on-init1",
			dataType:"json",
			data: {
				patNdhmHealthId:patNdhmHealthId,
				hospitalcode:hospitalcode,
				authenticationMode:authenticationMode,
				patHospitalHealthId:crno,
				ndhmHealthIDCode: ndhmHealthIDCode,
				isKyc:isKyc,
				isVerified:isverified
			},
				
			 success: function(response){
				 $("#preloader").remove();
				// var responses = JSON.parse(response);
				 var responses = response;
				 console.log(responses)
				 if(responses.status=="1"){
					
					 transactionID = responses.transactionId;
					 document.getElementById("patNdhmHealthId").readOnly = true;
					 if(authenticationMode=="DEMOGRAPHICS"){
						 $('#MOBILEOTP').addClass("data-none");
						 getHealthDetail();
					 }
					 else if(authenticationMode!="DEMOGRAPHICS") {
						 $('#MOBILEOTP').removeClass("data-none");
						 
					 }
				 }
				 else {
					 $("#preloader").remove();
					 $('#ERRORMESSAGE').removeClass("data-none");
				 }
			 },
			 error: function(e){
				 $("#preloader").remove();
		            alert('Error: ' + e);
		         }
		});
	}
	
	}
	
	function getHealthDetail(){
		var otp= document.getElementsByName("mobileOtp")[0].value;
					if(authenticationMode=="MOBILE_OTP"&&document.getElementsByName("mobileOtp")[0].value==""){
						alert("Please Enter OTP");	
						}	
			
		else{
			$(".content-wrapper").prepend('<div id="preloader" class="loading"></div>');
			if(patient_gender=="Female"){
				demo_patient_gender="F"
			}
			else if(patient_gender=="Male"){
				demo_patient_gender="M"
			}
			else {
				demo_patient_gender="O"
			}
			var url1;
			if(authenticationMode=="DEMOGRAPHICS"){
				patientData =  {
					patNdhmHealthId:patNdhmHealthId,
					hospitalcode:hospitalcode,
					authenticationMode:authenticationMode,
					transactionId:transactionID,
					patHospitalHealthId:crno,
					ndhmHealthIDCode:ndhmHealthIDCode,
					patName: patient_name,
					patGender:demo_patient_gender,
					patDob:patient_dob,
					patAddress:patient_address,
				}
				
			//	url1 = ""&patNdhmHealthId="+patNdhmHealthId+'&patNdhmHealthId='+hospitalcode+'&authenticationMode='+authenticationMode+'&transactionId='+transactionID+'&patHospitalHealthId='+crno+'&ndhmHealthIDCode='+ndhmHealthIDCode+"&patName="+patient_name+'&patGender='+demo_patient_gender+'&patDob='+patient_dob+'&patAddress='+patient_address);
				} 
			else {
				patientData =  {
						patNdhmHealthId:patNdhmHealthId,
						hospitalcode:hospitalcode,
						authenticationMode:authenticationMode,
						transactionId:transactionID,
						patHospitalHealthId:crno,
						ndhmHealthIDCode:ndhmHealthIDCode,
						otp:otp
					}
					
				//url1 = createFHashAjaxQuery("/ndhmConnect/patientOverviewAction.cnt?hmode=OTP&patNdhmHealthId="+patNdhmHealthId+'&hospitalcode='+hospitalcode+'&authenticationMode='+authenticationMode+'&otp='+otp+'&transactionId='+transactionID+'&patHospitalHealthId='+crno+'&ndhmHealthIDCode='+ndhmHealthIDCode);
			}
			$.ajax({
				type:"POST",
				url : "ndhm-linkage/on-confirm",
				dataType:"json",
				data: patientData ,
				 success: function(response){		
					 var data = response;
				//	var data = JSON.parse(response);
					console.log("data---------------",data)
					if(data.status=="1"){
						 document.getElementById("mobileOtp").readOnly = true;
					ndhm_name= data.patName;
					ndhm_dob = data.patDob;
					ndhm_mobile_no = data.mobileno;
					//"ndhm_health_id = data.ndhmHealthIDCode;
					ndhm_address = data.patAddress;
					ndhm_health_id_code = data.ndhmHealthIDCode;
					ndhm_hospital_id_code = data.patHospitalHealthId;
					ndhm_gender = data.patGender;
					ndhm_accesstoken = data.accessToken;
					if(ndhm_gender=="M"){
					    document.getElementById("patNdhm-icon-p").innerHTML='<i class="mdi mdi-human-male" id="patDetails-icon-m" style="color: #007BFF; font-size: 40px;"></i>';
					    document.getElementById("ndhm_gender").innerHTML ="Male";
					    ndhmpat_gender = "Male";
					}
				    	else if(ndhm_gender=="F")
					    	{
					    	document.getElementById("patNdhm-icon-p").innerHTML='<i class="mdi mdi-human-female" id="patDetails-icon-m" style="color: #E83E8C;; font-size: 40px;"></i>';
					    	  document.getElementById("ndhm_gender").innerHTML ="Female";
					    	  ndhmpat_gender = "Female";
					    	}
				    	else {
				    		document.getElementById("patNdhm-icon-p").innerHTML='<span class="patientDetail" id="patDetails-icon-t"><img height="35" width="35" src="assets/images/dashboard/transgender.svg"></span>';
				    		  document.getElementById("ndhm_gender").innerHTML ="Others";
				    		  ndhmpat_gender = "Others";
				    	}
					 $("#preloader").remove();
		    	document.getElementById("ndhm_name").innerHTML = ndhm_name ;
		    	document.getElementById("ndhm_dob").innerHTML = ndhm_dob;
		    	document.getElementById("ndhm_mobile_no").innerHTML = ndhm_mobile_no;
		    	document.getElementById("ndhm_health_id").innerHTML = "<span style='color:#96b9df'>Patient Hospital Health ID :</span> "+ndhm_hospital_id_code;
		    	document.getElementById("ndhm_address").innerHTML = ndhm_address;
		    	 
		    	 //document.getElementById("ndhm_health_id_code").innerHTML = ndhm_health_id_code;
		    	//document.getElementById("ndhm_gender").innerHTML =ndhm_gender;
		       //document.getElementById("ndhm_hospital_id_code").innerHTML = ndhm_hospital_id_code;
						 $('#ERRORMESSAGEOTP').addClass("data-none");
						 $('#ERRORMESSAGEDEMO').addClass("data-none");
						 $('#NHDMHEALTHDETAIL').removeClass("data-none");
						// $('#CONSENTCHECK').removeClass("data-none");
						
					}
					else if(data.status=="2")
						{
						$("#preloader").remove();
						$('#ERRORMESSAGEDEMO').removeClass("data-none");
						}
					 else {
						 $("#preloader").remove();
						 $('#ERRORMESSAGEOTP').removeClass("data-none");
					 }
				 },
				 error: function(e){
					 $("#preloader").remove();
			            alert('Error: ' + e);
			         }
		
			});
		}
		
	}
	
	function confirmdata(){
		
	       var consentLinkId;
		if( ndhmpat_gender===patient_gender && (ndhm_dob==patndhmdob || ndhm_dob>=patndhmdob+2 ||ndhm_dob>=patndhmdob-2)){
	    if( document.getElementById("linkid").checked == true){
	    isconsentLinkId = "1";
	    }
	    else {
	    	 isconsentLinkId = "0";
	    }
	    if( document.getElementById("iskyc").checked == true){
		    isKyc = "1";
		    }
		    else {
		    	 isKyc = "0";
		    }
	    /*if(tmpData.length <= 0){
	    	
	    	alert("Please Link atleast one episode.")
	    }
	    else{*/
	    	$(".content-wrapper").prepend('<div id="preloader" class="loading"></div>');
	    console.log(  tmpData)
		$.ajax({
			async:true,
			url : "ndhm-linkage/save-ndhmpat",
			type:"POST",
			dataType:"json",
			data:
			{
				accessToken: ndhm_accesstoken,
				hospitalName: "",
				patNdhmHealthId: patNdhmHealthId,
				patHospitalHealthId: crno,
				patNdhmHealthCode :ndhmHealthIDCode,
				patName: ndhm_name, 
		        patGender:ndhm_gender,
		        patYearOfBirth:ndhm_dob,
		        patAddress: ndhm_address,
		        patAuthMode:authenticationMode,
		        crpatname:patient_name,
		        isKyc: isKyc,
		        isVerified: isverified,
				hospitalcode: hospitalcode,
				datePatDob:'',
				consentLinkId:isconsentLinkId,
				
				
	 },     
			
			success: function(response){					
				  $("#preloader").remove();
				//  var responses = JSON.parse(response);
				  var responses = response;
				  if(responses.isSuccess=="1" || responses.length==0){
				 // $('#Confirmdata').modal('show');
				  $('#Confirmdata').modal({backdrop: 'static', keyboard: false, show: true});
				  }
				  else if (responses.success=="1")
					  {
					  $('#DataError').modal({backdrop: 'static', keyboard: false, show: true});
					  document.getElementById("patNdhmHealthId").readOnly = false;
					  document.getElementById("mobileOtp").readOnly = false;
					  $('#MOBILEOTP').addClass("data-none");
					  $('#NHDMHEALTHDETAIL').addClass("data-none");
					  document.getElementsByName("mobileOtp")[0].value = "";
					  }
			 },
			 error: function(e){
				 $("#preloader").remove();
		            alert('Error: ' + e);
		         }
	
		});
		}
		/*}*/
		else {
			 $("#preloader").remove();
			 $('#DataError').modal({backdrop: 'static', keyboard: false, show: true});
			 document.getElementById("patNdhmHealthId").readOnly = false;
			 $('#MOBILEOTP').addClass("data-none");
			 $('#NHDMHEALTHDETAIL').addClass("data-none");
			 document.getElementById("mobileOtp").readOnly = false;
			 
			 document.getElementsByName("mobileOtp")[0].value = "";
		}
		
	}
	
	function saveConsentData(){
		var hospitalcode = crno.slice(0,5);
		var patNdhmPurpose ="";
		var array = []; 
		var patNdhmHealthId = document.getElementsByName("patConsentNdhmHealthId")[0].value+"@sbx";
		var patNdhmPurposeCode = document.getElementsByName("patNdhmPurposeCode")[0].value;
		if(patNdhmPurposeCode == "CAREMGT"){
			 patNdhmPurpose = "Care Management";
		}
		else if (patNdhmPurposeCode == "BTG"){
			 patNdhmPurposeCode = "Break the Glass";
		}
		else if (patNdhmPurposeCode == "PUBHLTH"){
			 patNdhmPurpose = "Patient Health";
		}
		else if (patNdhmPurposeCode == "DSRCH"){
			 patNdhmPurpose = "Disease Specific Healthcare Research";
		}
		else if (patNdhmPurposeCode == "PATRQT"){
			 patNdhmPurpose = "Self Requested";
		}
		else if (patNdhmPurposeCode == "HPAYMT"){
			 patNdhmPurpose = "Health Care Payment";
		}
		var healthInfoFrom = document.getElementsByName("fromCurrent")[0].value;
		var healthInfoTo = document.getElementsByName("toCurrent")[0].value;
		var consentdate = document.getElementsByName("consentdate")[0].value;
            $("input:checkbox[name=type]:checked").each(function() { 
                array.push($(this).val()); 
            });
            if(patNdhmHealthId==""||patNdhmPurposeCode==""||healthInfoFrom==""||healthInfoTo==""||consentdate==""|| array==""){
            	alert("All fields are mandotory");
            }
            
            else {
		$(".content-wrapper").prepend('<div id="preloader" class="loading"></div>');
        $.ajax({
		async:true,
		type:"POST",
		url : "ndhm-linkage/verify-healthid",
		type:"POST",
		dataType: "json",
		data: {
			pathealthid:patNdhmHealthId
		},
		
		
		success: function(response){					
			  $("#preloader").remove();
			  console.log(response)
			// var responses = JSON.parse(response);
			   var responses = response;
			 if(responses.isSuccess=="0"){
				 alert("Health id is not Verified");
			 }
			 else {
				 console.log("healthInfoType"+array)
			 $.ajax({
						async:true,
						url : "ndhm-consentform/save-consentData?patHospitalHealthId="+crno+"&patNdhmHealthId="+patNdhmHealthId+"&patNdhmPurpose="+patNdhmPurpose+"&array="+array+"&healthInfoFrom="+healthInfoFrom+"&patNdhmPurposeCode="+patNdhmPurposeCode+"&healthInfoTo="+healthInfoTo+"&consentdate="+consentdate,
						type:"GET",
							/*data: {
								patHospitalHealthId:crno,
								patNdhmHealthId:patNdhmHealthId,
								patNdhmPurpose:patNdhmPurpose,
								array:JSON.stringify(array),
								healthInfoFrom:healthInfoFrom,
								patNdhmPurposeCode:patNdhmPurposeCode,
								healthInfoTo:healthInfoTo,
								consentdate:consentdate
							},*/
							/*createFHashAjaxQuery("/ndhmConnect/patientOverviewAction.cnt?hmode=saveConsentData&crNo="+crno+"&hospitalcode="+hospitalcode+"&patNdhmHealthId="+patNdhmHealthId+
						"&patNdhmPurpose="+patNdhmPurpose+"&healthInfoType="+array+"&healthInfoFrom="+healthInfoFrom+"&patNdhmPurposeCode="+patNdhmPurposeCode+"&healthInfoTo="+healthInfoTo+"&consentdate="+consentdate),
						*/
						
						success: function(response){					
							  $("#preloader").remove();
							  var responses = response;
							  console.log(responses.isSuccess);
							  if(responses.isSuccess=="1"){
								  $("#ModalViewInfo").modal('hide');
								  $('#Confirmdata').modal({backdrop: 'static', keyboard: false, show: true});
								  document.getElementById("myForm").reset();
							  }
							  else{
								  alert("Something went wrong.");
							  }
						 },
						 error: function(e){
							 $("#preloader").remove();
					            alert('Error: ' + e);
					         }
				
					});
			 }
		 },
		 error: function(e){
			 $("#preloader").remove();
	            alert('Error: ' + e);
	         }

	});
			 
            }
		
	}
	
	
	function ndhmConsentpatdetails(){
		$('#fhir_display').addClass("data-none");
		var hospitalcode = crno.slice(0,5);
		$(".content-wrapper").prepend('<div id="preloader" class="loading"></div>');
        $.ajax({
		async:true,
		url : "ndhm-consentform/fetch-consentData",
		//createFHashAjaxQuery("/ndhmConnect/patientOverviewAction.cnt?hmode=consentpatDetails&crNo="+crno+"&hospitalcode="+hospitalcode),
		dataType:"json",
		type:"POST",
		data:{
			patHospitalHealthId:crno,
			hospitalcode:hospitalcode,
			
		},
 	  success: function(response){					
			  $("#preloader").remove();
			  var responses = response;
			  console.log(responses)
			  if(responses.isSuccess=="1"){
				  var data = responses.patConsentDetails;
				  $('#DataTable11').DataTable().clear().destroy();
					   datatable = $('#DataTable11').DataTable({
						  "processing": true, 
						  responsive: true,
						  "order": [ [1, 'asc'] ],
						  "language": { "emptyTable": "No Data Is Available " },
						  "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
						  "aaData": data,
						    "columns": [
						         { "data": 'entry_date',  "width":"10%"},
						    	 { "data": 'patNdhmHealthId',  "width":"10%"},                     /* 0 */
						    	 { "data": 'patNdhmHealthPurpose',"width":"20%"},                   /*    1 */
						    	 { "data": 'patNdhmHealthType' ,"width":"30%"},                      /* 2 */
						    	 { "data": 'patNdhmHealthfromdate',"width":"10%" },                        /* 3 */
						    	 { "data": 'patNdhmHealthtodate' ,"width":"10%"},                      /* 4 */
						    	 { "data": 'patNdhmHealthconsentexpirydate',"width":"10%" },               /* 5 */
						    	 { "data": 'status',"width":"10%" },               /* 6 */
						    	 {"className":      'details-control',
						          "orderable":      false,
						          "data": 'status',render:function(data,type,row){
						          if(data=="Consent Granted"){
						              return '<a class="actionButtonNational"><label class="badge badge-gradient-success">View</label></a>';
						           }
						           else if (data=="Consent Expired"){
						          	 return 'Consent Expired';
						           }
						           else 
						          	 {
						          	 return '-';
						          	 }
						          }},
						    	
						    ],
						   
					  });
				 $('#CONSENTDATA').removeClass("data-none");
				 // Add event listener for opening and closing details
				 $('#DataTable11 tbody').on('click', 'td.details-control', function () {
					  var tr = $(this).closest('tr');
				        var row = datatable.row( tr );
				      //  row.child( getfhirpatdetails(row.data()));
				       if ( row.child.isShown() ) {
				            // This row is already open - close it
				            row.child.hide();
				            tr.removeClass('shown');
				        }
				        else {
				            // Open this row
				            row.child( getfhirpatdetails(row.data()));
				            
				            tr.addClass('shown');
				        }
				        
				    } );
			  }
			  else{
				  alert("Something went wrong.");
			  }
		 },
		 error: function(e){
			 $("#preloader").remove();
	            alert('Error: ' + e);
	         }

	});
		
	}
	/* Formatting function for row details - modify as you need */
	function getfhirpatdetails ( d ) {
		fhir_patNdhmHealthId = d.patNdhmHealthId;
        fhir_patNdhmHealthConsentId = d.patNdhmHealthConsentId
        var jsonArray =[];
        var value = [];
        var types ="";
        $(".content-wrapper").prepend('<div id="preloader" class="loading"></div>');
		$.ajax({
			async:true,
			url : "ndhm-consentform/fetch-fhirData",
			//createFHashAjaxQuery("/ndhmConnect/patientOverviewAction.cnt?hmode=consentpatDetails&crNo="+crno+"&hospitalcode="+hospitalcode),
			type:"POST",
			dataType:"json",
			data:{
				patHospitalHealthId:crno,
				hospitalCode:hospitalcode,
				fhir_patNdhmHealthId:fhir_patNdhmHealthId,
				fhir_patNdhmHealthConsentId:fhir_patNdhmHealthConsentId,
				
			},
		//	url : createFHashAjaxQuery("/ndhmConnect/patientOverviewAction.cnt?hmode=getFHIRDATA&crNo="+crno+"&fhir_patNdhmHealthId="+fhir_patNdhmHealthId+"&fhir_patNdhmHealthConsentId="+fhir_patNdhmHealthConsentId+"&hospitalCode="+hospitalcode),
			
			success: function(response){					
				  $("#preloader").remove();
				  var responses = response;
				  var data= responses.patFHIRDetails
				  for(var i=0;i<data.length;i++){
						var fhir_data = data[i].fhir_data;
							fhirBundle = {"hiType":"DiagnosticReport","fhirBundle":fhir_data};
							$.ajax({
									async:true,
									url : "ndhm-consentform/view-fhirData",
									type:"POST",
									data:
									{
										fhirBundle:JSON.stringify(fhirBundle),
										
							 },     							
									success: function(response){					
										 responsess =  JSON.parse(response)	;
										  jsonArray.push(responsess);
										  console.log(jsonArray)
										  getJSONVALUE(jsonArray)
									}, 
									
							        error: function(e){
										
								            alert('Error: ' + e);
								         }
							        });	
						
						
						
					}
			},
			
			
	        error: function(e){
				 $("#preloader").remove();
				
		            alert('Error: ' + e);
		         }
	        });
	}
	function getJSONVALUE(arr) {
		var doc_download={};
		$('#fhir_display').removeClass("data-none");
		var encounter_record_date="";
		var medication_detail = "";
		var cheif_complaints="";
		document.getElementById("total_records").innerHTML = "Total Records : <h13>"+arr.length+"</h13>"
		for(var i =0;i<arr.length;i++){
			if(arr[i].encounter_detail.encounter_start_date == ""|| arr[i].encounter_detail.encounter_start_date == null){
				record_date = "-"
			}
			else {
				record_date = arr[i].encounter_detail.encounter_start_date;
			}
			if(arr[i].provider_detail.hospital_name == ""|| arr[i].provider_detail.hospital_name == null){
				hospital_name = "-"
			}
			else {
				hospital_name = arr[i].provider_detail.hospital_name;
			}
			if(arr[i].encounter_detail.encounter_type == ""|| arr[i].encounter_detail.encounter_type == null){
				encounter_type = "-"
			}
			else {
				encounter_type = arr[i].encounter_detail.encounter_type;
			}
			var report_detail = arr[i].report_detail
			if(arr[i].report_detail==""|| arr[i].report_detail==null || arr[i].report_detail===undefined){
				report_order_status = "-";
				report_pdf="-"
					report_issue_date = "-"
						report_test_name ="-"		
						report_lab_name="-"	
						report_doc	 ="-"	
					//document.getElementById("pdf").innerHTML = report_pdf;
			}
			else {
				report_order_status = arr[i].report_detail.order_status
				report_test_name = arr[i].report_detail.test_name
				report_issue_date = arr[i].report_detail.report_date
				
				
				if(arr[i].report_detail.report_base64!=""|| arr[i].report_detail.report_base64!=null){
					report_lab_name = arr[i].report_detail.lab_name
				}
				else{
					report_lab_name = "-"
				
				}
				
				
						
				//	document.getElementById("pdf").innerHTML = report_pdf;
			}
			if(arr[i].doc_detail=="" || arr[i].doc_detail==null ||arr[i].doc_detail===undefined  ){
				doc_detail = "-"
					doc_download1 = "null"
					}
			else {
				doc_detail="Document Reference";
				//doc_download =arr[i].doc_detail.document_base64;
				doc_download = {"title":arr[i].doc_detail.document_type,"data":arr[i].doc_detail.document_base64,"type":arr[i].doc_detail.document_content_type};
				doc_download1 = JSON.stringify(doc_download);
				
			}
			
		encounter_record_date+= "<div class='hr_line'></div>"+
				"<div class='row'>" +
				"<div class='col-md-4'>" +
				"<h12>Record Date : <h13>"+arr[i].composition_date+"</h13></h12>" +
						"</div>" +
						"<div class='col-md-6'>" +
						"<button  class='btn btn-sm ml-auto collapsed more-sucess'  type='button' data-toggle='collapse' data-target='#MORECONTENT' aria-expanded='false' >"+
		"<i class='mdi mdi-arrow-down-bold-circle '></i></button></div>" +
						"</div>"+
						
						"<div class='row'>" +
						"<div class='col-md-12'>" +
						"<h2 class='hospital_code'>"+hospital_name+"</h2>" +
								"</div>" +
								"</div>"+
								"<div class='documentcard cardstyle'>" +
								"<div class='row'>" +
								"<div class='col-md-9 documenttxt' ><img src='assets/images/dashboard/document.svg' style='margin-bottom: 5px;height: 36px'/>"+arr[i].composition_title+
								"</div>" +
								"<div class='col-md-3'>" +
								"<h12> Type : <h13>"+encounter_type+"</h13></h12>" +
										"</div>" +
										"</div></div>" +
										"<div  id='MORECONTENT' class='panel-collapse collapse in grid-margin ' role'tabpanel' aria-labelledby='headingOne'>";
										

		
		if( arr[i]["lst_cc"] &&  arr[i].lst_cc!=null &&  arr[i].lst_cc.length>0 ){
			for(var a in arr[i].lst_cc){
				cheif_complaints+= "<i class='mdi mdi-arrow-right-bold'></i>&nbsp;"+arr[i].lst_cc[a].value+"["+arr[i].lst_cc[a].record_date+"]. <br>"
				/*medication_detail+= "<div class='row'>" +
						"<div class='col-md-12'>" +
						"<h13><i class='ti-hand-point-right'></i>&nbsp;"+arr[i].lst_meds[a].medication_name+"("+arr[i].lst_meds[a].dosage+")" +
								"</h13></div></div>";*/
			}
			encounter_record_date+= "<div class='row'>" +
					"<div class ='col-md-12 reporttxt'>Chief Complaints :" +
					"</div>" +
					"</div><div style='border: 2px solid #00000038;'>" +
					 "<div class='row'>" +
						"<div class='col-md-12'>" +
						"<h13 style='font-weight:500'>"+cheif_complaints +
								"</h13></div></div></div>";
					
		}
		if( arr[i]["lst_meds"] &&  arr[i].lst_meds!=null && arr[i].lst_meds.length>0){
			for(var a in arr[i].lst_meds){
				medication_detail+= "<i class='mdi mdi-arrow-right-bold'></i>&nbsp;"+arr[i].lst_meds[a].medication_name+"("+arr[i].lst_meds[a].dosage+"). <br>"
				/*medication_detail+= "<div class='row'>" +
						"<div class='col-md-12'>" +
						"<h13><i class='ti-hand-point-right'></i>&nbsp;"+arr[i].lst_meds[a].medication_name+"("+arr[i].lst_meds[a].dosage+")" +
								"</h13></div></div>";*/
			}
			encounter_record_date+= "<div class='row'>" +
					"<div class ='col-md-12 reporttxt'>Medication :" +
					"</div>" +
					"</div><div style='border: 2px solid #00000038;'>" +
					 "<div class='row'>" +
						"<div class='col-md-12'>" +
						"<h13 style='font-weight:500'>"+medication_detail +
								"</h13></div></div></div>";
					
		}
	
		//lst_cc Chief Complaints
		// lst_meds   Medications
		//report_detail Diagnosis Report
			if( arr[i]["report_detail"] &&  arr[i].report_detail!=null){
				report_doc = JSON.stringify({"type":arr[i].report_detail.report_content_type,"data":arr[i].report_detail.report_base64})
			encounter_record_date+=	
										"<div class = 'row'>" +
										"<div class='col-md-12 reporttxt'>Diagnosis Report :</div>" +
										"</div><div style='border: 2px solid #00000038;'>" +
										"<div class='row'><div class='col-md-6'><h12>Status :<h13>" +arr[i].report_detail.order_status+"</h13></h12></div></div>" +
										"<div class='row'><div class='col-md-6'><h12>Issue Date :<h13>" +arr[i].report_detail.report_date+"</h13></h12></div></div>" +
										"<div class='row'><div class='col-md-6'><h12>Test Name :<h13>" +arr[i].report_detail.test_name+"</h13></h12></div></div>" +
										"<div class='row'><div class='col-md-6'><h13>Reference :<button class='nav-item test1' id='report_data_pdf' style='cursor:pointer;color:#007bff;background: none;border: none;' ><a value='"+report_doc+"' >"+arr[i].report_detail.lab_name+"</a></button></h13></div></div></div>" ;
			}
			
			// Document Refernce doc_detail
			if(arr[i]["doc_id"] && arr[i].doc_id!=null){
				doc_download = JSON.stringify({"title":arr[i].doc_detail.document_type,"data":arr[i].doc_detail.document_base64,"type":arr[i].doc_detail.document_content_type});
			encounter_record_date+= 	"<div class = 'row'>" +
										"<div class='col-md-12 reporttxt'>Document Detail :   <h13><button class='nav-item test'style='cursor:pointer;color:#007bff;background: none;border: none;'><a  value='"+doc_download+"'>"+arr[i].composition_title+"</a></button></h13></div>" +
										"</div></div>"; 
												
											
			}
			
		encounter_record_date+= "</div>";
			document.getElementById("record_date").innerHTML=encounter_record_date;
			
			}
		
		$(".more-sucess").click(function () {
            $(this).next(".morecontent").slideToggle(100);
        });
		
		$('.test').on("click", "a", function(){
		    var fired_button =$(this).attr("value");
			    downloadpdf(fired_button)
		});
		$('.test1').on("click", "a", function(){
		    var fired_button1 =$(this).attr("value");
			    download_report_pdf(fired_button1)
		});
		
		
	}
	function moredata(){
		var coll = document.getElementsByClassName("collapsible");
		var i;
		alert(coll.length)
		for (i = 0; i < coll.length; i++) {
		  coll[i].addEventListener("click", function() {
		    this.classList.toggle("active");
		    var content = this.nextElementSibling;
		    if (content.style.display === "block") {
		      content.style.display = "none";
		    } else {
		      content.style.display = "block";
		    }
		  });
		}
	}
	function downloadpdf(data){
		//data1 = JSON.parse(data);
		if(data!="null"){
		var data1 = JSON.parse(data);
		 var b64 = data1.data;
			//var b64 = data;
		 $('#ex1').empty();
			/*$('#download').empty();*/
			  $("#mymodal").modal('show');
			var obj = document.createElement('object');
			obj.style.width = '100%';
			obj.style.height = '100%';
			obj.type = data1.type;
			obj.data =  'data:'+data1.type+';base64,'+b64;
			
			document.getElementById("ex1").appendChild(obj);
			

			/*var link = document.createElement('a');
			link.innerHTML = 'Download PDF file';
			link.download = "DocumentReference.pdf";
			link.href = 'data:application/octet-stream;base64,' + b64;
			$('#download').html(link);
			document.getElementById("download").appendChild(link);*/
	}
		else 
return false;
	}
	function download_report_pdf(data){
		//data1 = JSON.parse(data);
		if(data!="null"){
		data1 = JSON.parse(data);
		 var b64 = data1.data;
			//var b64 = data;
		 $('#ex1').empty();
			  $("#mymodal").modal('show');
			var obj = document.createElement('object');
			obj.style.width = '100%';
			obj.style.height = '100%';
			obj.type = data1.type;
			obj.data =  'data:'+data1.type+';base64,'+b64;

			document.getElementById("ex1").appendChild(obj);
		    
	}
		else 
return false;
	}
	
	$(function (){
		document.addEventListener("keypress", function(event) {
			  if (event.key == "{") {
				  console.log("Scan Started: {");
				  setTimeout(function()  { 
					  console.log("Scan TimeOut:3sec");
					  $('#qrInputElm').val("");
					  $('#qrInputElm').addClass("data-none");
				  }, 3000);
			   event.preventDefault();
			   $('#qrInputElm').removeClass("data-none");
			   $('#qrInputElm').val("{");
			   $('#qrInputElm').focus();
			   
			   $('#qrInputElm').off("keypress").on("keypress", function(event){
				   if (event.key == "}"){ 
					   var qrInputElmVal=$('#qrInputElm').val();
					   $('#qrInputElm').addClass("data-none");
					   qrInputElmVal+="}";
					   console.log("Scan Ended: }");
					   scanComplete(qrInputElmVal);
				   }
			   });
			  }
		});
	});
	function scanComplete(scanJsonStr){
		var scanJson= JSON.parse(scanJsonStr);
		document.getElementById("patNameInput").innerHTML = scanJson.name;
		document.getElementById("patGenderInput").innerHTML = scanJson.gender;
		document.getElementById("patDobInput").innerHTML = scanJson.dob;
		document.getElementById("patAddressInput").innerHTML = scanJson.address;
		$('#patNdhmHealthId').val(scanJson.hid);
		$('#qrScanElemntdiv').removeClass('data-none');


		}
	
	function myFunction(){
		 var verifydata = document.getElementsByName("verifydata")[0].value;
		 if(verifydata == "Demographic"){
		//	 $('#SCANNER').removeClass("data-none");
			 $('#OTPBUTTON').addClass("data-none");
		 }
		 else{
			 $('#OTPBUTTON').removeClass("data-none");
			// $('#SCANNER').addClass("data-none");
			 $('#SCANNERDIV').addClass("data-none");
		 }
	}
	
	function verifyhealthid(){
		var pathealthid = document.getElementsByName("patNdhmHealthId")[0].value;
		$(".content-wrapper").prepend('<div id="preloader" class="loading"></div>');
        $.ajax({
		async:true,
		type:"POST",
		url : "ndhm-linkage/verify-healthid",
		dataType: "json",
		data: {
			pathealthid:pathealthid
		},
		success: function(response){					
			  $("#preloader").remove();
			// var responses = JSON.parse(response);
			  var responses = response;
			 if(responses.isSuccess=="0"){
				 $('#INVALIDDATA').removeClass("data-none");
				 isverified="0";
			 }
			 else {
			 ndhmHealthIDCode = responses.healthIdNumber;
			 $('#selectauthMode').empty();
			 var select = document.getElementById("selectauthMode");
			 var authModes = responses.authMethods;
				    
				        var arr = responses.authMethods; 
				      
				        // Removing the specified element by value from the array
				        for (var i = 0; i < arr.length; i++) { 
				            if (arr[i] === "PASSWORD" ) { 
				                var spliced = arr.splice(i,1);
				               if(arr[i] === "AADHAAR_BIO"){
				            	   var sp = arr.splice(i,1);
				            	   for(var i = 0; i < arr.length; i++) {
									    var opt = arr[i]
									    var el = document.createElement("option");
									    el.textContent = opt;
									    el.value = opt;
									    select.appendChild(el);
							       
				                }
				               }
				               else {
				                	for(var i = 0; i < arr.length; i++) {
									    var opt = arr[i]
									    var el = document.createElement("option");
									    el.textContent = opt;
									    el.value = opt;
									    select.appendChild(el);
				                	} 
				                }
				                
				                
				            } 
				        } 
				       
			  document.getElementById("patNdhmHealthId").readOnly = true;
			  $('#VERIFYHEALTHID').addClass("data-none");
			  $('#AUTHMODE').addClass("data-none");
			  $('#VERIFYDATA').removeClass("data-none");
			  $('#VERIMAGE').removeClass("data-none");
			  $("#VERIFYDATABTN").removeClass("data-none");
			  $('#VERIFYCHECK').removeClass("data-none");
			  $('#INVALIDDATA').addClass("data-none");
			  if(patient_health_id==""||patient_health_id==null){
			  isverified ="1";
			  $('#VERIFYONLY').removeClass("data-none");
			  
			  }
			  else {
				  isverified="2";
				  $('#VERIFYONLY').addClass("data-none");
			  }
			 }
		},
        error: function(e){
			 $("#preloader").remove();
			
	            alert('Error: ' + e);
	         }
        });
	}
	
	function editpatHealthid(){
		 document.getElementById("patNdhmHealthId").readOnly = false;
		 $('#VERIFYHEALTHID').removeClass("data-none");
		 $('#VERIFYDATA').addClass("data-none");
		 $('#VERIFYDATABTN').addClass("data-none");
		 $('#VERIFYCHECK').addClass("data-none");
		 $('#AUTHMODE').addClass("data-none");
		 $('#qrScanElemntdiv').addClass("data-none");
		 $('#ERRORMESSAGE').addClass("data-none");
		 $('#MOBILEOTP').addClass("data-none");
		 $('#NHDMHEALTHDETAIL').addClass("data-none");
		 $('#VERIMAGE').addClass("data-none");
		 
	}
	function isVerifyonly(){
		$('#VERIFYDATA').addClass("data-none");
		$('#VERIFYDATABTN').addClass("data-none");
		console.log(ndhmHealthIDCode)
		patNdhmHealthId = document.getElementsByName("patNdhmHealthId")[0].value;
		 hospitalcode = crno.slice(0,5);
		 if( document.getElementById("iskyc").checked == true){
			    isKyc = "1";
			    }
			    else {
			    	 isKyc = "0";
			    }
		if(document.getElementsByName("patNdhmHealthId")[0].value==""){
			alert("Please Enter Health Id");
		}
		else {
			$(".content-wrapper").prepend('<div id="preloader" class="loading"></div>');
			$.ajax({
				aysnc:true,
				url : "ndhm-linkage/only-savepatdetails",
				type:"POST",
				dataType:"json",
				data: {
					patNdhmHealthId:patNdhmHealthId,
					hospitalcode:hospitalcode,
					patAuthMode: "VERIFY",
					patHospitalHealthId:crno,
					ndhmHealthIDCode:ndhmHealthIDCode,
					isKyc:isKyc,
					isVerified:"3"
				},
				 success: function(response){
					 $("#preloader").remove();
				//	 var responses = JSON.parse(response);
					 var responses = response;
					 console.log(responses)
					 if(responses.isSuccess=="1" || responses.length==0){
						
						 $('#Confirmdata').modal({backdrop: 'static', keyboard: false, show: true});
					 }
					
				 },
				 error: function(e){
					 $("#preloader").remove();
			            alert('Error: ' + e);
			         }
			});
		}
	}
	
	function consentRequestModal(){
		/* $.ajax({
				async:true,
				url : createFHashAjaxQuery("/ndhmConnect/patientOverviewAction.cnt?hmode=validateToken"),
			});
				*/
		 $('#ModalViewInfo').modal({backdrop: 'static', keyboard: false, show: true});
	}	
	

	
function viewLinkedEpisodeList(){
	var ipdOpdUnlinkedData = [];
	var ipdOpdlinkedData = [];
	   $(".content-wrapper").prepend('<div id="preloader" class="loading"></div>');
		$.ajax({
			aysnc:true,
			url : "ndhm-consentform/fetch-episodesData",
			dataType:"json",
			Type:"POST",
			data:{
				patHospitalHealthId:crno,
				hospitalCode:hospitalcode
				//createFHashAjaxQuery("/ndhmConnect/patientOverviewAction.cnt?hmode=IpdData&crno="+crno+"&hospitalCode="+hospitalcode),
			},
			 success: function(response){
				 $("#preloader").remove();
				 var responses = response;
				 if(responses.isSuccess=="1"){
				 var patdetails = responses.episodesList;
				 
				 console.log("Linked data",patdetails )
				 for(i=0;i<patdetails.length;i++){
					var variable = patdetails[i].episodeUniqueCode.split("_")[0]
					var encounter_type = variable.split("_")[0]
					
					 if(patdetails[i].isLinked == "1"){
						 ipdOpdlinkedData.push(patdetails[i])
						 
					 }
					 else {
						 ipdOpdUnlinkedData.push(patdetails[i])
					 }
				 }
				 unlinkedepisodesData(ipdOpdUnlinkedData);
				 linkedepisodesData(ipdOpdlinkedData);
				 if(ipdOpdUnlinkedData.length!=0){
					 document.getElementById("datalist").innerHTML = '<span style="color:#dc1f0b">'+ipdOpdUnlinkedData.length+'&nbsp; Episodes to be Linked</span> <i class=" ti-hand-point-right blinking"></i>&nbsp;Click Here To Link' 

				 }
				 if(ipdOpdlinkedData.length!=0){
					 document.getElementById("datalistlinkedepisodes").innerHTML = '<span style="color:#5cb85c">'+ipdOpdlinkedData.length+ '&nbsp; Episodes Linked</span> <i class=" ti-hand-point-right blinking"></i>&nbsp;Click Here To View'
                       $('#linkedEpisodesList').removeClass("data-none");
				 }
			 }
			 },
			 error: function(e){
				 $("#preloader").remove();
		            alert('Error: ' + e);
		         }
		});
		
		
		
}

function linkedepisodesData(jsonObject){
	var linkedData = "";
	console.log("Unlinked Data -------",jsonObject.length)
	for(var i = 0;i<jsonObject.length;i++){
		if(jsonObject.length -1){
			linkedData+="<h12>"+jsonObject[i].visitDate+"</h12>&nbsp;-&nbsp;"+jsonObject[i].episodeUniqueCode +"&nbsp("+jsonObject[i].department_unit+") ,"
		}
		else {
			linkedData+="<h12>"+jsonObject[i].visitDate+"</h12>&nbsp;-&nbsp;"+jsonObject[i].episodeUniqueCode +"&nbsp("+jsonObject[i].department_unit+")"
		}
		
	}
	console.log("linkedData======"+linkedData)
	document.getElementById("linkeddata").innerHTML = linkedData +"&nbsp;.";
}

function navigate_event(){
	$("#datalistlinkedepisodes").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#linkedEpisodesList").offset().top
	    }, 1000);
	});
}

function unlinkedepisodesData(Jsondata){
	var data =[];
	var jsonOpdData =[];
	var ipd_episode_code =[];
	var finalOPd = {};
	var finalIPd = {};
	var finalEpisodeListIPD = {};
	var finalEpisodeListOPD = {};
	for(var i=0;i<Jsondata.length;i++){
		if(Jsondata[i].episodeUniqueCode.split("_")[0]=="IPD" ){
			 finalIPd.isLinked = Jsondata[i].isLinked ;
			 finalIPd.department_unit = Jsondata[i].department_unit
			 finalIPd.dischargeDate = Jsondata[i].dischargeDate ;
			 finalIPd.episodeUniqueCode = Jsondata[i].episodeUniqueCode ;
			 finalIPd.isDischarge_present = Jsondata[i].isDischarge_present ;
			 finalIPd.isReport_present = Jsondata[i].isReport_present ;
			 finalIPd.isRx_present = Jsondata[i].isRx_present ;
			 finalIPd.status = Jsondata[i].status ;
			 finalIPd.visitDate = Jsondata[i].visitDate ;
			 finalIPd.finalEpisodeListIPD = "{isLinked :'"+Jsondata[i].isLinked+"', episodeUniqueCode:'"+Jsondata[i].episodeUniqueCode+"'}";
			 data.push(finalIPd)
		 }
		 else {
			 finalOPd.isLinked = Jsondata[i].isLinked ;
			 finalOPd.department_unit = Jsondata[i].department_unit
			 finalOPd.dischargeDate = Jsondata[i].dischargeDate ;
			 finalOPd.episodeUniqueCode = Jsondata[i].episodeUniqueCode ;
			 finalOPd.isDischarge_present = Jsondata[i].isDischarge_present ;
			 finalOPd.isReport_present = Jsondata[i].isReport_present ;
			 finalOPd.isRx_present = Jsondata[i].isRx_present ;
			 finalOPd.status = Jsondata[i].status ;
			 finalOPd.visitDate = Jsondata[i].visitDate ; '"+doc_download+"'
			 finalOPd.finalEpisodeListOPD = "{isLinked :'"+Jsondata[i].isLinked+"', episodeUniqueCode:'"+Jsondata[i].episodeUniqueCode+"'}";
			 
			 jsonOpdData.push(finalOPd);
			// alert(jsonOpdData)
		 }
	}
	  $('#DataTableipdEpisode').DataTable().clear().destroy();
	  IPDdatatable = $('#DataTableipdEpisode').DataTable({
		  "processing": true, 
		  responsive: true,
		  "order": [ [1, 'asc'] ],
		  "language": { "emptyTable": "No Data Is Available " },
		  "lengthMenu": [[5,10, 25, -1], [5,10, 25, "All"]],
		  
		  "aaData": data,
		    "columns": [
		    	
		    	 { "data": 'finalEpisodeListIPD',"defaultContent": "","searchable":false},
		         { "data": 'visitDate',  "width":"10%",},
		         { "data": 'department_unit', "searchable":true},
		         { "data": 'status',  "width":"10%","searchable":true},
		         
		    	 
		    	 { "data": 'dischargeDate',  "width":"10%","searchable":true,render:function(data,type,row){
		    		 if(data==""|| data==null){
		    			 return "-";
		    		 }
		    		 else {
		    			return data;
		    		 }
		    	 }},
		    	 { "data": null, "defaultContent": '',"searchable":false , "className": 'details-control',"orderable":      false, render:  viewrdischarge_summary},
		    	
		    ],
		    "columnDefs": [{
		        orderable: false,
		        targets:0,
		    'checkboxes': {
                'selectRow': true
            }
		    },
		   
		    ],
		    select: {
		        style: 'multi',
		      },
		    order: [
		        [1, 'asc']
		    ],
		    
		     });
	    
		 $('#DataTableopdEpisode').DataTable().clear().destroy();
		  OpdDatatable = $('#DataTableopdEpisode').DataTable({
			  "processing": true, 
			  responsive: true,
			  "order": [ [1, 'asc'] ],
			  "language": { "emptyTable": "No Data Is Available " },
			  "lengthMenu": [[5,10, 25, -1], [5,10, 25, "All"]],
			  "aaData": jsonOpdData,
			    "columns": [
			    	 { "data": 'finalEpisodeListOPD',"defaultContent": ""},
			    	 
			         { "data": 'visitDate',  "width":"10%", "searchable":true},
			         { "data": 'department_unit'},
			         { "data": 'status',  "width":"10%"},
			                      /* 0 */
			    	 { "data": null, "defaultContent": '',"searchable":false , "className": 'details-control',"orderable":      false, render:  viewreportdata},
			    	  ],
			    
			    "columnDefs": [{
			        orderable: false,
			        targets:0,
			    'checkboxes': {
                    'selectRow': true
                }
			    },
			   
			    ],
			    select: {
			        style: 'multi',
			      },
			    order: [
			        [1, 'asc']
			    ],
				 
			   
		  });
		  
		 
	  }

function viewrdischarge_summary (data,type,row){
	var data = row.isisDischarge_present;
	if(data == "1"){
		return '<a class="actionButtonNationalclinicalpdf" onclick="viewdischargesummary()"><label class="badge badge-gradient-success">Discharge Summary</label></a>'	
	}
	else {
		return "-"
	}
}

function viewdischargesummary ()
{
	 $("#healthIdRecord").prepend('<div id="preloader" class="loading"></div>');
	 $('#DataTableipdEpisode tbody ').on('click', 'td.details-control', function () {
	        var tr = $(this).closest('tr');
	        var row = IPDdatatable.row( tr );
	       var d = row.data();
	       
	       var encounterType = d.episodeUniqueCode.split("_")[0]
	   	var admissionNo = d.episodeUniqueCode.split("_")[1]
	   	var visitNo = d.episodeUniqueCode.split("_")[2]
	   	$.ajax({
	   		aysnc:true,
	   		url : "ndhm-consentform/fetch-episodesData",
			dataType:"json",
			Type:"POST",
			data:{
				patHospitalHealthId:crno,
				hospitalCode:hospitalcode,
				encounterType:encounterType,
				visitNo:visitNo,
				admissionNo:admissionNo
			},
	   	//	url : createFHashAjaxQuery("/ndhmConnect/patientOverviewAction.cnt?hmode=viewReports&crno="+crno+"&encounterType="+encounterType+"&visitNo="+visitNo+"&admissionNo="+admissionNo),
	   		 success: function(response){
	   			$("#preloader").remove();
	   			var responses = response;
	   			console.log(responses)
	   			 $('#reportpdf').empty();
	 			$('#reportpdfModal').modal({backdrop: 'static', keyboard: false, show: true});
	 		  var obj = document.createElement('object');
	 			obj.style.width = '100%';
	 			obj.style.height = '100%';
	 			obj.type = responses.encounter_detail.discharge_content_type;
	 			obj.data =  'data:'+responses.encounter_detail.discharge_content_type+';base64,'+responses.encounter_detail.discharge_base64;;
	 		document.getElementById("reportpdf").appendChild(obj);
	   		},
	   		 
	   		 error: function(e){
	   			 $("#preloader").remove();
	   	            alert('Error: ' + e);
	   	         }
	   	});
	   	});
	   	
	}

function viewreportdata(data,type,row){
	var data = row.isRx_present
	var rxdata = row.isReport_present;
	if(data =="0"&& rxdata=="1"){
		return '<a class="actionButtonNationalclinicalpdf" onclick="viewclinicalpdf()"><label class="badge badge-gradient-success">Rx</label></a>'	
	}
	else if (data=="1"&& rxdata=="0"){
		return '<a class="actionButtonNationalreportpdf" onclick="viewreportdetails()"><label class="badge badge-gradient-success" >Lab</label></a>'	
	}
	else if (data=="1"&& rxdata=="1"){
		return '<a class="actionButtonNationalclinicalpdf" onclick="viewclinicalpdf()"><label class="badge badge-gradient-success">Rx</label></a>&nbsp;<a class="actionButtonNationalreportpdf" onclick="viewreportdetails()"><label class="badge badge-gradient-success">Lab</label></a>'	
	}
	else {
		return "-";
	}
}

function viewclinicalpdf(){
	 $("#healthIdRecord").prepend('<div id="preloader" class="loading"></div>');
	 $('#DataTableopdEpisode tbody td').on('click', 'a.actionButtonNationalclinicalpdf', function () {
	        var tr = $(this).closest('tr');
	        var row = OpdDatatable.row( tr );
	       var d = row.data();
	       
	       var encounterType = d.episodeUniqueCode.split("_")[0]
	   	var episodeCode = d.episodeUniqueCode.split("_")[1]
	   	var visitNo = d.episodeUniqueCode.split("_")[2]
	   
	   	$.ajax({
	   		aysnc:true,
	   		url : createFHashAjaxQuery("/ndhmConnect/patientOverviewAction.cnt?hmode=viewReports&crno="+crno+"&encounterType="+encounterType+"&episodeCode="+episodeCode+"&visitNo="+visitNo),
	   		 success: function(response){
	   			$("#preloader").remove();
	   			var responses = JSON.parse(response);
	   			console.log(responses)
	   			 $('#reportpdf').empty();
	 			$('#reportpdfModal').modal({backdrop: 'static', keyboard: false, show: true});
	 		  var obj = document.createElement('object');
	 			obj.style.width = '100%';
	 			obj.style.height = '100%';
	 			obj.type = responses.encounter_detail.rx_content_type;
	 			obj.data =  'data:'+responses.encounter_detail.rx_content_type+';base64,'+responses.encounter_detail.rx_base64;;
	 		document.getElementById("reportpdf").appendChild(obj);
	   		},
	   		 
	   		 error: function(e){
	   			 $("#preloader").remove();
	   	            alert('Error: ' + e);
	   	         }
	   	});
	   	});
	   	
}


function viewreportdetails(){
	 $('#DataTableopdEpisode tbody td').on('click', 'a.actionButtonNationalreportpdf', function () {
	 var tr = $(this).closest('tr');
     var row = OpdDatatable.row( tr );
     var tr = $(this).closest('tr');
     var row = OpdDatatable.row( tr );
    var d = row.data();
    
    var encounterType = d.episodeUniqueCode.split("_")[0]
	var episodeCode = d.episodeUniqueCode.split("_")[1]
	var visitNo = d.episodeUniqueCode.split("_")[2]
     if ( row.child.isShown() ) {
         // This row is already open - close it
         row.child.hide();
         tr.removeClass('shown');
     }
     else {
    	 $("#healthIdRecord").prepend('<div id="preloader" class="loading"></div>');

       	$.ajax({
 	   		aysnc:true,
 	   		url : createFHashAjaxQuery("/ndhmConnect/patientOverviewAction.cnt?hmode=viewReports&crno="+crno+"&encounterType="+encounterType+"&episodeCode="+episodeCode+"&visitNo="+visitNo),
 	   		 success: function(response){
 	   			
 	   			 var responses = JSON.parse(response);
 	   			 console.log(responses)
          // Open this row
      	 $("#preloader").remove();
          row.child( viewLabDetails(responses)).show();
          tr.addClass('shown');
      },
     
		 
		 error: function(e){
			 $("#preloader").remove();
	            alert('Error: ' + e);
	         }
     	});
}
	});
    
     }

function saveunlinkedData(){
	  var tblData = OpdDatatable.columns().checkboxes.selected()[0];
	  var tblDataIPD = IPDdatatable.columns().checkboxes.selected()[0];
	  $.each(tblData, function(i, val) {
		    tmpData.push(tblData[i]);

	  
	  }); 
	  $.each(tblDataIPD, function(i, val) {
		  		    tmpData.push(tblDataIPD[i]);
		  
		  }); 
	 // alert("tmpData----------------"+tmpData)
	  $("#healthIdRecord").modal('hide');
}

function viewLabDetails ( d) {
 var investigations_detail = d.investigations_detail
 
for(var i=0;i<=investigations_detail.length;i++){
	reportfile = {"type":investigations_detail[i].report_content_type,"data":investigations_detail[i].report_base64,"title":investigations_detail[i].lab_name};
	return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
	 
    '<tr>'+
        '<td><h12>Test Date :</h12></td>'+
        '<td><h13>'+investigations_detail[i].test_date+'</h13></td>'+
        '<td><h12>Lab Name :</h12></td>'+
        '<td><h13>'+investigations_detail[i].lab_name+'</h13></td>'+
        '<td><h12>Test Name :</h12></td>'+
        '<td><h13>'+investigations_detail[i].test_name+'</h13></td>'+
        '<td><h12>Status :</h12></td>'+
        '<td><h13>'+investigations_detail[i].order_status+'</h13></td>'+
        '<td></td>'+
        '<td><a value="'+reportfile+'" id = "pdfile" onclick="downloadReportpdf()"><img src="assets/images/dashboard/pdf-file.png" height="35" width="35"></a></td>'+
    '</tr>'+
 
'</table>'
    ;
}
}

function downloadReportpdf(){
	 var b64 = reportfile.data;
	 console.log(b64)
	 $('#reportpdf').empty();
			$('#reportpdfModal').modal({backdrop: 'static', keyboard: false, show: true});
		  var obj = document.createElement('object');
			obj.style.width = '100%';
			obj.style.height = '100%';
			obj.type = reportfile.type;
			obj.data =  'data:'+reportfile.type+';base64,'+b64;
		document.getElementById("reportpdf").appendChild(obj);

}


	function healthrecordmodal(){
		$('#healthIdRecord').modal({backdrop: 'static', keyboard: false, show: true});
	}

function myfunction2(){
	if($('.collapse').collapse('hide')){
		  $('.collapse').collapse('show');
	}
	else
	  $('.collapse').collapse('hide');
	}
