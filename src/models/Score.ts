import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

import { Base, Team } from "@/models";

@Entity("Score")
export class Score extends Base {
  @Column({ default: 0 })
  sherlockScore: number;

  @Column({ default: 0 })
  watsonScore: number;

  @Column({ default: 0 })
  round1Score: number;

  @Column({ default: 0 })
  round2Score: number;

  @Column({ default: 0 })
  teamScore: number;

  @OneToOne(() => Team, (team) => team.score, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "teamId", referencedColumnName: "id" })
  team: Team;
}
