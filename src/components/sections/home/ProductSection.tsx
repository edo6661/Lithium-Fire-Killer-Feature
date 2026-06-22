import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, Download, MessageSquare, ShieldCheck, Weight, Zap, MapPin, X, ShoppingCart } from 'lucide-react';
import { PRODUCT_CONTENT, type ProductVariant, type ProductPartner } from '../../../content/product';
import { AnimateIn } from '../../ui/AnimateIn';
import { StaggerChildren, StaggerItem } from '../../ui/StaggerChildren';

const VariantCard = ({ variant }: { variant: ProductVariant }) => {
  const [activeView, setActiveView] = useState<'front' | 'back' | 'left' | 'right'>('front');

  return (
    <div className="flex flex-col h-full bg-surface/40 border border-white/10 hover:border-accent/30 rounded-3xl p-8 backdrop-blur-md transition-all duration-300 shadow-xl group">
      {variant.images ? (
        <div className="mb-8 flex flex-col items-center">
          <div className="w-full aspect-square max-h-[250px] md:max-h-[300px] relative flex items-center justify-center bg-background/50 rounded-2xl overflow-hidden border border-white/5 mb-4 group/image">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent opacity-50"></div>
            <img
              src={variant.images[activeView]}
              alt={`${variant.name} - ${activeView} view`}
              className="w-full h-full object-contain p-4 transform transition-all duration-500 group-hover/image:scale-110 drop-shadow-2xl"
            />
            <span className="absolute top-3 left-3 bg-surface/80 backdrop-blur-md border border-white/10 text-[9px] font-bold px-2 py-1 rounded text-foreground-muted uppercase tracking-wider">
              {activeView}
            </span>
          </div>
          <div className="flex justify-center gap-2 w-full">
            {(['front', 'back', 'left', 'right'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 flex-1 ${activeView === view
                  ? 'bg-accent text-white shadow-[0_0_10px_rgba(56,152,212,0.4)] border border-accent'
                  : 'bg-background border border-white/10 text-foreground-muted hover:text-white hover:border-white/30'
                  }`}
              >
                {view}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 border border-white/5">
          <Weight size={24} />
        </div>
      )}

      <div className="mt-auto">
        {variant.weight && (
          <span className="block text-xs text-foreground-muted uppercase tracking-wider mb-2">Berat: {variant.weight}</span>
        )}
        <h4 className="text-xl font-bold text-white/90 mb-3 group-hover:text-accent transition-colors">
          {variant.name}
        </h4>
        {variant.desc && (
          <p className="text-sm text-foreground-muted font-light leading-relaxed">
            {variant.desc}
          </p>
        )}
      </div>
    </div>
  );
};

export const ProductSection = () => {
  const [selectedPartner, setSelectedPartner] = useState<ProductPartner | null>(null);
  const product = PRODUCT_CONTENT;

  useEffect(() => {
    if (!selectedPartner) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedPartner]);

  return (
    <section className="relative overflow-hidden bg-background border-y border-white/5 py-20 sm:py-24 lg:py-8" aria-labelledby="product-heading">
      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Header Section */}
        <AnimateIn direction="up" className="mb-16">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm">
            <Zap size={16} className="text-accent" />
            <span className="text-xs font-bold tracking-widest text-accent uppercase">
              Produk Unggulan
            </span>
          </div>
          <h2 id="product-heading" className="text-4xl md:text-5xl font-bold text-white tracking-tight max-w-4xl leading-tight">
            {product.title}
          </h2>
          <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-300 font-medium max-w-3xl leading-relaxed mt-4">
            {product.tagline}
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column - Description & Partners */}
          <div className="lg:col-span-7 space-y-12">
            <AnimateIn direction="right">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                Ikhtisar Produk
                <div className="h-[1px] flex-grow bg-gradient-to-r from-white/20 to-transparent ml-4"></div>
              </h3>
              <p className="text-foreground-muted text-lg leading-relaxed font-light mb-8">
                {product.description}
              </p>

              {product.features && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-4 p-5 rounded-2xl bg-surface/40 border border-white/5 hover:border-accent/30 transition-all duration-300 group">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <CheckCircle2 size={18} className="text-accent" />
                      </div>
                      <span className="text-foreground-muted font-light text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </AnimateIn>

            {/* Partners */}
            <AnimateIn direction="up">
              <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
                Tersedia di Offline Store
                <div className="h-[1px] flex-grow bg-gradient-to-r from-white/20 to-transparent ml-4"></div>
              </h3>
              <div className="flex flex-wrap gap-6 items-center">
                {product.partners.map((partner, index) => (
                  <button
                    key={index}
                    onClick={() => partner.locations ? setSelectedPartner(partner as ProductPartner) : undefined}
                    className="bg-gradient-to-br from-accent/10 via-surface to-background border border-white/10 px-6 py-4 rounded-2xl hover:border-accent/30 hover:bg-surface/80 transition-all duration-300 group cursor-pointer focus:outline-none"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-8 sm:h-10 w-auto object-contain filter transition-all duration-300 opacity-80 group-hover:opacity-100"
                    />
                  </button>
                ))}
              </div>
            </AnimateIn>
          </div>

          {/* Right Column - Sticky CTA Card */}
          <div className="lg:col-span-5">
            <AnimateIn direction="left" className="relative overflow-hidden p-8 md:p-10 rounded-3xl bg-surface border border-accent/30 shadow-[0_10px_40px_rgba(56,152,212,0.15)] group lg:sticky lg:top-28">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-surface to-background opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-accent/30 blur-3xl rounded-full"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-background border border-white/10 flex items-center justify-center text-accent mb-6">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Keamanan Terjamin</h3>
                <p className="text-foreground-muted text-sm mb-8 font-light leading-relaxed">
                  Dapatkan produk resmi dengan sertifikasi SNI dan TKDN. Hubungi kami untuk penawaran dan solusi terbaik bagi bisnis Anda.
                </p>

                <div className="space-y-4">
                  {product.brochureUrl && (
                    <a
                      href={product.brochureUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white/5 hover:bg-white/10 border border-white/20 text-white font-semibold py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 group/btn text-sm uppercase tracking-wide"
                    >
                      <Download size={18} className="group-hover/btn:-translate-y-1 transition-transform" />
                      Unduh Brosur
                    </a>
                  )}

                  {product.tokopediaUrl && (
                    <a
                      href={product.tokopediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#03AC0E]/10 hover:bg-[#03AC0E]/20 border border-[#03AC0E]/30 text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_15px_rgba(3,172,14,0.1)] hover:shadow-[0_0_25px_rgba(3,172,14,0.25)] hover:-translate-y-1 text-sm uppercase tracking-wide group/tokped"
                    >
                      <ShoppingCart size={18} className="text-[#03AC0E] group-hover/tokped:scale-110 transition-transform" />
                      Beli di Tokopedia
                    </a>
                  )}

                  <a
                    href={`https://wa.me/6281290003278?text=Halo%20tim%20FAST,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(product.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-accent hover:bg-accent/80 text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(56,152,212,0.4)] hover:shadow-[0_0_30px_rgba(56,152,212,0.6)] hover:-translate-y-1 text-sm uppercase tracking-wide"
                  >
                    <MessageSquare size={18} />
                    Hubungi Sales
                  </a>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>

        {/* Variants Section */}
        {product.variants && (
          <div className="pt-20 mt-12 border-t border-white/10">
            <AnimateIn direction="up" className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">Varian Produk</h3>
              <p className="max-w-2xl mx-auto text-foreground-muted font-light leading-relaxed">
                Pilih ukuran dan kapasitas silinder yang paling sesuai dengan skala kebutuhan proteksi Anda.
              </p>
            </AnimateIn>

            <StaggerChildren staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {product.variants.map((variant, index) => (
                <StaggerItem key={index}>
                  <VariantCard variant={variant} />
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        )}
      </div>

      {/* Partner Locations Modal — portaled to body so fixed positioning isn't clipped by section overflow-hidden */}
      {selectedPartner && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={() => setSelectedPartner(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="partner-locations-title"
            className="bg-surface border border-accent/30 rounded-3xl p-8 max-w-md w-full shadow-[0_10px_40px_rgba(56,152,212,0.15)] relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPartner(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-2 transition-colors focus:outline-none"
            >
              <X size={20} />
            </button>

            <div className="flex justify-center mb-6 bg-white/5 p-6 rounded-2xl border border-white/5">
              <img
                src={selectedPartner.logo}
                alt={selectedPartner.name}
                className="h-12 object-contain filter opacity-90 scale-125"
              />
            </div>

            <h4 id="partner-locations-title" className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <MapPin className="text-accent" size={24} />
              Lokasi Tersedia
            </h4>

            <ul className="space-y-3 mt-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {selectedPartner.locations?.map((loc, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground-muted font-light p-3 rounded-xl bg-background/50 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(56,152,212,0.6)] flex-shrink-0"></div>
                  <span>{loc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};