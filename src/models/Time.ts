import { Column, Entity } from "typeorm";

import { Base } from "@/models";

@Entity("Time")
export class Time extends Base {
  @Column()
  sherlockStartTime?: Date;

  @Column()
  sherlockEndTime?: Date;

  @Column()
  round2StartTime?: Date;

  @Column()
  round2EndTime?: Date;

  @Column()
  watsonStartTime?: Date;

  @Column()
  watsonEndTime?: Date;
}
