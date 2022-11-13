import * as commission from "./commission";
import * as portfolio from "./portfolio";
import * as profile from "./profile";

const services = {
  ...commission,
  ...portfolio,
  ...profile,
};

export default services;
