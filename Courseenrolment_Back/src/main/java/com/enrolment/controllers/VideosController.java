package com.enrolment.controllers;

import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.enrolment.models.VideosModel;
import com.enrolment.services.VideosService;

import reactor.core.publisher.Mono;

@RestController
public class VideosController {
	@Autowired
	private VideosService videosService;


    @GetMapping(value = "video/{title}", produces = "video/mp4")
    public Mono<Resource> getVideos(@PathVariable String title, @RequestHeader("Range") String range) {
        System.out.println("range in bytes() : " + range+"ji");
        return videosService.getVideo(title);
    }
	
	
	@Value("${video}")
	String video;
	@RequestMapping(value = "addVideos", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String addVideos(
   		@RequestParam(name="videoLink") MultipartFile multipartFile,
   		@RequestParam String videoTitle,
   		@RequestParam long sectionId,
   		@RequestParam String description,
   		@RequestParam String isFreeVideo
   		 
   		 ) {
   	try {
			File uploadedFile = new File(video, multipartFile.getOriginalFilename());
			uploadedFile.createNewFile();
			FileOutputStream fos = new FileOutputStream(uploadedFile);
			fos.write(multipartFile.getBytes());
			fos.close();
			
			VideosModel videosModel = new VideosModel();
			videosModel.setDescription(description);
			videosModel.setVideoTitle(videoTitle);
			videosModel.setIsFreeVideo(isFreeVideo);
			videosModel.setVideoLink(multipartFile.getOriginalFilename());
			videosModel.setSectionId(sectionId);
			return videosService.addVideos(videosModel);
		} catch (Exception e) {
			System.out.println(e);
			return "Fail to upload";
		}
   }
	
//	 @RequestMapping(value = "addVideos", method = RequestMethod.POST, consumes = "multipart/form-data")
//	 public ResponseEntity<List<String>> createAgency(
//	            @RequestParam(value = "username", required = true) String username,
//	            @RequestParam(value = "pic1", required = true) MultipartFile pic1File,
//	            MultipartHttpServletRequest request, ModelAndView modelAndView) {
//	        List<String> requestKeys=new ArrayList<String>();
//	        List<String> originalFileName=new ArrayList<String>();
//
//	        request.getFileNames().forEachRemaining(requestKeys::add);
//	        for(String multipartFile:requestKeys) {
//	            originalFileName.add(request.getFile(multipartFile).getOriginalFilename());
//	        }
////	        storageService.store(pic1File);
//	        System.out.println("************************");   
//	        return new ResponseEntity<List<String>>(originalFileName, HttpStatus.CREATED);
//	    }
	
	@GetMapping("getVideos") 
	public List<VideosModel> getVideos(@RequestParam("sectionId") long sectionId){
		return videosService.videosService(sectionId);
	}

}

