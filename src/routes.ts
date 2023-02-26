import franchiseRouters from "./routes/franchise.js";
import Service from "./service.js";

export default {
  v1: (microservice: Service) => ({
    franchiseRoutes: franchiseRouters(microservice),
  }),
};
