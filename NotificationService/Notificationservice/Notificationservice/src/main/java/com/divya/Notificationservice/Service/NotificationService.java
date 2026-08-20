package com.divya.Notificationservice.Service;

import com.divya.Notificationservice.Entity.Notification;
import com.divya.Notificationservice.Repository.NotificationRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;

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

    public List<Notification> getUnreadForUser(String userId) {
        return repository.findByUserIdInAndSeenFalse(buildLookupIds(userId));
    }

    private List<String> buildLookupIds(String userId) {
        LinkedHashSet<String> lookupIds = new LinkedHashSet<>();

        if (userId == null) {
            return new ArrayList<>(lookupIds);
        }

        String normalized = userId.trim();
        if (normalized.isEmpty()) {
            return new ArrayList<>(lookupIds);
        }

        lookupIds.add(normalized);

        String digitsOnly = normalized.replaceAll("\\D", "");
        if (!digitsOnly.isEmpty()) {
            lookupIds.add(digitsOnly);
        }

        return new ArrayList<>(lookupIds);
    }
}
