import useSWR from "swr";
import { gql, DocumentNode } from "@apollo/client";
import client from "../../client";

interface GraphQLResult<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
}

const fetcher = async (query: DocumentNode) => {
  const { data } = await client.query({ query });
  return data;
};

export const useGraphQL = <T,>(query: string): GraphQLResult<T> => {
  const parsedQuery: DocumentNode = gql(query);

  const { data, error } = useSWR(parsedQuery, fetcher);

  return {
    data: data as T | undefined,
    isLoading: !error && !data,
    isError: error !== undefined,
  };
};
