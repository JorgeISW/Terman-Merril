//----------------------------------------------------------LOGIN METHODS------------------------------------------------------------//

var host_url = 'http://127.0.0.1/terman-merril/webServiceTerman/';

function callServiceLoggin() {
    var user = document.getElementById('inputUsuario').value;
    var pass = document.getElementById('inputContrasena').value;
    var body = {'action': 'loggin', 'usuario': user, 'clave': pass};
    $.ajax({
         url: host_url,
         type: 'POST',
         data: JSON.stringify(body),
         contentType: 'application/json',
         dataType: 'json',
         async: false,
         success: function (data) {
            var stringData2 = JSON.stringify(data);
            var algo = JSON.parse(stringData2);
            var name = data[0].email;
            var charge = algo[0].tipoUsuario;
             
            if(charge == '1')
            {
                localStorage.user = name;
                localStorage.type = charge;
                window.location="Admin.html";
            }
            else
                {
                    if(charge == '0')
                    {
                        localStorage.user = name;
                        localStorage.type = charge;
                        window.location="Usuario.html";
                    }
                    else
                    {
                        alert("ERROR AL INICIAR SESION");
                        window.location="index.html";
                    }        
                }

         },
         error: function () {
             alert('Error in Operation');
         }
     });
}

function setData()
{
    var usuario = document.getElementById("us");
    aux ='<i class="fa fa-user"></i>&nbsp&nbsp'+ localStorage.user +'<b class="caret"></b>';
    usuario.innerHTML = aux
}

function removeData()
{
    
    if(localStorage.type == 1){
        localStorage.removeItem("user");
        window.location = "index.html";
        alert("SESION CERRADA COMO ADMINISTRADOR");
    }
    if(localStorage.type == 2){
        localStorage.removeItem("user");
        window.location = "index.html";
            alert("SESION CERRADA COMO POSTULANTE");
    }
}

function verificarSesion()
{
    if(localStorage.user == null)
    {
        window.location = "index.html";
    }
}

function verificarSesionIndex()
{
    if(localStorage.user != null)
    {
        switch(localStorage.type){
            case "1":
                window.location = "Admin.html";
            break;
            case "2":
                window.location = "Postulante.html";
            break;
        }
    }
}

function verificarSerieActual()
{
    if(localStorage.sesion < 1)
    {        
        window.location = "index.html";
    }
}

//---------------------------------------------------REGISTAR POSTULANTE METHODS-----------------------------------------------------//

function insertarPostulante()
{
    var nombre = document.getElementById("inputName").value;
    //nombre = nombre.replace(/ /g,".");
    var apellidos = document.getElementById("inputApellidos").value;
    //apellidos = apellidos.replace(/ /g,".");
    var combo = document.getElementById("inputTipo");
    var puesto = combo.options[combo.selectedIndex].value;
    var correo = document.getElementById("inputCorreo").value;
    var contrasena = document.getElementById("inputContrasena").value;
    var confirmContrasena = document.getElementById("inputConfirmar").value;
    if(contrasena == confirmContrasena)
        {
            var body = {'action': 'cUsuario', 'email': correo, 'password': contrasena, 'nombres': nombre, 'apellidos': apellidos, 'cargo': puesto};
            $.ajax({
                 url: host_url,
                 type: 'POST',
                 data: JSON.stringify(body),
                 contentType: 'application/json',
                 dataType: 'json',
                 async: false,
                 success: function (data) {
                     alert(data.message)
                 },
                 error: function (jqXHR, exception) {
                      var msg = '';
                        if (jqXHR.status === 0) {
                            msg = 'Not connect.\n Verify Network.';
                        } else if (jqXHR.status == 404) {
                            msg = 'Requested page not found. [404]';
                        } else if (jqXHR.status == 500) {
                            msg = 'Internal Server Error [500].';
                        } else if (exception === 'parsererror') {
                            msg = 'Requested JSON parse failed.';
                        } else if (exception === 'timeout') {
                            msg = 'Time out error.';
                        } else if (exception === 'abort') {
                            msg = 'Ajax request aborted.';
                        } else {
                            msg = 'Uncaught Error.\n' + jqXHR.responseText;
                        }
                     alert(msg);
                 }
             });
        }
        
    else
        alert("CONTRASEÑAS DIFERENTES");
}

function consultarPostulante()
{
	var body = {'action':'rUsuario'};
    $.ajax({
         url: host_url,
         type: 'POST',
         data: JSON.stringify(body),
         contentType: 'application/json',
         dataType: 'json',
         async: false,
         success: function (data) {
         	var content = document.getElementById("contentAnswer");
		    var show = '<table class="table" >';
            show += "<tr><th>#</th> <th>EMAIL</th> <th>PASSWORD</th> <th>NOMBRES(S)</th> <th>APELLIDO(S)</th> <th>CARGO AL QUE APLICA(S)</th> <th>CLAVE</th> </tr> ";
		    $.each(data, function(i, item) {
                var email = data[i].email;
                var password = data[i].password;
                var nombres = data[i].nombres;
                var apellidos = data[i].apellidos;
                var cargo = data[i].cargo;
                var clave = data[i].Clave;
		        show += "<tr id="+email+ "," +password+ ","+nombres+","+apellidos + ","+ cargo+"> <th>"+ (i+1) +"</th> <th>"+
                    email +"</th> <th>"+ password +"</th><th>"+nombres +"</th><th>"+ apellidos +'</th>'+'<th>'+cargo +'</th>'+'<th>'+clave +'</th>' +'</tr>';
                
		    });
		    show += "</table>";
		    content.innerHTML = show;
         },
         error: function () {
             alert('Error in Operation');
         }
     });
}

