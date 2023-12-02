package com.enrolment.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.enrolment.models.CourseModel;
import com.enrolment.models.EnrollsModel;
import com.enrolment.models.StudentModel;

public interface EnrollsRepository extends JpaRepository<EnrollsModel, Long> {
	@Query(value = "SELECT count(*) FROM enrolls WHERE course_id=? and student_id=? and status!='Dropped'", nativeQuery = true)
	int getEnrollCount(long courseId, long studentId);
	List<EnrollsModel> findByStudentModel(StudentModel studentModel);
	
	@Query(value = "SELECT * FROM enrolls WHERE course_id in (select course_id from  course where instructor_id=?)", nativeQuery = true)
	List<EnrollsModel> getEnrolls(long instructorId);
	EnrollsModel findByCourseModelAndStudentModel(CourseModel courseModel, StudentModel studentModel);
	List<EnrollsModel> findByCourseModel(CourseModel courseModel);

}
