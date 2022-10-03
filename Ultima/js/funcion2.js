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
    id: "",
    fecha: "",
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

function crearVentas() {
  let ide = document.getElementById("identificador").value;
  let fecha = document.getElementById("fecha").value;
  let clienter = document.getElementById("SelCliente").value;
  let productos = document.getElementById("SelProducto").value;
  let subT = document.getElementById("selectn").textContent;
  let netPagar = document.getElementById("selectneto").textContent;

  //Insertar usuario en un objeto

  objVenta.push({
    id: ide,
    fecha: fecha,
    cliente: objCliente[clienter - 1].nombre,
    producto: producto[productos - 1].nombreProducto,
    subtotal: subT,
    neto: netPagar,
  });
  listar();
  limpiarVentas();
}

//MODAL
$(document).ready(function () {
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

//Funcion limpiar Campos Ventas

function limpiarVentas() {
  ide = document.getElementById("identificador").value = "";
  fecha = document.getElementById("fecha").value = "";
  clienter = document.getElementById("SelCliente").value = "";
  productos = document.getElementById("SelProducto").value = "";
  subT = document.getElementById("selectn").textContent = "";
  netPagar = document.getElementById("selectneto").textContent = "";
}

//Enlistar
function listar() {
  let usuario = "";
  objVenta.forEach((venta) => {
    usuario += `
      <tr>
          <th scope="row" class="text-center">${venta.id}</th>
          <td class="text-center">${venta.fecha}</td>
          <td class="text-center">${venta.cliente}</td>
          <td class="text-center">${venta.producto}</td>
          <td class="text-center">${venta.subtotal}</td>
          <td class="text-center">${venta.neto}</td>
          <td class="text-center"><a class="btnEdit btn btn-primary" id="" onclick="editarVenta();">Editar <i class="fa-solid fa-pen-to-square"></i></a></td>

          
      </tr>
      `;
  });

  let tblVentas = document.getElementById("tablaB");

  tblVentas.innerHTML = usuario;
}
listar();

//Eliminar clientes

function borrar() {
  let borrarU = parseInt(prompt("Ingresar id de la venta a eliminar"));

  let ventaId = objVenta.findIndex((venta) => venta.id == borrarU);

  objVenta.splice(ventaId, 1);
  listar();

  alert("Registro borrado exitosamente");
}

//editar venta

function editarVenta() {
  
  for(let item of objVenta) {
    var iden = item.id;
    var dat = item.fecha;
    var cli = item.cliente;
    var prod = item.producto;
    var sub = item.subtotal;
    var neto = item.neto;

      Swal.fire({
        title: "Editar Venta",
        html: `
        <form id= "update_vent">
        <div class="row">
                        <div class="form-group">
                          <label for="nombre" class="control-label">ID<i class="fa fa-asterisk small text-danger"></i></label>
                          <input  id="identificador" type="number" class="form-control" name="identificador"  value="${iden}" />
                        </div>
                      </div>
                <div class="form-group">
                  <label for="nombre" class="control-label">Nombre Completo<i class="fa fa-asterisk small text-danger"></i></label>
                  <input  id="fecha" type="date" class="form-control" name="nombre"  value="${dat}" />
                </div>
                <div class="form-group">
                          <label for="SelCliente" class="control-label"> Cliente
                            <i class="fa fa-asterisk small text-danger"></i></label>
                          <select name="SelCliente" id="SelCliente"
                            class="form-control">
                            <option value="${cli}" selected="selected">Seleccionar
                              cliente</option>
                          </select>
                        </div>
                        <div class="form-group">
                        <label for="SelProducto" class="control-label">
                          Producto<i class="fa fa-asterisk small text-danger"></i></label>
                        <select name="SelProducto" id="SelProducto"
                          class="form-control">
                          <option value="${prod}" selected="selected">Seleccionar
                            producto</option>
                        </select>
                      </div>
          
                      <div class="form-group">
                      <div>
                        <label for="subtotal" class="control-label">Subtotal
                          <i class="fa fa-asterisk small text-danger"></i></label>
                          <br>
                          <button type="button" class="btn btn-light  btn-lg" id="selectn" value="${sub}"></button>
                      </div>
                    </div>
                    <div class="form-group">
                          <div>
                            <label for="subtotal" class="control-label">Neto a pagar
                              <i class="fa fa-asterisk small text-danger"></i></label>
                              <br>
                              <button type="button" class="btn btn-light  btn-lg" id="selectneto" value="${neto}"></button>
                              
                          </div>
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