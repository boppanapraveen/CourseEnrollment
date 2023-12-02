package com.enrolment.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.enrolment.models.CourseModel;
import com.enrolment.models.EnrollsModel;
import com.enrolment.models.ReviewsModel;
import com.enrolment.models.StudentModel;
import com.enrolment.repositories.CourseRepository;
import com.enrolment.repositories.EnrollsRepository;
import com.enrolment.repositories.ReviewRepository;
import com.enrolment.repositories.StudentRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ReviewService {
	@Autowired private ReviewRepository reviewRepository;
    @Autowired private EnrollsRepository enrollsRepository;
    @Autowired private CourseRepository courseRepository;
    @Autowired private StudentRepository studentRepository;
	public String giveRating(ReviewsModel reviewsModel, long enrolId) {
		EnrollsModel enrollsModel = enrollsRepository.findById(enrolId).get();
		reviewsModel.setEnrollsModel(enrollsModel);
		reviewsModel.setDate(new Date());
		reviewRepository.save(reviewsModel);
		enrollsModel.setStatus2("Review Given");
		return "Your Response Has Been Submitted";
	}
	public List<ReviewsModel> getCourseReviews(long courseId) {
		CourseModel courseModel = courseRepository.findById(courseId).get();
		List<ReviewsModel> reviewsModelsList = reviewRepository.getReviews(courseModel.getCourseId());
		return reviewsModelsList;
	}
	public int StudentRatingCount(String email) {
		StudentModel studentModel = studentRepository.findByEmail(email);
		int ratingCount = reviewRepository.getReviewCount(studentModel.getStudentId());
		System.out.println(ratingCount);
		return ratingCount;
	}

}
