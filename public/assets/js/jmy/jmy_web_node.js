function jmy_web_guardar(d) {
	console.log(d);
	let fn = d.data.fn;
	d = d.data;
	jQuery(function ($) { 
		if (d.id != '') {
			let v = [];
			let t = d.type;
			console.log(t);
			switch (t) {
				case'select':v=$("#"+d.id+" option:selected").val();break;
				case'textarea':v=$("textarea#"+d.id).val();break;
				case'input':case'calendar':case'number':case'date':case'email':case'password':case'hidden':v=$("#"+ d.id).val();break;
				default:v=(d.valor!=undefined)?d.valor:$("#"+d.id).html();break;
			}
			let g = {
				valor: v,
				pagina: d.page,
				tabla: d.tabla,
				opciones: {
					href: $("#jmy_web_href").val()
				},
				id: d.id,
			};
			if (g.opciones.href != undefined) 
				$("#" + d.id).attr("href", g.opciones.href);
			console.log(g);
			$.ajax({
				url: location.origin + '/jmyWebAjG',
				type: 'post',	
				dataType: 'json',
				success: function(res) {
					console.log(res);
					console.log(fn);
					
					if(fn!=undefined)
						eval(d.fn+'('+JSON.stringify({d:d,r:res})+')');
					mensajeGuardado();
				},
				error: function(res) {
					console.log(res);
				},
				data: g
			});
			console.log(g);
		} else {
			console.log(leng.no_data_save);
		}
	});
}
function jmy_web_url_friendly(a,s='-'){return a.trim().toLowerCase().replace(/[^a-z0-9]+/g,s).replace(/^-+|-+$/g, s).replace(/^-+|-+$/g,'')}
function jmt_web_eliminar_caracteres_especiales(a){
	// Definimos los caracteres que queremos eliminar
	var s = "!@#$^&%*()+=-[]\/{}|:<>?,.";

	// Los eliminamos todos
	for (var i = 0; i < s.length; i++) {
		a= a.replace(new RegExp("\\" + s[i], 'gi'), '');
	}   
 
	// Lo queremos devolver limpio en minusculas
	a = a.toLowerCase();
 
	// Quitamos espacios y los sustituimos por _ porque nos gusta mas asi
	a = a.replace(/ /g,"_");
 
	// Quitamos acentos y "ñ". Fijate en que va sin comillas el primer parametro
	a = a.replace(/á/gi,"a");
	a = a.replace(/é/gi,"e");
	a = a.replace(/í/gi,"i");
	a = a.replace(/ó/gi,"o");
	a = a.replace(/ú/gi,"u");
	a = a.replace(/ñ/gi,"n");
	return a;
}
function botones(d = []) {
	let left = d.pageX;
	let top = d.pageY + 30;
	console.log(d);
	d = d.data;
	jQuery(function ($) { 
		$("#jmy_web").html("");
		$("#jmy_web").addClass("jmyweb-botones");
		$("#jmy_web").css({
			'left': left + 'px',
			'top': top + 'px',
			'z-index': '10000',
			'position': 'absolute',
			'border-radius': '5px',
			'padding': '5px',
			'background-color': 'rgba(200,200,200,0.65)'
		});
		let href = ($("#" + d.id).attr("href") != undefined) ? $("#" + d.id).attr("href") : false;
		let html = ''; 
		let btne = '';
		if(href!==false){		
			html = html + '<input type="text" value="'+href+'" id="jmy_web_href" placeholder="href:#"> ';
			btne = btne + '<a href="'+href+'" style="'+style.b_azul+'">[->]</a>';
		}		
		html = html + '<img src="'+leng.imgLogo+'" heigth="60"><button class="jmy_web_guardar" data-id="' + d.id + '" data-page="' + d.page + '" data-tabla="' + d.tabla + '" style="'+style.b_guardar+'">[=] '+leng.guardar+'</button>'+btne+'<button class="jmy_web_cancelar" style="'+style.b_cancelar+'">[x]</button>';
		$("#jmy_web").html(html);
		$("#jmy_web").show(250);
		$(".jmy_web_guardar").click(function() {
			jmy_web_guardar({data:d});
		});
		$(".jmy_web_cancelar").click(function(e) {
			$("#jmy_web").hide(250);
		});
	});
}

