import { QueryOptions } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';
import React, { useEffect, useRef, useState } from 'react';

interface OptionType {
  value: string | number;
  label: React.ReactNode;
}

export interface UseAsyncSelectPropsInterface<T> extends Pick<QueryOptions, 'query'> {
  initialLimit?: number;
  initialOffset?: number;
  loadOnSelectOpen?: boolean;
  extractOption: (row: T) => OptionType;
}

interface UseAsyncSelectInterface {
  options: OptionType[];
  isLoading: boolean;
  hasMore: boolean;
  fetchMore: (count?: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchOptions: (filter?: any, fetchLimit?: number, fetchOffset?: number) => void;
}

export const useAsyncSelect = <T>(props: UseAsyncSelectPropsInterface<T>): UseAsyncSelectInterface => {
  const { query, initialLimit = 50, initialOffset = 0, loadOnSelectOpen: loadAsync = false, extractOption } = props;

  const [options, setOptions] = useState<OptionType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(initialLimit);
  const [offset, setOffset] = useState(initialOffset);
  const [totalCount, setTotalCount] = useState(0);
  const didMount = useRef(false);

  const handleSetOptions = (data: T[]) => {
    let newOptions: OptionType[] = data.map((d) => extractOption(d));
    newOptions = newOptions.filter((o) => !options.find((oldOption) => oldOption.value === o.value));
    setOptions((prev) => [...prev, ...newOptions]);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetchOptions = async (filter?: any, fetchLimit?: number, fetchOffset?: number) => {
    try {
      setIsLoading(true);
      const data = await requestGql({
        query,
        variables: {
          filter,
          limit: fetchLimit || limit,
          offset: fetchOffset || offset,
        },
      });
      const response = data[Object.keys(data)[0]];
      handleSetOptions(response.data);
      if (!totalCount && !filter) setTotalCount(response.totalCount);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  const fetchMore = (count = 50) => {
    setOffset(offset + limit);
    setLimit(count);
  };

  useEffect(() => {
    if (didMount.current || !loadAsync) {
      void fetchOptions();
    }
    didMount.current = true;
  }, [limit, offset]);

  const hasMore = options.length !== totalCount;

  return {
    options,
    isLoading,
    hasMore,
    fetchMore,
    fetchOptions,
  };
};
