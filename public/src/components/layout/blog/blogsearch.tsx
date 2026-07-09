'use client'
import { useState } from 'react'
import { Input } from 'antd'

interface Props {
    onSearch: (keyword: string) => void
}

const BlogSearch = ({ onSearch }: Props) => {
    const [value, setValue] = useState('')

    return (
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/30">
            <h3 className="text-headline-md font-headline-md text-on-surface mb-4">Tìm kiếm</h3>
            <Input.Search
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onSearch={(val) => onSearch(val.trim())}
                placeholder="Nhập từ khóa..."
                allowClear
                size="large"
                enterButton={
                    <span className="material-symbols-outlined" style={{ fontSize: 20, lineHeight: '40px' }}>
                        search
                    </span>
                }
            />
        </div>
    )
}

export default BlogSearch