import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Team } from './Team';

type Position = "Goalkeeper" | "Defender" | "Midfielder" | "Forward";

@Entity()
export class Player {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  position: Position;

  @Column()
  player_number: number;

  @Column()
  birthday: Date;

  @ManyToOne(() => Team, team => team.players)
  team: Team;

}