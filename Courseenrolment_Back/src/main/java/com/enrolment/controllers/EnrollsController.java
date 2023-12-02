package com.enrolment.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.enrolment.models.EnrollsModel;
import com.enrolment.services.EnrollsService;

@RestController
public class EnrollsController {
	@Autowired private EnrollsService enrollsService;
	
	@PostMapping("enrollCourse")
	public String enrollCourse(@RequestBody EnrollsModel enrollsModel,Principal principal,@RequestParam("courseId") long courseId,@RequestParam("amount") float amount) {
		return enrollsService.enrollCourse(enrollsModel,principal.getName(),courseId,amount);
	}
	
	@GetMapping("getEnrollCount")
	public int getEnrollCount(@RequestParam("courseId") long courseId,Principal principal) {
		return enrollsService.getEnrollCount(courseId,principal.getName());
	}
	
	@GetMapping("enrolls")
	public List<EnrollsModel> enrolls(Principal principal){
		return enrollsService.enrolls(principal.getName());
	}
	
	@GetMapping("dropEnrollment")
	public String dropEnrollment(@RequestParam("enrolId") long enrolId) {
		return enrollsService.dropEnrollment(enrolId);
	}
	
	@GetMapping("getCourseEnrolls")
	public List<EnrollsModel> getCourseEnrolls(@RequestParam("courseId") long courseId){
		return enrollsService.getCourseEnrolls(courseId);
	}
	
	@GetMapping("completeEnrollment")
	public String completeEnrollment(@RequestParam("enrolId") long enrolId) {
		return enrollsService.completeEnrollment(enrolId);
	}
	
	

}
