export const imageStyles = {
  softDigital: "Soft digital storybook illustration",
} as const;

export type ImageStyle = (typeof imageStyles)[keyof typeof imageStyles];

export type InlineImage = {
  imageBase64: string;
  mediaType: string;
};
