﻿using Casuarinas.Helpers;
using Model;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Casuarinas.Controllers
{
    [Autorization]
    public class UsuarioController : Controller
    {
        private Usuario usuario = new Usuario();
        private CentroCosto centroCosto = new CentroCosto();
        private Empresa empresa = new Empresa();
        private Rol rol = new Rol();
        private Estado modelEstado = new Estado();
        private MenuRol mPermisos = new MenuRol();

        // VIEW - Lista completa
        public ActionResult Index(string search = null)
        {
            List<Usuario> resultado = usuario.listar();

            if (!string.IsNullOrEmpty(search))
            {
                resultado = resultado.FindAll(u => u.nombre.ToUpper().Contains(search.Trim().ToUpper()) ||
                                                   u.cuentaWeb.ToUpper().Contains(search.Trim().ToUpper()));
            }

            if (TempData["msg"] != null)
                ViewData["alert"] = "Success";

            return View(resultado);
        }

        // VIEW - Inserción y edición
        public ActionResult Form(int id = 0)
        {
            var objUsuario = id > 0 ? usuario.obtener(id) : usuario;
            var list = modelEstado.listar().Select(x => new SelectListItem
            {
                Text = x.descripcion,
                Value = x.estado,
                Selected = (x.estado == objUsuario.estado)
            });

            if (TempData["msg"] != null)
                ViewData["alert"] = "Success";

            ViewBag.Empresas = empresa.listar().Where(c => c.estado.Equals("A")).ToList();
            ViewBag.CentrosCosto = centroCosto.listar().OrderBy(c => c.descripcion).Where(c => c.estado.Equals("A")).ToList();
            ViewBag.Rol_Id = new SelectList(rol.listar(), "id", "descripcion", objUsuario != null ? objUsuario.Rol_id : 0);
            ViewBag.Estado = list;
            return View(objUsuario != null ? objUsuario : usuario);
        }

        // VIEW - Detalles
        public ActionResult Details(int id)
        {
            ViewBag.Empresas = empresa.listar();
            return View(usuario.obtener(id));
        }

        // VIEW - Importar desde archivo
        public ActionResult Import()
        {
            return View();
        }

        // METHOD - SAVE (WHEN EDIT AND REGISTER)
        [HttpPost]
        public JsonResult Guardar(Usuario model, int[] empresas_seleccionadas = null, int[] centroscosto_seleccionados = null)
        {
            var respuesta = new ResponseModel
            {
                respuesta = true,
                redirect = "usuario/form/" + model.id,
                error = "",
                error2 = ""
            };

            if (empresas_seleccionadas != null && centroscosto_seleccionados != null)
            {
                model.fechaRegistro = DateTime.Now;
                model.Rol = rol.obtenerSingle(model.Rol_id);

                foreach (var e in empresas_seleccionadas)
                    model.Empresas.Add(new Empresa { id = e });

                foreach (var c in centroscosto_seleccionados)
                    model.CentrosCosto.Add(new CentroCosto { id = c });
            }
            else
            {
                if (empresas_seleccionadas == null)
                {
                    ModelState.AddModelError("empresas", "Debe seleccionar por lo menos una empresa");
                    respuesta.respuesta = false;
                    respuesta.error = "Debe seleccionar por lo menos una empresa";
                }

                if (centroscosto_seleccionados == null)
                {
                    ModelState.AddModelError("centroscosto", "Debe seleccionar por lo menos un centro de costo");
                    respuesta.respuesta = false;
                    respuesta.error2 = "Debe seleccionar por lo menos un centro de costo";
                }
            }

            bool exists = model.validateUserAccount();
            if (exists)
            {
                ModelState.AddModelError("", "Usuario ya existe");
                respuesta.respuesta = false;
                respuesta.error = "El usuario web especificado ya existe.";
            }

            if (ModelState.IsValid)
            {
                bool newObject = model.id == 0;

                //Encriptar password
                if (newObject)
                {
                    var keyNew = PasswordHelper.GeneratePassword(10);
                    var password = PasswordHelper.EncodePassword(model.passWeb, keyNew);

                    model.VCode = keyNew;
                    model.passWeb = password;
                }

                //Guardar objeto
                var dbResult = model.Guardar();

                if (string.IsNullOrEmpty(dbResult))
                {
                    ViewBag.Rol_Id = new SelectList(rol.listar(), "id", "Descripcion", model.Rol_id);
                    //TempData["msg"] = "Success";
                    TempData[Constantes.TEMPDATA_MESSAGE] = Constantes.SUCCESS_MESSAGE;

                    if (!newObject)
                    {
                        Usuario objCurrentUser = (Usuario)Session[Constantes.SESSION_USUARIO];
                        if (model.id == objCurrentUser.id)
                            Session[Constantes.SESSION_USUARIO] = usuario.obtener(model.id);
                    }
                }
                else
                {
                    respuesta.respuesta = false;
                    respuesta.error = dbResult;
                }

                respuesta.redirect = newObject ? "usuario/index" : "usuario/form/" + model.id;
            }

            return Json(respuesta);
        }

        // METHOD - SAVE FROM XLSX
        [HttpPost]
        public JsonResult GuardarFromExcel(string nombre = null, string cuenta = null, string password = null, string correo = null,
                                  string fecReg = null, string codSAP = null, int rol = -1, int empresa = -1, int ccosto = -1)
        {
            var respuesta = new ResponseModel
            {
                respuesta = true,
                error = ""
            };

            try
            {
                Usuario model = new Usuario();
                model.nombre = nombre;
                model.cuentaWeb = cuenta;
                model.VCode = PasswordHelper.GeneratePassword(10);
                model.passWeb = PasswordHelper.EncodePassword(password, model.VCode);
                model.correo = correo;
                model.fechaRegistro = DateTime.ParseExact(fecReg, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                model.Rol = new Rol { id = rol };
                model.estado = "A";

                if (codSAP != null)
                    model.codigo_sap = int.Parse(codSAP);

                if (empresa != -1)
                    model.Empresas = new List<Empresa>() { new Empresa { id = empresa } };

                if (ccosto != -1)
                    model.CentrosCosto = new List<CentroCosto>() { new CentroCosto { id = ccosto } };

                var res = model.Guardar();

                if (!string.IsNullOrEmpty(res))
                {
                    respuesta.respuesta = false;
                    respuesta.error = res;
                }

            }
            catch (Exception ex)
            {
                respuesta.respuesta = false;
                respuesta.error = ex.Message;
            }

            return Json(respuesta);
        }

        // METHOD - DELETE
        public ActionResult Eliminar(int id)
        {
            usuario.Eliminar(id);
            return Redirect("~/Usuario");
        }

        // PARTIAL VIEW - LISTAR CENTROS DE COSTO
        public PartialViewResult CentrosCosto(int empresa_id = 0)
        {
            ViewBag.Empresas = empresa.listar();
            ViewBag.CentrosCosto = empresa_id > 0 ? centroCosto.listar(empresa_id) : centroCosto.listar();
            return PartialView();
        }

        //UTIL METHOD
        [HttpGet]
        public JsonResult GetUsuarios()
        {
            var list = usuario.getForCombo().Select(x => new SelectListItem
            {
                Text = x.nombre,
                Value = x.id.ToString()
            });

            return Json(list);
        }

        public ActionResult UploadFile()
        {
            var usersList = new List<Usuario>();

            if (Request != null)
            {
                HttpPostedFileBase file = Request.Files["UploadedFile"];
                if ((file != null) && (file.ContentLength > 0) && !string.IsNullOrEmpty(file.FileName))
                {
                    string fileName = file.FileName;
                    string fileContentType = file.ContentType;
                    byte[] fileBytes = new byte[file.ContentLength];
                    var data = file.InputStream.Read(fileBytes, 0, Convert.ToInt32(file.ContentLength));

                    using (var package = new ExcelPackage(file.InputStream))
                    {
                        var currentSheet = package.Workbook.Worksheets;
                        var workSheet = currentSheet.First();
                        var noOfCol = workSheet.Dimension.End.Column;
                        var noOfRow = workSheet.Dimension.End.Row;
                        for (int rowIterator = 3; rowIterator <= noOfRow; rowIterator++)
                        {
                            if (workSheet.Cells[rowIterator, 1].Value != null && workSheet.Cells[rowIterator, 2].Value != null)
                            {
                                var user = new Usuario();
                                user.Rol_Descripcion = workSheet.Cells[rowIterator, 1].Value != null ? workSheet.Cells[rowIterator, 1].Value.ToString() : string.Empty;
                                user.nombre = workSheet.Cells[rowIterator, 2].Value != null ? workSheet.Cells[rowIterator, 2].Value.ToString() : string.Empty;
                                user.cuentaWeb = workSheet.Cells[rowIterator, 3].Value != null ? workSheet.Cells[rowIterator, 3].Value.ToString() : string.Empty;
                                user.passWeb = workSheet.Cells[rowIterator, 4].Value != null ? workSheet.Cells[rowIterator, 4].Value.ToString() : string.Empty;
                                user.correo = workSheet.Cells[rowIterator, 5].Value != null ? workSheet.Cells[rowIterator, 5].Value.ToString() : string.Empty;
                                user.Empresa_Descripcion = workSheet.Cells[rowIterator, 6].Value != null ? workSheet.Cells[rowIterator, 6].Value.ToString() : string.Empty;
                                user.fechaRegistro = workSheet.Cells[rowIterator, 7].Value != null ? (DateTime)workSheet.Cells[rowIterator, 7].Value : DateTime.Now;
                                user.codigo_sap = workSheet.Cells[rowIterator, 8].Value != null ? int.Parse(workSheet.Cells[rowIterator, 8].Value.ToString()) : -1;
                                user.CentroCosto_Sap = workSheet.Cells[rowIterator, 9].Value != null ? workSheet.Cells[rowIterator, 9].Value.ToString() : string.Empty;

                                //Validar datos
                                bool isValid = true;

                                //Validando rol
                                if (!string.IsNullOrEmpty(user.Rol_Descripcion))
                                {
                                    int idRol = rol.obtenerIdXDescripcion(user.Rol_Descripcion);
                                    if (idRol != -1)
                                        user.Rol = rol.obtenerSingle(idRol);
                                    else
                                    {
                                        user.validacion = "El rol especificado no es válido, revise los datos.";
                                        isValid = false;
                                    }
                                }
                                else
                                {
                                    user.validacion = "Debe especificar un rol de usuario.";
                                    isValid = false;
                                }

                                //Validando nombre de usuario
                                if (isValid && string.IsNullOrEmpty(user.nombre))
                                {
                                    user.validacion = "Debe especificar un nombre de usuario.";
                                    isValid = false;
                                }

                                //Validando cuenta web
                                if (isValid && string.IsNullOrEmpty(user.cuentaWeb))
                                {
                                    user.validacion = "Debe especificar una cuenta de usuario.";
                                    isValid = false;
                                }
                                else if (isValid && !string.IsNullOrEmpty(user.cuentaWeb))
                                {
                                    if (user.validateUserAccount(user.cuentaWeb))
                                    {
                                        user.validacion = "La cuenta web especificada ya existe.";
                                        isValid = false;
                                    }
                                }

                                //Validando pass web
                                if (isValid && string.IsNullOrEmpty(user.passWeb))
                                {
                                    user.validacion = "Debe especificar un password de usuario.";
                                    isValid = false;
                                }

                                //Validando correo
                                if (isValid && string.IsNullOrEmpty(user.correo))
                                {
                                    user.validacion = "Debe especificar un correo de usuario.";
                                    isValid = false;
                                }

                                //Validando empresa
                                if (isValid && !string.IsNullOrEmpty(user.Empresa_Descripcion))
                                {
                                    int idEmpresa = empresa.obtenerCodigoXDescripcion(user.Empresa_Descripcion);
                                    if (idEmpresa != -1)
                                        user.Empresas = new List<Empresa>() { new Empresa { id = idEmpresa } };
                                    else
                                    {
                                        user.validacion = "La empresa especificada no es válida, revise los datos.";
                                        isValid = false;
                                    }
                                }

                                //Validando centro de costo
                                if (isValid && !string.IsNullOrEmpty(user.CentroCosto_Sap))
                                {
                                    int idCentro = centroCosto.obtenerCodigoXCodSAP(user.CentroCosto_Sap, user.Empresas.Take(1).Single().id);
                                    if (idCentro != -1)
                                        user.CentrosCosto = new List<CentroCosto>() { new CentroCosto { id = idCentro } };
                                    else
                                    {
                                        user.validacion = "El centro de costo especificado no es válido, revise los datos.";
                                        isValid = false;
                                    }
                                }

                                if (isValid)
                                    user.validacion = "Datos correctos";

                                usersList.Add(user);
                            }
                        }
                    }
                }
            }

            TempData["detalles"] = usersList;
            return RedirectToAction("Import", "Usuario");
        }

    }
}
