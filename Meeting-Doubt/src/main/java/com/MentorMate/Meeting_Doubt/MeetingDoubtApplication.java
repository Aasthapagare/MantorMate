package com.MentorMate.Meeting_Doubt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients

public class MeetingDoubtApplication {

	public static void main(String[] args) {
		SpringApplication.run(MeetingDoubtApplication.class, args);
	}

}
