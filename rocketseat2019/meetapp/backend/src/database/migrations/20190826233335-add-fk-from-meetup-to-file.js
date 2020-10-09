module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('files', 'meetup_id', {
      type: Sequelize.INTEGER,
      references: { model: 'meetups', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    }),

  down: queryInterface => queryInterface.removeColumn('files', 'meetup_id'),
};
