using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Casuarinas.Controllers
{
    public class DimensionCostoController : Controller
    {
        public JsonResult GetList()
        {
            var list = new DimensionCosto().listar().Select(x => new SelectListItem
            {
                Text = x.descripcion,
                Value = x.id.ToString()
            });

            return Json(list);
        }
    }
}