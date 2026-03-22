import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import RealisticPearl from '../components/RealisticPearl';
import PremiumImage from '../components/PremiumImage';
import useIsMobile from '../hooks/useIsMobile';

const PearlJourney = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const isMobile = useIsMobile();

  const pearlOpacity = useTransform(scrollYProgress, [0, 0.1, 0.45, 0.55], [0, 1, 1, 0]);
  const pearlScale = useTransform(scrollYProgress, [0, 0.45], [0.8, isMobile ? 1.2 : 1.8]);
  const pearlRotate = isMobile ? 0 : useTransform(scrollYProgress, [0, 0.45], [0, 90]);
  const pearlBlur = isMobile ? 'blur(0px)' : useTransform(scrollYProgress, [0.4, 0.55], ['blur(0px)', 'blur(60px)']);

  const productOpacity = useTransform(scrollYProgress, [0.48, 0.58, 0.9, 1], [0, 1, 1, 0]);
  const productScale = useTransform(scrollYProgress, [0.48, 0.65], [0.9, 1]);
  const productBlur = isMobile ? 'blur(0px)' : useTransform(scrollYProgress, [0.48, 0.6], ['blur(30px)', 'blur(0px)']);

  const sweepX = useTransform(scrollYProgress, [0.4, 0.6], ['-100%', '200%']);
  const sweepOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 0.2, 0]);

  const text1Opacity = useTransform(scrollYProgress, [0.1, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative h-[300vh] bg-[#FDFBF7]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Pearl */}
        <motion.div
          style={{ opacity: pearlOpacity, scale: pearlScale, rotate: pearlRotate, filter: pearlBlur }}
          className="absolute z-10"
        >
          <RealisticPearl className="w-48 h-48 md:w-80 md:h-80" animatePulse={!isMobile} />
        </motion.div>

        {/* Light sweep */}
        <motion.div
          style={{ x: sweepX, opacity: sweepOpacity }}
          className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-30deg]"
        />

        {/* Product image */}
        <motion.div
          style={{ opacity: productOpacity, scale: productScale, filter: productBlur }}
          className="absolute z-20 w-[80vw] md:w-[20rem] aspect-[4/5] rounded-[120px] overflow-hidden shadow-[0_40px_100px_rgba(44,40,38,0.1)] bg-white border border-white/60"
        >
          <PremiumImage
            src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80&w=1200"
            alt="The Journey"
            className="w-full h-full"
            eager
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
        </motion.div>

        {/* Text 1 */}
        <motion.div
          style={{ opacity: text1Opacity }}
          className="absolute z-40 text-center px-6"
        >
          <h2 className="font-serif-heading italic text-4xl md:text-6xl text-[#2C2826] drop-shadow-sm">
            Born in nature.
            <br />
            <span className="text-2xl md:text-4xl not-italic font-light tracking-tight opacity-70 font-sans-ui">
              Shaped by time.
            </span>
          </h2>
        </motion.div>

        {/* Text 2 */}
        <motion.div
          style={{ opacity: text2Opacity }}
          className="absolute z-40 text-center px-6 bottom-[15%] md:bottom-auto md:mt-[32rem]"
        >
          <h2 className="font-serif-heading italic text-3xl md:text-5xl text-[#2C2826]">
            Finished by hand.
            <br />
            <span className="font-script text-2xl md:text-4xl text-[#CBBDF8] mt-2 block">
              Made for you.
            </span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default PearlJourney;
