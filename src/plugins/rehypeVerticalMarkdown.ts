import type { RehypePlugin } from "@astrojs/markdown-remark";
import { findAndReplace, type Find, type Replace } from "hast-util-find-and-replace";
import styles from "../pages/index.module.css";

interface Options {};

export const verticalMarkdownPlugin: RehypePlugin = (options?: Options) => {
  return (tree) => findAndReplace(tree, [
    findAndReplaceBoten,
    findAndReplaceUpright,
    findAndReplaceExclamation,
  ]);
};

// Replace double double brackets with 傍点
const findAndReplaceBoten: [Find, Replace] = [
  /《《(?<text>.*?)》》/g, (match: RegExpMatchArray, text: string) => {
    return {
      type: "element",
      tagName: "ruby",
      properties: {},
      children: [
        {
          type: "text",
          value: text
        },
        {
          type: "element",
          tagName: "rt",
          properties: {},
          children: [{
            type: "text",
            value: '﹅'.repeat(text.length)
          }]
        }
      ]
    };
  }
]

// Replace one to three-letter alphanumerics wrapped with japanese characters into
// upright text
const findAndReplaceUpright: [Find, Replace] = [
  /(?<=[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}])([a-zA-Z0-9]{1,3})(?=[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}])/gu,
  (match: string) => {
    return {
      type: "element",
      tagName: "span",
      properties: { className: [styles.inlineUpright] },
      children: [{ type: "text", value: match }]
    };
  }
];

// Replace ！？ with inline upright !?
const findAndReplaceExclamation: [Find, Replace] = [
  /！？/g, () => {
    return {
      type: "element",
      tagName: "span",
      properties: { className: [styles.inlineUpright] },
      children: [{ type: "text", value: "!?" }]
    };
  }
];
