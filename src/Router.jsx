import { Routes, Route } from 'react-router-dom';
import BlogPost from './components/pages/BlogPost';
import App from './App';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/blog/:id" element={<BlogPost />} />
    </Routes>
  );
};

export default Router;