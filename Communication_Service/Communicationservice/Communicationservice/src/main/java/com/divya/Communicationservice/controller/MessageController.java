package com.divya.Communicationservice.controller;

import com.divya.Communicationservice.client.AuthClient;
import com.divya.Communicationservice.dto.SendMessageRequest;
import com.divya.Communicationservice.dto.UserDTO;
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

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/chat")
public class MessageController {
    private final MessageService service;
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    private AuthClient authClient;


    public MessageController(MessageService service) {
        this.service = service;
    }

    // STUDENT / TEACHER SEND MESSAGE
    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(
            @Valid @RequestBody SendMessageRequest request) {

        String sender = SecurityUtil.getLoggedInUserId();
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
            @RequestParam String otherUser) {

        String loggedInUser = SecurityUtil.getLoggedInUserId();
        service.markMessagesAsSeen(loggedInUser, otherUser);
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
    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers(
            @RequestHeader("Authorization") String token) {

        String currentRole = normalizeRole(SecurityUtil.getLoggedInUserRole());

        List<UserDTO> users = switch (currentRole) {
            case "STUDENT" -> authClient.getAllGuides(token);
            case "GUIDE" -> authClient.getAllStudents(token);
            default -> authClient.getAllUsers(token);
        };

        return ResponseEntity.ok(users);
    }

    private String normalizeRole(String role) {
        if (role == null) {
            return "";
        }

        return role.replace("ROLE_", "").trim().toUpperCase();
    }

}
