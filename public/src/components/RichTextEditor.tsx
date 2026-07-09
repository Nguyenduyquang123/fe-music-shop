'use client'
import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ImageExtension from '@tiptap/extension-image'
import Heading from '@tiptap/extension-heading'
import { Node, mergeAttributes } from '@tiptap/core'
import { Button, Space, Tooltip, Divider, Modal, Form, Input, Select, message } from 'antd'
import {
    BoldOutlined, ItalicOutlined, UnorderedListOutlined, OrderedListOutlined,
    StrikethroughOutlined, PictureOutlined, UndoOutlined, RedoOutlined,
    LineOutlined, YoutubeOutlined, VideoCameraOutlined,
} from '@ant-design/icons'
import { useState } from 'react'

// ===== Extension iframe custom =====
const IframeNode = Node.create({
    name: 'iframe',
    group: 'block',
    atom: true,

    addAttributes() {
        return {
            src: { default: null },
            width: { default: '100%' },
            height: { default: '400' },
            frameborder: { default: '0' },
            allowfullscreen: { default: 'true' },
        }
    },

    parseHTML() {
        return [{ tag: 'iframe' }]
    },

    renderHTML({ HTMLAttributes }) {
        return ['iframe', mergeAttributes(HTMLAttributes)]
    },
})

// ===== Helpers =====
type VideoType = 'youtube' | 'facebook' | 'tiktok'

const parseVideoUrl = (url: string, type: VideoType): string | null => {
    try {
        if (type === 'youtube') {
            // Hỗ trợ: youtu.be/xxx, youtube.com/watch?v=xxx, youtube.com/shorts/xxx
            const patterns = [
                /youtu\.be\/([^?&]+)/,
                /youtube\.com\/watch\?v=([^&]+)/,
                /youtube\.com\/shorts\/([^?&]+)/,
                /youtube\.com\/embed\/([^?&]+)/,
            ]
            for (const pattern of patterns) {
                const match = url.match(pattern)
                if (match) return `https://www.youtube.com/embed/${match[1]}`
            }
        }

        if (type === 'facebook') {
            // Facebook video embed
            const encoded = encodeURIComponent(url)
            return `https://www.facebook.com/plugins/video.php?href=${encoded}&show_text=false&width=560`
        }

        if (type === 'tiktok') {
            // TikTok: lấy video ID từ URL dạng tiktok.com/@user/video/123456
            const match = url.match(/video\/(\d+)/)
            if (match) return `https://www.tiktok.com/embed/v2/${match[1]}`
        }

        return null
    } catch {
        return null
    }
}

// ===== Props =====
interface Props {
    value?: string
    onChange?: (html: string) => void
}

