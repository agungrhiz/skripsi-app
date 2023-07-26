"use client";

import { Uploads } from "@/lib/uploads";
import { PlusOutlined } from "@ant-design/icons";
import { TypedDocumentNode, gql, useMutation } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  Space,
  Upload,
  UploadFile,
  UploadProps,
  notification,
} from "antd";
import { RcFile } from "antd/es/upload";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Item {
  id: number;
  name: string;
  description: string;
  isPublished: boolean;
  fkPhotoId: number;
  upload: Uploads;
}

const query: TypedDocumentNode<{
  item: Item;
}> = gql`
  query Item($id: Int!) {
    item(id: $id) {
      id
      name
      description
      isPublished
      fkPhotoId
      upload {
        id
        url
        thumbnailUrl
        name
        size
        type
      }
    }
  }
`;

const mutationCreate: TypedDocumentNode<{
  createItem: Item;
}> = gql`
  mutation CreateItem($input: CreateItemInput!) {
    createItem(createItemInput: $input) {
      id
      name
      description
      isPublished
      fkPhotoId
    }
  }
`;

const mutationUpdate: TypedDocumentNode<{
  updateItem: Item;
}> = gql`
  mutation UpdateItem($input: UpdateItemInput!) {
    updateItem(updateItemInput: $input) {
      id
      name
      description
      isPublished
      fkPhotoId
    }
  }
`;

type NotificationType = "success" | "error";
const UPLOAD_URL = process.env.NEXT_PUBLIC_UPLOAD_URL;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const FormItem = ({ id }: { id?: string }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { data } = useQuery(query, {
    variables: {
      id: Number(id),
    },
    skip: !id,
  });
  const [createItem] = useMutation(mutationCreate);
  const [updateItem] = useMutation(mutationUpdate);
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();

  // upload
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(() => {
    if (id && data?.item) {
      form.setFieldsValue({
        name: data.item.name,
        description: data.item.description,
        isPublished: data.item.isPublished,
      });
    } else {
      form.setFieldsValue({
        isPublished: false,
      });
    }
  }, [id, data, form]);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const upload = await handleUpload();
      if (!upload) {
        sendNotification(
          "error",
          "Gagal",
          "Gagal mengunggah foto, silahkan coba lagi"
        );
        setLoading(false);
        return;
      }
      const input = {
        name: values.name,
        description: values.description,
        isPublished: values.isPublished,
        fkPhotoId: 12,
      };
      console.log(input);
      if (id) {
        await updateItem({
          variables: {
            input: {
              ...input,
              id: Number(id),
            },
          },
        });
      } else {
        await createItem({
          variables: {
            input,
          },
        });
      }
      sendNotification("success", "Berhasil", "Berhasil menyimpan data");
    } catch(error) {
      sendNotification("error", "Gagal", "Gagal menyimpan data");
    } finally {
      setLoading(false);
    }
  }

  const handleUpload = async (): Promise<Uploads | null> => {
    const formData = new FormData();
    formData.append("file", fileList[0].originFileObj as RcFile);
    try {
      const response = await fetch(UPLOAD_URL || "", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  };

  const sendNotification = (
    type: NotificationType,
    title: string,
    description: string
  ) => {
    api[type]({
      message: title,
      description,
    });
  };

  return (
    <section className="grid bg-white p-4 rounded-xl shadow space-y-2">
      {contextHolder}
      <div className="flex justify-between items-center">
        <h2 className="font-semibold leading-3">Form Item</h2>
      </div>
      <Divider />
      <div className="flex justify-center">
        <Form
          className="max-w-sm md:w-96 w-80 mt-4"
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="upload"
            label="Foto"
            rules={[{ required: true, message: "Foto harus diisi" }]}
          >
            <Upload
              action={UPLOAD_URL}
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={() => false}
              accept="image/*"
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>

          <Form.Item
            name="name"
            label="Nama"
            rules={[{ required: true, message: "Nama harus diisi" }]}
          >
            <Input placeholder="Nama" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Deskripsi"
            rules={[{ required: true, message: "Deskripsi harus diisi" }]}
          >
            <Input.TextArea placeholder="Deskripsi" rows={4} />
          </Form.Item>
          <Form.Item
            name="isPublished"
            label="Dipublikasikan"
            rules={[{ required: true, message: "Dipublikasikan harus diisi" }]}
          >
            <Radio.Group>
              <Radio value={true}>Ya</Radio>
              <Radio value={false}>Tidak</Radio>
            </Radio.Group>
          </Form.Item>
          <Divider />
          <Form.Item className="text-right">
            <Space>
              <Button
                type="default"
                htmlType="button"
                onClick={() => router.push("/admin/user")}
              >
                Kembali
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Simpan
              </Button>
            </Space>
          </Form.Item>
        </Form>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    </section>
  );
};
