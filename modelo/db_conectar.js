import mysql from 'mysql';

const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'crud_node'
});

conexion.connect(function(err) {
  if (err) console.error(`Error en la conexion: ${err}`);
  else console.info(`Conexion exitosa: ${conexion.threadId}`);
});

export { conexion };
