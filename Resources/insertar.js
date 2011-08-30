/**
 * @author GBaldera
 */

var insertarWin = function() {

	//creamos la ventana
	var win = Titanium.UI.createWindow({
		title : 'Insertar',
		backgroundColor : '#fff'
	});
	
	var vista = Ti.UI.createScrollView({backgroundColor : 'transparent',width:320,height:480,top:5});
	win.add(vista);
	
	//logo de developers.do
	var logo = Ti.UI.createImageView({
		image : 'images/logo.jpg',
		width : 128,
		height : 88,
		top : 300,
		center:{x:(win.width/2),y:50}
	});

	vista.add(logo);
	
	//creamos los textfields
	var nombre = Ti.UI.createTextField({hintText:'Nombre',height:30,width:300,top:130,left:10,borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED});
	vista.add(nombre);
	
	var apellido = Ti.UI.createTextField({hintText:'Apellido',height:30,width:300,top:170,left:10,borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED});
	vista.add(apellido);
	
	var empresa = Ti.UI.createTextField({hintText:'Empresa',height:30,width:300,top:210,left:10,borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED});
	vista.add(empresa);
	
	var url = Ti.UI.createTextField({hintText:'URL',height:30,width:300,top:250,left:10,borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED});
	vista.add(url);
	
	//creamos el boton de insertar
	var insertar_btn = Ti.UI.createButton({title:'Insertar',width:200,height:40,center:{x:(win.width/2),y:320},borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED});
	vista.add(insertar_btn);
	
	//click
	insertar_btn.addEventListener('click',function(e){
		if(nombre.value == '' || apellido.value == ''){
			alert('Favor llenar el Nombre y el Apellido.');
			return;
		}
		
		//insertamos dev en la bd
		insertarDev({
			nombre:nombre.value,
			apellido:apellido.value,
			empresa:empresa.value,
			url:url.value
		});
	});
	
	win.addEventListener('focus', function(e) {
		vista.scrollTo(0, -5);
	});
	nombre.addEventListener('blur',function(e){
		vista.scrollTo(0, -5);
	});
	apellido.addEventListener('blur',function(e){
		vista.scrollTo(0, -5);
	});
	empresa.addEventListener('blur',function(e){
		vista.scrollTo(0, -5);
	});
	url.addEventListener('blur',function(e){
		vista.scrollTo(0, -5);
	});
	vista.addEventListener('scroll',function(e){
		if(e.dragging){
			win.fireEvent('focus');
		}
	});
	
	//retornamos el objeto de la ventana
	return win;
}