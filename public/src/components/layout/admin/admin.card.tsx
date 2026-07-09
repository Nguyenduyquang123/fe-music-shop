'use client'
import { useEffect, useState } from 'react'
import { Card, Col, Row, Statistic, Tag, List, Avatar, Badge, Skeleton } from 'antd'
import {
    AppstoreOutlined, MessageOutlined,
    PhoneOutlined, EyeOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import { dashboardService } from '@/public/src/services/dashboard.service'
import { toImageUrl, toNumber } from '@/public/src/utils/product.utils'
import type { DashboardData, RecentInquiry, TopProduct } from '@/public/src/types/dashboard.type'

// Khớp đúng status từ API: pending | contacted | done
const STATUS_CONFIG = {
    pending: { color: 'red', text: 'Chưa liên hệ' },
    contacted: { color: 'orange', text: 'Đang xử lý' },
    done: { color: 'green', text: 'Đã tư vấn' },
} as const

type StatusKey = keyof typeof STATUS_CONFIG

const getStatus = (status: string) =>
    STATUS_CONFIG[(status as StatusKey) in STATUS_CONFIG
        ? (status as StatusKey)
        : 'pending']

const INITIAL_DATA: DashboardData = {
    total_products: 0,
    new_inquiries: 0,
    total_inquiries: 0,
    total_views: 0,
    recent_inquiries: [],
    top_products: [],
}

const AdminCard = () => {
    const [data, setData] = useState<DashboardData>(INITIAL_DATA)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await dashboardService.getDashboard()
                setData(res)
            } catch {
                // giữ INITIAL_DATA
            } finally {
                setLoading(false)
            }
        }
        fetchDashboard()
    }, [])

    if (loading) {
        return (
            <>
                <Row gutter={[16, 16]}>
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Col key={i} xs={24} sm={12} lg={6}>
                            <Card bordered={false} style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                                <Skeleton active paragraph={{ rows: 1 }} />
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                    <Col xs={24} lg={16}>
                        <Card bordered={false} style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                            <Skeleton active paragraph={{ rows: 5 }} />
                        </Card>
                    </Col>
                    <Col xs={24} lg={8}>
                        <Card bordered={false} style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                            <Skeleton active paragraph={{ rows: 4 }} />
                        </Card>
                    </Col>
                </Row>
            </>
        )
    }

    return (
        <>
            {/* ===== THỐNG KÊ ===== */}
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                        <Statistic
                            title="Tổng sản phẩm"
                            value={data.total_products}
                            prefix={<AppstoreOutlined style={{ color: '#1677ff' }} />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                        <Statistic
                            title="Yêu cầu tư vấn mới"
                            value={data.new_inquiries}
                            prefix={<MessageOutlined style={{ color: '#fa541c' }} />}
                            valueStyle={{ color: '#fa541c' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                        <Statistic
                            title="Tổng lượt liên hệ"
                            value={data.total_inquiries}
                            prefix={<PhoneOutlined style={{ color: '#52c41a' }} />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                        <Statistic
                            title="Lượt xem sản phẩm"
                            value={Number(data.total_views)}
                            prefix={<EyeOutlined style={{ color: '#722ed1' }} />}
                        />
                    </Card>
                </Col>
            </Row>

            {/* ===== DANH SÁCH + TOP ===== */}
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col xs={24} lg={16}>
                    <Card
                        title="Yêu cầu tư vấn gần đây"
                        bordered={false}
                        style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
                        extra={<Link href="/dashboard/inquiries">Xem tất cả</Link>}
                    >
                        {data.recent_inquiries.length === 0 ? (
                            <div style={{ textAlign: 'center', color: '#bfbfbf', padding: '24px 0' }}>
                                Chưa có yêu cầu tư vấn nào
                            </div>
                        ) : (
                            <List
                                itemLayout="horizontal"
                                dataSource={data.recent_inquiries}
                                renderItem={(item: RecentInquiry) => {
                                    const cfg = getStatus(item.status)
                                    return (
                                        <List.Item
                                            extra={
                                                <Tag color={cfg.color}>{cfg.text}</Tag>
                                            }
                                        >
                                            <List.Item.Meta
                                                avatar={
                                                    <Badge dot={item.status === 'pending'}>
                                                        <Avatar style={{ backgroundColor: '#1677ff' }}>
                                                            {item.full_name?.charAt(0) ?? '?'}
                                                        </Avatar>
                                                    </Badge>
                                                }
                                                title={
                                                    <span style={{ fontWeight: 600 }}>
                                                        {item.full_name}
                                                        <span style={{ color: '#8c8c8c', fontWeight: 400, marginLeft: 8 }}>
                                                            — {item.phone}
                                                        </span>
                                                    </span>
                                                }
                                                description={
                                                    <span>
                                                        Quan tâm:{' '}
                                                        <strong>{item.product?.name ?? '—'}</strong>
                                                        <span style={{ color: '#bfbfbf', marginLeft: 8 }}>
                                                            · {new Date(item.created_at).toLocaleString('vi-VN')}
                                                        </span>
                                                    </span>
                                                }
                                            />
                                        </List.Item>
                                    )
                                }}
                            />
                        )}
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card
                        title="Sản phẩm được quan tâm nhất"
                        bordered={false}
                        style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
                    >
                        {data.top_products.length === 0 ? (
                            <div style={{ textAlign: 'center', color: '#bfbfbf', padding: '24px 0' }}>
                                Chưa có dữ liệu
                            </div>
                        ) : (
                            <List
                                dataSource={data.top_products}
                                renderItem={(item: TopProduct, index) => (
                                    <List.Item style={{ padding: '10px 0' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%' }}>
                                            {/* Thumbnail */}
                                            <img
                                                src={toImageUrl(item.thumbnail)}
                                                alt={item.name}
                                                style={{
                                                    width: 40,
                                                    height: 40,
                                                    objectFit: 'cover',
                                                    borderRadius: 6,
                                                    border: '1px solid #f0f0f0',
                                                    flexShrink: 0,
                                                }}
                                            />
                                            {/* Tên + số liệu */}
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{
                                                    fontWeight: 500,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    fontSize: 13,
                                                }}>
                                                    {item.name}
                                                </div>
                                                <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                                                    {item.view_count.toLocaleString()} lượt xem
                                                    {' · '}
                                                    {item.inquiries_count} liên hệ
                                                </div>
                                            </div>
                                            {/* Rank badge */}
                                            <Avatar
                                                size="small"
                                                style={{
                                                    backgroundColor: index === 0 ? '#fff7e6' : '#f0f0f0',
                                                    color: index === 0 ? '#fa8c16' : '#8c8c8c',
                                                    fontWeight: 700,
                                                    flexShrink: 0,
                                                }}
                                            >
                                                {index + 1}
                                            </Avatar>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        )}
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default AdminCard