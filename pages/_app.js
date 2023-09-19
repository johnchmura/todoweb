import React from 'react';
import Navbar from '@/components/Navbar';
import CanvasApp from '@/components/TodoList';
import index from '@/pages/index'
import { useRouter } from 'next/router';

function App() {
  
  const router = useRouter();

  return (
    <>
      <Navbar />
      {router.pathname === "/" && <CanvasApp/>}
    </>
  );
}

export default App;