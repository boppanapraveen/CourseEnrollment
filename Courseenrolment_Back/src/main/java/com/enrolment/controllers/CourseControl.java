package com.enrolment.controllers;

import java.io.File;
import java.io.FileOutputStream;
import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.enrolment.models.CourseModel;
import com.enrolment.services.CourseService;

@RestController
public class CourseControl {
	
	@Autowired
	private CourseService courseService;
	@Value("${courseImagePath}")
	String courseImagePath;
	@RequestMapping(value = "addCourseAction", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String addCourseAction(
   		@RequestParam(name="image") MultipartFile multipartFile,
   		@RequestParam String courseName,
   		@RequestParam long subCategoryId,
   		@RequestParam String courseDescription,
   		@RequestParam float coursePrice,
   		Principal principal
   		 
   		 ) {
   	try {
			File uploadedFile = new File(courseImagePath, multipartFile.getOriginalFilename());
			uploadedFile.createNewFile();
			FileOutputStream fos = new FileOutputStream(uploadedFile);
			fos.write(multipartFile.getBytes());
			fos.close();
			
			CourseModel courseModel  = new CourseModel();
			courseModel.setCourseName(courseName);
			courseModel.setCourseDescription(courseDescription);
			courseModel.setStatus("Not Authorized");
			courseModel.setCoursePrice(coursePrice);
			courseModel.setImage(multipartFile.getOriginalFilename());
			
			return courseService.addCourseAction(courseModel,principal.getName(),subCategoryId);
		} catch (Exception e) {
			System.out.println(e);
			return "Fail to upload";
		}
   }
	
	@GetMapping("getCourses")
	public List<CourseModel> getCourses(Principal principal,@RequestParam("keywords") String keywords){
		List<CourseModel> courseModels = courseService.getCourses(principal.getName(),keywords);
		return courseModels;
	}
	@GetMapping("getCoursesRequests")
	public List<CourseModel> getCoursesRequests(@RequestParam("keywords") String keywords){
		return courseService.getCoursesRequests(keywords);
	}
	
	@GetMapping("verifyCourse")
	public String verifyCourse(@RequestParam("courseId") long courseId) {
		return courseService.verifyCourse(courseId);
	}
	@GetMapping("getCourseCount")
	public String getCourseCount() {
		return courseService.getCourseCount();
	}
	
	@GetMapping("getAvailableCourses")
	public List<CourseModel> getAvailableCourses(@RequestParam("keywords") String keywords){
		return courseService.getAvailableCourses(keywords);
	}
	
	@GetMapping("GetCourseDetails")
	public CourseModel GetCourseDetails(@RequestParam("courseId") long courseId) {
		return courseService.GetCourseDetails(courseId);
	}
}
