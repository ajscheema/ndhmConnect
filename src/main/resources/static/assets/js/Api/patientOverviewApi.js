

var crno = document.getElementsByName("crno")[0].value;
var reqno;
var report_url;

$(".card-body").prepend('<div id="preloader" class="loading"></div>');
var request = new XMLHttpRequest();
	 request.open('GET', '/eSushrutEHRServices/service/ehr/get/patient/demographicDetails?crNo='+crno, true);
	 request.onload = function () {
	   // Begin accessing JSON data here
		
	   if (request.status >= 200 && request.status < 400) {
		 //  $("#preloader").remove();
		   var data = JSON.parse(this.response);
	       var demographic_detail = data.demographic_detail;
	         	   document.getElementById("crno").innerHTML = "CR.No:"+demographic_detail.cr_no;
	           if(data.clinical_status.is_dead =="true"){
	    	   document.getElementById("patientname").innerHTML=demographic_detail.patient_name+"<h12>&nbsp;[Dead]</h12> <h12 style='float:right'>Category : <h13 id='billing'></h13></h12>";
	       }
	       else if(data.clinical_status.is_admitted =="true"){
	    	   document.getElementById("patientname").innerHTML=demographic_detail.patient_name+"<h12>&nbsp;[Admitted]</h12> <h12 style='float:right'>Category : <h13 id='billing'></h13></h12>";
	       }
	       
	       else if(data.clinical_status.is_admitted =="true" && data.is_dead =="true"){
	    	   document.getElementById("patient_status").innerHTML=demographic_detail.patient_name+"<h12>&nbsp;[Dead/Admitted]</h12><h12 style='float:right'>Category : <h13 id='billing'></h13></h12>";
	       }
	       else {
	    	   document.getElementById("patientname").innerHTML = demographic_detail.patient_name+"<h12 style='float:right'>Category : <h13 id='billing'></h13></h12>" ;
	       }
	       
	       document.getElementById("age").innerHTML = demographic_detail.age;
	       if(demographic_detail.gender=="Male"){
	    	   document.getElementById("gender").innerHTML ="M";	
	    	   document.getElementById("user_profile").innerHTML= "<img src='assets/images/dashboard/profile.svg' alt='profile'>"
	       }
	       else  if(demographic_detail.gender=="Female"){
	    	   document.getElementById("gender").innerHTML ="F";	
	    	   document.getElementById("user_profile").innerHTML= "<img src='assets/images/dashboard/user.svg' alt='profile'>"
	       }
	       else{
	    	   document.getElementById("gender").innerHTML ="O";
	    	   document.getElementById("user_profile").innerHTML= "<img src='assets/images/dashboard/profile.svg' alt='profile'>"
	       }
	       document.getElementById("mobile").innerHTML =demographic_detail.mobile_no;
	       if(demographic_detail.spouse_name!=""){
	    	   document.getElementById("spouse_name").innerHTML ="Spouse Name: "+"<h13>"+demographic_detail.spouse_name+"</h13>";
	       }
	       if(demographic_detail.father_name!=""){
	    	   document.getElementById("father_name").innerHTML ="Father Name: "+"<h13>"+demographic_detail.father_name+"</h13>";
	       }
	       document.getElementById("dob").innerHTML =demographic_detail.dob;
	       if(demographic_detail.address!=""){
	    	   document.getElementById("address").innerHTML =demographic_detail.address;
	       }
	       else {
	       document.getElementById("address").innerHTML ="-"; 
	       }
	       
	       document.getElementById("billing").innerHTML =demographic_detail.billing_category;
	       if(data.is_pregnant=="true"){
	    	   document.getElementById("pregnant").style.display="";
	       }
	       if(data.clinical_alerts.allergies_detail.isDataPresent=="true"){
	    	   document.getElementById("allergiesdiv").style.display="";
	    	   var allergies_name ="";
	    	   var allergies = data.clinical_alerts.allergies_detail;
	    	   for(var i = 0;i<allergies.length;i++){
		    	   if (i < (chronic.length - 1)) {
		    		   allergies_name+= allergies[a].code_type+" ("+allergies[a].severity +") "+allergies[a].duration+", ";
		    	   }
		    	   else{
		    		   allergies_name+= allergies[a].code_type+" ("+allergies[a].severity +") "+allergies[a].duration;
		    	   }
	    	   }
	    	  /* for(var a in allergies){
	    		   allergies_name+= allergies[a].code_type+" ("+allergies[a].severity +") "+allergies[a].duration+", ";
	    	   }*/
	    	   document.getElementById("allergies_name").innerHTML = "<i class='mdi mdi-video-input-video'></i>&nbsp;"+allergies_name+" .";
	       }
	       if(data.clinical_alerts.chronic_diseases_detail.isDataPresent=="true"){
	    	   document.getElementById("chronicdiv").style.display="";
	    	   var chronic_name ="";
	    	   var chronic = data.clinical_alerts.chronic_diseases_detail;
	    	   for(var i = 0;i<chronic.length;i++){
		    	   if (i < (chronic.length - 1)) {
		    		   chronic_name+= chronic[a].code_type+" ("+chronic[a].severity +") "+chronic[a].duration+", ";
		    	   }
		    	   else{
		    		   chronic_name+= chronic[a].code_type+" ("+chronic[a].severity +") "+chronic[a].duration;
		    	   }
	    	   }
	    	   /*for(var a in chronic){
	    		   chronic_name+= chronic[a].code_type+" ("+chronic[a].severity +") "+chronic[a].duration+", ";
	    	   }*/
	    	   document.getElementById("chronic_name").innerHTML = "<i class='ti-hand-point-right'></i>&nbsp;"+chronic_name+" .";
	       }
	       if(data.clinical_alerts.notifiable_diseases_detail.isDataPresent=="True"){
	       document.getElementById("notifydiseasediv").style.display=""; 
	       var disease_name ="";
	       var notify_disease = data.clinical_alerts.notifiable_diseases_detail.data;
	       for(var i = 0;i<notify_disease.length;i++){
	    	   if (i < (notify_disease.length - 1)) {
	    	   disease_name+=notify_disease[i].notifiable_disease_name+",&nbsp;";
	    	   }
	    	   else{
	    		   disease_name+=notify_disease[i].notifiable_disease_name;
	    	   }
	    	   
	    	  // if()
	    	   //console.log(notify_disease.length)
//	    	   for ( var a in notify_disease) {
//			    	  console.log(notify_disease[a].notifiable_disease_name);
//			    	 disease_name+=notify_disease[a].notifiable_disease_name+",";
//				}
	    	   
	       }
		   
		      document.getElementById("disease_name").innerHTML = "<i class='mdi mdi-alert-box blinking'>&nbsp; </i>"+"This Patient is "+disease_name+"." ;
	       }
	       
	       
	   } else {
	     console.log('error');
	   }
	 };

	 request.send();
	
	 
	 
	 //--------------------------------------for Problem diagonsis----------------------------------------//
	 var diagnosisrequest = new XMLHttpRequest();
	 diagnosisrequest.open('GET', '/eSushrutEHRServices/service/ehr/get/patient/diagnosis/all?crNo='+crno, true);
	 diagnosisrequest.onload = function () {
	   // Begin accessing JSON data here
	   var data = JSON.parse(this.response);
	   if (diagnosisrequest.status >= 200 && diagnosisrequest.status < 400) {
	       var diagnosis_detail = data.diagnosis_detail;
           console.log("encounters_list"+diagnosis_detail.brief.total);
           if(diagnosis_detail.brief.total==0){
        	   document.getElementById("diagnosisdiv").style.display="none"; 
        	   document.getElementById("nodiagnosisdiv").style.display=""; 
           }
           else {
        	   document.getElementById("diagnosistotal").innerHTML="<i class='ti-clipboard'></i>&nbsp;Problems ("+diagnosis_detail.brief.total+")";
             var diagnosis_name="";
             var diagnosis_Data_length = diagnosis_detail.recent.length;
             if(diagnosis_detail.brief.total>diagnosis_Data_length){
            	 document.getElementById("morediagonsis_details").style.display="";
             }
             var diagnosis = diagnosis_detail.recent;
		      for ( var a in diagnosis) {
		    	  console.log(diagnosis[a].disease_name);
		    	  diagnosis_name+="<i class='mdi mdi-account-heart'></i>&nbsp;"+"<h9 class='htag'>"+diagnosis[a].disease_name +"</h9> ("+diagnosis[a].diagnostic_type+") , "+diagnosis[a].record_date+"<br><br>";
			}
		      document.getElementById("diagnosis_name").innerHTML = diagnosis_name;
           }
	   } else {
	     console.log('error');
	   }
	 };

	 diagnosisrequest.send();
	 
	 
	 //--------------------------------------for Current Medication----------------------------------------//
	 var currentmedicationrequest = new XMLHttpRequest();
	 currentmedicationrequest.open('GET', '/eSushrutEHRServices/service/ehr/get/patient/medication/all?crNo='+crno, true);
	 currentmedicationrequest.onload = function () {
	   // Begin accessing JSON data here
	   var data = JSON.parse(this.response);
	   if (currentmedicationrequest.status >= 200 && currentmedicationrequest.status < 400) {
	       var medication_detail = data.medication_detail;
            document.getElementById("medicationtotal").innerHTML="<i class='ti-pencil-alt'></i>&nbsp;Current Medications ("+medication_detail.brief.total+")";
            var medication_Data_length = medication_detail.recent.length;
            if(medication_detail.brief.total>medication_Data_length){
           	 document.getElementById("moremedication_details").style.display="";
            }
           if(medication_detail.recent.length==0){
        	   document.getElementById("medicationdiv").style.display="none"; 
        	   document.getElementById("nomedicationdiv").style.display=""; 
           }
           else {
             var medication_name="";
             var medication = medication_detail.recent;
		      for ( var a in medication) {
		     medication_name+="<div class='col-sm-12'><h9 class='drugs'>"+medication[a].durg_name +"</h9>"+"<h10 class='h-17'> : advised on "+medication[a].advised_by.on_date+"</h10>&nbsp;"+"<h6 class='card-text'>"+ medication[a].dosage+"&nbsp;"+medication[a].frequency+",&nbsp;"+ medication[a].no_of_days+" Days"+"</h6></div>";
			}
		      document.getElementById("medicationdiv").innerHTML = medication_name;
           }
	   } else {
	     console.log('error');
	   }
	 };

	 currentmedicationrequest.send();
	 
	 //--------------------------------------for Vitals ----------------------------------------//
	 var vitalsrequest = new XMLHttpRequest();
	 vitalsrequest.open('GET', '/eSushrutEHRServices/service/ehr/get/patient/vitals/recent?crNo='+crno, true);
	 vitalsrequest.onload = function () {
	   // Begin accessing JSON data here
	   var data = JSON.parse(this.response);
	   if (vitalsrequest.status >= 200 && vitalsrequest.status < 400) {
	       var medication_detail = data.vitals_detail.recent;
	      // console.log("temp=----------------"+medication_detail.bmi.value);
          if(medication_detail.height.value=="" && medication_detail.weight.value=="" && medication_detail.temperature.value=="" && medication_detail.heart_rate.value=="" && medication_detail.bp.value=="" && medication_detail.bmi.value==""){
        	  document.getElementById("vitaldiv").style.display="none"; 
        	  document.getElementById("novitaldiv").style.display=""; 
          }
          else{
        	  // ---------------------------------For height--------------------------------------------------------------------//
        	  if(medication_detail.height.value!=""){
        		  document.getElementById("height_value").innerHTML= medication_detail.height.value + medication_detail.height.uom;
        	  if(medication_detail.height.record_date!=""){
        		  document.getElementById("height_record_date").innerHTML = medication_detail.height.record_date;
        	  }
        	  else{
        		  document.getElementById("height_record_datediv").style.display="none"; 
        	  }
        	  if(medication_detail.height.deviation_from_last =="Up"){
        	   document.getElementById("height_class").innerHTML = "<i class='mdi mdi-arrow-up-bold'></i>&nbsp;"+medication_detail.height.class;  
        	  }
        	  else if(medication_detail.height.deviation_from_last =="Down"){
           	   document.getElementById("height_class").innerHTML = "<i class='mdi mdi-arrow-down-bold'></i>&nbsp;"+medication_detail.height.class;  
           	  }
        	  else {
        		  document.getElementById("height_class").innerHTML = medication_detail.height.class;  
        	  }
        	  }
        	  
        	  else{
        		  document.getElementById("height_div").style.display="none";  
        	  }
        	  
        	  // ---------------------------------For Weight--------------------------------------------------------------------//
        	  if(medication_detail.weight.value!=""){
        		  document.getElementById("weight_value").innerHTML= medication_detail.weight.value + medication_detail.weight.uom;
        	  if(medication_detail.weight.record_date!=""){
        		  document.getElementById("weight_record_date").innerHTML = medication_detail.weight.record_date;
        	  }
        	  else{
        		  document.getElementById("weight_record_datediv").style.display="none"; 
        	  }
        	  if(medication_detail.weight.deviation_from_last =="Up"){
        	   document.getElementById("weight_class").innerHTML = "<i class='mdi mdi-arrow-up-bold'></i>&nbsp;"+medication_detail.weight.class;  
        	  }
        	  else if(medication_detail.weight.deviation_from_last =="Down"){
           	   document.getElementById("weight_class").innerHTML = "<i class='mdi mdi-arrow-down-bold'></i>&nbsp;"+medication_detail.weight.class;  
           	  }
        	  else {
        		  document.getElementById("weight_class").innerHTML = medication_detail.weight.class;  
        	  }
        	  }
        	  
        	  else{
        		  document.getElementById("weight_div").style.display="none";  
        	  }
        	  
        	  // ---------------------------------For temperature--------------------------------------------------------------------//
        	  if(medication_detail.temperature.value!=""){
        		  document.getElementById("temperature_value").innerHTML= medication_detail.temperature.value + medication_detail.temperature.uom;
        	  if(medication_detail.temperature.record_date!=""){
        		  document.getElementById("temperature_record_date").innerHTML = medication_detail.temperature.record_date;
        	  }
        	  else{
        		  document.getElementById("temperature_record_datediv").style.display="none"; 
        	  }
        	  if(medication_detail.temperature.deviation_from_last =="Up"){
        	   document.getElementById("temperature_class").innerHTML = "<i class='mdi mdi-arrow-up-bold'></i>&nbsp;"+medication_detail.temperature.class;  
        	  }
        	  else if(medication_detail.temperature.deviation_from_last =="Down"){
           	   document.getElementById("temperature_class").innerHTML = "<i class='mdi mdi-arrow-down-bold'></i>&nbsp;"+medication_detail.temperature.class;  
           	  }
        	  else {
        		  document.getElementById("temperature_class").innerHTML = medication_detail.temperature.class;  
        	  }
        	  }
        	  
        	  else{
        		  document.getElementById("temperature_div").style.display="none";  
        	  }
        	  
        	  // ---------------------------------For bp--------------------------------------------------------------------//
        	  if(medication_detail.bp.value!=""){
        		  document.getElementById("bp_value").innerHTML= medication_detail.bp.value + medication_detail.bp.uom;
        	  if(medication_detail.bp.record_date!=""){
        		  document.getElementById("bp_record_date").innerHTML = medication_detail.bp.record_date;
        	  }
        	  else{
        		  document.getElementById("bp_record_datediv").style.display="none"; 
        	  }
        	  if(medication_detail.bp.deviation_from_last =="Up"){
        	   document.getElementById("bp_class").innerHTML = "<i class='mdi mdi-arrow-up-bold'></i>&nbsp;"+medication_detail.bp.class;  
        	  }
        	  else if(medication_detail.bp.deviation_from_last =="Down"){
           	   document.getElementById("bp_class").innerHTML = "<i class='mdi mdi-arrow-down-bold'></i>&nbsp;"+medication_detail.bp.class;  
           	  }
        	  else {
        		  document.getElementById("bp_class").innerHTML = medication_detail.bp.class;  
        	  }
        	  }
        	  
        	  else{
        		  document.getElementById("bp_div").style.display="none";  
        	  }
        	  
        	  // ---------------------------------For bmi--------------------------------------------------------------------//
        	  if(medication_detail.bmi.value!=""){
        		  document.getElementById("bmi_value").innerHTML= medication_detail.bmi.value + medication_detail.bmi.uom;
        	  if(medication_detail.bmi.record_date!=""){
        		  document.getElementById("bmi_record_date").innerHTML = medication_detail.bmi.record_date;
        	  }
        	  else{
        		  document.getElementById("bmi_record_datediv").style.display="none"; 
        	  }
        	  if(medication_detail.bmi.deviation_from_last =="Up"){
        	   document.getElementById("bmi_class").innerHTML = "<i class='mdi mdi-arrow-up-bold'></i>&nbsp;"+medication_detail.bmi.class;  
        	  }
        	  else if(medication_detail.bmi.deviation_from_last =="Down"){
           	   document.getElementById("bmi_class").innerHTML = "<i class='mdi mdi-arrow-down-bold'></i>&nbsp;"+medication_detail.bmi.class;  
           	  }
        	  else {
        		  document.getElementById("bmi_class").innerHTML = medication_detail.bmi.class;  
        	  }
        	  }
        	  
        	  else{
        		  document.getElementById("bmi_div").style.display="none";  
        	  }
        	  
        	  // ---------------------------------For heart_rate--------------------------------------------------------------------//
        	  if(medication_detail.heart_rate.value!=""){
        		  document.getElementById("heart_rate_value").innerHTML= medication_detail.heart_rate.value + medication_detail.heart_rate.uom;
        	  if(medication_detail.heart_rate.record_date!=""){
        		  document.getElementById("heart_rate_record_date").innerHTML = medication_detail.heart_rate.record_date;
        	  }
        	  else{
        		  document.getElementById("heart_rate_record_datediv").style.display="none"; 
        	  }
        	  if(medication_detail.heart_rate.deviation_from_last =="Up"){
        	   document.getElementById("heart_rate_class").innerHTML = "<i class='mdi mdi-arrow-up-bold'></i>&nbsp;"+medication_detail.heart_rate.class;  
        	  }
        	  else if(medication_detail.heart_rate.deviation_from_last =="Down"){
           	   document.getElementById("heart_rate_class").innerHTML = "<i class='mdi mdi-arrow-down-bold'></i>&nbsp;"+medication_detail.heart_rate.class;  
           	  }
        	  else {
        		  document.getElementById("heart_rate_class").innerHTML = medication_detail.heart_rate.class;  
        	  }
        	  }
        	  
        	  else{
        		  document.getElementById("heart_rate_div").style.display="none";  
        	  }
          }
	   } else {
	     console.log('error');
	   }
	 };

	 vitalsrequest.send();
	 
	 //--------------------------------------for Last Encounter----------------------------------------//
	 var encounterrequest = new XMLHttpRequest();
	 encounterrequest.open('GET', '/eSushrutEHRServices/service/ehr/get/patient/encounters/all?crNo='+crno, true);
	 encounterrequest.onload = function () {
	   // Begin accessing JSON data here
	   var data = JSON.parse(this.response);
	   if (encounterrequest.status >= 200 && encounterrequest.status < 400) {
	       var encounters_list = data.encounters_list;
           if(encounters_list.brief.total==0){
        	   document.getElementById("encounterdiv").style.display="none"; 
        	   document.getElementById("noencounterdiv").style.display=""; 
           }
           else {
        	   document.getElementById("encountertotal").innerHTML="<i class='ti-pulse'></i>&nbsp;Last Encounter ("+encounters_list.brief.total+")";
             var cheif_complaint="";
             var visit_cheif_complaint="";
             var encounter_Data_length = encounters_list.recent.length;
             if(encounters_list.brief.total>encounter_Data_length){
            	 document.getElementById("moreencounter_details").style.display="";
             }
             var encounter = encounters_list.recent;
		      for ( var a in encounter) {
		    	  if(encounter[a].encounter_type =="IPD"){
		    		  document.getElementById("ipdencounter").style.display=""; 
		    		  if(encounter[a].is_current=="true"){
		    			  document.getElementById("hospitalstatus").innerHTML="Current Hospital Stay";
		    			  document.getElementById("currentstatus").innerHTML="<i class='mdi mdi-ambulance'></i>Admitted";
		    			  document.getElementById("deparment_name").innerHTML = encounter[a].department +" ("+encounter[a].unit+")";
		    			  document.getElementById("admitted_date").innerHTML = "Admitted on: "+encounter[a].admission_datetime;
                         
		    		  }
		    		  else{
		    			  document.getElementById("hospitalstatus").innerHTML="Last Hospital Stay";
		    			  document.getElementById("currentstatus").innerHTML="<i class='mdi mdi-ambulance'></i>Discharged";
		    			  document.getElementById("deparment_name").innerHTML = encounter[a].department +" ("+encounter[a].unit+")";
		    			  document.getElementById("admitted_date").innerHTML = "Admitted on: "+encounter[a].admission_datetime +" Discharged on: "+encounter[a].discharge_datetime;
		    		  }
		    		  
		    		  var encounter_reason = encounter[a].reason_of_encounter;
		    		  for(var b in encounter_reason){
                    	  if(encounter_reason[b].reason==""){
                    		  cheif_complaint = "N.A";
                    	  }
                    	  
                    	  else{
                    	  cheif_complaint= encounter_reason[b].reason ;
                    	  }
                    	  }
                      document.getElementById("chief_complaint").innerHTML = "Chief Complaint: "+cheif_complaint;
		    	  }
		    	  else{
		    		  document.getElementById("otherencounter").style.display=""; 
		    		  if(encounter[a].is_current=="true"){
		    			
		    		  document.getElementById("visitstatus").innerHTML="Current Visit";
		    		  }
		    		  else{
		    			  document.getElementById("visitstatus").innerHTML="Last Visit";
		    		  }
		    		  document.getElementById("currentvisitstatus").innerHTML=encounter[a].encounter_type;
		    		  document.getElementById("deparment_visit_name").innerHTML = encounter[a].department +" ("+encounter[a].unit+")";
		    		  document.getElementById("admitted_visit_date").innerHTML = "Visit Date: "+encounter[a].visit_date ;
		    		  var encounter_visit_reason = encounter[a].reason_of_encounter;
			    		
                      for(var b in encounter_visit_reason){
                    	  if(encounter_visit_reason[b].reason==""){
                    		  visit_cheif_complaint = "N.A";
                    	  }
                    	  
                    	  else{
                    	  visit_cheif_complaint= encounter_visit_reason[b].reason;
                    	  }
                    	  }
                      document.getElementById("visit_cheif_complaint").innerHTML = "Chief Complaint: "+visit_cheif_complaint;
		    	  }
			}
           }
	   } else {
	     console.log('error');
	   }
	 };
	 encounterrequest.send();
	 
	//--------------------------------------for recent investigation----------------------------------------//
	 var recentrequest = new XMLHttpRequest();
	 recentrequest.open('GET', '/eSushrutEHRServices/service/ehr/get/patient/investigations/all?crNo='+crno, true);
	 recentrequest.onload = function () {
	   // Begin accessing JSON data here
	   var data = JSON.parse(this.response);
	   if (recentrequest.status >= 200 && recentrequest.status < 400) {
	       var lab_detail = data.lab_detail;
           if(lab_detail.brief.total==0){
        	   document.getElementById("investogationdiv").style.display="none"; 
        	   document.getElementById("noinvestogationdiv").style.display=""; 
           }
           else {
        	   document.getElementById("investogationtotal").innerHTML="<i class='ti-filter'></i>&nbsp;Recent Investigations ("+lab_detail.brief.total+")";
             var lab_table="";
             var lab_Data_length = lab_detail.recent.length;
             if(lab_detail.brief.total>lab_Data_length){
            	 document.getElementById("more_details").style.display="";
             }
             for(var i=0;i<lab_Data_length;i++){
            	 if(lab_detail.recent[i].order_status=="Report Generated" || lab_detail.recent[i].order_status=="Result Printed"){
            	lab_table+=   "<tr><td>"+lab_detail.recent[i].test_date+"</td>"+"<td class='word-wrap'>"+lab_detail.recent[i].test_name+"</td>"+"<td>"+lab_detail.recent[i].order_status+"/<a class='actionButtonNational' onclick='reportpdf()'><img src='assets/images/dashboard/pdf.svg' ></a><div class='wrapperDivHidden'><input type='hidden' id='reqno' value='"+lab_detail.recent[i].requistion_no+"'></div><div class='wrapperDivHidden1'><input type='hidden' id='report_url' value='"+lab_detail.recent[i].report_url+"'></div>"+"</td></tr>";
            	 }
            	 else{
            	lab_table+=   "<tr><td>"+lab_detail.recent[i].test_date+"</td>"+"<td class='word-wrap'>"+lab_detail.recent[i].test_name+"</td>"+"<td>"+lab_detail.recent[i].order_status+"</td></tr>";
            	 }
            	 }
             if(lab_table != ""){
                 $("#table").append(lab_table);
                 $('#table').on('click','.actionButtonNational',function () {
                 	reqno = $(this).parents('td').find('.wrapperDivHidden input[type="hidden"]').val();
                     report_url = $(this).parents('td').find('.wrapperDivHidden1 input[type="hidden"]').val();

                     });
             }
           }
	   } else {
	     console.log('error');
	   }
	 };

	 recentrequest.send();
	 
	 
	
	 function reportpdf(){
		 /*reqno = document.getElementsByName("reqno")[0].value;
		 report_url = document.getElementsByName("report_url")[0].value;*/
//		 console.log(reqno +" "+report_url)
		 //"Show ID" for Associate Button Click
	   $("#investogationdiv").prepend('<div id="preloader" class="loading"></div>');
	/* */
		setTimeout(function(){
			
			 console.log(reqno+"  "+report_url);
	   
		var reportpdf = new XMLHttpRequest();
		reportpdf.open('GET', '/eSushrutEHRServices/service/ehr/get/lab/report?reqDno='+reqno+'&reportUrl='+report_url, true); 
		console.log(reqno+"     "+report_url);
		 reportpdf.onload = function () {
		  // Begin accessing JSON data here
		  var data = JSON.parse(this.response);
		  if (reportpdf.status >= 200 && reportpdf.status < 400) {
			  //console.log("hit")
			  $("#preloader").remove();
			 var b64 = data.lab_report.content.content_base64;
					// Embed the PDF into the HTML page and show it to the user
					
					// Insert a link that allows the user to download the PDF file
				$('#ex1').empty();
				$('#download').empty();
				  $("#mymodal").modal('show');
				var obj = document.createElement('object');
				 obj.style.width = '100%';
				obj.style.height = '100%'; 
				obj.type = 'application/pdf';
				obj.data =  'data:application/pdf;base64,'+b64;
				//document.getElementById("iframe").innerHTML = obj;
				// $("#ex1").html(obj);
				
				 document.getElementById("ex1").append(obj); 
			      ///document.body.appendChild(obj);
				
	                	var link = document.createElement('a');
				link.innerHTML = 'Download PDF file';
				link.download = 'LabReport.pdf';
				link.href = 'data:application/octet-stream;base64,' + b64;
				//$('#download').html(link);
				//document.body.appendChild(link);
				document.getElementById("download").appendChild(link); 
				
				
		  } else {
			    console.log('error');
			  }
			}; 
			reportpdf.send();
	
		},1000);}
	 
	 
	 
	