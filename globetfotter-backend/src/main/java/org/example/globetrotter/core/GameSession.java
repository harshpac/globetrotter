package org.example.globetrotter.core;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;


@Data
@AllArgsConstructor
@Builder
public class GameSession {

  private String id;

  private City destination;

  private boolean completed;

  public GameSession() {
    this.id = UUID.randomUUID().toString();
  }
}
