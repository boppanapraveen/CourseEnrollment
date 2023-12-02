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
@Table(name="results")
public class ResultsModel {
	@Id
	@GeneratedValue
	private long resultId;
	private String status;
	private String answer;
	private Date date;
	@Transient
	private long questionId;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="questionId")
	private QuestionsModel questionsModel;
	@Transient
	private long enrolId;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="enrolId")
	private EnrollsModel enrollsModel;
	public long getResultId() {
		return resultId;
	}
	public void setResultId(long resultId) {
		this.resultId = resultId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public long getQuestionId() {
		return questionId;
	}
	public void setQuestionId(long questionId) {
		this.questionId = questionId;
	}
	public QuestionsModel getQuestionsModel() {
		return questionsModel;
	}
	public void setQuestionsModel(QuestionsModel questionsModel) {
		this.questionsModel = questionsModel;
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
	
	

}
