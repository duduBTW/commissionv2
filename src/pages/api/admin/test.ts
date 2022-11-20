import adminApiRoute from "server/apiMiddleware/admin";

export default adminApiRoute((req, res) => {
  return res.send("POG!");
});
