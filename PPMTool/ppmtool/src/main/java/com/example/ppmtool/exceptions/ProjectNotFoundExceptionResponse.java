package com.example.ppmtool.exceptions;

public class ProjectNotFoundExceptionResponse {
    private String ProjectNotFound;

    public ProjectNotFoundExceptionResponse(String errorMessage){
        this.ProjectNotFound = errorMessage;
    }

    public String getProjectNotFound() {
        return ProjectNotFound;
    }

    public void setProjectNotFound(String errorMessage) {
        this.ProjectNotFound = errorMessage;
    }
}
