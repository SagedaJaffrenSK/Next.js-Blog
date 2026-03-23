import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, toggleTheme, theme }) {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
