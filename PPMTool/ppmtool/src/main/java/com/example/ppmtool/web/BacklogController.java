package com.example.ppmtool.web;

import com.example.ppmtool.domain.ProjectTask;
import com.example.ppmtool.services.MapValidationErrorService;
import com.example.ppmtool.services.ProjectTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {
    @Autowired
    ProjectTaskService projectTaskService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/{projectIdentifier}")
    public ResponseEntity<?> addPTtoBacklog(@PathVariable String projectIdentifier, @Valid @RequestBody ProjectTask projectTask,
                                            BindingResult result){
        if (result.hasErrors()) return mapValidationErrorService.MapValidationService(result);
        return new ResponseEntity<>(projectTaskService.addProjectTask(projectIdentifier, projectTask), HttpStatus.CREATED);
    }
    
    @GetMapping("/{projectIdentifier}")
    public ResponseEntity<?> getProjectBacklog(@PathVariable String projectIdentifier){
        return new ResponseEntity<>(projectTaskService.findBackLogById(projectIdentifier), HttpStatus.OK);
    }


}
