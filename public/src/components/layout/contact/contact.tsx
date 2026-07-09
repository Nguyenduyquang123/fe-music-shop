'use client'
import { useEffect, useState } from 'react'
import { Form, Input, Button, Select, message, Skeleton, Row, Col } from 'antd'
import {
    EnvironmentOutlined, PhoneOutlined,
    MailOutlined, ClockCircleOutlined,
} from '@ant-design/icons'
import { clientContentService } from '@/public/src/services/client/client.content.service'
import { sendRequest } from '@/public/src/library/api'
import type { ContactContent } from '@/public/src/types/content.types'

const DEFAULT_CONTACT: ContactContent = {
    address: '123 Đường Nghệ Thuật, Quận 1, TP. Hồ Chí Minh',
    phone: '1900 8888 - 090 123 4567',
    email: 'contact@nhaccuviet.vn',
    working_hours: '8:00 - 21:00, Thứ 2 - Chủ nhật',
    zalo_link: '#',
    facebook_link: '#',
    youtube_link: '#',
    map_embed: '',
}

interface ContactFormValues {
    full_name: string
    phone: string
    subject: string
    note: string
}

const CONTACT_INFO = [
    { icon: <EnvironmentOutlined />, label: 'Địa chỉ', key: 'address' as keyof ContactContent },
    { icon: <PhoneOutlined />, label: 'Điện thoại', key: 'phone' as keyof ContactContent },
    { icon: <MailOutlined />, label: 'Email', key: 'email' as keyof ContactContent },
    { icon: <ClockCircleOutlined />, label: 'Giờ làm việc', key: 'working_hours' as keyof ContactContent },
]

