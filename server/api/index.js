import app from "..";

export const handler = async (req, res) => {
  await app(req, res);
};
