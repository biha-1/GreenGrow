package com.dynac.plantation.repository;

import com.dynac.plantation.model.Poll;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PollRepository extends MongoRepository<Poll, String> {
    List<Poll> findAllByOrderByCreatedAtDesc();
}