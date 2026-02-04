import DOMPurify from "isomorphic-dompurify";

export const sanitizeAndStyleHTML = (html: string): string => {
  const fixedHtml = html
    .replaceAll("<source", "<div")
    .replaceAll("</source>", "</div>");

  const clean = DOMPurify.sanitize(fixedHtml, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "a",
      "blockquote",
      "img",
      "figure",
      "figcaption",
      "div",
    ],
    ALLOWED_ATTR: [
      "href",
      "src",
      "alt",
      "title",
      "target",
      "rel",
      "decoding",
      "fetchpriority",
    ],
    FORBID_ATTR: ["style", "class", "id"],
  });

  if (typeof document === "undefined") return clean;
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = clean;

  const elementsWithStyle = tempDiv.querySelectorAll("[style]");
  elementsWithStyle.forEach((el) => el.removeAttribute("style"));

  const allElements = tempDiv.querySelectorAll("*");
  allElements.forEach((el) => {
    el.removeAttribute("class");
  });
  tempDiv.querySelectorAll("figcaption").forEach((el) => el.remove());

  tempDiv.querySelectorAll("source").forEach((source) => {
    const img = source.querySelector("img");
    if (img) source.replaceWith(img);
    else source.remove();
  });

  const links = tempDiv.querySelectorAll("a");
  links.forEach((link) => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });

  return tempDiv.innerHTML;
};
