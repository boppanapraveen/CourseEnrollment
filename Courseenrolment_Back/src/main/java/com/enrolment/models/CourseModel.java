package com.enrolment.models;

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
@Table(name="course")
public class CourseModel {
	@Id
	@GeneratedValue
	
	private long courseId;
	private String courseName;
	private String status;
	private String image;
	private String courseDescription;
	private float coursePrice;
	@Transient
	private String image2;
	@Transient
	private double rating;
	
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="instructorId")
	private InstructorModel instructorModel;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="subCategoryId")
	private SubCategoryModel subCategoryModel;
	public String getImage2() {
		return image2;
	}
	public void setImage2(String image2) {
		this.image2 = image2;
	}
	
	public float getCoursePrice() {
		return coursePrice;
	}
	public void setCoursePrice(float coursePrice) {
		this.coursePrice = coursePrice;
	}
	
	public String getCourseDescription() {
		return courseDescription;
	}
	public void setCourseDescription(String courseDescription) {
		this.courseDescription = courseDescription;
	}
	public long getCourseId() {
		return courseId;
	}
	public void setCourseId(long courseId) {
		this.courseId = courseId;
	}
	public String getCourseName() {
		return courseName;
	}
	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public InstructorModel getInstructorModel() {
		return instructorModel;
	}
	public void setInstructorModel(InstructorModel instructorModel) {
		this.instructorModel = instructorModel;
	}
	public SubCategoryModel getSubCategoryModel() {
		return subCategoryModel;
	}
	public void setSubCategoryModel(SubCategoryModel subCategoryModel) {
		this.subCategoryModel = subCategoryModel;
	}
	public double getRating() {
		return rating;
	}
	public void setRating(double rating) {
		this.rating = rating;
	}
	
	
}
