package com.divya.Communicationservice.repository;

import com.divya.Communicationservice.entity.Message;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message,Long>
{
    @Query("""
      SELECT m FROM Message m
      WHERE (m.senderId = :user1 AND m.receiverId = :user2)
         OR (m.senderId = :user2 AND m.receiverId = :user1)
      ORDER BY m.timestamp
    """)
    List<Message> findChat(
            @Param("user1") String user1,
            @Param("user2") String user2
    );
    List<Message> findByReceiverIdAndSeenFalse(String receiverId);
    @Modifying
    @Transactional
    @Query("""
UPDATE Message m
SET m.seen = true
WHERE m.senderId = :senderId
  AND m.receiverId = :receiverId
  AND m.seen = false
""")
    int markSeen(
            @Param("senderId") String senderId,
            @Param("receiverId") String receiverId
    );

}

