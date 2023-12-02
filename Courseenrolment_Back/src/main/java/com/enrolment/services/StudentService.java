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
import com.enrolment.models.StudentModel;
import com.enrolment.repositories.LoginDetailsRepository;
import com.enrolment.repositories.StudentRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class StudentService {
	@Autowired
	private StudentRepository studentRepository;
	@Autowired
	private LoginDetailsRepository loginDetailsRepository;
	@Value("${studentImagePath}")
	String studentImagePath;

	public String customerReg(StudentModel studentModel) {
		List<StudentModel>  StudentModelList = studentRepository.findByEmailOrPhone(studentModel.getEmail(),studentModel.getPhone());
		if(StudentModelList.size() >0) {
			return "Duplicate Details";
		}
		LoginDetailsModel loginDetailsModel = new LoginDetailsModel();
		loginDetailsModel.setEmail(studentModel.getEmail());
		loginDetailsModel.setPassword(new BCryptPasswordEncoder().encode(studentModel.getPassword()));
		loginDetailsModel.setRole("ROLE_STUDENT");
		loginDetailsRepository.save(loginDetailsModel);
		LoginDetailsModel loginDetailsModel2 = loginDetailsRepository.findByEmail(studentModel.getEmail());
		studentModel.setLoginDetailsModel(loginDetailsModel2);
		studentModel.setStatus("Not Authorized");
		studentRepository.save(studentModel);
		return "Student Registered Successfully";
	}

	public StudentModel getStudentProfile(String email) {
		StudentModel studentModel = studentRepository.findByEmail(email);
		try {
			 File file=new File(studentImagePath+"/"+studentModel.getProfilePicture());
			 InputStream in = new FileInputStream(file);
			 studentModel.setProfilePicture2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
			 
			 } catch (Exception e) {
		 }
		return studentModel;
	}
	
	public StudentModel getStudentDetails(long studentId) {
		StudentModel studentModel = studentRepository.findById(studentId).get();
		try {
			 File file=new File(studentImagePath+"/"+studentModel.getProfilePicture());
			 InputStream in = new FileInputStream(file);
			 studentModel.setProfilePicture2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
			 
			 } catch (Exception e) {
		 }
		return studentModel;
	}

	public String updateStudent(StudentModel studentModel) {
//		System.out.println(studentModel.getStudentId());
//		studentRepository.saveAndFlush(studentModel);
		return "Details Updated";
	}

	public List<StudentModel> getStudentDetails2() {
		List<StudentModel> studentModelsList = studentRepository.findAll();
		List<StudentModel> studentModelsList2 = new ArrayList<StudentModel>();
		Iterator<StudentModel> iterator = studentModelsList.iterator();
		while(iterator.hasNext()) {
			StudentModel studentModel = iterator.next();
			try {
				 File file=new File(studentImagePath+"/"+studentModel.getProfilePicture());
				 InputStream in = new FileInputStream(file);
				 studentModel.setProfilePicture2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
				 } catch (Exception e) {
				 System.out.println(e);
			 }
			studentModelsList2.add(studentModel);
		}
		return studentModelsList;
	}

	public String updateStudent2(long studentId) {
		StudentModel studentModel = studentRepository.findById(studentId).get();
		if(studentModel.getStatus().equalsIgnoreCase("Not Authorized")) {
			studentModel.setStatus("Authorized");
			studentRepository.saveAndFlush(studentModel);
		}else {
			studentModel.setStatus("Not Authorized");
			studentRepository.saveAndFlush(studentModel);
		}
		return "Verified";
	}
	public String getStudentStatus2(String name) {
		StudentModel studentModel = studentRepository.findByEmail(name);
		if(studentModel.getStatus().equalsIgnoreCase("Not Authorized")) {
			return "Not Authorized";
		}else {
			return "Authorized";
		}
	}
	

}
