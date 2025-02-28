import {Breadcrumb, theme, Typography, Table, Button, message} from "antd";

import {useCallback, useEffect, useState} from "react";

import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import type {TablePaginationConfig} from "antd";
import {useNavigate} from "react-router-dom";

import {EventListItem, Pagination} from "../../api/api.types";
import {GetEvents} from "../../api/events";

interface TableParams {
  pagination?: TablePaginationConfig;
}

export default function EventList() {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<EventListItem[]>([]);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const {token} = theme.useToken();

  const fetchEvents = useCallback(
    async (
      params: Pagination = {
        page: 1,
        take: 10,
      }
    ) => {
      try {
        setLoading(true);
        const {
          page = tableParams.pagination?.current ?? 1,
          take = tableParams.pagination?.pageSize ?? 10,
        } = params;
        const response = await GetEvents({page, take});

        setEvents(response.data.data);
        setTableParams((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            current: response.data.meta.page,
            pageSize: response.data.meta.take,
            total: response.data.meta.itemCount,
          },
        }));
      } catch (error) {
        console.error(error);
        messageApi.error("無法取得EventList");
      } finally {
        setLoading(false);
      }
    },
    [messageApi, tableParams.pagination]
  );

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleTableChange = (pagination: TableParams["pagination"]) => {
    fetchEvents({
      page: pagination?.current ?? 1,
      take: pagination?.pageSize ?? 10,
    });
  };

  const columns = [
    {
      title: "Cover Image",
      dataIndex: "cover",
      key: "cover",
      render: (cover: {url: string}) =>
        cover ? (
          <img
            src={cover.url}
            alt="Cover Image"
            style={{width: 50, height: 50}}
          />
        ) : (
          "N/A"
        ),
    },
    {title: "Title", dataIndex: "title", key: "title"},
    {title: "Type", dataIndex: "type", key: "type"},
    {title: "Location", dataIndex: "location", key: "location"},
    {title: "Start Time", dataIndex: "startDate", key: "startDate"},
    {
      title: "",
      key: "action",
      render: (_: unknown, record: EventListItem) => (
        <Button
          onClick={() => navigate(`/events/${record.id}`)}
          icon={<EditOutlined />}
        >
          edit
        </Button>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <div className="my-6 mx-4">
        <Breadcrumb
          className="my-4"
          items={[{title: "事件"}, {title: "List"}]}
        />
        <div className="flex w-full justify-between items-center mb-3">
          <Typography.Title level={2}>EventList</Typography.Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate(`/events/create`)}
          >
            CreateEvent
          </Button>
        </div>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
          }}
          className="flex gap-5 flex-wrap justify-around"
        >
          <Table
            className="w-full"
            columns={columns}
            loading={loading}
            dataSource={events}
            pagination={tableParams.pagination}
            onChange={handleTableChange}
            rowKey={(record) => record.id ?? "default-key"}
          />
        </div>
      </div>
    </>
  );
}
