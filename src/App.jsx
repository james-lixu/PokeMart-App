import AppRouter from './AppRouter';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './components/Cart/CartContext';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <main>
      <AuthProvider>
        <CartProvider>
          <AppRouter />
        </CartProvider>
      </AuthProvider>

    </main>
  )
}
