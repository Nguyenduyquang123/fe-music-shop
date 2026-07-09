'use client'
import { useEffect, useState } from 'react'
import {
  Table, Button, Space, Tag, Image,
  Popconfirm, message, Input, Modal, Form, Upload, Switch,
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { UploadFile, RcFile } from 'antd/es/upload/interface'
import { blogService, toImageUrl } from '@/public/src/services/blog.service'
import type { BlogCategory } from '@/public/src/types/blog.types'

const beforeUpload = (file: RcFile) => {
  if (!file.type.startsWith('image/')) { message.error('Chỉ chấp nhận file ảnh!'); return Upload.LIST_IGNORE }
  if (file.size / 1024 / 1024 > 2) { message.error('Ảnh phải nhỏ hơn 2MB!'); return Upload.LIST_IGNORE }
  return false
}

const BlogCategoryPage = () => {
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<BlogCategory | null>(null)
  const [thumbnailList, setThumbnailList] = useState<UploadFile[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [form] = Form.useForm()

  const fetchCategories = async () => {
    setLoading(true)
    try {
      const res = await blogService.getCategories()
      setCategories(res.data ?? res.items ?? res)
    } catch {
      message.error('Không tải được danh mục')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCategories() }, [])

  const openAdd = () => {
    setEditing(null)
    form.resetFields()
    setThumbnailList([])
    setModalOpen(true)
  }

  const openEdit = (cat: BlogCategory) => {
    setEditing(cat)
    form.setFieldsValue({
      name: cat.name,
      description: cat.description,
      is_active: cat.is_active,
      meta_title: cat.meta_title,
      meta_description: cat.meta_description,
    })
    setThumbnailList(
      cat.image
        ? [{ uid: 'existing', name: 'image', status: 'done', url: toImageUrl(cat.image) }]
        : []
    )
    setModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    try {
      await blogService.deleteCategory(id)
      setCategories((prev) => prev.filter((c) => c.id !== id))
      message.success('Đã xóa danh mục')
    } catch {
      message.error('Xóa thất bại')
    }
  }

  const handleSubmit = async (values: any) => {
    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append('name', values.name)
      fd.append('is_active', values.is_active ? '1' : '0')
      if (values.description) fd.append('description', values.description)
      if (values.meta_title) fd.append('meta_title', values.meta_title)
      if (values.meta_description) fd.append('meta_description', values.meta_description)

      const newFile = thumbnailList.find((f) => f.originFileObj)
      if (newFile?.originFileObj) fd.append('image', newFile.originFileObj as RcFile)
      else if (thumbnailList[0]?.url) fd.append('existing_image', thumbnailList[0].url)

      if (editing) {
        await blogService.updateCategory(editing.id, fd)
        message.success('Cập nhật danh mục thành công')
      } else {
        await blogService.createCategory(fd)
        message.success('Thêm danh mục thành công')
      }
      setModalOpen(false)
      fetchCategories()
    } catch {
      message.error('Có lỗi xảy ra')
    } finally {
      setSubmitting(false)
    }
  }

  const columns: ColumnsType<BlogCategory> = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      render: (name: string, record) => (
        <div>
          <div style={{ fontWeight: 600 }}>{name}</div>
          <div style={{ fontSize: 12, color: '#8c8c8c' }}>/{record.slug}</div>
        </div>
      ),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      render: (desc: string) => (
        <span style={{ color: '#8c8c8c', fontSize: 13 }}>
          {desc ?? '—'}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'is_active',
      width: 120,
      render: (v: boolean) => v
        ? <Tag color="green">Hiển thị</Tag>
        : <Tag color="default">Đã ẩn</Tag>,
    },
    {
      title: 'Hành động',
      width: 110,
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} size="small" onClick={() => openEdit(record)} />
          <Popconfirm
            title="Xóa danh mục này?"
            description="Các bài viết thuộc danh mục sẽ bị ảnh hưởng."
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa" cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>Danh mục blog</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>
          Thêm danh mục
        </Button>
      </div>

      <Input
        placeholder="Tìm theo tên danh mục..."
        prefix={<SearchOutlined />}
        style={{ marginBottom: 16, maxWidth: 320 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        allowClear
      />

      <Table
        rowKey="id"
        columns={columns}
        dataSource={filtered}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editing ? 'Sửa danh mục' : 'Thêm danh mục mới'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ is_active: true }}
        >
          <Form.Item name="name" label="Tên danh mục"
            rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
            <Input placeholder="Guitar, Piano, Nhạc lý..." />
          </Form.Item>

          <Form.Item name="description" label="Mô tả ngắn">
            <Input.TextArea rows={2} placeholder="Mô tả ngắn về danh mục" />
          </Form.Item>

          <Form.Item name="is_active" label="Trạng thái" valuePropName="checked">
            <Switch checkedChildren="Hiển thị" unCheckedChildren="Ẩn" />
          </Form.Item>

          <Form.Item label="Ảnh đại diện">
            <Upload
              listType="picture-card"
              fileList={thumbnailList}
              beforeUpload={beforeUpload}
              onChange={({ fileList }) => setThumbnailList(fileList.slice(-1))}
              maxCount={1}
            >
              {thumbnailList.length >= 1 ? null : (
                <div><PlusOutlined /><div style={{ marginTop: 8 }}>Tải ảnh</div></div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item name="meta_title" label="Meta Title">
            <Input placeholder="Tiêu đề SEO" maxLength={60} showCount />
          </Form.Item>

          <Form.Item name="meta_description" label="Meta Description">
            <Input.TextArea rows={2} maxLength={160} showCount />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setModalOpen(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit" loading={submitting}>
                {editing ? 'Cập nhật' : 'Thêm danh mục'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default BlogCategoryPage