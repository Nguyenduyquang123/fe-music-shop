const FeaturedblogPage = () => {
  return (
    <>
      <section className="py-24 px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-headline-lg font-headline-lg mb-4">Blog Mới Nhất</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* <!-- Blog 1 --> */}
          <article className="group">
            <div className="relative h-64 mb-6 overflow-hidden rounded-2xl">
              <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="A focused close-up of a person's hands checking the neck straightness and action of a wooden acoustic guitar in a workshop environment. Soft morning light enters from a window, creating a serene, educational atmosphere with golden dust motes." src="https://lh3.googleusercontent.com/aida-public/AB6AXuASz9FPivextkjMXZgqae1v6rizqFWU2vl2whVpsCcAA4L4F_dparF9vuKa0v6rERZgG1oMaUfoB2eZTrERw8S7-EBCvjGP2d7K4bK3BZA6GA0IMKj6tfVku4Ribq4UXdVbJKjGSz2dbu3gyjhAT9pD0w7Bx-RVCxp05jIVxVvQffld3L75dAx8SAb3bxaJB3Xmo6l39VmYiw5Ml_BKJCTxJVFmXQKDBfeWbZlKDitfIGd-9l_eBSVcmkApoMxTq6mHkSOX8zvqmzE" />
              <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 text-label-sm rounded-full">Kinh nghiệm</div>
            </div>
            <h3 className="text-headline-md font-headline-md group-hover:text-primary transition-colors cursor-pointer mb-2">5 Bước Chọn Đàn Guitar Cho Người Mới Bắt Đầu</h3>
            <p className="text-body-md text-on-surface-variant line-clamp-3 mb-4">Việc chọn cây đàn đầu tiên là vô cùng quan trọng, nó ảnh hưởng trực tiếp đến cảm hứng tập luyện của bạn...</p>
            <a className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all" href="#">
              Đọc tiếp <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </article>
          {/* <!-- Blog 2 --> */}
          <article className="group">
            <div className="relative h-64 mb-6 overflow-hidden rounded-2xl">
              <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="A top-down view of various musical accessories like a tuner, extra guitar strings, a metronome, and high-quality cleaning cloths arranged neatly on a dark wooden table. Professional studio lighting emphasizes the tactile quality of the gear." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbnVvTzHKu7Tzi43Jt3llwZ2SeZB4zU2BLYdgbmkMEG7_3aIyuH2vcaoUyze8P78Irw1saAbLOI3-319RdcxjKiEFpXwUdMpGR8zPZdrOgyfrQ-s2gZNpHPOo51b0eYmOvXypCNmDqf1f1ynGUGynZ3EMwxwR8zwgwGDFyzBO5dn9MZMvE1CrXqgwbJg0jPVWPHb4TjjURUUgd93oG5hx16TXeIAGbrvFD2LEAw6cNJWORubgFwah8-FlJUKN8erZ0DB_8DgIaRGU" />
              <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 text-label-sm rounded-full">Bảo quản</div>
            </div>
            <h3 className="text-headline-md font-headline-md group-hover:text-primary transition-colors cursor-pointer mb-2">Cách Bảo Quản Nhạc Cụ Trong Thời Tiết Nồm Ẩm</h3>
            <p className="text-body-md text-on-surface-variant line-clamp-3 mb-4">Khí hậu Việt Nam rất khắc nghiệt với các dòng đàn gỗ. Hãy xem ngay các mẹo bảo vệ nhạc cụ của bạn...</p>
            <a className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all" href="#">
              Đọc tiếp <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </article>
          {/* <!-- Blog 3 --> */}
          <article className="group">
            <div className="relative h-64 mb-6 overflow-hidden rounded-2xl">
              <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="A silhouette of a musician performing on a stage with a grand piano, back-lit by bright orange stage lights. The atmosphere is energetic and atmospheric, with light smoke and a high-contrast cinematic feel." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPPfFTgEUAOYoYUDKCEp_7FqT_Wf2KHz-jtBNJwEbuprfA3j4YrQPY7lzgvrcGtnDeQloDco9hW9-ZvqoSjSoahOAWaWIbUjVFG98sE0Axu0LXHUiBhahwem_T9Yp3A-ZT0b1OrZs2qi2ikMjFhebvqW_xyayVmwU7jyadLePgKoTgZM6lAhr-vCcxD760GfsD7q6gU6-kzh5WaE3a_JO3gI_z2YNF1NY-AtjarYXCs4SEcm80L2IMRlGTS4sMXKagz6mfHxfZzYE" />
              <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 text-label-sm rounded-full">Xu hướng</div>
            </div>
            <h3 className="text-headline-md font-headline-md group-hover:text-primary transition-colors cursor-pointer mb-2">Xu Hướng Piano Điện 2024: Công Nghệ Gõ Mới</h3>
            <p className="text-body-md text-on-surface-variant line-clamp-3 mb-4">Các hãng lớn đang đua nhau ra mắt những công nghệ phím hybrid mang lại cảm giác chân thực như đàn cơ...</p>
            <a className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all" href="#">
              Đọc tiếp <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </article>
        </div>
      </section>
    </>
  );
};

export default FeaturedblogPage;