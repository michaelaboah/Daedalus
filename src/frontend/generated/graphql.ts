import client from "../../frontend/apollo/apolloClient";
import type {
        ApolloQueryResult, ObservableQuery, WatchQueryOptions, QueryOptions, MutationOptions
      } from "@apollo/client";
import { readable } from "svelte/store";
import type { Readable } from "svelte/store";
import gql from "graphql-tag"
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Equipment = {
  __typename?: 'Equipment';
  category: Scalars['String'];
  cost?: Maybe<Scalars['Float']>;
  createdAt: Scalars['String'];
  depth?: Maybe<Scalars['Float']>;
  frequencyRange?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  manufacturer: Scalars['String'];
  model: Scalars['String'];
  powerDraw?: Maybe<Scalars['Float']>;
  publicNotes?: Maybe<Scalars['String']>;
  rackUnit?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['String'];
  weight?: Maybe<Scalars['Float']>;
};

export type EquipmentInput = {
  category: Scalars['String'];
  cost?: InputMaybe<Scalars['Float']>;
  depth?: InputMaybe<Scalars['Float']>;
  frequencyRange?: InputMaybe<Scalars['String']>;
  manufacturer: Scalars['String'];
  model: Scalars['String'];
  powerDraw?: InputMaybe<Scalars['Float']>;
  publicNotes?: InputMaybe<Scalars['String']>;
  rackUnit?: InputMaybe<Scalars['Float']>;
  searchModel?: InputMaybe<Scalars['String']>;
  weight?: InputMaybe<Scalars['Float']>;
};

export type EquipmentResponse = {
  __typename?: 'EquipmentResponse';
  equipment?: Maybe<Equipment>;
  equipmentItems?: Maybe<Array<Equipment>>;
  errors?: Maybe<Array<FieldError>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createEquipment?: Maybe<EquipmentResponse>;
  createPost: Post;
  deleteEquipment: Scalars['Boolean'];
  deleteEquipmentRange: Scalars['String'];
  deletePost: Scalars['Boolean'];
  deletePosts: Scalars['Boolean'];
  loginUser: UserResponse;
  logout: Scalars['Boolean'];
  registerUser: UserResponse;
  updateEquipment?: Maybe<EquipmentResponse>;
};


export type MutationCreateEquipmentArgs = {
  inputOptions: EquipmentInput;
};


export type MutationCreatePostArgs = {
  title: Scalars['String'];
};


export type MutationDeleteEquipmentArgs = {
  id?: InputMaybe<Scalars['Int']>;
  model: Scalars['String'];
};


export type MutationDeleteEquipmentRangeArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePostsArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationLoginUserArgs = {
  inputOptions: UserInput;
};


export type MutationRegisterUserArgs = {
  inputOptions: UserInput;
};


export type MutationUpdateEquipmentArgs = {
  id: Scalars['Int'];
  updateOptions: EquipmentInput;
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  bye: Scalars['String'];
  fullTextSearch: Array<Equipment>;
  fuzzyTextSearch: Array<Equipment>;
  getAllEquipment?: Maybe<Array<Equipment>>;
  getEquipment?: Maybe<Equipment>;
  me: User;
  post?: Maybe<Post>;
  posts: Array<Post>;
  search: Array<Post>;
  users: Array<User>;
};


export type QueryFullTextSearchArgs = {
  fullSearch: Scalars['String'];
};


export type QueryFuzzyTextSearchArgs = {
  fuzzySearch: Scalars['String'];
};


