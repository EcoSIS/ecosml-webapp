import { html } from 'lit-element';

/**
 * Transform polymer css dom-module into lit html css
 */
export default (css) => {
  css = css.replace(/<template\w*>/, '')
    .replace(/<dom-module.*>/, '')
    .replace(/<\/template\s*>.*/, '')
    .replace(/<\/dom-module\s*>/, '');

  return html([css]);
}