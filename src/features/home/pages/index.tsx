import { HomeHero } from "@/features/home/components/home-hero";
import { HomeCtaSection } from "@/features/home/components/home-cta-section";
import styles from "./home.module.scss";

const HomePage: React.FC = () => {
  return (
    <div className={styles.page}>
      <HomeHero />
      <HomeCtaSection />
    </div>
  );
};

export default HomePage;
