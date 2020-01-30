using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Casuarinas.Controllers
{
    public class AlmacenController : Controller
    {
        public JsonResult GetList()
        {
            var list = new Almacen().listar().Select(x => new SelectListItem
            {
                Text = x.descripcion,
                Value = x.almacenId.ToString()
            });

            return Json(list);
        }
    }
}