"use client";

import api from "@/lib/api/axios";
import {
  mutationCreateItem,
  mutationUpdateItem,
  queryItem,
} from "@/lib/graphql/items";
import { Uploads } from "@/lib/interfaces/uploads";
import { NotificationType } from "@/lib/types/notification";
import { PlusOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
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
  const { data } = useQuery(queryItem, {
    variables: {
      id: Number(id),
    },
    skip: !id,
  });
  const [createItem] = useMutation(mutationCreateItem);
  const [updateItem] = useMutation(mutationUpdateItem);
  const [context, contextHolder] = notification.useNotification();
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
      setFileList([
        {
          uid: data.item.upload.id.toString(),
          name: data.item.upload.name,
          status: "done",
          url:
            process.env.NEXT_PUBLIC_API_URL +
            "/uploads?url=" +
            data.item.upload.url,
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [id, data]);

  useEffect(() => {
    form.setFieldsValue({
      upload: fileList.length > 0 ? fileList[0] : null,
      name: data?.item.name,
      description: data?.item.description,
      isPublished: data?.item.isPublished || false,
    });
  }, [fileList, data, form]);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const input = {
        name: values.name,
        description: values.description,
        isPublished: values.isPublished || false,
      };
      if (id) {
        if (values.upload.uid === data?.item.upload.id.toString()) {
          await updateItem({
            variables: {
              input: {
                ...input,
                id: Number(id),
              },
            },
          });
        } else {
          api.delete("/uploads/" + data?.item.upload.id);
          const response = await uploadFile(values.upload.file as RcFile);
          await updateItem({
            variables: {
              input: {
                ...input,
                id: Number(id),
                fkPhotoId: response.id,
              },
            },
          });
          window.location.reload();
        }
      } else {
        const response = await uploadFile(values.upload.file as RcFile);
        await createItem({
          variables: {
            input: {
              ...input,
              fkPhotoId: response.id,
            },
          },
        });
      }
      sendNotification("success", "Berhasil", "Berhasil menyimpan data");
    } catch (error) {
      console.log(error);
      sendNotification("error", "Gagal", "Gagal menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file: RcFile): Promise<Uploads> => {
    const form = new FormData();
    form.append("file", file);
    const response = await api.post("/uploads", form);
    return response.data;
  };

  const sendNotification = (
    type: NotificationType,
    title: string,
    description: string
  ) => {
    context[type]({
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
                onClick={() => router.push("/dashboard/item")}
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
