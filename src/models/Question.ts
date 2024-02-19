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

  @Column("simple-json")
  sherlockAttempts: { [key: string]: number } = {};

  @Column("simple-json")
  watsonAttempts: { [key: string]: number } = {};

  @Column("simple-json")
  round2Attempts: { [key: string]: number } = {};

  @OneToOne(() => Team, (team) => team.question, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "teamId", referencedColumnName: "id" })
  team: Team;

  constructor() {
    super();
    for (let i = 1; i <= 10; i++) {
      this.sherlockAttempts[`qn${i}`] = 3;
      this.watsonAttempts[`qn${i}`] = 3;
      this.round2Attempts[`qn${i}`] = 3;
    }
  }
}
