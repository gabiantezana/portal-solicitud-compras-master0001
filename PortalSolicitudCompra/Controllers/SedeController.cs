using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Casuarinas.Controllers
{
    public class SedeController : Controller
    {
        public JsonResult GetList()
        {
            var list = new Sede().listar().Select(x => new SelectListItem
            {
                Text = x.descripcion,
                Value = x.sedeId.ToString()
            });

            return Json(list);
        }
    }
}