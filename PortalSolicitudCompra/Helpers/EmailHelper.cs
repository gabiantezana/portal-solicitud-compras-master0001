using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Mail;
using Model;
using System.Web.Mvc;
using System.Threading.Tasks;
using System.Net;
using System.Net.Mime;

namespace Casuarinas.Helpers
{
    public class EmailHelper
    {

        public string sendEmail(Configuracion config, EmailModel email, string TYPE, string path)
        {
            var result = string.Empty;

            try
            {
                using (MailMessage mail = new MailMessage(new MailAddress(config.usuario, "PORTAL DE COMPRAS"), new MailAddress(email.ToEmail)))
                {
                    //string filePath = F:\Seidor\Clientes\Casuarinas\Web Requerimientos\Casuarinas\Casuarinas\Assets\img\logoCasuarinas.jpg;
                    mail.Subject = email.Subject;
                    if (TYPE.Equals(Constantes.EMAIL_RECUPERAR_PASSWORD))
                        mail.AlternateViews.Add(getEmbeddedImagePassword(email.userName, email.extraValue, path));
                    else
                        mail.AlternateViews.Add(getEmbeddedImage(email.userName, email.solID, TYPE, path));
                    
                    //mail.Body = TYPE.Equals(Constantes.EMAIL_RECUPERAR_PASSWORD) ? buildBodyForgotPassword(email.userName, email.extraValue) : buildBodyHtml(email.userName, email.solID, TYPE);
                    mail.Priority = MailPriority.High;
                    mail.IsBodyHtml = true;

                    /*AlternateView htmlView = AlternateView.CreateAlternateViewFromString(mail.Body, null, MediaTypeNames.Text.Html);
                    LinkedResource inLine = new LinkedResource("logo.jpg", MediaTypeNames.Image.Jpeg);
                    inLine.ContentId = Guid.NewGuid().ToString();
                    htmlView.LinkedResources.Add(inLine); */
                    //Attachment att = new Attachment();

                    using (SmtpClient smtp = new SmtpClient())
                    {
                        smtp.Port = config.puerto;
                        smtp.Host = config.servidor_correo;
                        smtp.EnableSsl = true;
                        smtp.UseDefaultCredentials = false;
                        smtp.Credentials = new NetworkCredential(config.usuario, config.password);
                        smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                        smtp.Send(mail);
                    }
                }
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }

            return result;
        }

        private AlternateView getEmbeddedImage(string userName, int solID, string type,String filePath)
        {
            LinkedResource res = new LinkedResource(filePath);
            res.ContentId = Guid.NewGuid().ToString();
            string body = ""; 
            body += "<h1 style=\"color: #5e9ca0;\">Portal de solicitud de compras</h1>";
            body += "<h2 style=\"color: #2e6c80;\">Tiene una nueva notificaci&oacute;n:</h2>";

            if(type.Equals(Constantes.EMAIL_NUEVO_REGISTRO))
                body += "<p>El usuario  <b>" + userName + "</b> acaba de registrar una solicitud de requerimiento con identificador  <b>" + solID + "</b>. ";
            else if(type.Equals(Constantes.EMAIL_SOLICITUD_PENDIENTE))
                body += "<p>Tiene una solicitud de requerimiento pendiente por aprobar con identificador  <b>" + solID + "</b>. ";
            else if(type.Equals(Constantes.EMAIL_SOLICITUD_ACTUALIZADA))
                body += "<p>Su solicitud con identificador  <b>" + solID + "</b> tiene una nueva actualización de estado. ";

            body += "Ingrese con su usuario y contrase&ntilde;a para poder validarla. <br />";

            if(type.Equals(Constantes.EMAIL_NUEVO_REGISTRO) || type.Equals(Constantes.EMAIL_SOLICITUD_PENDIENTE))
                body += "Cuando la apruebe o rechace se le notificar&aacute; a las personas correspondientes.&nbsp;</p>";
            
            body += "<p>Saludos cordiales.</p> <br />";
            body += @"<img src='cid:" + res.ContentId + @"'/>";
            AlternateView alternateView = AlternateView.CreateAlternateViewFromString(body, null, MediaTypeNames.Text.Html);
            alternateView.LinkedResources.Add(res);
            return alternateView;
        }

