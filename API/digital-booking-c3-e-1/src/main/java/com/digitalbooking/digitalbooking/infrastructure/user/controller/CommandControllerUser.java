package com.digitalbooking.digitalbooking.infrastructure.user.controller;

import com.digitalbooking.digitalbooking.application.user.handler.UserHandler;
import com.digitalbooking.digitalbooking.application.user.request.CommandCreateUser;
import com.digitalbooking.digitalbooking.common.response.CommandResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
@Tag(name = "Controller to create or modify users")
public class CommandControllerUser {

    @Autowired
    UserHandler userHandler;

    @PostMapping
    @Operation(summary = "Create User ", description = "Method to create a new user")
    public ResponseEntity<CommandResponse<Long>> createUser(@RequestBody CommandCreateUser commandCreateUser) throws Exception {
        return new ResponseEntity<>(new CommandResponse<>(userHandler.createUser(commandCreateUser)), HttpStatus.CREATED);
    }

    @GetMapping("activate")
    @Operation(summary = "activate user", description = "endpoint used to activate a user")
    public ResponseEntity<String> activateUser(@Parameter(description = "User Token", required = true) @RequestParam("token")String token){
        userHandler.validateUser(token);
        return ResponseEntity.ok("<html>"
                + "<body style='background-color: #F5F5F5; text-align: center; padding:50px;'>"
                + "<h1 style='color: #000080;'>¡Activación exitosa!</h1>"
                + "<p style='color: #000080; font-size: 18px;'>Tu cuenta ha sido activada con éxito. Ahora puedes ingresar a Digital Booking y disfrutar de nuestros servicios.</p>"
                + "</body>"
                + "</html>");
    }



}
