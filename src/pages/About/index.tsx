import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Award, Users, TrendingUp, MapPin, CheckCircle, ArrowRight
 } from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { Button } from "../../components/ui/Button";
import { useScrollAnimation } from "../../hooks";
import { PLATFORM_STATS, TESTIMONIALS } from "../../data/agents.data";
import { SectionHeader } from "../../components/common/SectionHeader";
import { StarRating } from "../../components/ui/StarRating";

const TEAM = [
  { name: "Brian Kimani",   role: "CEO & Co-Founder",      photo: "https://randomuser.me/api/portraits/men/41.jpg",  bio: "15 years in real estate, former MD at Knight Frank Kenya." },
  { name: "Amina Hassan",   role: "CTO & Co-Founder",      photo: "https://randomuser.me/api/portraits/women/55.jpg", bio: "Ex-Safaricom engineer, led digital transformation at Equity Bank." },
  { name: "Peter Ng'ang'a", role: "Head of Operations",    photo: "https://randomuser.me/api/portraits/men/72.jpg",  bio: "10 years in property management across East Africa." },
  { name: "Lucy Wanjiku",   role: "Head of Agent Success", photo: "https://randomuser.me/api/portraits/women/68.jpg", bio: "Real estate trainer with 1,200+ agents certified." },
];

const VALUES = [
  { icon: <Shield className="w-6 h-6" />,     title: "Trust & Transparency",   desc: "Every listing is verified. We only partner with licensed agents and developers." },
  { icon: <Award className="w-6 h-6" />,      title: "Quality First",          desc: "We curate only the best properties — no spam, no unverified listings." },
  { icon: <Users className="w-6 h-6" />,      title: "People-Centric",         desc: "Behind every property search is a family, a dream, a major life decision. We take that seriously." },
  { icon: <TrendingUp className="w-6 h-6" />, title: "Innovation",             desc: "We use technology to make Kenya's property market more accessible and efficient." },
];

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => {
  const { ref, inView } = useScrollAnimation();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const About: React.FC = () => {
  return (
    <PageWrapper>
      <section className="relative bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-white/60 bg-white/10 px-4 py-2 rounded-full mb-6">
              Our Story
            </span>
            <h1 className="font-display text-display-lg text-white mb-6 leading-tight">
              We're building Kenya's<br />most trusted property platform
            </h1>
            <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
              Domio was born from a simple frustration: finding a good property in Kenya was harder than it needed to be.
              We're changing that — one verified listing at a time.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-14 border-b border-ink-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {PLATFORM_STATS.map((stat, i) => (
              <FadeIn key={stat.id} delay={i * 0.1} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <p className="font-display text-3xl text-ink-900 mb-1">{stat.value}</p>
                <p className="text-sm font-semibold text-ink-600">{stat.label}</p>
                {stat.description && <p className="text-xs text-ink-400 mt-1">{stat.description}</p>}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-ink-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4 block">Our Mission</span>
              <h2 className="font-display text-display-md text-ink-900 mb-5 leading-tight">
                Making property accessible to every Kenyan
              </h2>
              <p className="text-ink-600 leading-relaxed mb-6">
                Whether you're a first-time renter in Nairobi, a family buying their dream home in Karen,
                or an investor looking for the next opportunity — Domio gives you the tools, data and trusted
                agents to make confident decisions.
              </p>
              <p className="text-ink-600 leading-relaxed mb-8">
                We verify every listing, vet every agent and constantly improve our platform based on your feedback.
                Because finding a property should be exciting — not exhausting.
              </p>
              <div className="space-y-3">
                {["Every listing is verified by our team", "All agents are licensed and background-checked", "Real-time market data and price insights", "24/7 customer support in Swahili and English"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-ink-700">{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="relative rounded-3xl overflow-hidden h-80 lg:h-96">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                  alt="Domio office"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="font-bold text-lg">Domio HQ</p>
                  <p className="text-sm text-white/70 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> Westlands, Nairobi
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12">
            <SectionHeader tag="What We Stand For" title="Our Values" align="center" />
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.1}>
                <div className="bg-ink-50 rounded-3xl p-6 hover:bg-primary-50 transition-colors duration-300 group h-full">
                  <div className="w-12 h-12 rounded-2xl bg-primary-100 group-hover:bg-primary-200 flex items-center justify-center text-primary-600 mb-4 transition-colors">
                    {v.icon}
                  </div>
                  <h3 className="font-bold text-ink-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-ink-600 leading-relaxed">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-ink-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12">
            <SectionHeader tag="The People Behind Domio" title="Our Leadership Team" align="center" />
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.08}>
                <div className="bg-white rounded-3xl overflow-hidden shadow-card text-center group hover:shadow-card-hover transition-all duration-300">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/30 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-ink-900 text-sm">{member.name}</h3>
                    <p className="text-xs text-accent font-semibold mt-0.5 mb-2">{member.role}</p>
                    <p className="text-xs text-ink-500 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12">
            <SectionHeader tag="Client Stories" title="What our users say" align="center" />
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {TESTIMONIALS.slice(0, 4).map((t, i) => (
              <FadeIn key={t.id} delay={i * 0.08}>
                <div className="bg-ink-50 rounded-3xl p-6 h-full">
                  <StarRating rating={t.rating} showNumber />
                  <p className="text-ink-700 text-sm leading-relaxed mt-4 mb-5 italic">"{t.comment}"</p>
                  <div className="flex items-center gap-3">
                    <img src={t.photo} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-ink-900 text-sm">{t.name}</p>
                      <p className="text-xs text-ink-500">{t.role}{t.company ? ` · ${t.company}` : ""}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-display text-display-md text-white mb-5">Ready to find your perfect property?</h2>
            <p className="text-white/70 mb-8 text-lg">Join 50,000+ Kenyans who trust Domio for their real estate journey.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/search">
                <Button size="xl" variant="white" className="text-ink-900" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Browse Properties
                </Button>
              </Link>
              <Link to="/search?purpose=sale">
                <Button size="xl" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                  Properties for Sale
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageWrapper>
  );
};

export default About;