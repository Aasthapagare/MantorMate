package com.divya.Notificationservice.Service;

import com.divya.Notificationservice.Entity.Notification;
import com.divya.Notificationservice.Repository.NotificationRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    private final NotificationRepository repository;
    private final SimpMessagingTemplate messagingTemplate;

    public NotificationService(
            NotificationRepository repository,
            SimpMessagingTemplate messagingTemplate
    ) {
        this.repository = repository;
        this.messagingTemplate = messagingTemplate;
    }

    public Notification send(Notification notification) {

        Notification saved = repository.save(notification);
        messagingTemplate.convertAndSend(
                "/topic/notifications/" + notification.getUserId(),
                saved
        );

        return saved;
    }
}