function herramientas(d = []) {
	let left = 100;
	let top = 5;
	jQuery(function ($) { 
	$("#jmy_web_tools").html("");
	$("#jmy_web_tools").addClass("jmyweb-botones");
	$("#jmy_web_tools").css({
		'right': left + 'px',
		'bottom': top + 'px',
		'position': 'fixed',
		'z-index': '100000'
	}); 2
	let html = '';
	/*if(href!==false)	
		html = html + '<input type="text" value="'+href+'" id="jmy_web_href" placeholder="href:'+d.data.id+'"> ';*/
	html = html + '<button class="jmy_t_guardar" style="'+style.h_guardar+'">[+] '+leng.guardar_cambios+'</button><button class="jmy_web_tools_cancelar" style="'+style.h_cancelar+'"> [x] '+leng.guardar_cambios+'</button>';
	$("#jmy_web_tools").html(html);
	$("#jmy_web_tools").show(250);
	$(".jmy_t_guardar").click(function() {
		guardarSinGuardar();
		$("#jmy_web_tools").hide(250);
	});
	$(".jmy_web_tools_cancelar").click(function(e) {
		$("#jmy_web_tools").hide(250);
	});
	});
}
function guardarSinGuardar(){
	jQuery(function ($) { 
		console.log(sinGuardar);
		let t = [];
		for (let i = 0; i < sinGuardar.length; i++) {
			t = {
				"id": sinGuardar[i],
				"type": $("#" + sinGuardar[i]).attr("type"),
				"page": $("#" + sinGuardar[i]).data("page"),
				"tabla": $("#" + sinGuardar[i]).data("tabla"),
			};
			console.log(t);
			jmy_web_guardar({
				data: t
			});
		}
		sinGuardar = [];
	});
}
function mensajeGuardado(){
	jQuery(function ($) { 
		$("#jmy_web").html("");
		$("#jmy_web").html("<p>"+leng.dato_guardado+"</p>").delay(2000).hide(500);
	});
}
function agregarSinGuardar(d){ /* ({id:785}) */
	if(jQuery.inArray(d.id,sinGuardar)== -1) 
		sinGuardar.push(d.id);		
}
function jmy_web_div_click(){
	
	jQuery(function ($) {
		$(".jmy_web_div").each(function() {
			if ($(this).data('editor') != 'no') $(this).attr("contenteditable", "true");
			/*else console.log(this);*/
			let t = $(this).attr('type'); 
			switch (t) {
				case'select':					
				let s={
					v:$(this).data('value'),
					i:$(this).attr('id'),
					h:$(this).attr('placeholder'),
					l:$(this).data('lista-id') // transformar en input
				};
					let ta=s.i+'_select_id_';
					if($('#'+ta).length) 
						s.l=$('#'+ta).val();
					else
						$('#'+s.i).after('<input id="'+ta+'" type="hidden" value="'+s.l+'">');
					$(this).attr('name',s.i);
					$(this).val(s.v);
					jmy_web_select(s);
					jmy_web_select_recargar();
				break;				
			}
		});
		$(".jmy_web_div").click(function(e) {
            //console.log(e);
			
			let d = {
				"id": $(this).attr('id'),
				"type": $(this).attr('type'),
				"placeholder": $(this).data("placeholder"),
				"page": $(this).data("page"),
				"tabla": $(this).data("tabla"),
			};
			//console.log(d);
			
			agregarSinGuardar(d);
			herramientas();
			if ($(this).data('editor') != 'no') { /*CKEDITOR.remove(data.id); CKEDITOR.replace(this);*/ } else {
				$(this).attr("contenteditable", "true");
				CKEDITOR.remove(d.id);
				botones({
					pageX: e.pageX,
					pageY: e.pageY,
					data: d
				});
			}
		}); /*Final de funciones Globales para el tema */ /* Funciones Editor de Blog */
	});
}

function jmy_web_msk_add_blog() {
	let html = '<button class="jmy_blog_guardar" >'+leng.agregar_post+'</button>';
	html = html + '<input type="text" id="nombre_nuevo_post" placeholder="'+leng.nombre_nuevo_post+'"> ';
	jQuery(function ($) { 
	$("#jmy_web_agregar_blog").html("");
	$("#jmy_web_agregar_blog").html(html);
	$(".jmy_blog_guardar").click(function() {
		let str = $("#nombre_nuevo_post").val();
		if (str != '') {
			let t = btoa(str);
			let r = str.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase();
			r = location.origin + "/blog/" + r + "/guardar/";
			window.location.href = r;
		} else {
			alert(leng.sin_titulo_post);
		}
	});
	});
}

