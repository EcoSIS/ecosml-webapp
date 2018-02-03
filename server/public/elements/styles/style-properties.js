import "@polymer/paper-styles/color"
import "@polymer/paper-styles/default-theme"
import "@polymer/paper-styles/shadow"
import "@polymer/paper-styles/typography"
import "@polymer/polymer/lib/elements/custom-style"

import styles from "./style-properties.html"
let styleWrapper = document.createElement('div');
styleWrapper.style.display = 'none';
styleWrapper.innerHTML = styles;
styleWrapper.id="ecosml-style-properties";
document.head.appendChild(styleWrapper);