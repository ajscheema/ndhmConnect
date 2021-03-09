var episode_code;
var visitNo;
var recentrequest = new XMLHttpRequest();
recentrequest.open('GET', 'http://10.10.10.142:8080/eSushrutEHRServices/service/ehr/get/patient/encounters/all?crNo='+219172000005224, true);
recentrequest.onload = function () {
  // Begin accessing JSON data here
 var data = JSON.parse(this.response);
  if (recentrequest.status >= 200 && recentrequest.status < 400) {
      var encounters_list = data.encounters_list;
	     var data_length = encounters_list.all_data.length;
	     var encounters_list_table="";
	     var encounters_ipd_list_table="";
	      for ( var i=0; i<data_length; i++ ) {
		      
		    if(encounters_list.all_data[i].encounter_type=="IPD"){
			    
			    if(encounters_list.all_data[i].isDischargePresent=="true"){
				    episode_code = encounters_list.all_data[i].episode_code;
				    visitNo = encounters_list.all_data[i].episode_visit_no;
			    	//dischargepdf();
			    	encounters_ipd_list_table+= "<tr><td>"+encounters_list.all_data[i].admission_datetime+"</td>"+"<td>"+encounters_list.all_data[i].department +" ("+encounters_list.all_data[i].unit+")"+"</td>"+"<td>"+encounters_list.all_data[i].encounter_status+"</td>"+"<td>"+encounters_list.all_data[i].ward+"/"+encounters_list.all_data[i].room+"/"+encounters_list.all_data[i].bed+"<td>"+"<a href='NewFile.html'><label class='badge badge-gradient-success'>View</label></a>"+"</td></tr>";    
					    
				    }
			    else {
			    	encounters_ipd_list_table+= "<tr><td>"+encounters_list.all_data[i].admission_datetime+"</td>"+"<td>"+encounters_list.all_data[i].department +" ("+encounters_list.all_data[i].unit+")"+"</td>"+"<td>"+encounters_list.all_data[i].encounter_status+"</td>"+"<td class='word-wrap'>"+encounters_list.all_data[i].ward+"/"+encounters_list.all_data[i].room+"/"+encounters_list.all_data[i].bed+"<td>"+"-"+"</td></tr>";    
					    
				    }
	 	      }
		   
		    else {
			     encounters_list_table+= "<tr><td>"+encounters_list.all_data[i].visit_date+"</td>"+"<td>"+encounters_list.all_data[i].department +" ("+encounters_list.all_data[i].unit+")"+"</td>"+"<td>"+encounters_list.all_data[i].department +" ("+encounters_list.all_data[i].unit+")"+"</td>"+"<td>"+encounters_list.all_data[i].discharge_datetime+"</td></tr>";    
		          
			    }
	      }
	     if(encounters_list != ""){
                $("#ipdexample").append(encounters_ipd_list_table);
                $('#ipdexample').DataTable();
                $("#opdexample").append(encounters_list_table);
                $('#opdexample').DataTable();
            }
	     

  } else {
    console.log('error');
  }
};


var dischargepdf = new XMLHttpRequest();
dischargepdf.open('GET', '/eSushrutEHRServices/service/ehr/get/patient/discharge?crNo='+219172000005224+'&episodeCode='+episode_code+'&visitNo='+visitNo, true);
dischargepdf.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (dischargepdf.status >= 200 && dischargepdf.status < 400) {
	 var b64 = data.Discharge.content.content_source;
	 var bin = atob(b64);
		// Embed the PDF into the HTML page and show it to the user
		var obj = document.createElement('object');
		obj.style.width = '100%';
		obj.style.height = '842pt';
		obj.type = 'application/pdf';
		obj.data = 'data:application/pdf;base64,' + b64;
		document.body.appendChild(obj);
		

		// Insert a link that allows the user to download the PDF file
		var link = document.createElement('a');
		link.innerHTML = 'Download PDF file';
		link.download = 'file.pdf';
		link.href = 'data:application/octet-stream;base64,' + b64;
		document.body.appendChild(link);
  } else {
	    console.log('error');
	  }
	};

	dischargepdf.send();


recentrequest.send();

		  