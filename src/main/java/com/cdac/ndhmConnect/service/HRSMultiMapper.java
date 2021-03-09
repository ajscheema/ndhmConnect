package com.cdac.ndhmConnect.service;

import java.util.Map;

import org.springframework.context.annotation.Configuration;

import com.google.common.collect.BiMap;
import com.google.common.collect.HashBasedTable;
import com.google.common.collect.HashBiMap;
import com.google.common.collect.Table;

@Configuration
public class HRSMultiMapper {
	
	
	
	private static Table<String, String, String> HRSMapperTable;
	
	{
		
//		Table<String, String, Integer> universityCourseSeatTableimu = ImmutableTable.<String, String, Integer> 
//		builder().put("Mumbai", "Chemical", 120).build();
		
		HRSMapperTable = HashBasedTable.create();
		
		//PGI Chandighar
		HRSMapperTable.put("101", "hipid", "101");
		HRSMapperTable.put("101", "hiuid", "101");
		HRSMapperTable.put("101", "hisurl", "https://pgimer.edu.in/HISInvestigationServices/rest");
		//HRSMapperTable.put("101", "hisurl", "https://14.139.56.210/HISInvestigationServices/rest");
		
		//mangalari
		HRSMapperTable.put("37913", "hipid", "37913");
		HRSMapperTable.put("37913", "hiuid", "30000");
		//HRSMapperTable.put("37913", "hisurl", "https://220.156.188.199/HISNDHMService/restapi"); prod
		//HRSMapperTable.put("37913", "hisurl", "https://aiimsmanglagiri.uat.dcservices.in/HISNDHMService/restapi");
		HRSMapperTable.put("37913", "hisurl", "http://10.10.10.116:8081/HISNDHMService/restapi");
		//bridge_CDAC_9135661
		
		
		//patna
		HRSMapperTable.put("10911", "hipid", "19101");
		HRSMapperTable.put("10911", "hiuid", "30001");
		//HRSMapperTable.put("10911", "hisurl", "http://220.156.188.202/HISNDHMService/restapi");
		HRSMapperTable.put("10911", "hisurl", "http://10.10.10.72:8080/HISNDHMService/restapi");
		
		//raipur
		HRSMapperTable.put("27101", "hipid", "19103");
		HRSMapperTable.put("27101", "hiuid", "30002");
		//HRSMapperTable.put("27101", "hisurl", "https://uataiimsraipur.dcservices.in/HISNDHMService/restapi");
		HRSMapperTable.put("27101", "hisurl", "http://10.10.10.127:8080/HISNDHMService/restapi");
		
		//development
		HRSMapperTable.put("96101", "hipid", "19101");
		HRSMapperTable.put("96101", "hiuid", "30001");
		//HRSMapperTable.put("10911", "hisurl", "http://220.156.188.202/HISNDHMService/restapi");
		HRSMapperTable.put("96101", "hisurl", "http://10.226.20.182:8380/HISNDHMService/restapi");
		
		HRSMapperTable.put("21101", "hipid", "19101");
		HRSMapperTable.put("21101", "hiuid", "30001");
		//HRSMapperTable.put("10911", "hisurl", "http://220.156.188.202/HISNDHMService/restapi");
		HRSMapperTable.put("21101", "hisurl", "http://10.226.20.182:8380/HISNDHMService/restapi");
	
		// print google guava
		
		System.out.println("======================================HRSMultiMapper Config Instantiated======================================");
		System.out.println("======================================HRSMapperTable======================================");
		
		System.out.println(HRSMapperTable);

		// print value corresponding to rowkey and columnkey
		//System.out.println(HRSMapperSeatTable.get("37913", "hipid"));
		
//		System.out.println(HRSMapperTable.column("hipid"));
//		System.out.println(HRSMapperTable.column("hiuid"));
//		System.out.println(HRSMapperTable.column("hisurl"));
//		System.out.println(HRSMapperTable.columnMap());
//		
//		BiMap<String,String> hipidbimp =  HashBiMap.create();
//		hipidbimp.putAll(HRSMapperTable.column("hipid"));
//		System.out.println(hipidbimp.inverse().get("10911"));
		
		
	}
	
	public Table<String, String, String> getHRSMultiMapper() {
		return HRSMapperTable;
		
	}
	
	//===========================================================
	public String getHIPIdByHospitalCode(String hospitalCode) {
		return HRSMapperTable.get(hospitalCode, "hipid");
	}
	
	public String getHIUIdByHospitalCode(String hospitalCode) {
		return HRSMapperTable.get(hospitalCode, "hiuid");
	}
	
	public String getHISUrlByHospitalCode(String hospitalCode) {
		String hisurl =HRSMapperTable.get(hospitalCode, "hisurl");
		if(hisurl==null || hisurl.equals("") || hisurl.isEmpty())
			hisurl="https://pgimer.edu.in/HISInvestigationServices/rest";
		
		return hisurl;
	}
	
	
	//===========================================================
	public String getHospitalCodeByHIPId(String hipid) {
		BiMap<String,String> hipidbimp =  HashBiMap.create();
		hipidbimp.putAll(HRSMapperTable.column("hipid"));
		return hipidbimp.inverse().get(hipid);
	}
	
	public String getHospitalCodeByHIUId(String hiuid) {
		BiMap<String,String> hiuidbimp =  HashBiMap.create();
		hiuidbimp.putAll(HRSMapperTable.column("hiuid"));
		return hiuidbimp.inverse().get(hiuid);
	}
	
	
	//===========================================================
	public String getHISUrlByHIPId(String hipid) {
		String hospitalCode=getHospitalCodeByHIPId(hipid);
		BiMap<String,String> hisurlbimp =  HashBiMap.create();
		hisurlbimp.putAll(HRSMapperTable.column("hisurl"));
		return hisurlbimp.get(hospitalCode);
	}
	
	public String getHISUrlByHIUId(String hiuid) {
		if(hiuid==null || hiuid.equals("bridge_CDAC_9135661"))
			return "https://aiimsmanglagiri.uat.dcservices.in/HISNDHMService/restapi";
		
		String hospitalCode=getHospitalCodeByHIUId(hiuid);
		BiMap<String,String> hisurlbimp =  HashBiMap.create();
		hisurlbimp.putAll(HRSMapperTable.column("hisurl"));
		return hisurlbimp.get(hospitalCode);
	}
	
	
}	
		