import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Serie } from "./Serie";
import { Team } from './Team';

@Entity()
export class Match {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Serie, serie => serie.matches)
  serie: Serie;

  @ManyToOne(() => Team, team => team.home_matches)
  home_team: Team;

  @ManyToOne(() => Team, team => team.away_matches)
  away_team: Team;

  @Column({ nullable: true })
  time: Date;

  @Column()
  played: boolean;

  @Column({ nullable: true })
  home_goals: number;

  @Column({ nullable: true })
  away_goals: number;

}