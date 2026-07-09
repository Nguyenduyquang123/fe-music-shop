'use client'
import { useEffect, useState } from 'react'
import {
    Tabs, Form, Input, Button, Card, Row, Col,
    Table, Switch, Space, message, Upload, Modal,
    Popconfirm, InputNumber, Skeleton, Tag, Tooltip,
    Divider,
} from 'antd'
import {
    PlusOutlined, EditOutlined, DeleteOutlined,
    SaveOutlined, InfoCircleOutlined, ArrowUpOutlined,
    ArrowDownOutlined, PictureOutlined, LinkOutlined,
    PhoneOutlined, MailOutlined, EnvironmentOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { RcFile, UploadFile } from 'antd/es/upload/interface'
import { contentService } from '@/public/src/services/content.service'
import type { Banner, SiteText } from '@/public/src/types/content.types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000'
const toUrl = (path: string | null | undefined) => {
    if (!path) return ''
    if (path.startsWith('http')) return path
    return `${BASE_URL}/storage/${path}`
}
const beforeUpload = (file: RcFile) => {
    if (!file.type.startsWith('image/')) { message.error('Chỉ chấp nhận file ảnh!'); return Upload.LIST_IGNORE }
    if (file.size / 1024 / 1024 > 5) { message.error('Ảnh phải nhỏ hơn 5MB!'); return Upload.LIST_IGNORE }
    return false
}

// ==================== TAB GIỚI THIỆU ====================
const AboutTab = () => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        contentService.getAbout().then((res) => {
            form.setFieldsValue(res.data ?? res)
        }).finally(() => setLoading(false))
    }, [form])

    const handleSave = async (values: any) => {
        setSaving(true)
        try {
            await contentService.updateAbout(values)
            message.success('Đã lưu nội dung trang Giới thiệu')
        } catch {
            message.error('Lưu thất bại')
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <Skeleton active paragraph={{ rows: 10 }} />

    return (
        <Form form={form} layout="vertical" onFinish={handleSave}>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Card title="Phần Hero" style={{ marginBottom: 16 }}>
                        <Form.Item name="hero_title" label="Tiêu đề lớn"
                            rules={[{ required: true, message: 'Bắt buộc' }]}>
                            <Input.TextArea rows={2}  />
                        </Form.Item>
                        <Form.Item name="hero_subtitle" label="Mô tả ngắn">
                            <Input.TextArea rows={3}  />
                        </Form.Item>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="founded_year" label="Năm thành lập">
                                    <Input  />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="location" label="Địa điểm">
                                    <Input  />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    <Card title="Câu chuyện thương hiệu" style={{ marginBottom: 16 }}>
                        <Form.Item name="story_title" label="Tiêu đề">
                            <Input  />
                        </Form.Item>
                        <Form.Item name="story_content" label="Nội dung">
                            <Input.TextArea rows={6}  />
                        </Form.Item>
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card title="Chỉ số thống kê" style={{ marginBottom: 16 }}>
                        <Form.List name="stats">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...rest }) => (
                                        <Row key={key} gutter={8} style={{ marginBottom: 8 }} align="middle">
                                            <Col span={9}>
                                                <Form.Item {...rest} name={[name, 'value']} noStyle
                                                    rules={[{ required: true }]}>
                                                    <Input placeholder="5000" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={3}>
                                                <Form.Item {...rest} name={[name, 'suffix']} noStyle>
                                                    <Input placeholder="+" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={9}>
                                                <Form.Item {...rest} name={[name, 'label']} noStyle
                                                    rules={[{ required: true }]}>
                                                    <Input placeholder="Khách hàng" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={3}>
                                                <Button danger size="small" onClick={() => remove(name)}>✕</Button>
                                            </Col>
                                        </Row>
                                    ))}
                                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} block>
                                        Thêm chỉ số
                                    </Button>
                                </>
                            )}
                        </Form.List>
                    </Card>

                    <Card title="Cam kết / Tính năng" style={{ marginBottom: 16 }}>
                        <Form.List name="features">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...rest }) => (
                                        <div key={key} style={{
                                            padding: 12, marginBottom: 12,
                                            background: '#fafafa', borderRadius: 8,
                                        }}>
                                            <Form.Item {...rest} name={[name, 'title']} noStyle>
                                                <Input placeholder="Tiêu đề cam kết" style={{ marginBottom: 6 }} />
                                            </Form.Item>
                                            <Row gutter={8}>
                                                <Col flex="1">
                                                    <Form.Item {...rest} name={[name, 'desc']} noStyle>
                                                        <Input placeholder="Mô tả ngắn" />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Button danger size="small" onClick={() => remove(name)}>✕</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    ))}
                                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} block>
                                        Thêm cam kết
                                    </Button>
                                </>
                            )}
                        </Form.List>
                    </Card>

                    <Card title="Đội ngũ">
                        <Form.List name="team">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...rest }) => (
                                        <div key={key} style={{
                                            padding: 12, marginBottom: 12,
                                            background: '#fafafa', borderRadius: 8,
                                        }}>
                                            <Row gutter={8} style={{ marginBottom: 6 }}>
                                                <Col span={11}>
                                                    <Form.Item {...rest} name={[name, 'name']} noStyle>
                                                        <Input placeholder="Họ và tên" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={9}>
                                                    <Form.Item {...rest} name={[name, 'avatar']} noStyle>
                                                        <Input placeholder="Avatar (2 chữ cái: NM)" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={4}>
                                                    <Button danger size="small" onClick={() => remove(name)} block>✕</Button>
                                                </Col>
                                            </Row>
                                            <Form.Item {...rest} name={[name, 'role']} noStyle style={{ marginBottom: 6 }}>
                                                <Input placeholder="Chức vụ" style={{ marginBottom: 6 }} />
                                            </Form.Item>
                                            <Form.Item {...rest} name={[name, 'desc']} noStyle>
                                                <Input.TextArea rows={2} placeholder="Mô tả ngắn" />
                                            </Form.Item>
                                        </div>
                                    ))}
                                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} block>
                                        Thêm thành viên
                                    </Button>
                                </>
                            )}
                        </Form.List>
                    </Card>
                </Col>
            </Row>

            <Divider />
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={saving} icon={<SaveOutlined />} size="large">
                    Lưu trang Giới thiệu
                </Button>
            </Form.Item>
        </Form>
    )
}

