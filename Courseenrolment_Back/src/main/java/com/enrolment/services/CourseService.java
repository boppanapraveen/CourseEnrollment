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
import org.springframework.stereotype.Service;

import com.enrolment.models.CourseModel;
import com.enrolment.models.InstructorModel;
import com.enrolment.models.SubCategoryModel;
import com.enrolment.repositories.CourseRepository;
import com.enrolment.repositories.InstructorRepository;
import com.enrolment.repositories.ReviewRepository;
import com.enrolment.repositories.SubCategoryRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CourseService {
	@Value("${courseImagePath}")
	String courseImagePath;
	@Autowired
	private CourseRepository courseRepository;
	@Autowired
	private InstructorRepository instructorRepository;
	@Autowired
	private SubCategoryRepository subCategoryRepository;
	@Autowired private ReviewRepository reviewRepository;


	public String addCourseAction(CourseModel courseModel, String email,long subCategoryId) {
		InstructorModel instructorModel = instructorRepository.findByEmail(email);
		SubCategoryModel subCategoryModel = subCategoryRepository.findById(subCategoryId).get();
		courseModel.setSubCategoryModel(subCategoryModel);
		courseModel.setInstructorModel(instructorModel);
		
		courseRepository.save(courseModel);
		return "Course Added Successfully";
	}

	public List<CourseModel> getCourses(String email,String keywords) {
		List<CourseModel> CourseModel2 = new ArrayList<CourseModel>();
		InstructorModel instructorModel = instructorRepository.findByEmail(email);
		List<CourseModel> courseModelsList = new ArrayList<CourseModel>();
		if(keywords.equalsIgnoreCase("")) {
			courseModelsList = courseRepository.findByInstructorModel(instructorModel);
		}else {
			courseModelsList = courseRepository.findByInstructorModelAndCourseNameLike(instructorModel,"%"+keywords+"%");
		}
		Iterator<CourseModel> iterator = courseModelsList.iterator();
		while(iterator.hasNext()) {
			CourseModel courseModel  = (CourseModel) iterator.next();
			String rating = reviewRepository.getRating(courseModel.getCourseId());
			if(rating!=null) {
				courseModel.setRating(Double.parseDouble(rating));
				}else {
					courseModel.setRating(0.0);
				}
			try {
				 File file=new File(courseImagePath+"/"+courseModel.getImage());
				 InputStream in = new FileInputStream(file);
				 courseModel.setImage2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
				 } catch (Exception e) {
				 System.out.println(e);
				 }
			CourseModel2.add(courseModel);
		}
		return courseModelsList;
	}

	public List<CourseModel> getCoursesRequests(String keywords) {
		List<CourseModel> CourseModel2 = new ArrayList<CourseModel>();
		List<CourseModel> courseModelsList = new ArrayList<CourseModel>();
		if(keywords.equalsIgnoreCase("")) {
			 courseModelsList = courseRepository.findAll();
		}else {
			courseModelsList = courseRepository.findByCourseNameLike("%"+keywords+"%");
		}
		Iterator<CourseModel> iterator = courseModelsList.iterator();
		while(iterator.hasNext()) {
			CourseModel courseModel  = (CourseModel) iterator.next();
			String rating = reviewRepository.getRating(courseModel.getCourseId());
			if(rating!=null) {
				courseModel.setRating(Double.parseDouble(rating));
				}else {
					courseModel.setRating(0.0);
				}
			try {
				 File file=new File(courseImagePath+"/"+courseModel.getImage());
				 InputStream in = new FileInputStream(file);
				 courseModel.setImage2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
				 } catch (Exception e) {
				 System.out.println(e);
				 }
			CourseModel2.add(courseModel);
		}
		return courseModelsList;
	}

	public String verifyCourse(long courseId) {
		CourseModel courseModel = courseRepository.findById(courseId).get();
		if(courseModel.getStatus().equalsIgnoreCase("Not Authorized")) {
			courseModel.setStatus("Authorized");
			courseRepository.saveAndFlush(courseModel);
			return "Course Authorized";
		}else {
			courseModel.setStatus("Not Authorized");
			courseRepository.saveAndFlush(courseModel);
			return "Course UnAuthorized";
		}
		
	}

	public String getCourseCount() {
		String course = courseRepository.getCourseCount();
		return course;
	}

	public List<CourseModel> getAvailableCourses(String keywords) {
		List<CourseModel> CourseModel2 = new ArrayList<CourseModel>();
		List<CourseModel> courseModelsList = new ArrayList<CourseModel>();
		if(keywords.equalsIgnoreCase("")) {
			courseModelsList = courseRepository.findByStatus("Authorized");
		}else {
			courseModelsList = courseRepository.findByStatusAndCourseNameLike("Authorized","%"+keywords+"%");
		}
		Iterator<CourseModel> iterator = courseModelsList.iterator();
		while(iterator.hasNext()) {
			CourseModel courseModel  = (CourseModel) iterator.next();
			String rating = reviewRepository.getRating(courseModel.getCourseId());
			if(rating!=null) {
				courseModel.setRating(Double.parseDouble(rating));
				}else {
					courseModel.setRating(0.0);
				}
			try {
				 File file=new File(courseImagePath+"/"+courseModel.getImage());
				 InputStream in = new FileInputStream(file);
				 courseModel.setImage2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
				 } catch (Exception e) {
				 System.out.println(e);
				 }
			CourseModel2.add(courseModel);
		}
		return courseModelsList;
	}

	public CourseModel GetCourseDetails(long courseId) {
		CourseModel courseModel = courseRepository.findById(courseId).get();
		
		String rating = reviewRepository.getRating(courseModel.getCourseId());
		if(rating!=null) {
			courseModel.setRating(Double.parseDouble(rating));
			}else {
				courseModel.setRating(0.0);
			}
		try {
			 File file=new File(courseImagePath+"/"+courseModel.getImage());
			 InputStream in = new FileInputStream(file);
			 courseModel.setImage2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
			 } catch (Exception e) {
			 System.out.println(e);
			 }
		return courseModel;
	}

}