        private AlternateView getEmbeddedImagePassword(string userName, string newPassword, String filePath)
        {
            LinkedResource res = new LinkedResource(filePath);
            res.ContentId = Guid.NewGuid().ToString();
            string body = "";
            body += "<h1 style=\"color: #5e9ca0;\">Portal de solicitud de compras</h1>";
            body += "<h2 style=\"color: #2e6c80;\">Se ha reestablecido su contraseña</h2>";
            body += "<p>Se ha generado una nueva clave de acceso a su cuenta <b>" + userName + "</b>.</br>";
            body += "Le recomendamos cambiarla por razones de seguridad. <br />";
            body += "Su nueva clave de acceso: " + newPassword + " <br />";

            body += "<p>Saludos cordiales.</p>";
            body += @"<img src='cid:" + res.ContentId + @"'/>";


            AlternateView alternateView = AlternateView.CreateAlternateViewFromString(body, null, MediaTypeNames.Text.Html);
            alternateView.LinkedResources.Add(res);
            return alternateView;
        }

        public string buildBodyHtml(string userName, int solID, string type)
        {
            var body = string.Empty;

            body += "<h1 style=\"color: #5e9ca0;\">Web Requerimientos</h1>";
            body += "<h2 style=\"color: #2e6c80;\">Tiene una nueva notificaci&oacute;n:</h2>";

            if(type.Equals(Constantes.EMAIL_NUEVO_REGISTRO))
                body += "<p>El usuario  <b>" + userName + "</b> acaba de registrar una solicitud de requerimiento con identificador  <b>" + solID + "</b>. ";
            else if(type.Equals(Constantes.EMAIL_SOLICITUD_PENDIENTE))
                body += "<p>Tiene una solicitud de requerimiento pendiente por aprobar con identificador  <b>" + solID + "</b>. ";
            else if(type.Equals(Constantes.EMAIL_SOLICITUD_ACTUALIZADA))
                body += "<p>Su solicitud con identificador  <b>" + solID + "</b> tiene una nueva actualización de estado. ";

            body += "Ingrese con su usuario y contrase&ntilde;a para poder validarla. <br />";

            if(type.Equals(Constantes.EMAIL_NUEVO_REGISTRO) || type.Equals(Constantes.EMAIL_SOLICITUD_PENDIENTE))
                body += "Cuando la apruebe o rechace se le notificar&aacute; a las personas correspondientes.&nbsp;</p>";
            
            body += "<p>Saludos cordiales.</p>";
            body += "<img style=\"float: right;\" src=\"https://drive.google.com/file/d/1UN-SuL7Gorat95L71zmKefu0Uc1kebkd/view?usp=sharing\"  width=\"180\" />";

            return body;
        }

        public string buildBodyForgotPassword(string userName, string newPassword)
        {
            string body = string.Empty;

            body += "<h1 style=\"color: #5e9ca0;\">Web Requerimientos</h1>";
            body += "<h2 style=\"color: #2e6c80;\">Se ha reestablecido su contraseña</h2>";
            body += "<p>Se ha generado una nueva clave de acceso a su cuenta <b>" + userName + "</b>.</br>";
            body += "Le recomendamos cambiarla por razones de seguridad. <br />";
            body += "Su nueva clave de acceso: "+newPassword+" <br />";

            body += "<p>Saludos cordiales.</p>";
            body += "<img style=\"float: right;\" src=\"https://drive.google.com/file/d/1UN-SuL7Gorat95L71zmKefu0Uc1kebkd/view?usp=sharing\"  width=\"180\" />";

            return body;
        }
    }
}