function jmy_web_html_categorias(d=[]){
	let h='';
	let b='';
	jQuery(function ($) { 
	$(".jmy_web_categorias").each(function() {
		h='';			
		b=$(this).data('titulo');
		console.log(b);
		b=(b!=undefined)?b:"Cambiar titulos de pestañas";
		h = '<div style="background-color:rgba(30,170,30,0.7);padding:4px;font-size:16px;color:fcfcfc;border-radius:5px; withd:100%;">'+b+'</div>';
		$(this).html('');	
		$(this).show(250);	
		$(this).html(h);				
	});
	});
}

function jmy_web_categorias_click(){
	jQuery(function ($) { 
		$(".jmy_web_categorias").click(function(e) {
			let d = { 	"t":$(this).data('titulo'),
						"v":$(this).data('value'),
						"p":$(this).data('page'),
						"id":$(this).attr('id'),
					};
			console.log(d);
			let t=(d.t!='')?d.t:leng.seccion_comas;
			let v = prompt(t,d.v);		
			if (v != null) {
				jmy_web_guardar({data:{
						"valor": v,
						"page": d.p,
						"id": d.id,	
					}});
				location.reload();			
			}	    
		}); 
	}); 
}

function jmy_web_contador_click(){
	jQuery(function ($) { 
		$(".jmy_web_contador").click(function(e) {
			let d = { 	"t":$(this).data('titulo'),
						"v":$(this).data('value'),
						"p":$(this).data('page'),
						"id":$(this).attr('id'),
						"tabla":$(this).data('tabla'),
						"re":$(this).data('redi'),
					};
			console.log('jmy_web_contador',d);
			let t = (d.t!='') ? d.t : leng.cont_cant;
			let v = prompt(t,d.v);		
			if (v != null) {
				v = parseInt(v);
				if (v != null ) {
					jmy_web_guardar({data:{
							"valor": v,
							"page": d.p,
							"id": d.id,	
							"tabla": (d.tabla!=undefined)?d.tabla:'vistaweb',	
							"fn": "jmy_web_html_contador_respuesta",	
						}});
					}else{
						alert('valor incorrecto');
					}
				}	    
			}); 
		}); 
	}
function jmy_web_html_contador_respuesta(d=[]){
	let res = d.r;
	let error = res.error;
	if(error==undefined)
		location.reload();
	else
		alert('Faltan datos');
}

function jmy_web_html_contador(d=[]){
	let c='';
	let h='';
	let b='';
	jQuery(function ($) { 
		$(".jmy_web_contador").each(function() {
			h='';
			c=$(this).data('value');
			b=$(this).data('button');
			console.log(b);
			
			b=(b!=undefined)?b:'Carrucel de '+c+' páginas';
			h = '<div style="background-color:rgba(30,170,30,0.7);padding:4px;font-size:16px;color:fcfcfc;border-radius:5px">'+b+'</div>';
			$(this).html('');	
			$(this).show(250);	
			$(this).html(h);				
		});
	});
}


function jmy_web_web_slider(d=[]){	  	
	let va=JSON.stringify(d.var);
	let pos = (d.button=='down') ? 'bottom:5px;left:5px;':'top:5px;left:5px;';
	let style = (d.style==undefined) ?  "z-index:10000;position:absolute;"+pos : d.style;
	jQuery(function ($) { 
		let h = "<div style='"+style+"' id='"+d.id+"_DI'><img style='width: 66px;height: auto;' id='"+d.id+"_OP' src='http://social.comsis.mx/templet/images/logo.png' data-var='"+va+"' data-page='"+d.page+"' data-tabla='"+d.tabla+"' heigth='60'></div>";
		if(d.herramientasPadre)
			$("#"+d.id).parent().append(h);    
		else
	  		$("#"+d.id).append(h);    
	  
	  $("#"+d.id+"_OP").click(function(){
		  $(".webSliderOP").remove();
		jmy_web_web_slider_OP({
			  id:d.id,
			  var:$(this).data('var'),
			  tabla:$(this).data('tabla'),
			  page:$(this).data('page')
		  });
	  });
	  });
	  
};

