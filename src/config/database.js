module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres', // name of postgres user
  password: 'docker',
  database: 'meetapp', // name of database
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
