'use client'
import { useEffect, useState } from 'react'
import { Table, Tag, Button, Space, Modal, Select, message, Input, Tooltip } from 'antd'
import { SearchOutlined, EyeOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { AdminInquiryService } from "@/public/src/services/inquiry.service"
import type { InquiryList } from "@/public/src/types/inquiry.type"

const STATUS_CONFIG = {
  pending: { label: 'Chưa liên hệ', color: 'error' },
  contacted: { label: 'Đã liên hệ', color: 'success' },
}

const Inquiry = () => {
  const [inquiries, setInquiries] = useState<InquiryList[]>([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await AdminInquiryService.getList()
      setInquiries(res.data ?? [])
    } catch {
      message.error('Không tải được danh sách')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleUpdateStatus = async (id: number, status: 'pending' | 'contacted') => {
    setUpdatingId(id)
    try {
      await AdminInquiryService.update(id, { status })
      setInquiries(prev => prev.map(item => item.id === id ? { ...item, status } : item))
      message.success('Cập nhật trạng thái thành công')
    } catch {
      message.error('Cập nhật thất bại')
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await AdminInquiryService.delete(id)
      setInquiries(prev => prev.filter(item => item.id !== id))
      message.success('Đã xóa yêu cầu')
    } catch {
      message.error('Xóa thất bại')
    }
  }

  const filteredData = inquiries.filter(item => {
    const name = (item.full_name || "").toLowerCase();
    const phone = (item.phone || "").toString(); 
    const q = searchText.toLowerCase();

    return name.includes(q) || phone.includes(q);
  });

  const columns: ColumnsType<InquiryList> = [
    { title: 'Khách hàng', dataIndex: 'full_name', render: (val, record) => <div><b>{val}</b><br />{record.phone}</div> },
    { title: 'Sản phẩm', dataIndex: 'product', render: (p) => p?.name || '---' },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status, record) => (
        <Select
          value={status}
          size="small"
          loading={updatingId === record.id}
          onChange={(val) => handleUpdateStatus(record.id, val)}
          options={Object.entries(STATUS_CONFIG).map(([val, cfg]) => ({
            value: val,
            label: <Tag color={cfg.color}>{cfg.label}</Tag>
          }))}
        />
      )
    },
    {
      title: 'Hành động',
      render: (_, record) => (
        <Space>
          <Button icon={<DeleteOutlined />} size="small" danger onClick={() =>
            Modal.confirm({ title: 'Xóa yêu cầu này?', onOk: () => handleDelete(record.id) })
          } />
        </Space>
      )
    }
  ]

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2>Quản lý yêu cầu tư vấn</h2>
        <Button icon={<ReloadOutlined />} onClick={fetchData}>Làm mới</Button>
      </div>
      <Input
        placeholder="Tìm tên hoặc SĐT..."
        prefix={<SearchOutlined />}
        style={{ marginBottom: 16, maxWidth: 300 }}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredData}
        loading={loading}
      />
    </div>
  )
}

export default Inquiry