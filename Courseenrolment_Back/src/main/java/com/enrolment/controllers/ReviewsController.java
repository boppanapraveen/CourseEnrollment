package com.enrolment.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.enrolment.models.ReviewsModel;
import com.enrolment.services.ReviewService;

@RestController
public class ReviewsController {
	@Autowired private ReviewService reviewService;
	
	@PostMapping("giveRating")
	public String giveRating(@RequestBody ReviewsModel reviewsModel,@RequestParam("enrolId") long enrolId) {
		return reviewService.giveRating(reviewsModel,enrolId);
	}
	
	@GetMapping("getCourseReviews")
	public List<ReviewsModel> getCourseReviews(@RequestParam("courseId") long courseId){
		return reviewService.getCourseReviews(courseId);
	}
	@GetMapping("StudentRatingCount")
	public int StudentRatingCount(Principal principal) {
		return reviewService.StudentRatingCount(principal.getName());
	}

}
