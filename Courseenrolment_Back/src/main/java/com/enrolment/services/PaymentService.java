package com.enrolment.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.enrolment.models.EnrollsModel;
import com.enrolment.models.PaymentsModel;
import com.enrolment.repositories.EnrollsRepository;
import com.enrolment.repositories.PaymentRepository;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class PaymentService {
	@Autowired private PaymentRepository paymentRepository;
	@Autowired private EnrollsRepository enrollsRepository;

	public PaymentsModel getPayments(long enrolId) {
		EnrollsModel enrollsModel = enrollsRepository.findById(enrolId).get();
		PaymentsModel paymentsModel = paymentRepository.findByEnrollsModel(enrollsModel);
		return paymentsModel;
	}

}
