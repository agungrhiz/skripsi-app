"use client";

import { Role } from "@/lib/role";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { TypedDocumentNode, gql, useMutation } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import {
  Button,
  Divider,
  Input,
  InputRef,
  Modal,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import { FilterConfirmProps } from "antd/es/table/interface";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";

interface DataType {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  role: string;
}

type DataIndex = keyof DataType;

const query: TypedDocumentNode<{
  users: DataType[];
}> = gql`
  query Users {
    users {
      id
      username
      email
      emailVerified
      role
    }
  }
`;

const mutation: TypedDocumentNode<{
  removeUser: DataType;
}> = gql`
  mutation RemoveUser($id: String!) {
    removeUser(id: $id) {
      id
      username
      email
      emailVerified
      role
    }
  }
`;

export const ListUser = () => {
  const [users, setUsers] = useState<DataType[]>([]);
  const { data } = useQuery(query);
  const [removeUser] = useMutation(mutation);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setUsers(data.users);
    }
  }, [data]);

  const showModal = () => {
    setOpen(true);
  };

  const handleRemove = async (id: string) => {
    const { data } = await removeUser({
      variables: {
        id,
      },
    });
    setOpen(false);
    setUsers((prev) => prev.filter((user) => user.id !== data?.removeUser.id));
  };

  const handleCancelRemove = () => {
    setOpen(false);
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "primary" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

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
      ...getColumnSearchProps("username"),
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Email Verified",
      dataIndex: "emailVerified",
      key: "emailVerified",
      render: (_, record) => {
        const { emailVerified } = record;
        const color = emailVerified ? "green" : "red";
        const text = emailVerified ? "Terverifikasi" : "Belum Terverifikasi";
        return <Tag color={color}>{text}</Tag>;
      },
      filters: [
        {
          text: "Terverifikasi",
          value: true,
        },
        {
          text: "Belum Terverifikasi",
          value: false,
        },
      ],
      onFilter: (value, record) => record.emailVerified === value,
      sorter: (a, b) => Number(a.emailVerified) - Number(b.emailVerified),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (_, record) => {
        const { role } = record;
        const color = role === Role.ADMINISTRATOR ? "orange" : "blue";
        return <Tag color={color}>{role}</Tag>;
      },
      filters: [
        {
          text: "Administrator",
          value: Role.ADMINISTRATOR,
        },
        {
          text: "Staff",
          value: Role.STAFF,
        },
      ],
      onFilter: (value, record) => record.role === value,
      sorter: (a, b) => a.role.length - b.role.length,
    },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Tooltip placement="top" title="Ubah">
            <Link href={`/admin/user/${record.id}`}>
              <Button icon={<EditOutlined />} />
            </Link>
          </Tooltip>
          <Tooltip placement="top" title="Hapus">
            <Button danger icon={<DeleteOutlined />} onClick={showModal} />
            <Modal
              title="Hapus User"
              open={open}
              onOk={() => handleRemove(record.id)}
              onCancel={handleCancelRemove}
            >
              <p>Apakah anda yakin ingin menghapus user ini?</p>
            </Modal>
          </Tooltip>
        </div>
      ),
      width: 100,
    },
  ];

  return (
    <section className="grid bg-white p-4 rounded-xl shadow space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold leading-3">Daftar User</h2>
        <div className="flex space-x-2">
          <Link href="/admin/user/create">
            <Button icon={<PlusOutlined />} size="large" type="primary">
              Tambah
            </Button>
          </Link>
        </div>
      </div>
      <Divider />
      <div className="flex">
        <Table
          columns={columns}
          dataSource={users}
          pagination={{ pageSize: 5 }}
          rowKey={(record) => record.id}
          style={{
            width: "100%",
          }}
        />
      </div>
    </section>
  );
};
