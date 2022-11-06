// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res, next) {
  const { status } = req.query;

  if (status === "private") {
    res.send("private");
  } else if (status === "public") {
    res.send("public");
  } else {
    res.send("create new private page");
  }
}
