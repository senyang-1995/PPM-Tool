package com.example.ppmtool.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.Map;
@Service
public class MapValidationErrorService {
    public ResponseEntity<?> MapValidationService(BindingResult result) {
        Map<String, String> errorMap = new HashMap<>();
        for (FieldError err: result.getFieldErrors()){
            String key = err.getField();
            String value = err.getDefaultMessage();
            errorMap.put(key, value);
        }
        return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
    }
}
