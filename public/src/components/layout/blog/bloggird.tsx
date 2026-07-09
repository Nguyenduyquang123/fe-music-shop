'use client'
import { Skeleton, Empty } from 'antd'
import Link from 'next/link'
import type { Blog } from '@/public/src/types/blog.types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000'

const toUrl = (path: string | null | undefined) => {
    if (!path) return 'https://placehold.co/600x400?text=No+Image'
    if (path.startsWith('http')) return path
    return `${BASE_URL}/storage/${path}`
}

const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('vi-VN', {
        day: '2-digit', month: 'long', year: 'numeric',
    })

const SkeletonCard = () => (
    <div className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/30 p-4">
        <Skeleton.Image active style={{ width: '100%', height: 180, borderRadius: 8 }} />
        <Skeleton active paragraph={{ rows: 3 }} style={{ marginTop: 16 }} />
    </div>
)

interface Props {
    blogs: Blog[]
    loading: boolean
}

const BlogGrid = ({ blogs, loading }: Props) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
        )
    }

    if (!blogs.length) {
        return (
            <div className="py-24 flex justify-center">
                <Empty description="Không tìm thấy bài viết nào" />
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {blogs.map((blog) => (
                <article
                    key={blog.id}
                    className="group bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/30 hover:concert-glow transition-all duration-500"
                >
                    <div className="relative aspect-video overflow-hidden">
                        <img
                            src={toUrl(blog.thumbnail)}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            onError={(e) => {
                                e.currentTarget.onerror = null
                                e.currentTarget.src = 'https://placehold.co/600x400?text=No+Image'
                            }}
                        />
                        {blog.blog_category && (
                            <div className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-full">
                                <span className="text-[12px] font-bold text-on-primary uppercase">
                                    {blog.blog_category.name}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-[16px] text-primary">calendar_today</span>
                            <span className="text-label-sm font-label-sm text-outline">
                                {formatDate(blog.created_at)}
                            </span>
                        </div>
                        <h2 className="text-headline-md font-headline-md text-on-surface mb-4 line-clamp-2 min-h-[3.2em] group-hover:text-primary transition-colors">
                            {blog.title}
                        </h2>
                        {blog.excerpt && (
                            <p className="text-body-md font-body-md text-on-surface-variant line-clamp-3 mb-6">
                                {blog.excerpt}
                            </p>
                        )}
                        <Link
                            href={`/blog/${blog.slug}-${blog.id}`}
                            className="inline-flex items-center gap-2 text-primary font-bold group/btn"
                        >
                            Đọc thêm
                            <span className="material-symbols-outlined group-hover/btn:translate-x-1 transition-transform">
                                arrow_forward
                            </span>
                        </Link>
                    </div>
                </article>
            ))}
        </div>
    )
}

export default BlogGrid