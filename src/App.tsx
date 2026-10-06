import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page from './app/page';
import ProductPage from './app/products/[slug]/page';
import ProductsListPage from './app/products/page';
import CategoryPage from './app/category/[slug]/page';
import ArticlesPage from './app/articles/page';
import ContactPage from './app/contact/page';
import { FloatingQuoteButton } from './components/ui/FloatingQuoteButton';
import { ScrollToTop } from './components/ui/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/products" element={<ProductsListPage />} />
        <Route path="/products/:slug" element={<ProductPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Page />} />
      </Routes>
      <FloatingQuoteButton />
    </BrowserRouter>
  );
}
