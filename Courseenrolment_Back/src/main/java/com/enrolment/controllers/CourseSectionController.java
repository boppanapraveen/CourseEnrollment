package com.enrolment.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.enrolment.models.SectionModel;
import com.enrolment.services.SectionService;

@RestController
public class CourseSectionController {
	
	@Autowired
	private SectionService courseSectionService;
	
	@PostMapping("addSection")
	public String addSection(@RequestBody SectionModel courseSectionModel) {
		return courseSectionService.addSection(courseSectionModel);
	}
	
	@GetMapping("viewSections")
	public List<SectionModel> viewSections(@RequestParam("courseId") long courseId) {
		System.out.println(courseId);
		return courseSectionService.viewSections(courseId);
		
	}

}