const ContactPage = () => {
    const [contact, setContact] = useState<ContactContent>(DEFAULT_CONTACT)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [form] = Form.useForm<ContactFormValues>()

    useEffect(() => {
        clientContentService.getContact()
            .then((res) => {
                const data = res.data ?? res
                if (data && Object.keys(data).length > 0) {
                    setContact({ ...DEFAULT_CONTACT, ...data })
                }
            })
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    const handleSubmit = async (values: ContactFormValues) => {
        setSubmitting(true)
        try {
            await sendRequest({
                url: '/api/contacts',
                method: 'POST',
                body: JSON.stringify({
                    full_name: values.full_name,
                    phone: values.phone,
                    note: `[${values.subject}] ${values.note}`,
                }),
            })
            message.success('Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ lại sớm nhất.')
            form.resetFields()
        } catch {
            message.error('Có lỗi xảy ra, vui lòng thử lại.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <main className="pt-24">
            {/* Hero */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-surface-container-low">
                <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/80 z-10" />
                <div className="relative z-10 text-center px-margin-mobile">
                    <h1 className="font-display-lg text-display-lg text-primary mb-4">Kết Nối Với Chúng Tôi</h1>
                    <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                        Chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng niềm đam mê âm nhạc của bạn.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="max-w-container-max mx-auto px-margin-desktop py-20">
                {loading ? (
                    <Row gutter={[32, 32]}>
                        <Col xs={24} lg={10}><Skeleton active paragraph={{ rows: 8 }} /></Col>
                        <Col xs={24} lg={14}><Skeleton active paragraph={{ rows: 10 }} /></Col>
                    </Row>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
                        {/* Info */}
                        <div className="lg:col-span-5 space-y-12">
                            <div>
                                <h2 className="font-headline-lg text-headline-lg text-primary mb-8">
                                    Thông Tin Liên Hệ
                                </h2>
                                <div className="space-y-6">
                                    {CONTACT_INFO.map((item) => (
                                        <div key={item.key} className="flex items-start gap-4">
                                            <div className="bg-surface-container-high p-3 rounded-xl border border-outline-variant/30 text-primary text-xl">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                                                    {item.label}
                                                </h4>
                                                <p className="font-body-md text-body-md text-on-surface mt-1">
                                                    {contact[item.key] as string || '—'}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Social */}
                            <div>
                                <h3 className="font-headline-md text-headline-md text-on-surface mb-6">
                                    Kết nối mạng xã hội
                                </h3>
                                <div className="flex gap-4">
                                    {contact.facebook_link && contact.facebook_link !== '#' && (
                                        <a href={contact.facebook_link} target="_blank" rel="noopener noreferrer"
                                            className="bg-surface-container-high p-4 rounded-full border border-outline-variant/30 text-primary hover:bg-primary hover:text-on-primary transition-all duration-300">
                                            <span className="material-symbols-outlined">forum</span>
                                        </a>
                                    )}
                                    {contact.zalo_link && contact.zalo_link !== '#' && (
                                        <a href={contact.zalo_link} target="_blank" rel="noopener noreferrer"
                                            className="bg-surface-container-high p-4 rounded-full border border-outline-variant/30 text-primary hover:bg-primary hover:text-on-primary transition-all duration-300">
                                            <span className="material-symbols-outlined">chat</span>
                                        </a>
                                    )}
                                    {contact.youtube_link && contact.youtube_link !== '#' && (
                                        <a href={contact.youtube_link} target="_blank" rel="noopener noreferrer"
                                            className="bg-surface-container-high p-4 rounded-full border border-outline-variant/30 text-primary hover:bg-primary hover:text-on-primary transition-all duration-300">
                                            <span className="material-symbols-outlined">public</span>
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Support card */}
                            <div className="bg-surface-container-high p-8 rounded-xl border border-primary/20 amber-glow relative overflow-hidden group">
                                <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                    <span className="material-symbols-outlined text-[120px]">support_agent</span>
                                </div>
                                <h3 className="font-headline-md text-headline-md text-primary mb-2">Hỗ trợ 24/7</h3>
                                <p className="font-body-md text-body-md text-on-surface-variant">
                                    Đội ngũ chuyên gia kỹ thuật luôn sẵn sàng giải đáp thắc mắc bất kể thời gian nào.
                                </p>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-7">
                            <div className="bg-surface-container-low p-8 md:p-12 rounded-xl border border-outline-variant/20 shadow-xl">
                                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-8">
                                    Gửi Tin Nhắn
                                </h2>
                                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Form.Item
                                            name="full_name"
                                            label={<span className="font-label-sm text-label-sm text-on-surface-variant">Họ và tên</span>}
                                            rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                                        >
                                            <input
                                                className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                                placeholder="Nhập tên của bạn"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="phone"
                                            label={<span className="font-label-sm text-label-sm text-on-surface-variant">Số điện thoại</span>}
                                            rules={[
                                                { required: true, message: 'Vui lòng nhập số điện thoại' },
                                                { pattern: /^(0|\+84)[0-9]{9,10}$/, message: 'Số điện thoại không hợp lệ' },
                                            ]}
                                        >
                                            <input
                                                className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                                placeholder="Nhập số điện thoại"
                                                type="tel"
                                            />
                                        </Form.Item>
                                    </div>

                                    <Form.Item
                                        name="subject"
                                        label={<span className="font-label-sm text-label-sm text-on-surface-variant">Chủ đề</span>}
                                        rules={[{ required: true, message: 'Vui lòng chọn chủ đề' }]}
                                    >
                                        <select className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all">
                                            <option value="Tư vấn sản phẩm">Tư vấn sản phẩm</option>
                                            <option value="Chính sách bảo hành">Chính sách bảo hành</option>
                                            <option value="Góp ý dịch vụ">Góp ý dịch vụ</option>
                                            <option value="Hợp tác kinh doanh">Hợp tác kinh doanh</option>
                                        </select>
                                    </Form.Item>

                                    <Form.Item
                                        name="note"
                                        label={<span className="font-label-sm text-label-sm text-on-surface-variant">Nội dung tin nhắn</span>}
                                        rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
                                    >
                                        <textarea
                                            className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                                            rows={5}
                                            placeholder="Chúng tôi có thể giúp gì cho bạn?"
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            loading={submitting}
                                            block
                                            size="large"
                                            style={{ height: 56, fontSize: 16, fontWeight: 700 }}
                                        >
                                            Gửi Yêu Cầu
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* Map */}
            {contact.map_embed && (
                <section className="w-full h-[500px] relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                    <div
                        className="w-full h-full"
                        dangerouslySetInnerHTML={{ __html: contact.map_embed }}
                        style={{ pointerEvents: 'none' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 pointer-events-none" />
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-surface-container-highest/90 backdrop-blur-md px-8 py-4 rounded-full border border-primary/30 flex items-center gap-4 shadow-2xl">
                        <span className="material-symbols-outlined text-primary">near_me</span>
                        <p className="font-label-sm text-on-surface">{contact.address}</p>
                    </div>
                </section>
            )}
        </main>
    )
}

export default ContactPage