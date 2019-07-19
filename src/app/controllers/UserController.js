import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    // Verifica se o body é valido neste schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    // Cria o objeto no banco e retorna alguns dados
    const {
      id, name, email, password_hash,
    } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      password_hash,
    });
  }

  // Método update com algumas validações de senha
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) => (oldPassword ? field.required() : field)),
      // Cria um novo campo de confirmação: Se existe o campo password, então
      // torna o confirmPassword required e verifica se é igual o campo
      // passowrd.
      confirmPassword: Yup.string().when('password', (password, field) => (password ? field.required().oneOf([Yup.ref('password')]) : field)),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    const user = await User.findByPk(req.userID);

    const { email, oldPassword } = req.body;

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({
          error: 'User already exists.',
        });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ erro: 'Password does not match' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
