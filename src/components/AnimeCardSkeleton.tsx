export default function AnimeCardSkeleton({ ...props }) {
  return (
    <div {...props}>
      <div className="skeleton aspect-[267/475] rounded-md object-cover"></div>

      <div className="skeleton mt-2 h-3 w-full"></div>
      <div className="skeleton mt-2 h-3 w-10/12"></div>
    </div>
  );
}
