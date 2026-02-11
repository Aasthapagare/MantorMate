package com.divya.Communicationservice.service;

import com.divya.Communicationservice.client.NotificationClient;
import com.divya.Communicationservice.dto.NotificationDTO;
import com.divya.Communicationservice.dto.SendMessageRequest;
import com.divya.Communicationservice.entity.Message;
import com.divya.Communicationservice.repository.MessageRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    private final MessageRepository repository;
    private final NotificationClient notificationClient;
    private final SimpMessagingTemplate messagingTemplate;
    public MessageService(
            MessageRepository repository,
            NotificationClient notificationClient,
            SimpMessagingTemplate messagingTemplate
    ) {
        this.repository = repository;
        this.notificationClient = notificationClient;
        this.messagingTemplate = messagingTemplate;
    }


    public Message sendMessage(SendMessageRequest request) {

        Message msg = new Message();
        msg.setSenderId(request.getSenderId());
        msg.setReceiverId(request.getReceiverId());
        msg.setContent(request.getContent());

        Message savedMsg = repository.save(msg);

        notificationClient.sendNotification(
                new NotificationDTO(
                        savedMsg.getReceiverId(),
                        "New message from " + savedMsg.getSenderId(),
                        "CHAT"
                )
        );

        return savedMsg;
    }

    public List<Message> getChat(String user1, String user2) {
        return repository.findChat(user1, user2);
    }
    public void markMessagesAsSeen(String receiverId, String senderId) {

        int count = repository.markSeen(senderId, receiverId);

        if (count > 0) {
            // 🔥 REAL-TIME SEEN EVENT
            messagingTemplate.convertAndSend(
                    "/topic/seen/" + senderId,
                    receiverId
            );
        }
    }

}

