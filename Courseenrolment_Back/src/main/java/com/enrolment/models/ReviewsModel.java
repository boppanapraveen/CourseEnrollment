package com.enrolment.models;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name="reviews")
public class ReviewsModel {
	@Id
	@GeneratedValue
	
	private long reviewId;
	private String rating;
	private String review;
	private Date date;
	
	@Transient
	private long enrolId;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="enrolId")
	private EnrollsModel enrollsModel;
	public long getReviewId() {
		return reviewId;
	}
	public void setReviewId(long reviewId) {
		this.reviewId = reviewId;
	}
	public String getRating() {
		return rating;
	}
	public void setRating(String rating) {
		this.rating = rating;
	}
	public String getReview() {
		return review;
	}
	public void setReview(String review) {
		this.review = review;
	}
	public long getEnrolId() {
		return enrolId;
	}
	public void setEnrolId(long enrolId) {
		this.enrolId = enrolId;
	}
	public EnrollsModel getEnrollsModel() {
		return enrollsModel;
	}
	public void setEnrollsModel(EnrollsModel enrollsModel) {
		this.enrollsModel = enrollsModel;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	
	

}
