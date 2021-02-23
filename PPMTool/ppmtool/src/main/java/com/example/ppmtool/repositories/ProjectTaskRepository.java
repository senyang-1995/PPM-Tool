package com.example.ppmtool.repositories;

import com.example.ppmtool.domain.ProjectTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectTaskRepository extends JpaRepository<ProjectTask, Long> {
    List<ProjectTask> findByProjectIdentifierOrderByPriority(String projectIdentifier);
    ProjectTask findByProjectSequence(String projectSequence);
}
