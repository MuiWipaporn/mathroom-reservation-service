import service from '../service';

export default (roles) => (req, res, next) => {
  const isAllowedUser = service.user.verifyToken(roles);
  if (!isAllowedUser) {
    throw new Error('555');
  }
  next();
};
