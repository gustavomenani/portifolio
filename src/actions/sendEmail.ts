"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: { name: string; email: string; message: string }) {
  const { name, email, message } = formData;

  try {
    const data = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", // Endereço do Resend
      to: ["menanigustavo@gmail.com"], // Seu e-mail (precisa ser o mesmo da conta Resend se não tiver domínio próprio)
      replyTo: email, // Faz com que, ao clicar em "Responder" no seu Gmail, vá para o e-mail do cliente!
      subject: `Novo Contato do Portfólio de: ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
    });

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
