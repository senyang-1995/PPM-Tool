package com.example.ppmtool.exceptions;

public class ProjectDateExceptionResponse {
    private String end_date;

    public ProjectDateExceptionResponse(String errorMessage){
        this.end_date = errorMessage;
    }

    public String getEnd_date() {
        return this.end_date;
    }

    public void setEnd_date(String end_date) {
        this.end_date = end_date;
    }
}
