package org.example.globetrotter.resources;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.example.globetrotter.models.RegisterUserRequest;
import org.example.globetrotter.models.UserProfile;
import org.example.globetrotter.service.UserService;

@Path("/api/user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {
  private final UserService userService;

  public UserResource(UserService userService) {
    this.userService = userService;
  }

  @POST
  @Path("/register")
  public Response registerUser(RegisterUserRequest userRequest) {
    UserProfile createdUser = userService.registerUser(userRequest.getUserName());
    return Response.ok(createdUser).build();
  }

  @GET
  @Path("/{id}")
  public Response getUser(@PathParam("id") String userId) {
    return Response.ok(userService.getUserById(userId)).build();
  }
}
