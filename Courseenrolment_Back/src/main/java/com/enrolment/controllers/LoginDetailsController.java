package com.enrolment.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.enrolment.models.LoginDetailsModel;
import com.enrolment.services.LoginService;

@RestController
public class LoginDetailsController {
	@Autowired
	private LoginService loginService;
	
	
	@PostMapping("adminLoginaction")
	public ResponseEntity<String> adminLoginaction(@RequestBody LoginDetailsModel loginDetailsModel) {
		return loginService.loginAction(loginDetailsModel);
	}
	
	@PostMapping("instructorLogin")
	public ResponseEntity<String> instructorLogin(@RequestBody LoginDetailsModel loginDetailsModel) {
		return loginService.loginAction(loginDetailsModel);
	}
	
	@PostMapping("studentLogin")
	public ResponseEntity<String> studentLogin(@RequestBody LoginDetailsModel loginDetailsModel) {
		return loginService.loginAction(loginDetailsModel);
	}
	

}
