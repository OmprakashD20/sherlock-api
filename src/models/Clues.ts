import { Column, Entity } from "typeorm";

import { Base } from "@/models";

@Entity("Clues")
export class Clues extends Base {
  @Column({ default: 0 })
  cluesUsedBySherlock: number;

  @Column({ default: 0 })
  cluesUsedByWatson: number;

  @Column({ default: 0 })
  cluesUsedInRound2: number;

  @Column({ default: 0 })
  lastClueUsedBySherlock: number;

  @Column({ default: 0 })
  lastClueUsedByWatson: number;

  @Column({ default: 0 })
  lastClueUsedInRound2: number;
}
