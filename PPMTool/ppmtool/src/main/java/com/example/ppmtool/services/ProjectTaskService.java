package com.example.ppmtool.services;

import com.example.ppmtool.domain.Backlog;
import com.example.ppmtool.domain.ProjectTask;
import com.example.ppmtool.repositories.BacklogRepository;
import com.example.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectTaskService {
    @Autowired
    private BacklogRepository backlogRepository;
    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask){
        projectIdentifier = projectIdentifier.toUpperCase();
        //PTs to be added to an existing project, project != null, or the backlog exists
        Backlog backlog = this.backlogRepository.findByProjectIdentifier(projectIdentifier);
        projectTask.setProjectIdentifier(projectIdentifier);
        //set the backlog to the projectTask
        projectTask.setBacklog(backlog);
        //project sequence organized to be (projectIdentifer + "-" + this.backlog.PTsequence)
        projectTask.setProjectSequence(projectIdentifier + "-" + backlog.getPTSequence());
        //increase backlog.PTsequence counter
        backlog.setPTSequence(backlog.getPTSequence()+1);
        //set initial priority && status when they are null
        if (projectTask.getPriority() == null || projectTask.getPriority() == 0){
            //1 high, 2 mid, 3 low
            projectTask.setPriority(3);
        }
        if (projectTask.getStatus() == null || projectTask.getStatus() == ""){
            projectTask.setStatus("TO_DO");
        }
        return projectTaskRepository.save(projectTask);
    }
    public List<ProjectTask> findBackLogById(String projectIdentifier){
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIdentifier);
    }
}
