/**
 * @author GBaldera
 */

var listarWin = function() {

	//creamos la ventana
	var win = Titanium.UI.createWindow({
		title : 'Listar',
		backgroundColor : '#fff'
	});

	//botones
	var Eliminar_btn = Titanium.UI.createButton({
		title : 'Eliminar'
	});

	var Listo_btn = Titanium.UI.createButton({
		title : 'Listo'
	});

	//agregamos el Eliminar_btn
	win.rightNavButton = Eliminar_btn;

	//creamos el tableview
	var tableview = Ti.UI.createTableView({
		minRowHeight : 60,
		maxRowHeight : 70,
		editable : true
	});

	//agregamos el tableview a la ventana actual
	win.add(tableview);

	//cargamos la lista de
	var cargarLista = function() {

		//arreglo con los datos del tableview
		var datos = [];

		//instalamos la bd
		var db = Ti.Database.install('developers.db', 'developers');
		var filas = db.execute('SELECT * FROM developers');

		//para alternar el color a cada fila
		var c = 0;
		var rowbg = '#fff';

		//iteramos cada resultado
		while(filas.isValidRow()) {

			//asignamos el color de fondo de la fila
			rowbg = (c % 2 == 0) ? '#fff' : '#edf4fc';
			
			//cramos el row
			var row = Ti.UI.createTableViewRow({
				height : 'auto',
				textAlign : 'left',
				width : '100%',
				className : 'dos_colores',
				backgroundColor : rowbg
			});
			
			//asignamos el id del DEV a cada fila
			row.dev_id = filas.fieldByName('id');
			
			var nombre_completo = Ti.UI.createLabel({
				text:filas.fieldByName('nombre') + ' '+ filas.fieldByName('apellido'),
				width:'auto',
				height : 'auto',
				left : 15,
				top : 10,
				textAlign : 'left',
				font : {
					fontSize : 18,
					fontWeight : 'bold'
				},
				color : '#000'
			});
			
			var empresa = Ti.UI.createLabel({
				text:filas.fieldByName('empresa'),
				width:'auto',
				height : 'auto',
				left : 15,
				top : 30,
				textAlign : 'left',
				font : {
					fontSize : 15
				},
				color : '#000111'
			});
			
			var url = Ti.UI.createLabel({
				text:filas.fieldByName('url'),
				width:'auto',
				height : 'auto',
				left : 15,
				top : 45,
				bottom:10,
				textAlign : 'left',
				font : {
					fontSize : 15
				},
				color : '#000111'
			});
			
			//agremos labels al row
			row.add(nombre_completo);
			row.add(empresa);
			row.add(url);
			datos.push(row);
			
			c++;
			filas.next();
		}

		//liberamos resources
		filas.close();
		db.close();

		tableview.data = datos;
	}
	
	
	/*****************************************************************************
	 *EventListeners
	 ****************************************************************************/
	
	//currentwindow focus event
	win.addEventListener('focus', function(e) {
		//cargamos la lista
		cargarLista();
	});
	//delete eventlistener
	tableview.addEventListener('delete', function(e) {
		var resultado = eliminarDev(e.rowData.dev_id);		
	});
	//eliminar click event
	Eliminar_btn.addEventListener('click', function(e) {
		win.rightNavButton = Listo_btn;
		tableview.editing = true;
	});
	//listo click event
	Listo_btn.addEventListener('click', function(e) {
		win.rightNavButton = Eliminar_btn;
		tableview.editing = false;
	});
	
	//retornamos el objeto de la ventana
	return win;
}