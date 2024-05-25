export const createActor = (req, res) => {
  const { actorName, about, gender } = req.body;
  const file = req.file;
  console.log(file);
  res.status(201).json("Uploaded");
};
