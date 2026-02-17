package com.divya.Notificationservice.Repository;

import com.divya.Notificationservice.Entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Long> {
    List<Notification> findByUserIdAndSeenFalse(String userId);
}
