'use client'
import { Pagination } from 'antd'

interface Props {
    currentPage: number
    totalPages: number
    onChange: (page: number) => void
}

const BlogPagination = ({ currentPage, totalPages, onChange }: Props) => (
    <div className="mt-12 flex justify-center items-center gap-4">
        <Pagination
            current={currentPage}
            total={totalPages * 9}
            pageSize={9}
            onChange={onChange}
            showSizeChanger={false}
        />
    </div>
)

export default BlogPagination