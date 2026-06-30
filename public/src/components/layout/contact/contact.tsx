const Contact = () => {
  return (
    <>
      <main className="pt-24">
        {/* <!-- Hero Section --> */}
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-cover bg-center" data-alt="A cinematic, low-key photograph of a professional music studio with high-end acoustic guitars and a grand piano. The lighting is dramatic and moody, with warm amber spotlights hitting the polished wood surfaces. The atmosphere is premium and sophisticated, reflecting a concert hall vibe with deep blacks and rich golden highlights." ></div>
            <div className="absolute inset-0 concert-hall-overlay"></div>
          </div>
          <div className="relative z-10 text-center px-margin-mobile">
            <h1 className="font-display-lg text-display-lg text-primary mb-4">Kết Nối Với Chúng Tôi</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng niềm đam mê âm nhạc của bạn. Hãy liên hệ để nhận được sự tư vấn chuyên nghiệp nhất.
            </p>
          </div>
        </section>
        {/* <!-- Contact Section --> */}
        <section className="max-w-container-max mx-auto px-margin-desktop py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {/* <!-- Contact Info --> */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-primary mb-8">Thông Tin Liên Hệ</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-surface-container-high p-3 rounded-xl border border-outline-variant/30 text-primary">
                      <span className="material-symbols-outlined" data-icon="location_on">location_on</span>
                    </div>
                    <div>
                      <h4 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Địa chỉ</h4>
                      <p className="font-body-md text-body-md text-on-surface mt-1">123 Đường Nghệ Thuật, Quận 1, TP. Hồ Chí Minh</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-surface-container-high p-3 rounded-xl border border-outline-variant/30 text-primary">
                      <span className="material-symbols-outlined" data-icon="call">call</span>
                    </div>
                    <div>
                      <h4 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Điện thoại</h4>
                      <p className="font-body-md text-body-md text-on-surface mt-1">1900 8888 - 090 123 4567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-surface-container-high p-3 rounded-xl border border-outline-variant/30 text-primary">
                      <span className="material-symbols-outlined" data-icon="mail">mail</span>
                    </div>
                    <div>
                      <h4 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Email</h4>
                      <p className="font-body-md text-body-md text-on-surface mt-1">contact@nhaccuviet.vn</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Kết nối mạng xã hội</h3>
                <div className="flex gap-4">
                  <a className="bg-surface-container-high p-4 rounded-full border border-outline-variant/30 text-primary hover:bg-primary hover:text-on-primary transition-all duration-300" href="#">
                    <span className="material-symbols-outlined" data-icon="forum">forum</span>
                  </a>
                  <a className="bg-surface-container-high p-4 rounded-full border border-outline-variant/30 text-primary hover:bg-primary hover:text-on-primary transition-all duration-300" href="#">
                    <span className="material-symbols-outlined" data-icon="chat">chat</span>
                  </a>
                  <a className="bg-surface-container-high p-4 rounded-full border border-outline-variant/30 text-primary hover:bg-primary hover:text-on-primary transition-all duration-300" href="#">
                    <span className="material-symbols-outlined" data-icon="public">public</span>
                  </a>
                </div>
              </div>
              <div className="bg-surface-container-high p-8 rounded-xl border border-primary/20 amber-glow relative overflow-hidden group">
                <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-500">
                  <span className="material-symbols-outlined text-[120px]" data-icon="support_agent">support_agent</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-2">Hỗ trợ 24/7</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Đội ngũ chuyên gia kỹ thuật của chúng tôi luôn sẵn sàng giải đáp thắc mắc của bạn bất kể thời gian nào.</p>
                <button className="mt-6 flex items-center gap-2 font-label-sm text-primary group">
                  Xem thêm câu hỏi thường gặp
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" data-icon="arrow_forward">arrow_forward</span>
                </button>
              </div>
            </div>
            {/* <!-- Contact Form --> */}
            <div className="lg:col-span-7">
              <div className="bg-surface-container-low p-8 md:p-12 rounded-xl border border-outline-variant/20 shadow-xl">
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-8">Gửi Tin Nhắn</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-label-sm text-label-sm text-on-surface-variant px-1">Họ và tên</label>
                      <input className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Nhập tên của bạn" type="text" />
                    </div>
                    <div className="space-y-2">
                      <label className="font-label-sm text-label-sm text-on-surface-variant px-1">Số điện thoại</label>
                      <input className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Nhập số điện thoại" type="tel" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-sm text-label-sm text-on-surface-variant px-1">Chủ đề</label>
                    <select className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all">
                      <option>Tư vấn sản phẩm</option>
                      <option>Chính sách bảo hành</option>
                      <option>Góp ý dịch vụ</option>
                      <option>Hợp tác kinh doanh</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-sm text-label-sm text-on-surface-variant px-1">Nội dung tin nhắn</label>
                    <textarea className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none" placeholder="Chúng tôi có thể giúp gì cho bạn?" ></textarea>
                  </div>
                  <button className="w-full bg-primary text-on-primary py-4 rounded-lg font-headline-md amber-glow accent-gradient-hover active:scale-[0.98] transition-all" type="submit">
                    Gửi Yêu Cầu
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Map Section --> */}
        <section className="w-full h-[500px] relative grayscale hover:grayscale-0 transition-all duration-700 overflow-hidden">
          <div className="absolute inset-0 z-0" data-location="Ho Chi Minh City" >
            <img className="w-full h-full object-cover" data-alt="A stylized, high-contrast dark mode map of Ho Chi Minh City's District 1 area. The map uses a palette of deep obsidian and slate greys, with major roads and landmarks highlighted in a subtle amber glow. The aesthetic is modern, tech-focused, and premium, resembling a luxury real estate or high-end retail navigation interface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnPNl2yezOQ_7N65fpRZnwhqnvwUnQT3odWhKG3lU-MTm-VEKoNP23h7XWbe8cqFwFF9g950zZZDhmzciLblYn8tlU7Co2XoFAeEb4LzBCX_bl5x3DkALUkJLeeS9Y3l0EtCUINllRMaUmkOL2sXd6dMH5ieBn_BvEkXxHxiPkVu1cNj7V9uo2k7CwupnMP9fi8xpNxP6amXa5iDP0_kxq6yoNcIJS42ckjeFzCya4Qn5wDF0X0weFp-98-xUh92o1Bfk5yKMZD7w" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 pointer-events-none"></div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-surface-container-highest/90 backdrop-blur-md px-8 py-4 rounded-full border border-primary/30 flex items-center gap-4 shadow-2xl">
            <span className="material-symbols-outlined text-primary" data-icon="near_me">near_me</span>
            <p className="font-label-sm text-on-primary">Chỉ đường tới showroom gần nhất</p>
          </div>
        </section>
      </main>
    </>
  )
}
export default Contact