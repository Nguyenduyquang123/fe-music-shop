'use client'
import { Menu } from 'antd'
import type { BlogCategory } from '@/public/src/types/blog.types'

interface Props {
    categories: BlogCategory[]
    activeId: number | null
    onChange: (id: number | null) => void
}

const BlogCategoryWidget = ({ categories, activeId, onChange }: Props) => {
    const selectedKey = activeId === null ? 'all' : String(activeId)

    return (
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/30">
            <h3 className="text-headline-md font-headline-md text-on-surface mb-4">Danh mục</h3>
            <Menu
                mode="inline"
                selectedKeys={[selectedKey]}
                style={{ border: 'none', background: 'transparent' }}
                onClick={({ key }) => {
                    if (key === 'all') onChange(null)
                    else {
                        const id = Number(key)
                        onChange(activeId === id ? null : id)
                    }
                }}
                items={[
                    {
                        key: 'all',
                        label: (
                            <div className="flex justify-between items-center">
                                <span className="font-label-sm text-label-sm">Tất cả bài viết</span>
                            </div>
                        ),
                    },
                    ...categories.map((cat) => ({
                        key: String(cat.id),
                        label: (
                            <div className="flex justify-between items-center">
                                <span className="font-label-sm text-label-sm">{cat.name}</span>
                                {(cat as any).blogs_count !== undefined && (
                                    <span className="text-[12px] bg-surface-container-high px-2 py-1 rounded">
                                        {(cat as any).blogs_count}
                                    </span>
                                )}
                            </div>
                        ),
                    })),
                ]}
            />
        </div>
    )
}

export default BlogCategoryWidget