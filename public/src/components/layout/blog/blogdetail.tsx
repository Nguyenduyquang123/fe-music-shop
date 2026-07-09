'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Breadcrumb, Skeleton, Tag, Empty, Button, message } from 'antd'
import { ShareAltOutlined, MessageOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { clientBlogService } from '@/public/src/services/client/client.blog.service'
import type { Blog } from '@/public/src/types/blog.types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000'

const toUrl = (path: string | null | undefined) => {
  if (!path) return 'https://placehold.co/1200x600?text=No+Image'
  if (path.startsWith('http')) return path
  return `${BASE_URL}/storage/${path}`
}

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit', month: 'long', year: 'numeric',
  })

const readingTime = (content: string) => {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

const BlogDetailPage = () => {
  const params = useParams()
  const router = useRouter()
  const slug = params?.id as string;
  const productId = slug ? Number(slug.split('-').pop()) : null;


  const [blog, setBlog] = useState<Blog | null>(null)
  const [related, setRelated] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!productId) return
    const fetchData = async () => {
      setLoading(true)
      try {
        // Gọi theo slug hoặc id tùy API
        const res = await clientBlogService.getBlog(productId)
        const data = res.data ?? res
        setBlog(data)

        if (data.id) {
          const relRes = await clientBlogService.getRelatedBlogs(data.id)
          setRelated(relRes.data ?? relRes.items ?? [])
        }
      } catch {
        message.error('Không tải được bài viết')
        router.push('/blog')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [slug, router])

  const handleShare = (type: 'facebook' | 'zalo') => {
    const url = encodeURIComponent(window.location.href)
    const link =
      type === 'facebook'
        ? `https://www.facebook.com/sharer/sharer.php?u=${url}`
        : `https://zalo.me/share/url?url=${url}`
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  if (loading) {
    return (
      <main className="pt-32 pb-24 max-w-container-max mx-auto px-margin-desktop">
        <Skeleton active paragraph={{ rows: 2 }} style={{ marginBottom: 32 }} />
        <Skeleton.Image active style={{ width: '100%', height: 500, borderRadius: 12, marginBottom: 32 }} />
        <div className="flex gap-16">
          <div className="flex-1">
            <Skeleton active paragraph={{ rows: 15 }} />
          </div>
          <div style={{ width: 320 }}>
            <Skeleton active paragraph={{ rows: 8 }} />
          </div>
        </div>
      </main>
    )
  }

  if (!blog) {
    return (
      <main className="pt-32 pb-24 flex justify-center">
        <Empty description="Không tìm thấy bài viết" />
      </main>
    )
  }

  const minutes = readingTime(blog.content)

  return (
    <>
      {/* Breadcrumb */}
      <div className="max-w-container-max mx-auto px-margin-desktop mb-8 pt-24">
        <Breadcrumb
          items={[
            { title: <Link href="/">Trang chủ</Link> },
            { title: <Link href="/blog">Blog</Link> },
            { title: blog.title },
          ]}
        />
      </div>

      {/* Article Header */}
      <header className="max-w-container-max mx-auto px-margin-desktop mb-12">
        <div className="relative h-[614px] w-full overflow-hidden rounded-xl mb-8 group">
          <img
            src={toUrl(blog.thumbnail)}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = 'https://placehold.co/1200x600?text=No+Image'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-12 left-12 right-12">
            <div className="flex gap-3 mb-4">
              {blog.blog_category && (
                <Tag
                  color="gold"
                  style={{
                    borderRadius: 999,
                    fontWeight: 700,
                    fontSize: 12,
                    padding: '2px 12px',
                    border: 'none',
                  }}
                >
                  {blog.blog_category.name.toUpperCase()}
                </Tag>
              )}
            </div>
            <h1 className="text-display-lg font-display-lg text-on-surface mb-6 max-w-4xl">
              {blog.title}
            </h1>
            <div className="flex items-center gap-6 text-on-surface-variant font-body-md flex-wrap">
              {blog.user && (
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">person</span>
                  <span>{blog.user.full_name}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">calendar_today</span>
                <span>{formatDate(blog.created_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">schedule</span>
                <span>{minutes} phút đọc</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">visibility</span>
                <span>{blog.view_count.toLocaleString()} lượt xem</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Article Body */}
      <div className="max-w-container-max mx-auto px-margin-desktop flex flex-col lg:flex-row gap-16 pb-24">
        {/* Main */}
        <article className="lg:w-2/3 article-content">
          {/* Excerpt nổi bật */}
          {blog.excerpt && (
            <div className="bg-surface-container-high p-8 rounded-xl border-l-4 border-primary my-10 relative overflow-hidden">
              <div className="relative z-10">
                <span className="material-symbols-outlined text-primary opacity-30 text-5xl absolute -top-4 -left-4">
                  format_quote
                </span>
                <blockquote className="text-headline-md font-headline-md italic text-on-surface-variant leading-relaxed">
                  "{blog.excerpt}"
                </blockquote>
              </div>
            </div>
          )}

          {/* Nội dung HTML từ Tiptap */}
          <div
            className="prose prose-invert max-w-none text-on-surface-variant leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags */}
          {blog.meta_keywords && (
            <div className="mt-16 pt-8 border-t border-outline-variant/30">
              <div className="flex flex-wrap gap-2">
                <span className="text-on-surface-variant font-label-sm mr-2 py-2">Tags:</span>
                {blog.meta_keywords.split(',').map((tag) => (
                  <Link
                    key={tag.trim()}
                    href={`/blog?keyword=${tag.trim()}`}
                    className="px-4 py-2 bg-surface-container-high rounded-full text-label-sm font-label-sm hover:bg-primary-container/20 hover:text-primary transition-all"
                  >
                    {tag.trim()}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Share */}
          <div className="mt-8 flex items-center gap-4">
            <span className="text-on-surface-variant font-label-sm">Chia sẻ:</span>
            <Button
              type="primary"
              shape="circle"
              icon={<ShareAltOutlined />}
              style={{ background: '#1877F2', border: 'none' }}
              onClick={() => handleShare('facebook')}
            />
            <Button
              type="primary"
              shape="circle"
              icon={<MessageOutlined />}
              style={{ background: '#0068FF', border: 'none' }}
              onClick={() => handleShare('zalo')}
            />
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:w-1/3 space-y-12">
          {/* Related */}
          {related.length > 0 && (
            <section>
              <h3 className="text-headline-md font-headline-md text-primary mb-6">
                Bài viết liên quan
              </h3>
              <div className="space-y-6">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    href={`/blog/${item.slug}-${item.id}`}
                    className="group block space-y-3"
                  >
                    <div className="aspect-video rounded-xl overflow-hidden bg-surface-container-low">
                      <img
                        src={toUrl(item.thumbnail)}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = 'https://placehold.co/400x225?text=No+Image'
                        }}
                      />
                    </div>
                    <h4 className="text-body-lg font-bold group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-label-sm text-on-surface-variant">
                      {formatDate(item.created_at)}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="bg-primary-container p-8 rounded-xl text-on-primary shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 opacity-10 pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-headline-md font-headline-md font-bold mb-4">
                Bạn cần hỗ trợ kỹ thuật?
              </h3>
              <p className="text-on-primary/80 mb-6 font-body-md">
                Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bảo trì và lên dây đàn chuyên nghiệp.
              </p>
              <Link href="/contact">
                <Button
                  block
                  size="large"
                  style={{
                    fontWeight: 700,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  Liên hệ ngay
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Button>
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </>
  )
}

export default BlogDetailPage