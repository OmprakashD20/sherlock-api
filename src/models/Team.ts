import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

import { Base, Clues, Score, Time } from "@/models";

@Entity("Team")
export class Team extends Base {
  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  @Column()
  sherlock: string;

  @Column()
  watson: string;

  //scores
  @OneToOne(() => Score)
  @JoinColumn()
  score: Score;

  //timings
  @OneToOne(() => Time)
  @JoinColumn()
  time: Time;

  //clues
  @OneToOne(() => Clues)
  @JoinColumn()
  clues: Clues;
}
