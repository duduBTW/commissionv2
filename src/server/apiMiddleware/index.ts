import userApiRoute from "./user";
import adminApiRoute from "./admin";
import publicApiRoute from "./public";

const apiMiddleware = {
  admin: adminApiRoute,
  public: publicApiRoute,
  user: userApiRoute,
};

export default apiMiddleware;
