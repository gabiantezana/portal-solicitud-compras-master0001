namespace Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;
    using System.Data.Entity.Spatial;
    using System.Data.SqlClient;
    using System.Linq;

    [Table("Almacen")]
    public partial class Almacen
    {
        public int almacenId { get; set; }

        public string descripcion { get; set; }

        [Required]
        public string nombre { get; set; }

        [Required]
        public string codigoSap { get; set; }
        public ICollection<SolicitudDetalle> SolicitudDetalle { get; set; }

        //Métodos
        public List<Almacen> listar()
        {
            var lista = new List<Almacen>();
            try
            {
                using (var db = new CasuarinasContext())
                {
                    lista = db.Almacen.ToList();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

            return lista;
        }
      
        public Almacen obtener(int? _id)
        {
            var obj = new Almacen();
            try
            {
                using (var context = new CasuarinasContext())
                {
                    obj = context.Almacen
                                     .Where(u => u.almacenId == _id)
                                     .FirstOrDefault();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

            return obj;
        }
       
    }
}
