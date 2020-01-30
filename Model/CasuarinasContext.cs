namespace Model
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class CasuarinasContext : DbContext
    {
        public CasuarinasContext()
            : base("name=CasuarinasContext")
        {
        }

        public virtual DbSet<Articulo> Articulo { get; set; }
        public virtual DbSet<CentroCosto> CentroCosto { get; set; }
        public virtual DbSet<CentroCostoNivel> CentroCostoNivel { get; set; }
        public virtual DbSet<Configuracion> Configuracion { get; set; }
        public virtual DbSet<Empresa> Empresa { get; set; }
        public virtual DbSet<Menu> Menu { get; set; }
        public virtual DbSet<MenuRol> MenuRol { get; set; }
        public virtual DbSet<MigracionLog> MigracionLog { get; set; }
        public virtual DbSet<Notificacion> Notificacion { get; set; }
        public virtual DbSet<Rol> Rol { get; set; }
        public virtual DbSet<SolDOriginal> SolDOriginal { get; set; }
        public virtual DbSet<Solicitud> Solicitud { get; set; }
        public virtual DbSet<SolicitudEstado> SolicitudEstado { get; set; }
        public virtual DbSet<Usuario> Usuario { get; set; }
        public virtual DbSet<SolicitudDetalle> SolicitudDetalle { get; set; }

        #region changes20200127
        public virtual DbSet<Almacen> Almacen { get; set; }
        public virtual DbSet<Area> Area { get; set; }
        public virtual DbSet<Sede> Sede { get; set; }
        public virtual DbSet<Proyecto> Proyecto { get; set; }
        public virtual DbSet<DimensionCosto> DimensionCosto { get; set; }
        #endregion

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Articulo>()
                .Property(e => e.descripcion)
                .IsUnicode(false);

            modelBuilder.Entity<Articulo>()
                .HasMany(e => e.SolicitudDetalle)
                .WithOptional(e => e.Articulo)
                .HasForeignKey(e => e.Articulo_id);

            modelBuilder.Entity<CentroCosto>()
                .Property(e => e.descripcion)
                .IsUnicode(false);

            modelBuilder.Entity<CentroCosto>()
                .HasMany(e => e.CentroCostoNivel)
                .WithRequired(e => e.CentroCosto)
                .HasForeignKey(e => e.CentroCosto_id)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<CentroCosto>()
                .HasMany(e => e.Usuario)
                .WithMany(e => e.CentrosCosto)
                .Map(m => m.ToTable("UsuarioCentroCosto"));

            modelBuilder.Entity<CentroCostoNivel>()
                .Property(e => e.descripcion)
                .IsUnicode(false);

            modelBuilder.Entity<Empresa>()
                .Property(e => e.descripcion)
                .IsUnicode(false);

            modelBuilder.Entity<Empresa>()
                .HasMany(e => e.CentroCosto)
                .WithRequired(e => e.Empresa)
                .HasForeignKey(e => e.Empresa_id)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Empresa>()
                .HasMany(e => e.Usuario)
                .WithMany(e => e.Empresas)
                .Map(m => m.ToTable("UsuarioEmpresa"));

            modelBuilder.Entity<Menu>()
                .HasMany(e => e.MenuRol)
                .WithRequired(e => e.Menu)
                .HasForeignKey(e => e.Menu_id)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<MenuRol>()
                .Property(e => e.estado)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Rol>()
                .Property(e => e.descripcion)
                .IsUnicode(false);

            modelBuilder.Entity<Rol>()
                .HasMany(e => e.MenuRol)
                .WithRequired(e => e.Rol)
                .HasForeignKey(e => e.Rol_id)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Rol>()
                .HasMany(e => e.Usuario)
                .WithRequired(e => e.Rol)
                .HasForeignKey(e => e.Rol_id)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Solicitud>()
                .Property(e => e.comentarios)
                .IsUnicode(false);

            modelBuilder.Entity<Solicitud>()
                .Property(e => e.tipoSolicitud)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Solicitud>()
                .HasMany(e => e.SolicitudDetalle)
                .WithRequired(e => e.Solicitud)
                .HasForeignKey(e => e.Solicitud_id)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Solicitud>()
                .HasMany(e => e.SolicitudEstado)
                .WithRequired(e => e.Solicitud)
                .HasForeignKey(e => e.Solicitud_id)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<SolicitudEstado>()
                .Property(e => e.accion)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<SolicitudEstado>()
                .Property(e => e.observacion)
                .IsUnicode(false);

            modelBuilder.Entity<Usuario>()
                .Property(e => e.nombre)
                .IsUnicode(false);

            modelBuilder.Entity<Usuario>()
                .Property(e => e.cuentaWeb)
                .IsUnicode(false);

            modelBuilder.Entity<Usuario>()
                .Property(e => e.passWeb)
                .IsUnicode(false);

            modelBuilder.Entity<Usuario>()
                .Property(e => e.correo)
                .IsUnicode(false);

            modelBuilder.Entity<Usuario>()
                .Property(e => e.estado)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.CentroCostoNivel)
                .WithRequired(e => e.Usuario)
                .HasForeignKey(e => e.Usuario_id)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.Solicitud)
                .WithRequired(e => e.Usuario)
                .HasForeignKey(e => e.Usuario_id)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<SolicitudDetalle>()
                .Property(e => e.descripcion)
                .IsUnicode(false);
        }

        public override int SaveChanges()
        {
            Auditar();
            return base.SaveChanges();
        }

        public void Auditar()
        {
            var modifiedEntries = ChangeTracker.Entries().Where(x => x.Entity is IAuditable && 
                (x.State == System.Data.Entity.EntityState.Added || x.State == System.Data.Entity.EntityState.Modified));

            foreach (var entry in modifiedEntries)
            {
                IAuditable entity = entry.Entity as IAuditable;
                if (entity != null)
                {
                    var fecha = DateTime.Now;
                    var usuario = entity.usuario_curr;

                    if (entry.State == EntityState.Added)
                    {
                        entity.Creado = fecha;
                        entity.CreadoPor = usuario;
                    }
                    else
                    {
                        base.Entry(entity).Property(x => x.Creado).IsModified = false;
                        base.Entry(entity).Property(x => x.CreadoPor).IsModified = false;
                    }

                    entity.Actualizado = fecha;
                    entity.ActualizadoPor = usuario;
                }
            }
        }
    }
}
