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
@Table(name="payments")
public class PaymentsModel {
	@Id
	@GeneratedValue
	private long paymentId;
	private String status;
	private float amount;
	private Date date;
	@Transient
	private long enrolId;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="enrolId")
	private EnrollsModel enrollsModel;
	public long getPaymentId() {
		return paymentId;
	}
	public void setPaymentId(long paymentId) {
		this.paymentId = paymentId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public float getAmount() {
		return amount;
	}
	public void setAmount(float amount) {
		this.amount = amount;
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
