import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: import("next").Metadata = {
  title: "Gustavo Menani — Desenvolvedor Full Stack",
  description: "Desenvolvedor full-stack especializado em .NET, React e Next.js. Transformo processos manuais e ineficientes em sistemas fluidos e lucrativos.",
  authors: [{ name: "Gustavo Menani" }],
  creator: "Gustavo Menani",
  keywords: ["Desenvolvedor Full Stack", "Web Developer", "Programador", "React", "Next.js", ".NET", "C#", "Frontend", "Backend", "Engenharia de Software"],
  openGraph: {
    title: "Gustavo Menani — Dev Full Stack",
    description: "Desenvolvedor full-stack especializado em transformar processos manuais em sistemas fluidos.",
    url: "https://seu-dominio-quando-tiver.com.br", // <-- Lembre-se de mudar isso!
    siteName: "Gustavo Menani",
    locale: "pt_BR",
    type: "website",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem("gm-tweaks");
                if (saved) {
                  const tweaks = JSON.parse(saved);
                  document.documentElement.setAttribute("data-theme", tweaks.theme || 'light');
                  document.documentElement.style.setProperty("--accent-h", (tweaks.accentH || 32).toString());
                  document.documentElement.style.setProperty("--accent-c", (tweaks.accentC || 0.11).toString());
                  if (tweaks.fontPair === "sans-only") {
                    document.documentElement.style.setProperty("--display-font", "var(--font-inter), system-ui, sans-serif");
                  }
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased font-inter">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}