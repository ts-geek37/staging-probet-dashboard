import Link from "next/link";

interface ListCardProps<T> {
  title: string;
  href?: string;
  linkLabel?: string;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  emptyState?: React.ReactNode;
}

const ListCard = <T,>({
  title,
  href,
  linkLabel = "View All >",
  items,
  renderItem,
  emptyState,
}: ListCardProps<T>) => {
  if (!items.length) return emptyState ?? null;

  return (
    <div className="rounded-xl border border-primary-gray/20 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-primary-gray/20 bg-slate-900 ">
        <h3 className="font-semibold text-sm sm:text-base md:text-lg text-primary-green">
          {title}
        </h3>

        {href && (
          <Link
            href={href}
            className="text-xs sm:text-sm text-primary-gray hover:text-white"
          >
            {linkLabel}
          </Link>
        )}
      </div>

      <div className="flex flex-col divide-y divide-primary-gray/20">
        {items.map(renderItem)}
      </div>
    </div>
  );
};
export default ListCard;
