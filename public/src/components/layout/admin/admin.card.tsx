'use client'

import { Card, Col, Row, Statistic, Tag, List, Avatar, Badge } from "antd";
import {
    AppstoreOutlined,
    MessageOutlined,
    PhoneOutlined,
    EyeOutlined,
    ArrowUpOutlined,
} from '@ant-design/icons';

interface ContactRequest {
    id: string;
    name: string;
    phone: string;
    productName: string;
    createdAt: string;
    status: 'new' | 'contacted' | 'done';
}

const recentContacts: ContactRequest[] = [
    {
        id: '1',
        name: 'Hoàng Nam',
        phone: '0901234567',
        productName: 'Đàn Guitar Taylor 214ce',
        createdAt: '5 phút trước',
        status: 'new',
    },
    {
        id: '2',
        name: 'Minh Tuấn',
        phone: '0912345678',
        productName: 'Piano Roland RP-30',
        createdAt: '1 giờ trước',
        status: 'contacted',
    },
    {
        id: '3',
        name: 'An Lê',
        phone: '0987654321',
        productName: 'Sáo Trúc Cao Cấp',
        createdAt: '3 giờ trước',
        status: 'done',
    },
];

const statusConfig = {
    new: { color: 'red', text: 'Chưa liên hệ' },
    contacted: { color: 'orange', text: 'Đang xử lý' },
    done: { color: 'green', text: 'Đã tư vấn' },
};

const AdminCard = () => {
    return (
        <>
            {/* Hàng thống kê tổng quan */}
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                        <Statistic
                            title="Tổng sản phẩm"
                            value={156}
                            prefix={<AppstoreOutlined style={{ color: '#1677ff' }} />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                        <Statistic
                            title="Yêu cầu tư vấn mới"
                            value={8}
                            prefix={<MessageOutlined style={{ color: '#fa541c' }} />}
                            valueStyle={{ color: '#fa541c' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                        <Statistic
                            title="Lượt liên hệ hôm nay"
                            value={23}
                            prefix={<PhoneOutlined style={{ color: '#52c41a' }} />}
                            suffix={
                                <span style={{ fontSize: 12, color: '#52c41a', marginLeft: 8 }}>
                                    <ArrowUpOutlined /> 12%
                                </span>
                            }
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                        <Statistic
                            title="Lượt xem sản phẩm"
                            value={1284}
                            prefix={<EyeOutlined style={{ color: '#722ed1' }} />}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Hàng danh sách yêu cầu tư vấn gần đây */}
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col xs={24} lg={16}>
                    <Card
                        title="Yêu cầu tư vấn gần đây"
                        bordered={false}
                        style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
                        extra={<a href="/dashboard/contact">Xem tất cả</a>}
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={recentContacts}
                            renderItem={(item) => (
                                <List.Item
                                    extra={
                                        <Tag color={statusConfig[item.status].color}>
                                            {statusConfig[item.status].text}
                                        </Tag>
                                    }
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Badge dot={item.status === 'new'}>
                                                <Avatar style={{ backgroundColor: '#1677ff' }}>
                                                    {item.name.charAt(0)}
                                                </Avatar>
                                            </Badge>
                                        }
                                        title={`${item.name} — ${item.phone}`}
                                        description={`Quan tâm: ${item.productName} · ${item.createdAt}`}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>

                {/* Sản phẩm được xem/quan tâm nhiều nhất */}
                <Col xs={24} lg={8}>
                    <Card
                        title="Sản phẩm được quan tâm nhất"
                        bordered={false}
                        style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
                    >
                        <List
                            dataSource={[
                                { name: 'Đàn Guitar Taylor 214ce', views: 320, contacts: 12 },
                                { name: 'Piano Roland RP-30', views: 280, contacts: 9 },
                                { name: 'Sáo Trúc Cao Cấp', views: 195, contacts: 4 },
                            ]}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%' }}>
                                        <Avatar shape="square" style={{ backgroundColor: '#f0f0f0', color: '#1677ff', fontWeight: 700 }}>
                                            {index + 1}
                                        </Avatar>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 500 }}>{item.name}</div>
                                            <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                                                {item.views} lượt xem · {item.contacts} liên hệ
                                            </div>
                                        </div>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default AdminCard;