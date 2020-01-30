using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Casuarinas.Controllers
{
    public class ProyectoController: Controller
    {
        public JsonResult GetList()
        {
            var list = new Proyecto().listar().Select(x => new SelectListItem
            {
                Text = x.descripcion,
                Value = x.proyectoId.ToString()
            });

            return Json(list);
        }
    }
}