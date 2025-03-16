package org.example.globetrotter.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChallengeInvite {
  private String inviteId;
  private String inviterId;
  private String inviterName;
  private int inviterScore;
  private NewGame newGame;
}
