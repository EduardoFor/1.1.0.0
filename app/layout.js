import './globals.css';

export const metadata = {
  title: 'Lobisomem: O Apocalipse',
  description: 'Ficha de personagem em Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
