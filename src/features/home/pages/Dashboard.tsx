import {
  FaCouch,
  FaLaptop,
  FaMobileAlt,
  FaShoppingBag,
  FaShoppingBasket,
  FaSpa,
} from "react-icons/fa";
import { GiConverseShoe } from "react-icons/gi";

import { useEffect, useState, useRef } from "react";
import DashboardCategoryCard from "../components/DashboardCategoryCard";
import type { IconType } from "react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { useDashboard } from "../hooks/dashboardHook";
import DashboardProductList from "../components/ProductList";

interface DashboardCategory {
  title: string;
  icon: IconType;
}

const slides = [
  "https://picsum.photos/id/1018/800/400",
  "https://picsum.photos/id/1015/800/400",
  "https://picsum.photos/id/1019/800/400",
];

const DASHBOARD_CATEGORY: DashboardCategory[] = [
  {
    title: "Smartphones",
    icon: FaMobileAlt,
  },
  {
    title: "Laptops",
    icon: FaLaptop,
  },
  {
    title: "Groceries",
    icon: FaShoppingBasket,
  },
  {
    title: "Furniture",
    icon: FaCouch,
  },
  {
    title: "Beauty",
    icon: FaSpa,
  },
  {
    title: "Shoes",
    icon: GiConverseShoe,
  },
  {
    title: "Womens Bags",
    icon: FaShoppingBag,
  },
];

function Dashboard() {
  const [selected, setSelected] = useState("");
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<number | null>(null);

  const {
    featuredProductsData,
    isFeaturedDataLoading,
    featuredByCategory,
    fetchCategoryProducts,
    fetchFeatured,
  } = useDashboard();

  const startAutoPlay = () => {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
  };

  useEffect(() => {
    fetchFeatured();
    fetchCategoryProducts("smartphones");
    fetchCategoryProducts("laptops");
    fetchCategoryProducts("groceries");
  }, []);

  const stopAutoPlay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    startAutoPlay();

    return () => stopAutoPlay();
  }, []);
  return (
    <>
      <div className="grid h-full gap-8 grid-cols-[220px_1fr] overflow-hidden">
        <div className="h-full overflow-hidden pt-2">
          <div className="flex flex-col gap-3">
            {DASHBOARD_CATEGORY.map((cat) => {
              return (
                <DashboardCategoryCard
                  key={cat.title}
                  title={cat.title}
                  icon={cat.icon}
                  onClick={() => setSelected(cat.title)}
                  selected={selected === cat.title}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col min-w-0 overflow-x-hidden overflow-y-auto scrollbar-hide">
          <div className="flex-col pt-5 pb-7">
            <div
              className="relative w-full h-74 overflow-hidden rounded-xl"
              onMouseEnter={stopAutoPlay}
              onMouseLeave={startAutoPlay}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={current}
                  src={slides[current]}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  draggable={false}
                  loading="eager"
                />
              </AnimatePresence>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className="relative h-2 w-2"
                  >
                    <span
                      className={`block h-2 w-2 rounded-full transition-all ${
                        current === index ? "bg-white scale-125" : "bg-white/50"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-between pb-3">
            <p className="font-bold">Featured Products</p>
            <p className="text-primary">View all</p>
          </div>
          <DashboardProductList
            data={featuredProductsData}
            isLoading={isFeaturedDataLoading}
          />
          <div className="flex justify-between pb-3 pt-7">
            <p className="font-bold">Smartphones</p>
            <p className="text-primary">View all</p>
          </div>
          <DashboardProductList
            data={featuredByCategory["smartphones"]?.data}
            isLoading={featuredByCategory["smartphones"]?.isLoading}
          />
          <div className="flex justify-between pb-3 pt-7">
            <p className="font-bold">Laptops</p>
            <p className="text-primary">View all</p>
          </div>
          <DashboardProductList
            data={featuredByCategory["laptops"]?.data}
            isLoading={featuredByCategory["laptops"]?.isLoading}
          />
          <div className="flex justify-between pb-3 pt-7">
            <p className="font-bold">Groceries</p>
            <p className="text-primary">View all</p>
          </div>
          <DashboardProductList
            data={featuredByCategory["groceries"]?.data}
            isLoading={featuredByCategory["groceries"]?.isLoading}
          />

          <div className="flex gap-4"></div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
