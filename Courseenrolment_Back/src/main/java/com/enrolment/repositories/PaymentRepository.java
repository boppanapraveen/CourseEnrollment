package com.enrolment.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.enrolment.models.EnrollsModel;
import com.enrolment.models.PaymentsModel;

public interface PaymentRepository extends JpaRepository<PaymentsModel, Long> {

	PaymentsModel findByEnrollsModel(EnrollsModel enrollsModel);

}
