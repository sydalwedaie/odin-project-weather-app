export function generateDOM(htmlString) {
  return document.createRange().createContextualFragment(htmlString);
}

export function getWxIcon(icon) {
  const context = import.meta.webpackContext("./assets/icons-wx");
  return context(`./${icon}.svg`);
}

export const html = String.raw;

export const $ = (selector) => document.querySelector(selector);
