'use client'
import { useEffect, useState } from 'react'
import { Table, Button, Space, message, Input, Tag, InputNumber } from 'antd'
import { SearchOutlined, ReloadOutlined, EyeOutlined, SaveOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { productService } from "@/public/src/services/product.service"
import { Product } from '@/public/src/types/type'

const ProductInventoryPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [editingStock, setEditingStock] = useState<Record<number, number>>({})
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await productService.getProducts()
      setProducts(res.data ?? [])
    } catch {
      message.error('Không thể tải dữ liệu kho')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProduct = async (record: Product, newStock: number) => {
    setUpdatingId(record.id);
    try {
      const formData = new FormData();

      // 1. Gửi lại tất cả các thông tin bắt buộc cũ
      formData.append('name', record.name);
      formData.append('sku', record.sku);
      formData.append('price', record.price.toString());
      formData.append('category_id', record.category.id.toString());
      formData.append('brand_id', record.brand.id.toString());

      // 2. Gửi giá trị mới
      formData.append('stock', newStock.toString());

      // 3. Bắt buộc để Laravel hiểu đây là PUT
      formData.append('_method', 'PUT');

      await productService.updateProduct(record.id, formData);

      // Cập nhật local state
      setProducts(prev => prev.map(p => p.id === record.id ? { ...p, stock: newStock } : p));
      message.success('Cập nhật thành công');
    } catch (error) {
      message.error('Cập nhật thất bại');
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  const columns: ColumnsType<Product> = [
    { title: 'Tên sản phẩm', dataIndex: 'name' },
    { title: 'Giá bán', dataIndex: 'price', render: (p) => `${p.toLocaleString('vi-VN')} đ` },
    {
      title: 'Số lượng tồn',
      dataIndex: 'stock',
      render: (stock, record) => (
        <Space>
          <InputNumber
            size="small"
            defaultValue={stock}
            min={0}
            onChange={(val) => setEditingStock(prev => ({ ...prev, [record.id]: val || 0 }))}
          />
          <Button
            size="small"
            type="primary"
            icon={<SaveOutlined />}
            loading={updatingId === record.id}
            // Truyền cả record để lấy data cũ
            onClick={() => handleUpdateProduct(record, editingStock[record.id] ?? stock)}
          />
        </Space>
      )
    },
    {
      title: 'Mắt xem',
      dataIndex: 'views',
      render: (v) => <Tag icon={<EyeOutlined />}>{v?.toLocaleString() || 0}</Tag>
    }
  ]

  const filteredData = products.filter(p =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2>Quản lý kho</h2>
        <Button icon={<ReloadOutlined />} onClick={fetchData}>Làm mới</Button>
      </div>
      <Input
        placeholder="Tìm tên sản phẩm..."
        prefix={<SearchOutlined />}
        style={{ marginBottom: 16, maxWidth: 300 }}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        pagination={{ pageSize: 15 }}
      />
    </div>
  )
}

export default ProductInventoryPage