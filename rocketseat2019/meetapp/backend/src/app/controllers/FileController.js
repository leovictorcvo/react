import * as Yup from 'yup';
import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const data = {
      name,
      path,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      path: Yup.string().required(),
    });

    if (!(await schema.isValid(data))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const file = await new File({
      name,
      path,
    });

    return res.json(file);
  }
}

export default new FileController();
