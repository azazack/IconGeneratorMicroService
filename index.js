"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var routes_1 = require("./routes");
var fastify = require('fastify')();
// fastify.register(require('@fastify/postgres'), {
//     connectionString: `postgresql://postgres:${process.env.DB_PASSWORD}@localhost:5432/${process.env.DB_TABLE}`
// })
fastify.register(routes_1.default, { prefix: "/v1" });
fastify.listen({ port: 4000 }, function (err, address) {
    if (err) {
        process.exit();
    }
    console.log("listening at port ".concat(address));
});