// ==================== TAB LIÊN HỆ ====================
const ContactTab = () => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        contentService.getContact().then((res) => {
            form.setFieldsValue(res.data ?? res)
        }).finally(() => setLoading(false))
    }, [form])

    const handleSave = async (values: any) => {
        setSaving(true)
        try {
            await contentService.updateContact(values)
            message.success('Đã lưu thông tin Liên hệ')
        } catch {
            message.error('Lưu thất bại')
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <Skeleton active paragraph={{ rows: 8 }} />

    return (
        <Form form={form} layout="vertical" onFinish={handleSave}>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Card title="Thông tin liên hệ" style={{ marginBottom: 16 }}>
                        <Form.Item name="address" label="Địa chỉ"
                            rules={[{ required: true, message: 'Bắt buộc' }]}>
                            <Input prefix={<EnvironmentOutlined />}
                                placeholder="123 Đường ABC, Quận X, Hà Nội" />
                        </Form.Item>
                        <Form.Item name="phone" label="Số điện thoại"
                            rules={[{ required: true }]}>
                            <Input prefix={<PhoneOutlined />} placeholder="0901234567" />
                        </Form.Item>
                        <Form.Item name="email" label="Email"
                            rules={[{ required: true }, { type: 'email' }]}>
                            <Input prefix={<MailOutlined />} placeholder="info@nhaccuviet.vn" />
                        </Form.Item>
                        <Form.Item name="working_hours" label="Giờ làm việc">
                            <Input placeholder="8:00 - 21:00, Thứ 2 - Chủ nhật" />
                        </Form.Item>
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card title="Mạng xã hội & Liên kết" style={{ marginBottom: 16 }}>
                        <Form.Item name="zalo_link" label="Zalo">
                            <Input prefix={<LinkOutlined />} placeholder="https://zalo.me/..." />
                        </Form.Item>
                        <Form.Item name="facebook_link" label="Facebook">
                            <Input prefix={<LinkOutlined />} placeholder="https://facebook.com/..." />
                        </Form.Item>
                        <Form.Item name="youtube_link" label="YouTube">
                            <Input prefix={<LinkOutlined />} placeholder="https://youtube.com/..." />
                        </Form.Item>
                    </Card>

                    <Card title="Google Maps Embed">
                        <Form.Item name="map_embed" label="Link nhúng bản đồ"
                            extra="Lấy từ Google Maps > Share > Embed a map > Copy HTML, dán toàn bộ thẻ iframe vào đây">
                            <Input.TextArea rows={5}
                                placeholder='<iframe src="https://www.google.com/maps/embed?..."...' />
                        </Form.Item>
                    </Card>
                </Col>
            </Row>

            <Divider />
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={saving} icon={<SaveOutlined />} size="large">
                    Lưu thông tin Liên hệ
                </Button>
            </Form.Item>
        </Form>
    )
}

// ==================== TAB BANNER ====================
const BannerTab = () => {
    const [banners, setBanners] = useState<Banner[]>([])
    const [loading, setLoading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [editing, setEditing] = useState<Banner | null>(null)
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [submitting, setSubmitting] = useState(false)
    const [form] = Form.useForm()

    const fetchBanners = async () => {
        setLoading(true)
        try {
            const res = await contentService.getBanners()
            setBanners(res.data ?? res.items ?? res)
        } catch {
            message.error('Không tải được danh sách banner')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchBanners() }, [])

    const openAdd = () => {
        setEditing(null)
        form.resetFields()
        form.setFieldsValue({ is_active: true, sort_order: banners.length + 1 })
        setFileList([])
        setModalOpen(true)
    }

    const openEdit = (banner: Banner) => {
        setEditing(banner)
        form.setFieldsValue({
            title: banner.title,
            subtitle: banner.subtitle,
            button_text: banner.button_text,
            button_link: banner.button_link,
            is_active: banner.is_active,
            sort_order: banner.sort_order,
        })
        setFileList(banner.image ? [{
            uid: 'existing', name: 'banner', status: 'done', url: toUrl(banner.image),
        }] : [])
        setModalOpen(true)
    }

    const handleDelete = async (id: number) => {
        try {
            await contentService.deleteBanner(id)
            setBanners((prev) => prev.filter((b) => b.id !== id))
            message.success('Đã xóa banner')
        } catch {
            message.error('Xóa thất bại')
        }
    }

    const handleToggleActive = async (banner: Banner) => {
        const fd = new FormData()
        fd.append('is_active', banner.is_active ? '0' : '1')
        fd.append('_method', 'PUT')
        try {
            await contentService.updateBanner(banner.id, fd)
            setBanners((prev) => prev.map((b) =>
                b.id === banner.id ? { ...b, is_active: !b.is_active } : b
            ))
        } catch {
            message.error('Cập nhật thất bại')
        }
    }

    const handleSubmit = async (values: any) => {
        setSubmitting(true)
        try {
            const fd = new FormData()
            fd.append('title', values.title)
            fd.append('subtitle', values.subtitle ?? '')
            fd.append('button_text', values.button_text ?? '')
            fd.append('button_link', values.button_link ?? '')
            fd.append('is_active', values.is_active ? '1' : '0')
            fd.append('sort_order', String(values.sort_order ?? 0))

            const newFile = fileList.find((f) => f.originFileObj)
            if (newFile?.originFileObj) fd.append('image', newFile.originFileObj as RcFile)
            else if (fileList[0]?.url) fd.append('existing_image', fileList[0].url)

            if (editing) {
                await contentService.updateBanner(editing.id, fd)
                message.success('Cập nhật banner thành công')
            } else {
                await contentService.createBanner(fd)
                message.success('Thêm banner thành công')
            }
            setModalOpen(false)
            fetchBanners()
        } catch {
            message.error('Có lỗi xảy ra')
        } finally {
            setSubmitting(false)
        }
    }

    const columns: ColumnsType<Banner> = [
        {
            title: 'Ảnh',
            dataIndex: 'image',
            width: 120,
            render: (img: string) => img ? (
                <img src={toUrl(img)} alt="banner"
                    style={{ width: 100, height: 56, objectFit: 'cover', borderRadius: 6 }} />
            ) : <div style={{ width: 100, height: 56, background: '#f0f0f0', borderRadius: 6 }} />,
        },
        {
            title: 'Nội dung',
            render: (_, r) => (
                <div>
                    <div style={{ fontWeight: 600 }}>{r.title}</div>
                    {r.subtitle && <div style={{ fontSize: 12, color: '#8c8c8c' }}>{r.subtitle}</div>}
                    {r.button_link && (
                        <div style={{ fontSize: 12, color: '#1677ff', marginTop: 4 }}>
                            <LinkOutlined /> {r.button_link}
                        </div>
                    )}
                </div>
            ),
        },
        {
            title: 'Thứ tự',
            dataIndex: 'sort_order',
            width: 80,
            render: (v: number) => <Tag>{v}</Tag>,
        },
        {
            title: 'Hiển thị',
            dataIndex: 'is_active',
            width: 100,
            render: (active: boolean, record) => (
                <Switch checked={active} onChange={() => handleToggleActive(record)} />
            ),
        },
        {
            title: 'Hành động',
            width: 100,
            render: (_, record) => (
                <Space>
                    <Button icon={<EditOutlined />} size="small" onClick={() => openEdit(record)} />
                    <Popconfirm
                        title="Xóa banner này?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Xóa" cancelText="Hủy" okButtonProps={{ danger: true }}
                    >
                        <Button icon={<DeleteOutlined />} size="small" danger />
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>
                    Thêm banner
                </Button>
            </div>

            <Table
                rowKey="id" columns={columns} dataSource={banners}
                loading={loading} pagination={false}
            />

            <Modal
                title={editing ? 'Sửa banner' : 'Thêm banner mới'}
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                footer={null} destroyOnClose width={640}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}
                    initialValues={{ is_active: true }}>
                    <Form.Item label="Ảnh banner">
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            beforeUpload={beforeUpload}
                            onChange={({ fileList: l }) => setFileList(l.slice(-1))}
                            maxCount={1}
                        >
                            {fileList.length >= 1 ? null : (
                                <div><PictureOutlined /><div style={{ marginTop: 8 }}>Tải ảnh</div></div>
                            )}
                        </Upload>
                        <p style={{ fontSize: 12, color: '#8c8c8c' }}>
                            Tỷ lệ khuyên dùng: 16:6 (ví dụ 1920×720px)
                        </p>
                    </Form.Item>

                    <Form.Item name="title" label="Tiêu đề"
                        rules={[{ required: true, message: 'Bắt buộc' }]}>
                        <Input placeholder="Khám Phá Thế Giới Âm Nhạc" />
                    </Form.Item>

                    <Form.Item name="subtitle" label="Mô tả ngắn">
                        <Input.TextArea rows={2} placeholder="Đa dạng nhạc cụ chất lượng..." />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="button_text" label="Chữ nút">
                                <Input placeholder="Mua ngay" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="button_link" label="Link nút">
                                <Input placeholder="/product" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="sort_order" label="Thứ tự hiển thị">
                                <InputNumber style={{ width: '100%' }} min={1} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="is_active" label="Kích hoạt" valuePropName="checked">
                                <Switch checkedChildren="Hiển thị" unCheckedChildren="Ẩn" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={() => setModalOpen(false)}>Hủy</Button>
                            <Button type="primary" htmlType="submit" loading={submitting}>
                                {editing ? 'Cập nhật' : 'Thêm banner'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

// ==================== TAB CHỮ TRÊN WEB ====================
const SiteTextTab = () => {
    const [texts, setTexts] = useState<SiteText[]>([])
    const [loading, setLoading] = useState(true)
    const [savingId, setSavingId] = useState<number | null>(null)
    const [editValues, setEditValues] = useState<Record<number, string>>({})

    useEffect(() => {
        contentService.getSiteTexts().then((res) => {
            const list: SiteText[] = res.data ?? res.items ?? res
            setTexts(list)
            const vals: Record<number, string> = {}
            list.forEach((t) => { vals[t.id] = t.value })
            setEditValues(vals)
        }).finally(() => setLoading(false))
    }, [])

    const handleSave = async (id: number) => {
        setSavingId(id)
        try {
            await contentService.updateSiteText(id, editValues[id])
            setTexts((prev) => prev.map((t) => t.id === id ? { ...t, value: editValues[id] } : t))
            message.success('Đã lưu')
        } catch {
            message.error('Lưu thất bại')
        } finally {
            setSavingId(null)
        }
    }

    // Nhóm theo group
    const grouped = texts.reduce<Record<string, SiteText[]>>((acc, t) => {
        if (!acc[t.group]) acc[t.group] = []
        acc[t.group].push(t)
        return acc
    }, {})

    if (loading) return <Skeleton active paragraph={{ rows: 10 }} />

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {Object.entries(grouped).map(([group, items]) => (
                <Card
                    key={group}
                    title={
                        <span style={{ textTransform: 'capitalize', fontWeight: 700 }}>
                            {group}
                        </span>
                    }
                    bordered={false}
                    style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {items.map((item) => (
                            <div key={item.id}>
                                <div style={{
                                    display: 'flex', justifyContent: 'space-between',
                                    alignItems: 'center', marginBottom: 6,
                                }}>
                                    <div>
                                        <span style={{ fontWeight: 600 }}>{item.label}</span>
                                        <Tooltip title={`Key: ${item.key}`}>
                                            <Tag style={{ marginLeft: 8, fontSize: 11, cursor: 'help' }}>
                                                {item.key}
                                            </Tag>
                                        </Tooltip>
                                    </div>
                                    <Button
                                        type="primary"
                                        size="small"
                                        icon={<SaveOutlined />}
                                        loading={savingId === item.id}
                                        disabled={editValues[item.id] === item.value}
                                        onClick={() => handleSave(item.id)}
                                    >
                                        Lưu
                                    </Button>
                                </div>
                                <Input.TextArea
                                    value={editValues[item.id]}
                                    rows={item.value.length > 100 ? 3 : 1}
                                    onChange={(e) => setEditValues((prev) => ({
                                        ...prev,
                                        [item.id]: e.target.value,
                                    }))}
                                />
                            </div>
                        ))}
                    </div>
                </Card>
            ))}

            {texts.length === 0 && (
                <Card>
                    <div style={{ textAlign: 'center', color: '#8c8c8c', padding: '32px 0' }}>
                        Chưa có nội dung nào. Backend cần seed dữ liệu vào bảng <code>site_texts</code>.
                    </div>
                </Card>
            )}
        </div>
    )
}

// ==================== PAGE CHÍNH ====================
const ContentPage = () => {
    return (
        <div style={{ padding: 24 }}>
            <div style={{ marginBottom: 24 }}>
                <h2 style={{ margin: 0 }}>Quản lý nội dung trang web</h2>
                <p style={{ color: '#8c8c8c', marginTop: 4, fontSize: 14 }}>
                    Chỉnh sửa nội dung hiển thị trực tiếp trên website mà không cần lập trình.
                </p>
            </div>

            <Tabs
                type="card"
                size="large"
                items={[
                    {
                        key: 'about',
                        label: (
                            <span>
                                <InfoCircleOutlined /> Giới thiệu
                            </span>
                        ),
                        children: <AboutTab />,
                    },
                    {
                        key: 'contact',
                        label: (
                            <span>
                                <PhoneOutlined /> Liên hệ
                            </span>
                        ),
                        children: <ContactTab />,
                    },
                    {
                        key: 'banner',
                        label: (
                            <span>
                                <PictureOutlined /> Banner
                            </span>
                        ),
                        children: <BannerTab />,
                    },
                    {
                        key: 'site-text',
                        label: (
                            <span>
                                <EditOutlined /> Chữ trên web
                            </span>
                        ),
                        children: <SiteTextTab />,
                    },
                ]}
            />
        </div>
    )
}

export default ContentPage