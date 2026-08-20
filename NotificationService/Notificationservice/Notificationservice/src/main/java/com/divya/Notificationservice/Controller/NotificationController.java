package com.divya.Notificationservice.Controller;

import com.divya.Notificationservice.Entity.Notification;
import com.divya.Notificationservice.Repository.NotificationRepository;
import com.divya.Notificationservice.Service.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/notifications")
public class NotificationController {
    private final NotificationRepository repository;
    private final NotificationService notificationService;

    public NotificationController(
            NotificationRepository repository,
            NotificationService notificationService
    ) {
        this.repository = repository;
        this.notificationService = notificationService;
    }

    @PostMapping
    public Notification create(@RequestBody Notification n) {
        return notificationService.send(n);
    }

    @GetMapping("/{userId}")
    public List<Notification> unread(@PathVariable String userId) {
        return notificationService.getUnreadForUser(userId);
    }
    @PutMapping("/seen/{id}")
    public void markSeen(@PathVariable Long id) {
        Notification n = repository.findById(id).orElseThrow();
        n.setSeen(true);
        repository.save(n);
    }


}
