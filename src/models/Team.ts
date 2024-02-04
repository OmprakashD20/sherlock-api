import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

import { Base, Clues, Question, Score, Time } from "@/models";

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

  //questions
  @OneToOne(() => Question, (question) => question.team, { cascade: true })
  question: Question;

  //scores
  @OneToOne(() => Score, (score) => score.team, { cascade: true })
  score: Score;

  //timings
  @OneToOne(() => Time, (time) => time.team, { cascade: true })
  time: Time;

  //clues
  @OneToOne(() => Clues, (clues) => clues.team, { cascade: true })
  clues: Clues;
}
