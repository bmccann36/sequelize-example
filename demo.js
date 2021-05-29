
const { Sequelize, DataTypes, Model } = require('sequelize');
require('dotenv').config();// loads the values defined in .env file as environment variables

(async () => {

  // create database connection
  // see https://sequelize.org/master/manual/getting-started.html#connecting-to-a-database
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql'
    });
  // check for connection success 
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
// define some database models 
// https://sequelize.org/master/manual/model-basics.html
  const Team = sequelize.define('Team', {
    teamName: DataTypes.STRING,
    jerseyColor: DataTypes.STRING,
  })

  const Player = sequelize.define('Player', {
    playerName: DataTypes.STRING,
    weightKg: DataTypes.INTEGER
  })

  // define model associations
  // https://sequelize.org/master/manual/assocs.html
  Team.hasMany(Player);
  Player.belongsTo(Team);

//https://sequelize.org/master/manual/model-basics.html#synchronizing-all-models-at-once
  await sequelize.sync({ force: true }); //! WARNING -- never use this in production, force:true  will drop and re create tables
  console.log("All models were synchronized successfully.");

  // save some records to the database 
  // https://sequelize.org/master/manual/model-instances.html#creating-an-instance
  // create a team
  await Team.create({
    teamName: 'Lakers',
    jerseyColor: 'Yellow and Purple',
    id: 1
  });
// create a player on the team
  await Player.create({
    TeamId: 1, // links this player to team 1
    playerName: 'Kobe Bryant',
    weightKg: 100
  })

// query for the team we just created, and eagerly load the associated players
// eager loading means that sequelize will join the associated table for us by foreign key
// https://sequelize.org/master/manual/assocs.html#basics-of-queries-involving-associations
  const teamWithPlayer = await Team.findOne({
    where: {
      teamName: 'Lakers'
    },
    include: Player
  });
  console.log('\n ****** QUERY RESULT IS: ')
  console.log(teamWithPlayer.dataValues);

})()
