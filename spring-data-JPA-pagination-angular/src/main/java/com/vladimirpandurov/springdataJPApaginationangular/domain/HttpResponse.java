package com.vladimirpandurov.springdataJPApaginationangular.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.springframework.http.HttpStatus;

import java.util.Map;

@Data
@SuperBuilder
@JsonInclude(JsonInclude.Include.USE_DEFAULTS)
public class HttpResponse {
    protected String timeStemp;
    protected int statusCode;
    protected HttpStatus status;
    protected String message;
    protected Map<?,?> data;
}
