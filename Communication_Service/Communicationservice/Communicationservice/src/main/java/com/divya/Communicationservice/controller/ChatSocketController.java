package com.divya.Communicationservice.controller;

import com.divya.Communicationservice.dto.ChatMsgDto;
import com.divya.Communicationservice.repository.MessageRepository;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import com.divya.Communicationservice.entity.Message;
import org.springframework.stereotype.Controller;

@Controller
public class ChatSocketController {
    private final MessageRepository repository;

    public ChatSocketController(MessageRepository repository) {
        this.repository = repository;
    }

    @MessageMapping("/chat.send")
    @SendTo("/topic/messages")
    public Message send(ChatMsgDto dto) {

        Message msg = new Message();
        msg.setSenderId(dto.getSenderId());
        msg.setReceiverId(dto.getReceiverId());
        msg.setContent(dto.getMessage());

        return repository.save(msg);
    }
}

