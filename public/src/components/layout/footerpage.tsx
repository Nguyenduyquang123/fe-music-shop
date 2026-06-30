const FooterPage = () => {
    return (
        <>
            <footer className=" w-full bg-surface-container-low border-t border-outline-variant/30 pt-16 pb-8">
                <div className="container grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-desktop max-w-container-max mx-auto mb-12">
                    <div className="space-y-6">
                        <div className="text-headline-md font-bold text-primary">Nhạc Cụ Việt</div>
                        <p className="text-body-md text-on-surface-variant">Mang âm nhạc đến mọi nhà. Đơn vị phân phối nhạc cụ chính hãng hàng đầu Việt Nam.</p>
                        <div className="flex gap-4">
                            <a className="text-on-surface-variant hover:text-primary transition-all" href="#"><span className="material-symbols-outlined">face_nod</span></a>
                            <a className="text-on-surface-variant hover:text-primary transition-all" href="#"><span className="material-symbols-outlined">share</span></a>
                            <a className="text-on-surface-variant hover:text-primary transition-all" href="#"><span className="material-symbols-outlined">smart_display</span></a>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-bold text-primary">Chính Sách</h4>
                        <ul className="space-y-2">
                            <li><a className="text-on-surface-variant hover:text-primary hover:underline transition-all" href="#">Chính sách bảo hành</a></li>
                            <li><a className="text-on-surface-variant hover:text-primary hover:underline transition-all" href="#">Hướng dẫn mua hàng</a></li>
                            <li><a className="text-on-surface-variant hover:text-primary hover:underline transition-all" href="#">Chính sách đổi trả</a></li>
                            <li><a className="text-on-surface-variant hover:text-primary hover:underline transition-all" href="#">Vận chuyển &amp; Giao nhận</a></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-bold text-primary">Liên Kết Nhanh</h4>
                        <ul className="space-y-2">
                            <li><a className="text-on-surface-variant hover:text-primary hover:underline transition-all" href="#">Trang chủ</a></li>
                            <li><a className="text-on-surface-variant hover:text-primary hover:underline transition-all" href="#">Sản phẩm</a></li>
                            <li><a className="text-on-surface-variant hover:text-primary hover:underline transition-all" href="#">Blog chia sẻ</a></li>
                            <li><a className="text-on-surface-variant hover:text-primary hover:underline transition-all" href="#">Giới thiệu</a></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-bold text-primary">Bản Tin</h4>
                        <p className="text-label-sm text-on-surface-variant">Nhận thông báo về các chương trình khuyến mãi sớm nhất.</p>
                        <div className="flex gap-2">
                            <input className="bg-surface-container border-none rounded-lg p-2 flex-grow focus:ring-1 focus:ring-primary" placeholder="Email của bạn" type="email" />
                            <button className="bg-primary text-on-primary p-2 rounded-lg metallic-sheen">Gửi</button>
                        </div>
                    </div>
                </div>
                <div className="px-margin-desktop max-w-container-max mx-auto pt-8 border-t border-outline-variant/10 text-center">
                    <p className="text-label-sm font-label-sm text-on-surface-variant">© 2024 Nhạc Cụ Việt. Tất cả quyền được bảo lưu.</p>
                </div>
            </footer>
          
        </>
    );
};

export default FooterPage;