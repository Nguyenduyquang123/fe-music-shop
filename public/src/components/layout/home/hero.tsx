'use client'
import { useEffect, useState } from 'react'
import { Button, Skeleton } from 'antd'
import Link from 'next/link'
import { clientContentService } from '@/public/src/services/client/client.content.service'

const DEFAULT_BANNER = {
    title: 'Khám Phá Thế Giới Âm Nhạc!',
    subtitle: 'Đa dạng nhạc cụ chất lượng, giá tốt cho mọi đam mê âm nhạc. Từ những chiếc guitar thủ công đến những bộ trống uy lực nhất.',
    image: 'https://scontent.fvii2-4.fna.fbcdn.net/v/t39.30808-6/531256648_1502756667810938_5109795937734930495_n.jpg?stp=dst-jpg_tt6&cstp=mx1640x924&ctp=s1640x924&_nc_cat=104&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeE0ZV9cJH-I_6xJatJBP5oqaIWcYzDsFj5ohZxjMOwWPqm-HiZc538_60gTg1Lsbg6XEy11qIyfHHG7uYrs1nKB&_nc_ohc=y4tbhmug4iEQ7kNvwGDaz3u&_nc_oc=AdoC3jei9opUXElVCrHZ95CRhDoLZqnAh2Nx6lgjBGIGhVmMLP3bmdXBXil3jSHujFDo00znstrBLfgnffF8Mc_M&_nc_zt=23&_nc_ht=scontent.fvii2-4.fna&_nc_gid=VJgVyYPPA65DNuuP1hSi7Q&_nc_ss=7b2a8&oh=00_AQDYFkXxMmVWb8YK6gQ2Ul-xIGfiOZJak1lnGo9AxcV9JQ&oe=6A4D5687',
    button_text: 'MUA NGAY',
    button_link: '/product',
}

const HeroPage = () => {
    const [banner, setBanner] = useState(DEFAULT_BANNER)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        clientContentService.getBanners()
            .then((res) => {
                const list = res.data ?? res.items ?? res
                // Lấy banner active đầu tiên (đã sort theo sort_order)
                const active = Array.isArray(list)
                    ? list.find((b: any) => b.is_active)
                    : null
                if (active) {
                    setBanner({
                        title: active.title ?? DEFAULT_BANNER.title,
                        subtitle: active.subtitle ?? DEFAULT_BANNER.subtitle,
                        image: active.image ?? DEFAULT_BANNER.image,
                        button_text: active.button_text ?? DEFAULT_BANNER.button_text,
                        button_link: active.button_link ?? DEFAULT_BANNER.button_link,
                    })
                }
            })
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <section className="hero-section relative min-h-[819px] flex items-center bg-surface-container-low">
                <div className="px-margin-desktop max-w-container-max mx-auto w-full">
                    <Skeleton active paragraph={{ rows: 4 }} style={{ maxWidth: 500 }} />
                </div>
            </section>
        )
    }

    return (
        <section
            className="hero-section relative min-h-[819px] flex items-center overflow-hidden"
            style={{ backgroundImage: `url("${banner.image}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="absolute inset-0 bg-black/50 z-10" />
            <div className="relative z-20 px-margin-desktop max-w-container-max mx-auto w-full">
                <div className="space-y-6 max-w-2xl">
                    <h1 className="font-display-lg text-white text-display-lg leading-tight drop-shadow-lg">
                        {banner.title.includes('Thế Giới') ? (
                            <>
                                {banner.title.split('Thế Giới')[0]}
                                <span className="text-primary font-bold">Thế Giới</span>
                                {banner.title.split('Thế Giới')[1]}
                            </>
                        ) : banner.title}
                    </h1>
                    <p className="text-body-lg text-white/90 font-medium max-w-lg drop-shadow-md">
                        {banner.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link href={banner.button_link || '/product'}>
                            <Button
                                type="primary"
                                size="large"
                                className="metallic-sheen accent-glow"
                                style={{ height: 52, padding: '0 32px', fontWeight: 800, fontSize: 16 }}
                            >
                                {banner.button_text || 'MUA NGAY'}
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button
                                size="large"
                                style={{
                                    height: 52, padding: '0 32px',
                                    fontWeight: 800, fontSize: 16,
                                    borderWidth: 2, borderColor: '#fff',
                                    background: 'transparent', color: '#fff',
                                }}
                            >
                                TƯ VẤN NHANH
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroPage