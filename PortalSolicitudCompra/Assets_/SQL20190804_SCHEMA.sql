CREATE DATABASE COM_SOLICITUD_COMPRA
GO

USE [COM_SOLICITUD_COMPRA]
GO
/****** Object:  Table [dbo].[Articulo]    Script Date: 07/08/2017 03:03:07 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Articulo](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](300) NOT NULL,
	[codigo_sap] [nvarchar](60) NULL,
	[Empresa_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[CentroCosto]    Script Date: 07/08/2017 03:03:07 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CentroCosto](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Empresa_id] [int] NOT NULL,
	[descripcion] [varchar](300) NOT NULL,
	[codigoSap] [nchar](10) NULL,
	[estado] [char](1) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[CentroCostoNivel]    Script Date: 07/08/2017 03:03:07 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CentroCostoNivel](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Usuario_id] [int] NOT NULL,
	[CentroCosto_id] [int] NOT NULL,
	[descripcion] [varchar](200) NOT NULL,
	[prioridad] [int] NOT NULL,
	[temporal_id] [varchar](300) NULL,
	[Usuario_Nombre] [nvarchar](300) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Configuracion]    Script Date: 07/08/2017 03:03:07 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Configuracion](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre_empresa] [nvarchar](300) NOT NULL,
	[logo_url] [nvarchar](300) NULL,
	[servidor_correo] [nvarchar](300) NULL,
	[puerto] [int] NULL,
	[usuario] [nvarchar](100) NULL,
	[password] [nvarchar](100) NULL,
	[enviar_correos] [bit] NOT NULL,
	[push_notification] [bit] NOT NULL,
	[url_sl] [nvarchar](150) NULL,
	[url_xsjs] [nvarchar](150) NULL,
	[validacion_msj] [nvarchar](max) NULL,
	[correcto] [bit] NULL,
 CONSTRAINT [PK_Configuracion] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Empresa]    Script Date: 07/08/2017 03:03:07 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Empresa](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](300) NOT NULL,
	[db_name] [nvarchar](300) NULL,
	[usuario] [nvarchar](100) NULL,
	[password] [nvarchar](100) NULL,
	[estado] [char](1) NULL,
	[validacion_sl] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Menu]    Script Date: 07/08/2017 03:03:07 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Menu](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [nvarchar](200) NULL,
	[actionName] [nvarchar](200) NULL,
	[controllerName] [nvarchar](200) NULL,
	[iconName] [nvarchar](200) NULL,
	[orden] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[MenuRol]    Script Date: 07/08/2017 03:03:07 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[MenuRol](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[accesa] [bit] NOT NULL,
	[registra] [bit] NOT NULL,
	[modifica] [bit] NOT NULL,
	[consulta] [bit] NOT NULL,
	[elimina] [bit] NOT NULL,
	[imprime] [bit] NOT NULL,
	[exporta] [bit] NOT NULL,
	[fecha_registro] [datetime] NOT NULL,
	[estado] [char](1) NOT NULL,
	[Menu_id] [int] NOT NULL,
	[Rol_id] [int] NOT NULL,
 CONSTRAINT [PK_MenuRol] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[MigracionLog]    Script Date: 07/08/2017 03:03:07 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[MigracionLog](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[DocumentoId] [int] NOT NULL,
	[Estado_actual] [char](1) NOT NULL,
	[Mensage_error] [nvarchar](max) NULL,
	[Migracion_estado] [char](1) NOT NULL,
	[FechaRegistro] [datetime] NOT NULL,
	[FechaActualizacion] [datetime] NULL,
 CONSTRAINT [PK_MigracionLog] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Notificacion]    Script Date: 07/08/2017 03:03:07 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Notificacion](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Usuario_id] [int] NOT NULL,
	[referencia] [int] NOT NULL,
	[pendiente] [bit] NOT NULL,
	[visto] [bit] NOT NULL,
	[leido] [bit] NOT NULL,
	[descripcion] [nvarchar](250) NOT NULL,
	[from_user_id] [int] NOT NULL,
	[from_user_nom] [nvarchar](200) NOT NULL,
	[fecha_registro] [datetime] NOT NULL,
	[controller] [varchar](50) NOT NULL,
	[action] [varchar](50) NOT NULL,
	[tipo] [nvarchar](50) NULL,
 CONSTRAINT [PK_Notificacion] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Rol]    Script Date: 07/08/2017 03:03:07 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Rol](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](300) NOT NULL,
	[fechaRegistro] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[SolDOriginal]    Script Date: 07/08/2017 03:03:07 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[SolDOriginal](
	[Solicitud_id] [int] NOT NULL,
	[Articulo_id] [int] NULL,
	[descripcion] [varchar](250) NULL,
	[cantidad] [int] NOT NULL,
	[fechaNecesaria] [datetime] NULL,
	[Articulo_codigosap] [nvarchar](250) NULL,
	[comentario] [nvarchar](max) NULL,
	[id] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_SolDOriginal] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Solicitud]    Script Date: 07/08/2017 03:03:07 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Solicitud](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Usuario_id] [int] NOT NULL,
	[centroCosto] [int] NOT NULL,
	[empresa] [int] NOT NULL,
	[fechaRegistro] [datetime] NOT NULL,
	[fechaVencimiento] [datetime] NULL,
	[fechaNecesaria] [datetime] NOT NULL,
	[comentarios] [varchar](250) NULL,
	[tipoSolicitud] [char](1) NULL,
	[Usuario_correo] [nvarchar](250) NULL,
	[Usuario_nombre] [nvarchar](200) NULL,
	[estado] [char](1) NULL,
	[codigo_sap] [int] NULL,
	[numero_sap] [int] NULL,
	[occodigo_sap] [int] NULL,
	[CreadoPor] [int] NULL,
	[Creado] [datetime] NULL,
	[ActualizadoPor] [int] NULL,
	[Actualizado] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[SolicitudDetalle]    Script Date: 07/08/2017 03:03:07 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[SolicitudDetalle](
	[Solicitud_id] [int] NOT NULL,
	[Articulo_id] [int] NULL,
	[descripcion] [varchar](250) NULL,
	[cantidad] [int] NOT NULL,
	[fechaNecesaria] [datetime] NULL,
	[Articulo_codigosap] [nvarchar](250) NULL,
	[temporal_id] [nvarchar](250) NULL,
	[comentario] [nvarchar](max) NULL,
	[id] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_SolicitudDetalle] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[SolicitudEstado]    Script Date: 07/08/2017 03:03:07 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[SolicitudEstado](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Solicitud_id] [int] NOT NULL,
	[Usuario] [int] NOT NULL,
	[accion] [char](1) NULL,
	[fechaRegistro] [datetime] NOT NULL,
	[activo] [bit] NOT NULL,
	[observacion] [varchar](300) NULL,
	[fechaActualizacion] [datetime] NULL,
	[prioridad] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 07/08/2017 03:03:07 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Usuario](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Rol_id] [int] NOT NULL,
	[nombre] [varchar](300) NOT NULL,
	[cuentaWeb] [varchar](100) NOT NULL,
	[passWeb] [varchar](100) NOT NULL,
	[correo] [varchar](100) NOT NULL,
	[estado] [char](1) NOT NULL,
	[fechaRegistro] [datetime] NOT NULL,
	[codigo_sap] [int] NULL,
	[VCode] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[UsuarioCentroCosto]    Script Date: 07/08/2017 03:03:07 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsuarioCentroCosto](
	[Usuario_id] [int] NOT NULL,
	[CentroCosto_id] [int] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[UsuarioEmpresa]    Script Date: 07/08/2017 03:03:07 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsuarioEmpresa](
	[Usuario_id] [int] NOT NULL,
	[Empresa_id] [int] NOT NULL
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[CentroCosto]  WITH CHECK ADD FOREIGN KEY([Empresa_id])
REFERENCES [dbo].[Empresa] ([id])
GO
ALTER TABLE [dbo].[CentroCostoNivel]  WITH CHECK ADD  CONSTRAINT [FK__CentroCos__Centr__21B6055D] FOREIGN KEY([CentroCosto_id])
REFERENCES [dbo].[CentroCosto] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CentroCostoNivel] CHECK CONSTRAINT [FK__CentroCos__Centr__21B6055D]
GO
ALTER TABLE [dbo].[CentroCostoNivel]  WITH CHECK ADD  CONSTRAINT [FK__CentroCos__Usuar__22AA2996] FOREIGN KEY([Usuario_id])
REFERENCES [dbo].[Usuario] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CentroCostoNivel] CHECK CONSTRAINT [FK__CentroCos__Usuar__22AA2996]
GO
ALTER TABLE [dbo].[MenuRol]  WITH CHECK ADD  CONSTRAINT [FK_MenuRol_Menu] FOREIGN KEY([Menu_id])
REFERENCES [dbo].[Menu] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[MenuRol] CHECK CONSTRAINT [FK_MenuRol_Menu]
GO
ALTER TABLE [dbo].[MenuRol]  WITH CHECK ADD  CONSTRAINT [FK_MenuRol_Rol] FOREIGN KEY([Rol_id])
REFERENCES [dbo].[Rol] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[MenuRol] CHECK CONSTRAINT [FK_MenuRol_Rol]
GO
ALTER TABLE [dbo].[Solicitud]  WITH CHECK ADD FOREIGN KEY([Usuario_id])
REFERENCES [dbo].[Usuario] ([id])
GO
ALTER TABLE [dbo].[SolicitudDetalle]  WITH CHECK ADD FOREIGN KEY([Articulo_id])
REFERENCES [dbo].[Articulo] ([id])
GO
ALTER TABLE [dbo].[SolicitudDetalle]  WITH CHECK ADD FOREIGN KEY([Solicitud_id])
REFERENCES [dbo].[Solicitud] ([id])
GO
ALTER TABLE [dbo].[SolicitudEstado]  WITH CHECK ADD FOREIGN KEY([Solicitud_id])
REFERENCES [dbo].[Solicitud] ([id])
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD FOREIGN KEY([Rol_id])
REFERENCES [dbo].[Rol] ([id])
GO
ALTER TABLE [dbo].[UsuarioCentroCosto]  WITH CHECK ADD  CONSTRAINT [FK__UsuarioCe__Centr__1FCDBCEB] FOREIGN KEY([CentroCosto_id])
REFERENCES [dbo].[CentroCosto] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UsuarioCentroCosto] CHECK CONSTRAINT [FK__UsuarioCe__Centr__1FCDBCEB]
GO
ALTER TABLE [dbo].[UsuarioCentroCosto]  WITH CHECK ADD  CONSTRAINT [FK__UsuarioCe__Usuar__1ED998B2] FOREIGN KEY([Usuario_id])
REFERENCES [dbo].[Usuario] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UsuarioCentroCosto] CHECK CONSTRAINT [FK__UsuarioCe__Usuar__1ED998B2]
GO
ALTER TABLE [dbo].[UsuarioEmpresa]  WITH CHECK ADD FOREIGN KEY([Empresa_id])
REFERENCES [dbo].[Empresa] ([id])
GO
ALTER TABLE [dbo].[UsuarioEmpresa]  WITH CHECK ADD  CONSTRAINT [FK__UsuarioEm__Usuar__21B6055D] FOREIGN KEY([Usuario_id])
REFERENCES [dbo].[Usuario] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UsuarioEmpresa] CHECK CONSTRAINT [FK__UsuarioEm__Usuar__21B6055D]
GO
