const BlogGird = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {/* <!-- Post 1 --> */}
        <article className="group bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/30 hover:concert-glow transition-all duration-500">
          <div className="relative aspect-video overflow-hidden">
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A close-up high-resolution photograph of a professional acoustic piano interior, showing the intricate hammers and strings under warm amber spotlights in a dark, luxury studio environment. The atmosphere is rhythmic and premium." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPRMXVDsz27MVFngvTnTvtlh-mBmU2PzSC_bPA8V8npZ_TgK5TF9LKVnaDEtib3uOcCfr0HeqCejDEjdtrSFRvH3AyddwM5rktnQTobMR9_r6149hD3bhkct1PlYkXnPXz3z4MZRt0RksBiJfPxWMmB6t0j0CgZvjBQD3sn4hLoBSorJ2SluDK_XMUzbqOJsOKMh_0MPvA-AByIjVSbokNqLEWRLse1j0czztn1-P3qQi7mL9i1y5DAaRgIvqDnQkaMgA7D2dcex8" />
            <div className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-full">
              <span className="text-[12px] font-bold text-on-primary">KINH NGHIỆM</span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-[16px] text-primary">calendar_today</span>
              <span className="text-label-sm font-label-sm text-outline">12 Tháng 5, 2024</span>
            </div>
            <h2 className="text-headline-md font-headline-md text-on-surface mb-4 line-clamp-2 min-h-[3.2em] group-hover:text-primary transition-colors">Cách bảo quản đàn Piano vào mùa ẩm tại Việt Nam</h2>
            <p className="text-body-md font-body-md text-on-surface-variant line-clamp-3 mb-6">Mùa nồm ẩm ở miền Bắc là kẻ thù số 1 của những cây đàn Piano cơ đắt tiền. Hãy cùng tìm hiểu cách bảo vệ "người bạn" của mình luôn ở trạng thái tốt nhất...</p>
            <a className="inline-flex items-center gap-2 text-primary font-bold group/btn" href="#">
              Đọc thêm
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>
        </article>
        {/* <!-- Post 2 --> */}
        <article className="group bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/30 hover:concert-glow transition-all duration-500">
          <div className="relative aspect-video overflow-hidden">
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A row of high-end acoustic and electric guitars displayed on a dark wooden wall, illuminated by dramatic side-lighting that emphasizes their curves and gloss. The color palette is dominated by deep browns, blacks, and vibrant amber gold highlights." src="https://lh3.googleusercontent.com/aida-public/AB6AXuApJC3W8lFLWTqyWLfn4f3jTitXiIaV3VF5oCshlPuZFj4oTxkXohTraeo2IPXqwT7G5AKVWENs1H3Z3fpB-mmjsEUVyUW49xv84i5-NqXyIJdA8Nj6EjhDl7PWZlIPcRyu30p1M9UVbMfyrUTb_dloiwF2PtLO-MA_9p0_plhk6fGHt4315sgwYSq7l804C8TJWj6sYd6W3Z9ESCdattZH-H7MT2jg-e9U9w02VVp8rXz4pMLxEbDvMjUiNMiAdXsWOuVYDPXZQUk" />
            <div className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-full">
              <span className="text-[12px] font-bold text-on-primary">MUA SẮM</span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-[16px] text-primary">calendar_today</span>
              <span className="text-label-sm font-label-sm text-outline">10 Tháng 5, 2024</span>
            </div>
            <h2 className="text-headline-md font-headline-md text-on-surface mb-4 line-clamp-2 min-h-[3.2em] group-hover:text-primary transition-colors">5 mẫu Guitar cho người mới bắt đầu tốt nhất 2024</h2>
            <p className="text-body-md font-body-md text-on-surface-variant line-clamp-3 mb-6">Bạn đang băn khoăn không biết nên chọn cây guitar nào để khởi đầu hành trình âm nhạc? Dưới đây là danh sách 5 ứng cử viên sáng giá nhất...</p>
            <a className="inline-flex items-center gap-2 text-primary font-bold group/btn" href="#">
              Đọc thêm
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>
        </article>
        {/* <!-- Post 3 --> */}
        <article className="group bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/30 hover:concert-glow transition-all duration-500">
          <div className="relative aspect-video overflow-hidden">
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A professional musician's hands playing a violin in a dark, atmospheric concert hall. The lighting is focused on the movement and the texture of the instrument, with a soft amber glow reflecting off the wood. Dramatic and high-end aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMKLv65TTQJapS7fzH0afc6MVFVi8FS9SNI5EeHlg5XZYmGlU7zjm4QAn8G9pNq3fykIMyWEpM3i9POdniCYmH2plG3EoN4BEvPwtnPoU0wfzh455vFpRHiJ1i7egG5CszMitv56z9L9bpY6_Q-zSUedsiAQ870iSdg6fkQlJD1pFPLsMp2QiikEB53NIB80faxKejY9bivaroSM1zLXhkwkoVEt1AT9p2ihkW4TE7f_2iMNvoJ2Bl8_VeBvhjAIHKcFs-yUKjfkQ" />
            <div className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-full">
              <span className="text-[12px] font-bold text-on-primary">KỸ THUẬT</span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-[16px] text-primary">calendar_today</span>
              <span className="text-label-sm font-label-sm text-outline">08 Tháng 5, 2024</span>
            </div>
            <h2 className="text-headline-md font-headline-md text-on-surface mb-4 line-clamp-2 min-h-[3.2em] group-hover:text-primary transition-colors">Học Violin bao lâu thì có thể chơi được nhạc trẻ?</h2>
            <p className="text-body-md font-body-md text-on-surface-variant line-clamp-3 mb-6">Violin thường được coi là nhạc cụ khó học nhất. Nhưng thực tế liệu có như vậy? Lộ trình học tập hiệu quả cho người bận rộn sẽ được bật mí...</p>
            <a className="inline-flex items-center gap-2 text-primary font-bold group/btn" href="#">
              Đọc thêm
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>
        </article>
        {/* <!-- Post 4 --> */}
        <article className="group bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/30 hover:concert-glow transition-all duration-500">
          <div className="relative aspect-video overflow-hidden">
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Close-up of a high-quality professional microphone in a dark recording studio. The atmosphere is sophisticated with subtle amber glows on the metallic surfaces. Minimalist and corporate professional photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCthCAlGGeUXEVWOUTvQFqQb4iCUOm5ivgux8tYdhULWfQWy7KBP3i-id-G3n1qWBzFo6zMCQqNM_gi8ajVwQS6ZVJH0xRcNgUUy4ZLXQ8Q3QqtimG7XKWzM4AOHG342iPAmQayxboZasy1yTbJeX6K1RJoO7T4v9rUOyvNtvO8L8yWNyc_4lmX1VCiP-xaJeXYx81u1E7v0jX-tgibZ39MHCsxBaNYjilAOPnp3RM-AV8S5la6AP8kPFIcPA5SuCO-pVHVXdhehGA" />
            <div className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-full">
              <span className="text-[12px] font-bold text-on-primary">KIẾN THỨC</span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-[16px] text-primary">calendar_today</span>
              <span className="text-label-sm font-label-sm text-outline">05 Tháng 5, 2024</span>
            </div>
            <h2 className="text-headline-md font-headline-md text-on-surface mb-4 line-clamp-2 min-h-[3.2em] group-hover:text-primary transition-colors">Thiết lập phòng thu âm tại nhà chuyên nghiệp</h2>
            <p className="text-body-md font-body-md text-on-surface-variant line-clamp-3 mb-6">Không cần chi hàng tỷ đồng, bạn vẫn có thể sở hữu một studio cá nhân đạt chuẩn với các thiết bị nhạc cụ và tiêu âm phù hợp nhất...</p>
            <a className="inline-flex items-center gap-2 text-primary font-bold group/btn" href="#">
              Đọc thêm
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>
        </article>
        {/* <!-- Post 5 --> */}
        <article className="group bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/30 hover:concert-glow transition-all duration-500">
          <div className="relative aspect-video overflow-hidden">
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A vintage saxophone resting on a dark velvet surface in a dimly lit jazz club. Warm amber lighting reflects off the polished brass, creating a moody and sophisticated rhythmic atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO2Wi8zwv05OynjWj4OPuoT37rCs19hZuxPMOkG3WRvfSABdEczqQSiur1ULDWH7c9y7xa903H4pdOBoi_V3Mjm2_ExVZ2cmoQLYkGsiBFclUm8cBn3f_27kWD7SvItfPEjF8_2i-HOuaSruMeD0B3fAmusMpXZnFR9XuCs0xqABrPzYvR7QHqgyUU9g1UJpFa4J-nIRtr4zrehg5nl6qLuUdNA2NRfAOoStnEAXDFC37DY3LEGzLAkrmLAxWWy7VeE4NSdjDy7d4" />
            <div className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-full">
              <span className="text-[12px] font-bold text-on-primary">CẢM HỨNG</span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-[16px] text-primary">calendar_today</span>
              <span className="text-label-sm font-label-sm text-outline">01 Tháng 5, 2024</span>
            </div>
            <h2 className="text-headline-md font-headline-md text-on-surface mb-4 line-clamp-2 min-h-[3.2em] group-hover:text-primary transition-colors">Lịch sử và sức hút mê hoặc của kèn Saxophone</h2>
            <p className="text-body-md font-body-md text-on-surface-variant line-clamp-3 mb-6">Từ những câu lạc bộ Jazz tăm tối đến các sân khấu giao hưởng hiện đại, Saxophone đã khẳng định vị thế là "ông hoàng" của sự lãng mạn...</p>
            <a className="inline-flex items-center gap-2 text-primary font-bold group/btn" href="#">
              Đọc thêm
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>
        </article>
        {/* <!-- Post 6 --> */}
        <article className="group bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/30 hover:concert-glow transition-all duration-500">
          <div className="relative aspect-video overflow-hidden">
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A high-quality digital keyboard and synthesizer with glowing amber LED lights and professional controls in a dark, futuristic music studio. The style is modern, sleek, and high-tech." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0tKTxqpk-E_uGuDKoc6gOISVlyyJiI6bKEjNejjQ--cHPqLOGxgR2VWLBLXjw_I5Tj9ryN9iHtMXp9efaqujFM95LxTQSdkD4Tat-FDQxSkzGt_6O1ChJ5dmXX5STM_tmY_za8emQ3kdDhHog9qKtKJI_OUDgy30vfRwlvDscD9wVp-1S4osMr0KmkV3u3koXA0PuKxQ_PTXSHJxpexUuWUzHTwKX49W_sJtmTeGaLzB7ftnGYHcnzyLX7puunIE0AixAH1Ujhaw" />
            <div className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-full">
              <span className="text-[12px] font-bold text-on-primary">REVIEW</span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-[16px] text-primary">calendar_today</span>
              <span className="text-label-sm font-label-sm text-outline">28 Tháng 4, 2024</span>
            </div>
            <h2 className="text-headline-md font-headline-md text-on-surface mb-4 line-clamp-2 min-h-[3.2em] group-hover:text-primary transition-colors">Đánh giá chi tiết Piano điện Yamaha CLP Series</h2>
            <p className="text-body-md font-body-md text-on-surface-variant line-clamp-3 mb-6">Sự lựa chọn hoàn hảo cho căn hộ hiện đại. Âm thanh chân thực cùng bàn phím phím gỗ mang lại cảm giác chơi như đàn Grand thực thụ...</p>
            <a className="inline-flex items-center gap-2 text-primary font-bold group/btn" href="#">
              Đọc thêm
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>
        </article>
      </div>
    </>
  )
}
export default BlogGird