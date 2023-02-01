const { Pool } = require('pg');
const config = require(path.join(__dirname, "../config/db"))

const pool = new Pool({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database,
	max: config.max,
	idleTimeoutMillis: config.idleTimeoutMillis,
	connectionTimeoutMillis: config.connectionTimeoutMillis,
});

export default pool;
