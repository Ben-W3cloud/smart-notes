import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import NoteDetail from './pages/NoteDetail';
import CreateEditNote from './pages/CreateEditNote';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {/* Dashboard — note listing */}
          <Route path="/" element={<Dashboard />} />

          {/* Create a new note */}
          <Route path="/notes/new" element={<CreateEditNote />} />

          {/* View a single note */}
          <Route path="/notes/:id" element={<NoteDetail />} />

          {/* Edit an existing note */}
          <Route path="/notes/:id/edit" element={<CreateEditNote />} />

          {/* Catch-all — redirect to dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
