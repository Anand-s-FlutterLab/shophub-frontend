import Skeleton from "react-loading-skeleton";

function ProductSkeletonCard() {
  return (
    <div className="bg-surface rounded-2xl overflow-hidden shadow-md w-60 p-4">
      <Skeleton height={160} className="mb-4 rounded-xl" />

      <Skeleton height={20} width={`80%`} />
      <Skeleton height={15} width={`50%`} className="mt-2" />

      <Skeleton height={25} width={`40%`} className="mt-3" />

      <div className="flex justify-between mt-4">
        <Skeleton height={20} width={80} />
        <Skeleton height={30} width={30} />
      </div>
    </div>
  );
}

export default ProductSkeletonCard;
