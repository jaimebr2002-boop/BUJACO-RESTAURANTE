/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  Menu as MenuIcon, 
  X,
  ArrowDown,
  ExternalLink,
  UtensilsCrossed,
  Facebook,
  Mail
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Carta', href: '#carta' },
    { name: 'Reseñas', href: '#reseñas' },
    { name: 'Visítanos', href: '#visitanos' },
    { name: 'Reserva', href: '#reserva' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-dark/90 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#inicio" className="flex items-center space-x-4 group">
          <img 
            src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773172957/624767883_122098104891242037_2682391502702662992_n_dipdii.jpg" 
            alt="Bujaco Logo" 
            className="h-12 md:h-16 w-auto object-contain transition-transform group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-serif font-bold tracking-tighter text-white leading-none">
              BUJACO
            </span>
            <span className="text-[10px] md:text-xs font-sans tracking-[0.3em] text-gold font-bold uppercase leading-none mt-1">
              RESTAURANTE
            </span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm uppercase tracking-widest hover:text-gold transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-dark border-t border-white/10 py-8 px-6 flex flex-col space-y-6 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-serif tracking-wide text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ 
            backgroundImage: 'url("https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773172957/634450890_122107184181242037_9195354452245433444_n_apefhm.jpg")',
            filter: 'brightness(0.4)'
          }}
        />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-8xl font-serif mb-6 leading-tight">
            Bujaco Restaurante
          </h1>
          <p className="text-xl md:text-2xl text-gold font-serif italic mb-4">
            En la Plaza Mayor de Cáceres 🏰
          </p>
          <p className="hidden md:block text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Carta, Tapas y Raciones caseras con esencia extremeña 🍷🍽️. 
            En pleno centro del casco antiguo, disfruta de buena comida en un ambiente acogedor e informal con vistas históricas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#carta" 
              className="px-8 py-4 bg-gold text-dark font-bold uppercase tracking-widest rounded-full hover:bg-white transition-all duration-300 w-full sm:w-auto"
            >
              Ver Carta
            </a>
            <a 
              href="#visitanos" 
              className="px-8 py-4 border border-white/30 text-white font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-dark transition-all duration-300 w-full sm:w-auto"
            >
              Cómo llegar
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center"
      >
        <span className="text-xs uppercase tracking-[0.3em] mb-2">Scroll</span>
        <ArrowDown size={20} />
      </motion.div>
    </section>
  );
};

