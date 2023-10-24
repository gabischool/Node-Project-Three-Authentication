import server from "./api/server.js";

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`);
});
