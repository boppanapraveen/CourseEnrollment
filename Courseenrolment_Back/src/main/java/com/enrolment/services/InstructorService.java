package com.enrolment.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.enrolment.models.InstructorModel;
import com.enrolment.models.LoginDetailsModel;
import com.enrolment.repositories.InstructorRepository;
import com.enrolment.repositories.LoginDetailsRepository;


import jakarta.transaction.Transactional;

@Service
@Transactional
public class InstructorService {
	 @Value("${instructorImagePath}")
	 String instructorImagePath;
	@Autowired
	private InstructorRepository instructorRepository;
	@Autowired
	private LoginDetailsRepository loginDetailsRepository;

	public String instructorReg(InstructorModel instructorModel) {
		List<InstructorModel>  instructorModelsList = instructorRepository.findByEmailOrPhone(instructorModel.getEmail(),instructorModel.getPhone());
		if(instructorModelsList.size() >0) {
			return "Duplicate Details";
		}
		
		List<LoginDetailsModel> loginDetailsModelsList = loginDetailsRepository.findAll();
		if(loginDetailsModelsList.size()==0) {
			LoginDetailsModel loginDetailsModelsList2 = new LoginDetailsModel();
			loginDetailsModelsList2.setEmail("admin@gmail.com");
			loginDetailsModelsList2.setPassword(new BCryptPasswordEncoder().encode("admin"));
			loginDetailsModelsList2.setRole("ROLE_ADMIN");
			loginDetailsRepository.save(loginDetailsModelsList2);
		}
		
		LoginDetailsModel loginDetailsModel = new LoginDetailsModel();
		loginDetailsModel.setEmail(instructorModel.getEmail());
		loginDetailsModel.setPassword(new BCryptPasswordEncoder().encode(instructorModel.getPassword()));
		loginDetailsModel.setRole("ROLE_INSTRUCTOR");
		loginDetailsRepository.save(loginDetailsModel);
		LoginDetailsModel loginDetailsModel2 = loginDetailsRepository.findByEmail(instructorModel.getEmail());
		instructorModel.setLoginDetailsModel(loginDetailsModel2);
		instructorModel.setStatus("Not Authorized");
		instructorRepository.save(instructorModel);
		return "Instructor Registered Successfully";
	}

	public InstructorModel getInstructorProfile(String email) {
		InstructorModel instructorModel = instructorRepository.findByEmail(email);
		try {
			 File file=new File(instructorImagePath+"/"+instructorModel.getProfielPicture());
			 InputStream in = new FileInputStream(file);
			 instructorModel.setProfielPicture2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
			 
			 } catch (Exception e) {
			 System.out.println(e);
		 }
		return instructorModel;
	}

	public String getInstructors() {
		String instructorModelsList = instructorRepository.getInstructor();
		return instructorModelsList;
	}

	public List<InstructorModel> getInstructorDetails(String name) {
		List<InstructorModel> instructorModelList = instructorRepository.findAll();
		List<InstructorModel> instructorModelList2 = new ArrayList<InstructorModel>();
		Iterator<InstructorModel> iterator = instructorModelList.iterator();
		while(iterator.hasNext()) {
			InstructorModel instructorModel = iterator.next();
			try {
				 File file=new File(instructorImagePath+"/"+instructorModel.getProfielPicture());
				 InputStream in = new FileInputStream(file);
				 instructorModel.setProfielPicture2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
				 
				 } catch (Exception e) {
				 System.out.println(e);
			 }
			instructorModelList2.add(instructorModel);
		}
		return instructorModelList;
	}

	public String updateInstructor(long instructorId) {
		InstructorModel instructorModel = instructorRepository.findById(instructorId).get();
		if(instructorModel.getStatus().equalsIgnoreCase("Not Authorized")) {
			instructorModel.setStatus("Authorized");
			instructorRepository.saveAndFlush(instructorModel);
		}else {
			instructorModel.setStatus("Not Authorized");
			instructorRepository.saveAndFlush(instructorModel);
		}
		return "Verified";
	}

	public String getInstructorStatus2(String name) {
		InstructorModel instructorModel = instructorRepository.findByEmail(name);
		if(instructorModel.getStatus().equalsIgnoreCase("Not Authorized")) {
			return "Not Authorized";
		}else {
			return "Authorized";
		}
	}

}
