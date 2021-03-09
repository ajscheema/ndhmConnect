package com.cdac.ndhmConnect.service;

import org.springframework.beans.factory.annotation.Autowired;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.cert.X509Certificate;
/*import java.text.ParseException;
*/
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Set;
import java.util.UUID;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.cdac.ndhmConnect.FB.NdhmConnectFB;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

@Service
public class NdhmConsentService {
	
	@Autowired
	private   HRSMultiMapper hRSMultiMapper;
	
	@Autowired
	private   HRSDataFetchConfig hRSDataFetchConfig;

	@SuppressWarnings("unchecked")
	public  String saveConsentData(NdhmConnectFB ndhmConnectFB, HttpServletRequest request, HttpServletResponse response)
			throws IOException, NoSuchAlgorithmException, KeyManagementException, ParseException {
		String uuid1 = UUID.randomUUID().toString();
		String saveConsentData = null;
		String request_id = uuid1;
		String patHospitalHealthId = request.getParameter("patHospitalHealthId");
		String hospitalCode = patHospitalHealthId.substring(0, 5);
		String patNdhmHealthId = request.getParameter("patNdhmHealthId");
		String patNdhmPurpose = request.getParameter("patNdhmPurpose");
		String patNdhmPurposeCode = request.getParameter("patNdhmPurposeCode");
		String healthInfoTo = request.getParameter("healthInfoTo");
		String healthInfoFrom = request.getParameter("healthInfoFrom");
		String healthExpiry = request.getParameter("consentdate");
		String healthInfoType = request.getParameter("array");
		if (patHospitalHealthId.length() <= 12) {
			hospitalCode = "101";
		}
		SSLContext context = SSLContext.getInstance("TLSv1.2");
		TrustManager[] trustManager = new TrustManager[] { new X509TrustManager() {
			public X509Certificate[] getAcceptedIssuers() {
				return new X509Certificate[0];
			}

			public void checkClientTrusted(X509Certificate[] certificate, String str) {
			}

			public void checkServerTrusted(X509Certificate[] certificate, String str) {
			}
		} };
		context.init(null, trustManager, new SecureRandom());
		HttpsURLConnection.setDefaultSSLSocketFactory(context.getSocketFactory());
		String url = hRSMultiMapper.getHISUrlByHospitalCode(hospitalCode);
		if (url == null || url.equals("")) {
			hospitalCode = patHospitalHealthId.substring(0, 6);
			url = hRSMultiMapper.getHISUrlByHospitalCode(hospitalCode);

		}
		System.out.println("hospitalCode==============" + hospitalCode);
		System.setProperty("https.protocols", "TLSv1,TLSv1.1,TLSv1.2");
		URL obj = new URL(url + "/consentform/save-consentpatdata");
		//URL obj = new URL("a");
		System.out.println("obj-------------------" + obj);
		HttpURLConnection postConnection = (HttpURLConnection) obj.openConnection();
		postConnection.setRequestMethod("POST");
		postConnection.setRequestProperty("Content-type", "application/json;charset=UTF-8");
		postConnection.setRequestProperty("Accept", "application/json");
		JSONObject getConsentDetailJson = new JSONObject();
		getConsentDetailJson.put("hospitalCode", hospitalCode);
		getConsentDetailJson.put("patHospitalHealthId", patHospitalHealthId);
		getConsentDetailJson.put("request_id", request_id);
		getConsentDetailJson.put("patNdhmHealthId", patNdhmHealthId);
		getConsentDetailJson.put("patNdhmPurpose", patNdhmPurpose);
		getConsentDetailJson.put("patNdhmPurposeCode", patNdhmPurposeCode);
		getConsentDetailJson.put("healthInfoTo", healthInfoTo);
		getConsentDetailJson.put("healthInfoFrom", healthInfoFrom);
		getConsentDetailJson.put("healthExpiry", healthExpiry);
		getConsentDetailJson.put("status", "1");
		getConsentDetailJson.put("healthInfoType", healthInfoType);
		getConsentDetailJson.put("consentId", "");

		String jsonInputString = getConsentDetailJson.toJSONString();
		byte[] out = jsonInputString.getBytes("utf-8");
		System.out.println("sending data====================" + jsonInputString);
		postConnection.setDoOutput(true);
		try (OutputStream os = postConnection.getOutputStream()) {
			os.write(out);
		}

		int responseCode = postConnection.getResponseCode();

		if (responseCode == 200) { // success
			BufferedReader in = new BufferedReader(new InputStreamReader(postConnection.getInputStream()));
			String inputLine;
			StringBuffer responses = new StringBuffer();
			while ((inputLine = in.readLine()) != null) {
				responses.append(inputLine);
			}
			in.close();
			System.out.println(responses);
			saveConsentData = responses.toString();

		} else {
			System.out.println("POST NOT WORKED");
		}
		return saveConsentData;
	}
	
	
	@SuppressWarnings("unchecked")
	public  String fetchConsentData(NdhmConnectFB ndhmConnectFB, HttpServletRequest request, HttpServletResponse response)
			throws IOException, NoSuchAlgorithmException, KeyManagementException {
		String consentpatDetails = null;
		String patHospitalHealthId = request.getParameter("patHospitalHealthId");
		String hospitalCode = patHospitalHealthId.substring(0, 5);

		SSLContext context = SSLContext.getInstance("TLSv1.2");
		TrustManager[] trustManager = new TrustManager[] { new X509TrustManager() {
			public X509Certificate[] getAcceptedIssuers() {
				return new X509Certificate[0];
			}

			public void checkClientTrusted(X509Certificate[] certificate, String str) {
			}

			public void checkServerTrusted(X509Certificate[] certificate, String str) {
			}
		} };
		context.init(null, trustManager, new SecureRandom());
		HttpsURLConnection.setDefaultSSLSocketFactory(context.getSocketFactory());
		if (patHospitalHealthId.length() <= 12) {
			hospitalCode = "101";
		}

		String url = hRSMultiMapper.getHISUrlByHospitalCode(hospitalCode);
		if (url == null || url.equals("")) {
			patHospitalHealthId = patHospitalHealthId.substring(0, 6);
			url = hRSMultiMapper.getHISUrlByHospitalCode(patHospitalHealthId);

		}
		System.out.println("hospitalCode==============" + patHospitalHealthId);
		System.setProperty("https.protocols", "TLSv1,TLSv1.1,TLSv1.2");
		URL obj = new URL(url + "/consentform/fetch");

		System.out.println("obj-------------------" + obj);
		HttpURLConnection postConnection = (HttpURLConnection) obj.openConnection();
		postConnection.setRequestMethod("POST");
		postConnection.setRequestProperty("Content-type", "application/json;charset=UTF-8");
		postConnection.setRequestProperty("Accept", "application/json");
		JSONObject getConsentPatJSON = new JSONObject();
		getConsentPatJSON.put("hospitalCode", hospitalCode);
		getConsentPatJSON.put("crNumber", patHospitalHealthId);

		String jsonInputString = getConsentPatJSON.toJSONString();
		byte[] out = jsonInputString.getBytes("utf-8");
		System.out.println("sending data====================" + jsonInputString);
		postConnection.setDoOutput(true);
		try (OutputStream os = postConnection.getOutputStream()) {
			os.write(out);
		}

		int responseCode = postConnection.getResponseCode();

		if (responseCode == 200) { // success
			BufferedReader in = new BufferedReader(new InputStreamReader(postConnection.getInputStream()));
			String inputLine;
			StringBuffer responses = new StringBuffer();
			while ((inputLine = in.readLine()) != null) {
				responses.append(inputLine);
			}
			in.close();
			System.out.println(responses);
			consentpatDetails = responses.toString();

		} else {
			System.out.println("POST NOT WORKED");
		}
		return consentpatDetails;
	}

	
	@SuppressWarnings("unchecked")
	public  String fetchFHIRDATA(NdhmConnectFB ndhmConnectFB, HttpServletRequest request, HttpServletResponse response)
			throws IOException, NoSuchAlgorithmException, KeyManagementException {
		String consentpatDetails = null;
		String fhir_patNdhmHealthId = request.getParameter("fhir_patNdhmHealthId");
		String patHospitalHealthId = request.getParameter("patHospitalHealthId");
		String hospitalCode = patHospitalHealthId.substring(0, 5);
		String fhir_patNdhmHealthConsentId = request.getParameter("fhir_patNdhmHealthConsentId");

		if (patHospitalHealthId.length() <= 12) {
			hospitalCode = "101";
		}
		SSLContext context = SSLContext.getInstance("TLSv1.2");
		TrustManager[] trustManager = new TrustManager[] { new X509TrustManager() {
			public X509Certificate[] getAcceptedIssuers() {
				return new X509Certificate[0];
			}

			public void checkClientTrusted(X509Certificate[] certificate, String str) {
			}

			public void checkServerTrusted(X509Certificate[] certificate, String str) {
			}
		} };
		context.init(null, trustManager, new SecureRandom());
		HttpsURLConnection.setDefaultSSLSocketFactory(context.getSocketFactory());
		String url = hRSMultiMapper.getHISUrlByHospitalCode(hospitalCode);
		if (url == null || url.equals("")) {
			hospitalCode = patHospitalHealthId.substring(0, 6);
			url = hRSMultiMapper.getHISUrlByHospitalCode(hospitalCode);
		}
		System.out.println("hospitalCode==============" + hospitalCode);
		System.setProperty("https.protocols", "TLSv1,TLSv1.1,TLSv1.2");
		URL obj = new URL(url + "/consentform/get-pat-fhirdata");
		System.out.println("obj-----------------" + obj);
		HttpURLConnection postConnection = (HttpURLConnection) obj.openConnection();
		// URLConnection postConnection = obj.openConnection();
		postConnection.setRequestMethod("POST");
		postConnection.setRequestProperty("Content-type", "application/json;charset=UTF-8");
		postConnection.setRequestProperty("Accept", "application/json");

		JSONObject getfhirpatJson = new JSONObject();
		getfhirpatJson.put("patNdhmHealthId", fhir_patNdhmHealthId);
		getfhirpatJson.put("consentId", fhir_patNdhmHealthConsentId);
		getfhirpatJson.put("patHospitalHealthId", patHospitalHealthId);
		getfhirpatJson.put("crNumber", patHospitalHealthId);
		String jsonInputString = getfhirpatJson.toJSONString();

		// String jsonInputString = "{\"patNdhmHealthId\":\"" + fhir_patNdhmHealthId +
		// "\",\"consentId\":\""+ fhir_patNdhmHealthConsentId + "\",\"crNumber\":\"" +
		// crNo + "\"}";
		byte[] out = jsonInputString.getBytes("utf-8");
		System.out.println("sending data====================" + jsonInputString);
		postConnection.setDoOutput(true);
		try (OutputStream os = postConnection.getOutputStream()) {
			os.write(out);
		}

		int responseCode = postConnection.getResponseCode();

		if (responseCode == 200) { // success
			BufferedReader in = new BufferedReader(new InputStreamReader(postConnection.getInputStream()));
			String inputLine = "";
			StringBuffer responses = new StringBuffer();
			while ((inputLine = in.readLine()) != null) {
				responses.append(inputLine);
			}
			in.close();
			consentpatDetails = responses.toString();
			System.out.println("consentpatDetails===========" + consentpatDetails);
		} else {
			System.out.println("POST NOT WORKED");
		}
		return consentpatDetails;
	}

