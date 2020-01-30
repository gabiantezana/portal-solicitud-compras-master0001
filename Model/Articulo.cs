namespace Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    [Table("Articulo")]
    public partial class Articulo
    {
        public Articulo()
        {
            SolicitudDetalle = new List<SolicitudDetalle>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(300)]
        public string descripcion { get; set; }

        [StringLength(60)]
        public string codigo_sap { get; set; }

        public int Empresa_id { get; set; }

        public ICollection<SolicitudDetalle> SolicitudDetalle { get; set; }

        //M�todos
        public List<Articulo> listar()
        {
            var lista = new List<Articulo>();
            try
            {
                using (var db = new CasuarinasContext())
                {
                    lista = db.Articulo.ToList();
                }
            }
            catch (Exception)
            {
                return null;
            }

            return lista;
        }

        public List<Articulo> listarXEmpresa(int id)
        {
            var lista = new List<Articulo>();
            try
            {
                using (var db = new CasuarinasContext())
                {
                    lista = db.Articulo.Where(a => a.Empresa_id == id).ToList();
                }
            }
            catch (Exception ex)
            {
                return null;
            }

            return lista;
        }

        public int obtenerId(string codigoSap, int empresa)
        {
            var result = 0;

            try
            {
                using (var ctx = new CasuarinasContext())
                {
                    result = ctx.Articulo.Where(a => a.codigo_sap.Equals(codigoSap) && 
                        a.Empresa_id == empresa).Single().id;
                }
            }
            catch (Exception)
            {
                result = 0;
            }

            return result;
        }
    }
}
