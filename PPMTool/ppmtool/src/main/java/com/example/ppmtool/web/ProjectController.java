package com.example.ppmtool.web;


import com.example.ppmtool.domain.Project;
import com.example.ppmtool.services.MapValidationErrorService;
import com.example.ppmtool.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/project")
@CrossOrigin
public class ProjectController {
    
    @Autowired
    private ProjectService projectService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createNewProject (@Valid @RequestBody Project project, BindingResult result){
        if (result.hasErrors()) return mapValidationErrorService.MapValidationService(result);
        return new ResponseEntity<>(projectService.saveOrUpdateProject(project), HttpStatus.CREATED);
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<?> updateById(@PathVariable String projectId, @Valid @RequestBody Project update, BindingResult result){
        if (result.hasErrors()) return mapValidationErrorService.MapValidationService(result);
        return new ResponseEntity<>(projectService.updateProjectByIdentifier(projectId, update), HttpStatus.OK);
    }

    @PutMapping("/{projectId}/removeOrRecover")
    public ResponseEntity<?> removeOrRecoverProjectById(@PathVariable String projectId){
        return new ResponseEntity<>(projectService.removeOrRecoverProject(projectId), HttpStatus.ACCEPTED);
    }


    @GetMapping("/{projectId}")
    public ResponseEntity<?> getProjectById(@PathVariable String projectId){
        return new ResponseEntity<>(projectService.findProjectByIdentifier(projectId), HttpStatus.ACCEPTED);
    }
    
    @GetMapping("/all")
    public ResponseEntity<?> getAllProjects(){
        return new ResponseEntity<>(projectService.findAllProjects(), HttpStatus.ACCEPTED);
    }

    @GetMapping("/all/{isDeleted}")
    public ResponseEntity<?> getAllProjects(@PathVariable String isDeleted){
        if (isDeleted.equals("show")) return new ResponseEntity<>(projectService.findAllDeleted(false), HttpStatus.ACCEPTED);
        else if (isDeleted.equals("deleted")) return new ResponseEntity<>(projectService.findAllDeleted(true), HttpStatus.ACCEPTED);
        else return new ResponseEntity<>(projectService.findAllProjects(), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> delProjectById(@PathVariable String projectId){
        return new ResponseEntity<>(projectService.deleteProjectByIdentifier(projectId), HttpStatus.OK);
    }

    @DeleteMapping("/all")
    public ResponseEntity<?> delAllProjects(){
        return new ResponseEntity<>(projectService.deleteAllProjects(),HttpStatus.OK);
    }

    @DeleteMapping("/all/{isDeleted}")
    public ResponseEntity<?> delAllShownOrDeletedProjects(@PathVariable String isDeleted){
        boolean status = (isDeleted.equals("show"))? false: true;
        projectService.deleteAllShownOrDeletedProjects(status);
        return new ResponseEntity<>("All (isDeleted: " + status + ") projects are deleted",HttpStatus.OK);
    }

    @PutMapping("/all/remove")
    public ResponseEntity<?> removeAllProjects(){
        projectService.removeOrRecoverAllProjects(false);
        String message = "All shown projects are removed";
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PutMapping("/all/recover")
    public ResponseEntity<?> recoverAllProjects(){
        projectService.removeOrRecoverAllProjects(true);
        String message = "All removed projects are recovered";
        return new ResponseEntity<>(message, HttpStatus.OK);
    }


}
