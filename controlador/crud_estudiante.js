import { conexion } from '../modelo/db_conectar.js';

const CRUD_ESTUDIANTE = {};
CRUD_ESTUDIANTE.LEER = (req, res) => {
  conexion.query(
    'SELECT e.*, DATE_FORMAT(e.fecha_nacimiento, "%d/%m/%Y") AS nacimiento, DATE_FORMAT(e.fecha_nacimiento, "%Y-%m-%d") AS fecha_nacimiento, ts.sangre FROM estudiantes e INNER JOIN tipos_sangre ts ON ts.id_tipo_sangre=e.id_tipo_sangre;',
    (error, resultado) => {
      if (error) throw error;
      else {
        conexion.query(
          'SELECT * FROM tipos_sangre;',
          (error, tipos_sangre) => {
            if (error) throw error;
            else res.render('estudiante/index', { resultado, tipos_sangre });
          }
        );
      }
    }
  );
};
CRUD_ESTUDIANTE.CUD = (req, res) => {
  const ACCION = req.body.accion;

  // Datos
  const id = req.body.id_estudiante;
  const carne = req.body.carne;
  const nombres = req.body.nombres;
  const apellidos = req.body.apellidos;
  const direccion = req.body.direccion;
  const telefono = req.body.telefono;
  const correo_electronico = req.body.correo_electronico;
  const id_tipo_sangre = req.body.id_tipo_sangre;
  const fecha_nacimiento = req.body.fecha_nacimiento;

  // Acciones
  if ((ACCION === 'C')) {
    conexion.query('INSERT INTO estudiantes SET ?', { carne, nombres, apellidos, direccion, telefono, correo_electronico, id_tipo_sangre, fecha_nacimiento }, (error, resultado) => {
      if (error) throw error;
      else res.redirect('/estudiante');
    });
  }
  if ((ACCION === 'U')) {
    conexion.query('UPDATE estudiantes SET ? WHERE id_estudiante=?', [{ carne, nombres, apellidos, direccion, telefono, correo_electronico, id_tipo_sangre, fecha_nacimiento }, id], (error, resultado) => {
      if (error) throw error;
      else res.redirect('/estudiante');
    });
  }
  if ((ACCION === 'D')) {
    conexion.query('DELETE FROM estudiantes WHERE id_estudiante=?', [id], (error, resultado) => {
      if (error) throw error;
      else res.redirect('/estudiante');
    });
  }
};

export { CRUD_ESTUDIANTE };
