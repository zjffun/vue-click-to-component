import { parseFragment } from "parse5";

function getSourceWithSourceCodeLocation({
  source,
  filePath,
  htmlTags,
}: {
  source: string;
  filePath: string;
  htmlTags: string[];
}) {
  const ast = parseFragment(source, {
    sourceCodeLocationInfo: true,
  });

  let allNodes: any[] = [ast];
  let nodeIndex = 0;
  while (allNodes.length > nodeIndex) {
    allNodes = allNodes.concat(
      allNodes[nodeIndex]?.childNodes || [],
      allNodes[nodeIndex]?.content?.childNodes || []
    );

    nodeIndex++;
  }

  const sortedNodes = allNodes
    .filter((node) => htmlTags.includes(node?.nodeName))
    .sort(
      (a, b) =>
        b.sourceCodeLocation.startOffset - a.sourceCodeLocation.startOffset
    );

  let result = source;

  sortedNodes.forEach((node) => {
    const { startOffset, startLine, startCol } = node.sourceCodeLocation;
    const sourceCodeLocation = ` data-__source-code-location="${filePath}:${startLine}:${startCol}" `;
    const insertPos = startOffset + node.nodeName.length + 1;
    result =
      result.substring(0, insertPos) +
      sourceCodeLocation +
      result.substring(insertPos);
  });

  return result;
}

export { getSourceWithSourceCodeLocation };
