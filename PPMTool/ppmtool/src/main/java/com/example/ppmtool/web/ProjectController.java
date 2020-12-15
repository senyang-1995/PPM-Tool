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

    @GetMapping("/{projectId}")
    public ResponseEntity<?> getProjectById(@PathVariable String projectId){
        return new ResponseEntity<>(projectService.findProjectByIdentifier(projectId), HttpStatus.ACCEPTED);
    }
    
    @GetMapping("/all")
    public ResponseEntity<?> getAllProjects(){
        return new ResponseEntity<>(projectService.findAllProjects(), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> delProjectById(@PathVariable String projectId){
        return new ResponseEntity<>(projectService.deleteProjectByIdentifier(projectId), HttpStatus.OK);
    }

    @DeleteMapping("/all")
    public ResponseEntity<?> delAllProjects(){
        return new ResponseEntity<>(projectService.deleteAllProjects(),HttpStatus.OK);
    }

}
