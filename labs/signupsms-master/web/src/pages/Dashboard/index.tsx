import React, { useContext } from 'react';

import { useAuth } from '../../hooks/useAuth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <>
      <h1>Dashboard</h1>
      <button type="button" onClick={() => signOut()}>
        Sair
      </button>
    </>
  );
};

export default Dashboard;
