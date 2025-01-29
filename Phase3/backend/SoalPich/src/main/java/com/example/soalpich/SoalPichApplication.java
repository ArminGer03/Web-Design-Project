package com.example.soalpich;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class SoalPichApplication {

	public static void main(String[] args) {
		SpringApplication.run(SoalPichApplication.class, args);
	}

}
