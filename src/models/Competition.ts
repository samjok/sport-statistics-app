import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Serie } from "./Serie";

@Entity()
export class Competition {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Serie, serie => serie.competition)
  series: Serie[];

}

// Kansallinen liiga, Veikkausliiga