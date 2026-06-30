const FeatureBlog = () => {
  return (
    <>
      <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/30">
        <h3 className="text-headline-md font-headline-md text-on-surface mb-4">Bài viết nổi bật</h3>
        <div className="space-y-4">
          <a className="group flex gap-4" href="#">
            <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-surface-container-highest">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform" data-alt="A detailed close-up shot of a polished grand piano key with professional cinematic lighting and deep shadows, emphasizing the wood grain and lacquered texture in a dark concert hall setting. Amber gold accents highlight the details." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_r6XtuJx26vqW_vTZagirIS67wbrZS9mth5dRZ-W1CerJkarUleU1g_a0gE1AX3-jb7EIos3MEdkM4L1nT_HjiZYQg9WGBy_zgoq-AmT4irdipmvkakGC8BQHKKUYoeXO1doZT6BJ-Lvq1o_L3dcDxHG2PzgwOJ9pwssv1uDQIo8Mu3gKynmHl77ACHR_NMuHkWN5UBgbmGlpy2TOx3tnl8p1fVOdmO_9lxSu1paYcMbFGRfX_6DhBqO5FO1ttc952cdHvlBBEoE" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-label-sm font-label-sm text-on-surface line-clamp-2 leading-tight group-hover:text-primary transition-colors">Tâm sự nghề làm đàn: Nghệ thuật từ những thớ gỗ</p>
              <span className="text-[12px] text-outline mt-1">15/05/2024</span>
            </div>
          </a>
        </div>
      </div>
    </>
  )
}
export default FeatureBlog