	public  String viewFhirDetails(NdhmConnectFB ndhmConnectFB, HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		String firdetails = null;
		String fhirBundle = request.getParameter("fhirBundle");
		System.out.println("fhirBundle-----------" + fhirBundle);
		System.setProperty("https.protocols", "TLSv1,TLSv1.1,TLSv1.2");
		URL obj = new URL("http://10.10.10.150:8082/eSushrutFHIRServices/fhir/bundle/data");
		HttpURLConnection postConnection = (HttpURLConnection) obj.openConnection();
		postConnection.setRequestMethod("POST");
		postConnection.setRequestProperty("Content-type", "application/json;charset=UTF-8");
		postConnection.setRequestProperty("Accept", "application/json");
		String jsonInputString = fhirBundle;
		System.out.println("sending data--------------------------------" + jsonInputString);
		byte[] out = jsonInputString.getBytes("utf-8");
		postConnection.setDoOutput(true);
		try (OutputStream os = postConnection.getOutputStream()) {
			os.write(out);
		}
		int responseCode = postConnection.getResponseCode();

		if (responseCode == 200) { // success
			BufferedReader in = new BufferedReader(new InputStreamReader(postConnection.getInputStream()));
			String inputLine;
			StringBuffer responses = new StringBuffer();
			while ((inputLine = in.readLine()) != null) {
				responses.append(inputLine);
			}
			in.close();
			firdetails = responses.toString();
			System.out.println("ndhmdetails---------------------------------" + firdetails);
		} else {
			System.out.println("POST NOT WORKED");
		}

		return firdetails;
	}

	
	@SuppressWarnings("unchecked")
	public  String getEpisodesData(NdhmConnectFB ndhmConnectFB, HttpServletRequest request, HttpServletResponse response)
			throws IOException, NoSuchAlgorithmException, KeyManagementException {
		String ipdopdCurrentdetails = null;
		String patHospitalHealthId = request.getParameter("patHospitalHealthId");
		String hospitalCode = patHospitalHealthId.substring(0, 5);

		SSLContext context = SSLContext.getInstance("TLSv1.2");
		TrustManager[] trustManager = new TrustManager[] { new X509TrustManager() {
			public X509Certificate[] getAcceptedIssuers() {
				return new X509Certificate[0];
			}

			public void checkClientTrusted(X509Certificate[] certificate, String str) {
			}

			public void checkServerTrusted(X509Certificate[] certificate, String str) {
			}
		} };
		context.init(null, trustManager, new SecureRandom());
		HttpsURLConnection.setDefaultSSLSocketFactory(context.getSocketFactory());

		if (patHospitalHealthId.length() <= 12) {
			hospitalCode = "101";
		}

		String url = hRSMultiMapper.getHISUrlByHospitalCode(hospitalCode);
		if (url == null || url.equals("")) {
			hospitalCode = patHospitalHealthId.substring(0, 6);
			url = hRSMultiMapper.getHISUrlByHospitalCode(hospitalCode);
		}

		System.out.println("hospitalCode==============" + hospitalCode);

		System.setProperty("https.protocols", "TLSv1,TLSv1.1,TLSv1.2");
		URL obj = new URL(url + "/patient/care-context/episodes-list");
		// URL obj = new
		// URL("http://10.226.20.182:8380/HISNDHMService/restapi/consentform/get-IPD-OPD-Currentdata");
		HttpURLConnection postConnection = (HttpURLConnection) obj.openConnection();
		postConnection.setRequestMethod("POST");
		postConnection.setRequestProperty("Content-type", "application/json;charset=UTF-8");
		postConnection.setRequestProperty("Accept", "application/json");

		JSONObject getCurrentIPDOPDJson = new JSONObject();
		getCurrentIPDOPDJson.put("patHospitalHealthId", patHospitalHealthId);
		String jsonInputString = getCurrentIPDOPDJson.toJSONString();

		// String jsonInputString ="{\"crNumber\":\"" +crno +"\"}" ;
		System.out.println("sending data--------------------------------" + jsonInputString);
		byte[] out = jsonInputString.getBytes("utf-8");
		postConnection.setDoOutput(true);
		try (OutputStream os = postConnection.getOutputStream()) {
			os.write(out);
		}
		int responseCode = postConnection.getResponseCode();
		System.out.println(responseCode);
		if (responseCode == 200) { // success
			BufferedReader in = new BufferedReader(new InputStreamReader(postConnection.getInputStream()));
			String inputLine;
			StringBuffer responses = new StringBuffer();
			while ((inputLine = in.readLine()) != null) {
				responses.append(inputLine);
			}
			in.close();
			ipdopdCurrentdetails = responses.toString();
			System.out.println("ndhmdetails---------------------------------" + ipdopdCurrentdetails);
		} else {
			System.out.println("POST NOT WORKED");
		}

		return ipdopdCurrentdetails;
	}

