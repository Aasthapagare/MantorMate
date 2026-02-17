package com.divya.Communicationservice.controller;

import com.divya.Communicationservice.dto.SendMessageRequest;
import com.divya.Communicationservice.entity.Message;
import com.divya.Communicationservice.repository.MessageRepository;
import com.divya.Communicationservice.security.SecurityUtil;
import com.divya.Communicationservice.service.MessageService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.messaging.simp.SimpMessagingTemplate;


import java.io.File;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/chat")
public class MessageController {
    private final MessageService service;
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;


    public MessageController(MessageService service) {
        this.service = service;
    }

    // STUDENT / TEACHER SEND MESSAGE
    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(
            @Valid @RequestBody SendMessageRequest request) {

        String sender =
                SecurityUtil.getLoggedInUserId();

        request.setSenderId(sender);

        return ResponseEntity.ok(service.sendMessage(request));
    }

    // BOTH CAN RECEIVE CHAT
    @GetMapping("/history")
    public ResponseEntity<List<Message>> getChat(
            @RequestParam String otherUser) {

        String loggedInUser =
                SecurityUtil.getLoggedInUserId();

        return ResponseEntity.ok(
                service.getChat(loggedInUser, otherUser)
        );
    }
    @PostMapping("/seen")
    public ResponseEntity<Void> markSeen(
            @RequestParam String senderId,
            @RequestParam String receiverId) {

        service.markMessagesAsSeen(receiverId, senderId);
        System.out.println("🔥 SENDING SEEN EVENT TO: /topic/seen/" + senderId);
        messagingTemplate.convertAndSend(
                "/topic/seen/" + senderId,
                Optional.of(Map.of(
                        "receiverId", receiverId,
                        "status", "SEEN"
                ))
        );
        return ResponseEntity.ok().build();
    }

    @PostMapping("/send-file")
    public ResponseEntity<Message> sendFile(
            @RequestParam String senderId,
            @RequestParam String receiverId,
            @RequestParam MultipartFile file
    ) throws Exception {

        Message msg = new Message();
        msg.setSenderId(senderId);
        msg.setReceiverId(receiverId);

        // save file
        String path = "uploads/" + file.getOriginalFilename();
        file.transferTo(new File(path));

        msg.setFileUrl(path);
        msg.setFileType(file.getContentType());

        return ResponseEntity.ok(messageRepository.save(msg));
    }



}
