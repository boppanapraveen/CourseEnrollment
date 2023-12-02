package com.enrolment.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.enrolment.models.ReviewsModel;

public interface ReviewRepository extends JpaRepository<ReviewsModel, Long> {
	@Query(value = "SELECT avg(rating) FROM reviews WHERE enrol_id in(select enrol_id from enrolls where course_id=?)", nativeQuery = true)
	String getRating(long courseId);
	
	@Query(value = "SELECT * FROM reviews WHERE enrol_id in(select enrol_id from enrolls where course_id=?)", nativeQuery = true)
	List<ReviewsModel> getReviews(long courseId);
	
	@Query(value = "SELECT count(*) FROM reviews WHERE student_id not in (select student_id)", nativeQuery = true)
	int getReviewCount(long studentId);

}
