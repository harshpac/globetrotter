package org.example.globetrotter.resources;

import java.util.Map;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.example.globetrotter.models.ChallengeInvite;
import org.example.globetrotter.service.ChallengeService;

@Path("/api/challenge")
@Produces(MediaType.APPLICATION_JSON)
public class ChallengeResource {
  private final ChallengeService challengeService;

  public ChallengeResource(ChallengeService challengeService) {
    this.challengeService = challengeService;
  }

  @POST
  @Path("/create")
  @Consumes(MediaType.APPLICATION_JSON)
  public Response createChallenge(Map<String, String> request) {
    String userId = request.get("userId");
    ChallengeInvite invite = challengeService.createChallenge(userId);
    return Response.ok(invite).build();
  }

  @GET
  @Path("/{inviteId}")
  public Response getChallenge(@PathParam("inviteId") String inviteId) {
    var x = challengeService.createNewGameForChallenge(inviteId);

    return Response.ok(x).build();
  }
}
