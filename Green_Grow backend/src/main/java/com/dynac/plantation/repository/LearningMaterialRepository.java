package com.dynac.plantation.repository;

import com.dynac.plantation.model.LearningMaterial;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LearningMaterialRepository extends MongoRepository<LearningMaterial, String> {
    List<LearningMaterial> findAllByOrderByCreatedAtDesc();
}
