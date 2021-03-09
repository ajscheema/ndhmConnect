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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.cdac.ndhmConnect.FB.NdhmConnectFB;
import com.cdac.ndhmConnect.service.NdhmConsentService;

@Controller
@RequestMapping( value = "/ndhm-consentform")
public class NdhmConsentController {
	
	@Autowired
	private NdhmConsentService ndhmConsentService;

//	@RequestMapping(value = {"*",""}, method = RequestMethod.GET)
	//@RequestMapping("/consentform")
	@RequestMapping(value = {"*", ""}, method = RequestMethod.GET)
	public ModelAndView showForm() { 
		return new ModelAndView("consentform", "NdhmConnectFB", new NdhmConnectFB()); 
	}
	 
   
	@GetMapping("/save-consentData")
	public ResponseEntity<?> saveConsentData( NdhmConnectFB ndhmConnectFB,HttpServletRequest request, HttpServletResponse response) throws IOException, KeyManagementException, NoSuchAlgorithmException, ParseException {
		System.out.println("getPatientDemographics:patientDiscoveryRequestFb::------------------------------------" + ndhmConnectFB);
				String patientsaveConsentJsonStr=ndhmConsentService.saveConsentData(ndhmConnectFB,request,response);
		
		return  new ResponseEntity<>( patientsaveConsentJsonStr, HttpStatus.OK);
	}
	
	@PostMapping("/fetch-consentData")
	public ResponseEntity<?> fetchConsentData( NdhmConnectFB ndhmConnectFB,HttpServletRequest request, HttpServletResponse response) throws IOException, KeyManagementException, NoSuchAlgorithmException {
		System.out.println("getPatientDemographics:patientDiscoveryRequestFb::------------------------------------" + ndhmConnectFB);
				String patientfetchConsentJsonStr=ndhmConsentService.fetchConsentData(ndhmConnectFB,request,response);
		
		return  new ResponseEntity<>( patientfetchConsentJsonStr, HttpStatus.OK);
	}
	
	@PostMapping("/fetch-fhirData")
	public ResponseEntity<?> fetchFHIRDATA( NdhmConnectFB ndhmConnectFB,HttpServletRequest request, HttpServletResponse response) throws IOException, KeyManagementException, NoSuchAlgorithmException {
		System.out.println("getPatientDemographics:patientDiscoveryRequestFb::------------------------------------" + ndhmConnectFB);
				String patientfhirJsonStr=ndhmConsentService.fetchFHIRDATA(ndhmConnectFB,request,response);
		
		return  new ResponseEntity<>( patientfhirJsonStr, HttpStatus.OK);
	}
	
	@PostMapping("/view-fhirData")
	public ResponseEntity<?> viewFhirDetails( NdhmConnectFB ndhmConnectFB,HttpServletRequest request, HttpServletResponse response) throws IOException {
		System.out.println("getPatientDemographics:patientDiscoveryRequestFb::------------------------------------" + ndhmConnectFB);
				String viewfhirJsonStr=ndhmConsentService.viewFhirDetails(ndhmConnectFB,request,response);
		
		return  new ResponseEntity<>( viewfhirJsonStr, HttpStatus.OK);
	}
	
	@PostMapping("/fetch-episodesData")
	public ResponseEntity<?> getEpisodesData( NdhmConnectFB ndhmConnectFB,HttpServletRequest request, HttpServletResponse response) throws IOException, KeyManagementException, NoSuchAlgorithmException {
		System.out.println("getPatientDemographics:patientDiscoveryRequestFb::------------------------------------" + ndhmConnectFB);
				String getEpisodesrJsonStr=ndhmConsentService.getEpisodesData(ndhmConnectFB,request,response);
		
		return  new ResponseEntity<>( getEpisodesrJsonStr, HttpStatus.OK);
	}
	
	@PostMapping("/view-episodesData")
	public ResponseEntity<?> viewEpisodesReports( NdhmConnectFB ndhmConnectFB,HttpServletRequest request, HttpServletResponse response) throws IOException, KeyManagementException, NoSuchAlgorithmException {
		System.out.println("getPatientDemographics:patientDiscoveryRequestFb::------------------------------------" + ndhmConnectFB);
				String viewepisodesJsonStr=ndhmConsentService.viewEpisodesReports(ndhmConnectFB,request,response);
		
		return  new ResponseEntity<>( viewepisodesJsonStr, HttpStatus.OK);
	}
	
}
