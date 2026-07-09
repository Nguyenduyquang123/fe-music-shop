'use client'
import { useEffect, useState, useCallback } from 'react'
import BlogSearch from './blogsearch'
import BlogCategory from './blogcategory'
import BlogGrid from './bloggird'
import BlogPagination from './blogpagination'
import { clientBlogService } from '@/public/src/services/client/client.blog.service'
import type { Blog, BlogCategory as BlogCategoryType } from '@/public/src/types/blog.types'

const ITEMS_PER_PAGE = 9

const Blog = () => {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [categories, setCategories] = useState<BlogCategoryType[]>([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [keyword, setKeyword] = useState('')
    const [categoryId, setCategoryId] = useState<number | null>(null)

    useEffect(() => {
        clientBlogService.getCategories()
            .then((res) => setCategories(res.data ?? res.items ?? res))
            .catch(() => {})
    }, [])

    const fetchBlogs = useCallback(async () => {
        setLoading(true)
        try {
            const res = await clientBlogService.getBlogs({
                page,
                is_published: true,
                ...(keyword && { keyword }),
                ...(categoryId && { category_id: categoryId }),
            })
            setBlogs(res.data ?? res.items ?? [])
            setTotal(res.meta?.total ?? res.total ?? 0)
        } catch {
            setBlogs([])
        } finally {
            setLoading(false)
        }
    }, [page, keyword, categoryId])

    useEffect(() => { fetchBlogs() }, [fetchBlogs])

    const handleSearch = (value: string) => { setKeyword(value); setPage(1) }
    const handleCategoryChange = (id: number | null) => { setCategoryId(id); setPage(1) }
    const handlePageChange = (p: number) => {
        setPage(p)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

    return (
        <main className="pt-32 pb-24 px-margin-desktop max-w-container-max mx-auto">
            <div className="mb-16 text-center">
                <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-4">
                    <span className="text-primary text-label-sm font-label-sm tracking-wider">
                        TIN TỨC &amp; KINH NGHIỆM
                    </span>
                </div>
                <h1 className="text-display-lg font-display-lg text-on-surface mb-6">
                    Góc Chia Sẻ Âm Nhạc
                </h1>
                <p className="text-body-lg font-body-lg text-on-surface-variant max-w-[720px] mx-auto">
                    Khám phá những bí quyết bảo quản nhạc cụ, hướng dẫn chọn đàn cho người mới bắt đầu và những câu chuyện truyền cảm hứng từ giới nghệ sĩ.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-gutter">
                <aside className="w-full lg:w-1/4 order-1 lg:order-2">
                    <div className="sticky top-32 space-y-6">
                        <BlogSearch onSearch={handleSearch} />
                        <BlogCategory
                            categories={categories}
                            activeId={categoryId}
                            onChange={handleCategoryChange}
                        />
                    </div>
                </aside>
                <div className="w-full lg:w-3/4 order-2 lg:order-1">
                    <BlogGrid blogs={blogs} loading={loading} />
                    {totalPages > 1 && (
                        <BlogPagination
                            currentPage={page}
                            totalPages={totalPages}
                            onChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
        </main>
    )
}

export default Blog