"use client";
import "./globals.scss";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "./themes/theme";
import { CssBaseline } from "@mui/material";
import Header from "./components/Header";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [isDark, setIsDark] = useState(false);

  const toggleTheme = (): void => {
    setIsDark(!isDark)
  }

  return (
    <html lang="en">
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <CssBaseline/>
      <body>
        <Header isDark={isDark} onToggleTheme={toggleTheme}/>
        {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
