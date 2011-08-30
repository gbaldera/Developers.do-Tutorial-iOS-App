/**
 * @author GBaldera
 */

//insertar developers en la db
var insertarDev = function(datos) {
	if( typeof (datos) === 'object') {
		try {

			//instalamos la bd
			var db = Ti.Database.install('developers.db', 'developers');

			//insert
			db.execute('INSERT INTO developers (nombre, apellido, empresa, url) VALUES(?,?,?,?)', datos.nombre, datos.apellido, datos.empresa, datos.url);
			db.close();

			alert('Developer insertado!');

		} catch(e) {
			alert(e);
		}

	} else {
		return false;
	}
};

//eliminar dev en la db
var eliminarDev = function(dev_id) {

	if( typeof (dev_id) != 'number') {
		return false;
	}

	try {

		//instalamos la db desde la carpeta resources
		var db = Ti.Database.install('developers.db', 'developers');

		db.execute('DELETE FROM developers WHERE id = ' + dev_id);

		//close db
		db.close();
		return true;
		
	} catch(e) {
		alert(e);
	}
};
