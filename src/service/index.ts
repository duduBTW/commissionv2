import * as commission from "./commission";
import * as portfolio from "./portfolio";

const services = {
  ...commission,
  ...portfolio,
};

export default services;
