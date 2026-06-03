import { Children, isValidElement, type ElementType, type ReactNode } from 'react';

export function unwrapSingleMdxParagraph(
  children: ReactNode,
  paragraphTypes: ElementType[] = [],
): ReactNode {
  const nodes = Children.toArray(children);
  if (nodes.length !== 1) {
    return children;
  }

  const only = nodes[0];
  if (!isValidElement(only)) {
    return children;
  }

  const isParagraph =
    only.type === 'p' || paragraphTypes.some((type) => type === only.type);

  if (isParagraph) {
    return (only.props as { children?: ReactNode }).children ?? children;
  }

  return children;
}
