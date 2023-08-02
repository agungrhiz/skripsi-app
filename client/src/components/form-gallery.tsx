"use client";

import api from "@/lib/api/axios";
import {
  mutationCreateGallery,
  mutationUpdateGallery,
  queryGallery,
} from "@/lib/graphql/galleries";
import { Uploads } from "@/lib/interfaces/upload";
import { NotificationType } from "@/lib/types/notification";
import { UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import {
  Button,
  Divider,
  Form,
  Input,
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

export const FormGallery = ({ id }: { id?: string }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [context, contextHolder] = notification.useNotification();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [createGallery] = useMutation(mutationCreateGallery);
  const [updateGallery] = useMutation(mutationUpdateGallery);
  const { data } = useQuery(queryGallery, {
    variables: {
      id: Number(id),
    },
    skip: !id,
  });
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setFileList([
        {
          uid: data.gallery.upload.id.toString(),
          name: data.gallery.upload.name,
          status: "done",
          url:
            process.env.NEXT_PUBLIC_API_URL +
            "/uploads?url=" +
            data.gallery.upload.url,
        },
      ]);
    }
  }, [data]);

  useEffect(() => {
    form.setFieldsValue({
      upload: fileList.length > 0 ? fileList[0] : null,
      title: data?.gallery.title,
      description: data?.gallery.description,
      isPublished: data?.gallery.isPublished || false,
    });
  }, [fileList, data]);

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleUpload = async (file: RcFile): Promise<Uploads> => {
    const form = new FormData();
    form.append("file", file);
    const response = await api.post("/uploads", form);
    return response.data;
  };

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const input = {
        title: values.title,
        description: values.description,
        isPublished: values.isPublished,
      };
      if (id) {
        if (values.upload.uid === data?.gallery.upload.id.toString()) {
          await updateGallery({
            variables: {
              input: {
                id: Number(id),
                ...input,
              },
            },
          });
        } else {
          api.delete("/uploads/" + data?.gallery.fkUploadId);
          const upload = await handleUpload(values.upload.originFileObj);
          await updateGallery({
            variables: {
              input: {
                id: Number(id),
                ...input,
                fkUploadId: upload.id,
              },
            },
          });
          window.location.reload();
        }
      } else {
        const upload = await handleUpload(values.upload.originFileObj);
        await createGallery({
          variables: {
            input: {
              ...input,
              fkUploadId: upload.id,
            },
          },
        });
      }
      sendNotification("success", "Berhasil", "Berhasil menyimpan data");
    } catch {
      sendNotification(
        "error",
        "Gagal",
        "Gagal menyimpan data, silahkan coba lagi"
      );
    } finally {
      setLoading(false);
    }
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
        <h2 className="font-semibold leading-3">Form Gallery</h2>
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
            label="Gambar atau Video"
            rules={[
              { required: true, message: "Gambar atau Video harus diisi" },
            ]}
          >
            <Upload
              fileList={fileList}
              beforeUpload={() => false}
              accept="image/*,video/*"
              onChange={handleChange}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="title" label="Judul">
            <Input placeholder="Judul" />
          </Form.Item>
          <Form.Item name="description" label="Deskripsi">
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
                onClick={() => router.push("/dashboard/gallery")}
              >
                Kembali
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Simpan
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};
