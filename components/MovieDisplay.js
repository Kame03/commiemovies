import Link from "next/link";
import TvCards from "./TvCards";

const TvDisplay = ({ tv, pageid = 1 }) => {
  // Create an array of page numbers for pagination
  const pagenum = Array.from({ length: 10 }, (_, i) => i + 1);

  // Ensure pageid is a number and defaults to 1 if not
  pageid = isNaN(pageid) ? 1 : Number(pageid);

  // Ensure pageid is within valid range
  if (pageid < 1) {
    pageid = 1;
  }
  const maxPage = pagenum.length;
  if (pageid > maxPage) {
    pageid = maxPage;
  }

  // Return the JSX for the TvDisplay component
  return (
    <div className="popular-movies md:mx-24">
      {/* Display a grid of TV cards */}
      <div className="flex flex-wrap overflow-hidden sm:-mx-2 pl-2 md:-mx-2 lg:-mx-2 xl:-mx-2">
        {tv.map((TvCard) => (
          <TvCards key={TvCard.id} TvCard={TvCard} />
        ))}
      </div>
      {/* Create pagination navigation */}
      <div className="flex justify-center mt-8 space-x-4 mb-10">
        {/* Previous page link */}
        <Link
          legacyBehavior
          href={`/tv/popular/page/${pageid - 1}`}
          passHref
          // Disable Previous button when on the first page
          aria-disabled={pageid === 1}
        >
          <a
            className={`bg-gray-800 text-white rounded-full px-4 py-2 hover:bg-gray-700 ${
              pageid === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            &laquo; Prev
          </a>
        </Link>
        {/* Page number links */}
        {pagenum.map((element) => (
          <Link
            legacyBehavior
            key={element}
            href={`/tv/popular/page/${element}`}
            passHref
          >
            <a
              className={`bg-gray-800 text-white rounded-full px-4 py-2 hover:bg-gray-700 ${
                pageid === element ? "bg-gray-700" : ""
              }`}
            >
              {element}
            </a>
          </Link>
        ))}
        {/* Next page link */}
        <Link
          legacyBehavior
          href={`/tv/popular/page/${pageid + 1}`}
          passHref
          // Disable Next button when on the last page
          aria-disabled={pageid === maxPage}
        >
          <a
            className={`bg-gray-800 text-white rounded-full px-4 py-2 hover:bg-gray-700 ${
              pageid === maxPage ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next &raquo;
          </a>
        </Link>
      </div>
    </div>
  );
};

// Export TvDisplay component as default
export default TvDisplay;