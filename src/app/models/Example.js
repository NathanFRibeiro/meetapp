import Sequelize, { Model } from 'sequelize';

class Example extends Model {
  static init(sequelize) {
    // Tipagem dos dados
    super.init(
      {
        name: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        email: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async example => {
      // Ações a serem executadas antes de salvar no BD.
      console.log(example);
    });

    return this;
  }
}
export default Example;
