namespace ModelUpdate
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Usuario")]
    public partial class Usuario
    {
        public int id { get; set; }

        public int Rol_id { get; set; }

        [Required]
        [StringLength(300)]
        public string nombre { get; set; }

        [Required]
        [StringLength(100)]
        public string cuentaWeb { get; set; }

        [Required]
        [StringLength(100)]
        public string passWeb { get; set; }

        [Required]
        [StringLength(100)]
        public string correo { get; set; }

        [Required]
        [StringLength(1)]
        public string estado { get; set; }

        public DateTime fechaRegistro { get; set; }

        public int? codigo_sap { get; set; }

        [StringLength(100)]
        public string VCode { get; set; }
    }
}