function guardarSliderProceso(d=[]){
	
}
function guardarSlider(d=[]){
	jQuery(function ($) { 
		let t = [];
		for (let i = 0; i < wSSaveTextArr.length; i++) {
			t = wSSaveTextArrDa[wSSaveTextArr[i]];
			t = {
				"id": wSSaveTextArr[i],
				"valor": t.val,
				"page": t.page,
				"tabla": t.tabla,
			};
			console.log('jmy_slider_guardar',t);
		if(t.type=="text"){
			$("#"+wSSaveTextArr[i]).html("");
			$("#"+wSSaveTextArr[i]).html(t.val);
		}
		jmy_web_guardar({data: t});
		  $(".webSliderOP").remove();
	}
	});
}
let ultimo_guardar_slider = 0;
function addGuardarSlider(d){ /*({id:785})*/
	if(jQuery.inArray(d.id,wSSaveTextArr)== -1 && d.id!=undefined) {
		wSSaveTextArr.push(d.id);		
		wSSaveTextArrDa[d.id]=[];
		wSSaveTextArrDa[d.id]=d;
	}
	
    //if(d.btn_guardar!=undefined)
    jQuery(function ($) { 
		$(".jmy_slider_guardar").prop('disabled', false);
		$(".jmy_slider_guardar").html('[+ Guardar ]');
        $(".jmy_slider_guardar").css(style.b_guardar);
    });
	if(d.id!=undefined){
		let t =wSSaveTextArrDa[d.id];
		console.log(t);
		t.val=d.val;
		wSSaveTextArrDa[d.id]=t;
	}
}
function jmy_web_web_slider_OP(d=[]){
	console.log(d);
	
	  let h="",t=[],t2="", dA = 0, gb = [];
	  for(let i=0;i<d.var.length;i++){
		  t=d.var[i];
		  t2="";
		  switch (t.type) {
			case 'imagen':
				if(t.width!=undefined) 
					t2 = t2+"<br> w: "+t.width;

				if(t.width!=undefined) 
					t2 = t2+" h: "+t.height;

				h=h+'<div class="drop-area" data-id_target="'+t.id+'" data-class="'+t.class+'" data-page="'+d.page+'" data-idadd="'+t.idadd+'" data-tabla="'+d.tabla+'" data-width="'+t.width+'" data-height="'+t.height+'"  data-cop=\''+ ((t.cop!=undefined)?JSON.stringify(t.cop):'') +'\' style="'+style.wS_ima+'" ><h3 class="drop-text" style="'+style.wS_ima_h3+'">'+leng.drop_image+' '+t2+'</h3></div>';
				dA++;
			break;
			case 'text':
				h=h+'<div style="'+style.wS_tx+'"><input data-page="'+d.page+'" data-tabla="'+d.tabla+'" type="text" placeholder="'+t.placeholder+'" value="'+t.value+'"  id="'+t.id+'" data-id_target="'+t.id+'" class="wSSaveText" style="'+style.wS_tx_in+'"></div>';
			break;
			case 'hidden':
				h=h+'<input data-page="'+d.page+'" data-tabla="'+d.tabla+'" type="hidden"  value="'+t.value+'"  id="'+t.id+'" data-id_target="'+t.id+'" >';
				
					gb.push({	id:t.id,
					page:d.page,
					tabla:d.tabla,
					val:t.value,
					type:"hidden"	}); 

			break;
		}
	  }
	  if(h=="")
		  h=leng.no_data_editable;
	  else
		  h=h+'<div style="'+style.wS_he+'"><button class="jmy_slider_guardar" style="'+style.wS_gu+'">[+]</button><button class="jmy_web_slider_cancelar" style="'+style.wS_ca+'"> [x] </button></div>';
		  jQuery(function ($) { 
	  $("#"+d.id+"_DI").append('<div class="webSliderOP" style="'+style.wS_OP+'">'+h+'</div>');

		if(gb.length>0)
			gb.forEach(e => {
				console.log('gb',e);
				
				addGuardarSlider(e); 			
			});
	  


	  $(".webSliderOP").draggable({
		cursor: "move",
		/*cursorAt: {
			top: 20,
			left: 20
		}*/
	});
	  $(".wSSaveText").on('input',function(){
		  let t={	id:$(this).data('id_target'),
				page:$(this).data('page'),
				tabla:$(this).data('tabla'),
				val:$(this).val(),
				type:"text"	};			
		  addGuardarSlider(t); 
	  });
	  $(".jmy_slider_guardar").click(function(){
		  guardarSlider();
	  });

	  $(".jmy_web_slider_cancelar").click(function(){
		  let wSSaveTextArr=[];
		  $(".webSliderOP").remove();
	  });

	  $(".drop-area").on('dragenter', function (e){
		e.preventDefault();
		$(this).css('background', '#BBD5B8');
	});

	$(".drop-area").on('dragover', function (e){
		e.preventDefault();
	});

	$(".drop-area").on('drop', function (e){
		$(this).css('background', '#D8F9D3');
		e.preventDefault();
		let im = e.originalEvent.dataTransfer.files;
		console.log(im);
		
		uImage(im,{	id:$(this).data('id_target'),
					page:$(this).data('page'),
					tabla:$(this).data('tabla'),
					idadd:$(this).data('idadd'),
					height:$(this).data('height'),
					width:$(this).data('width')	,
					class:$(this).data('class')	,
					cop:$(this).data('cop')	,
					porcional:$(this).data('porcional')	});
		});
	});
	

 }
 function uImage(im,d=[]){
	var fI = new FormData();
	fI.append('userImage', im[0]);
	d['btn_guardar']=true;
	uForm(fI,d);
}


