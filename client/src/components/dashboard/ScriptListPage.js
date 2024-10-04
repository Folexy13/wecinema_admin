import React, { useContext } from 'react';
import DashboardHOC from './DashboardHOC';
import Table from './table/ScriptTable';
import { UserContext } from '../../context/userState/userContext';
import { Link } from 'react-router-dom';
import CustomLoader from '../common/CustomLoader';

const index = '2';
function VideoListPage() {
  const { scripts, loading } = useContext(UserContext).state;

  return (
    <div>
      {scripts && (
        <Link
          to="/dashboard/add-new-script"
          className="btn btn-primary float-right cursor-pointer mb-2 "
        >
          Add new Script
        </Link>
      )}
      {!loading && scripts ? (
        <Table data={scripts} />
      ) : (
        <CustomLoader text={'Getting script from DB! Hold on gee...'} />
      )}
    </div>
  );
}

export default DashboardHOC(VideoListPage, index);
