using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Casuarinas.Helpers;
using Model;

namespace Casuarinas.Controllers
{
    public class AutentificacionController : Controller
    {
        //
        // GET: /Autentificacion/
        private Usuario usuario = new Usuario();
        private Configuracion configuracion = new Configuracion();
        private MenuRol mAccesos = new MenuRol();

        public ActionResult Index()
        {
            if (SessionHelper.GetUser() > 0)
            {
                return RedirectToAction("Index", "Home");
            }
            return View();
        }

        public ActionResult Forgot()
        {
            if (SessionHelper.GetUser() > 0)
            {
                return RedirectToAction("Index", "Home");
            }
            return View();
        }

        // METODO - SIN VISTA
        public JsonResult IniciarSesion(string usuarioWeb, string password)
        {
            var objUsuario = new Usuario();
            var respuesta = new ResponseModel
            {
                respuesta = true,
                redirect = "home/index",
                error = ""
            };

            var query = usuario.obtener(usuarioWeb);
            if (query != null)
            {
                var hashCode = query.VCode;
                var encodingPasswordString = PasswordHelper.EncodePassword(password, hashCode);

                //1. Valido existencia del usuario
                var validaUsuario = usuario.validar(usuarioWeb, encodingPasswordString);
                if (string.IsNullOrEmpty(validaUsuario))
                {
                    //1.1 si existe instancio un objeto "Usuario" y lo guardo en sesion
                    objUsuario = usuario.obtener(usuarioWeb);
                    var objConfiguracion = configuracion.obtener();
                    var objAccesos = mAccesos.ObtenerXRol(objUsuario.Rol_id);
                    Session[Constantes.SESSION_USUARIO] = objUsuario;
                    Session[Constantes.CONFIGURACION] = objConfiguracion;
                    Session[Constantes.ACCESOS] = objAccesos;
                    SessionHelper.AddUserToSession(objUsuario.id.ToString());
                }
                else
                {
                    //1.2 Si no existe redirecciono a la misma página pero agrego un msg de error
                    respuesta.respuesta = false;
                    respuesta.error = validaUsuario;
                    respuesta.redirect = "autentificacion/index";
                    ModelState.AddModelError("errorLogin", validaUsuario.ToString());
                }
            }
            else
            {
                respuesta.respuesta = false;
                respuesta.error = "El usuario no existe";
                respuesta.redirect = "autentificacion/index";
                ModelState.AddModelError("errorLogin", "User no exists");
            }

            if (ModelState.IsValid)
            {
                TempData[Constantes.TEMPDATA_MESSAGE] = "Bienvenido " + objUsuario.nombre + "...";
                respuesta.redirect = "home/index";
            }

            return Json(respuesta);
        }

        public JsonResult forgotPassword(string correo, string user)
        {
            var respuesta = new ResponseModel
            {
                respuesta = true,
                redirect = "/home/index",
                error = ""
            };

            var query = usuario.getIDX(correo, user);
            if (query != null)
            {
                string newPassword = ForgotPasswordHelper.Generate(6);
                var current_user = usuario.obtener((int)query);
                var encodingPasswordString = PasswordHelper.EncodePassword(newPassword, current_user.VCode);
                usuario.ActualizarPassword((int)query, encodingPasswordString);
                string path = Server.MapPath(Url.Content("~/Assets/img/compra.jpg"));

                EmailModel email = new EmailModel();
                email.ToEmail = correo;
                email.Subject = "Recuperación de clave de acceso";
                email.userName = user;
                email.extraValue = newPassword;
                var sendEmail = new EmailHelper().sendEmail(configuracion.obtener(), email, Constantes.EMAIL_RECUPERAR_PASSWORD, path);
            }
            else
            {
                respuesta.respuesta = false;
                respuesta.error = "Los datos ingresados no son correctos";
            }

            return Json(respuesta);
        }

        public ActionResult Logout()
        {
            Session.RemoveAll();
            SessionHelper.DestroyUserSession();
            return Redirect("~/home/index");
        }

    }
}
