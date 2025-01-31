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
                                "/leaderboard",
                                "/view-following",
                                "/follow-user",
                                "/unfollow-user",
                                "/player-feed/**"
                        ).permitAll()
                        // All other requests require authentication
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}


//@Configuration
//@EnableWebSecurity
//public class SecurityConfig implements WebMvcConfigurer {
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    // CORS config
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins("http://localhost:3000")
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                .allowedHeaders("Authorization", "Content-Type")
//                .allowCredentials(true);
//    }
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .cors(withDefaults()) // applies CORS config
//                .csrf(csrf -> csrf.disable()) // stateless -> disable CSRF
//                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers(
//                                "/login",
//                                "/signup",
//                                "/view-categories",
//                                "/create-category",
//                                // ... your other endpoints ...
//                                "/player-feed/**"
//                        ).permitAll()
//                        // any other request requires authentication
//                        .anyRequest().authenticated()
//                )
//
//                // The addition of OAuth2 login
//                .oauth2Login(oauth2 -> oauth2
//                                // optionally customize endpoints, success handler, failure handler, etc.
//                                .loginPage("/oauth2/authorization/google")
//                        // The line above is only if you have a custom flow or want to specify a custom endpoint
//                        // otherwise you can just rely on the defaults
//                );
//
//        // If you also want to use the OAuth2 “client” capabilities (e.g., to call external APIs on behalf of the user):
//        // .oauth2Client(Customizer.withDefaults());
//
//        return http.build();
//    }
//}
