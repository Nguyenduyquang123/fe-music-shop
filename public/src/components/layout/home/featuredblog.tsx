'use client'
import { useEffect, useState } from 'react'
import { Skeleton, Tag } from 'antd'
import Link from 'next/link'
import { clientBlogService } from '@/public/src/services/client/client.blog.service'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000'

const toUrl = (path: string | null | undefined) => {
    if (!path) return 'https://placehold.co/600x400?text=No+Image'
    if (path.startsWith('http')) return path
    return `${BASE_URL}/storage/${path}`
}

interface BlogItem {
    id: number
    title: string
    slug: string
    excerpt?: string
    thumbnail?: string
    blog_category?: { name: string }
    created_at: string
    is_published?: boolean
}

const STATIC_BLOGS = [
    {
        id: 1, title: '5 Bước Chọn Đàn Guitar Cho Người Mới Bắt Đầu',
        slug: '5-buoc-chon-dan-guitar',
        excerpt: 'Việc chọn cây đàn đầu tiên là vô cùng quan trọng...',
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASz9FPivextkjMXZgqae1v6rizqFWU2vl2whVpsCcAA4L4F_dparF9vuKa0v6rERZgG1oMaUfoB2eZTrERw8S7-EBCvjGP2d7K4bK3BZA6GA0IMKj6tfVku4Ribq4UXdVbJKjGSz2dbu3gyjhAT9pD0w7Bx-RVCxp05jIVxVvQffld3L75dAx8SAb3bxaJB3Xmo6l39VmYiw5Ml_BKJCTxJVFmXQKDBfeWbZlKDitfIGd-9l_eBSVcmkApoMxTq6mHkSOX8zvqmzE',
        blog_category: { name: 'Kinh nghiệm' }, created_at: '',
    },
    {
        id: 2, title: 'Cách Bảo Quản Nhạc Cụ Trong Thời Tiết Nồm Ẩm',
        slug: 'bao-quan-nhac-cu',
        excerpt: 'Khí hậu Việt Nam rất khắc nghiệt với các dòng đàn gỗ...',
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbnVvTzHKu7Tzi43Jt3llwZ2SeZB4zU2BLYdgbmkMEG7_3aIyuH2vcaoUyze8P78Irw1saAbLOI3-319RdcxjKiEFpXwUdMpGR8zPZdrOgyfrQ-s2gZNpHPOo51b0eYmOvXypCNmDqf1f1ynGUGynZ3EMwxwR8zwgwGDFyzBO5dn9MZMvE1CrXqgwbJg0jPVWPHb4TjjURUUgd93oG5hx16TXeIAGbrvFD2LEAw6cNJWORubgFwah8-FlJUKN8erZ0DB_8DgIaRGU',
        blog_category: { name: 'Bảo quản' }, created_at: '',
    },
    {
        id: 3, title: 'Xu Hướng Piano Điện 2024: Công Nghệ Gõ Mới',
        slug: 'xu-huong-piano-dien-2024',
        excerpt: 'Các hãng lớn đang đua nhau ra mắt công nghệ phím hybrid...',
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPPfFTgEUAOYoYUDKCEp_7FqT_Wf2KHz-jtBNJwEbuprfA3j4YrQPY7lzgvrcGtnDeQloDco9hW9-ZvqoSjSoahOAWaWIbUjVFG98sE0Axu0LXHUiBhahwem_T9Yp3A-ZT0b1OrZs2qi2ikMjFhebvqW_xyayVmwU7jyadLePgKoTgZM6lAhr-vCcxD760GfsD7q6gU6-kzh5WaE3a_JO3gI_z2YNF1NY-AtjarYXCs4SEcm80L2IMRlGTS4sMXKagz6mfHxfZzYE',
        blog_category: { name: 'Xu hướng' }, created_at: '',
    },
]

const FeaturedblogPage = () => {
    const [blogs, setBlogs] = useState<BlogItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        clientBlogService.getBlogs()
            .then((res) => {
                const list = (res.data ?? res.items ?? []) as BlogItem[];
                const publishedBlogs = list.filter(blog => blog.is_published === true);
                    setBlogs(publishedBlogs.length > 0 ? publishedBlogs.slice(0, 3) : STATIC_BLOGS);
                })
            .catch(() => setBlogs(STATIC_BLOGS))
            .finally(() => setLoading(false))
    }, [])

    return (
        <section className="py-24 px-margin-desktop max-w-container-max mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-headline-lg font-headline-lg mb-4">Blog Mới Nhất</h2>
                <div className="w-24 h-1 bg-primary mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                {loading
                    ? Array.from({ length: 3 }).map((_, i) => (
                        <div key={i}>
                            <Skeleton.Image active style={{ width: '100%', height: 256, borderRadius: 16 }} />
                            <Skeleton active paragraph={{ rows: 3 }} style={{ marginTop: 24 }} />
                        </div>
                    ))
                    : blogs.map((blog) => (
                        <article key={blog.id} className="group">
                            <div className="relative h-64 mb-6 overflow-hidden rounded-2xl">
                                <img
                                    src={toUrl(blog.thumbnail)}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null
                                        e.currentTarget.src = 'https://placehold.co/600x400?text=No+Image'
                                    }}
                                />
                                {blog.blog_category && (
                                    <div className="absolute top-4 left-4">
                                        <Tag color="gold" style={{ fontWeight: 600, borderRadius: 999, padding: '2px 12px' }}>
                                            {blog.blog_category.name}
                                        </Tag>
                                    </div>
                                )}
                            </div>
                            <h3 className="text-headline-md font-headline-md group-hover:text-primary transition-colors cursor-pointer mb-2 line-clamp-2">
                                {blog.title}
                            </h3>
                            {blog.excerpt && (
                                <p className="text-body-md text-on-surface-variant line-clamp-3 mb-4">
                                    {blog.excerpt}
                                </p>
                            )}
                            <Link
                                href={`/blog/${blog.slug}-${blog.id}`}
                                className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all"
                            >
                                Đọc tiếp
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </Link>
                        </article>
                    ))}
            </div>
        </section>
    )
}

export default FeaturedblogPage