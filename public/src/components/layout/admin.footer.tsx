'use client'
import { Layout } from 'antd';

const AdminFooter = () => {
    const { Footer } = Layout;

    return (
        <>
            <Footer style={{ textAlign: 'center' }}>
                Camus Music ©{new Date().getFullYear()} Created by @bito
            </Footer>
        </>
    )
}

export default AdminFooter;