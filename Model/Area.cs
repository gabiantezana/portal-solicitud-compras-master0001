namespace Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    [Table("Area")]
    public partial class Area
    {
        public Area()
        {
        }

        public int areaId { get; set; }


        [Required]
        [StringLength(300)]
        public string descripcion { get; set; }


        public string nombre { get; set; }

        [Required]
        public string codigoSap { get; set; }

        [StringLength(1)]
        public string estado { get; set; }

        public ICollection<Solicitud> Solicitud { get; set; }

        //Métodos
        public List<Area> listar()
        {
            var lista = new List<Area>();
            try
            {
                using (var db = new CasuarinasContext())
                {
                    lista = db.Area.ToList();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

            return lista;
        }

        public Area obtener(int id)
        {
            var obj = new Area();
            try
            {
                using (var context = new CasuarinasContext())
                {
                    obj = context.Area
                                     .Where(u => u.areaId == id)
                                     .Single();
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
