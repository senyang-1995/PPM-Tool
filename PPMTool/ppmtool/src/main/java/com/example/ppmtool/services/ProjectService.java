package com.example.ppmtool.services;

import com.example.ppmtool.domain.Backlog;
import com.example.ppmtool.domain.Project;
import com.example.ppmtool.exceptions.ProjectIdException;
import com.example.ppmtool.exceptions.ProjectDateException;

import com.example.ppmtool.repositories.BacklogRepository;
import com.example.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.constraints.Null;
import java.util.List;


@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private BacklogRepository backlogRepository;

    public Project saveOrUpdateProject(Project project) {
        if (project.getEnd_date() != null && project.getStart_date() != null && project.getEnd_date().before(project.getStart_date())){
            throw new ProjectDateException("Project end date cannot be before the project start date!");
        }
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            if (project.getId() == null) {
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            }
            else{
                project.setBacklog(this.backlogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
            }
            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project ID '" + project.getProjectIdentifier().toUpperCase() + "' already exists");
        }
    }

    public Project findProjectByIdentifier(String projectId){

        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if (project == null){
            throw new ProjectIdException("Project ID '" + projectId.toUpperCase() + "' doesn't exist");
        }
        return project;
    }

    public List<Project> findAllProjects(){
        return projectRepository.findAll();
    }
    public List<Project> findAllDeleted(boolean isDeleted){return projectRepository.findByDeleted(isDeleted);}

    public Project deleteProjectByIdentifier(String projectId){
        Project toDel = this.findProjectByIdentifier(projectId);
        projectRepository.delete(toDel);
        return toDel;
    }

    public String deleteAllProjects(){
        projectRepository.deleteAll();
        return "All Projects are Deleted";
    }

    public Project removeOrRecoverProject(String projectId){
        Project project = this.findProjectByIdentifier(projectId);
        project.setDeleted(!project.isDeleted());
        return projectRepository.save(project);
    }

    public Project updateProjectByIdentifier(String projectId, Project update){
        Project toUpdate = this.findProjectByIdentifier(projectId);
        update.setProjectIdentifier(update.getProjectIdentifier().toUpperCase());
        if (!toUpdate.getProjectIdentifier().equals(update.getProjectIdentifier())){
            throw new ProjectIdException("cannot change projectId when updating a project!");
        }
        update.setId(toUpdate.getId());
        update.setCreated_At(toUpdate.getCreated_At());
        return this.saveOrUpdateProject(update);
    }

    public void deleteAllShownOrDeletedProjects(boolean isDeleted){
        List<Project> list = findAllDeleted(isDeleted);
        for (Project project: list) {
            projectRepository.delete(project);
        }
    }

    public void removeOrRecoverAllProjects(boolean isDeleted) {
        List<Project> list = findAllDeleted(isDeleted);
        for (Project project: list) {
            project.setDeleted(!project.isDeleted());
            projectRepository.save(project);
        }
    }
}
