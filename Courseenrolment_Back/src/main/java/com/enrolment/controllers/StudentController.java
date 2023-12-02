package com.enrolment.controllers;

import java.io.File;
import java.io.FileOutputStream;
import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import com.enrolment.models.StudentModel;
import com.enrolment.repositories.StudentRepository;
import com.enrolment.services.StudentService;

@RestController
public class StudentController {
	@Autowired
	private StudentService studentService;
	@Autowired private StudentRepository studentRepository;
	@Value("${studentImagePath}")
	String studentImagePath;
    @RequestMapping(value = "customerReg", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String instructorReg(
   		@RequestParam(name="profielPicture") MultipartFile multipartFile,
   		@RequestParam String name,
   		@RequestParam String email,
   		@RequestParam String phone,
   		@RequestParam String password,
   		@RequestParam String address,
   		@RequestParam float walletAmount
   		 
   		 )
    {
    	System.out.println(name);
    	System.out.println(email);
    	System.out.println(phone);
    	System.out.println(password);
    	System.out.println(address);
   	try {
			File uploadedFile = new File(studentImagePath, multipartFile.getOriginalFilename());
			uploadedFile.createNewFile();
			FileOutputStream fos = new FileOutputStream(uploadedFile);
			fos.write(multipartFile.getBytes());
			fos.close();
			StudentModel studentModel = new StudentModel();
			studentModel.setName(name);
			studentModel.setEmail(email);
			studentModel.setPhone(phone);
			studentModel.setPassword(password);
			studentModel.setWalletAmount(walletAmount);
			studentModel.setAddress(address);
			studentModel.setProfilePicture(multipartFile.getOriginalFilename());
			return studentService.customerReg(studentModel);
			
		} catch (Exception e) {
			System.out.println(e);
			return "Fail to upload";
		}
   }
    
    @GetMapping("getStudentProfile")
    public StudentModel getStudentProfile(Principal principal) {
    	return studentService.getStudentProfile(principal.getName());
    }
    
   @GetMapping("getStudentDetails")
   public StudentModel getStudentDetails(@RequestParam("studentId") long studentId) {
	   return studentService.getStudentDetails(studentId);
   }
   
   
   @RequestMapping(value = "updateStudent", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
   public String updateStudent(
  		@RequestParam String name,
  		@RequestParam String email,
  		@RequestParam String phone,
  		@RequestParam String password,
  		@RequestParam float walletAmount,
  		@RequestParam("studentId") long studentId
  		 
  		 )
   
   {
	   System.out.println(studentId);
  	try {
  		   
			StudentModel studentModel = studentRepository.findById(studentId).get();
			studentModel.setName(name);
			studentModel.setEmail(email);
			studentModel.setPhone(phone);
			studentModel.setPassword(password);
			studentModel.setWalletAmount(walletAmount);
			return studentService.updateStudent(studentModel);
			
		} catch (Exception e) {
			System.out.println(e);
			return "Fail to upload";
		}
  }
   @GetMapping("getStudentDetails2")
   public List<StudentModel> getStudentDetails2 (){
	   return studentService.getStudentDetails2();
   }
   
   @GetMapping("updateStudent2")
   public String updateStudent2(@RequestParam("studentId") long studentId) {
	   return studentService.updateStudent2(studentId);
   }
   
   @GetMapping("getStudentStatus2")
   public String getStudentStatus2(Principal principal) {
	   return studentService.getStudentStatus2(principal.getName());
   }

}
