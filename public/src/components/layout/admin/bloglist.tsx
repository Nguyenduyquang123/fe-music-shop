'use client'
import { useEffect, useState } from 'react'
import {
    Table, Button, Space, Tag, Image,
    Popconfirm, message, Input, Select, Badge,
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import Link from 'next/link'
import { blogService, toImageUrl } from '@/public/src/services/blog.service'
import type { Blog, BlogCategory } from '@/public/src/types/blog.types'

const BlogListPage = () => {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [categories, setCategories] = useState<BlogCategory[]>([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [filterCategory, setFilterCategory] = useState<number | null>(null)
    const [filterPublished, setFilterPublished] = useState<string>('all')

    const fetchBlogs = async () => {
        setLoading(true)
        try {
            const res = await blogService.getBlogs({
                search: search || undefined,
                category_id: filterCategory ?? undefined,
                is_published: filterPublished === 'all' ? undefined : filterPublished === '1',
            })
            setBlogs(res.data ?? res.items ?? res)
        } catch {
            message.error('Không tải được danh sách bài viết')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        blogService.getCategories().then((res) => {
            setCategories(res.data ?? res.items ?? res)
        })
    }, [])

    useEffect(() => { fetchBlogs() }, [filterCategory, filterPublished])

    const handleDelete = async (id: number) => {
        try {
            await blogService.deleteBlog(id)
            setBlogs((prev) => prev.filter((b) => b.id !== id))
            message.success('Đã xóa bài viết')
        } catch {
            message.error('Xóa thất bại')
        }
    }

    const columns: ColumnsType<Blog> = [
        {
            title: 'Ảnh',
            dataIndex: 'thumbnail',
            width: 80,
            render: (thumb: string) => (
                <Image
                    src={toImageUrl(thumb)}
                    width={56} height={56}
                    style={{ objectFit: 'cover', borderRadius: 8 }}
                    fallback="https://placehold.co/56x56?text=?"
                />
            ),
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            render: (title: string, record) => (
                <div>
                    <div style={{ fontWeight: 600 }}>{title}</div>
                    <div style={{ fontSize: 12, color: '#8c8c8c' }}>by {record.user?.full_name}</div>
                    <div style={{ fontSize: 12, color: '#8c8c8c' }}>/{record.slug}</div>
                </div>
            ),
        },
        {
            title: 'Danh mục',
            dataIndex: ['blog_category', 'name'],
            width: 140,
            render: (name: string) => <Tag color="blue">{name}</Tag>,
        },
        {
            title: 'Lượt xem',
            dataIndex: 'view_count',
            width: 100,
            render: (v: number) => v.toLocaleString(),
            sorter: (a, b) => a.view_count - b.view_count,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'is_published',
            width: 120,
            render: (pub: boolean) => pub
                ? <Badge status="success" text="Đã xuất bản" />
                : <Badge status="default" text="Nháp" />,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'created_at',
            width: 110,
            render: (d: string) => new Date(d).toLocaleDateString('vi-VN'),
        },
        {
            title: 'Hành động',
            width: 120,
            render: (_, record) => (
                <Space>
                    <Link href={`/dashboard/blog/edit/${record.id}`}>
                        <Button icon={<EditOutlined />} size="small" />
                    </Link>
                    <Popconfirm
                        title="Xóa bài viết này?"
                        description="Hành động không thể hoàn tác."
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

    return (
        <div style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={{ margin: 0 }}>Quản lý bài viết</h2>
                <Link href="/dashboard/blog/add">
                    <Button type="primary" icon={<PlusOutlined />}>Viết bài mới</Button>
                </Link>
            </div>

            <Space style={{ marginBottom: 16 }} wrap>
                <Input
                    placeholder="Tìm theo tiêu đề..."
                    prefix={<SearchOutlined />}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onPressEnter={fetchBlogs}
                    allowClear
                    style={{ width: 280 }}
                />
                <Select
                    placeholder="Danh mục"
                    allowClear
                    style={{ width: 180 }}
                    onChange={(v) => setFilterCategory(v ?? null)}
                    options={categories.map((c) => ({ value: c.id, label: c.name }))}
                />
                <Select
                    value={filterPublished}
                    style={{ width: 150 }}
                    onChange={setFilterPublished}
                    options={[
                        { value: 'all', label: 'Tất cả' },
                        { value: '0', label: 'Đã xuất bản' },
                        { value: '1', label: 'Nháp' },
                    ]}
                />
                <Button onClick={fetchBlogs}>Tìm kiếm</Button>
            </Space>

            <Table
                rowKey="id"
                columns={columns}
                dataSource={blogs}
                loading={loading}
                pagination={{ pageSize: 10, showTotal: (t) => `Tổng ${t} bài viết` }}
            />
        </div>
    )
}

export default BlogListPage