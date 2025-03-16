package org.example.globetrotter;

import org.eclipse.jetty.server.Authentication.User;
import org.example.globetrotter.filters.CORSFilter;
import org.example.globetrotter.resources.ChallengeResource;
import org.example.globetrotter.resources.GameResource;
import org.example.globetrotter.resources.UserResource;
import org.example.globetrotter.service.ChallengeService;
import org.example.globetrotter.service.GameService;
import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.example.globetrotter.service.UserService;

public class GlobetrotterApplication extends Application<GlobetrotterConfiguration> {

  public static void main(String[] args) throws Exception {
    new GlobetrotterApplication().run(args);
  }

  @Override
  public void run(GlobetrotterConfiguration config, Environment environment) throws Exception {
    final var userService = new UserService();
    final var gameService = new GameService(userService);
    final var challengeService = new ChallengeService(userService, gameService);
    environment.jersey().register(new GameResource(gameService));
    environment.jersey().register(new UserResource(userService));
    environment.jersey().register(new ChallengeResource(challengeService));

    environment.servlets().addFilter("CORSFilter", new CORSFilter())
        .addMappingForUrlPatterns(null, false, "/*");
  }

  @Override
  public void initialize(Bootstrap<GlobetrotterConfiguration> bootstrap) {
  }
}
