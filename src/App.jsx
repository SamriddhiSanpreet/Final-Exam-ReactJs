import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/Store/Store';
import Authentication from './Components/Authentication';
import ProductForm from './Components/ProductForm';
import { AuthProvider, useAuth } from './Components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './Components/ProductList';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return currentUser ? children : <Navigate to="/" />;
};

const AuthRedirect = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/products" /> : <Authentication />;
};

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AuthRedirect />} />
            <Route
              path="/add-product"
              element={
                <ProtectedRoute>
                  <ProductForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductList />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;
