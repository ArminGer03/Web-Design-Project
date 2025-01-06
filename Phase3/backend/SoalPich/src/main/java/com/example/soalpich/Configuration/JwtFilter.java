package com.example.soalpich.Configuration;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebFilter(urlPatterns = "/*")  // Apply this filter to all incoming requests
public class JwtFilter extends OncePerRequestFilter {

    private final String SECRET_KEY = "ManDigehRadDadamVelamKonidShomaHamRadBedidBehtareZendegiRahattare";  // Use your actual secret key

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                // Parse the token and extract the user information
                String username = Jwts.parser()
                        .setSigningKey(SECRET_KEY)
                        .parseClaimsJws(token)
                        .getBody()
                        .getSubject(); // Username or user ID

                if (username != null) {
                    // Set authentication in the security context
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, null, null);
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);  // Set the authentication object
                }
            } catch (JwtException e) {
                logger.error("JWT parsing error: " + e.getMessage()); // Log the error if token parsing fails
            }
        }

        filterChain.doFilter(request, response);  // Proceed to the next filter or endpoint
    }
}