function uImage(im,d=[]){
	
	
	var fI = new FormData();
	fI.append('userImage', im[0]);

        console.log(fI,d);		

	if(d.cop!=undefined){
		let st;
		//$.when(
		d.cop.forEach(e => {
			
			$(".jmy_slider_guardar").html('[Cargando..]');
			$(".jmy_slider_guardar").prop('disabled', true);
			$(".jmy_slider_guardar").css(style.b_cargando);
			st = setTimeout(uForm(fI,{
				id:e.id,
				page:d.page,
				tabla:d.tabla,
				height:e.height,
				width:e.width,
				porcional:e.porcional
			}), 2000);
		});
		//)).done(function(){
			clearTimeout(st);
		//});
		
		d.btn_guardar=true;
		uForm(fI,d);
	}else{
		d.btn_guardar=true;
		uForm(fI,d);
	}
	
}

function uForm(formData,d=[]){
	d.tabla=(d.tabla=="undefined")?"":d.tabla;
	console.log(d);
	jQuery(function ($) { 
	$(".jmy_slider_guardar").prop('disabled', true);
	$(".jmy_slider_guardar").css(style.b_cargando);

	$(".jmy_slider_guardar").html('Cargando imagen...');
	$.ajax({
		url: location.origin+"/jmyWebUpLoIm/width-"+d.width+"/height-"+d.height+"/",
		type: "POST",
		data: formData,
		contentType:false,
		dataType: 'json',
		cache: false,
		processData: false,
		success: function(r){
			console.log(r,formData);			
			r.url =(r.url!=undefined)?r.url:r.val;

			let h = '<img width="45%" src="'+r.url+'">';
			$('#drop-area').html(h);
			console.log(d);
			$("#"+d.id).attr("src",r.url);
			if(d.idadd!=undefined)
				$("#"+d.idadd).attr("src",r.url);
			if(d.class!=undefined)
				$("."+d.class).attr("src",r.url);
			addGuardarSlider({	id:d.id, 
								id_target:d.id,
								  tabla:d.tabla,
								  page:d.page,
								  val:r.url,
								  btn_guardar:d.btn_guardar
							  });
	},error: function(result) {
		console.log(result);

		$(".jmy_slider_guardar").html('[-Error, Volver intentar]');
			}
		});
		});
}

function jmy_web_cargaSlider(d = []) {


	jQuery(function ($) { 
		$(".jmy_web_slider").each(function(e) {
			jmy_web_web_slider({
				id: $(this).attr('id'),
				placeholder: $(this).data("placeholder"),
				page: $(this).data("page"),
				tabla: $(this).data("tabla"),
				var: $(this).data("var"),
				marco: $(this).data("marco"),
				style: $(this).data("style"),
				button: $(this).data("button")
			});
		});
	});
}

