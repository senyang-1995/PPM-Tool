package com.example.ppmtool.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Backlog {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer PTSequence = 1;
    private String projectIdentifier;

    //OneToOne with project (one project will have one backlog)
    //Jsonignore breaks the infinite recursion problem of ownership
    //cascade refresh: delete a project task => refresh the backlog
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "project_id", nullable = false)
    @JsonIgnore
    private Project project;
    //OneToMany projectTasks (one backlog can have many projectTasks, but one projectTask belongs to one backlog)
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH, orphanRemoval = true, mappedBy = "backlog")
    private List<ProjectTask> projectTasks = new ArrayList<>();
    public Backlog(){
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPTSequence() {
        return PTSequence;
    }

    public void setPTSequence(Integer PTSequence) {
        this.PTSequence = PTSequence;
    }

    public String getProjectIdentifier() {
        return projectIdentifier;
    }

    public void setProjectIdentifier(String projectIdentifier) {
        this.projectIdentifier = projectIdentifier;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public List<ProjectTask> getProjectTasks() {
        return projectTasks;
    }

    public void setProjectTasks(List<ProjectTask> projectTasks) {
        this.projectTasks = projectTasks;
    }
}
