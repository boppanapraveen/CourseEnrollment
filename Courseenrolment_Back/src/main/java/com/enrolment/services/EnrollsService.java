package com.enrolment.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.enrolment.models.CourseModel;
import com.enrolment.models.EnrollsModel;
import com.enrolment.models.InstructorModel;
import com.enrolment.models.LoginDetailsModel;
import com.enrolment.models.PaymentsModel;
import com.enrolment.models.StudentModel;
import com.enrolment.repositories.CourseRepository;
import com.enrolment.repositories.EnrollsRepository;
import com.enrolment.repositories.InstructorRepository;
import com.enrolment.repositories.LoginDetailsRepository;
import com.enrolment.repositories.PaymentRepository;
import com.enrolment.repositories.ReviewRepository;
import com.enrolment.repositories.StudentRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class EnrollsService {
	@Autowired private EnrollsRepository enrollsRepository;
	@Autowired private CourseRepository courseRepository;
	@Autowired private StudentRepository studentRepository;
	@Autowired private PaymentRepository paymentRepository;
	@Autowired private LoginDetailsRepository loginDetailsRepository;
	@Value("${courseImagePath}")
	String courseImagePath;
	@Autowired private InstructorRepository instructorRepository;
	@Autowired private ReviewRepository reviewRepository;

	public String enrollCourse(EnrollsModel enrollsModel, String name, long courseId,float amount) {
		CourseModel courseModel = courseRepository.findById(courseId).get();
		StudentModel studentModel = studentRepository.findByEmail(name);
		float walletAmount = 0;
		if(studentModel.getWalletAmount()>=amount) {
			walletAmount  = studentModel.getWalletAmount()-amount;
		}else {
			walletAmount  = studentModel.getWalletAmount();
		}
		
		
		studentModel.setWalletAmount(walletAmount);
		studentRepository.saveAndFlush(studentModel);
		enrollsModel.setStudentModel(studentModel);
		enrollsModel.setCourseModel(courseModel);
		enrollsModel.setDate(new Date());
		enrollsModel.setStatus("Enrolled");
		enrollsModel.setStatus2("Enrolled");
		EnrollsModel enrollsModel2 = enrollsRepository.save(enrollsModel);
		PaymentsModel paymentsModel =  new PaymentsModel();
		paymentsModel.setStatus("Amount Paid");
		paymentsModel.setAmount(amount);
		paymentsModel.setEnrollsModel(enrollsModel2);
		paymentsModel.setDate(new Date());
		paymentRepository.save(paymentsModel);
		
		return "Course Enrolled";
	}

	public int getEnrollCount(long courseId,String name) {
		StudentModel studentModel = studentRepository.findByEmail(name);
		int count = enrollsRepository.getEnrollCount(courseId,studentModel.getStudentId());
		return count;
	}

	public List<EnrollsModel> enrolls(String name) {
		StudentModel studentModel = studentRepository.findByEmail(name);
		List<EnrollsModel> enrollsModelsList = new ArrayList<EnrollsModel>();
		LoginDetailsModel loginDetailsModel = loginDetailsRepository.findByEmail(name);
		if(loginDetailsModel.getRole().equalsIgnoreCase("ROLE_STUDENT")) {
			enrollsModelsList = enrollsRepository.findByStudentModel(studentModel);
		}else if(loginDetailsModel.getRole().equalsIgnoreCase("ROLE_INSTRUCTOR")) {
			InstructorModel instructorModel = instructorRepository.findByEmail(name);
			enrollsModelsList = enrollsRepository.getEnrolls(instructorModel.getInstructorId());
		}else if(loginDetailsModel.getRole().equalsIgnoreCase("ROLE_ADMIN")) {
			enrollsModelsList = enrollsRepository.findAll();
		}
		List<EnrollsModel> enrollsModelsList2 = new ArrayList<EnrollsModel>();
		Iterator<EnrollsModel> iterator = enrollsModelsList.iterator();
		while(iterator.hasNext()) {
			EnrollsModel enrollsModel = (EnrollsModel) iterator.next();
			CourseModel courseModel = enrollsModel.getCourseModel();
			

			try {
				 File file=new File(courseImagePath+"/"+courseModel.getImage());
				 InputStream in = new FileInputStream(file);
				 courseModel.setImage2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
				 
				 } catch (Exception e) {
				 System.out.println(e);
				 }
			enrollsModelsList2.add(enrollsModel);
		}
		Collections.reverse(enrollsModelsList);
		return enrollsModelsList;
	}

	public String dropEnrollment(long enrolId) {
		EnrollsModel enrollsModel = enrollsRepository.findById(enrolId).get();
		enrollsModel.setStatus("Dropped");
		
		enrollsRepository.saveAndFlush(enrollsModel);
		return "Course Dropped";
	}

	public List<EnrollsModel> getCourseEnrolls(long courseId) {
		CourseModel courseModel2 = courseRepository.findById(courseId).get();
		List<EnrollsModel> enrollsModelsList = enrollsRepository.findByCourseModel(courseModel2);
		List<EnrollsModel> enrollsModelsList2 = new ArrayList<EnrollsModel>();
		Iterator<EnrollsModel> iterator = enrollsModelsList.iterator();
		while(iterator.hasNext()) {
			EnrollsModel enrollsModel = (EnrollsModel) iterator.next();
			CourseModel courseModel = enrollsModel.getCourseModel();
			

			try {
				 File file=new File(courseImagePath+"/"+courseModel.getImage());
				 InputStream in = new FileInputStream(file);
				 courseModel.setImage2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
				 
				 } catch (Exception e) {
				 System.out.println(e);
				 }
			enrollsModelsList2.add(enrollsModel);
		}
		Collections.reverse(enrollsModelsList);
		return enrollsModelsList;
	}

	public String completeEnrollment(long enrolId) {
		EnrollsModel enrollsModel = enrollsRepository.findById(enrolId).get();
		enrollsModel.setStatus("Course Completed");
		enrollsModel.setStatus2("Course Completed");
		enrollsRepository.saveAndFlush(enrollsModel);
		return "Course Completed";
	}
}
