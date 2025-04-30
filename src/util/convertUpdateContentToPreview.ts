export const convertUpdateContentToPreview = (content: string, maxLength = 155) => {
  if (content.length <= maxLength) {
    return content;
  }

  const previewContent = content.slice(0, 155).trimEnd();
  const prettierPreviewContent = previewContent.split(" ").slice(0, -1).join(" ") + "...";

  return prettierPreviewContent;
};
