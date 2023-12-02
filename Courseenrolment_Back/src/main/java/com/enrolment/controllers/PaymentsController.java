package com.enrolment.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.enrolment.models.PaymentsModel;
import com.enrolment.services.PaymentService;

@RestController
public class PaymentsController {
	@Autowired private PaymentService paymentService;
	
	@GetMapping("getPayments")
	public PaymentsModel getPayments(@RequestParam("enrolId") long enrolId) {
		return paymentService.getPayments(enrolId);
	}
	

}
