import { conexion } from '../modelo/db_conectar.js';

const CRUD_TIPO_SANGRE = {};
CRUD_TIPO_SANGRE.LEER = (req, res) => {
  conexion.query('SELECT * FROM tipos_sangre;', (error, resultado) => {
    if (error) throw error;
    else res.render('tipo_sangre/index', { resultado });
  });
};
CRUD_TIPO_SANGRE.CUD = (req, res) => {
  const ACCION = req.body.accion;

  // Datos
  const id = req.body.id_tipo_sangre;
  const sangre = req.body.sangre;

  // Acciones
  if ((ACCION === 'C')) {
    conexion.query('INSERT INTO tipos_sangre SET ?', { sangre }, (error, resultado) => {
      if (error) throw error;
      else res.redirect('/tipo-sangre');
    });
  }
  if ((ACCION === 'U')) {
    conexion.query('UPDATE tipos_sangre SET ? WHERE id_tipo_sangre=?', [{ sangre }, id], (error, resultado) => {
      if (error) throw error;
      else res.redirect('/tipo-sangre');
    });
  }
  if ((ACCION === 'D')) {
    conexion.query('DELETE FROM estudiantes WHERE id_tipo_sangre=?', [id], (error, resultado) => {
      if (error) throw error;
      else {
        conexion.query('DELETE FROM tipos_sangre WHERE id_tipo_sangre=?', [id], (error, resultado) => {
          if (error) throw error;
          else res.redirect('/tipo-sangre');
        });
      }
    });
  }
};

export { CRUD_TIPO_SANGRE };
