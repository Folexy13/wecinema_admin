import React, { useContext, useState, useEffect } from 'react';
import { Card, Spin } from 'antd';
import { UserContext } from '../../context/userState/userContext';
import UserStats from './UserStats/UserStats';
import { Typography } from 'antd';
import { Doughnut, Line } from 'react-chartjs-2';
import DashboardHOC from './DashboardHOC';
const { Title } = Typography;
const index = '1';
function Dashboard() {
  const { state } = useContext(UserContext);
  const { users, admins, videos, staffs, scripts, usersByMonth, loading } =
    state;
  const [userObj, setuserObj] = useState();
  const [lineData, setLineData] = useState();
  const [doughnutStateData, setdoughnutStateData] = useState();
  const lineStatsData = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'User dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10
      }
    ]
  };

  const DoughnutData = {
    labels: ['Videos', 'Users'],
    datasets: [
      {
        data: [],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1
      }
    ]
  };

  const getAdminsData = () => {
    const uploadedVideos = videos ? videos.length : 0;

    // console.log(state);
    const Users = users ? users.length : 0;
    const userObj = [
      { name: 'Total Scripts', stats: scripts ? scripts.length : 0 },
      { name: 'Total Videos', stats: videos ? videos.length : 0 },
      { name: 'Total Users', stats: users ? users.length : 0 },
      { name: 'Admins', stats: admins ? admins.length : 0 }
    ];
    DoughnutData.datasets[0].data.push(uploadedVideos);
    DoughnutData.datasets[0].data.push(Users);
    setdoughnutStateData(DoughnutData);

    return userObj;
  };

  const arrangeUserStats = () => {
    if (usersByMonth) {
      // usersByMonth.forEach(
      //   (data) => (
      //     lineStatsData.labels.push(data.month),
      //     lineStatsData.datasets[0].data.push(data.count)
      //   )
      // );
      for (let index = 0; index < usersByMonth.length; index++) {
        const data = usersByMonth[index];
        lineStatsData.labels.push(data.month);
        lineStatsData.datasets[0].data.push(data.count);
      }
      setLineData(lineStatsData);
    }
  };

  useEffect(() => {
    // alert(JSON.stringify(students));
    setuserObj(getAdminsData());
  }, [scripts, staffs, videos, users, admins]);

  useEffect(() => {
    arrangeUserStats();
  }, [usersByMonth]);

  return (
    <div className="container">
      <Title>Dashboard</Title>
      {userObj ? <UserStats users={userObj} loading={loading} /> : null}
      <div className="row">
        <div className="col-md-8">
          <Card title="User overtime">
            <Spin spinning={loading}>
              <Line data={lineData} width={100} height={50} />
            </Spin>
          </Card>
        </div>

        <div className="col-md-4 ">
          <Card title="User Vs |Video ">
            {doughnutStateData ? (
              <>
                <Spin spinning={loading}>
                  <Doughnut data={doughnutStateData} width={100} height={115} />
                </Spin>
              </>
            ) : null}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DashboardHOC(Dashboard, index);
