package com.enrolment.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name="videos")
public class VideosModel {
	@Id
	@GeneratedValue
	private long videoId;
	private String videoTitle;
	private String description;
	private String videoLink;
	private String isFreeVideo;
	@Transient
	@Lob
	private String videoLink2;
	@Transient
	private long sectionId;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="sectionId")
	private SectionModel sectionModel;
	public long getVideoId() {
		return videoId;
	}
	public void setVideoId(long videoId) {
		this.videoId = videoId;
	}
	public String getVideoTitle() {
		return videoTitle;
	}
	public void setVideoTitle(String videoTitle) {
		this.videoTitle = videoTitle;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getVideoLink() {
		return videoLink;
	}
	public void setVideoLink(String videoLink) {
		this.videoLink = videoLink;
	}
	public String getIsFreeVideo() {
		return isFreeVideo;
	}
	public void setIsFreeVideo(String isFreeVideo) {
		this.isFreeVideo = isFreeVideo;
	}
	public long getSectionId() {
		return sectionId;
	}
	public void setSectionId(long sectionId) {
		this.sectionId = sectionId;
	}
	public SectionModel getSectionModel() {
		return sectionModel;
	}
	public void setSectionModel(SectionModel sectionModel) {
		this.sectionModel = sectionModel;
	}
	public String getVideoLink2() {
		return videoLink2;
	}
	public void setVideoLink2(String videoLink2) {
		this.videoLink2 = videoLink2;
	}
	
	
}
