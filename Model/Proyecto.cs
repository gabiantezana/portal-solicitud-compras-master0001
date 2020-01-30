namespace Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    [Table("Proyecto")]
    public partial class Proyecto
    {
        public Proyecto()
        {
        }

        public int proyectoId { get; set; }


        [Required]
        [StringLength(300)]
        public string descripcion { get; set; }


        public string nombre { get; set; }

        [Required]
        public string codigoSap { get; set; }

        [StringLength(1)]
        public string estado { get; set; }

        public ICollection<SolicitudDetalle> SolicitudDetalle { get; set; }

        //Métodos
        public List<Proyecto> listar()
        {
            var lista = new List<Proyecto>();
            try
            {
                using (var db = new CasuarinasContext())
                {
                    lista = db.Proyecto.ToList();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

            return lista;
        }

       
      
        public Proyecto obtener(int? id)
        {
            var obj = new Proyecto();
            try
            {
                using (var context = new CasuarinasContext())
                {
                    obj = context.Proyecto
                                     .Where(u => u.proyectoId == id)
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
