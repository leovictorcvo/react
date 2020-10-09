interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'equipe@gobarber.com.br', // email cadastrado no Amazon SES
      name: 'Equipe GoBarber',
    },
  },
} as IMailConfig;
