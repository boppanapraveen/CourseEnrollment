package com.enrolment.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.enrolment.models.CourseModel;
import com.enrolment.models.SectionModel;

public interface SectionRepository extends JpaRepository<SectionModel, Long> {



	List<SectionModel> findBySectionNameAndCourseModel(String sectionName, CourseModel courseModel);

	List<SectionModel> findByCourseModel(CourseModel courseModel);










}
