const objCliente = [
  {
    id: 1,
    nombre: "Ayleen Orjuela",
    direccion: "Cra 25a #43-27",
    email: "ayleenmurillo77@gmail.com",
    ciudad: "Cali",
  },
  {
    id: 2,
    nombre: "Andres Montiel",
    direccion: "Cra 40 #30-90",
    email: "andresmontiel@siesa.com",
    ciudad: "Cartagena",
  },
  {
    id: 3,
    nombre: "Luisa Camargo",
    direccion: "Cra 80 #60-90",
    email: "luisacamargo@gmail.com",
    ciudad: "Medellin",
  },
];

const objVenta = [
  {
    id: 1,
    fecha: new Date().toDateString(),
    cliente: "",
    producto: "",
    subtotal: "",
    neto: "",
  },
  {
    id: 2,
    fecha: new Date().toDateString(),
    cliente: "",
    producto: "",
    subtotal: "",
    neto: "",
  },
  {
    id: 3,
    fecha: new Date().toDateString(),
    cliente: "",
    producto: "",
    subtotal: "",
    neto: "",
  },
];

const producto = [
  {
    id: 1,
    nombreProducto: "Camisa",
    precio: 20000,
  },
  {
    id: 2,
    nombreProducto: "Jean",
    precio: 100000,
  },
  {
    id: 3,
    nombreProducto: "Tenis",
    precio: 150000,
  },
];

//----------------------------- FUNCIONALIDAD ------------------------------------
//Agregar usuario

function crearUser() {
  var ide = document.getElementById("identificador").value;
  var nombre = document.getElementById("nombre").value;
  var dir = document.getElementById("direccion").value;
  var email = document.getElementById("correo").value;
  var ciudad = document.getElementById("ciudad").value;

  //Insertar usuario en un objeto
  objCliente.push({ id: ide, nombre, direccion: dir, email, ciudad: ciudad });

  listar();
  limpiarClientes();
}

//Listar Usuarios
function listar() {
  let usuario = "";
  objCliente.forEach((cliente) => {
    usuario += `
    <tr>
        <th scope="row" class="text-center">${cliente.id}</th>
        <td class="text-center">${cliente.nombre}</td>
        <td class="text-center">${cliente.direccion}</td>
        <td class="text-center">${cliente.email}</td>
        <td class="text-center">${cliente.ciudad}</td>
        <td class="text-center"><a class="btnEditar btn btn-primary" id="" onclick="editarCliente();">Editar <i class="fa-solid fa-pen-to-square"></i></a></td>
    </tr>
    `;
  });
  let tblClientes = document.getElementById("tablaC");

  tblClientes.innerHTML = usuario;
}
listar();
//Mostrar modal de cliente
$(document).ready(function () {
  $("#btnCliente").click(function () {
    $("#modalCliente").modal("show");
  });

  //Resetear valores del modal
  $("#modalCliente").on("hidden.bs.modal", function (event) {
    let formulario = $("#modalCliente").find("form");
    formulario[0].reset();
  });

  //Mostrar modal de ventas
  $("#btnVenta").click(function () {
    $("#modalVenta").modal("show");
  });

  //resetear valores del modal de ventas
  $("#modalVenta").on("hidden.bs.modal", function (event) {
    let formulario1 = $("#modalVenta").find("form");
    document.getElementById("selectn").textContent = "";
    document.getElementById("selectneto").textContent = "";

    formulario1[0].reset();
  });

  //Rellenar select con los productos del objeto

  var $select = $("#SelProducto");

  $.each(producto, function (id, nombreProducto) {
    $select.append(
      "<option value=" +
        nombreProducto.id +
        ">" +
        nombreProducto.nombreProducto +
        "</option>"
    );
  });

  //Traer los clientes del objeto
  var $selectClientes = $("#SelCliente");

  $.each(objCliente, function (id, nombre) {
    $selectClientes.append(
      "<option value= " + nombre.id + ">" + nombre.nombre + "</option"
    );
  });
});
//Select anidado, mostrar subtotal y neto a pagar
let selectElement = document.querySelector("#SelProducto");

selectElement.addEventListener("change", (e) => {
  let seleccion = e.target.value;

  let b = document.getElementById("selectn");
  let resultado = "";

  if (seleccion == 1) {
    b.innerHTML = producto[0].precio;
    resultado = producto[0].precio * 0.19 + producto[0].precio;
  } else if (seleccion == 2) {
    b.innerHTML = producto[1].precio;
    resultado = producto[1].precio * 0.19 + producto[1].precio;
  } else if (seleccion == 3) {
    b.innerHTML = producto[2].precio;
    resultado = producto[2].precio * 0.19 + producto[2].precio;
  }
  document.getElementById("selectneto").innerHTML = resultado;
});

//Funcion limpiar Campos Clientes

function limpiarClientes() {
  document.getElementById("identificador").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("direccion").value = "";
  document.getElementById("correo").value = "";
  document.getElementById("ciudad").value = "";
}

//Funcion limpiar Campos Ventas

function limpiarVentas() {
  document.getElementById("identificador").value = "";
  document.getElementById("fecha").value = "";
  document.getElementById("SelCliente").value = "";
  document.getElementById("SelProducto").value = "";
  document.getElementById("selectn").textContent = "";
  document.getElementById("selectneto").textContent = "";
}

//Eliminar clientes

function borrar() {
  let borrarU = parseInt(
    prompt("Ingresa el id del cliente que desea eliminar")
  );

  let clienteId = objCliente.findIndex((cliente) => cliente.id == borrarU);

  objCliente.splice(clienteId, 1);
  listar();

  alert("Registro borrado exitosamente");
}

borrar();

//Editar clientes

function editarCliente() {
  
  for(let item of objCliente) {
    var ident = item.id;
    var nomb = item.nombre;
    var dirr = item.direccion;
    var em = item.email;
    var ciu = item.ciudad;
  
      Swal.fire({
        title: "Editar Cliente",
        html: `
        <form id= "update_form">
        <div class="row">
                <div class="form-group">
                  <label for="nombre" class="control-label">ID<i class="fa fa-asterisk small text-danger"></i></label>
                  <input  id="identificador" type="number" class="form-control" name="identificador"  value="${ident}" />
                </div>
                <div class="form-group">
                  <label for="nombre" class="control-label">Nombre Completo<i class="fa fa-asterisk small text-danger"></i></label>
                  <input  id="nombre" type="text" class="form-control" name="nombre"  value="${nomb}" />
                </div>
                <div class="form-group">
                  <label for="direccion" class="control-label">Dirección  <i class="fa fa-asterisk small text-danger"></i></label>
                  <input type="text" class="form-control" name="direccion" id="direccion" value="${dirr}" />
                </div>
                <div class="form-group">
                 
                    <label for="correo" class="control-label">Email <i class="fa fa-asterisk small text-danger"></i></label>
                    <input type="email" class="form-control" name="correo" id="correo" value="${em}" placeholder="Introduce tu e-mail"/>          
                  </div>
          
                <div class="form-group" style="padding-bottom:10px;>
                  <label for="ciudad" class="control-label">Ciudad  <i class="fa fa-asterisk small text-danger"></i></label>
                  <input type="text" class="form-control" name="ciudad" id="ciudad" value="${ciu}" />
                </div>
          </div>
        </form>
        `,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar!",
      }).then((result) => {
        if (result.value) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
  }
    };
