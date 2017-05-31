module.exports = {
    port: process.env.PORT || 3000, // ถ้าไม่ระบุใน env ให้ใช้ port 3000 แทน
    authdb: process.env.MLAB_DB,
    secret: process.env.SECRET,
    pgpConnection: process.env.PGP_CONNECTION, // postgres://username:password@host:port/database
    pgpOptions: {
        // pg-promise initialization options...
        connect: (client, dc, isFresh) => {
            var cp = client.connectionParameters;
            console.log("Connected to database:", cp.database);
        },
        disconnect: (client, dc) => {
            var cp = client.connectionParameters;
            console.log("Disconnecting from database:", cp.database);
        }
        // ,
        // error: (err, e) => {
        //     // e.dc = Database Context
        //     if (e.cn) {
        //         // this is a connection-related error
        //         // cn = safe connection details passed into the library:
        //         //      if password is present, it is masked by #
        //     }
        //     if (e.query) {
        //         // query string is available
        //         if (e.params) {
        //             // query parameters are available
        //         }
        //     }
        //     if (e.ctx) {
        //         // occurred inside a task or transaction
        //     }
        // }
    }
}