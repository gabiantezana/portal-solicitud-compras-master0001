namespace Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    [Table("Sede")]
   public partial class Sede
    {
        public Sede()
        {
        }

        public int sedeId { get; set; }


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
        public List<Sede> listar()
        {
            var lista = new List<Sede>();
            try
            {
                using (var db = new CasuarinasContext())
                {
                    lista = db.Sede.ToList();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

            return lista;
        }

       
      
        public Sede obtener(int? id)
        {
            var obj = new Sede();
            try
            {
                using (var context = new CasuarinasContext())
                {
                    obj = context.Sede
                                     .Where(u => u.sedeId == id)
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
