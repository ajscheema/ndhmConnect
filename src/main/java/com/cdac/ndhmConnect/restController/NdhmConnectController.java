package com.cdac.ndhmConnect.restController;

import java.io.IOException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.cdac.ndhmConnect.FB.NdhmConnectFB;
import com.cdac.ndhmConnect.service.NdhmConnectUTIL;

@Controller
@RequestMapping( value = "/ndhm-linkage")

public class NdhmConnectController {

@Autowired
private NdhmConnectUTIL ndhmConnectUTIL;

@RequestMapping(value = {"*", ""}, method = RequestMethod.GET)
public ModelAndView showForm() {
    return new ModelAndView("ndhmConnect", "NdhmConnectFB", new NdhmConnectFB());
}

	@PostMapping("/patient-demographics")
	public ResponseEntity<?> getPatientDemographics( NdhmConnectFB ndhmConnectFB,HttpServletRequest request, HttpServletResponse response) throws KeyManagementException, NoSuchAlgorithmException, IOException {
		System.out.println("getPatientDemographics:patientDiscoveryRequestFb::------------------------------------" + ndhmConnectFB);
				String patientDemographicsJsonStr=ndhmConnectUTIL.getPatientDemographics(ndhmConnectFB,request,response);
		
		return  new ResponseEntity<>( patientDemographicsJsonStr, HttpStatus.OK);
	}
	
	@PostMapping("/on-init1")
	public ResponseEntity<?> getPatientOTPDetails( NdhmConnectFB ndhmConnectFB,HttpServletRequest request, HttpServletResponse response) throws KeyManagementException, NoSuchAlgorithmException, IOException {
		System.out.println("getPatientDemographics:patientDiscoveryRequestFb::------------------------------------" + ndhmConnectFB);
				String patientOtpDetailJsonStr=ndhmConnectUTIL.getPatientOTPDetails(ndhmConnectFB,request,response);
		
		return  new ResponseEntity<>( patientOtpDetailJsonStr, HttpStatus.OK);
	}
	
	@PostMapping("/on-confirm")
	public ResponseEntity<?> getPatientOnConfirmDetail( NdhmConnectFB ndhmConnectFB,HttpServletRequest request, HttpServletResponse response) throws IOException {
		System.out.println("getPatientDemographics:patientDiscoveryRequestFb::------------------------------------" + ndhmConnectFB);
				String patientonconfirmDetaillJsonStr=ndhmConnectUTIL.getPatientOnConfirmDetail(ndhmConnectFB,request,response);
		
		return  new ResponseEntity<>( patientonconfirmDetaillJsonStr, HttpStatus.OK);
	}
	
	@PostMapping("/save-ndhmpat")
	public ResponseEntity<?> savendhmpatDetails( NdhmConnectFB ndhmConnectFB,HttpServletRequest request, HttpServletResponse response) throws IOException, KeyManagementException, NoSuchAlgorithmException {
		System.out.println("getPatientDemographics:patientDiscoveryRequestFb::------------------------------------" + ndhmConnectFB);
				String patientsavendhmpatJsonStr=ndhmConnectUTIL.savendhmpatDetails(ndhmConnectFB,request,response);
		
		return  new ResponseEntity<>( patientsavendhmpatJsonStr, HttpStatus.OK);
	}
	
	@PostMapping("/verify-healthid")
	public ResponseEntity<?> verifyPatNdhmHealthId( NdhmConnectFB ndhmConnectFB,HttpServletRequest request, HttpServletResponse response) throws IOException{
              System.out.println("getPatientDemographics:patientDiscoveryRequestFb::------------------------------------" + ndhmConnectFB);
				String getverifyJsonStr=ndhmConnectUTIL.verifyPatNdhmHealthId(ndhmConnectFB,request,response);
		
		return  new ResponseEntity<>( getverifyJsonStr, HttpStatus.OK);
	}
	
	@PostMapping("/only-savepatdetails")
	public ResponseEntity<?> onlySavePatDetails( NdhmConnectFB ndhmConnectFB,HttpServletRequest request, HttpServletResponse response) throws IOException, KeyManagementException, NoSuchAlgorithmException, ParseException{
              System.out.println("getPatientDemographics:patientDiscoveryRequestFb::------------------------------------" + ndhmConnectFB);
				String getpatsaveJson=ndhmConnectUTIL.onlySavePatDetails(ndhmConnectFB,request,response);
		
		return  new ResponseEntity<>( getpatsaveJson, HttpStatus.OK);
	}
}
