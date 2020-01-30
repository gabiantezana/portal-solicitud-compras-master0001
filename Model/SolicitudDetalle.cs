namespace Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("SolicitudDetalle")]
    public partial class SolicitudDetalle
    {
        public int Solicitud_id { get; set; }

        public int? Articulo_id { get; set; }

        [StringLength(250)]
        public string descripcion { get; set; }

        public int cantidad { get; set; }

        public DateTime? fechaNecesaria { get; set; }

        [StringLength(250)]
        public string Articulo_codigosap { get; set; }

        [StringLength(250)]
        public string temporal_id { get; set; }

        public string comentario { get; set; }

        public int id { get; set; }

        #region changes20200127
        
        public string unidadMedida { get; set; }


        public int? almacenId { get; set; }
        [NotMapped]
        public string almacenNombre { get; set; }
        public virtual Almacen Almacen { get; set; }

        public int? proyectoId { get; set; }
        [NotMapped]
        public string proyectoNombre { get; set; }
        public virtual Proyecto Proyecto { get; set; }


        public int? sedeId { get; set; }
        [NotMapped]
        public string sedeNombre { get; set; }
        public virtual Sede Sede { get; set; }


        public int? centroCostoId { get; set; }
        [NotMapped]
        public string centroCostoNombre { get; set; }
        public virtual CentroCosto CentroCosto { get; set; }


        public int? dimensionCostoId { get; set; }
        [NotMapped]
        public string dimensionCostoNombre { get; set; }
        public virtual DimensionCosto DimensionCosto { get; set; }
        
        #endregion

        public virtual Articulo Articulo { get; set; }
        public virtual Solicitud Solicitud { get; set; }

    }
}
