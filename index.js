// Import server here and start the application

import server from "./api/server.js";

const port = 8000;

server.listen(port, () => console.log("Server is listening on port " + port));
