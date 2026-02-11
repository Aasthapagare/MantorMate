package com.divya.Communicationservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class CommunicationserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CommunicationserviceApplication.class, args);
	}

}
