import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { categoryProducts, featuredProducts } from "../slice/dashboardSlice";

export const useDashboard = () => {
  const dispatch = useAppDispatch();

  const { featuredProductsData, isFeaturedDataLoading, featuredByCategory } =
    useAppSelector((state) => state.dashboard);
  const { data } = useAppSelector((state) => state.cart);

  const fetchFeatured = () => dispatch(featuredProducts()).unwrap();

  const fetchCategoryProducts = (category: string) =>
    dispatch(categoryProducts({ category })).unwrap();

  return {
    featuredProductsData,
    isFeaturedDataLoading,
    featuredByCategory,
    fetchFeatured,
    fetchCategoryProducts,
    cartCount: data.length,
  };
};
