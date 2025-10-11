import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Nav from "@/components/Nav";

import horticultureImg from "@assets/image_1759944361004.webp";
import agricultureImg from "@assets/image_1759877033749.webp";
import mathsImg from "@assets/image_1759877325302.webp";
import reasoningImg from "@assets/image_1759877494047.webp";
import financeImg from "@assets/image_1759877764773.webp";
import agriAffairsImg from "@assets/image_1759877951515.webp";
import englishImg from "@assets/ChatGPT Image Oct 8, 2025, 04_35_24 AM_1759878517370.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const books = [
  {
    id: "horticulture",
    title: "Horticulture Essentials",
    subtitle: "Grow Your Future",
    image: horticultureImg,
    price: "₹600",
  },
  {
    id: "agriculture",
    title: "Agricultural Foundations",
    subtitle: "Sow Success",
    image: agricultureImg,
    price: "₹600",
  },
  {
    id: "maths",
    title: "Maths & QA Mastery",
    subtitle: "Master Your Edge",
    image: mathsImg,
    price: "₹600",
  },
  {
    id: "reasoning",
    title: "Reasoning Essentials",
    subtitle: "Unlock Your Potential",
    image: reasoningImg,
    price: "₹600",
  },
  {
    id: "finance",
    title: "Finance & Economics Essentials",
    subtitle: "Learn how money works",
    image: financeImg,
    price: "₹600",
  },
  {
    id: "agri-affairs",
    title: "Agri & Economic Affairs",
    subtitle: "Stay Ahead",
    image: agriAffairsImg,
    price: "₹600",
  },
  {
    id: "english",
    title: "English Mastery",
    subtitle: "Enhance Your Understanding",
    image: englishImg,
    price: "₹600",
  },
];

export default function Books() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Nav />
      
      <main className="mx-auto max-w-7xl px-4 py-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4" data-testid="text-books-title">
            Study Materials & Books
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto" data-testid="text-books-subtitle">
            Complete PDFs, topic-wise tests, and exam-ready content for ABM, Banking, and JRF Horticulture
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book, i) => (
            <motion.div
              key={book.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-slate-900/60 border-slate-800 hover:border-primary/30 transition-all rounded-2xl overflow-hidden h-full flex flex-col">
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover"
                    data-testid={`img-book-${book.id}`}
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold mb-1" data-testid={`text-book-title-${book.id}`}>
                    {book.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-4" data-testid={`text-book-subtitle-${book.id}`}>
                    {book.subtitle}
                  </p>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-primary" data-testid={`text-book-price-${book.id}`}>
                        {book.price}
                      </span>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90" data-testid={`button-buy-${book.id}`}>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Buy Now
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="bg-slate-900/60 border-slate-800 rounded-2xl p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-3" data-testid="text-bundle-title">
              Complete Study Bundle
            </h2>
            <p className="text-slate-400 mb-6" data-testid="text-bundle-desc">
              Get all 7 books and unlock the complete learning experience at a special price
            </p>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-slate-500 line-through text-xl" data-testid="text-bundle-original">₹4,200</span>
              <span className="text-4xl font-bold text-primary" data-testid="text-bundle-price">₹2,800</span>
              <span className="text-sm bg-emerald-500/10 text-emerald-300 px-3 py-1 rounded-full ring-1 ring-emerald-500/30" data-testid="badge-bundle-save">
                Save 33%
              </span>
            </div>
            <Button size="lg" className="bg-primary hover:bg-primary/90" data-testid="button-buy-bundle">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Buy Complete Bundle
            </Button>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
