"use client";

import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Table, Tag, Tooltip } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DataType {
  id: number;
  username: string;
  email: string;
  emailVerified: boolean;
  role: string[];
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
  search?: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "No",
    dataIndex: "id",
    key: "id",
    render: (_, __, index) => index + 1,
    width: 50,
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Email Terverifikasi",
    dataIndex: "emailVerified",
    key: "emailVerified",
    render: (_, record) => {
      const { emailVerified } = record;
      const color = emailVerified ? "green" : "red";
      const text = emailVerified ? "Terverifikasi" : "Belum Terverifikasi";
      return <Tag color={color}>{text}</Tag>;
    },
    sorter: true,
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (_, { role }) => (
      <>
        {role.map((r) => {
          return <Tag key={r}>{r.toUpperCase()}</Tag>;
        })}
      </>
    ),
    filters: [
      { text: "Admin", value: "admin" },
      { text: "Staff", value: "staff" },
    ],
  },
  {
    title: "Aksi",
    key: "aksi",
    render: (_, record) => (
      <div className="flex space-x-2">
        <Tooltip placement="top" title="Ubah">
          <Link href={`/admin/user/${record.id}`}>
            <Button icon={<EditOutlined />} />
          </Link>
        </Tooltip>
        <Tooltip placement="top" title="Hapus">
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => console.log(record.id)}
          />
        </Tooltip>
      </div>
    ),
    width: 100,
  },
];

// const data: DataType[] = [
//   {
//     id: 1,
//     username: "admin",
//     email: "admin@admin.com",
//     emailVerified: true,
//     role: ["admin"],
//   },
//   {
//     id: 2,
//     username: "staff-admin",
//     email: "staff@admin.com",
//     emailVerified: true,
//     role: ["admin", "staff"],
//   },
//   {
//     id: 4,
//     username: "staff",
//     email: "aja@staff.com",
//     emailVerified: false,
//     role: ["staff"],
//   },
// ];

const getUsers = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

export default function UserListPage() {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = () => {
    setLoading(true);
    const users = getUsers(tableParams);
    console.log(users);
    setTimeout(() => {
      setData([
        {
          id: 1,
          username: "admin",
          email: "admin@admin.com",
          emailVerified: true,
          role: ["admin"],
        },
        {
          id: 2,
          username: "staff-admin",
          email: "staff@admin.com",
          emailVerified: true,
          role: ["admin", "staff"],
        },
        {
          id: 4,
          username: "staff",
          email: "aja@staff.com",
          emailVerified: false,
          role: ["staff"],
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<DataType>
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  return (
    <section className="grid bg-white p-4 rounded-xl shadow space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold leading-3">Daftar User</h2>
        <div className="flex space-x-2">
          <Button icon={<PlusOutlined />} size="large" type="primary">
            Tambah
          </Button>
        </div>
      </div>
      <Divider />
      <div className="flex">
        {/* <Table
          columns={columns}
          dataSource={data}
          style={{
            width: "100%",
          }}
        /> */}
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={data}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
          style={{
            width: "100%",
          }}
        />
      </div>
    </section>
  );
}