export type QueryGetEquipmentArgs = {
  model: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QuerySearchArgs = {
  searchTitle: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  updatedAt: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  accessToken: Scalars['String'];
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type CreateEquipmentMutationVariables = Exact<{
  inputOptions: EquipmentInput;
}>;


export type CreateEquipmentMutation = { __typename?: 'Mutation', createEquipment?: { __typename?: 'EquipmentResponse', equipment?: { __typename?: 'Equipment', id: number, createdAt: string, updatedAt: string, category: string, manufacturer: string, model: string, publicNotes?: string | null, cost?: number | null, powerDraw?: number | null, weight?: number | null, depth?: number | null, rackUnit?: number | null, frequencyRange?: string | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, equipmentItems?: Array<{ __typename?: 'Equipment', id: number, createdAt: string, updatedAt: string, category: string, manufacturer: string, model: string, publicNotes?: string | null, cost?: number | null, powerDraw?: number | null, weight?: number | null, depth?: number | null, rackUnit?: number | null, frequencyRange?: string | null }> | null } | null };

export type EquipmentModelSearchQueryVariables = Exact<{
  fullSearch: Scalars['String'];
}>;


export type EquipmentModelSearchQuery = { __typename?: 'Query', fullTextSearch: Array<{ __typename?: 'Equipment', id: number, createdAt: string, updatedAt: string, category: string, manufacturer: string, model: string, publicNotes?: string | null, cost?: number | null, powerDraw?: number | null, weight?: number | null, depth?: number | null, rackUnit?: number | null, frequencyRange?: string | null }> };

export type FuzzySearchQueryVariables = Exact<{
  FuzzySearchInput: Scalars['String'];
}>;


export type FuzzySearchQuery = { __typename?: 'Query', fuzzyTextSearch: Array<{ __typename?: 'Equipment', id: number, model: string, manufacturer: string, category: string }> };

export type GetEquipmentQueryVariables = Exact<{
  model: Scalars['String'];
}>;


export type GetEquipmentQuery = { __typename?: 'Query', getEquipment?: { __typename?: 'Equipment', id: number, createdAt: string, updatedAt: string, category: string, manufacturer: string, model: string, publicNotes?: string | null, cost?: number | null, powerDraw?: number | null, weight?: number | null, depth?: number | null, rackUnit?: number | null, frequencyRange?: string | null } | null };

export type LoginUserMutationVariables = Exact<{
  inputOptions: UserInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'UserResponse', accessToken: string, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', createdAt: string, updatedAt: string, id: number, email: string } | null } };

export type UpdateEquipmentMutationVariables = Exact<{
  updateOptions: EquipmentInput;
  updateEquipmentId: Scalars['Int'];
}>;


export type UpdateEquipmentMutation = { __typename?: 'Mutation', updateEquipment?: { __typename?: 'EquipmentResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, equipment?: { __typename?: 'Equipment', id: number, createdAt: string, updatedAt: string, category: string, manufacturer: string, model: string, publicNotes?: string | null, cost?: number | null, powerDraw?: number | null, weight?: number | null, depth?: number | null, rackUnit?: number | null, frequencyRange?: string | null } | null, equipmentItems?: Array<{ __typename?: 'Equipment', id: number, createdAt: string, updatedAt: string, category: string, manufacturer: string, model: string, publicNotes?: string | null, cost?: number | null, powerDraw?: number | null, weight?: number | null, depth?: number | null, rackUnit?: number | null, frequencyRange?: string | null }> | null } | null };

export type ByeQueryVariables = Exact<{ [key: string]: never; }>;


export type ByeQuery = { __typename?: 'Query', bye: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, createdAt: string, updatedAt: string, email: string } };


export const CreateEquipmentDoc = gql`
    mutation CreateEquipment($inputOptions: EquipmentInput!) {
  createEquipment(inputOptions: $inputOptions) {
    equipment {
      id
      createdAt
      updatedAt
      category
      manufacturer
      model
      publicNotes
      cost
      powerDraw
      weight
      depth
      rackUnit
      frequencyRange
    }
    errors {
      field
      message
    }
    equipmentItems {
      id
      createdAt
      updatedAt
      category
      manufacturer
      model
      publicNotes
      cost
      powerDraw
      weight
      depth
      rackUnit
      frequencyRange
    }
  }
}
    `;
export const EquipmentModelSearchDoc = gql`
    query EquipmentModelSearch($fullSearch: String!) {
  fullTextSearch(fullSearch: $fullSearch) {
    id
    createdAt
    updatedAt
    category
    manufacturer
    model
    publicNotes
    cost
    powerDraw
    weight
    depth
    rackUnit
    frequencyRange
  }
}
    `;
export const FuzzySearchDoc = gql`
    query FuzzySearch($FuzzySearchInput: String!) {
  fuzzyTextSearch(fuzzySearch: $FuzzySearchInput) {
    id
    model
    manufacturer
    category
  }
}
    `;
export const GetEquipmentDoc = gql`
    query GetEquipment($model: String!) {
  getEquipment(model: $model) {
    id
    createdAt
    updatedAt
    category
    manufacturer
    model
    publicNotes
    cost
    powerDraw
    weight
    depth
    rackUnit
    frequencyRange
  }
}
    `;
export const LoginUserDoc = gql`
    mutation LoginUser($inputOptions: UserInput!) {
  loginUser(inputOptions: $inputOptions) {
    errors {
      field
      message
    }
    user {
      createdAt
      updatedAt
      id
      email
    }
    accessToken
  }
}
    `;
export const UpdateEquipmentDoc = gql`
    mutation UpdateEquipment($updateOptions: EquipmentInput!, $updateEquipmentId: Int!) {
  updateEquipment(updateOptions: $updateOptions, id: $updateEquipmentId) {
    errors {
      field
      message
    }
    equipment {
      id
      createdAt
      updatedAt
      category
      manufacturer
      model
      publicNotes
      cost
      powerDraw
      weight
      depth
      rackUnit
      frequencyRange
    }
    equipmentItems {
      id
      createdAt
      updatedAt
      category
      manufacturer
      model
      publicNotes
      cost
      powerDraw
      weight
      depth
      rackUnit
      frequencyRange
    }
  }
}
    `;
export const ByeDoc = gql`
    query Bye {
  bye
}
    `;
export const MeDoc = gql`
    query Me {
  me: me {
    id
    createdAt
    updatedAt
    email
  }
}
    `;
export const CreateEquipment = (
            options: Omit<
              MutationOptions<any, CreateEquipmentMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<CreateEquipmentMutation, CreateEquipmentMutationVariables>({
              mutation: CreateEquipmentDoc,
              ...options,
            });
            return m;
          }
export const EquipmentModelSearch = (
            options: Omit<
              WatchQueryOptions<EquipmentModelSearchQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<EquipmentModelSearchQuery> & {
              query: ObservableQuery<
                EquipmentModelSearchQuery,
                EquipmentModelSearchQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: EquipmentModelSearchDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<EquipmentModelSearchQuery> & {
                query: ObservableQuery<
                  EquipmentModelSearchQuery,
                  EquipmentModelSearchQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
              export const AsyncEquipmentModelSearch = (
                options: Omit<
                  QueryOptions<EquipmentModelSearchQueryVariables>,
                  "query"
                >
              ) => {
                return client.query<EquipmentModelSearchQuery>({query: EquipmentModelSearchDoc, ...options})
              }
            
export const FuzzySearch = (
            options: Omit<
              WatchQueryOptions<FuzzySearchQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<FuzzySearchQuery> & {
              query: ObservableQuery<
                FuzzySearchQuery,
                FuzzySearchQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: FuzzySearchDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<FuzzySearchQuery> & {
                query: ObservableQuery<
                  FuzzySearchQuery,
                  FuzzySearchQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
              export const AsyncFuzzySearch = (
                options: Omit<
                  QueryOptions<FuzzySearchQueryVariables>,
                  "query"
                >
              ) => {
                return client.query<FuzzySearchQuery>({query: FuzzySearchDoc, ...options})
              }
            
export const GetEquipment = (
            options: Omit<
              WatchQueryOptions<GetEquipmentQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetEquipmentQuery> & {
              query: ObservableQuery<
                GetEquipmentQuery,
                GetEquipmentQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetEquipmentDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetEquipmentQuery> & {
                query: ObservableQuery<
                  GetEquipmentQuery,
                  GetEquipmentQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
              export const AsyncGetEquipment = (
                options: Omit<
                  QueryOptions<GetEquipmentQueryVariables>,
                  "query"
                >
              ) => {
                return client.query<GetEquipmentQuery>({query: GetEquipmentDoc, ...options})
              }
            
export const LoginUser = (
            options: Omit<
              MutationOptions<any, LoginUserMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<LoginUserMutation, LoginUserMutationVariables>({
              mutation: LoginUserDoc,
              ...options,
            });
            return m;
          }
export const UpdateEquipment = (
            options: Omit<
              MutationOptions<any, UpdateEquipmentMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<UpdateEquipmentMutation, UpdateEquipmentMutationVariables>({
              mutation: UpdateEquipmentDoc,
              ...options,
            });
            return m;
          }
export const Bye = (
            options: Omit<
              WatchQueryOptions<ByeQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<ByeQuery> & {
              query: ObservableQuery<
                ByeQuery,
                ByeQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: ByeDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<ByeQuery> & {
                query: ObservableQuery<
                  ByeQuery,
                  ByeQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
              export const AsyncBye = (
                options: Omit<
                  QueryOptions<ByeQueryVariables>,
                  "query"
                >
              ) => {
                return client.query<ByeQuery>({query: ByeDoc, ...options})
              }
            
export const Me = (
            options: Omit<
              WatchQueryOptions<MeQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<MeQuery> & {
              query: ObservableQuery<
                MeQuery,
                MeQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: MeDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<MeQuery> & {
                query: ObservableQuery<
                  MeQuery,
                  MeQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
              export const AsyncMe = (
                options: Omit<
                  QueryOptions<MeQueryVariables>,
                  "query"
                >
              ) => {
                return client.query<MeQuery>({query: MeDoc, ...options})
              }
            