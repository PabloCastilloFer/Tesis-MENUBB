import nodemailer from "nodemailer";
import { emailConfig } from "../config/configEnv.js";

export const sendEmail = async (to, subject, text, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // Host de Gmail
            port: 587, // Puerto SMTP para STARTTLS
            secure: false, // Utiliza false para conexiones STARTTLS
            auth: {
                user: emailConfig.user,
                pass: emailConfig.pass,
            },
        });

    const mailOptions = {
        from: `"MENUBB" <${emailConfig.user}>`,
        to,
        subject,
        text,
        html,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
    } catch (error) {
    console.error("Error enviando el correo:", error.message);
    throw new Error("No se pudo enviar el correo: " + error.message);
    }
};