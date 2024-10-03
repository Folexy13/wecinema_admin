import React, { useContext } from 'react';
import DashboardHOC from './DashboardHOC';
import AdminTable from './table/AdminTable';
import { UserContext } from '../../context/userState/userContext';
import { Link } from 'react-router-dom';
import CustomLoader from '../common/CustomLoader';

const index = '3';

function AdminListPage() {
  const { admins, loading } = useContext(UserContext).state;

  return (
    <div>
      {/* <Link
        to="/dashboard/add-new-user"
        className="btn btn-primary float-right cursor-pointer mb-2 "
      >
        Add new Admin
      </Link> */}
      {!loading ? (
        <AdminTable data={admins} />
      ) : (
        <CustomLoader text={'Getting admins from DB! Hold on gee...'} />
      )}
    </div>
  );
}

export default DashboardHOC(AdminListPage, index);
