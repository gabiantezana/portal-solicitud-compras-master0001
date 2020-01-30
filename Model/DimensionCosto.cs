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

    [Table("DimensionCosto")]
    public partial class DimensionCosto
    {
            public DimensionCosto()
            {
            }

            public int id { get; set; }

            public int Empresa_id { get; set; }

            [Required]
            [StringLength(300)]
            public string descripcion { get; set; }

            public string codigoSap { get; set; }

            [StringLength(1)]
            public string estado { get; set; }


            //Métodos
            public List<DimensionCosto> listar(int EmpresaId)
            {
                var lista = new List<DimensionCosto>();
                try
                {
                    using (var db = new CasuarinasContext())
                    {
                        lista = db.DimensionCosto.Where(c => c.Empresa_id == EmpresaId).ToList();
                    }
                }
                catch (Exception e)
                {
                    throw new Exception(e.Message);
                }

                return lista;
            }

            public List<DimensionCosto> listar()
            {
                var lista = new List<DimensionCosto>();
                try
                {
                    using (var db = new CasuarinasContext())
                    {
                        lista = db.DimensionCosto
                                        //.Include("Empresa")
                                        //.Where(c => c.Empresa.estado.Equals("A"))
                                        .ToList();
                    }
                }
                catch (Exception e)
                {
                    throw new Exception(e.Message);
                }

                return lista;
            }

            public List<DimensionCosto> listarXEmpresa(int id)
            {
                var lista = new List<DimensionCosto>();
                try
                {
                    using (var db = new CasuarinasContext())
                    {
                        lista = db.DimensionCosto.Include("Empresa").Where(c => c.Empresa_id == id).ToList();
                    }
                }
                catch (Exception e)
                {
                    throw new Exception(e.Message);
                }

                return lista;
            }

            //Obtener centro de costo por id
            public DimensionCosto obtener(int id)
            {
                var cCosto = new DimensionCosto();
                try
                {
                    using (var context = new CasuarinasContext())
                    {
                        cCosto = context.DimensionCosto
                                         //.Include("Empresa")
                                         //.Include("CentroCostoNivel")
                                         .Where(u => u.id == id)
                                         .FirstOrDefault();
                    }
                }
                catch (Exception e)
                {
                    throw new Exception(e.Message);
                }

                return cCosto;
            }
    }
}


