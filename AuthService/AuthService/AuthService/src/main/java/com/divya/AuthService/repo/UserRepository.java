package com.divya.AuthService.repo;

import com.divya.AuthService.dto.UserDto;
import com.divya.AuthService.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUserId(String userId);

    List<UserDto> findByRole(String guide);
    Optional<User> findByEnrollmentNumber(String enrollmentNumber);
}
