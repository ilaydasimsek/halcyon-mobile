type RelayNodePageInfo = {
  startCursor?: string;
  endCursor?: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type RelayNode<T> = {
  edges: { node: T }[];
  pageInfo?: RelayNodePageInfo;
};
