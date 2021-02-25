import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

export type UserRole = "user" | "admin";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  username: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;

}