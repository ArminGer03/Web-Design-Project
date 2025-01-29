package com.example.soalpich.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig implements WebMvcConfigurer {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Update CORS Configuration to include the correct origin with port 3000
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // Specify the correct origin with port
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Include OPTIONS for preflight
                .allowedHeaders("Authorization", "Content-Type")
                .allowCredentials(true);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors() // Enable CORS with the above configuration
                .and()
                .csrf(csrf -> csrf.disable()) // Disable CSRF since it's a stateless API
                .authorizeHttpRequests(auth -> auth
                        // Define public endpoints using requestMatchers
                        .requestMatchers(
                                "/login",
                                "/signup",
                                "/view-categories",
                                "/create-category",
                                "/delete-category/**",
                                "/edit-category/**",
                                "/category/**",
                                "/view-questions",
                                "/create-question",
                                "/delete-question/**",
                                "/edit-question/**",
                                "/question/**",
                                "/answer-category/**",
                                "/answer-random",
                                "/update-score",
                                "/answered-questions/**",
                                "/user-answers/**",
                                "/leaderboard"
                        ).permitAll()
                        // All other requests require authentication
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}