function img_op(){
	let h='';
	let t='';
	let b=[];
	$(".jmy_web_img").each(function() {
		 d = {
					"tabla":$(this).data("tabla"),
					"page":$(this).data("page"),
					"var":$(this).data("var"),
		};
		h='';
		h = '<div style="background-color:rgba(30,170,30,0.7);padding:4px;font-size:16px;color:fcfcfc;border-radius:5px">';
			for (let i = 0; i < d.var.length; i++) {
				t = d.var[i];
				h = h+t.id;
			}
		h = h+'</div>';
		$(this).html('');	
		$(this).show(250);	
		console.log(h);
		//$(this).html(h);				
	});
}
let sinGuardar = [];
let config = [];
let WSlider=[];
let lng=[];	
let wSSaveTextArr=[];
let wSSaveTextArrDa=[];
//$.getScript("app/js/jmy/MX-es.js",function(){});
let leng = {
	guardar:"Guardar",
	guardar_cambios:"Guardar todos los cambios",
	hola:"hola",
	hola:"hola",
	imgLogo:"http://social.comsis.mx/templet/images/logo.png",
	no_data_save:"Falta datos para poder guardar",
	drop_image:"Arrastra aqui las imagen",
	no_data_editable:"No hay datos editables en esta sección",
	dato_guardado:"Dato guardado :)",
	sin_titulo_post:"Primero ingrese el titulo del post",
	nombre_nuevo_post:"Nombre del nuevo post",
	seccion_comas:"Indica el nombre de cada sección separado por comas",
	cont_cant:"Indica en número la cantidad de paginas de este elemento a mostrar",
	agregar_post:"Agregar nota en el blog",
	}