const RichTextEditor = ({ value = '', onChange }: Props) => {
    const [videoModalOpen, setVideoModalOpen] = useState(false)
    const [videoForm] = Form.useForm()

    const editor = useEditor({
        extensions: [
            StarterKit,
            ImageExtension,
            Heading.configure({ levels: [1, 2, 3] }),
            IframeNode,
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML())
        },
    })

    useEffect(() => {
        if (!editor) return
        const current = editor.getHTML()
        if (value !== current) {
            editor.commands.setContent(value ?? '', false)
        }
    }, [value, editor])

    if (!editor) return null

    const isActive = (type: string, attrs?: object) =>
        editor.isActive(type, attrs) ? { type: 'primary' as const } : {}

    const handleInsertImage = () => {
        const url = window.prompt('Nhập URL ảnh')
        if (url) editor.chain().focus().setImage({ src: url }).run()
    }

    const handleInsertVideo = (values: { url: string; type: VideoType; height: string }) => {
        const embedUrl = parseVideoUrl(values.url, values.type)
        if (!embedUrl) {
            message.error('URL không hợp lệ hoặc không được hỗ trợ')
            return
        }

        editor.chain().focus().insertContent({
            type: 'iframe',
            attrs: {
                src: embedUrl,
                width: '100%',
                height: values.height || '400',
                frameborder: '0',
                allowfullscreen: 'true',
            },
        }).run()

        setVideoModalOpen(false)
        videoForm.resetFields()
        message.success('Đã nhúng video thành công')
    }

    return (
        <>
            <div style={{ border: '1px solid #d9d9d9', borderRadius: 8, overflow: 'hidden' }}>
                {/* Toolbar */}
                <div style={{
                    padding: '8px 12px',
                    borderBottom: '1px solid #f0f0f0',
                    background: '#fafafa',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 4,
                    alignItems: 'center',
                }}>
                    {/* Heading */}
                    <Space.Compact>
                        {([1, 2, 3] as const).map((level) => (
                            <Tooltip key={level} title={`Heading ${level}`}>
                                <Button
                                    size="small"
                                    {...isActive('heading', { level })}
                                    onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                                    style={{ fontWeight: 700, minWidth: 32 }}
                                >
                                    H{level}
                                </Button>
                            </Tooltip>
                        ))}
                    </Space.Compact>

                    <Divider type="vertical" style={{ height: 24, margin: '0 4px' }} />

                    {/* Text format */}
                    <Space.Compact>
                        <Tooltip title="In đậm (Ctrl+B)">
                            <Button size="small" icon={<BoldOutlined />} {...isActive('bold')}
                                onClick={() => editor.chain().focus().toggleBold().run()} />
                        </Tooltip>
                        <Tooltip title="In nghiêng (Ctrl+I)">
                            <Button size="small" icon={<ItalicOutlined />} {...isActive('italic')}
                                onClick={() => editor.chain().focus().toggleItalic().run()} />
                        </Tooltip>
                        <Tooltip title="Gạch ngang">
                            <Button size="small" icon={<StrikethroughOutlined />} {...isActive('strike')}
                                onClick={() => editor.chain().focus().toggleStrike().run()} />
                        </Tooltip>
                    </Space.Compact>

                    <Divider type="vertical" style={{ height: 24, margin: '0 4px' }} />

                    {/* List */}
                    <Space.Compact>
                        <Tooltip title="Danh sách không thứ tự">
                            <Button size="small" icon={<UnorderedListOutlined />} {...isActive('bulletList')}
                                onClick={() => editor.chain().focus().toggleBulletList().run()} />
                        </Tooltip>
                        <Tooltip title="Danh sách có thứ tự">
                            <Button size="small" icon={<OrderedListOutlined />} {...isActive('orderedList')}
                                onClick={() => editor.chain().focus().toggleOrderedList().run()} />
                        </Tooltip>
                    </Space.Compact>

                    <Divider type="vertical" style={{ height: 24, margin: '0 4px' }} />

                    {/* Ảnh */}
                    <Tooltip title="Chèn ảnh từ URL">
                        <Button size="small" icon={<PictureOutlined />} onClick={handleInsertImage} />
                    </Tooltip>

                    {/* Đường kẻ */}
                    <Tooltip title="Đường kẻ ngang">
                        <Button size="small" icon={<LineOutlined />}
                            onClick={() => editor.chain().focus().setHorizontalRule().run()} />
                    </Tooltip>

                    <Divider type="vertical" style={{ height: 24, margin: '0 4px' }} />

                    {/* Video embed */}
                    <Tooltip title="Nhúng video (YouTube / Facebook / TikTok)">
                        <Button
                            size="small"
                            icon={<YoutubeOutlined />}
                            onClick={() => setVideoModalOpen(true)}
                        >
                            Video
                        </Button>
                    </Tooltip>

                    <Divider type="vertical" style={{ height: 24, margin: '0 4px' }} />

                    {/* Undo / Redo */}
                    <Space.Compact>
                        <Tooltip title="Hoàn tác (Ctrl+Z)">
                            <Button size="small" icon={<UndoOutlined />}
                                disabled={!editor.can().undo()}
                                onClick={() => editor.chain().focus().undo().run()} />
                        </Tooltip>
                        <Tooltip title="Làm lại (Ctrl+Y)">
                            <Button size="small" icon={<RedoOutlined />}
                                disabled={!editor.can().redo()}
                                onClick={() => editor.chain().focus().redo().run()} />
                        </Tooltip>
                    </Space.Compact>
                </div>

                {/* Editor */}
                <EditorContent
                    editor={editor}
                    style={{ minHeight: 400, padding: '12px 16px', cursor: 'text' }}
                />

                <style>{`
                    .ProseMirror { outline: none; min-height: 400px; }
                    .ProseMirror h1 { font-size: 2em; font-weight: 700; margin: 16px 0 8px; }
                    .ProseMirror h2 { font-size: 1.5em; font-weight: 700; margin: 14px 0 6px; }
                    .ProseMirror h3 { font-size: 1.2em; font-weight: 700; margin: 12px 0 4px; }
                    .ProseMirror p { margin: 6px 0; line-height: 1.7; }
                    .ProseMirror strong { font-weight: 700; }
                    .ProseMirror em { font-style: italic; }
                    .ProseMirror s { text-decoration: line-through; }
                    .ProseMirror ul { list-style: disc; padding-left: 24px; margin: 8px 0; }
                    .ProseMirror ol { list-style: decimal; padding-left: 24px; margin: 8px 0; }
                    .ProseMirror li { margin: 4px 0; }
                    .ProseMirror img { max-width: 100%; border-radius: 8px; margin: 8px 0; }
                    .ProseMirror hr { border: none; border-top: 2px solid #f0f0f0; margin: 16px 0; }
                    .ProseMirror iframe {
                        display: block;
                        width: 100%;
                        border-radius: 8px;
                        margin: 12px 0;
                        border: none;
                    }
                    .ProseMirror p.is-editor-empty:first-child::before {
                        color: #bfbfbf;
                        content: attr(data-placeholder);
                        float: left;
                        height: 0;
                        pointer-events: none;
                    }
                `}</style>
            </div>

            {/* Modal nhúng video */}
            <Modal
                title={
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <VideoCameraOutlined style={{ color: '#1677ff' }} />
                        Nhúng video
                    </div>
                }
                open={videoModalOpen}
                onCancel={() => { setVideoModalOpen(false); videoForm.resetFields() }}
                footer={null}
                destroyOnClose
            >
                <Form
                    form={videoForm}
                    layout="vertical"
                    onFinish={handleInsertVideo}
                    initialValues={{ type: 'youtube', height: '400' }}
                >
                    <Form.Item
                        name="type"
                        label="Nền tảng"
                        rules={[{ required: true }]}
                    >
                        <Select
                            size="large"
                            options={[
                                {
                                    value: 'youtube',
                                    label: (
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <YoutubeOutlined style={{ color: '#FF0000' }} /> YouTube
                                        </span>
                                    ),
                                },
                                {
                                    value: 'facebook',
                                    label: (
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <VideoCameraOutlined style={{ color: '#1877F2' }} /> Facebook
                                        </span>
                                    ),
                                },
                                {
                                    value: 'tiktok',
                                    label: (
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <VideoCameraOutlined style={{ color: '#000' }} /> TikTok
                                        </span>
                                    ),
                                },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        name="url"
                        label="URL video"
                        rules={[
                            { required: true, message: 'Vui lòng nhập URL video' },
                            { type: 'url', message: 'URL không hợp lệ' },
                        ]}
                        extra={
                            <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>
                                <div>• YouTube: https://youtu.be/xxx hoặc https://youtube.com/watch?v=xxx</div>
                                <div>• Facebook: Link bài đăng video trên Facebook</div>
                                <div>• TikTok: https://www.tiktok.com/@user/video/xxx</div>
                            </div>
                        }
                    >
                        <Input.TextArea
                            rows={2}
                            placeholder="Dán URL video vào đây..."
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item name="height" label="Chiều cao (px)">
                        <Select
                            size="large"
                            options={[
                                { value: '300', label: '300px — Nhỏ' },
                                { value: '400', label: '400px — Vừa (mặc định)' },
                                { value: '500', label: '500px — Lớn' },
                                { value: '600', label: '600px — Rất lớn' },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={() => { setVideoModalOpen(false); videoForm.resetFields() }}>
                                Hủy
                            </Button>
                            <Button type="primary" htmlType="submit" icon={<VideoCameraOutlined />}>
                                Nhúng video
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default RichTextEditor