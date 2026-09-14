import { BOOK_PAGES } from "@/lib/menu-book";

// The whole menu as plain, structured text. The flipbook is visual only, so screen readers
// and search engines read this instead.
export function MenuText() {
  return (
    <div className="sr-only">
      <h2>Full menu</h2>
      {BOOK_PAGES.map((page) => (
        <section key={page.id} aria-labelledby={`menu-text-${page.id}`}>
          <h3 id={`menu-text-${page.id}`}>{page.title}</h3>
          {page.note && <p>{page.note}</p>}
          {page.blocks.map((block, i) => (
            <div key={i}>
              {block.title && <h4>{block.title}</h4>}
              {block.note && <p>{block.note}</p>}
              {block.kind === "grid" ? (
                <ul>
                  {block.rows.map((row) =>
                    row.prices.map((price, c) => (
                      <li key={`${row.name}-${c}`}>
                        {row.name} {block.columns[c]} momo{row.count ? ` (${row.count})` : ""}: ${price}
                      </li>
                    )),
                  )}
                </ul>
              ) : (
                <ul>
                  {block.items.map((item) => (
                    <li key={item.name}>
                      {item.name}
                      {item.count ? ` (${item.count})` : ""}: ${item.price}
                      {item.note ? `. ${item.note}` : ""}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
