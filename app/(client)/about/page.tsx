'use client'
import { useEffect, useState } from 'react'
import { Timeline, Statistic, Card, Row, Col, Button, Skeleton } from 'antd'
import {
    SafetyCertificateOutlined, CustomerServiceOutlined,
    CarOutlined, DollarOutlined, TrophyOutlined,
    TeamOutlined, ShopOutlined, StarOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import { clientContentService } from '@/public/src/services/client/client.content.service'
import type { AboutContent } from '@/public/src/types/content.types'

// Icon map cho features (backend không lưu icon, dùng theo index)
const FEATURE_ICONS = [
    <SafetyCertificateOutlined style={{ fontSize: 28, color: '#f5b800' }} />,
    <CustomerServiceOutlined style={{ fontSize: 28, color: '#f5b800' }} />,
    <CarOutlined style={{ fontSize: 28, color: '#f5b800' }} />,
    <DollarOutlined style={{ fontSize: 28, color: '#f5b800' }} />,
]

const STAT_ICONS = [
    <ShopOutlined />,
    <TeamOutlined />,
    <TrophyOutlined />,
    <StarOutlined />,
]

// Fallback khi chưa có DB
const DEFAULT_ABOUT: AboutContent = {
    hero_title: 'Hơn 12 Năm Đồng Hành Cùng Âm Nhạc Việt',
    hero_subtitle: 'Nhạc Cụ Việt tự hào là điểm đến tin cậy của hàng nghìn người yêu âm nhạc trên khắp cả nước.',
    story_title: 'Sinh Ra Từ Tình Yêu Âm Nhạc',
    story_content: 'Năm 2012, từ một cửa hàng nhỏ tại Hà Nội với chưa đầy 50 sản phẩm, Nhạc Cụ Việt ra đời từ niềm đam mê thuần túy với âm nhạc.',
    founded_year: '2012',
    location: 'Hà Nội, Việt Nam',
    stats: [
        { value: '12', suffix: '+', label: 'Năm kinh nghiệm' },
        { value: '5000', suffix: '+', label: 'Khách hàng tin tưởng' },
        { value: '500', suffix: '+', label: 'Sản phẩm chính hãng' },
        { value: '98', suffix: '%', label: 'Khách hàng hài lòng' },
    ],
    features: [
        { title: 'Chất Lượng Đảm Bảo', desc: 'Tất cả sản phẩm đều là hàng chính hãng 100%.' },
        { title: 'Hỗ Trợ Tận Tâm', desc: 'Đội ngũ chuyên gia âm nhạc tư vấn miễn phí.' },
        { title: 'Giao Hàng Toàn Quốc', desc: 'Đóng gói chuyên biệt, giao hàng an toàn.' },
        { title: 'Giá Cả Cạnh Tranh', desc: 'Cam kết giá tốt nhất thị trường.' },
    ],
    team: [
        { name: 'Nguyễn Văn Minh', role: 'Giám đốc & Nhà sáng lập', desc: '20 năm kinh nghiệm trong ngành âm nhạc.', avatar: 'NM' },
        { name: 'Trần Thị Lan', role: 'Giám đốc Kỹ thuật', desc: 'Chuyên gia chỉnh âm và bảo trì nhạc cụ.', avatar: 'TL' },
        { name: 'Phạm Đức Hùng', role: 'Trưởng phòng Tư vấn', desc: 'Guitarist chuyên nghiệp, tốt nghiệp Berklee.', avatar: 'PH' },
    ],
}

const AboutPage = () => {
    const [data, setData] = useState<AboutContent>(DEFAULT_ABOUT)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        clientContentService.getAbout()
            .then((res) => {
                const about = res.data ?? res
                if (about && Object.keys(about).length > 0) {
                    setData({ ...DEFAULT_ABOUT, ...about })
                }
                console.log('about',about)
            })
            .catch(() => {}) // giữ fallback
            .finally(() => setLoading(false))
    }, [])

    const timelineItems = [
        {
            color: '#f5b800',
            children: (
                <div>
                    <p className="font-label-sm text-label-sm text-primary font-bold mb-1">{data.founded_year}</p>
                    <p className="font-headline-md text-on-surface font-bold mb-1">Thành Lập</p>
                    <p className="text-body-md text-on-surface-variant">
                        Nhạc Cụ Việt ra đời từ niềm đam mê âm nhạc, bắt đầu với cửa hàng nhỏ tại {data.location}.
                    </p>
                </div>
            ),
        },
        {
            color: '#f5b800',
            children: (
                <div>
                    <p className="font-label-sm text-label-sm text-primary font-bold mb-1">2015</p>
                    <p className="font-headline-md text-on-surface font-bold mb-1">Mở Rộng</p>
                    <p className="text-body-md text-on-surface-variant">
                        Mở thêm chi nhánh tại TP.HCM và Đà Nẵng. Trở thành đại lý chính thức của Yamaha và Roland.
                    </p>
                </div>
            ),
        },
        {
            color: '#f5b800',
            children: (
                <div>
                    <p className="font-label-sm text-label-sm text-primary font-bold mb-1">2019</p>
                    <p className="font-headline-md text-on-surface font-bold mb-1">Chuyển Đổi Số</p>
                    <p className="text-body-md text-on-surface-variant">
                        Ra mắt nền tảng trực tuyến, phục vụ khách hàng toàn quốc.
                    </p>
                </div>
            ),
        },
        {
            color: '#f5b800',
            children: (
                <div>
                    <p className="font-label-sm text-label-sm text-primary font-bold mb-1">2024</p>
                    <p className="font-headline-md text-on-surface font-bold mb-1">Hôm Nay</p>
                    <p className="text-body-md text-on-surface-variant">
                        Hơn {data.stats[1]?.value}{data.stats[1]?.suffix} khách hàng tin tưởng.
                    </p>
                </div>
            ),
        },
    ]

    if (loading) {
        return (
            <main className="pt-24">
                <div className="px-margin-desktop max-w-container-max mx-auto py-24">
                    <Skeleton active paragraph={{ rows: 4 }} style={{ marginBottom: 48 }} />
                    <Row gutter={[24, 24]}>
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Col key={i} xs={24} sm={12} lg={6}>
                                <Skeleton active paragraph={{ rows: 3 }} />
                            </Col>
                        ))}
                    </Row>
                </div>
            </main>
        )
    }

    return (
        <main>
            {/* HERO */}
            <section className="hero-section relative min-h-[500px] flex items-center overflow-hidden bg-surface-container-low">
                <div className="absolute  inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
                <div className="relative z-20 px-margin-desktop max-w-container-max mx-auto w-full py-24">
                    <div className="max-w-2xl">
                        <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-6">
                            <span className="text-primary text-label-sm font-label-sm tracking-wider">VỀ CHÚNG TÔI</span>
                        </div>
                        <h1 className="font-display-lg text-display-lg text-on-surface leading-tight mb-6">
                            {data.hero_title.split(' ').slice(0, 3).join(' ')}<br />
                            <span className="text-primary">{data.hero_title.split(' ').slice(3, 5).join(' ')}</span>{' '}
                            {data.hero_title.split(' ').slice(5).join(' ')}
                        </h1>
                        <p className="text-body-lg font-body-lg text-on-surface-variant mb-8 max-w-lg">
                            {data.hero_subtitle}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/product">
                                <Button type="primary" size="large"
                                    style={{ height: 52, padding: '0 32px', fontWeight: 700, fontSize: 15 }}>
                                    Khám phá sản phẩm
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button size="large"
                                    style={{ height: 52, padding: '0 32px', fontWeight: 700, fontSize: 15 }}>
                                    Liên hệ chúng tôi
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="hero-section py-16 bg-primary">
                <div className="px-margin-desktop max-w-container-max mx-auto">
                    <Row gutter={[32, 32]}>
                        {data.stats.map((stat, i) => (
                            <Col key={i} xs={12} md={6}>
                                <div className="text-center">
                                    <div className="text-4xl mb-3 text-on-primary opacity-80">
                                        {STAT_ICONS[i] ?? <ShopOutlined />}
                                    </div>
                                    <Statistic
                                        value={Number(stat.value) || stat.value}
                                        suffix={stat.suffix}
                                        valueStyle={{ fontSize: 40, fontWeight: 800, color: '#000000', lineHeight: 1 }}
                                    />
                                    <p className="text-on-primary font-label-sm text-label-sm mt-2 opacity-80">
                                        {stat.label}
                                    </p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            {/* STORY */}
            <section className="py-24">
                <div className="px-margin-desktop max-w-container-max mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
                        <div className="lg:col-span-5 relative h-[480px] rounded-2xl overflow-hidden group">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZp-RCrRYArdPZ_4wY0H_2hVn6FmQQYXVMGkLWJk5zx7eCAWkVH_m2EnhRrruhohCn064EITw3P1imDa3HVuBQ-lbQ6JdPxNw-sIzqjow7SBycmlHXY1SmM-TByHE0J4mkEjoEdVBblLIfIEr8B67Sv85z77U0YJGX7UaBf8U8cKBciuKrwJQumT_N6Xh5P3wFx8fwsgkLH_jLfSG_z9_1RciGnKO5ieZaHBNJ5084PnU58GLYjlAkVtBKV7PDfMsRxQWlUn0y2LQ"
                                alt="Showroom Nhạc Cụ Việt"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="bg-primary px-4 py-3 rounded-xl inline-block">
                                    <p className="font-bold text-on-primary text-label-sm">Since {data.founded_year}</p>
                                    <p className="font-bold text-on-primary">{data.location}</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-7 lg:pl-12 space-y-6">
                            <div>
                                <span className="text-primary text-label-sm font-label-sm font-bold uppercase tracking-widest">
                                    Câu chuyện của chúng tôi
                                </span>
                                <h2 className="font-display-lg text-display-lg text-on-surface leading-tight mt-3">
                                    {data.story_title}
                                </h2>
                            </div>
                            <p className="text-body-lg font-body-lg text-on-surface-variant whitespace-pre-line">
                                {data.story_content}
                            </p>
                            {data.team[0] && (
                                <div className="flex items-center gap-4 pt-4">
                                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center font-bold text-on-primary text-xl flex-shrink-0">
                                        {data.team[0].avatar}
                                    </div>
                                    <div>
                                        <p className="font-bold text-on-surface">{data.team[0].name}</p>
                                        <p className="text-on-surface-variant text-label-sm font-label-sm">
                                            {data.team[0].role}, Nhạc Cụ Việt
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="hero-section py-24 bg-surface-container-low">
                <div className="px-margin-desktop max-w-container-max mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-primary text-label-sm font-label-sm font-bold uppercase tracking-widest">
                            Tại sao chọn chúng tôi
                        </span>
                        <h2 className="font-headline-lg text-headline-lg text-on-surface mt-3 mb-4">
                            Cam Kết Của Nhạc Cụ Việt
                        </h2>
                        <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
                    </div>
                    <Row gutter={[24, 24]}>
                        {data.features.map((f, i) => (
                            <Col key={i} xs={24} sm={12} lg={6}>
                                <Card bordered={false} hoverable style={{
                                    height: '100%', borderRadius: 16,
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center',
                                }}>
                                    <div style={{
                                        width: 64, height: 64, background: '#fff9e6', borderRadius: 16,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 16px', border: '1px solid #ffd600',
                                    }}>
                                        {FEATURE_ICONS[i] ?? <SafetyCertificateOutlined style={{ fontSize: 28, color: '#f5b800' }} />}
                                    </div>
                                    <h4 className="font-headline-md text-on-surface mb-3" style={{ fontSize: 18 }}>
                                        {f.title}
                                    </h4>
                                    <p className="text-body-md font-body-md text-on-surface-variant">{f.desc}</p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            {/* TIMELINE */}
            <section className=" py-24">
                <div className="px-margin-desktop max-w-container-max mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-primary text-label-sm font-label-sm font-bold uppercase tracking-widest">
                            Hành trình phát triển
                        </span>
                        <h2 className="font-headline-lg text-headline-lg text-on-surface mt-3 mb-4">
                            Các Cột Mốc Quan Trọng
                        </h2>
                        <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
                    </div>
                    <div className="max-w-2xl mx-auto">
                        <Timeline mode="left" items={timelineItems} />
                    </div>
                </div>
            </section>

            {/* TEAM */}
            <section className="hero-section py-24 bg-surface-container-low">
                <div className="px-margin-desktop max-w-container-max mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-primary text-label-sm font-label-sm font-bold uppercase tracking-widest">
                            Đội ngũ
                        </span>
                        <h2 className="font-headline-lg text-headline-lg text-on-surface mt-3 mb-4">
                            Những Người Đứng Sau NCV
                        </h2>
                        <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
                    </div>
                    <Row gutter={[24, 24]} justify="center">
                        {data.team.map((member, i) => (
                            <Col key={i} xs={24} sm={12} lg={8}>
                                <Card bordered={false} hoverable style={{
                                    borderRadius: 16, textAlign: 'center',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                }}>
                                    <div style={{
                                        width: 80, height: 80, borderRadius: '50%',
                                        background: '#f5b800', color: '#000',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 800, fontSize: 24, margin: '0 auto 16px',
                                        border: '3px solid #ffd600',
                                    }}>
                                        {member.avatar}
                                    </div>
                                    <h3 className="font-headline-md text-on-surface font-bold mb-1" style={{ fontSize: 18 }}>
                                        {member.name}
                                    </h3>
                                    <p className="text-primary font-label-sm text-label-sm font-bold mb-3">{member.role}</p>
                                    <p className="text-body-md font-body-md text-on-surface-variant">{member.desc}</p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            {/* CTA */}
            <section className="hero-section py-24 bg-primary">
                <div className="px-margin-desktop max-w-container-max mx-auto text-center">
                    <h2 className="font-display-lg text-display-lg text-on-primary mb-6">
                        Bắt Đầu Hành Trình<br />Âm Nhạc Của Bạn
                    </h2>
                    <p className="text-body-lg font-body-lg text-on-primary/80 max-w-xl mx-auto mb-10">
                        Hàng trăm nhạc cụ chính hãng đang chờ bạn khám phá.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/product">
                            <Button size="large" style={{
                                height: 52, padding: '0 40px', fontWeight: 700, fontSize: 16,
                                background: '#000', color: '#f5b800', border: 'none',
                            }}>Xem sản phẩm</Button>
                        </Link>
                        <Link href="/contact">
                            <Button size="large" style={{
                                height: 52, padding: '0 40px', fontWeight: 700, fontSize: 16,
                                background: 'transparent', color: '#000', border: '2px solid #000',
                            }}>Liên hệ tư vấn</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default AboutPage