"use client";

import api from "@/lib/api/axios";
import { mutationRemoveItem, queryItems } from "@/lib/graphql/items";
import { Item } from "@/lib/interfaces/item";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useMutation } from "@apollo/client";
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

export const ListItem = () => {
  const [items, setItems] = useState<Item[]>([]);
  const { data } = useQuery(queryItems);
  const [removeItem] = useMutation(mutationRemoveItem);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setItems(data.items);
    }
  }, [data]);

  const showModal = () => {
    setOpen(true);
  };

  const handleRemove = async (id: number) => {
    const { data } = await removeItem({
      variables: {
        id,
      },
    });
    api.delete(`/uploads/${data?.removeItem.fkPhotoId}`);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCancelRemove = () => {
    setOpen(false);
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: keyof Item
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: keyof Item): ColumnType<Item> => ({
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

  const columns: ColumnsType<Item> = [
    {
      title: "Foto",
      dataIndex: "upload",
      key: "upload",
      render: (_, record) => {
        const { upload } = record;
        return (
          <img
            src={
              process.env.NEXT_PUBLIC_API_URL +
              "/uploads?url=" +
              upload?.thumbnailUrl
            }
            alt="Foto"
            width={50}
            height={50}
          />
        );
      },
      width: 50,
      responsive: ["md"],
    },
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Status",
      dataIndex: "isPublished",
      key: "isPublished",
      render: (_, record) => {
        const { isPublished } = record;
        const color = isPublished ? "green" : "red";
        const text = isPublished ? "Dipublikasikan" : "Draft";
        return <Tag color={color}>{text}</Tag>;
      },
      filters: [
        {
          text: "Dipublikasikan",
          value: true,
        },
        {
          text: "Draft",
          value: false,
        },
      ],
      onFilter: (value, record) => record.isPublished === value,
      sorter: (a, b) => Number(a.isPublished) - Number(b.isPublished),
      responsive: ["sm"],
    },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Tooltip placement="top" title="Ubah">
            <Link href={`/dashboard/item/${record.id}`}>
              <Button icon={<EditOutlined />} />
            </Link>
          </Tooltip>
          <Tooltip placement="top" title="Hapus">
            <Button danger icon={<DeleteOutlined />} onClick={showModal} />
            <Modal
              title="Hapus Item"
              open={open}
              onOk={() => handleRemove(record.id)}
              onCancel={handleCancelRemove}
            >
              <p>Apakah anda yakin ingin menghapus item ini?</p>
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
        <h2 className="font-semibold leading-3">Daftar Item</h2>
        <div className="flex space-x-2">
          <Link href="/dashboard/item/create">
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
          dataSource={items}
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
