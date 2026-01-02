"use client";


interface LeaguesEmptyStateProps {
  searchQuery: string;
}

const EmptyLeagues: React.FC<LeaguesEmptyStateProps> = ({ searchQuery }) => {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center gap-6 py-16 text-center md:py-24">
      <h2 className="text-2xl font-semibold text-white md:text-3xl">
        No leagues found
      </h2>

      <p className="text-sm leading-relaxed text-white/60 md:text-base">
        {searchQuery ? (
          <>
            No results for{" "}
            <span className="font-medium text-white">“{searchQuery}”</span>
            . Try refining your search or clearing filters.
          </>
        ) : (
          <>
            No leagues match your current filters. Adjust them to continue exploring.
          </>
        )}
      </p>
    </section>
  );
};

export default EmptyLeagues;
