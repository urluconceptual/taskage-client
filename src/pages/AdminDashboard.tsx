import { Card, Col, Row, Select, Spin, Statistic, Table } from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { UserActivityLog, adminStore } from "../stores/AdminStore";

const { Option } = Select;

const AdminDashboard: React.FC = observer(() => {
  useEffect(() => {
    adminStore.getUserActivity();
  }, []);

  const [filterLevel, setFilterLevel] = React.useState<string | undefined>(
    undefined
  );

  const handleLevelChange = (value: string) => {
    setFilterLevel(value);
  };

  const filteredActivities = filterLevel
    ? adminStore.userActivities.filter(
        (activity) => activity.level === filterLevel
      )
    : adminStore.userActivities;

  const userActivityColumns = [
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
    },
  ];

  const renderTitle = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Admin Dashboard</h2>
      </div>
    );
  };

  return (
    <div
      style={{
        width: 1200,
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card title={renderTitle()} style={{ width: "100%" }}>
        {adminStore.loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <Spin size="large" />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "right",
              marginBottom: 20,
            }}
          >
            <Row
              gutter={16}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Total Activities"
                    value={adminStore.totalActivities}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic title="Info Logs" value={adminStore.infoCount} />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Error Logs"
                    value={adminStore.errorCount}
                    valueStyle={{ color: "#cf1322" }}
                  />
                </Card>
              </Col>
            </Row>
            <Card
              title="User Activities"
              bordered={false}
              style={{ width: "100%" }}
            >
              <Row gutter={16}>
                <Col span={8}>
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Filter by Level"
                    onChange={handleLevelChange}
                    allowClear
                  >
                    <Option value="INFO">INFO</Option>
                    <Option value="ERROR">ERROR</Option>
                  </Select>
                </Col>
              </Row>
              <Table
                pagination={{
                  pageSize: 7,
                  showSizeChanger: false,
                }}
                dataSource={filteredActivities}
                columns={userActivityColumns}
                rowKey={(record) =>
                  record.timestamp +
                  record.userId +
                  record.level +
                  record.activity +
                  Math.random()
                }
                style={{ marginTop: "20px" }}
              />
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
});

export default AdminDashboard;
