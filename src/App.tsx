/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  Instagram, 
  Facebook, 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  CreditCard,
  DoorOpen,
  Layout,
  Lock,
  Phone
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

gsap.registerPlugin(ScrollTrigger);

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const COMPANY_NAME = "Cachoeira Esquadrias";
const WHATSAPP_LINK = "https://wa.me/5511991914631";
const INSTAGRAM_LINK = "https://www.instagram.com/cachoeira_esquadrias";
const FACEBOOK_LINK = "https://web.facebook.com/Cachoeiraesquadria";

const LOGO_URL = "https://lh3.googleusercontent.com/d/1D7u8FIxWaBCO2nCBx5GEsbVU1XH0N9fm";
const HERO_IMAGE = "https://lh3.googleusercontent.com/d/1p8N2obE5QvRcb-qv6ellh_bXXdYMKnzd";
const ABOUT_IMAGE = "https://lh3.googleusercontent.com/d/1Z947eothjK6P8yPVCVH14KMugXhwhnmF";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header scroll effect
    const handleScroll = () => {
      if (window.scrollY > 50) {
        headerRef.current?.classList.add('bg-brand-blue/95', 'py-3', 'shadow-lg');
        headerRef.current?.classList.remove('bg-transparent', 'py-5');
      } else {
        headerRef.current?.classList.remove('bg-brand-blue/95', 'py-3', 'shadow-lg');
        headerRef.current?.classList.add('bg-transparent', 'py-5');
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Hero Animations
    const ctx = gsap.context(() => {
      gsap.from('.hero-content > *', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out'
      });

      // Scroll reveals
      const sections = document.querySelectorAll('.reveal');
      sections.forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      });

      // Bento grid stagger
      gsap.from('.bento-item', {
        scrollTrigger: {
          trigger: '.bento-grid',
          start: 'top 80%'
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)'
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-brand-yellow selection:text-brand-blue">
      {/* HEADER */}
      <header 
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300 py-5 px-4 sm:px-6 lg:px-8"
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <img 
              src={LOGO_URL} 
              alt={COMPANY_NAME} 
              className="h-10 sm:h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['Início', 'Serviços', 'Diferenciais', 'Sobre', 'Contato'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-white hover:text-brand-yellow font-medium transition-colors text-sm uppercase tracking-wider"
              >
                {item}
              </a>
            ))}
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-yellow text-brand-blue px-6 py-2.5 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2 text-sm"
            >
              Orçamento Grátis
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        <div className={cn(
          "fixed inset-0 bg-brand-blue z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <button 
            className="absolute top-5 right-4 text-white p-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={32} />
          </button>
          {['Início', 'Serviços', 'Diferenciais', 'Sobre', 'Contato'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-2xl font-bold hover:text-brand-yellow transition-colors"
            >
              {item}
            </a>
          ))}
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-yellow text-brand-blue px-8 py-4 rounded-full font-bold text-lg"
          >
            Falar no WhatsApp
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="início" className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={HERO_IMAGE} 
            alt="Esquadrias de Luxo" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 via-brand-blue/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl hero-content">
            <span className="inline-block bg-brand-yellow text-brand-blue px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Excelência em Esquadrias
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-bold leading-[1.1] mb-6 text-balance">
              Transformando Ambientes com <span className="text-brand-yellow italic">Design e Segurança</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-xl leading-relaxed">
              Especialistas em portas de madeira maciça, janelas de alumínio e soluções completas para sua obra em São Paulo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-yellow text-brand-blue px-8 py-4 rounded-full font-bold hover:bg-white transition-all flex items-center justify-center gap-2 group"
              >
                Solicitar Orçamento
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#serviços"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all text-center"
              >
                Nossos Serviços
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* AUTHORITY SECTION */}
      <section className="bg-brand-blue py-8 sm:py-12 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Entrega em SP', icon: Truck, text: 'Toda a Capital' },
              { label: 'Até 6x Sem Juros', icon: CreditCard, text: 'No Cartão' },
              { label: 'Qualidade Premium', icon: ShieldCheck, text: 'Garantia Total' },
              { label: 'Especialistas', icon: CheckCircle2, text: 'Anos de Mercado' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-yellow transition-colors duration-300">
                  <item.icon className="text-brand-yellow group-hover:text-brand-blue transition-colors" size={24} />
                </div>
                <h3 className="text-white font-bold text-lg">{item.label}</h3>
                <p className="text-white/60 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="serviços" className="py-12 sm:py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16 reveal">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Nossas Soluções</h2>
            <div className="w-20 h-1.5 bg-brand-yellow mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Combinamos tradição em madeira com a modernidade do alumínio para oferecer o que há de melhor em esquadrias.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Portas de Madeira',
                desc: 'Modelos internos e externos em madeira maciça de alta durabilidade e acabamento impecável.',
                icon: DoorOpen,
                img: 'https://lh3.googleusercontent.com/d/1Zmlvo032GKE-b_6C6KaJjxQRi-fXq70i'
              },
              {
                title: 'Esquadrias de Alumínio',
                desc: 'Janelas e portas em alumínio sob medida, unindo leveza, resistência e isolamento termoacústico.',
                icon: Layout,
                img: 'https://lh3.googleusercontent.com/d/1K-dQ-RTFuZPO_1ZDlYfwTC3b9lqhSPeM'
              },
              {
                title: 'Fechaduras e Acessórios',
                desc: 'Linha completa de ferragens e fechaduras de alta segurança para complementar seu projeto.',
                icon: Lock,
                img: 'https://lh3.googleusercontent.com/d/1M3cYKv4uyu874tRYYAiZRByhO3tXsymG'
              }
            ].map((service, i) => (
              <div key={i} className="reveal group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.img} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8">
                  <div className="w-12 h-12 bg-brand-blue/5 rounded-xl flex items-center justify-center mb-6">
                    <service.icon className="text-brand-blue" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{service.desc}</p>
                  <a href={WHATSAPP_LINK} className="text-brand-blue font-bold flex items-center gap-2 hover:gap-3 transition-all">
                    Saiba mais <ChevronRight size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENTO GRID DIFFERENTIALS */}
      <section id="diferenciais" className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16 reveal">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Por que nos escolher?</h2>
            <p className="text-gray-600">Diferenciais que garantem a satisfação de nossos clientes em cada detalhe.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bento-grid">
            {/* Large Card */}
            <div className="bento-item md:col-span-2 bg-brand-blue rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-bold mb-6">Entrega Expressa em São Paulo</h3>
                <p className="text-white/80 text-lg mb-8 max-w-md">
                  Possuímos logística própria para garantir que seu pedido chegue com segurança e pontualidade em qualquer região da capital.
                </p>
                <div className="flex items-center gap-4">
                  <div className="bg-brand-yellow text-brand-blue p-3 rounded-full">
                    <Truck size={24} />
                  </div>
                  <span className="font-bold">Logística Própria</span>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            </div>

            {/* Small Card */}
            <div className="bento-item bg-brand-yellow rounded-3xl p-8 flex flex-col justify-between group">
              <CreditCard className="text-brand-blue mb-8" size={40} />
              <div>
                <h3 className="text-2xl font-bold text-brand-blue mb-2">6x Sem Juros</h3>
                <p className="text-brand-blue/70">Facilitamos seu pagamento no cartão de crédito.</p>
              </div>
            </div>

            {/* Small Card */}
            <div className="bento-item bg-brand-yellow-bg rounded-3xl p-8 flex flex-col justify-between group">
              <ShieldCheck className="text-brand-blue mb-8" size={40} />
              <div>
                <h3 className="text-2xl font-bold mb-2">Garantia Real</h3>
                <p className="text-brand-blue/70">Produtos com procedência e garantia de fábrica.</p>
              </div>
            </div>

            {/* Large Card */}
            <div className="bento-item md:col-span-2 bg-gray-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center gap-8 group">
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold mb-6">Orçamento via WhatsApp</h3>
                <p className="text-white/70 mb-8">
                  Agilidade no atendimento. Envie suas medidas e receba uma cotação personalizada em poucos minutos.
                </p>
                <a 
                  href={WHATSAPP_LINK}
                  className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition-colors"
                >
                  <Phone size={20} /> Iniciar Conversa
                </a>
              </div>
              <div className="hidden md:flex w-full md:w-1/3 aspect-square bg-white/5 rounded-2xl items-center justify-center">
                <WhatsappIcon className="w-24 h-24 text-green-500 opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="sobre" className="py-12 sm:py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 reveal">
              <div className="relative">
                <img 
                  src={ABOUT_IMAGE} 
                  alt="Nossa Fábrica" 
                  className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -right-6 bg-brand-yellow p-8 rounded-2xl shadow-xl hidden sm:block">
                  <p className="text-brand-blue font-bold text-4xl mb-1">SP</p>
                  <p className="text-brand-blue/70 text-sm font-bold uppercase tracking-widest">Atendimento</p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 reveal">
              <span className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-4 block">Nossa História</span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 leading-tight">Compromisso com a <span className="text-brand-blue italic">Qualidade e sua Segurança</span></h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  A <strong>Cachoeira Esquadrias</strong> nasceu com a missão de oferecer soluções de alto padrão em portas e janelas para o mercado paulistano.
                </p>
                <p>
                  Com foco em durabilidade e design, selecionamos as melhores matérias-primas, desde a madeira maciça certificada até o alumínio de alta performance, garantindo que cada projeto seja único e funcional.
                </p>
                <p>
                  Localizados estrategicamente em São Paulo, atendemos toda a capital com uma equipe técnica preparada para orientar sua escolha e garantir a melhor experiência de compra.
                </p>
              </div>
              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Cliente" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium text-gray-500">
                  <span className="text-brand-blue font-bold">+500</span> Projetos entregues em SP
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-12 sm:py-16 bg-brand-yellow-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16 reveal">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">O que dizem nossos clientes</h2>
            <p className="text-gray-600">A confiança de quem já transformou sua casa com a gente.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ricardo Oliveira",
                role: "Arquiteto",
                text: "As portas de madeira maciça da Cachoeira são de um acabamento superior. Indico para todos os meus projetos de alto padrão.",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              },
              {
                name: "Mariana Costa",
                role: "Proprietária",
                text: "Atendimento nota 10! As janelas de alumínio ficaram perfeitas e o isolamento acústico é maravilhoso. Entrega super rápida.",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              },
              {
                name: "André Santos",
                role: "Construtor",
                text: "Parceria de anos. Preço justo, parcelamento facilitado e material de primeira. A melhor opção em São Paulo.",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            ].map((testimonial, i) => (
              <div key={i} className="reveal bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-brand-yellow transition-colors">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-brand-yellow text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-8 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-blue">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contato" className="py-12 sm:py-16 px-4 bg-brand-yellow-bg">
        <div className="max-w-5xl mx-auto bg-brand-blue rounded-[3rem] p-6 sm:p-16 text-center text-white relative overflow-hidden reveal">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-bold mb-8 text-balance">Pronto para iniciar seu projeto?</h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Fale agora com um de nossos especialistas e receba um orçamento personalizado sem compromisso.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-brand-yellow text-brand-blue px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-3"
              >
                <WhatsappIcon size={24} /> Chamar no WhatsApp
              </a>
              <div className="flex items-center gap-4 text-white/60">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                  <Phone size={20} />
                </div>
                <div className="text-left">
                  <p className="text-xs uppercase tracking-widest">Ligue agora</p>
                  <p className="font-bold text-white">(11) 99191-4631</p>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-yellow/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white pt-12 sm:pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 sm:mb-20">
            <div className="md:col-span-2">
              <img 
                src={LOGO_URL} 
                alt={COMPANY_NAME} 
                className="h-12 w-auto mb-8"
                referrerPolicy="no-referrer"
              />
              <p className="text-white/60 max-w-sm leading-relaxed mb-8">
                Referência em esquadrias de alumínio e portas de madeira maciça em São Paulo. Qualidade, segurança e design para sua obra.
              </p>
              <div className="flex gap-4">
                <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-yellow hover:text-brand-blue transition-all">
                  <Instagram size={20} />
                </a>
                <a href={FACEBOOK_LINK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-yellow hover:text-brand-blue transition-all">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
            
            <div className="hidden md:block">
              <h4 className="font-bold mb-6 text-lg">Links Rápidos</h4>
              <ul className="space-y-4 text-white/60">
                <li><a href="#início" className="hover:text-brand-yellow transition-colors">Início</a></li>
                <li><a href="#serviços" className="hover:text-brand-yellow transition-colors">Serviços</a></li>
                <li><a href="#sobre" className="hover:text-brand-yellow transition-colors">Sobre Nós</a></li>
                <li><a href="#contato" className="hover:text-brand-yellow transition-colors">Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-lg">Endereço</h4>
              <p className="text-white/60 leading-relaxed">
                Doutor Sylvio de Campos, 785<br />
                São Paulo, SP<br />
                CEP: 05211-000
              </p>
              <p className="mt-6 text-brand-yellow font-bold">
                (11) 99191-4631
              </p>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/40">
            <p>© Copyright 2026 - {COMPANY_NAME}</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
      >
        <WhatsappIcon size={32} />
        <span className="absolute right-full mr-4 bg-white text-brand-blue px-4 py-2 rounded-lg font-bold text-sm shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Falar com Especialista
        </span>
      </a>
    </div>
  );
}

// Custom WhatsApp Icon component since lucide doesn't have a perfect one
function WhatsappIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
