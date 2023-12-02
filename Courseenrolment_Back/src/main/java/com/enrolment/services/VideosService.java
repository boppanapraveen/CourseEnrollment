package com.enrolment.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import com.enrolment.models.SectionModel;
import com.enrolment.models.VideosModel;
import com.enrolment.repositories.SectionRepository;
import com.enrolment.repositories.VideosRepository;

import jakarta.transaction.Transactional;
import reactor.core.publisher.Mono;

@Service
@Transactional
public class VideosService {
	@Autowired
	private VideosRepository videosRepository;
	@Autowired
	private SectionRepository sectionRepository;
	@Value("${video}")
	String video;

    @Autowired
    private ResourceLoader resourceLoader;
    
    private static final String FORMAT="classpath:videos/%s";


    public Mono<Resource> getVideo(String title){
     return Mono.fromSupplier(()->resourceLoader.
    		 getResource(String.format(FORMAT,title)));
    }

	public String addVideos(VideosModel videosModel) {
		System.out.println(videosModel.getSectionId());
		SectionModel sectionModel = sectionRepository.findById(videosModel.getSectionId()).get();
		System.out.println(sectionModel.getSectionId());
		videosModel.setSectionModel(sectionModel);
		videosRepository.save(videosModel);
		return "Added Successfully";
	}

	public List<VideosModel> videosService(long sectionId) {
		List<VideosModel> videoModel2 = new ArrayList<VideosModel>();
		SectionModel sectionModel = sectionRepository.findById(sectionId).get();
		
		List<VideosModel> videosModelsList = videosRepository.findBySectionModel(sectionModel);
		Iterator<VideosModel> iterator = videosModelsList.iterator();
		while(iterator.hasNext()) {
			VideosModel videosModel  = (VideosModel) iterator.next();
			try {
				 File file=new File(video+"/"+videosModel.getVideoLink());
				 InputStream in = new FileInputStream(file);
				 videosModel.setVideoLink2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
				 } catch (Exception e) {
				 System.out.println(e);
				 }
			videoModel2.add(videosModel);
		}
		return videosModelsList;
	}

}
