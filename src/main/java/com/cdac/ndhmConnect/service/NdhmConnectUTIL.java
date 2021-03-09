package com.cdac.ndhmConnect.service;

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

import me.xdrop.fuzzywuzzy.FuzzySearch;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
import org.json.simple.parser.ParseException;


@Service
public class NdhmConnectUTIL {
	
	@Autowired
	private   HRSMultiMapper hRSMultiMapper;


	@SuppressWarnings("unchecked")
	public String getPatientDemographics(NdhmConnectFB ndhmConnectFB, HttpServletRequest request, HttpServletResponse response ) throws NoSuchAlgorithmException, KeyManagementException, IOException {
		
		String crnodetail = null;
		String patHospitalHealthId = request.getParameter("crNo");
		String hospitalCode = patHospitalHealthId.substring(0, 5);
		// String hospitalCode = request.getParameter("hospitalCode");
		String searchType = request.getParameter("searchType");
		System.setProperty("https.protocols", "TLSv1,TLSv1.1,TLSv1.2");
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
		URL obj = new URL(url + "/patient/demographics/fetch");
		HttpURLConnection postConnection = (HttpURLConnection) obj.openConnection();
		// URLConnection postConnection = obj.openConnection();
		postConnection.setRequestMethod("POST");
		postConnection.setRequestProperty("Content-type", "application/json;charset=UTF-8");
		postConnection.setRequestProperty("Accept", "application/json");
		JSONObject demographicsdetail = new JSONObject();
		demographicsdetail.put("patHospitalHealthId", patHospitalHealthId);
		demographicsdetail.put("searchType", searchType);
		String jsonInputString = demographicsdetail.toJSONString();

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
			crnodetail = responses.toString();
		} else {
			System.out.println("POST NOT WORKED");
		}
		return crnodetail;
	}
	
	@SuppressWarnings("unchecked")
	public String getPatientOTPDetails(NdhmConnectFB ndhmConnectFB, HttpServletRequest request, HttpServletResponse response ) throws NoSuchAlgorithmException, KeyManagementException, IOException {
		String detail = null;
		String authenticationMode = request.getParameter("authenticationMode");
		// String hospitalcode = request.getParameter("hospitalcode");
		String patNdhmHealthId = request.getParameter("patNdhmHealthId");
		String ndhmHealthIDCode = request.getParameter("ndhmHealthIDCode");
		String patHospitalHealthId = request.getParameter("patHospitalHealthId");
		String hospitalcode = "";
		if (patHospitalHealthId.length() <= 12) {
			hospitalcode = "101";
		} else {
			hospitalcode = patHospitalHealthId.substring(0, 5);
		}
		String isVerify = request.getParameter("isVerified");
		String isKYC = request.getParameter("isKyc");
		System.setProperty("https.protocols", "TLSv1,TLSv1.1,TLSv1.2");
		URL obj = new URL("http://10.10.10.150:8082/hip/v0.5/users/auth/hisinit1");
		// URL obj = new URL("http://10.226.20.182:8081/hip/v0.5/users/auth/hisinit1");
		HttpURLConnection postConnection = (HttpURLConnection) obj.openConnection();
		postConnection.addRequestProperty("HIS-AUTH-KEY", "fbdcf45645fgnGNfddGSssRSRR3243DFvdfbNytHERgSdb");
		postConnection.setRequestMethod("POST");
		postConnection.setRequestProperty("Content-type", "application/json;charset=UTF-8");
		postConnection.setRequestProperty("Accept", "application/json");

		JSONObject initRequest = new JSONObject();
		initRequest.put("authenticationMode", authenticationMode);
		initRequest.put("hospitalCode", hospitalcode);
		initRequest.put("patNdhmHealthId", patNdhmHealthId);
		initRequest.put("patHospitalHealthId", patHospitalHealthId);
		initRequest.put("ndhmHealthIDCode", ndhmHealthIDCode);
		initRequest.put("isVerify", isVerify);
		initRequest.put("isKYC", isKYC);

		String jsonInputString = initRequest.toJSONString();
		byte[] out = jsonInputString.getBytes("utf-8");
		System.out.println("sending data====================" + jsonInputString);
		postConnection.setDoOutput(true);
		try (OutputStream os = postConnection.getOutputStream()) {
			os.write(out);
		}

		int responseCode = postConnection.getResponseCode();

		if (responseCode == 202) { // success
			BufferedReader in = new BufferedReader(new InputStreamReader(postConnection.getInputStream()));
			String inputLine;
			StringBuffer responses = new StringBuffer();
			while ((inputLine = in.readLine()) != null) {
				responses.append(inputLine);
			}
			in.close();
			System.out.println(responses);
			detail = responses.toString();
		} else {
			System.out.println("POST NOT WORKED");
		}
		return detail;
	}
	
	
	
	@SuppressWarnings("unchecked")
	public  String getPatientOnConfirmDetail(NdhmConnectFB ndhmConnectFB, HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		String ndhmdetail = null;
		String authenticationMode = request.getParameter("authenticationMode");
		String patNdhmHealthId = request.getParameter("patNdhmHealthId");
		String otp = request.getParameter("otp");
		String transactionId = request.getParameter("transactionId");
		String ndhmHealthIDCode = request.getParameter("ndhmHealthIDCode");
		String patHospitalHealthId = request.getParameter("patHospitalHealthId");

		String hospitalcode = "";
		if (patHospitalHealthId.length() <= 12) {
			hospitalcode = "101";
		} else {
			hospitalcode = patHospitalHealthId.substring(0, 5);
		}
		String patName = request.getParameter("patName");
		String patGender = request.getParameter("patGender");
		String patDob = request.getParameter("patDob");
		String patAddress = request.getParameter("patAddress");
		System.out.println("transactionId" + transactionId);
		System.setProperty("https.protocols", "TLSv1,TLSv1.1,TLSv1.2");
		URL obj = new URL("http://10.10.10.150:8082/hip/v0.5/users/auth/hisconfirm1");
		// URL obj = new URL("http://10.226.20.182:8081/hip/v0.5/users/auth/hisconfirm1");
		HttpURLConnection postConnection = (HttpURLConnection) obj.openConnection();
		postConnection.addRequestProperty("HIS-AUTH-KEY", "fbdcf45645fgnGNfddGSssRSRR3243DFvdfbNytHERgSdb");
		// URLConnection postConnection = obj.openConnection();
		postConnection.setRequestMethod("POST");
		postConnection.setRequestProperty("Content-type", "application/json;charset=UTF-8");
		postConnection.setRequestProperty("Accept", "application/json");
		JSONObject identifier = new JSONObject();
		identifier.put("type", "HEALTH_ID");
		identifier.put("value", patNdhmHealthId);

		JSONObject confirmRequestJson = new JSONObject();
		confirmRequestJson.put("authenticationMode", authenticationMode);
		confirmRequestJson.put("hospitalcode", hospitalcode);
		confirmRequestJson.put("patNdhmHealthId", patNdhmHealthId);
		confirmRequestJson.put("transactionId", transactionId);
		confirmRequestJson.put("patHospitalHealthId", patHospitalHealthId);
		confirmRequestJson.put("ndhmHealthIDCode", ndhmHealthIDCode);
		confirmRequestJson.put("identifier", identifier);

		if (authenticationMode == "DEMOGRAPHICS" || authenticationMode.equals("DEMOGRAPHICS")) {
			confirmRequestJson.put("patName", patName);
			confirmRequestJson.put("patDob", patDob);
			confirmRequestJson.put("patGender", patGender);
			confirmRequestJson.put("patAddress", patAddress);
		} else {
			confirmRequestJson.put("otp", otp);

		}

		String jsonInputString = confirmRequestJson.toJSONString();
		System.out.println("sending data--------------------------------" + jsonInputString);
		byte[] out = jsonInputString.getBytes("utf-8");
		postConnection.setDoOutput(true);
		try (OutputStream os = postConnection.getOutputStream()) {
			os.write(out);
		}

		int responseCode = postConnection.getResponseCode();

		if (responseCode == 202) { // success
			BufferedReader in = new BufferedReader(new InputStreamReader(postConnection.getInputStream()));
			String inputLine;
			StringBuffer responses = new StringBuffer();
			while ((inputLine = in.readLine()) != null) {
				responses.append(inputLine);
			}
			in.close();
			ndhmdetail = responses.toString();
			System.out.println("response--------------" + ndhmdetail);
		} else {
			System.out.println("POST NOT WORKED");
		}
		return ndhmdetail;
	}
	@SuppressWarnings("unchecked")
	public  String savendhmpatDetails(NdhmConnectFB ndhmConnectFB, HttpServletRequest request, HttpServletResponse response)
			throws IOException, NoSuchAlgorithmException, KeyManagementException {
		
		String success = null;
		String accessToken = request.getParameter("accessToken");
		// String hospitalcode = request.getParameter("hospitalcode");
		String patNdhmHealthId = request.getParameter("patNdhmHealthId");
		String hospitalName = request.getParameter("hospitalName");
		String patNdhmHealthCode = request.getParameter("patNdhmHealthCode");
		String patHospitalHealthId = request.getParameter("patHospitalHealthId");
		// String hospitalcode = patHospitalHealthId.substring(0,5);
		String patName = request.getParameter("patName");
		String patGender = request.getParameter("patGender");
		String datePatDob = request.getParameter("datePatDob");
		String patYearOfBirth = request.getParameter("patYearOfBirth");
		String patAddress = request.getParameter("patAddress");
		String patAuthMode = request.getParameter("patAuthMode");
		String crpatname = request.getParameter("crpatname");
		String patIsConsent = request.getParameter("consentLinkId");
		String isVerify = request.getParameter("isVerified");
		String isKYC = request.getParameter("isKyc");
		//String episodeUniqueCode = request.getParameter("episodeUniqueCode");
		//System.out.println(episodeUniqueCode.length());
		int weight = FuzzySearch.weightedRatio(patName, crpatname);
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
		HRSMultiMapper hrs = new HRSMultiMapper();
		String hospitalcode = "";
		if (patHospitalHealthId.length() <= 12) {
			hospitalcode = "101";
		} else {
			hospitalcode = patHospitalHealthId.substring(0, 5);
		}
		String hipId = hrs.getHIPIdByHospitalCode(hospitalcode);
		String url = hrs.getHISUrlByHospitalCode(hospitalcode);
		if (url == null || url.equals("")) {
			hospitalcode = patHospitalHealthId.substring(0, 6);
			url = hrs.getHISUrlByHospitalCode(hospitalcode);
		}
		if (weight > 75) {
			System.setProperty("https.protocols", "TLSv1,TLSv1.1,TLSv1.2");
			URL obj = new URL(url + "/patient/demographics/save-ndhmpatdata");
			HttpURLConnection postConnection = (HttpURLConnection) obj.openConnection();
			postConnection.setRequestMethod("POST");
			postConnection.setRequestProperty("Content-type", "application/json;charset=UTF-8");
			postConnection.setRequestProperty("Accept", "application/json");
			JSONObject getndhhmpatDataJson = new JSONObject();
			getndhhmpatDataJson.put("accessToken", accessToken);
			getndhhmpatDataJson.put("hospitalCode", hospitalcode);
			getndhhmpatDataJson.put("patNdhmHealthId", patNdhmHealthId);
			getndhhmpatDataJson.put("hipId", hipId);
			getndhhmpatDataJson.put("hospitalName", hospitalName);
			getndhhmpatDataJson.put("patHospitalHealthId", patHospitalHealthId);
			getndhhmpatDataJson.put("patNdhmHealthCode", patNdhmHealthCode);
			getndhhmpatDataJson.put("patName", patName);
			getndhhmpatDataJson.put("patGender", patGender);
			getndhhmpatDataJson.put("datePatDob", datePatDob);
			getndhhmpatDataJson.put("patYearOfBirth", patYearOfBirth);
			getndhhmpatDataJson.put("patAddress", patAddress);
			getndhhmpatDataJson.put("patAuthMode", patAuthMode);
			getndhhmpatDataJson.put("isVerify", isVerify);
			getndhhmpatDataJson.put("isKYC", isKYC);
			getndhhmpatDataJson.put("patIsConsent", patIsConsent);
			/*
			 * JSONObject episode_code = new JSONObject();
			 * episode_code.put("episodeUniqueCode", episodeUniqueCode);
			 * episode_code.put("isLinked", "1");
			 * 
			 * JSONArray patDetailsObjectRowContainer = new JSONArray();
			 * patDetailsObjectRowContainer.add(episodeUniqueCode);
			 * 
			 * getndhhmpatDataJson.put("episodesList", patDetailsObjectRowContainer);
			 */

			// for pgi
        if("101".equals(hospitalcode)) {
        	getndhhmpatDataJson.put("patVisitNo", "1");
			 getndhhmpatDataJson.put("patEpisodeCode", "1");	
        }
			 

			String jsonInputString = getndhhmpatDataJson.toJSONString();
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
				success = responses.toString();
				System.out.println("ndhmdetail---------------------------------" + success);

			} else {
				System.out.println("POST NOT WORKED");
			}
		} else {
			success = "{\"success\":\"1\"}";
			System.out.println(success);
		}
		return success;
	}
	
	@SuppressWarnings("unchecked")
	public  String verifyPatNdhmHealthId(NdhmConnectFB ndhmConnectFB, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		String verifydetails = null;
		String pathealthid = request.getParameter("pathealthid");
		System.setProperty("https.protocols", "TLSv1,TLSv1.1,TLSv1.2");
		URL obj = new URL("http://10.10.10.150:8082/hip/v1/search/searchByHealthId");
		// URL obj = new
		// URL("http://10.226.20.182:8081/hip/v0.5/search/searchByHealthId");
		System.out.println("obj-------------------" + obj);
		HttpURLConnection postConnection = (HttpURLConnection) obj.openConnection();
		postConnection.addRequestProperty("HIS-AUTH-KEY", "fbdcf45645fgnGNfddGSssRSRR3243DFvdfbNytHERgSdb");
		// URLConnection postConnection = obj.openConnection();
		postConnection.setRequestMethod("POST");
		postConnection.setRequestProperty("Content-type", "application/json;charset=UTF-8");
		postConnection.setRequestProperty("Accept", "application/json");

		JSONObject getverifyIdJSON = new JSONObject();
		getverifyIdJSON.put("healthId", pathealthid);

		String jsonInputString = getverifyIdJSON.toJSONString();
		byte[] out = jsonInputString.getBytes("utf-8");
		System.out.println("sending data====================" + jsonInputString);
		postConnection.setDoOutput(true);
		try (OutputStream os = postConnection.getOutputStream()) {
			os.write(out);
		}
		int responseCode = postConnection.getResponseCode();

		if (responseCode == 202) { // success
			BufferedReader in = new BufferedReader(new InputStreamReader(postConnection.getInputStream()));
			String inputLine;
			StringBuffer responses = new StringBuffer();
			while ((inputLine = in.readLine()) != null) {
				responses.append(inputLine);
			}
			in.close();
			System.out.println(responses);
			verifydetails = responses.toString();

		} else if (responseCode == 500) {
			verifydetails = "{\"isSuccess\":\"0\"}";
			System.out.println(verifydetails);
		} else {
			System.out.println("POST NOT WORKED");
		}
		return verifydetails;
	}

	@SuppressWarnings("unchecked")
	public  String onlySavePatDetails(NdhmConnectFB ndhmConnectFB, HttpServletRequest request, HttpServletResponse response)
			throws IOException, ParseException, NoSuchAlgorithmException, KeyManagementException {
		String success = null;
		String patNdhmHealthId = request.getParameter("patNdhmHealthId");
		String hospitalName = request.getParameter("hospitalName");
		String ndhmHealthIDCode = request.getParameter("ndhmHealthIDCode");
		String patHospitalHealthId = request.getParameter("patHospitalHealthId");
		String hospitalCode = patHospitalHealthId.substring(0, 5);
		String patAuthMode = request.getParameter("patAuthMode");
		String isVerify = request.getParameter("isVerified");
		String isKYC = request.getParameter("isKyc");
		String episodeUniqueCode = request.getParameter("episodeUniqueCode");

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

		HRSMultiMapper hrs = new HRSMultiMapper();
		String hipId = hrs.getHIPIdByHospitalCode(hospitalCode);
		String url = hrs.getHISUrlByHospitalCode(hospitalCode);

		if (url == null || url.equals("")) {
			hospitalCode = patHospitalHealthId.substring(0, 6);
			url = hrs.getHISUrlByHospitalCode(hospitalCode);
		}
		System.out.println("hospitalCode==============" + hospitalCode);
		System.out.println("episodeUniqueCode==============" + episodeUniqueCode);
		System.setProperty("https.protocols", "TLSv1,TLSv1.1,TLSv1.2");
		URL obj = new URL(url + "/patient/demographics/save-ndhmpatdata");
		HttpURLConnection postConnection = (HttpURLConnection) obj.openConnection();
		postConnection.setRequestMethod("POST");
		postConnection.setRequestProperty("Content-type", "application/json;charset=UTF-8");
		postConnection.setRequestProperty("Accept", "application/json");

		JSONObject savendhmpatJson = new JSONObject();
		savendhmpatJson.put("hospitalCode", hospitalCode);
		savendhmpatJson.put("patNdhmHealthId", patNdhmHealthId);
		savendhmpatJson.put("hipId", hipId);
		savendhmpatJson.put("hospitalName", hospitalName);
		savendhmpatJson.put("patHospitalHealthId", patHospitalHealthId);
		savendhmpatJson.put("patNdhmHealthCode", ndhmHealthIDCode);
		savendhmpatJson.put("patAuthMode", patAuthMode);
		savendhmpatJson.put("isVerify", isVerify);
		savendhmpatJson.put("isKYC", isKYC);
		
		 if("101".equals(hospitalCode)) {
			 savendhmpatJson.put("patVisitNo", "1");
			 savendhmpatJson.put("patEpisodeCode", "1");	
	        }
		 
		String jsonInputString = savendhmpatJson.toJSONString();

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
			success = responses.toString();
			System.out.println("ndhmdetail---------------------------------" + success);
		} else {
			System.out.println("POST NOT WORKED");
		}

		return success;
	}

}
