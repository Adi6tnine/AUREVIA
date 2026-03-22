import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { customEase } from '../utils/constants';

export const StaticPage = ({ label, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0, transition: { duration: 0.9, ease: customEase } }}
    exit={{ opacity: 0, y: -10, transition: { duration: 0.6, ease: customEase } }}
    className="min-h-screen bg-[#FDFBF7]"
  >
    <div className="pt-36 pb-16 px-6 md:px-12 text-center border-b border-[#F0EBE8]">
      <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A96E] font-sans-ui mb-3">{label}</p>
      <h1 className="font-serif-heading italic text-4xl md:text-6xl text-[#2C2826]">{title}</h1>
    </div>
    <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">{children}</div>
  </motion.div>
);

const P = ({ children }) => (
  <p className="text-sm font-light text-[#6B6B6B] leading-relaxed mb-6">{children}</p>
);
const H2 = ({ children }) => (
  <h2 className="font-serif-heading italic text-2xl md:text-3xl text-[#2C2826] mt-12 mb-4">{children}</h2>
);
const H3 = ({ children }) => (
  <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A96E] font-sans-ui mt-8 mb-3">{children}</p>
);
const Divider = () => <div className="h-px bg-[#F0EBE8] my-10" />;

export const OurStoryPage = () => (
  <StaticPage label="About Aurevia" title="Our Story">
    <P>Aurevia began in a small Parisian atelier in 2024, born from a single conviction: that true luxury is felt, not flaunted. Our founder, a lifelong collector of antique jewellery, grew tired of pieces that looked beautiful in photographs but felt hollow in the hand.</P>
    <P>She spent two years sourcing the finest freshwater and Akoya pearls — holding each one to the light, feeling its weight, studying the way it caught the morning sun. Only when she found pearls that moved her did she begin to design.</P>
    <H2>The Atelier</H2>
    <P>Every Aurevia piece is made by hand in our Paris atelier by a team of four artisans. We produce no more than 200 pieces per season. When something sells out, it is gone. That is the point.</P>
    <P>We believe in slowness. In the quiet satisfaction of a clasp that closes perfectly. In the weight of a pearl that has been chosen, not manufactured.</P>
    <H2>Our Promise</H2>
    <P>We use only 18k gold vermeil and ethically sourced pearls. Every piece comes with a certificate of authenticity and a lifetime care guarantee.</P>
    <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-[#F0EBE8]">
      {[['200', 'Pieces per season'], ['18k', 'Gold vermeil'], ['100%', 'Handstrung']].map(([n, l]) => (
        <div key={l} className="text-center">
          <p className="font-serif-heading italic text-4xl text-[#C9A96E]">{n}</p>
          <p className="text-[9px] tracking-[0.2em] uppercase text-[#6B6B6B] font-sans-ui mt-2">{l}</p>
        </div>
      ))}
    </div>
  </StaticPage>
);

export const CraftsmanshipPage = () => (
  <StaticPage label="How we make it" title="Craftsmanship">
    <P>Every Aurevia piece passes through the same unhurried process — one that has not changed since we opened our atelier.</P>
    <H2>Pearl Selection</H2>
    <P>We source pearls directly from farms in Japan and the freshwater lakes of southern China. Each pearl is graded by hand for lustre, surface quality, shape, and nacre thickness. We reject approximately 70% of what we receive.</P>
    <H2>Stringing</H2>
    <P>Our necklaces are hand-strung using a double-knotting technique between each pearl. This prevents loss if the thread breaks and allows the necklace to drape naturally. Each strand takes between two and four hours to complete.</P>
    <H2>Setting</H2>
    <P>Rings and earrings are set using traditional goldsmithing tools. The gold vermeil is applied in a layer no less than 2.5 microns — significantly thicker than industry standard.</P>
    <H2>Finishing</H2>
    <P>Every piece is polished by hand, inspected under magnification, and worn briefly by one of our artisans before packaging. If it does not feel right, it does not leave the atelier.</P>
  </StaticPage>
);

export const SustainabilityPage = () => (
  <StaticPage label="Our responsibility" title="Sustainability">
    <P>We believe that making less is the most sustainable thing a jewellery brand can do. Our 200-piece seasonal limit is not a marketing strategy — it is a commitment to intentional production.</P>
    <H2>Ethical Sourcing</H2>
    <P>All pearls are sourced from farms that meet our strict environmental and labour standards. We visit each farm personally before establishing a relationship, and we pay above-market rates to ensure fair compensation.</P>
    <H2>Materials</H2>
    <P>Our gold vermeil uses recycled sterling silver as its base. Our packaging is made from FSC-certified paper and printed with vegetable-based inks. We use no plastic in any part of our supply chain.</P>
    <H2>Carbon-Neutral Shipping</H2>
    <P>All Aurevia shipments are carbon-neutral through our partnership with a verified offset programme. We also offer a repair service for life — because the most sustainable piece is one that lasts forever.</P>
    <H2>The Repair Promise</H2>
    <P>If your Aurevia piece ever needs restringing, re-setting, or polishing, send it back to us. We will restore it at no charge. Jewellery should be inherited, not discarded.</P>
  </StaticPage>
);

export const PressPage = () => (
  <StaticPage label="In the press" title="Press">
    <P>Aurevia has been featured in leading publications across Europe and beyond. For press enquiries, samples, or interview requests, please contact our press office.</P>
    <H2>Recent Coverage</H2>
    {[
      { pub: 'Vogue France', date: 'March 2026', quote: '"The most quietly covetable jewellery we have seen this season."' },
      { pub: "Harper's Bazaar UK", date: 'February 2026', quote: '"Aurevia understands something most brands have forgotten — restraint is its own kind of luxury."' },
      { pub: 'Le Figaro Madame', date: 'January 2026', quote: '"Une maison qui fait peu, mais fait bien."' },
      { pub: 'Wallpaper*', date: 'December 2025', quote: '"The pearl, reimagined for a generation that values craft over noise."' },
    ].map((item) => (
      <div key={item.pub} className="mb-8 pb-8 border-b border-[#F0EBE8] last:border-0">
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#C9A96E] font-sans-ui mb-1">{item.pub} · {item.date}</p>
        <p className="font-serif-heading italic text-xl text-[#2C2826]">{item.quote}</p>
      </div>
    ))}
    <H2>Press Contact</H2>
    <P>For all press enquiries: press@aurevia.com</P>
  </StaticPage>
);

export const StockistsPage = () => (
  <StaticPage label="Find us" title="Stockists">
    <P>Aurevia is available online and through a carefully selected network of concept stores and boutiques.</P>
    {[
      { city: 'Paris', stores: ['Merci, 111 Boulevard Beaumarchais', 'Colette Archive, Rue Saint-Honoré'] },
      { city: 'London', stores: ['Dover Street Market, 18–22 Haymarket', 'Liberty London, Great Marlborough Street'] },
      { city: 'Milan', stores: ['10 Corso Como, Corso Como 10'] },
      { city: 'New York', stores: ['Opening Ceremony, Howard Street', 'Bergdorf Goodman, Fifth Avenue'] },
      { city: 'Tokyo', stores: ['Isetan Shinjuku, 3-14-1 Shinjuku'] },
    ].map((s) => (
      <div key={s.city} className="mb-8">
        <H3>{s.city}</H3>
        {s.stores.map((store) => (
          <p key={store} className="text-sm font-light text-[#6B6B6B] font-sans-ui mb-1">{store}</p>
        ))}
      </div>
    ))}
    <Divider />
    <P>To enquire about stocking Aurevia in your store: wholesale@aurevia.com</P>
  </StaticPage>
);

export const ShippingPage = () => (
  <StaticPage label="Delivery & returns" title="Shipping & Returns">
    <H2>Shipping</H2>
    {[
      ['Free Standard Shipping', 'On all orders over $200. Delivered in 3–5 business days.'],
      ['Express Shipping', '$12. Delivered in 1–2 business days.'],
      ['International Shipping', 'Available to 40+ countries. Rates calculated at checkout. Delivered in 5–10 business days.'],
    ].map(([t, d]) => (
      <div key={t} className="mb-6"><H3>{t}</H3><P>{d}</P></div>
    ))}
    <Divider />
    <H2>Returns</H2>
    <P>We offer free returns within 30 days of delivery. Items must be unworn, in their original packaging, with all tags attached.</P>
    <P>To initiate a return, email returns@aurevia.com with your order number. We will send a prepaid return label within 24 hours. Refunds are processed within 5 business days of receiving the item.</P>
    <H2>Exchanges</H2>
    <P>We are happy to exchange for a different size or variant. Contact us at returns@aurevia.com and we will arrange the exchange at no additional cost.</P>
  </StaticPage>
);

export const SizeGuidePage = () => (
  <StaticPage label="Find your fit" title="Size Guide">
    <H2>Ring Sizes</H2>
    <P>Our rings are available in sizes 5 through 8. If you are between sizes, we recommend sizing up.</P>
    <div className="overflow-x-auto mb-8">
      <table className="w-full text-sm font-sans-ui">
        <thead>
          <tr className="border-b border-[#F0EBE8]">
            {['Size', 'Diameter (mm)', 'Circumference (mm)', 'US Size'].map((h) => (
              <th key={h} className="text-left py-3 pr-6 text-[9px] tracking-[0.2em] uppercase text-[#C9A96E]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[['5','15.7','49.3','5'],['6','16.5','51.9','6'],['7','17.3','54.4','7'],['8','18.2','57.2','8']].map((row) => (
            <tr key={row[0]} className="border-b border-[#F0EBE8]/50">
              {row.map((cell, i) => <td key={i} className="py-3 pr-6 text-[#6B6B6B] font-light">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <H2>Necklace Lengths</H2>
    {[
      ['Choker (16")', 'Sits at the base of the neck. Suits all necklines.'],
      ['Princess (18")', 'The most versatile length. Falls just below the collarbone.'],
      ['Matinee (20–24")', 'Falls at or just below the bust. Elegant for layering.'],
    ].map(([name, desc]) => (
      <div key={name} className="mb-4"><H3>{name}</H3><P>{desc}</P></div>
    ))}
    <H2>How to Measure</H2>
    <P>For rings: wrap a thin strip of paper around your finger, mark where it overlaps, and measure the length in millimetres.</P>
    <P>For necklaces: use a soft measuring tape around your neck at the desired length, or measure an existing necklace you love.</P>
  </StaticPage>
);

export const CarePage = () => (
  <StaticPage label="Keep it beautiful" title="Care Instructions">
    <P>Pearls are organic gems — they require a little more care than metal jewellery, but reward that care with a lustre that deepens over time.</P>
    <H2>Daily Wear</H2>
    <P>Put your pearls on last, after applying perfume, hairspray, and cosmetics. Remove your pearls before swimming, bathing, or exercising.</P>
    <H2>Cleaning</H2>
    <P>Wipe pearls gently with a soft, damp cloth after each wear to remove skin oils and perspiration. Never use ultrasonic cleaners, steam, or harsh chemicals.</P>
    <H2>Storage</H2>
    <P>Store pearls separately from other jewellery to prevent scratching. The velvet pouch provided with your Aurevia piece is ideal. Avoid airtight containers — pearls need a small amount of moisture to maintain their lustre.</P>
    <H2>Restringing</H2>
    <P>We recommend restringing pearl necklaces every 1–2 years with regular wear. Aurevia offers a complimentary restringing service for life. Contact care@aurevia.com to arrange.</P>
    <H2>Gold Vermeil</H2>
    <P>Avoid contact with chlorine, salt water, and abrasive surfaces. Store in the pouch provided when not wearing.</P>
  </StaticPage>
);

export const ContactPage = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) setSent(true);
  };
  return (
    <StaticPage label="Get in touch" title="Contact Us">
      <P>We would love to hear from you. Whether you have a question about a piece, need help with an order, or simply want to say hello — our team responds within 24 hours.</P>
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {[['General', 'hello@aurevia.com'], ['Orders & Returns', 'returns@aurevia.com'], ['Press', 'press@aurevia.com']].map(([label, email]) => (
          <div key={label}><H3>{label}</H3><p className="text-sm text-[#6B6B6B] font-sans-ui">{email}</p></div>
        ))}
      </div>
      <Divider />
      {sent ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
          <p className="font-serif-heading italic text-3xl text-[#2C2826] mb-3">Thank you.</p>
          <p className="text-sm text-[#6B6B6B] font-sans-ui">We will be in touch within 24 hours.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { id: 'name', label: 'Your Name', type: 'text', placeholder: 'Name' },
            { id: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
          ].map((f) => (
            <div key={f.id}>
              <label className="block text-[9px] tracking-[0.3em] uppercase text-[#6B6B6B] font-sans-ui mb-2">{f.label}</label>
              <input
                type={f.type}
                value={form[f.id]}
                onChange={(e) => setForm((p) => ({ ...p, [f.id]: e.target.value }))}
                placeholder={f.placeholder}
                className="w-full px-4 py-3 bg-white border border-[#F0EBE8] rounded-xl text-sm font-sans-ui text-[#2C2826] placeholder:text-[#6B6B6B]/40 outline-none focus:border-[#C9B8E8] transition-colors"
              />
            </div>
          ))}
          <div>
            <label className="block text-[9px] tracking-[0.3em] uppercase text-[#6B6B6B] font-sans-ui mb-2">Message</label>
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
              placeholder="How can we help?"
              className="w-full px-4 py-3 bg-white border border-[#F0EBE8] rounded-xl text-sm font-sans-ui text-[#2C2826] placeholder:text-[#6B6B6B]/40 outline-none focus:border-[#C9B8E8] transition-colors resize-none"
            />
          </div>
          <button type="submit" className="w-full py-3.5 bg-[#2C2826] text-[#FDFBF7] rounded-full text-[10px] tracking-[0.3em] uppercase font-sans-ui hover:bg-[#C9A96E] transition-colors duration-300">
            Send Message
          </button>
        </form>
      )}
    </StaticPage>
  );
};

export const FAQPage = () => {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: 'Are your pearls real?', a: 'Yes. We use only genuine freshwater and Akoya pearls, sourced directly from farms we have visited personally. We do not use imitation or shell pearls.' },
    { q: 'What is gold vermeil?', a: '18k gold vermeil is a thick layer of 18-karat gold applied over sterling silver. Our vermeil layer is a minimum of 2.5 microns — significantly thicker than the industry standard of 0.5 microns.' },
    { q: 'How do I know my ring size?', a: 'Wrap a thin strip of paper around your finger, mark where it overlaps, and measure the length in millimetres. Visit our Size Guide page for a full conversion table.' },
    { q: 'Do you offer gift wrapping?', a: 'Yes. All Aurevia pieces are packaged in our signature ivory box with a velvet interior. Gift wrapping with ribbon is available for $8.' },
    { q: 'How long does shipping take?', a: 'Standard shipping takes 3–5 business days. Express shipping (1–2 business days) is available for $12. International orders typically arrive within 5–10 business days.' },
    { q: 'Can I return or exchange?', a: 'Yes. We offer free returns within 30 days of delivery on unworn items in original packaging. Email returns@aurevia.com to begin.' },
    { q: 'Do you offer repairs?', a: 'Yes, for life. If your Aurevia piece ever needs restringing, re-setting, or polishing, send it back to us and we will restore it at no charge.' },
    { q: 'Are your pieces limited edition?', a: 'We produce no more than 200 pieces per season. When a seasonal piece sells out, it does not return.' },
  ];
  return (
    <StaticPage label="Questions & answers" title="FAQ">
      {faqs.map((faq, i) => (
        <div key={i} className="border-b border-[#F0EBE8]">
          <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex justify-between items-center py-5 text-left">
            <span className="font-serif-heading italic text-lg text-[#2C2826]">{faq.q}</span>
            <span className={`text-[#C9A96E] text-xl transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}>+</span>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-sm font-light text-[#6B6B6B] leading-relaxed pb-5">{faq.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </StaticPage>
  );
};

export const PrivacyPage = () => (
  <StaticPage label="Legal" title="Privacy Policy">
    <P>Last updated: March 2026</P>
    <H2>Information We Collect</H2>
    <P>We collect information you provide directly — name, email address, shipping address, and payment details when you place an order. We also collect anonymised browsing data to improve our website.</P>
    <H2>How We Use It</H2>
    <P>We use your information to process orders, send shipping updates, and (with your consent) send occasional newsletters. We do not sell your data to third parties.</P>
    <H2>Cookies</H2>
    <P>We use essential cookies to keep your cart and preferences. We use anonymised analytics cookies to understand how visitors use our site. You can opt out of analytics cookies at any time.</P>
    <H2>Your Rights</H2>
    <P>You have the right to access, correct, or delete your personal data at any time. Email privacy@aurevia.com to make a request. We will respond within 30 days.</P>
  </StaticPage>
);

export const TermsPage = () => (
  <StaticPage label="Legal" title="Terms & Conditions">
    <P>Last updated: March 2026. By using this website and placing orders, you agree to the following terms.</P>
    <H2>Orders</H2>
    <P>All orders are subject to availability. We reserve the right to cancel any order and issue a full refund if a product becomes unavailable after purchase.</P>
    <H2>Pricing</H2>
    <P>All prices are in USD and include applicable taxes. Shipping costs are calculated at checkout.</P>
    <H2>Returns & Refunds</H2>
    <P>Please refer to our Shipping & Returns page for full details. Refunds are issued to the original payment method within 5 business days of receiving the returned item.</P>
    <H2>Intellectual Property</H2>
    <P>All content on this website — including images, text, and design — is the property of Aurevia and may not be reproduced without written permission.</P>
  </StaticPage>
);

export const CookiesPage = () => (
  <StaticPage label="Legal" title="Cookie Policy">
    <P>Last updated: March 2026.</P>
    <H2>What Are Cookies</H2>
    <P>Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and understand how you use it.</P>
    <H2>Cookies We Use</H2>
    {[
      ['Essential Cookies', 'Required for the website to function. These include your shopping cart, session data, and security tokens. They cannot be disabled.'],
      ['Analytics Cookies', 'Anonymised data about how visitors use our site. This helps us improve the experience. You can opt out by emailing privacy@aurevia.com.'],
      ['Preference Cookies', 'Remember your settings such as currency and language preferences.'],
    ].map(([t, d]) => (
      <div key={t} className="mb-6"><H3>{t}</H3><P>{d}</P></div>
    ))}
    <H2>Managing Cookies</H2>
    <P>You can control cookies through your browser settings. Disabling essential cookies will affect the functionality of the site.</P>
  </StaticPage>
);
