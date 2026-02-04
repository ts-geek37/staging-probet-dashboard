import DOMPurify from "isomorphic-dompurify";

export const sanitizeAndStyleHTML = (html: string): string => {
  const clean = DOMPurify.sanitize(html, {
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
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "class"],
    FORBID_ATTR: ["style", "class", "id"],
  });
  if (!document) return clean;
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = clean;

  const elementsWithStyle = tempDiv.querySelectorAll("[style]");
  elementsWithStyle.forEach((el) => el.removeAttribute("style"));

  const allElements = tempDiv.querySelectorAll("*");
  allElements.forEach((el) => {
    el.removeAttribute("class");
  });

  return tempDiv.innerHTML;
};
