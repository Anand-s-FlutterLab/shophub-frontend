import { FaRegStar } from "react-icons/fa";
import ProductSkeletonCard from "./ProductSkeletionCard";
import type { ProductList } from "../types/product.types";
import { useCart } from "../../cart/hooks/cartHook";
import { useAppSelector } from "../../../app/store/hooks";
import { TbShoppingCart, TbShoppingCartCopy } from "react-icons/tb";

interface IDashboardProductList {
  isLoading: boolean;
  data: ProductList | null;
}

function DashboardProductList({ isLoading, data }: IDashboardProductList) {
  const { addToCart, removeFromCart } = useCart();
  const cartData = useAppSelector((state) => state.cart.data);

  const itemPresentInCart = ({ id }: { id: number }) => {
    return cartData.filter((cart) => cart.id === id).length > 0;
  };
  if (isLoading) {
    return (
      <div className="grid grid-flow-col auto-cols-[240px] gap-6 overflow-x-auto scrollbar-hide shrink-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductSkeletonCard key={i} />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-flow-col auto-cols-[240px] gap-6 overflow-x-auto scrollbar-hide shrink-0">
      {data?.products.map((product) => {
        const present = itemPresentInCart({ id: product.id });
        return (
          <div
            key={product.id}
            className="bg-surface rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shrink-0 w-60"
          >
            <div className="flex justify-center items-center px-10 py-2 bg-surface">
              <img
                src={product.images[0]}
                alt="product"
                className="h-40 w-40 object-contain"
              />
            </div>

            <div className="p-4">
              <h3 className="text-white font-semibold text-lg truncate">
                {product.title}
              </h3>
              <p className="text-white/50 text-sm">{product.category}</p>

              <div className="mt-2 text-cyan-400 font-bold text-xl">
                {product.price}
              </div>

              <div className="flex justify-between">
                <div className="flex items-center gap-2 text-yellow-400 text-sm">
                  <FaRegStar />
                  <span>4.5 (120)</span>
                </div>

                <button
                  className={`border border-border p-1.5 rounded-md bg-surface
    transition-all duration-300 ease-in-out
    ${present ? "border-green-600 scale-100" : "scale-100"}`}
                  aria-label="Add to cart"
                  onClick={() => {
                    if (present) {
                      removeFromCart(product.id);
                    } else {
                      addToCart({
                        id: product.id,
                        title: product.title,
                        image: product.images[0],
                        category: product.category,
                        price: product.price,
                        quantity: 1,
                        minQuantity: product.minimumOrderQuantity,
                        maxQuantity: product.stock,
                      });
                    }
                  }}
                >
                  {present ? (
                    <TbShoppingCartCopy
                      className={`text-sm  text-green-600 transition-all duration-300`}
                    />
                  ) : (
                    <TbShoppingCart
                      className={`text-sm  text-primary transition-all duration-300`}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DashboardProductList;
