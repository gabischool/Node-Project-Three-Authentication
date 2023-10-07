// Import server here and start the application

import server from "./api/server.js"

const port = 4000;

server.listen(port, () => {
    console.log(`waan daarmay ${port}`);
    }
);