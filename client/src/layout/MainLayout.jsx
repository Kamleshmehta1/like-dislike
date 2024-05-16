import { Outlet } from 'react-router-dom';
import Header from '../Component/Header';

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default MainLayout;
