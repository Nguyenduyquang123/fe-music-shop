'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  Form, Input, Select, Switch, Button,
  Upload, Card, Row, Col, Space,
  message, Divider, Skeleton,
} from 'antd'
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import type { UploadFile, RcFile } from 'antd/es/upload/interface'
import { blogService, toImageUrl } from '@/public/src/services/blog.service'
import type { BlogCategory, BlogFormValues } from '@/public/src/types/blog.types'
import RichTextEditor from '@/public/src/components/RichTextEditor';
const { TextArea } = Input

const beforeUpload = (file: RcFile) => {
  if (!file.type.startsWith('image/')) { message.error('Chỉ chấp nhận file ảnh!'); return Upload.LIST_IGNORE }
  if (file.size / 1024 / 1024 > 5) { message.error('Ảnh phải nhỏ hơn 5MB!'); return Upload.LIST_IGNORE }
  return false
}

const BlogFormPage = () => {
  const [form] = Form.useForm<BlogFormValues>()
  const router = useRouter()
  const params = useParams()
  const blogId = params?.id ? Number(params.id) : undefined

  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [thumbnailList, setThumbnailList] = useState<UploadFile[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [loadingData, setLoadingData] = useState(!!blogId)

  useEffect(() => {
    blogService.getCategories().then((res) => {
      setCategories(res.data ?? res.items ?? res)
    })
  }, [])

  useEffect(() => {
    if (!blogId) return
    const fetchBlog = async () => {
      try {
        const res = await blogService.getBlog(blogId)
        const data = res.data ?? res
        form.setFieldsValue({
          blog_category_id: data.blog_category_id,
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          is_published: data.is_published,
          meta_title: data.meta_title,
          meta_description: data.meta_description,
          meta_keywords: data.meta_keywords,
        })
        if (data.thumbnail) {
          setThumbnailList([{
            uid: 'existing',
            name: 'thumbnail',
            status: 'done',
            url: toImageUrl(data.thumbnail),
          }])
        }
      } catch {
        message.error('Không tải được dữ liệu bài viết')
        router.push('/dashboard/blog')
      } finally {
        setLoadingData(false)
      }
    }
    fetchBlog()
  }, [blogId, form, router])

  const handleSubmit = async (values: BlogFormValues) => {
    setSubmitting(true)
    try {
      const newThumb = thumbnailList.find((f) => f.originFileObj)
      const existingThumb = thumbnailList[0]?.url

      const fd = blogService.buildFormData(
        values,
        newThumb?.originFileObj as File ?? null,
        existingThumb,
      )

      if (blogId) {
        await blogService.updateBlog(blogId, fd)
        message.success('Cập nhật bài viết thành công')
      } else {
        await blogService.createBlog(fd)
        message.success('Đăng bài viết thành công')
      }
      router.push('/dashboard/blog')
    } catch {
      message.error('Có lỗi xảy ra, vui lòng thử lại')
    } finally {
      setSubmitting(false)
    }
  }

  if (loadingData) {
    return (
      <div style={{ padding: 24 }}>
        <Skeleton active paragraph={{ rows: 12 }} />
      </div>
    )
  }

  return (
    <div style={{ padding: 24, maxWidth: 1080, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => router.push('/dashboard/blog')} />
        <h2 style={{ margin: 0 }}>{blogId ? 'Sửa bài viết' : 'Viết bài mới'}</h2>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ is_published: false }}
        scrollToFirstError
      >
        <Row gutter={24}>
          {/* Cột trái */}
          <Col xs={24} md={16}>
            <Card title="Nội dung bài viết" style={{ marginBottom: 16 }}>
              <Form.Item
                name="title"
                label="Tiêu đề"
                rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
              >
                <Input placeholder="Tiêu đề bài viết..." size="large" />
              </Form.Item>

              <Form.Item name="excerpt" label="Mô tả ngắn (excerpt)">
                <TextArea rows={3} maxLength={300} showCount
                  placeholder="Tóm tắt ngắn hiển thị ở danh sách blog..." />
              </Form.Item>

              <Form.Item
                name="content"
                label="Nội dung chi tiết"
                rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
              >
                <RichTextEditor/>
              </Form.Item>
            </Card>

            <Card title="SEO" style={{ marginBottom: 16 }}>
              <Form.Item name="meta_title" label="Meta Title">
                <Input placeholder="Tiêu đề SEO" maxLength={60} showCount />
              </Form.Item>
              <Form.Item name="meta_description" label="Meta Description">
                <TextArea rows={2} maxLength={160} showCount
                  placeholder="Mô tả SEO (tối đa 160 ký tự)" />
              </Form.Item>
              <Form.Item name="meta_keywords" label="Meta Keywords">
                <Input placeholder="keyword1, keyword2, keyword3" />
              </Form.Item>
            </Card>
          </Col>

          {/* Cột phải */}
          <Col xs={24} md={8}>
            <Card title="Cài đặt xuất bản" style={{ marginBottom: 16 }}>
              <Form.Item
                name="blog_category_id"
                label="Danh mục"
                rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
              >
                <Select
                  placeholder="Chọn danh mục"
                  showSearch
                  optionFilterProp="label"
                  options={categories.map((c) => ({ value: c.id, label: c.name }))}
                />
              </Form.Item>

              <Form.Item
                name="is_published"
                label="Trạng thái"
                valuePropName="checked"
              >
                <Switch
                  checkedChildren="Xuất bản"
                  unCheckedChildren="Nháp"
                />
              </Form.Item>
            </Card>

            <Card title="Ảnh đại diện">
              <Upload
                listType="picture-card"
                fileList={thumbnailList}
                beforeUpload={beforeUpload}
                onChange={({ fileList }) => setThumbnailList(fileList.slice(-1))}
                maxCount={1}
              >
                {thumbnailList.length >= 1 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Tải ảnh</div>
                  </div>
                )}
              </Upload>
              <p style={{ fontSize: 12, color: '#8c8c8c', marginTop: 8 }}>
                Ảnh thumbnail hiển thị ở danh sách blog. Dưới 5MB.
              </p>
            </Card>
          </Col>
        </Row>

        <Divider />

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={submitting} size="large">
              {blogId ? 'Cập nhật bài viết' : 'Đăng bài viết'}
            </Button>
            <Button size="large" onClick={() => router.push('/dashboard/blog')}>Hủy</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default BlogFormPage