	@SuppressWarnings("unchecked")
	public  String viewEpisodesReports(NdhmConnectFB ndhmConnectFB, HttpServletRequest request, HttpServletResponse response)
			throws IOException, NoSuchAlgorithmException, KeyManagementException {
		String reportdetails = null;
		String patHospitalHealthId = request.getParameter("patHospitalHealthId");
		String encounterType = request.getParameter("encounterType");
		String episodeCode = request.getParameter("episodeCode");
		String visitNo = request.getParameter("visitNo");
		String admissionNo = request.getParameter("admissionNo");
		System.out.println("encounterType");
		System.out.println("episodeCode");
		System.out.println("visitNo");

		SSLContext context = SSLContext.getInstance("TLSv1.2");
		TrustManager[] trustManager = new TrustManager[] { new X509TrustManager() {
			public X509Certificate[] getAcceptedIssuers() {
				return new X509Certificate[0];
			}

			public void checkClientTrusted(X509Certificate[] certificate, String str) {
			}

			public void checkServerTrusted(X509Certificate[] certificate, String str) {
			}
		} };
		context.init(null, trustManager, new SecureRandom());
		HttpsURLConnection.setDefaultSSLSocketFactory(context.getSocketFactory());

		String hospitalCode = patHospitalHealthId.substring(0, 5);
		if (patHospitalHealthId.length() <= 12) {
			hospitalCode = "101";
		}

		String url = hRSDataFetchConfig.getHISUrlByHospitalCode(hospitalCode);
		if (url == null || url.equals("")) {
			hospitalCode = patHospitalHealthId.substring(0, 6);
			url = hRSDataFetchConfig.getHISUrlByHospitalCode(hospitalCode);
		}

		System.out.println("hospitalCode==============" + hospitalCode);

		System.setProperty("https.protocols", "TLSv1,TLSv1.1,TLSv1.2");
		URL obj = new URL(url);
		HttpURLConnection postConnection = (HttpURLConnection) obj.openConnection();
		postConnection.setRequestMethod("POST");
		postConnection.setRequestProperty("Content-type", "application/json;charset=UTF-8");
		postConnection.setRequestProperty("Accept", "application/json");

		JSONObject getCurrentIPDOPDJson = new JSONObject();
		getCurrentIPDOPDJson.put("patHospitalHealthId", patHospitalHealthId);
		getCurrentIPDOPDJson.put("hospitalCode", hospitalCode);
		getCurrentIPDOPDJson.put("encounterType", encounterType);
		getCurrentIPDOPDJson.put("episodeCode", episodeCode);
		getCurrentIPDOPDJson.put("visitNo", visitNo);
		getCurrentIPDOPDJson.put("admissionNo", admissionNo);
		/*
		 * getCurrentIPDOPDJson.put("patHospitalHealthId", "379132000008201");
		 * getCurrentIPDOPDJson.put("hospitalCode", hospitalCode);
		 * getCurrentIPDOPDJson.put("encounterType", "OPD");
		 * getCurrentIPDOPDJson.put("episodeCode", "10511001");
		 * getCurrentIPDOPDJson.put("visitNo", "2");
		 * getCurrentIPDOPDJson.put("admissionNo", admissionNo);
		 */

		String jsonInputString = getCurrentIPDOPDJson.toJSONString();

		// String jsonInputString ="{\"crNumber\":\"" +crno +"\"}" ;
		System.out.println("sending data--------------------------------" + jsonInputString);
		byte[] out = jsonInputString.getBytes("utf-8");
		postConnection.setDoOutput(true);
		try (OutputStream os = postConnection.getOutputStream()) {
			os.write(out);
		}
		int responseCode = postConnection.getResponseCode();
		System.out.println(responseCode);
		if (responseCode == 200) { // success
			BufferedReader in = new BufferedReader(new InputStreamReader(postConnection.getInputStream()));
			String inputLine;
			StringBuffer responses = new StringBuffer();
			while ((inputLine = in.readLine()) != null) {
				responses.append(inputLine);
			}
			in.close();
			reportdetails = responses.toString();
			System.out.println("ndhmdetails---------------------------------" + reportdetails);
		} else {
			System.out.println("POST NOT WORKED");
		}

		return reportdetails;
	}

}
