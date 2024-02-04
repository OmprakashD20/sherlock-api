import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

import { Base, Team } from "@/models";

@Entity("Question")
export class Question extends Base {
  @Column({ default: false })
  isSherlockCompleted: boolean;

  @Column({ default: false })
  isWatsonCompleted: boolean;

  @Column({ nullable: true })
  sherlockCurrentQuestion: number;

  @Column({ nullable: true })
  watsonCurrentQuestion: number;

  @Column({ nullable: true })
  round2CurrentQuestion: number;

  @OneToOne(() => Team, (team) => team.question, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "teamId", referencedColumnName: "id" })
  team: Team;
}
