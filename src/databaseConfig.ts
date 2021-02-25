import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { User } from '../src/models/User';
import { Team } from '../src/models/Team';
import * as dotenv from "dotenv";
import { Match_player_team } from "./models/Match_player_team";
import { Match } from "./models/Match";
import { Match_event } from "./models/Match_event";
import { Player } from "./models/Player";
import { Season } from "./models/Season";
import { Serie } from "./models/Serie";
dotenv.config({ path: __dirname + '/.env' });

const config: PostgresConnectionOptions = {
  type: "postgres",
  host: String(process.env.DB_HOST),
  port: Number(process.env.DB_PORT),
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_DATABASE),
  synchronize: true,
  logging: false,
  entities: [
    User,
    Team,
    Player,
    Season,
    Serie,
    Match,
    Match_event,
    Match_player_team
  ]
};

export default config;