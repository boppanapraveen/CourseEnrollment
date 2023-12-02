package com.enrolment.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.enrolment.models.CourseModel;
import com.enrolment.models.InstructorModel;

public interface CourseRepository extends JpaRepository<CourseModel, Long> {


	List<CourseModel> findByInstructorModel(InstructorModel instructorModel);
	@Query(value = "select  count(*)  as total from course", nativeQuery = true)
	String getCourseCount();
	List<CourseModel> findByStatus(String string);
	List<CourseModel> findByStatusAndCourseNameLike(String string, String string2);
	List<CourseModel> findByInstructorModelAndCourseNameLike(InstructorModel instructorModel, String string);
	List<CourseModel> findByCourseNameLike(String string);
	




}
