package com.enrolment.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.enrolment.models.CourseModel;
import com.enrolment.models.SectionModel;
import com.enrolment.repositories.CourseRepository;
import com.enrolment.repositories.SectionRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class SectionService {
	@Autowired
	private SectionRepository courseSectionRepository;
	@Autowired
	private CourseRepository courseRepository;

	public String addSection(SectionModel courseSectionModel) {
		List<SectionModel> courseSectionModelList = courseSectionRepository.findBySectionNameAndCourseModel(courseSectionModel.getSectionName(),courseSectionModel.getCourseModel());
		if(courseSectionModelList.size()>0) {
			return courseSectionModel.getSectionName()+" "+" Exists";
		}
		CourseModel courseModel = courseRepository.findById(courseSectionModel.getCourseId()).get();
		courseSectionModel.setCourseModel(courseModel);
		courseSectionRepository.save(courseSectionModel);
		return "Section Added Successfully";
	}

	public List<SectionModel> viewSections(long courseId) {
		CourseModel courseModel = courseRepository.findById(courseId).get();
		System.out.println(courseModel);
		List<SectionModel> courseSectionModelList = courseSectionRepository.findByCourseModel(courseModel);
		return courseSectionModelList;
	}


}
