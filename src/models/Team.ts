import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Match } from "./Match";
import { Player } from './Player';

@Entity()
export class Team {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @OneToMany(() => Player, player => player.team)
  players: Player[];

  @OneToMany(() => Match, match => match.home_team)
  home_matches: Match[];

  @OneToMany(() => Match, match => match.away_team)
  away_matches: Match[];

}