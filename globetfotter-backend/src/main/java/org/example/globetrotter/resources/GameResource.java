package org.example.globetrotter.resources;

import javassist.NotFoundException;
import org.example.globetrotter.models.AnswerRequest;
import org.example.globetrotter.service.GameService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/api/game")
@Produces(MediaType.APPLICATION_JSON)
public class GameResource {
  private final GameService gameService;

  public GameResource(GameService gameService) {
    this.gameService = gameService;
  }

  @GET
  @Path("/new")
  public Response getNewGame() {
    return Response.ok(gameService.generateNewGame()).build();
  }

  @POST
  @Path("/answer")
  @Consumes(MediaType.APPLICATION_JSON)
  public Response submitAnswer(AnswerRequest request) throws NotFoundException {
    return Response.ok(gameService.validateAnswer(request)).build();
  }
}
