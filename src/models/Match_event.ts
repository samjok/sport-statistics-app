import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import { Match } from "./Match";
import { Player } from "./Player";
import { Team } from './Team';

type Event = "Goal" | "Yellow card" | "Second yellow card" | "Red card" | "Penalty_shot";

@Entity()
export class Match_event {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Match, match => match.id, { eager: true })
  match: Match;

  @ManyToOne(() => Player, player => player.id, { eager: true })
  player: Player;

  @ManyToOne(() => Team, team => team.id, { eager: true })
  team: Team;

  @Column()
  event: Event;

}