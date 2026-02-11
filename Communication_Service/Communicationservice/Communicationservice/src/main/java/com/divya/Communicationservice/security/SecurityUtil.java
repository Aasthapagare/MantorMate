package com.divya.Communicationservice.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {
    public static String getLoggedInUserId() {

        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        return auth.getName(); // username / rollNo / employeeId
    }

    public static String getLoggedInRole() {

        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        return auth.getAuthorities()
                .iterator()
                .next()
                .getAuthority();
    }
}
