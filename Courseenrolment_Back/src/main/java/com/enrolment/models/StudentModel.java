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
@Table(name="students")
public class StudentModel {
	@Id
	@GeneratedValue
	private long studentId;
	private String name;
	private String email;
	private String phone;
	private String password;
	private String address;
	private String profilePicture;
	private String status;
	@Transient
	private String profilePicture2;
	private float walletAmount;
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
	public long getStudentId() {
		return studentId;
	}
	public void setStudentId(long studentId) {
		this.studentId = studentId;
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
	public String getProfilePicture() {
		return profilePicture;
	}
	public void setProfilePicture(String profilePicture) {
		this.profilePicture = profilePicture;
	}
	public float getWalletAmount() {
		return walletAmount;
	}
	public void setWalletAmount(float walletAmount) {
		this.walletAmount = walletAmount;
	}
	public String getProfilePicture2() {
		return profilePicture2;
	}
	public void setProfilePicture2(String profilePicture2) {
		this.profilePicture2 = profilePicture2;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	

}