let style = {
	h_guardar:"background-color:rgba(30,140,30,0.8);padding:8px;color:#fff;font-size:16px;border:0;border-radius:5px;",
	h_cancelar:"background-color:rgba(140,30,30,0.8);padding:8px;color:#fff;font-size:16px;border:0;border-radius:5px;",
	b_guardar:"background-color:rgba(30,140,30,0.8);padding:8px;color:#fff;font-size:16px;border:0;border-radius:5px;",
	b_azul:"background-color:rgba(30,30,140,0.8);padding:8px;color:#fff;font-size:16px;border:0;border-radius:5px;",
	b_cargando:"background-color:rgba(30,30,30,0.8);padding:8px;color:#fff;font-size:16px;border:0;border-radius:5px;",
	b_cancelar:"background-color:rgba(140,30,30,0.8);padding:8px;color:#fff;font-size:16px;border:0;border-radius:5px;",
	wS_ima:"margin:5px; width:220px; height:60px; background-color:white; border:3px dashed grey;",
	wS_ima_h3:"margin:5px 5px; color:grey; font-size:12px; font-weight:bold; text-align: center;",
	wS_tx:"margin:5px; width:220px; height:30px; background-color:white; font-size:12px;",
	wS_tx_in:"color:#333 !important",
	wS_gu:"background-color:rgba(30,140,30,0.8);padding:4px;color:#fff;font-size:14px;border:0;border-radius:4px;",
	wS_in:"background-color:rgba(30,30,140,0.8);padding:4px;color:#fff;font-size:14px;border:0;border-radius:4px;",
	wS_ca:"background-color:rgba(140,30,30,0.8);padding:4px;color:#fff;font-size:14px;border:0;border-radius:4px;",
	wS_he:"margin:5px; width:220px; height:40px; background-color:white;",
	wS_OP:"position:absolute;top:5px;left:70px;padding:5px;border-radius:5px;background-color:rgba(200,200,200,0.7);color:#333;font-size:12px;",
}
function jmy_web_select_recargar(d=[]){
	jQuery(function ($) { 
		$(".jmy_web_recargar_select").on("click",function(){
			jmy_web_select(d);
		});
	});
}
function jmy_web_select_editar(d=[]){
	let h ='';
console.log(d);
	h='';
	const c = [
		{
			"id":"nombre_nuevo_catalogo",
			"value":"",
			"type":"text",
			"placeholder":"Nombre",
			"label":"Nombre"
		},{
			"id":"value_nuevo_catalogo",
			"value":"",
			"type":"text",
			"placeholder":"Valor",
			"label":"Valor",
			"class":"select_editar_oculto"
		},{
			"id":"descripcion_nuevo_catalogo",
			"value":"",
			"type":"text",
			"placeholder":"Descripción",
			"label":"Descripción",
			"class":"select_editar_oculto"
		}
	];
	c.forEach(e => {
		let id=(e.id!=''&&e.id!=undefined)?e.id:'jmy_web_select_editar'+Math.floor((Math.random() * 1000) + 1);
		h=h+'<div class="form-group '+e.class+'"><label for="'+e.id+'">'+e.label+'</label><input type="'+e.type+'" class="form-control input-sm" id="'+e.id+'" placeholder="'+e.placeholder+'"></div>';
	});
	if(h=="")
		  h=leng.no_data_editable;
	  else
		  h=h+'<div style="'+style.wS_he+'"><button class="jmy_select_opciones" style="'+style.wS_in+'">[*]</button><button class="jmy_select_guardar" style="'+style.wS_gu+'">[+]</button><button class="jmy_web_select_cancelar" style="'+style.wS_ca+'"> [x] </button></div>';
	jQuery(function ($) { 
		$(".webSliderOPSelect").remove();
		$("#"+d.i).parent().append('<div class="webSliderOPSelect" style="'+style.wS_OP+'">'+h+'</div>');
		$(".select_editar_oculto").hide();
		$(".jmy_select_opciones").on('click',function (){
			$(".select_editar_oculto").toggle();
		});

		$(".webSliderOPSelect").draggable({
			cursor: "move",
		});
	
		$(".jmy_select_guardar").on('click',function(){
			let g = {
				id:d.l,
				i:d.i,
				v:d.v,
				h:d.h,
				l:d.l,
				nombre:$("#nombre_nuevo_catalogo").val(),
				value:$("#value_nuevo_catalogo").val(),
				descripcion:$("#descripcion_nuevo_catalogo").val()
			};
			if(g.nombre!=''&&g.nombre!=undefined){
				g.value = (g.value!=''&&g.value!=undefined)?jmy_web_url_friendly(g.value,'_'):jmy_web_url_friendly(g.nombre,'_');
				console.log(g);
				jmy_web_select_guardar(g);	
			}
		});

		$(".jmy_web_select_cancelar").click(function(){
			let wSSaveTextArr=[];
			$(".webSliderOPSelect").remove();
		});

		
	});
	
}
function jmy_web_select_guardar(d=[]){
	console.log(d);
	
	jQuery(function ($) { 
		$.ajax({
			url: location.origin + '/jmyWebAjS',
			type: 'post',
			dataType: 'json',
			success: function(res) {
				console.log(res);
				$(".webSliderOPSelect ").remove();
				$("#"+d.i).attr('data-value',d.v);
				const s={
						v:d.value,
						i:d.i,
						h:d.h,
						l:d.l
					};
					$(this).attr('name',s.i);
					$(this).val(s.v);
					jmy_web_select(s);
				
			},
			error: function(res) {
				console.log(res);
			},
			data: d
		});
	});	
}
let count = 0;
function jmy_web_select(d=[]){
	console.log('jmy_web_select',d);
	
	jQuery(function ($) { 
		$.ajax({
			url: location.origin + '/jmyWebAjS',
			type: 'post',
			dataType: 'json',
			success: function(res) {
				//console.log(res);
				
				const l = res.lista.otFm;
				let h = '';
				if(d.h!='') h= h+'<option>'+d.h+'</option>';
				if(l!=undefined){
					//console.log(l);					
					l.forEach(e => {
						const s = (e.value===d.v) ? 'selected':'';
						h= h+'<option value="'+e.value+'" '+s+'>'+e.nombre+'</option>';
					});
				}
				if(res.ps) h= h+'<option value="JMYAGREGAR"> [+] Agregar </option>';
				$("#"+d.i).html(h);
				
				$("#"+d.i).change(function(){
					let v = $("option:selected",this).val();
					console.log(v);
					if(v=="JMYAGREGAR"){
						jmy_web_select_editar(d);
					}
				});
			},
			error: function(res) {
				console.log(res);
			},
			data: d
		});
	});	
}
jQuery(function ($) { 
	$("#jmy_web").hide(250);
	$(".jmy_web_contador").hide(250);
	function carga(d=[]){
		console.log('init jmy');
      $('body').prepend('<div id="jmy_web"></div><div id="jmy_web_tools"></div>');
		//img_op();
		jmy_web_div_click();
		jmy_web_categorias_click();
		jmy_web_contador_click();
		jmy_web_cargaSlider();
		jmy_web_html_contador();
		jmy_web_html_categorias();
		jmy_web_msk_add_blog();
	}
	if($("#jmy_web").length){
		console.log('existe');
	}else{
	//	$("body").prepend('<div id="jmy_web"></div><div id="jmy_web_tools"></div>');
	}
	$("#jmy_web").draggable({
		cursor: "move",
		cursorAt: {
			top: 20,
			left: 20
		}
	});

	carga();
});
