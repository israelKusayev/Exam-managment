const config = {
  clientUrl: 'http://localhost:4200',

  jwt_secret: '3547y6vn33984ytcn98y38cg32984h2gm948ghy2398gym987',
  auth_headerKey: 'x-auth-token',
  adminTokenExpiresIn: 2 * 60 * 60,

  adminUserActivationSecret: '4u3iuytitoy34oty3ony3n4outy34onutyn34outynotuyoq',
  adminUserActivationExpiresIn: 3 * 60 * 60,
  activateAdminAccountActionName: 'activate-admin-account',
  adminResetPasswordClientActionName: 'admin-reset-password',
  adminUserResetPasswordSecret:
    'efiu4hreiudfvhhoviuerdhfboivajcncjeoriusdfoiu3bgr',
  adminUserResetPasswordExpiresIn: 10 * 60,

  mailerUser: 'noreply.examssystem@gmail.com',
  mailerPassowrd: 'norepexamssys!',

  passwordhashSalt: 10
};

module.exports = config;
