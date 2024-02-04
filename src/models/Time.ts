import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

import { Base, Team } from "@/models";

@Entity("Time")
export class Time extends Base {
  @Column({ nullable: true })
  sherlockStartTime: Date;

  @Column({ nullable: true })
  sherlockEndTime: Date;

  @Column({ nullable: true })
  round2StartTime: Date;

  @Column({ nullable: true })
  round2EndTime: Date;

  @Column({ nullable: true })
  watsonStartTime: Date;

  @Column({ nullable: true })
  watsonEndTime: Date;

  @OneToOne(() => Team, (team) => team.time, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "teamId", referencedColumnName: "id" })
  team: Team;
}
