const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "nba-vis-dev",
  password: "admin",
  port: 5432,
});

const createTeam = (request, response) => {
  const teamsJson = request.body;

  teamsJson.forEach((team) => {
    pool.query(
      "INSERT INTO teams (team_id, abbreviation, team_name, team_short_name, city) VALUES ($1, $2, $3, $4, $5)",
      [
        team.teamId,
        team.abbreviation,
        team.teamName,
        team.simpleName,
        team.location,
      ],
      (error, result) => {
        if (error) {
          throw error;
        } else {
          console.log(result);
        }
      }
    );
  });

  response.status(200).send();
};

const getTeam = (request, response) => {
  const teamJson = request.body.team_id;

  if (Number.isInteger(teamJson)) {
    pool.query(
      "SELECT * FROM teams WHERE team_id = $1",
      [teamJson],
      (error, result) => {
        if (error) {
          throw error;
        } else {
          response.status(200).json(result.rows[0]);
        }
      }
    );
  } else {
    response.status(400).send("Invalid request");
  }
};

const createPlayer = (request, response) => {
  const playersJson = request.body;

  playersJson.forEach((player) => {
    pool.query(
      "INSERT INTO players (player_id, player_first_name, player_surname, team_id) VALUES ($1, $2, $3, $4)",
      [player.playerId, player.firstName, player.lastName, player.teamId],
      (error, result) => {
        if (error) {
          throw error;
        } else {
          console.log(result);
        }
      }
    );
  });

  response.status(200).send();
};

const getAllPlayers = (request, response) => {
  pool.query("SELECT * FROM players", (error, result) => {
    if (error) {
      throw error;
    } else {
      response.status(200).send(result.rows);
    }
  });
};

const getPlayer = (request, response) => {
  const playerJson = request.body.player_id;

  if (Number.isInteger(playerJson)) {
    pool.query(
      "SELECT * FROM players WHERE player_id = $1",
      [playerJson],
      (error, result) => {
        if (error) {
          throw error;
        } else {
          if (result.rows[0]) {
            response.status(200).json(result.rows[0]);
          } else {
            response.status(400).json("Player not found");
          }
        }
      }
    );
  } else {
    response.status(400).json("Invalid request");
  }
};

module.exports = {
  createTeam,
  createPlayer,
  getAllPlayers,
  getPlayer,
  getTeam,
};
