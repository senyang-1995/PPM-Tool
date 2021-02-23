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
                                            BindingResult result) {
        if (result.hasErrors()) return mapValidationErrorService.MapValidationService(result);
        return new ResponseEntity<>(projectTaskService.addProjectTask(projectIdentifier, projectTask), HttpStatus.CREATED);
    }

    @GetMapping("/{projectIdentifier}")
    public ResponseEntity<?> getProjectBacklog(@PathVariable String projectIdentifier) {
        return new ResponseEntity<>(projectTaskService.findProjectTasksById(projectIdentifier), HttpStatus.OK);
    }

    @GetMapping("/{projectIdentifier}/{projectSequence}")
    public ResponseEntity<?> getProjectTaskBySeqeunce(@PathVariable("projectIdentifier") String projectIdentifier, @PathVariable("projectSequence") String projectSequence) {
        return new ResponseEntity<>(projectTaskService.findProjectTaskBySequence(projectIdentifier, projectSequence), HttpStatus.OK);
    }

    @PatchMapping("/{projectIdentifier}/{projectSequence}")
    public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask update, BindingResult result, @PathVariable("projectIdentifier") String projectIdentifier,
                                                      @PathVariable("projectSequence") String projectSequence) {
        if (result.hasErrors()) return mapValidationErrorService.MapValidationService(result);
        return new ResponseEntity<>(projectTaskService.updateProjectTaskBySequence(projectIdentifier, projectSequence, update), HttpStatus.OK);
    }

    @DeleteMapping("/{projectIdentifier}/{projectSequence}")
    public ResponseEntity<?> deleteProjectTaskBySequence(@PathVariable("projectIdentifier") String projectIdentifier, @PathVariable("projectSequence") String projectSequence) {
        projectTaskService.deleteProjectTaskBySequence(projectIdentifier, projectSequence);
        return new ResponseEntity<>("Project Task Deleted!", HttpStatus.OK);
    }

    @DeleteMapping("/{projectIdentifier}/all")
    public ResponseEntity<?> deleteBacklog(@PathVariable String projectIdentifier){
        projectTaskService.deleteAllProjectTasks(projectIdentifier);
        return new ResponseEntity<>("Project backlog deleted!", HttpStatus.OK);
    }

    @DeleteMapping("/{projectIdentifier}/removed")
    public ResponseEntity<?> deleteAllRemovedPts(@PathVariable String projectIdentifier){
        projectTaskService.deleteAllRemovedPts(projectIdentifier);
        return new ResponseEntity<>("All removed pts are deleted", HttpStatus.OK);
    }

    @PutMapping("/{projectIdentifier}/remove")
    public ResponseEntity<?> removeAllPts(@PathVariable String projectIdentifier){
        projectTaskService.removeOrRecoverAllPts(projectIdentifier, false);
        return new ResponseEntity<>("All shown projectTasks are removed", HttpStatus.OK);
    }

    @PutMapping("/{projectIdentifier}/recover")
    public ResponseEntity<?> recoverAllPts(@PathVariable String projectIdentifier){
        projectTaskService.removeOrRecoverAllPts(projectIdentifier, true);
        return new ResponseEntity<>("All removed projectTasks are recovered", HttpStatus.OK);
    }

    @PutMapping("/{projectIdentifier}/{projectSequence}/removeOrRecover")
    public ResponseEntity<?> removeOrRecoverPt(@PathVariable("projectIdentifier") String projectIdentifier,
                                               @PathVariable("projectSequence") String projectSequence){
        return new ResponseEntity<>(projectTaskService.removeOrRecoverPt(projectIdentifier, projectSequence), HttpStatus.OK);
    }

}
