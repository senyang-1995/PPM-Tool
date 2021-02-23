package com.example.ppmtool.services;

import com.example.ppmtool.domain.Backlog;
import com.example.ppmtool.domain.ProjectTask;
import com.example.ppmtool.exceptions.ProjectIdException;
import com.example.ppmtool.exceptions.ProjectNotFoundException;
import com.example.ppmtool.repositories.BacklogRepository;
import com.example.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        Backlog backlog = findBacklogById(projectIdentifier);
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
    public List<ProjectTask> findProjectTasksById(String projectIdentifier){
        findBacklogById(projectIdentifier);
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIdentifier);
    }
    public Backlog findBacklogById(String projectIdentifer){
        Backlog backlog = this.backlogRepository.findByProjectIdentifier(projectIdentifer);
        if (backlog == null) throw new ProjectNotFoundException("Project Not Found!");
        return backlog;
    }

    public ProjectTask findProjectTaskBySequence(String projectIdentifier, String projectSequence){
        findBacklogById(projectIdentifier);
        ProjectTask pt = projectTaskRepository.findByProjectSequence(projectSequence);
        if (pt == null) throw new ProjectNotFoundException("Project Task Not Found!");
        if (!pt.getProjectIdentifier().equals(projectIdentifier.toUpperCase()))
            throw new ProjectIdException("Project Task ID does not match the Project ID!");
        return pt;
    }

    public ProjectTask updateProjectTaskBySequence(String projectIdentifier, String projectSequence, ProjectTask update){
        ProjectTask oldPT = findProjectTaskBySequence(projectIdentifier, projectSequence);
        if (update.getProjectIdentifier() == null) update.setProjectIdentifier(oldPT.getProjectIdentifier());
        update.setProjectIdentifier(update.getProjectIdentifier().toUpperCase());
        if (!update.getProjectIdentifier().equals(oldPT.getProjectIdentifier()))
            throw new ProjectIdException("cannot change the project Identifier!");
        update.setId(oldPT.getId());
        update.setProjectSequence(oldPT.getProjectSequence());
        update.setBacklog(oldPT.getBacklog());
        if (update.getPriority() == null || update.getPriority() == 0){
            update.setPriority(oldPT.getPriority());
        }
        if (update.getStatus() == null || update.getStatus() == ""){
            update.setStatus(oldPT.getStatus());
        }
        if (update.getAcceptanceCriteria() == null || update.getAcceptanceCriteria() == ""){
            update.setAcceptanceCriteria(oldPT.getAcceptanceCriteria());
        }
        if (update.getCreate_At() == null){
            update.setCreate_At(oldPT.getCreate_At());
        }
        if (update.getDueDate() == null){
            update.setDueDate(oldPT.getDueDate());
        }
        return projectTaskRepository.save(update);
    }

    public void deleteProjectTaskBySequence(String projectIdentifier, String projectSequence){
        ProjectTask pt = findProjectTaskBySequence(projectIdentifier, projectSequence);
        projectTaskRepository.delete(pt);
    }

    public void deleteAllProjectTasks(String projectIdentifier){
        List<ProjectTask> list = findProjectTasksById(projectIdentifier);
        for (ProjectTask pt : list) projectTaskRepository.delete(pt);
    }

    public void removeOrRecoverAllPts(String projectIdentifier, boolean isDeleted) {
        List<ProjectTask> list = findByDeleted(projectIdentifier, isDeleted);
        for (ProjectTask pt: list){
            pt.setDeleted(!pt.isDeleted());
            projectTaskRepository.save(pt);
        }
    }

    private List<ProjectTask> findByDeleted(String projectIdentifier, boolean isDeleted) {
        List<ProjectTask> res = new ArrayList<>();
        Backlog backlog = findBacklogById(projectIdentifier);
        for (ProjectTask pt: backlog.getProjectTasks()){
            if (pt.isDeleted() == isDeleted) res.add(pt);
        }
        return res;
    }

    public ProjectTask removeOrRecoverPt(String projectIdentifier, String projectSequence) {
        ProjectTask pt = findProjectTaskBySequence(projectIdentifier, projectSequence);
        pt.setDeleted(!pt.isDeleted());
        return projectTaskRepository.save(pt);
    }

    public void deleteAllRemovedPts(String projectIdentifier) {
        List<ProjectTask> list = findByDeleted(projectIdentifier, true);
        for (ProjectTask pt: list) projectTaskRepository.delete(pt);
    }
}
