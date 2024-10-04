import React, { useContext } from 'react';
import DashboardHOC from './DashboardHOC';
import Table from './table/VideoTable';
import { UserContext } from '../../context/userState/userContext';
import { Link } from 'react-router-dom';
import CustomLoader from '../common/CustomLoader';

const index = '2';
function VideoListPage() {
  const { videos, loading } = useContext(UserContext).state;

  return (
    <div>
      {videos && (
        <Link
          to="/dashboard/add-new-video"
          className="btn btn-primary float-right cursor-pointer mb-2 "
        >
          Add new Video
        </Link>
      )}
      {!loading && videos ? (
        <Table data={videos} />
      ) : (
        <CustomLoader text={'Getting videos from DB! Hold on gee...'} />
      )}
    </div>
  );
}

export default DashboardHOC(VideoListPage, index);
