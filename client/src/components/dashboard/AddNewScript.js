import React, { useContext, useState } from 'react';
import ScriptForm from './form/ScriptForm';
import DashboardHOC from './DashboardHOC';
import { UserContext } from '../../context/userState/userContext';
import axios from 'axios';

function AddNewScript() {
  const { addScript } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    const { user, ...rest } = values;
    const payload = { rest, author: user?._id };
    console.log(payload);
  };

  return (
    <>
      <ScriptForm onFinish={onFinish} loading={loading} />
    </>
  );
}

export default DashboardHOC(AddNewScript);
