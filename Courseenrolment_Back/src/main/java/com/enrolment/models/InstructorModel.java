package com.enrolment.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name="instructor")
public class InstructorModel {
	@Id
	@GeneratedValue
	private long instructorId;
	private String name;
	private String email;
	private String phone;
	private String password;
	private String address;
	private String about;
	private String profielPicture;
	private String status;
	@Transient
	private String profielPicture2;
	@Transient
	private long credentialId;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	@JoinColumn(name="credentialId")
	private LoginDetailsModel loginDetailsModel;
	public long getCredentialId() {
		return credentialId;
	}
	public void setCredentialId(long credentialId) {
		this.credentialId = credentialId;
	}
	public LoginDetailsModel getLoginDetailsModel() {
		return loginDetailsModel;
	}
	public void setLoginDetailsModel(LoginDetailsModel loginDetailsModel) {
		this.loginDetailsModel = loginDetailsModel;
	}

	public long getInstructorId() {
		return instructorId;
	}
	public void setInstructorId(long instructorId) {
		this.instructorId = instructorId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getAbout() {
		return about;
	}
	public void setAbout(String about) {
		this.about = about;
	}
	public String getProfielPicture() {
		return profielPicture;
	}
	public void setProfielPicture(String profielPicture) {
		this.profielPicture = profielPicture;
	}
	public String getProfielPicture2() {
		return profielPicture2;
	}
	public void setProfielPicture2(String profielPicture2) {
		this.profielPicture2 = profielPicture2;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	

}