const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="text-center mb-16">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-serif mb-4"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="w-24 h-1 bg-gold mx-auto mb-6"
      />
    )}
  </div>
);

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section id="nosotros" ref={containerRef} className="py-24 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-8">Sobre Nosotros</h2>
          <div className="space-y-6 text-lg text-white/70 leading-relaxed">
            <p>
              Bujaco Restaurante es un lugar donde tradición, sabor y ambiente se unen para ofrecer una experiencia gastronómica única en pleno corazón de Cáceres.
            </p>
            <p>
              Ubicado en la emblemática Plaza Mayor, nuestro restaurante es el lugar perfecto para disfrutar de tapas, raciones y platos elaborados con esencia extremeña.
            </p>
            <p className="text-gold font-serif italic text-xl">
              Apostamos por una cocina casera, sabrosa y pensada para compartir.
            </p>
            <p>
              Nuestro espacio combina un ambiente acogedor e informal con una terraza que ofrece unas vistas únicas del casco histórico, convirtiendo cada comida o cena en un momento especial.
            </p>
          </div>
        </motion.div>
        
        <div className="relative">
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
          >
            <img 
              src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773172958/649072293_122111459673242037_9195253520104982788_n_rqab0l.jpg" 
              alt="Ambiente Bujaco" 
              className="w-full h-full object-cover scale-110"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <motion.div 
            style={{ y: y2 }}
            className="absolute -bottom-8 -left-8 w-48 h-48 rounded-2xl overflow-hidden border-8 border-dark hidden lg:block shadow-2xl"
          >
            <img 
              src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773172957/625014117_122098108437242037_7686034361980669640_n_hdcnfb.jpg" 
              alt="Detalle" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const MenuCard: React.FC<{ name: string; description: string }> = ({ name, description }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="group glass-card rounded-2xl p-8 transition-all duration-500 border-l-4 border-l-gold/30 hover:border-l-gold"
  >
    <h3 className="text-2xl font-serif mb-3 group-hover:text-gold transition-colors">{name}</h3>
    <p className="text-white/60 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const Menu = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const dishes = [
    {
      name: "Arroz con bogavante",
      description: "Nuestro plato estrella, elaborado con arroz de calidad y bogavante fresco, lleno de sabor a mar.",
      image: "https://images.unsplash.com/photo-1512058560366-cd242959b4fe?q=80&w=2069&auto=format&fit=crop"
    },
    {
      name: "Carpaccio de pato",
      description: "Finas láminas de pato curado con un toque de aceite de oliva virgen extra y lascas de queso.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop"
    },
    {
      name: "Tapas caseras",
      description: "Variedad de bocados tradicionales elaborados diariamente con productos de la tierra.",
      image: "https://images.unsplash.com/photo-1515443961218-152367888e6b?q=80&w=2070&auto=format&fit=crop"
    },
    {
      name: "Raciones para compartir",
      description: "Platos generosos pensados para disfrutar en compañía, desde embutidos hasta frituras.",
      image: "https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=2070&auto=format&fit=crop"
    },
    {
      name: "Especialidades de la casa",
      description: "Sugerencias del chef que cambian según temporada para ofrecer lo mejor del mercado.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <section id="carta" ref={containerRef} className="py-24 bg-stone-950 relative overflow-hidden">
      <motion.div 
        style={{ y }}
        className="absolute top-0 right-0 text-[20rem] font-serif font-bold text-white/[0.02] select-none pointer-events-none leading-none"
      >
        CARTA
      </motion.div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle title="Nuestra Carta" subtitle="Gastronomía" />
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-lg text-white/70 max-w-3xl mx-auto mb-16"
        >
          En Bujaco Restaurante apostamos por una cocina sencilla, sabrosa y auténtica. Nuestra carta combina tapas, raciones y platos elaborados con productos de calidad y el sabor tradicional extremeño.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((dish, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <MenuCard 
                name={dish.name}
                description={dish.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const reviews = [
    {
      text: "Experiencia muy agradable! El arroz con bogavante espectacular, el carpaccio de pato muy muy rico y el servicio inmejorable!",
      author: "Cliente Satisfecho",
      response: "Muchas gracias por tomarse el tiempo de escribir una reseña sobre nuestro restaurante. Nos alegra saber que disfrutó su experiencia con nosotros."
    },
    {
      text: "Anoche cené con mi familia en el restaurante Bujaco y fue un acierto, la experiencia fue simplemente impecable. Se nota muchísimo el cambio de dueños: el trato es cercano, profesional y lleno de amabilidad desde el primer momento.",
      author: "Familia García",
      response: "Agradecemos de corazón sus palabras. Nos motiva seguir trabajando para ofrecer lo mejor a nuestros clientes."
    },
    {
      text: "Las vistas desde la terraza son inmejorables. Unas tapas excelentes en plena Plaza Mayor. Repetiremos sin duda.",
      author: "Viajero Gastronómico",
      response: "¡Qué alegría! Esperamos verles pronto de nuevo por aquí."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section id="reseñas" className="py-24 bg-dark relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <SectionTitle title="Lo que dicen nuestros clientes" subtitle="Opiniones" />

        <div className="relative glass-card p-10 md:p-16 rounded-3xl">
          <div className="absolute top-8 left-8 text-gold/20">
            <UtensilsCrossed size={80} />
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-gold fill-gold mr-1" />
                ))}
              </div>
              <p className="text-2xl md:text-3xl font-serif italic mb-8 leading-relaxed">
                "{reviews[currentIndex].text}"
              </p>
              <div className="flex items-center justify-between">
                <span className="font-bold uppercase tracking-widest text-gold text-sm">
                  {reviews[currentIndex].author}
                </span>
              </div>

              {reviews[currentIndex].response && (
                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-sm text-white/40 uppercase tracking-widest mb-2">Respuesta del propietario:</p>
                  <p className="text-white/60 italic">"{reviews[currentIndex].response}"</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-end mt-10 space-x-4">
            <button 
              onClick={prev}
              className="p-3 rounded-full border border-white/10 hover:bg-gold hover:text-dark transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={next}
              className="p-3 rounded-full border border-white/10 hover:bg-gold hover:text-dark transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <motion.a 
            href="https://www.google.com/maps/place/Bujaco+Restaurante/@39.4753782,-6.3714294,17z/data=!4m17!1m10!3m9!1s0xd15dfa88a87b621:0x163fc994750de933!2sBujaco+Restaurante!8m2!3d39.4754331!4d-6.371404!10e5!14m1!1BCgIgARICGAI!16s%2Fg%2F11n425yfbd!3m5!1s0xd15dfa88a87b621:0x163fc994750de933!8m2!3d39.4754331!4d-6.371404!16s%2Fg%2F11n425yfbd?entry=ttu&g_ep=EgoyMDI2MDMwOC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-3 px-10 py-5 border-2 border-gold/50 text-gold font-bold uppercase tracking-[0.2em] rounded-full hover:bg-gold hover:text-dark transition-all duration-300 shadow-lg shadow-gold/10"
          >
            <span>Dejar reseña en Google</span>
            <ExternalLink size={20} />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

const Visit = () => {
  const schedule = [
    { day: "Martes", hours: "11:00 – 23:00" },
    { day: "Miércoles", hours: "11:00 – 23:00" },
    { day: "Jueves", hours: "11:00 – 23:00" },
    { day: "Viernes", hours: "11:00 – 24:00" },
    { day: "Sábado", hours: "11:00 – 24:00" },
    { day: "Domingo", hours: "11:00 – 23:00" },
    { day: "Lunes", hours: "Cerrado", closed: true },
  ];

  return (
    <section id="visitanos" className="py-24 bg-stone-950">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle title="Visítanos" subtitle="Ubicación" />

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass-card p-8 rounded-2xl">
              <div className="flex items-start space-x-4 mb-8">
                <div className="p-3 bg-gold/10 text-gold rounded-lg">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-serif mb-2">Dirección</h3>
                  <p className="text-white/60">Pl. Mayor, 28<br />Centro-Casco Antiguo<br />10003 Cáceres</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 mb-8">
                <div className="p-3 bg-gold/10 text-gold rounded-lg">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-serif mb-2">Teléfono</h3>
                  <p className="text-white/60">656 94 79 49</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gold/10 text-gold rounded-lg">
                  <Clock size={24} />
                </div>
                <div className="w-full">
                  <h3 className="text-xl font-serif mb-4">Horario</h3>
                  <div className="space-y-2">
                    {schedule.map((item) => (
                      <div key={item.day} className="flex justify-between text-sm">
                        <span className={item.closed ? 'text-white/30' : 'text-white/80'}>{item.day}</span>
                        <span className={item.closed ? 'text-red-500/50' : 'text-white/60'}>{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://www.google.com/maps/place/Bujaco+Restaurante/@39.4754331,-6.371404,15z/data=!4m17!1m10!3m9!1s0xd15dfa88a87b621:0x163fc994750de933!2sBujaco+Restaurante!8m2!3d39.4754331!4d-6.371404!10e5!14m1!1BCgIgARICGAI!16s%2Fg%2F11n425yfbd!3m5!1s0xd15dfa88a87b621:0x163fc994750de933!8m2!3d39.4754331!4d-6.371404!16s%2Fg%2F11n425yfbd?entry=ttu&g_ep=EgoyMDI2MDMwOC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-8 py-4 bg-white text-dark font-bold uppercase tracking-widest rounded-xl text-center hover:bg-gold transition-all"
              >
                Cómo llegar
              </a>
              <a 
                href="tel:656947949"
                className="flex-1 px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest rounded-xl text-center hover:bg-white/10 transition-all"
              >
                Llamar ahora
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            <iframe 
              src="https://maps.google.com/maps?q=39.4754331,-6.371404&z=16&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Bujaco Restaurante"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Reservation = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section id="reserva" ref={containerRef} className="py-24 bg-dark relative overflow-hidden">
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 opacity-20"
      >
        <img 
          src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773172958/648275245_122111458977242037_559767733751627759_n_mrbyza.jpg" 
          alt="Restaurante" 
          className="w-full h-full object-cover scale-125"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-serif mb-8">Reserva tu mesa</h2>
          <p className="text-xl text-white/70 mb-12 leading-relaxed">
            Reserva tu mesa y disfruta de una experiencia gastronómica en pleno corazón de Cáceres. Ya sea para una comida tranquila, una cena especial o un encuentro con amigos, en Bujaco Restaurante estaremos encantados de recibirte.
          </p>
          
          <motion.a 
            href="tel:656947949"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-12 py-6 bg-gold text-dark font-bold text-xl uppercase tracking-[0.2em] rounded-full shadow-2xl hover:bg-white transition-all duration-300"
          >
            Llamar para reservar
          </motion.a>
          
          <p className="mt-8 text-gold font-serif text-2xl">656 94 79 49</p>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-16 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6">BUJACO<span className="text-gold">.</span></h3>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Tradición, sabor y ambiente en la emblemática Plaza Mayor de Cáceres. La esencia de Extremadura en cada plato.
            </p>
          </div>
          
          <div>
            <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-6">Contacto</h4>
            <p className="text-white/60 text-sm mb-2">Pl. Mayor, 28</p>
            <p className="text-white/60 text-sm mb-2">10003 Cáceres</p>
            <p className="text-white/60 text-sm">656 94 79 49</p>
            <a href="mailto:bujacorestaurante@gmail.com" className="text-gold text-sm hover:underline">bujacorestaurante@gmail.com</a>
          </div>
          
          <div>
            <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-6">Horario</h4>
            <p className="text-white/60 text-sm mb-2">Martes a Domingo: 11:00 – 23:00</p>
            <p className="text-white/60 text-sm mb-2">Viernes y Sábado: hasta 24:00</p>
            <p className="text-white/60 text-sm">Lunes: Cerrado</p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} Bujaco Restaurante – Todos los derechos reservados
          </p>
          <div className="flex space-x-6">
            <a href="https://www.facebook.com/people/Bujaco-Restaurante/61587261117356/" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-gold transition-colors"><Facebook size={18} /></a>
            <a href="mailto:bujacorestaurante@gmail.com" className="text-white/20 hover:text-gold transition-colors"><Mail size={18} /></a>
            <a href="#visitanos" className="text-white/20 hover:text-gold transition-colors"><MapPin size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Reviews />
      <Visit />
      <Reservation />
      <Footer />
    </div>
  );
}
