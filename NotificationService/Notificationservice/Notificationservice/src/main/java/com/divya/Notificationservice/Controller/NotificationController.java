package com.divya.Notificationservice.Controller;

import com.divya.Notificationservice.Entity.Notification;
import com.divya.Notificationservice.Repository.NotificationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {
    private final NotificationRepository repository;

    public NotificationController(NotificationRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Notification create(@RequestBody Notification n) {
        return repository.save(n);
    }

    @GetMapping("/{userId}")
    public List<Notification> unread(@PathVariable String userId) {
        return repository.findByUserIdAndSeenFalse(userId);
    }
    @PutMapping("/seen/{id}")
    public void markSeen(@PathVariable Long id) {
        Notification n = repository.findById(id).orElseThrow();
        n.setSeen(true);
        repository.save(n);
    }


}
