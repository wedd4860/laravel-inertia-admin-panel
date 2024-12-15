import { Link } from "@inertiajs/react";

const Pagination = ({ links, queryParams }) => {
  return (
    <nav className="text-center mt-4">
      {links.map((link, index) => (
        <Link
          preserveScroll
          href={link.url || ""}
          className={
            "inline-block py-2 px-3 rounded-lg text-xs " +
            (link.active ? "bg-gray-950 text-gray-200 " : " ") +
            (!link.url
              ? "!text-gray-500 cursor-not-allowed "
              : "hover:bg-gray-950 hover:text-gray-200")
          }
          dangerouslySetInnerHTML={{ __html: link.label }}
          key={index}
        ></Link>
      ))}
    </nav>
  );
};

export default Pagination;
