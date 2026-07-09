'use client'
import { useEffect, useState } from 'react'
import { Button, Skeleton } from 'antd'
import {
    SafetyCertificateOutlined,
    CustomerServiceOutlined,
    CarOutlined,
    DollarOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import { clientContentService } from '@/public/src/services/client/client.content.service'
import type { AboutContent } from '@/public/src/types/content.types'

const FEATURE_ICONS = [
    <SafetyCertificateOutlined style={{ fontSize: 20 }} />,
    <CustomerServiceOutlined style={{ fontSize: 20 }} />,
    <CarOutlined style={{ fontSize: 20 }} />,
    <DollarOutlined style={{ fontSize: 20 }} />,
]

const DEFAULT_FEATURES = [
    { title: 'Chất Lượng Đảm Bảo', desc: 'Cam kết chính hãng 100%, bảo hành uy tín.' },
    { title: 'Hỗ Trợ Tận Tâm', desc: 'Tư vấn và điều chỉnh nhạc cụ theo yêu cầu.' },
    { title: 'Giao Hàng Nhanh', desc: 'Vận chuyển an toàn, nhanh chóng toàn quốc.' },
    { title: 'Giá Cả Cạnh Tranh', desc: 'Nhiều phân khúc giá cho mọi đối tượng.' },
]

const AboutSectionPage = () => {
    const [about, setAbout] = useState<Partial<AboutContent>>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        clientContentService.getAbout()
            .then((res) => {
                const data = res.data ?? res
                if (data && Object.keys(data).length > 0) setAbout(data)
            })
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    const features = about.features?.length ? about.features : DEFAULT_FEATURES
    const foundedYear = about.founded_year ?? '2012'
    const storyTitle = about.story_title ?? 'Hành Trình Âm Nhạc Của Bạn'
    const heroSubtitle = about.hero_subtitle ?? 'Nhạc Cụ Việt tự hào là điểm đến tin cậy của cộng đồng yêu nhạc. Chúng tôi không chỉ bán nhạc cụ, chúng tôi mang đến những giải pháp âm thanh chuyên nghiệp và niềm cảm hứng sáng tạo vô tận.'

    if (loading) {
        return (
            <section className="py-24 bg-surface-container-low">
                <div className="px-margin-desktop max-w-container-max mx-auto">
                    <Skeleton active paragraph={{ rows: 6 }} />
                </div>
            </section>
        )
    }

    return (
        <section className="py-24 bg-surface-container-low">
            <div className="px-margin-desktop max-w-container-max mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

                    {/* Ảnh */}
                    <div className="lg:col-span-5 relative h-96 lg:h-auto rounded-2xl overflow-hidden group">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZp-RCrRYArdPZ_4wY0H_2hVn6FmQQYXVMGkLWJk5zx7eCAWkVH_m2EnhRrruhohCn064EITw3P1imDa3HVuBQ-lbQ6JdPxNw-sIzqjow7SBycmlHXY1SmM-TByHE0J4mkEjoEdVBblLIfIEr8B67Sv85z77U0YJGX7UaBf8U8cKBciuKrwJQumT_N6Xh5P3wFx8fwsgkLH_jLfSG_z9_1RciGnKO5ieZaHBNJ5084PnU58GLYjlAkVtBKV7PDfMsRxQWlUn0y2LQ"
                            alt="Nhạc Cụ Việt showroom"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex flex-col justify-end p-8">
                            <p className="text-primary font-bold mb-2">Since {foundedYear}</p>
                            <h3 className="text-headline-lg font-headline-lg">{storyTitle}</h3>
                        </div>
                    </div>

                    {/* Nội dung */}
                    <div className="lg:col-span-7 flex flex-col justify-center space-y-8 lg:pl-12">
                        <div className="space-y-4">
                            <h2 className="text-display-lg font-display-lg leading-tight">Về Chúng Tôi</h2>
                            <p className="text-body-lg font-body-lg text-on-surface-variant">
                                {heroSubtitle}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {features.slice(0, 4).map((f, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-xl text-primary flex-shrink-0">
                                        {FEATURE_ICONS[i] ?? <SafetyCertificateOutlined style={{ fontSize: 20 }} />}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">{f.title}</h4>
                                        <p className="text-label-sm text-on-surface-variant">{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div>
                            <Link href="/product">
                                <Button
                                    type="primary"
                                    size="large"
                                    className="metallic-sheen accent-glow"
                                    style={{ height: 52, padding: '0 40px', fontWeight: 700, fontSize: 15 }}
                                >
                                    MUA SẮM NGAY
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSectionPage