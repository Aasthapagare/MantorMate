package com.MentorMate.Video_call_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class VideoCallServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(VideoCallServiceApplication.class, args);
	}

}
