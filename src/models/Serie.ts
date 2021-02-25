import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Competition } from "./Competition";
import { Match } from "./Match";

@Entity()
export class Serie {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  season: number;

  @OneToMany(() => Match, match => match.serie)
  matches: Match[];

  @ManyToOne(() => Competition, competition => competition.series)
  competition: Competition;

}

// runkosarja, yläloppusarja, alaloppusarja