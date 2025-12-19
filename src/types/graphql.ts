/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  bigint: { input: number; output: number };
  jsonb: { input: unknown; output: unknown };
  numeric: { input: number; output: number };
  timestamptz: { input: any; output: any };
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']['input']>;
  _gt?: InputMaybe<Scalars['bigint']['input']>;
  _gte?: InputMaybe<Scalars['bigint']['input']>;
  _in?: InputMaybe<Array<Scalars['bigint']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['bigint']['input']>;
  _lte?: InputMaybe<Scalars['bigint']['input']>;
  _neq?: InputMaybe<Scalars['bigint']['input']>;
  _nin?: InputMaybe<Array<Scalars['bigint']['input']>>;
};

/** columns and relationships of "circuits" */
export type Circuits = {
  __typename?: 'circuits';
  circuit_details?: Maybe<Scalars['jsonb']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  f1_key?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  latitude?: Maybe<Scalars['numeric']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['numeric']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  sessions: Array<Sessions>;
  /** An aggregate relationship */
  sessions_aggregate: Sessions_Aggregate;
  year?: Maybe<Scalars['Int']['output']>;
};

/** columns and relationships of "circuits" */
export type CircuitsCircuit_DetailsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "circuits" */
export type CircuitsSessionsArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

/** columns and relationships of "circuits" */
export type CircuitsSessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

/** aggregated selection of "circuits" */
export type Circuits_Aggregate = {
  __typename?: 'circuits_aggregate';
  aggregate?: Maybe<Circuits_Aggregate_Fields>;
  nodes: Array<Circuits>;
};

/** aggregate fields of "circuits" */
export type Circuits_Aggregate_Fields = {
  __typename?: 'circuits_aggregate_fields';
  avg?: Maybe<Circuits_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Circuits_Max_Fields>;
  min?: Maybe<Circuits_Min_Fields>;
  stddev?: Maybe<Circuits_Stddev_Fields>;
  stddev_pop?: Maybe<Circuits_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Circuits_Stddev_Samp_Fields>;
  sum?: Maybe<Circuits_Sum_Fields>;
  var_pop?: Maybe<Circuits_Var_Pop_Fields>;
  var_samp?: Maybe<Circuits_Var_Samp_Fields>;
  variance?: Maybe<Circuits_Variance_Fields>;
};

/** aggregate fields of "circuits" */
export type Circuits_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Circuits_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Circuits_Append_Input = {
  circuit_details?: InputMaybe<Scalars['jsonb']['input']>;
};

/** aggregate avg on columns */
export type Circuits_Avg_Fields = {
  __typename?: 'circuits_avg_fields';
  f1_key?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "circuits". All fields are combined with a logical 'AND'. */
export type Circuits_Bool_Exp = {
  _and?: InputMaybe<Array<Circuits_Bool_Exp>>;
  _not?: InputMaybe<Circuits_Bool_Exp>;
  _or?: InputMaybe<Array<Circuits_Bool_Exp>>;
  circuit_details?: InputMaybe<Jsonb_Comparison_Exp>;
  country?: InputMaybe<String_Comparison_Exp>;
  f1_key?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  latitude?: InputMaybe<Numeric_Comparison_Exp>;
  location?: InputMaybe<String_Comparison_Exp>;
  longitude?: InputMaybe<Numeric_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  sessions?: InputMaybe<Sessions_Bool_Exp>;
  sessions_aggregate?: InputMaybe<Sessions_Aggregate_Bool_Exp>;
  year?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "circuits" */
export enum Circuits_Constraint {
  /** unique or primary key constraint on columns "id" */
  CircuitsPkey = 'circuits_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Circuits_Delete_At_Path_Input = {
  circuit_details?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Circuits_Delete_Elem_Input = {
  circuit_details?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Circuits_Delete_Key_Input = {
  circuit_details?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing numeric columns in table "circuits" */
export type Circuits_Inc_Input = {
  f1_key?: InputMaybe<Scalars['Int']['input']>;
  latitude?: InputMaybe<Scalars['numeric']['input']>;
  longitude?: InputMaybe<Scalars['numeric']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "circuits" */
export type Circuits_Insert_Input = {
  circuit_details?: InputMaybe<Scalars['jsonb']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  f1_key?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['numeric']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['numeric']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sessions?: InputMaybe<Sessions_Arr_Rel_Insert_Input>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Circuits_Max_Fields = {
  __typename?: 'circuits_max_fields';
  country?: Maybe<Scalars['String']['output']>;
  f1_key?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  latitude?: Maybe<Scalars['numeric']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['numeric']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Circuits_Min_Fields = {
  __typename?: 'circuits_min_fields';
  country?: Maybe<Scalars['String']['output']>;
  f1_key?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  latitude?: Maybe<Scalars['numeric']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['numeric']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** response of any mutation on the table "circuits" */
export type Circuits_Mutation_Response = {
  __typename?: 'circuits_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Circuits>;
};

/** input type for inserting object relation for remote table "circuits" */
export type Circuits_Obj_Rel_Insert_Input = {
  data: Circuits_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Circuits_On_Conflict>;
};

/** on_conflict condition type for table "circuits" */
export type Circuits_On_Conflict = {
  constraint: Circuits_Constraint;
  update_columns?: Array<Circuits_Update_Column>;
  where?: InputMaybe<Circuits_Bool_Exp>;
};

/** Ordering options when selecting data from "circuits". */
export type Circuits_Order_By = {
  circuit_details?: InputMaybe<Order_By>;
  country?: InputMaybe<Order_By>;
  f1_key?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  sessions_aggregate?: InputMaybe<Sessions_Aggregate_Order_By>;
  year?: InputMaybe<Order_By>;
};

/** primary key columns input for table: circuits */
export type Circuits_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Circuits_Prepend_Input = {
  circuit_details?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "circuits" */
export enum Circuits_Select_Column {
  /** column name */
  CircuitDetails = 'circuit_details',
  /** column name */
  Country = 'country',
  /** column name */
  F1Key = 'f1_key',
  /** column name */
  Id = 'id',
  /** column name */
  Latitude = 'latitude',
  /** column name */
  Location = 'location',
  /** column name */
  Longitude = 'longitude',
  /** column name */
  Name = 'name',
  /** column name */
  Year = 'year',
}

/** input type for updating data in table "circuits" */
export type Circuits_Set_Input = {
  circuit_details?: InputMaybe<Scalars['jsonb']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  f1_key?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['numeric']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['numeric']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Circuits_Stddev_Fields = {
  __typename?: 'circuits_stddev_fields';
  f1_key?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Circuits_Stddev_Pop_Fields = {
  __typename?: 'circuits_stddev_pop_fields';
  f1_key?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Circuits_Stddev_Samp_Fields = {
  __typename?: 'circuits_stddev_samp_fields';
  f1_key?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "circuits" */
export type Circuits_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Circuits_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Circuits_Stream_Cursor_Value_Input = {
  circuit_details?: InputMaybe<Scalars['jsonb']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  f1_key?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['numeric']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['numeric']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Circuits_Sum_Fields = {
  __typename?: 'circuits_sum_fields';
  f1_key?: Maybe<Scalars['Int']['output']>;
  latitude?: Maybe<Scalars['numeric']['output']>;
  longitude?: Maybe<Scalars['numeric']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "circuits" */
export enum Circuits_Update_Column {
  /** column name */
  CircuitDetails = 'circuit_details',
  /** column name */
  Country = 'country',
  /** column name */
  F1Key = 'f1_key',
  /** column name */
  Id = 'id',
  /** column name */
  Latitude = 'latitude',
  /** column name */
  Location = 'location',
  /** column name */
  Longitude = 'longitude',
  /** column name */
  Name = 'name',
  /** column name */
  Year = 'year',
}

export type Circuits_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Circuits_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Circuits_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Circuits_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Circuits_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Circuits_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Circuits_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Circuits_Set_Input>;
  /** filter the rows which have to be updated */
  where: Circuits_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Circuits_Var_Pop_Fields = {
  __typename?: 'circuits_var_pop_fields';
  f1_key?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Circuits_Var_Samp_Fields = {
  __typename?: 'circuits_var_samp_fields';
  f1_key?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Circuits_Variance_Fields = {
  __typename?: 'circuits_variance_fields';
  f1_key?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "constructor_standings" */
export type Constructor_Standings = {
  __typename?: 'constructor_standings';
  /** An object relationship */
  constructorByConstructorIdSeason?: Maybe<Constructors>;
  constructor_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  points?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  position_text?: Maybe<Scalars['String']['output']>;
  round?: Maybe<Scalars['Int']['output']>;
  season?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};

/** aggregated selection of "constructor_standings" */
export type Constructor_Standings_Aggregate = {
  __typename?: 'constructor_standings_aggregate';
  aggregate?: Maybe<Constructor_Standings_Aggregate_Fields>;
  nodes: Array<Constructor_Standings>;
};

export type Constructor_Standings_Aggregate_Bool_Exp = {
  count?: InputMaybe<Constructor_Standings_Aggregate_Bool_Exp_Count>;
};

export type Constructor_Standings_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Constructor_Standings_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Constructor_Standings_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "constructor_standings" */
export type Constructor_Standings_Aggregate_Fields = {
  __typename?: 'constructor_standings_aggregate_fields';
  avg?: Maybe<Constructor_Standings_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Constructor_Standings_Max_Fields>;
  min?: Maybe<Constructor_Standings_Min_Fields>;
  stddev?: Maybe<Constructor_Standings_Stddev_Fields>;
  stddev_pop?: Maybe<Constructor_Standings_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Constructor_Standings_Stddev_Samp_Fields>;
  sum?: Maybe<Constructor_Standings_Sum_Fields>;
  var_pop?: Maybe<Constructor_Standings_Var_Pop_Fields>;
  var_samp?: Maybe<Constructor_Standings_Var_Samp_Fields>;
  variance?: Maybe<Constructor_Standings_Variance_Fields>;
};

/** aggregate fields of "constructor_standings" */
export type Constructor_Standings_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Constructor_Standings_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "constructor_standings" */
export type Constructor_Standings_Aggregate_Order_By = {
  avg?: InputMaybe<Constructor_Standings_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Constructor_Standings_Max_Order_By>;
  min?: InputMaybe<Constructor_Standings_Min_Order_By>;
  stddev?: InputMaybe<Constructor_Standings_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Constructor_Standings_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Constructor_Standings_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Constructor_Standings_Sum_Order_By>;
  var_pop?: InputMaybe<Constructor_Standings_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Constructor_Standings_Var_Samp_Order_By>;
  variance?: InputMaybe<Constructor_Standings_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "constructor_standings" */
export type Constructor_Standings_Arr_Rel_Insert_Input = {
  data: Array<Constructor_Standings_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Constructor_Standings_On_Conflict>;
};

/** aggregate avg on columns */
export type Constructor_Standings_Avg_Fields = {
  __typename?: 'constructor_standings_avg_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "constructor_standings" */
export type Constructor_Standings_Avg_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "constructor_standings". All fields are combined with a logical 'AND'. */
export type Constructor_Standings_Bool_Exp = {
  _and?: InputMaybe<Array<Constructor_Standings_Bool_Exp>>;
  _not?: InputMaybe<Constructor_Standings_Bool_Exp>;
  _or?: InputMaybe<Array<Constructor_Standings_Bool_Exp>>;
  constructorByConstructorIdSeason?: InputMaybe<Constructors_Bool_Exp>;
  constructor_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  points?: InputMaybe<Numeric_Comparison_Exp>;
  position?: InputMaybe<Int_Comparison_Exp>;
  position_text?: InputMaybe<String_Comparison_Exp>;
  round?: InputMaybe<Int_Comparison_Exp>;
  season?: InputMaybe<Int_Comparison_Exp>;
  wins?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "constructor_standings" */
export enum Constructor_Standings_Constraint {
  /** unique or primary key constraint on columns "id" */
  ConstructorStandingsPkey = 'constructor_standings_pkey',
}

/** input type for incrementing numeric columns in table "constructor_standings" */
export type Constructor_Standings_Inc_Input = {
  points?: InputMaybe<Scalars['numeric']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  round?: InputMaybe<Scalars['Int']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
  wins?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "constructor_standings" */
export type Constructor_Standings_Insert_Input = {
  constructorByConstructorIdSeason?: InputMaybe<Constructors_Obj_Rel_Insert_Input>;
  constructor_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['numeric']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  position_text?: InputMaybe<Scalars['String']['input']>;
  round?: InputMaybe<Scalars['Int']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
  wins?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Constructor_Standings_Max_Fields = {
  __typename?: 'constructor_standings_max_fields';
  constructor_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  points?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  position_text?: Maybe<Scalars['String']['output']>;
  round?: Maybe<Scalars['Int']['output']>;
  season?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "constructor_standings" */
export type Constructor_Standings_Max_Order_By = {
  constructor_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  position_text?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Constructor_Standings_Min_Fields = {
  __typename?: 'constructor_standings_min_fields';
  constructor_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  points?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  position_text?: Maybe<Scalars['String']['output']>;
  round?: Maybe<Scalars['Int']['output']>;
  season?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "constructor_standings" */
export type Constructor_Standings_Min_Order_By = {
  constructor_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  position_text?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "constructor_standings" */
export type Constructor_Standings_Mutation_Response = {
  __typename?: 'constructor_standings_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Constructor_Standings>;
};

/** on_conflict condition type for table "constructor_standings" */
export type Constructor_Standings_On_Conflict = {
  constraint: Constructor_Standings_Constraint;
  update_columns?: Array<Constructor_Standings_Update_Column>;
  where?: InputMaybe<Constructor_Standings_Bool_Exp>;
};

/** Ordering options when selecting data from "constructor_standings". */
export type Constructor_Standings_Order_By = {
  constructorByConstructorIdSeason?: InputMaybe<Constructors_Order_By>;
  constructor_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  position_text?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** primary key columns input for table: constructor_standings */
export type Constructor_Standings_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "constructor_standings" */
export enum Constructor_Standings_Select_Column {
  /** column name */
  ConstructorId = 'constructor_id',
  /** column name */
  Id = 'id',
  /** column name */
  Points = 'points',
  /** column name */
  Position = 'position',
  /** column name */
  PositionText = 'position_text',
  /** column name */
  Round = 'round',
  /** column name */
  Season = 'season',
  /** column name */
  Wins = 'wins',
}

/** input type for updating data in table "constructor_standings" */
export type Constructor_Standings_Set_Input = {
  constructor_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['numeric']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  position_text?: InputMaybe<Scalars['String']['input']>;
  round?: InputMaybe<Scalars['Int']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
  wins?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Constructor_Standings_Stddev_Fields = {
  __typename?: 'constructor_standings_stddev_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "constructor_standings" */
export type Constructor_Standings_Stddev_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Constructor_Standings_Stddev_Pop_Fields = {
  __typename?: 'constructor_standings_stddev_pop_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "constructor_standings" */
export type Constructor_Standings_Stddev_Pop_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Constructor_Standings_Stddev_Samp_Fields = {
  __typename?: 'constructor_standings_stddev_samp_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "constructor_standings" */
export type Constructor_Standings_Stddev_Samp_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "constructor_standings" */
export type Constructor_Standings_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Constructor_Standings_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Constructor_Standings_Stream_Cursor_Value_Input = {
  constructor_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['numeric']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  position_text?: InputMaybe<Scalars['String']['input']>;
  round?: InputMaybe<Scalars['Int']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
  wins?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Constructor_Standings_Sum_Fields = {
  __typename?: 'constructor_standings_sum_fields';
  points?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  round?: Maybe<Scalars['Int']['output']>;
  season?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "constructor_standings" */
export type Constructor_Standings_Sum_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** update columns of table "constructor_standings" */
export enum Constructor_Standings_Update_Column {
  /** column name */
  ConstructorId = 'constructor_id',
  /** column name */
  Id = 'id',
  /** column name */
  Points = 'points',
  /** column name */
  Position = 'position',
  /** column name */
  PositionText = 'position_text',
  /** column name */
  Round = 'round',
  /** column name */
  Season = 'season',
  /** column name */
  Wins = 'wins',
}

export type Constructor_Standings_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Constructor_Standings_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Constructor_Standings_Set_Input>;
  /** filter the rows which have to be updated */
  where: Constructor_Standings_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Constructor_Standings_Var_Pop_Fields = {
  __typename?: 'constructor_standings_var_pop_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "constructor_standings" */
export type Constructor_Standings_Var_Pop_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Constructor_Standings_Var_Samp_Fields = {
  __typename?: 'constructor_standings_var_samp_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "constructor_standings" */
export type Constructor_Standings_Var_Samp_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Constructor_Standings_Variance_Fields = {
  __typename?: 'constructor_standings_variance_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "constructor_standings" */
export type Constructor_Standings_Variance_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** columns and relationships of "constructors" */
export type Constructors = {
  __typename?: 'constructors';
  color?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  constructor_standings: Array<Constructor_Standings>;
  /** An aggregate relationship */
  constructor_standings_aggregate: Constructor_Standings_Aggregate;
  /** An array relationship */
  driver_sessions: Array<Driver_Sessions>;
  /** An aggregate relationship */
  driver_sessions_aggregate: Driver_Sessions_Aggregate;
  engine?: Maybe<Scalars['String']['output']>;
  ergast_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  start_year?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** columns and relationships of "constructors" */
export type ConstructorsConstructor_StandingsArgs = {
  distinct_on?: InputMaybe<Array<Constructor_Standings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Constructor_Standings_Order_By>>;
  where?: InputMaybe<Constructor_Standings_Bool_Exp>;
};

/** columns and relationships of "constructors" */
export type ConstructorsConstructor_Standings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Constructor_Standings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Constructor_Standings_Order_By>>;
  where?: InputMaybe<Constructor_Standings_Bool_Exp>;
};

/** columns and relationships of "constructors" */
export type ConstructorsDriver_SessionsArgs = {
  distinct_on?: InputMaybe<Array<Driver_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Sessions_Order_By>>;
  where?: InputMaybe<Driver_Sessions_Bool_Exp>;
};

/** columns and relationships of "constructors" */
export type ConstructorsDriver_Sessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Driver_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Sessions_Order_By>>;
  where?: InputMaybe<Driver_Sessions_Bool_Exp>;
};

/** aggregated selection of "constructors" */
export type Constructors_Aggregate = {
  __typename?: 'constructors_aggregate';
  aggregate?: Maybe<Constructors_Aggregate_Fields>;
  nodes: Array<Constructors>;
};

/** aggregate fields of "constructors" */
export type Constructors_Aggregate_Fields = {
  __typename?: 'constructors_aggregate_fields';
  avg?: Maybe<Constructors_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Constructors_Max_Fields>;
  min?: Maybe<Constructors_Min_Fields>;
  stddev?: Maybe<Constructors_Stddev_Fields>;
  stddev_pop?: Maybe<Constructors_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Constructors_Stddev_Samp_Fields>;
  sum?: Maybe<Constructors_Sum_Fields>;
  var_pop?: Maybe<Constructors_Var_Pop_Fields>;
  var_samp?: Maybe<Constructors_Var_Samp_Fields>;
  variance?: Maybe<Constructors_Variance_Fields>;
};

/** aggregate fields of "constructors" */
export type Constructors_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Constructors_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Constructors_Avg_Fields = {
  __typename?: 'constructors_avg_fields';
  start_year?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "constructors". All fields are combined with a logical 'AND'. */
export type Constructors_Bool_Exp = {
  _and?: InputMaybe<Array<Constructors_Bool_Exp>>;
  _not?: InputMaybe<Constructors_Bool_Exp>;
  _or?: InputMaybe<Array<Constructors_Bool_Exp>>;
  color?: InputMaybe<String_Comparison_Exp>;
  constructor_standings?: InputMaybe<Constructor_Standings_Bool_Exp>;
  constructor_standings_aggregate?: InputMaybe<Constructor_Standings_Aggregate_Bool_Exp>;
  driver_sessions?: InputMaybe<Driver_Sessions_Bool_Exp>;
  driver_sessions_aggregate?: InputMaybe<Driver_Sessions_Aggregate_Bool_Exp>;
  engine?: InputMaybe<String_Comparison_Exp>;
  ergast_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  nationality?: InputMaybe<String_Comparison_Exp>;
  start_year?: InputMaybe<Int_Comparison_Exp>;
  year?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "constructors" */
export enum Constructors_Constraint {
  /** unique or primary key constraint on columns "ergast_id", "year" */
  ConstructorsErgastIdYearUnique = 'constructors_ergast_id_year_unique',
  /** unique or primary key constraint on columns "id" */
  ConstructorsPkey = 'constructors_pkey',
}

/** input type for incrementing numeric columns in table "constructors" */
export type Constructors_Inc_Input = {
  start_year?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "constructors" */
export type Constructors_Insert_Input = {
  color?: InputMaybe<Scalars['String']['input']>;
  constructor_standings?: InputMaybe<Constructor_Standings_Arr_Rel_Insert_Input>;
  driver_sessions?: InputMaybe<Driver_Sessions_Arr_Rel_Insert_Input>;
  engine?: InputMaybe<Scalars['String']['input']>;
  ergast_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Scalars['String']['input']>;
  start_year?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Constructors_Max_Fields = {
  __typename?: 'constructors_max_fields';
  color?: Maybe<Scalars['String']['output']>;
  engine?: Maybe<Scalars['String']['output']>;
  ergast_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  start_year?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Constructors_Min_Fields = {
  __typename?: 'constructors_min_fields';
  color?: Maybe<Scalars['String']['output']>;
  engine?: Maybe<Scalars['String']['output']>;
  ergast_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  start_year?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** response of any mutation on the table "constructors" */
export type Constructors_Mutation_Response = {
  __typename?: 'constructors_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Constructors>;
};

/** input type for inserting object relation for remote table "constructors" */
export type Constructors_Obj_Rel_Insert_Input = {
  data: Constructors_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Constructors_On_Conflict>;
};

/** on_conflict condition type for table "constructors" */
export type Constructors_On_Conflict = {
  constraint: Constructors_Constraint;
  update_columns?: Array<Constructors_Update_Column>;
  where?: InputMaybe<Constructors_Bool_Exp>;
};

/** Ordering options when selecting data from "constructors". */
export type Constructors_Order_By = {
  color?: InputMaybe<Order_By>;
  constructor_standings_aggregate?: InputMaybe<Constructor_Standings_Aggregate_Order_By>;
  driver_sessions_aggregate?: InputMaybe<Driver_Sessions_Aggregate_Order_By>;
  engine?: InputMaybe<Order_By>;
  ergast_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  nationality?: InputMaybe<Order_By>;
  start_year?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** primary key columns input for table: constructors */
export type Constructors_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "constructors" */
export enum Constructors_Select_Column {
  /** column name */
  Color = 'color',
  /** column name */
  Engine = 'engine',
  /** column name */
  ErgastId = 'ergast_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Nationality = 'nationality',
  /** column name */
  StartYear = 'start_year',
  /** column name */
  Year = 'year',
}

/** input type for updating data in table "constructors" */
export type Constructors_Set_Input = {
  color?: InputMaybe<Scalars['String']['input']>;
  engine?: InputMaybe<Scalars['String']['input']>;
  ergast_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Scalars['String']['input']>;
  start_year?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Constructors_Stddev_Fields = {
  __typename?: 'constructors_stddev_fields';
  start_year?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Constructors_Stddev_Pop_Fields = {
  __typename?: 'constructors_stddev_pop_fields';
  start_year?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Constructors_Stddev_Samp_Fields = {
  __typename?: 'constructors_stddev_samp_fields';
  start_year?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "constructors" */
export type Constructors_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Constructors_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Constructors_Stream_Cursor_Value_Input = {
  color?: InputMaybe<Scalars['String']['input']>;
  engine?: InputMaybe<Scalars['String']['input']>;
  ergast_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Scalars['String']['input']>;
  start_year?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Constructors_Sum_Fields = {
  __typename?: 'constructors_sum_fields';
  start_year?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "constructors" */
export enum Constructors_Update_Column {
  /** column name */
  Color = 'color',
  /** column name */
  Engine = 'engine',
  /** column name */
  ErgastId = 'ergast_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Nationality = 'nationality',
  /** column name */
  StartYear = 'start_year',
  /** column name */
  Year = 'year',
}

export type Constructors_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Constructors_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Constructors_Set_Input>;
  /** filter the rows which have to be updated */
  where: Constructors_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Constructors_Var_Pop_Fields = {
  __typename?: 'constructors_var_pop_fields';
  start_year?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Constructors_Var_Samp_Fields = {
  __typename?: 'constructors_var_samp_fields';
  start_year?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Constructors_Variance_Fields = {
  __typename?: 'constructors_variance_fields';
  start_year?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC',
}

/** columns and relationships of "driver_sessions" */
export type Driver_Sessions = {
  __typename?: 'driver_sessions';
  /** An object relationship */
  constructorByConstructorId?: Maybe<Constructors>;
  constructor_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  driver?: Maybe<Drivers>;
  driver_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  /** An array relationship */
  laps: Array<Laps>;
  /** An aggregate relationship */
  laps_aggregate: Laps_Aggregate;
  /** An array relationship */
  results: Array<Results>;
  /** An aggregate relationship */
  results_aggregate: Results_Aggregate;
  /** An object relationship */
  session?: Maybe<Sessions>;
  session_id?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  telemetries: Array<Telemetry>;
  /** An aggregate relationship */
  telemetries_aggregate: Telemetry_Aggregate;
};

/** columns and relationships of "driver_sessions" */
export type Driver_SessionsLapsArgs = {
  distinct_on?: InputMaybe<Array<Laps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Laps_Order_By>>;
  where?: InputMaybe<Laps_Bool_Exp>;
};

/** columns and relationships of "driver_sessions" */
export type Driver_SessionsLaps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Laps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Laps_Order_By>>;
  where?: InputMaybe<Laps_Bool_Exp>;
};

/** columns and relationships of "driver_sessions" */
export type Driver_SessionsResultsArgs = {
  distinct_on?: InputMaybe<Array<Results_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Results_Order_By>>;
  where?: InputMaybe<Results_Bool_Exp>;
};

/** columns and relationships of "driver_sessions" */
export type Driver_SessionsResults_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Results_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Results_Order_By>>;
  where?: InputMaybe<Results_Bool_Exp>;
};

/** columns and relationships of "driver_sessions" */
export type Driver_SessionsTelemetriesArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Order_By>>;
  where?: InputMaybe<Telemetry_Bool_Exp>;
};

/** columns and relationships of "driver_sessions" */
export type Driver_SessionsTelemetries_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Order_By>>;
  where?: InputMaybe<Telemetry_Bool_Exp>;
};

/** aggregated selection of "driver_sessions" */
export type Driver_Sessions_Aggregate = {
  __typename?: 'driver_sessions_aggregate';
  aggregate?: Maybe<Driver_Sessions_Aggregate_Fields>;
  nodes: Array<Driver_Sessions>;
};

export type Driver_Sessions_Aggregate_Bool_Exp = {
  count?: InputMaybe<Driver_Sessions_Aggregate_Bool_Exp_Count>;
};

export type Driver_Sessions_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Driver_Sessions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Driver_Sessions_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "driver_sessions" */
export type Driver_Sessions_Aggregate_Fields = {
  __typename?: 'driver_sessions_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Driver_Sessions_Max_Fields>;
  min?: Maybe<Driver_Sessions_Min_Fields>;
};

/** aggregate fields of "driver_sessions" */
export type Driver_Sessions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Driver_Sessions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "driver_sessions" */
export type Driver_Sessions_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Driver_Sessions_Max_Order_By>;
  min?: InputMaybe<Driver_Sessions_Min_Order_By>;
};

/** input type for inserting array relation for remote table "driver_sessions" */
export type Driver_Sessions_Arr_Rel_Insert_Input = {
  data: Array<Driver_Sessions_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Driver_Sessions_On_Conflict>;
};

/** Boolean expression to filter rows from the table "driver_sessions". All fields are combined with a logical 'AND'. */
export type Driver_Sessions_Bool_Exp = {
  _and?: InputMaybe<Array<Driver_Sessions_Bool_Exp>>;
  _not?: InputMaybe<Driver_Sessions_Bool_Exp>;
  _or?: InputMaybe<Array<Driver_Sessions_Bool_Exp>>;
  constructorByConstructorId?: InputMaybe<Constructors_Bool_Exp>;
  constructor_id?: InputMaybe<String_Comparison_Exp>;
  driver?: InputMaybe<Drivers_Bool_Exp>;
  driver_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  laps?: InputMaybe<Laps_Bool_Exp>;
  laps_aggregate?: InputMaybe<Laps_Aggregate_Bool_Exp>;
  results?: InputMaybe<Results_Bool_Exp>;
  results_aggregate?: InputMaybe<Results_Aggregate_Bool_Exp>;
  session?: InputMaybe<Sessions_Bool_Exp>;
  session_id?: InputMaybe<String_Comparison_Exp>;
  telemetries?: InputMaybe<Telemetry_Bool_Exp>;
  telemetries_aggregate?: InputMaybe<Telemetry_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "driver_sessions" */
export enum Driver_Sessions_Constraint {
  /** unique or primary key constraint on columns "id" */
  DriverSessionsPkey = 'driver_sessions_pkey',
}

/** input type for inserting data into table "driver_sessions" */
export type Driver_Sessions_Insert_Input = {
  constructorByConstructorId?: InputMaybe<Constructors_Obj_Rel_Insert_Input>;
  constructor_id?: InputMaybe<Scalars['String']['input']>;
  driver?: InputMaybe<Drivers_Obj_Rel_Insert_Input>;
  driver_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  laps?: InputMaybe<Laps_Arr_Rel_Insert_Input>;
  results?: InputMaybe<Results_Arr_Rel_Insert_Input>;
  session?: InputMaybe<Sessions_Obj_Rel_Insert_Input>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  telemetries?: InputMaybe<Telemetry_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Driver_Sessions_Max_Fields = {
  __typename?: 'driver_sessions_max_fields';
  constructor_id?: Maybe<Scalars['String']['output']>;
  driver_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "driver_sessions" */
export type Driver_Sessions_Max_Order_By = {
  constructor_id?: InputMaybe<Order_By>;
  driver_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Driver_Sessions_Min_Fields = {
  __typename?: 'driver_sessions_min_fields';
  constructor_id?: Maybe<Scalars['String']['output']>;
  driver_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "driver_sessions" */
export type Driver_Sessions_Min_Order_By = {
  constructor_id?: InputMaybe<Order_By>;
  driver_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "driver_sessions" */
export type Driver_Sessions_Mutation_Response = {
  __typename?: 'driver_sessions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Driver_Sessions>;
};

/** input type for inserting object relation for remote table "driver_sessions" */
export type Driver_Sessions_Obj_Rel_Insert_Input = {
  data: Driver_Sessions_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Driver_Sessions_On_Conflict>;
};

/** on_conflict condition type for table "driver_sessions" */
export type Driver_Sessions_On_Conflict = {
  constraint: Driver_Sessions_Constraint;
  update_columns?: Array<Driver_Sessions_Update_Column>;
  where?: InputMaybe<Driver_Sessions_Bool_Exp>;
};

/** Ordering options when selecting data from "driver_sessions". */
export type Driver_Sessions_Order_By = {
  constructorByConstructorId?: InputMaybe<Constructors_Order_By>;
  constructor_id?: InputMaybe<Order_By>;
  driver?: InputMaybe<Drivers_Order_By>;
  driver_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  laps_aggregate?: InputMaybe<Laps_Aggregate_Order_By>;
  results_aggregate?: InputMaybe<Results_Aggregate_Order_By>;
  session?: InputMaybe<Sessions_Order_By>;
  session_id?: InputMaybe<Order_By>;
  telemetries_aggregate?: InputMaybe<Telemetry_Aggregate_Order_By>;
};

/** primary key columns input for table: driver_sessions */
export type Driver_Sessions_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "driver_sessions" */
export enum Driver_Sessions_Select_Column {
  /** column name */
  ConstructorId = 'constructor_id',
  /** column name */
  DriverId = 'driver_id',
  /** column name */
  Id = 'id',
  /** column name */
  SessionId = 'session_id',
}

/** input type for updating data in table "driver_sessions" */
export type Driver_Sessions_Set_Input = {
  constructor_id?: InputMaybe<Scalars['String']['input']>;
  driver_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  session_id?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "driver_sessions" */
export type Driver_Sessions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Driver_Sessions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Driver_Sessions_Stream_Cursor_Value_Input = {
  constructor_id?: InputMaybe<Scalars['String']['input']>;
  driver_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  session_id?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "driver_sessions" */
export enum Driver_Sessions_Update_Column {
  /** column name */
  ConstructorId = 'constructor_id',
  /** column name */
  DriverId = 'driver_id',
  /** column name */
  Id = 'id',
  /** column name */
  SessionId = 'session_id',
}

export type Driver_Sessions_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Driver_Sessions_Set_Input>;
  /** filter the rows which have to be updated */
  where: Driver_Sessions_Bool_Exp;
};

/** columns and relationships of "driver_standings" */
export type Driver_Standings = {
  __typename?: 'driver_standings';
  /** An object relationship */
  driver?: Maybe<Drivers>;
  driver_full_name?: Maybe<Scalars['String']['output']>;
  driver_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  points?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  position_text?: Maybe<Scalars['String']['output']>;
  round?: Maybe<Scalars['Int']['output']>;
  season?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};

/** aggregated selection of "driver_standings" */
export type Driver_Standings_Aggregate = {
  __typename?: 'driver_standings_aggregate';
  aggregate?: Maybe<Driver_Standings_Aggregate_Fields>;
  nodes: Array<Driver_Standings>;
};

export type Driver_Standings_Aggregate_Bool_Exp = {
  count?: InputMaybe<Driver_Standings_Aggregate_Bool_Exp_Count>;
};

export type Driver_Standings_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Driver_Standings_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Driver_Standings_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "driver_standings" */
export type Driver_Standings_Aggregate_Fields = {
  __typename?: 'driver_standings_aggregate_fields';
  avg?: Maybe<Driver_Standings_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Driver_Standings_Max_Fields>;
  min?: Maybe<Driver_Standings_Min_Fields>;
  stddev?: Maybe<Driver_Standings_Stddev_Fields>;
  stddev_pop?: Maybe<Driver_Standings_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Driver_Standings_Stddev_Samp_Fields>;
  sum?: Maybe<Driver_Standings_Sum_Fields>;
  var_pop?: Maybe<Driver_Standings_Var_Pop_Fields>;
  var_samp?: Maybe<Driver_Standings_Var_Samp_Fields>;
  variance?: Maybe<Driver_Standings_Variance_Fields>;
};

/** aggregate fields of "driver_standings" */
export type Driver_Standings_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Driver_Standings_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "driver_standings" */
export type Driver_Standings_Aggregate_Order_By = {
  avg?: InputMaybe<Driver_Standings_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Driver_Standings_Max_Order_By>;
  min?: InputMaybe<Driver_Standings_Min_Order_By>;
  stddev?: InputMaybe<Driver_Standings_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Driver_Standings_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Driver_Standings_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Driver_Standings_Sum_Order_By>;
  var_pop?: InputMaybe<Driver_Standings_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Driver_Standings_Var_Samp_Order_By>;
  variance?: InputMaybe<Driver_Standings_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "driver_standings" */
export type Driver_Standings_Arr_Rel_Insert_Input = {
  data: Array<Driver_Standings_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Driver_Standings_On_Conflict>;
};

/** aggregate avg on columns */
export type Driver_Standings_Avg_Fields = {
  __typename?: 'driver_standings_avg_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "driver_standings" */
export type Driver_Standings_Avg_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "driver_standings". All fields are combined with a logical 'AND'. */
export type Driver_Standings_Bool_Exp = {
  _and?: InputMaybe<Array<Driver_Standings_Bool_Exp>>;
  _not?: InputMaybe<Driver_Standings_Bool_Exp>;
  _or?: InputMaybe<Array<Driver_Standings_Bool_Exp>>;
  driver?: InputMaybe<Drivers_Bool_Exp>;
  driver_full_name?: InputMaybe<String_Comparison_Exp>;
  driver_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  points?: InputMaybe<Numeric_Comparison_Exp>;
  position?: InputMaybe<Int_Comparison_Exp>;
  position_text?: InputMaybe<String_Comparison_Exp>;
  round?: InputMaybe<Int_Comparison_Exp>;
  season?: InputMaybe<Int_Comparison_Exp>;
  wins?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "driver_standings" */
export enum Driver_Standings_Constraint {
  /** unique or primary key constraint on columns "id" */
  DriverStandingsPkey = 'driver_standings_pkey',
}

/** input type for incrementing numeric columns in table "driver_standings" */
export type Driver_Standings_Inc_Input = {
  points?: InputMaybe<Scalars['numeric']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  round?: InputMaybe<Scalars['Int']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
  wins?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "driver_standings" */
export type Driver_Standings_Insert_Input = {
  driver?: InputMaybe<Drivers_Obj_Rel_Insert_Input>;
  driver_full_name?: InputMaybe<Scalars['String']['input']>;
  driver_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['numeric']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  position_text?: InputMaybe<Scalars['String']['input']>;
  round?: InputMaybe<Scalars['Int']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
  wins?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Driver_Standings_Max_Fields = {
  __typename?: 'driver_standings_max_fields';
  driver_full_name?: Maybe<Scalars['String']['output']>;
  driver_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  points?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  position_text?: Maybe<Scalars['String']['output']>;
  round?: Maybe<Scalars['Int']['output']>;
  season?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "driver_standings" */
export type Driver_Standings_Max_Order_By = {
  driver_full_name?: InputMaybe<Order_By>;
  driver_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  position_text?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Driver_Standings_Min_Fields = {
  __typename?: 'driver_standings_min_fields';
  driver_full_name?: Maybe<Scalars['String']['output']>;
  driver_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  points?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  position_text?: Maybe<Scalars['String']['output']>;
  round?: Maybe<Scalars['Int']['output']>;
  season?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "driver_standings" */
export type Driver_Standings_Min_Order_By = {
  driver_full_name?: InputMaybe<Order_By>;
  driver_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  position_text?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "driver_standings" */
export type Driver_Standings_Mutation_Response = {
  __typename?: 'driver_standings_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Driver_Standings>;
};

/** on_conflict condition type for table "driver_standings" */
export type Driver_Standings_On_Conflict = {
  constraint: Driver_Standings_Constraint;
  update_columns?: Array<Driver_Standings_Update_Column>;
  where?: InputMaybe<Driver_Standings_Bool_Exp>;
};

/** Ordering options when selecting data from "driver_standings". */
export type Driver_Standings_Order_By = {
  driver?: InputMaybe<Drivers_Order_By>;
  driver_full_name?: InputMaybe<Order_By>;
  driver_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  position_text?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** primary key columns input for table: driver_standings */
export type Driver_Standings_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "driver_standings" */
export enum Driver_Standings_Select_Column {
  /** column name */
  DriverFullName = 'driver_full_name',
  /** column name */
  DriverId = 'driver_id',
  /** column name */
  Id = 'id',
  /** column name */
  Points = 'points',
  /** column name */
  Position = 'position',
  /** column name */
  PositionText = 'position_text',
  /** column name */
  Round = 'round',
  /** column name */
  Season = 'season',
  /** column name */
  Wins = 'wins',
}

/** input type for updating data in table "driver_standings" */
export type Driver_Standings_Set_Input = {
  driver_full_name?: InputMaybe<Scalars['String']['input']>;
  driver_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['numeric']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  position_text?: InputMaybe<Scalars['String']['input']>;
  round?: InputMaybe<Scalars['Int']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
  wins?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Driver_Standings_Stddev_Fields = {
  __typename?: 'driver_standings_stddev_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "driver_standings" */
export type Driver_Standings_Stddev_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Driver_Standings_Stddev_Pop_Fields = {
  __typename?: 'driver_standings_stddev_pop_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "driver_standings" */
export type Driver_Standings_Stddev_Pop_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Driver_Standings_Stddev_Samp_Fields = {
  __typename?: 'driver_standings_stddev_samp_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "driver_standings" */
export type Driver_Standings_Stddev_Samp_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "driver_standings" */
export type Driver_Standings_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Driver_Standings_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Driver_Standings_Stream_Cursor_Value_Input = {
  driver_full_name?: InputMaybe<Scalars['String']['input']>;
  driver_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['numeric']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  position_text?: InputMaybe<Scalars['String']['input']>;
  round?: InputMaybe<Scalars['Int']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
  wins?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Driver_Standings_Sum_Fields = {
  __typename?: 'driver_standings_sum_fields';
  points?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  round?: Maybe<Scalars['Int']['output']>;
  season?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "driver_standings" */
export type Driver_Standings_Sum_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** update columns of table "driver_standings" */
export enum Driver_Standings_Update_Column {
  /** column name */
  DriverFullName = 'driver_full_name',
  /** column name */
  DriverId = 'driver_id',
  /** column name */
  Id = 'id',
  /** column name */
  Points = 'points',
  /** column name */
  Position = 'position',
  /** column name */
  PositionText = 'position_text',
  /** column name */
  Round = 'round',
  /** column name */
  Season = 'season',
  /** column name */
  Wins = 'wins',
}

export type Driver_Standings_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Driver_Standings_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Driver_Standings_Set_Input>;
  /** filter the rows which have to be updated */
  where: Driver_Standings_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Driver_Standings_Var_Pop_Fields = {
  __typename?: 'driver_standings_var_pop_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "driver_standings" */
export type Driver_Standings_Var_Pop_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Driver_Standings_Var_Samp_Fields = {
  __typename?: 'driver_standings_var_samp_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "driver_standings" */
export type Driver_Standings_Var_Samp_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Driver_Standings_Variance_Fields = {
  __typename?: 'driver_standings_variance_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "driver_standings" */
export type Driver_Standings_Variance_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** columns and relationships of "drivers" */
export type Drivers = {
  __typename?: 'drivers';
  abbreviation?: Maybe<Scalars['String']['output']>;
  broadcast_name?: Maybe<Scalars['String']['output']>;
  country_code?: Maybe<Scalars['String']['output']>;
  date_of_birth?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  driver_sessions: Array<Driver_Sessions>;
  /** An aggregate relationship */
  driver_sessions_aggregate: Driver_Sessions_Aggregate;
  /** An array relationship */
  driver_standings: Array<Driver_Standings>;
  /** An aggregate relationship */
  driver_standings_aggregate: Driver_Standings_Aggregate;
  ergast_id?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  full_name?: Maybe<Scalars['String']['output']>;
  headshot_url?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  last_name?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** columns and relationships of "drivers" */
export type DriversDriver_SessionsArgs = {
  distinct_on?: InputMaybe<Array<Driver_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Sessions_Order_By>>;
  where?: InputMaybe<Driver_Sessions_Bool_Exp>;
};

/** columns and relationships of "drivers" */
export type DriversDriver_Sessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Driver_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Sessions_Order_By>>;
  where?: InputMaybe<Driver_Sessions_Bool_Exp>;
};

/** columns and relationships of "drivers" */
export type DriversDriver_StandingsArgs = {
  distinct_on?: InputMaybe<Array<Driver_Standings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Standings_Order_By>>;
  where?: InputMaybe<Driver_Standings_Bool_Exp>;
};

/** columns and relationships of "drivers" */
export type DriversDriver_Standings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Driver_Standings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Standings_Order_By>>;
  where?: InputMaybe<Driver_Standings_Bool_Exp>;
};

/** aggregated selection of "drivers" */
export type Drivers_Aggregate = {
  __typename?: 'drivers_aggregate';
  aggregate?: Maybe<Drivers_Aggregate_Fields>;
  nodes: Array<Drivers>;
};

/** aggregate fields of "drivers" */
export type Drivers_Aggregate_Fields = {
  __typename?: 'drivers_aggregate_fields';
  avg?: Maybe<Drivers_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Drivers_Max_Fields>;
  min?: Maybe<Drivers_Min_Fields>;
  stddev?: Maybe<Drivers_Stddev_Fields>;
  stddev_pop?: Maybe<Drivers_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Drivers_Stddev_Samp_Fields>;
  sum?: Maybe<Drivers_Sum_Fields>;
  var_pop?: Maybe<Drivers_Var_Pop_Fields>;
  var_samp?: Maybe<Drivers_Var_Samp_Fields>;
  variance?: Maybe<Drivers_Variance_Fields>;
};

/** aggregate fields of "drivers" */
export type Drivers_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Drivers_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Drivers_Avg_Fields = {
  __typename?: 'drivers_avg_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "drivers". All fields are combined with a logical 'AND'. */
export type Drivers_Bool_Exp = {
  _and?: InputMaybe<Array<Drivers_Bool_Exp>>;
  _not?: InputMaybe<Drivers_Bool_Exp>;
  _or?: InputMaybe<Array<Drivers_Bool_Exp>>;
  abbreviation?: InputMaybe<String_Comparison_Exp>;
  broadcast_name?: InputMaybe<String_Comparison_Exp>;
  country_code?: InputMaybe<String_Comparison_Exp>;
  date_of_birth?: InputMaybe<String_Comparison_Exp>;
  driver_sessions?: InputMaybe<Driver_Sessions_Bool_Exp>;
  driver_sessions_aggregate?: InputMaybe<Driver_Sessions_Aggregate_Bool_Exp>;
  driver_standings?: InputMaybe<Driver_Standings_Bool_Exp>;
  driver_standings_aggregate?: InputMaybe<Driver_Standings_Aggregate_Bool_Exp>;
  ergast_id?: InputMaybe<String_Comparison_Exp>;
  first_name?: InputMaybe<String_Comparison_Exp>;
  full_name?: InputMaybe<String_Comparison_Exp>;
  headshot_url?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_name?: InputMaybe<String_Comparison_Exp>;
  nationality?: InputMaybe<String_Comparison_Exp>;
  number?: InputMaybe<String_Comparison_Exp>;
  year?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "drivers" */
export enum Drivers_Constraint {
  /** unique or primary key constraint on columns "full_name", "year" */
  DriversFullNameYearUnique = 'drivers_full_name_year_unique',
  /** unique or primary key constraint on columns "id" */
  DriversPkey = 'drivers_pkey',
}

/** input type for incrementing numeric columns in table "drivers" */
export type Drivers_Inc_Input = {
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "drivers" */
export type Drivers_Insert_Input = {
  abbreviation?: InputMaybe<Scalars['String']['input']>;
  broadcast_name?: InputMaybe<Scalars['String']['input']>;
  country_code?: InputMaybe<Scalars['String']['input']>;
  date_of_birth?: InputMaybe<Scalars['String']['input']>;
  driver_sessions?: InputMaybe<Driver_Sessions_Arr_Rel_Insert_Input>;
  driver_standings?: InputMaybe<Driver_Standings_Arr_Rel_Insert_Input>;
  ergast_id?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  headshot_url?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Drivers_Max_Fields = {
  __typename?: 'drivers_max_fields';
  abbreviation?: Maybe<Scalars['String']['output']>;
  broadcast_name?: Maybe<Scalars['String']['output']>;
  country_code?: Maybe<Scalars['String']['output']>;
  date_of_birth?: Maybe<Scalars['String']['output']>;
  ergast_id?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  full_name?: Maybe<Scalars['String']['output']>;
  headshot_url?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Drivers_Min_Fields = {
  __typename?: 'drivers_min_fields';
  abbreviation?: Maybe<Scalars['String']['output']>;
  broadcast_name?: Maybe<Scalars['String']['output']>;
  country_code?: Maybe<Scalars['String']['output']>;
  date_of_birth?: Maybe<Scalars['String']['output']>;
  ergast_id?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  full_name?: Maybe<Scalars['String']['output']>;
  headshot_url?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** response of any mutation on the table "drivers" */
export type Drivers_Mutation_Response = {
  __typename?: 'drivers_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Drivers>;
};

/** input type for inserting object relation for remote table "drivers" */
export type Drivers_Obj_Rel_Insert_Input = {
  data: Drivers_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Drivers_On_Conflict>;
};

/** on_conflict condition type for table "drivers" */
export type Drivers_On_Conflict = {
  constraint: Drivers_Constraint;
  update_columns?: Array<Drivers_Update_Column>;
  where?: InputMaybe<Drivers_Bool_Exp>;
};

/** Ordering options when selecting data from "drivers". */
export type Drivers_Order_By = {
  abbreviation?: InputMaybe<Order_By>;
  broadcast_name?: InputMaybe<Order_By>;
  country_code?: InputMaybe<Order_By>;
  date_of_birth?: InputMaybe<Order_By>;
  driver_sessions_aggregate?: InputMaybe<Driver_Sessions_Aggregate_Order_By>;
  driver_standings_aggregate?: InputMaybe<Driver_Standings_Aggregate_Order_By>;
  ergast_id?: InputMaybe<Order_By>;
  first_name?: InputMaybe<Order_By>;
  full_name?: InputMaybe<Order_By>;
  headshot_url?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_name?: InputMaybe<Order_By>;
  nationality?: InputMaybe<Order_By>;
  number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** primary key columns input for table: drivers */
export type Drivers_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "drivers" */
export enum Drivers_Select_Column {
  /** column name */
  Abbreviation = 'abbreviation',
  /** column name */
  BroadcastName = 'broadcast_name',
  /** column name */
  CountryCode = 'country_code',
  /** column name */
  DateOfBirth = 'date_of_birth',
  /** column name */
  ErgastId = 'ergast_id',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  FullName = 'full_name',
  /** column name */
  HeadshotUrl = 'headshot_url',
  /** column name */
  Id = 'id',
  /** column name */
  LastName = 'last_name',
  /** column name */
  Nationality = 'nationality',
  /** column name */
  Number = 'number',
  /** column name */
  Year = 'year',
}

/** input type for updating data in table "drivers" */
export type Drivers_Set_Input = {
  abbreviation?: InputMaybe<Scalars['String']['input']>;
  broadcast_name?: InputMaybe<Scalars['String']['input']>;
  country_code?: InputMaybe<Scalars['String']['input']>;
  date_of_birth?: InputMaybe<Scalars['String']['input']>;
  ergast_id?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  headshot_url?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Drivers_Stddev_Fields = {
  __typename?: 'drivers_stddev_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Drivers_Stddev_Pop_Fields = {
  __typename?: 'drivers_stddev_pop_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Drivers_Stddev_Samp_Fields = {
  __typename?: 'drivers_stddev_samp_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "drivers" */
export type Drivers_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Drivers_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Drivers_Stream_Cursor_Value_Input = {
  abbreviation?: InputMaybe<Scalars['String']['input']>;
  broadcast_name?: InputMaybe<Scalars['String']['input']>;
  country_code?: InputMaybe<Scalars['String']['input']>;
  date_of_birth?: InputMaybe<Scalars['String']['input']>;
  ergast_id?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  headshot_url?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Drivers_Sum_Fields = {
  __typename?: 'drivers_sum_fields';
  year?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "drivers" */
export enum Drivers_Update_Column {
  /** column name */
  Abbreviation = 'abbreviation',
  /** column name */
  BroadcastName = 'broadcast_name',
  /** column name */
  CountryCode = 'country_code',
  /** column name */
  DateOfBirth = 'date_of_birth',
  /** column name */
  ErgastId = 'ergast_id',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  FullName = 'full_name',
  /** column name */
  HeadshotUrl = 'headshot_url',
  /** column name */
  Id = 'id',
  /** column name */
  LastName = 'last_name',
  /** column name */
  Nationality = 'nationality',
  /** column name */
  Number = 'number',
  /** column name */
  Year = 'year',
}

export type Drivers_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Drivers_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Drivers_Set_Input>;
  /** filter the rows which have to be updated */
  where: Drivers_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Drivers_Var_Pop_Fields = {
  __typename?: 'drivers_var_pop_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Drivers_Var_Samp_Fields = {
  __typename?: 'drivers_var_samp_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Drivers_Variance_Fields = {
  __typename?: 'drivers_variance_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "event_format_choices" */
export type Event_Format_Choices = {
  __typename?: 'event_format_choices';
  comment?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  events: Array<Events>;
  /** An aggregate relationship */
  events_aggregate: Events_Aggregate;
  /** An array relationship */
  schedules: Array<Schedule>;
  /** An aggregate relationship */
  schedules_aggregate: Schedule_Aggregate;
  value: Scalars['String']['output'];
};

/** columns and relationships of "event_format_choices" */
export type Event_Format_ChoicesEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};

/** columns and relationships of "event_format_choices" */
export type Event_Format_ChoicesEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};

/** columns and relationships of "event_format_choices" */
export type Event_Format_ChoicesSchedulesArgs = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

/** columns and relationships of "event_format_choices" */
export type Event_Format_ChoicesSchedules_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

/** aggregated selection of "event_format_choices" */
export type Event_Format_Choices_Aggregate = {
  __typename?: 'event_format_choices_aggregate';
  aggregate?: Maybe<Event_Format_Choices_Aggregate_Fields>;
  nodes: Array<Event_Format_Choices>;
};

/** aggregate fields of "event_format_choices" */
export type Event_Format_Choices_Aggregate_Fields = {
  __typename?: 'event_format_choices_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Event_Format_Choices_Max_Fields>;
  min?: Maybe<Event_Format_Choices_Min_Fields>;
};

/** aggregate fields of "event_format_choices" */
export type Event_Format_Choices_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Event_Format_Choices_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "event_format_choices". All fields are combined with a logical 'AND'. */
export type Event_Format_Choices_Bool_Exp = {
  _and?: InputMaybe<Array<Event_Format_Choices_Bool_Exp>>;
  _not?: InputMaybe<Event_Format_Choices_Bool_Exp>;
  _or?: InputMaybe<Array<Event_Format_Choices_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  events?: InputMaybe<Events_Bool_Exp>;
  events_aggregate?: InputMaybe<Events_Aggregate_Bool_Exp>;
  schedules?: InputMaybe<Schedule_Bool_Exp>;
  schedules_aggregate?: InputMaybe<Schedule_Aggregate_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "event_format_choices" */
export enum Event_Format_Choices_Constraint {
  /** unique or primary key constraint on columns "value" */
  EventFormatChoicesPkey = 'event_format_choices_pkey',
}

export enum Event_Format_Choices_Enum {
  /** Practice 1, Practice 2, Practice 3, Qualifying, Race */
  Conventional = 'conventional',
  /** Practice 1, Qualifying, Practice 2, Sprint, Race */
  Sprint = 'sprint',
  /** Practice 1, Sprint Qualifying, Sprint, Qualifying, Race */
  SprintQualifying = 'sprint_qualifying',
  /** Practice 1, Qualifying, Sprint Shootout, Sprint, Race */
  SprintShootout = 'sprint_shootout',
  /** no fixed session order; mostly Practice sessions */
  Testing = 'testing',
}

/** Boolean expression to compare columns of type "event_format_choices_enum". All fields are combined with logical 'AND'. */
export type Event_Format_Choices_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Event_Format_Choices_Enum>;
  _in?: InputMaybe<Array<Event_Format_Choices_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Event_Format_Choices_Enum>;
  _nin?: InputMaybe<Array<Event_Format_Choices_Enum>>;
};

/** input type for inserting data into table "event_format_choices" */
export type Event_Format_Choices_Insert_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  events?: InputMaybe<Events_Arr_Rel_Insert_Input>;
  schedules?: InputMaybe<Schedule_Arr_Rel_Insert_Input>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Event_Format_Choices_Max_Fields = {
  __typename?: 'event_format_choices_max_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Event_Format_Choices_Min_Fields = {
  __typename?: 'event_format_choices_min_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "event_format_choices" */
export type Event_Format_Choices_Mutation_Response = {
  __typename?: 'event_format_choices_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Event_Format_Choices>;
};

/** input type for inserting object relation for remote table "event_format_choices" */
export type Event_Format_Choices_Obj_Rel_Insert_Input = {
  data: Event_Format_Choices_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Event_Format_Choices_On_Conflict>;
};

/** on_conflict condition type for table "event_format_choices" */
export type Event_Format_Choices_On_Conflict = {
  constraint: Event_Format_Choices_Constraint;
  update_columns?: Array<Event_Format_Choices_Update_Column>;
  where?: InputMaybe<Event_Format_Choices_Bool_Exp>;
};

/** Ordering options when selecting data from "event_format_choices". */
export type Event_Format_Choices_Order_By = {
  comment?: InputMaybe<Order_By>;
  events_aggregate?: InputMaybe<Events_Aggregate_Order_By>;
  schedules_aggregate?: InputMaybe<Schedule_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: event_format_choices */
export type Event_Format_Choices_Pk_Columns_Input = {
  value: Scalars['String']['input'];
};

/** select columns of table "event_format_choices" */
export enum Event_Format_Choices_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value',
}

/** input type for updating data in table "event_format_choices" */
export type Event_Format_Choices_Set_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "event_format_choices" */
export type Event_Format_Choices_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Event_Format_Choices_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Event_Format_Choices_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "event_format_choices" */
export enum Event_Format_Choices_Update_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value',
}

export type Event_Format_Choices_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Event_Format_Choices_Set_Input>;
  /** filter the rows which have to be updated */
  where: Event_Format_Choices_Bool_Exp;
};

/** columns and relationships of "events" */
export type Events = {
  __typename?: 'events';
  country?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  event_format_choice?: Maybe<Event_Format_Choices>;
  f1_api_support?: Maybe<Scalars['Boolean']['output']>;
  format?: Maybe<Event_Format_Choices_Enum>;
  id: Scalars['String']['output'];
  location?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  official_name?: Maybe<Scalars['String']['output']>;
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Int']['output']>;
  /** An array relationship */
  sessions: Array<Sessions>;
  /** An aggregate relationship */
  sessions_aggregate: Sessions_Aggregate;
  year?: Maybe<Scalars['Int']['output']>;
};

/** columns and relationships of "events" */
export type EventsSessionsArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

/** columns and relationships of "events" */
export type EventsSessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

/** aggregated selection of "events" */
export type Events_Aggregate = {
  __typename?: 'events_aggregate';
  aggregate?: Maybe<Events_Aggregate_Fields>;
  nodes: Array<Events>;
};

export type Events_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Events_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Events_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Events_Aggregate_Bool_Exp_Count>;
};

export type Events_Aggregate_Bool_Exp_Bool_And = {
  arguments: Events_Select_Column_Events_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Events_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Events_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Events_Select_Column_Events_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Events_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Events_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Events_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Events_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "events" */
export type Events_Aggregate_Fields = {
  __typename?: 'events_aggregate_fields';
  avg?: Maybe<Events_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Events_Max_Fields>;
  min?: Maybe<Events_Min_Fields>;
  stddev?: Maybe<Events_Stddev_Fields>;
  stddev_pop?: Maybe<Events_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Events_Stddev_Samp_Fields>;
  sum?: Maybe<Events_Sum_Fields>;
  var_pop?: Maybe<Events_Var_Pop_Fields>;
  var_samp?: Maybe<Events_Var_Samp_Fields>;
  variance?: Maybe<Events_Variance_Fields>;
};

/** aggregate fields of "events" */
export type Events_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Events_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "events" */
export type Events_Aggregate_Order_By = {
  avg?: InputMaybe<Events_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Events_Max_Order_By>;
  min?: InputMaybe<Events_Min_Order_By>;
  stddev?: InputMaybe<Events_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Events_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Events_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Events_Sum_Order_By>;
  var_pop?: InputMaybe<Events_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Events_Var_Samp_Order_By>;
  variance?: InputMaybe<Events_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "events" */
export type Events_Arr_Rel_Insert_Input = {
  data: Array<Events_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Events_On_Conflict>;
};

/** aggregate avg on columns */
export type Events_Avg_Fields = {
  __typename?: 'events_avg_fields';
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "events" */
export type Events_Avg_Order_By = {
  /** All test sessions = 0 */
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "events". All fields are combined with a logical 'AND'. */
export type Events_Bool_Exp = {
  _and?: InputMaybe<Array<Events_Bool_Exp>>;
  _not?: InputMaybe<Events_Bool_Exp>;
  _or?: InputMaybe<Array<Events_Bool_Exp>>;
  country?: InputMaybe<String_Comparison_Exp>;
  date?: InputMaybe<String_Comparison_Exp>;
  event_format_choice?: InputMaybe<Event_Format_Choices_Bool_Exp>;
  f1_api_support?: InputMaybe<Boolean_Comparison_Exp>;
  format?: InputMaybe<Event_Format_Choices_Enum_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  location?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  official_name?: InputMaybe<String_Comparison_Exp>;
  round_number?: InputMaybe<Int_Comparison_Exp>;
  sessions?: InputMaybe<Sessions_Bool_Exp>;
  sessions_aggregate?: InputMaybe<Sessions_Aggregate_Bool_Exp>;
  year?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "events" */
export enum Events_Constraint {
  /** unique or primary key constraint on columns "id" */
  EventsPkey = 'events_pkey',
}

/** input type for incrementing numeric columns in table "events" */
export type Events_Inc_Input = {
  /** All test sessions = 0 */
  round_number?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "events" */
export type Events_Insert_Input = {
  country?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  event_format_choice?: InputMaybe<Event_Format_Choices_Obj_Rel_Insert_Input>;
  f1_api_support?: InputMaybe<Scalars['Boolean']['input']>;
  format?: InputMaybe<Event_Format_Choices_Enum>;
  id?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  official_name?: InputMaybe<Scalars['String']['input']>;
  /** All test sessions = 0 */
  round_number?: InputMaybe<Scalars['Int']['input']>;
  sessions?: InputMaybe<Sessions_Arr_Rel_Insert_Input>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Events_Max_Fields = {
  __typename?: 'events_max_fields';
  country?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  official_name?: Maybe<Scalars['String']['output']>;
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "events" */
export type Events_Max_Order_By = {
  country?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  official_name?: InputMaybe<Order_By>;
  /** All test sessions = 0 */
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Events_Min_Fields = {
  __typename?: 'events_min_fields';
  country?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  official_name?: Maybe<Scalars['String']['output']>;
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "events" */
export type Events_Min_Order_By = {
  country?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  official_name?: InputMaybe<Order_By>;
  /** All test sessions = 0 */
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "events" */
export type Events_Mutation_Response = {
  __typename?: 'events_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Events>;
};

/** input type for inserting object relation for remote table "events" */
export type Events_Obj_Rel_Insert_Input = {
  data: Events_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Events_On_Conflict>;
};

/** on_conflict condition type for table "events" */
export type Events_On_Conflict = {
  constraint: Events_Constraint;
  update_columns?: Array<Events_Update_Column>;
  where?: InputMaybe<Events_Bool_Exp>;
};

/** Ordering options when selecting data from "events". */
export type Events_Order_By = {
  country?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  event_format_choice?: InputMaybe<Event_Format_Choices_Order_By>;
  f1_api_support?: InputMaybe<Order_By>;
  format?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  official_name?: InputMaybe<Order_By>;
  round_number?: InputMaybe<Order_By>;
  sessions_aggregate?: InputMaybe<Sessions_Aggregate_Order_By>;
  year?: InputMaybe<Order_By>;
};

/** primary key columns input for table: events */
export type Events_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "events" */
export enum Events_Select_Column {
  /** column name */
  Country = 'country',
  /** column name */
  Date = 'date',
  /** column name */
  F1ApiSupport = 'f1_api_support',
  /** column name */
  Format = 'format',
  /** column name */
  Id = 'id',
  /** column name */
  Location = 'location',
  /** column name */
  Name = 'name',
  /** column name */
  OfficialName = 'official_name',
  /** column name */
  RoundNumber = 'round_number',
  /** column name */
  Year = 'year',
}

/** select "events_aggregate_bool_exp_bool_and_arguments_columns" columns of table "events" */
export enum Events_Select_Column_Events_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  F1ApiSupport = 'f1_api_support',
}

/** select "events_aggregate_bool_exp_bool_or_arguments_columns" columns of table "events" */
export enum Events_Select_Column_Events_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  F1ApiSupport = 'f1_api_support',
}

/** input type for updating data in table "events" */
export type Events_Set_Input = {
  country?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  f1_api_support?: InputMaybe<Scalars['Boolean']['input']>;
  format?: InputMaybe<Event_Format_Choices_Enum>;
  id?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  official_name?: InputMaybe<Scalars['String']['input']>;
  /** All test sessions = 0 */
  round_number?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Events_Stddev_Fields = {
  __typename?: 'events_stddev_fields';
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "events" */
export type Events_Stddev_Order_By = {
  /** All test sessions = 0 */
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Events_Stddev_Pop_Fields = {
  __typename?: 'events_stddev_pop_fields';
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "events" */
export type Events_Stddev_Pop_Order_By = {
  /** All test sessions = 0 */
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Events_Stddev_Samp_Fields = {
  __typename?: 'events_stddev_samp_fields';
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "events" */
export type Events_Stddev_Samp_Order_By = {
  /** All test sessions = 0 */
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "events" */
export type Events_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Events_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Events_Stream_Cursor_Value_Input = {
  country?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  f1_api_support?: InputMaybe<Scalars['Boolean']['input']>;
  format?: InputMaybe<Event_Format_Choices_Enum>;
  id?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  official_name?: InputMaybe<Scalars['String']['input']>;
  /** All test sessions = 0 */
  round_number?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Events_Sum_Fields = {
  __typename?: 'events_sum_fields';
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "events" */
export type Events_Sum_Order_By = {
  /** All test sessions = 0 */
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** update columns of table "events" */
export enum Events_Update_Column {
  /** column name */
  Country = 'country',
  /** column name */
  Date = 'date',
  /** column name */
  F1ApiSupport = 'f1_api_support',
  /** column name */
  Format = 'format',
  /** column name */
  Id = 'id',
  /** column name */
  Location = 'location',
  /** column name */
  Name = 'name',
  /** column name */
  OfficialName = 'official_name',
  /** column name */
  RoundNumber = 'round_number',
  /** column name */
  Year = 'year',
}

export type Events_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Events_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Events_Set_Input>;
  /** filter the rows which have to be updated */
  where: Events_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Events_Var_Pop_Fields = {
  __typename?: 'events_var_pop_fields';
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "events" */
export type Events_Var_Pop_Order_By = {
  /** All test sessions = 0 */
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Events_Var_Samp_Fields = {
  __typename?: 'events_var_samp_fields';
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "events" */
export type Events_Var_Samp_Order_By = {
  /** All test sessions = 0 */
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Events_Variance_Fields = {
  __typename?: 'events_variance_fields';
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "events" */
export type Events_Variance_Order_By = {
  /** All test sessions = 0 */
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** columns and relationships of "fia_documents" */
export type Fia_Documents = {
  __typename?: 'fia_documents';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  downloaded?: Maybe<Scalars['Boolean']['output']>;
  event_name?: Maybe<Scalars['String']['output']>;
  file_path?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  publish_time?: Maybe<Scalars['timestamptz']['output']>;
  title: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  year: Scalars['Int']['output'];
};

/** aggregated selection of "fia_documents" */
export type Fia_Documents_Aggregate = {
  __typename?: 'fia_documents_aggregate';
  aggregate?: Maybe<Fia_Documents_Aggregate_Fields>;
  nodes: Array<Fia_Documents>;
};

/** aggregate fields of "fia_documents" */
export type Fia_Documents_Aggregate_Fields = {
  __typename?: 'fia_documents_aggregate_fields';
  avg?: Maybe<Fia_Documents_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Fia_Documents_Max_Fields>;
  min?: Maybe<Fia_Documents_Min_Fields>;
  stddev?: Maybe<Fia_Documents_Stddev_Fields>;
  stddev_pop?: Maybe<Fia_Documents_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Fia_Documents_Stddev_Samp_Fields>;
  sum?: Maybe<Fia_Documents_Sum_Fields>;
  var_pop?: Maybe<Fia_Documents_Var_Pop_Fields>;
  var_samp?: Maybe<Fia_Documents_Var_Samp_Fields>;
  variance?: Maybe<Fia_Documents_Variance_Fields>;
};

/** aggregate fields of "fia_documents" */
export type Fia_Documents_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Fia_Documents_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Fia_Documents_Avg_Fields = {
  __typename?: 'fia_documents_avg_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "fia_documents". All fields are combined with a logical 'AND'. */
export type Fia_Documents_Bool_Exp = {
  _and?: InputMaybe<Array<Fia_Documents_Bool_Exp>>;
  _not?: InputMaybe<Fia_Documents_Bool_Exp>;
  _or?: InputMaybe<Array<Fia_Documents_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  downloaded?: InputMaybe<Boolean_Comparison_Exp>;
  event_name?: InputMaybe<String_Comparison_Exp>;
  file_path?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  publish_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  url?: InputMaybe<String_Comparison_Exp>;
  year?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "fia_documents" */
export enum Fia_Documents_Constraint {
  /** unique or primary key constraint on columns "id" */
  FiaDocumentsPkey = 'fia_documents_pkey',
}

/** input type for incrementing numeric columns in table "fia_documents" */
export type Fia_Documents_Inc_Input = {
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "fia_documents" */
export type Fia_Documents_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  downloaded?: InputMaybe<Scalars['Boolean']['input']>;
  event_name?: InputMaybe<Scalars['String']['input']>;
  file_path?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  publish_time?: InputMaybe<Scalars['timestamptz']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Fia_Documents_Max_Fields = {
  __typename?: 'fia_documents_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  event_name?: Maybe<Scalars['String']['output']>;
  file_path?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  publish_time?: Maybe<Scalars['timestamptz']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Fia_Documents_Min_Fields = {
  __typename?: 'fia_documents_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  event_name?: Maybe<Scalars['String']['output']>;
  file_path?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  publish_time?: Maybe<Scalars['timestamptz']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** response of any mutation on the table "fia_documents" */
export type Fia_Documents_Mutation_Response = {
  __typename?: 'fia_documents_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Fia_Documents>;
};

/** on_conflict condition type for table "fia_documents" */
export type Fia_Documents_On_Conflict = {
  constraint: Fia_Documents_Constraint;
  update_columns?: Array<Fia_Documents_Update_Column>;
  where?: InputMaybe<Fia_Documents_Bool_Exp>;
};

/** Ordering options when selecting data from "fia_documents". */
export type Fia_Documents_Order_By = {
  created_at?: InputMaybe<Order_By>;
  downloaded?: InputMaybe<Order_By>;
  event_name?: InputMaybe<Order_By>;
  file_path?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  publish_time?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** primary key columns input for table: fia_documents */
export type Fia_Documents_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "fia_documents" */
export enum Fia_Documents_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Downloaded = 'downloaded',
  /** column name */
  EventName = 'event_name',
  /** column name */
  FilePath = 'file_path',
  /** column name */
  Id = 'id',
  /** column name */
  PublishTime = 'publish_time',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Url = 'url',
  /** column name */
  Year = 'year',
}

/** input type for updating data in table "fia_documents" */
export type Fia_Documents_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  downloaded?: InputMaybe<Scalars['Boolean']['input']>;
  event_name?: InputMaybe<Scalars['String']['input']>;
  file_path?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  publish_time?: InputMaybe<Scalars['timestamptz']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Fia_Documents_Stddev_Fields = {
  __typename?: 'fia_documents_stddev_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Fia_Documents_Stddev_Pop_Fields = {
  __typename?: 'fia_documents_stddev_pop_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Fia_Documents_Stddev_Samp_Fields = {
  __typename?: 'fia_documents_stddev_samp_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "fia_documents" */
export type Fia_Documents_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Fia_Documents_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Fia_Documents_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  downloaded?: InputMaybe<Scalars['Boolean']['input']>;
  event_name?: InputMaybe<Scalars['String']['input']>;
  file_path?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  publish_time?: InputMaybe<Scalars['timestamptz']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Fia_Documents_Sum_Fields = {
  __typename?: 'fia_documents_sum_fields';
  year?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "fia_documents" */
export enum Fia_Documents_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Downloaded = 'downloaded',
  /** column name */
  EventName = 'event_name',
  /** column name */
  FilePath = 'file_path',
  /** column name */
  Id = 'id',
  /** column name */
  PublishTime = 'publish_time',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Url = 'url',
  /** column name */
  Year = 'year',
}

export type Fia_Documents_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Fia_Documents_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Fia_Documents_Set_Input>;
  /** filter the rows which have to be updated */
  where: Fia_Documents_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Fia_Documents_Var_Pop_Fields = {
  __typename?: 'fia_documents_var_pop_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Fia_Documents_Var_Samp_Fields = {
  __typename?: 'fia_documents_var_samp_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Fia_Documents_Variance_Fields = {
  __typename?: 'fia_documents_variance_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** columns and relationships of "laps" */
export type Laps = {
  __typename?: 'laps';
  compound?: Maybe<Tyre_Compounds_Enum>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deleted_reason?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  driver_session?: Maybe<Driver_Sessions>;
  driver_session_id?: Maybe<Scalars['String']['output']>;
  fastf1_generated?: Maybe<Scalars['Boolean']['output']>;
  fresh_tyre?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
  is_accurate?: Maybe<Scalars['Boolean']['output']>;
  is_personal_best?: Maybe<Scalars['Boolean']['output']>;
  lap_number?: Maybe<Scalars['Int']['output']>;
  lap_start_date?: Maybe<Scalars['String']['output']>;
  lap_start_time?: Maybe<Scalars['bigint']['output']>;
  lap_time?: Maybe<Scalars['bigint']['output']>;
  pitin_time?: Maybe<Scalars['bigint']['output']>;
  pitout_time?: Maybe<Scalars['bigint']['output']>;
  position?: Maybe<Scalars['numeric']['output']>;
  sector1?: Maybe<Scalars['bigint']['output']>;
  sector1_ts?: Maybe<Scalars['bigint']['output']>;
  sector2?: Maybe<Scalars['bigint']['output']>;
  sector2_ts?: Maybe<Scalars['bigint']['output']>;
  sector3?: Maybe<Scalars['bigint']['output']>;
  sector3_ts?: Maybe<Scalars['bigint']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  speed_trap_fastest_lap?: Maybe<Scalars['numeric']['output']>;
  speed_trap_sector1?: Maybe<Scalars['numeric']['output']>;
  speed_trap_sector2?: Maybe<Scalars['numeric']['output']>;
  speed_trap_straight?: Maybe<Scalars['numeric']['output']>;
  stint?: Maybe<Scalars['Int']['output']>;
  track_status?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  tyre_compound?: Maybe<Tyre_Compounds>;
  tyre_life?: Maybe<Scalars['Int']['output']>;
};

/** aggregated selection of "laps" */
export type Laps_Aggregate = {
  __typename?: 'laps_aggregate';
  aggregate?: Maybe<Laps_Aggregate_Fields>;
  nodes: Array<Laps>;
};

export type Laps_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Laps_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Laps_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Laps_Aggregate_Bool_Exp_Count>;
};

export type Laps_Aggregate_Bool_Exp_Bool_And = {
  arguments: Laps_Select_Column_Laps_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Laps_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Laps_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Laps_Select_Column_Laps_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Laps_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Laps_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Laps_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Laps_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "laps" */
export type Laps_Aggregate_Fields = {
  __typename?: 'laps_aggregate_fields';
  avg?: Maybe<Laps_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Laps_Max_Fields>;
  min?: Maybe<Laps_Min_Fields>;
  stddev?: Maybe<Laps_Stddev_Fields>;
  stddev_pop?: Maybe<Laps_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Laps_Stddev_Samp_Fields>;
  sum?: Maybe<Laps_Sum_Fields>;
  var_pop?: Maybe<Laps_Var_Pop_Fields>;
  var_samp?: Maybe<Laps_Var_Samp_Fields>;
  variance?: Maybe<Laps_Variance_Fields>;
};

/** aggregate fields of "laps" */
export type Laps_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Laps_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "laps" */
export type Laps_Aggregate_Order_By = {
  avg?: InputMaybe<Laps_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Laps_Max_Order_By>;
  min?: InputMaybe<Laps_Min_Order_By>;
  stddev?: InputMaybe<Laps_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Laps_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Laps_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Laps_Sum_Order_By>;
  var_pop?: InputMaybe<Laps_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Laps_Var_Samp_Order_By>;
  variance?: InputMaybe<Laps_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "laps" */
export type Laps_Arr_Rel_Insert_Input = {
  data: Array<Laps_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Laps_On_Conflict>;
};

/** aggregate avg on columns */
export type Laps_Avg_Fields = {
  __typename?: 'laps_avg_fields';
  lap_number?: Maybe<Scalars['Float']['output']>;
  lap_start_time?: Maybe<Scalars['Float']['output']>;
  lap_time?: Maybe<Scalars['Float']['output']>;
  pitin_time?: Maybe<Scalars['Float']['output']>;
  pitout_time?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  sector1?: Maybe<Scalars['Float']['output']>;
  sector1_ts?: Maybe<Scalars['Float']['output']>;
  sector2?: Maybe<Scalars['Float']['output']>;
  sector2_ts?: Maybe<Scalars['Float']['output']>;
  sector3?: Maybe<Scalars['Float']['output']>;
  sector3_ts?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed_trap_fastest_lap?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector1?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector2?: Maybe<Scalars['Float']['output']>;
  speed_trap_straight?: Maybe<Scalars['Float']['output']>;
  stint?: Maybe<Scalars['Float']['output']>;
  tyre_life?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "laps" */
export type Laps_Avg_Order_By = {
  lap_number?: InputMaybe<Order_By>;
  lap_start_time?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  sector1?: InputMaybe<Order_By>;
  sector1_ts?: InputMaybe<Order_By>;
  sector2?: InputMaybe<Order_By>;
  sector2_ts?: InputMaybe<Order_By>;
  sector3?: InputMaybe<Order_By>;
  sector3_ts?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed_trap_fastest_lap?: InputMaybe<Order_By>;
  speed_trap_sector1?: InputMaybe<Order_By>;
  speed_trap_sector2?: InputMaybe<Order_By>;
  speed_trap_straight?: InputMaybe<Order_By>;
  stint?: InputMaybe<Order_By>;
  tyre_life?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "laps". All fields are combined with a logical 'AND'. */
export type Laps_Bool_Exp = {
  _and?: InputMaybe<Array<Laps_Bool_Exp>>;
  _not?: InputMaybe<Laps_Bool_Exp>;
  _or?: InputMaybe<Array<Laps_Bool_Exp>>;
  compound?: InputMaybe<Tyre_Compounds_Enum_Comparison_Exp>;
  deleted?: InputMaybe<Boolean_Comparison_Exp>;
  deleted_reason?: InputMaybe<String_Comparison_Exp>;
  driver_session?: InputMaybe<Driver_Sessions_Bool_Exp>;
  driver_session_id?: InputMaybe<String_Comparison_Exp>;
  fastf1_generated?: InputMaybe<Boolean_Comparison_Exp>;
  fresh_tyre?: InputMaybe<Boolean_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  is_accurate?: InputMaybe<Boolean_Comparison_Exp>;
  is_personal_best?: InputMaybe<Boolean_Comparison_Exp>;
  lap_number?: InputMaybe<Int_Comparison_Exp>;
  lap_start_date?: InputMaybe<String_Comparison_Exp>;
  lap_start_time?: InputMaybe<Bigint_Comparison_Exp>;
  lap_time?: InputMaybe<Bigint_Comparison_Exp>;
  pitin_time?: InputMaybe<Bigint_Comparison_Exp>;
  pitout_time?: InputMaybe<Bigint_Comparison_Exp>;
  position?: InputMaybe<Numeric_Comparison_Exp>;
  sector1?: InputMaybe<Bigint_Comparison_Exp>;
  sector1_ts?: InputMaybe<Bigint_Comparison_Exp>;
  sector2?: InputMaybe<Bigint_Comparison_Exp>;
  sector2_ts?: InputMaybe<Bigint_Comparison_Exp>;
  sector3?: InputMaybe<Bigint_Comparison_Exp>;
  sector3_ts?: InputMaybe<Bigint_Comparison_Exp>;
  session_time?: InputMaybe<Bigint_Comparison_Exp>;
  speed_trap_fastest_lap?: InputMaybe<Numeric_Comparison_Exp>;
  speed_trap_sector1?: InputMaybe<Numeric_Comparison_Exp>;
  speed_trap_sector2?: InputMaybe<Numeric_Comparison_Exp>;
  speed_trap_straight?: InputMaybe<Numeric_Comparison_Exp>;
  stint?: InputMaybe<Int_Comparison_Exp>;
  track_status?: InputMaybe<String_Comparison_Exp>;
  tyre_compound?: InputMaybe<Tyre_Compounds_Bool_Exp>;
  tyre_life?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "laps" */
export enum Laps_Constraint {
  /** unique or primary key constraint on columns "id" */
  LapsPkey = 'laps_pkey',
}

/** input type for incrementing numeric columns in table "laps" */
export type Laps_Inc_Input = {
  lap_number?: InputMaybe<Scalars['Int']['input']>;
  lap_start_time?: InputMaybe<Scalars['bigint']['input']>;
  lap_time?: InputMaybe<Scalars['bigint']['input']>;
  pitin_time?: InputMaybe<Scalars['bigint']['input']>;
  pitout_time?: InputMaybe<Scalars['bigint']['input']>;
  position?: InputMaybe<Scalars['numeric']['input']>;
  sector1?: InputMaybe<Scalars['bigint']['input']>;
  sector1_ts?: InputMaybe<Scalars['bigint']['input']>;
  sector2?: InputMaybe<Scalars['bigint']['input']>;
  sector2_ts?: InputMaybe<Scalars['bigint']['input']>;
  sector3?: InputMaybe<Scalars['bigint']['input']>;
  sector3_ts?: InputMaybe<Scalars['bigint']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  speed_trap_fastest_lap?: InputMaybe<Scalars['numeric']['input']>;
  speed_trap_sector1?: InputMaybe<Scalars['numeric']['input']>;
  speed_trap_sector2?: InputMaybe<Scalars['numeric']['input']>;
  speed_trap_straight?: InputMaybe<Scalars['numeric']['input']>;
  stint?: InputMaybe<Scalars['Int']['input']>;
  tyre_life?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "laps" */
export type Laps_Insert_Input = {
  compound?: InputMaybe<Tyre_Compounds_Enum>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  deleted_reason?: InputMaybe<Scalars['String']['input']>;
  driver_session?: InputMaybe<Driver_Sessions_Obj_Rel_Insert_Input>;
  driver_session_id?: InputMaybe<Scalars['String']['input']>;
  fastf1_generated?: InputMaybe<Scalars['Boolean']['input']>;
  fresh_tyre?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  is_accurate?: InputMaybe<Scalars['Boolean']['input']>;
  is_personal_best?: InputMaybe<Scalars['Boolean']['input']>;
  lap_number?: InputMaybe<Scalars['Int']['input']>;
  lap_start_date?: InputMaybe<Scalars['String']['input']>;
  lap_start_time?: InputMaybe<Scalars['bigint']['input']>;
  lap_time?: InputMaybe<Scalars['bigint']['input']>;
  pitin_time?: InputMaybe<Scalars['bigint']['input']>;
  pitout_time?: InputMaybe<Scalars['bigint']['input']>;
  position?: InputMaybe<Scalars['numeric']['input']>;
  sector1?: InputMaybe<Scalars['bigint']['input']>;
  sector1_ts?: InputMaybe<Scalars['bigint']['input']>;
  sector2?: InputMaybe<Scalars['bigint']['input']>;
  sector2_ts?: InputMaybe<Scalars['bigint']['input']>;
  sector3?: InputMaybe<Scalars['bigint']['input']>;
  sector3_ts?: InputMaybe<Scalars['bigint']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  speed_trap_fastest_lap?: InputMaybe<Scalars['numeric']['input']>;
  speed_trap_sector1?: InputMaybe<Scalars['numeric']['input']>;
  speed_trap_sector2?: InputMaybe<Scalars['numeric']['input']>;
  speed_trap_straight?: InputMaybe<Scalars['numeric']['input']>;
  stint?: InputMaybe<Scalars['Int']['input']>;
  track_status?: InputMaybe<Scalars['String']['input']>;
  tyre_compound?: InputMaybe<Tyre_Compounds_Obj_Rel_Insert_Input>;
  tyre_life?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Laps_Max_Fields = {
  __typename?: 'laps_max_fields';
  deleted_reason?: Maybe<Scalars['String']['output']>;
  driver_session_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  lap_number?: Maybe<Scalars['Int']['output']>;
  lap_start_date?: Maybe<Scalars['String']['output']>;
  lap_start_time?: Maybe<Scalars['bigint']['output']>;
  lap_time?: Maybe<Scalars['bigint']['output']>;
  pitin_time?: Maybe<Scalars['bigint']['output']>;
  pitout_time?: Maybe<Scalars['bigint']['output']>;
  position?: Maybe<Scalars['numeric']['output']>;
  sector1?: Maybe<Scalars['bigint']['output']>;
  sector1_ts?: Maybe<Scalars['bigint']['output']>;
  sector2?: Maybe<Scalars['bigint']['output']>;
  sector2_ts?: Maybe<Scalars['bigint']['output']>;
  sector3?: Maybe<Scalars['bigint']['output']>;
  sector3_ts?: Maybe<Scalars['bigint']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  speed_trap_fastest_lap?: Maybe<Scalars['numeric']['output']>;
  speed_trap_sector1?: Maybe<Scalars['numeric']['output']>;
  speed_trap_sector2?: Maybe<Scalars['numeric']['output']>;
  speed_trap_straight?: Maybe<Scalars['numeric']['output']>;
  stint?: Maybe<Scalars['Int']['output']>;
  track_status?: Maybe<Scalars['String']['output']>;
  tyre_life?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "laps" */
export type Laps_Max_Order_By = {
  deleted_reason?: InputMaybe<Order_By>;
  driver_session_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lap_number?: InputMaybe<Order_By>;
  lap_start_date?: InputMaybe<Order_By>;
  lap_start_time?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  sector1?: InputMaybe<Order_By>;
  sector1_ts?: InputMaybe<Order_By>;
  sector2?: InputMaybe<Order_By>;
  sector2_ts?: InputMaybe<Order_By>;
  sector3?: InputMaybe<Order_By>;
  sector3_ts?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed_trap_fastest_lap?: InputMaybe<Order_By>;
  speed_trap_sector1?: InputMaybe<Order_By>;
  speed_trap_sector2?: InputMaybe<Order_By>;
  speed_trap_straight?: InputMaybe<Order_By>;
  stint?: InputMaybe<Order_By>;
  track_status?: InputMaybe<Order_By>;
  tyre_life?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Laps_Min_Fields = {
  __typename?: 'laps_min_fields';
  deleted_reason?: Maybe<Scalars['String']['output']>;
  driver_session_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  lap_number?: Maybe<Scalars['Int']['output']>;
  lap_start_date?: Maybe<Scalars['String']['output']>;
  lap_start_time?: Maybe<Scalars['bigint']['output']>;
  lap_time?: Maybe<Scalars['bigint']['output']>;
  pitin_time?: Maybe<Scalars['bigint']['output']>;
  pitout_time?: Maybe<Scalars['bigint']['output']>;
  position?: Maybe<Scalars['numeric']['output']>;
  sector1?: Maybe<Scalars['bigint']['output']>;
  sector1_ts?: Maybe<Scalars['bigint']['output']>;
  sector2?: Maybe<Scalars['bigint']['output']>;
  sector2_ts?: Maybe<Scalars['bigint']['output']>;
  sector3?: Maybe<Scalars['bigint']['output']>;
  sector3_ts?: Maybe<Scalars['bigint']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  speed_trap_fastest_lap?: Maybe<Scalars['numeric']['output']>;
  speed_trap_sector1?: Maybe<Scalars['numeric']['output']>;
  speed_trap_sector2?: Maybe<Scalars['numeric']['output']>;
  speed_trap_straight?: Maybe<Scalars['numeric']['output']>;
  stint?: Maybe<Scalars['Int']['output']>;
  track_status?: Maybe<Scalars['String']['output']>;
  tyre_life?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "laps" */
export type Laps_Min_Order_By = {
  deleted_reason?: InputMaybe<Order_By>;
  driver_session_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lap_number?: InputMaybe<Order_By>;
  lap_start_date?: InputMaybe<Order_By>;
  lap_start_time?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  sector1?: InputMaybe<Order_By>;
  sector1_ts?: InputMaybe<Order_By>;
  sector2?: InputMaybe<Order_By>;
  sector2_ts?: InputMaybe<Order_By>;
  sector3?: InputMaybe<Order_By>;
  sector3_ts?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed_trap_fastest_lap?: InputMaybe<Order_By>;
  speed_trap_sector1?: InputMaybe<Order_By>;
  speed_trap_sector2?: InputMaybe<Order_By>;
  speed_trap_straight?: InputMaybe<Order_By>;
  stint?: InputMaybe<Order_By>;
  track_status?: InputMaybe<Order_By>;
  tyre_life?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "laps" */
export type Laps_Mutation_Response = {
  __typename?: 'laps_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Laps>;
};

/** on_conflict condition type for table "laps" */
export type Laps_On_Conflict = {
  constraint: Laps_Constraint;
  update_columns?: Array<Laps_Update_Column>;
  where?: InputMaybe<Laps_Bool_Exp>;
};

/** Ordering options when selecting data from "laps". */
export type Laps_Order_By = {
  compound?: InputMaybe<Order_By>;
  deleted?: InputMaybe<Order_By>;
  deleted_reason?: InputMaybe<Order_By>;
  driver_session?: InputMaybe<Driver_Sessions_Order_By>;
  driver_session_id?: InputMaybe<Order_By>;
  fastf1_generated?: InputMaybe<Order_By>;
  fresh_tyre?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_accurate?: InputMaybe<Order_By>;
  is_personal_best?: InputMaybe<Order_By>;
  lap_number?: InputMaybe<Order_By>;
  lap_start_date?: InputMaybe<Order_By>;
  lap_start_time?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  sector1?: InputMaybe<Order_By>;
  sector1_ts?: InputMaybe<Order_By>;
  sector2?: InputMaybe<Order_By>;
  sector2_ts?: InputMaybe<Order_By>;
  sector3?: InputMaybe<Order_By>;
  sector3_ts?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed_trap_fastest_lap?: InputMaybe<Order_By>;
  speed_trap_sector1?: InputMaybe<Order_By>;
  speed_trap_sector2?: InputMaybe<Order_By>;
  speed_trap_straight?: InputMaybe<Order_By>;
  stint?: InputMaybe<Order_By>;
  track_status?: InputMaybe<Order_By>;
  tyre_compound?: InputMaybe<Tyre_Compounds_Order_By>;
  tyre_life?: InputMaybe<Order_By>;
};

/** primary key columns input for table: laps */
export type Laps_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "laps" */
export enum Laps_Select_Column {
  /** column name */
  Compound = 'compound',
  /** column name */
  Deleted = 'deleted',
  /** column name */
  DeletedReason = 'deleted_reason',
  /** column name */
  DriverSessionId = 'driver_session_id',
  /** column name */
  Fastf1Generated = 'fastf1_generated',
  /** column name */
  FreshTyre = 'fresh_tyre',
  /** column name */
  Id = 'id',
  /** column name */
  IsAccurate = 'is_accurate',
  /** column name */
  IsPersonalBest = 'is_personal_best',
  /** column name */
  LapNumber = 'lap_number',
  /** column name */
  LapStartDate = 'lap_start_date',
  /** column name */
  LapStartTime = 'lap_start_time',
  /** column name */
  LapTime = 'lap_time',
  /** column name */
  PitinTime = 'pitin_time',
  /** column name */
  PitoutTime = 'pitout_time',
  /** column name */
  Position = 'position',
  /** column name */
  Sector1 = 'sector1',
  /** column name */
  Sector1Ts = 'sector1_ts',
  /** column name */
  Sector2 = 'sector2',
  /** column name */
  Sector2Ts = 'sector2_ts',
  /** column name */
  Sector3 = 'sector3',
  /** column name */
  Sector3Ts = 'sector3_ts',
  /** column name */
  SessionTime = 'session_time',
  /** column name */
  SpeedTrapFastestLap = 'speed_trap_fastest_lap',
  /** column name */
  SpeedTrapSector1 = 'speed_trap_sector1',
  /** column name */
  SpeedTrapSector2 = 'speed_trap_sector2',
  /** column name */
  SpeedTrapStraight = 'speed_trap_straight',
  /** column name */
  Stint = 'stint',
  /** column name */
  TrackStatus = 'track_status',
  /** column name */
  TyreLife = 'tyre_life',
}

/** select "laps_aggregate_bool_exp_bool_and_arguments_columns" columns of table "laps" */
export enum Laps_Select_Column_Laps_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Fastf1Generated = 'fastf1_generated',
  /** column name */
  FreshTyre = 'fresh_tyre',
  /** column name */
  IsAccurate = 'is_accurate',
  /** column name */
  IsPersonalBest = 'is_personal_best',
}

/** select "laps_aggregate_bool_exp_bool_or_arguments_columns" columns of table "laps" */
export enum Laps_Select_Column_Laps_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Fastf1Generated = 'fastf1_generated',
  /** column name */
  FreshTyre = 'fresh_tyre',
  /** column name */
  IsAccurate = 'is_accurate',
  /** column name */
  IsPersonalBest = 'is_personal_best',
}

/** input type for updating data in table "laps" */
export type Laps_Set_Input = {
  compound?: InputMaybe<Tyre_Compounds_Enum>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  deleted_reason?: InputMaybe<Scalars['String']['input']>;
  driver_session_id?: InputMaybe<Scalars['String']['input']>;
  fastf1_generated?: InputMaybe<Scalars['Boolean']['input']>;
  fresh_tyre?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  is_accurate?: InputMaybe<Scalars['Boolean']['input']>;
  is_personal_best?: InputMaybe<Scalars['Boolean']['input']>;
  lap_number?: InputMaybe<Scalars['Int']['input']>;
  lap_start_date?: InputMaybe<Scalars['String']['input']>;
  lap_start_time?: InputMaybe<Scalars['bigint']['input']>;
  lap_time?: InputMaybe<Scalars['bigint']['input']>;
  pitin_time?: InputMaybe<Scalars['bigint']['input']>;
  pitout_time?: InputMaybe<Scalars['bigint']['input']>;
  position?: InputMaybe<Scalars['numeric']['input']>;
  sector1?: InputMaybe<Scalars['bigint']['input']>;
  sector1_ts?: InputMaybe<Scalars['bigint']['input']>;
  sector2?: InputMaybe<Scalars['bigint']['input']>;
  sector2_ts?: InputMaybe<Scalars['bigint']['input']>;
  sector3?: InputMaybe<Scalars['bigint']['input']>;
  sector3_ts?: InputMaybe<Scalars['bigint']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  speed_trap_fastest_lap?: InputMaybe<Scalars['numeric']['input']>;
  speed_trap_sector1?: InputMaybe<Scalars['numeric']['input']>;
  speed_trap_sector2?: InputMaybe<Scalars['numeric']['input']>;
  speed_trap_straight?: InputMaybe<Scalars['numeric']['input']>;
  stint?: InputMaybe<Scalars['Int']['input']>;
  track_status?: InputMaybe<Scalars['String']['input']>;
  tyre_life?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Laps_Stddev_Fields = {
  __typename?: 'laps_stddev_fields';
  lap_number?: Maybe<Scalars['Float']['output']>;
  lap_start_time?: Maybe<Scalars['Float']['output']>;
  lap_time?: Maybe<Scalars['Float']['output']>;
  pitin_time?: Maybe<Scalars['Float']['output']>;
  pitout_time?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  sector1?: Maybe<Scalars['Float']['output']>;
  sector1_ts?: Maybe<Scalars['Float']['output']>;
  sector2?: Maybe<Scalars['Float']['output']>;
  sector2_ts?: Maybe<Scalars['Float']['output']>;
  sector3?: Maybe<Scalars['Float']['output']>;
  sector3_ts?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed_trap_fastest_lap?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector1?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector2?: Maybe<Scalars['Float']['output']>;
  speed_trap_straight?: Maybe<Scalars['Float']['output']>;
  stint?: Maybe<Scalars['Float']['output']>;
  tyre_life?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "laps" */
export type Laps_Stddev_Order_By = {
  lap_number?: InputMaybe<Order_By>;
  lap_start_time?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  sector1?: InputMaybe<Order_By>;
  sector1_ts?: InputMaybe<Order_By>;
  sector2?: InputMaybe<Order_By>;
  sector2_ts?: InputMaybe<Order_By>;
  sector3?: InputMaybe<Order_By>;
  sector3_ts?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed_trap_fastest_lap?: InputMaybe<Order_By>;
  speed_trap_sector1?: InputMaybe<Order_By>;
  speed_trap_sector2?: InputMaybe<Order_By>;
  speed_trap_straight?: InputMaybe<Order_By>;
  stint?: InputMaybe<Order_By>;
  tyre_life?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Laps_Stddev_Pop_Fields = {
  __typename?: 'laps_stddev_pop_fields';
  lap_number?: Maybe<Scalars['Float']['output']>;
  lap_start_time?: Maybe<Scalars['Float']['output']>;
  lap_time?: Maybe<Scalars['Float']['output']>;
  pitin_time?: Maybe<Scalars['Float']['output']>;
  pitout_time?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  sector1?: Maybe<Scalars['Float']['output']>;
  sector1_ts?: Maybe<Scalars['Float']['output']>;
  sector2?: Maybe<Scalars['Float']['output']>;
  sector2_ts?: Maybe<Scalars['Float']['output']>;
  sector3?: Maybe<Scalars['Float']['output']>;
  sector3_ts?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed_trap_fastest_lap?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector1?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector2?: Maybe<Scalars['Float']['output']>;
  speed_trap_straight?: Maybe<Scalars['Float']['output']>;
  stint?: Maybe<Scalars['Float']['output']>;
  tyre_life?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "laps" */
export type Laps_Stddev_Pop_Order_By = {
  lap_number?: InputMaybe<Order_By>;
  lap_start_time?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  sector1?: InputMaybe<Order_By>;
  sector1_ts?: InputMaybe<Order_By>;
  sector2?: InputMaybe<Order_By>;
  sector2_ts?: InputMaybe<Order_By>;
  sector3?: InputMaybe<Order_By>;
  sector3_ts?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed_trap_fastest_lap?: InputMaybe<Order_By>;
  speed_trap_sector1?: InputMaybe<Order_By>;
  speed_trap_sector2?: InputMaybe<Order_By>;
  speed_trap_straight?: InputMaybe<Order_By>;
  stint?: InputMaybe<Order_By>;
  tyre_life?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Laps_Stddev_Samp_Fields = {
  __typename?: 'laps_stddev_samp_fields';
  lap_number?: Maybe<Scalars['Float']['output']>;
  lap_start_time?: Maybe<Scalars['Float']['output']>;
  lap_time?: Maybe<Scalars['Float']['output']>;
  pitin_time?: Maybe<Scalars['Float']['output']>;
  pitout_time?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  sector1?: Maybe<Scalars['Float']['output']>;
  sector1_ts?: Maybe<Scalars['Float']['output']>;
  sector2?: Maybe<Scalars['Float']['output']>;
  sector2_ts?: Maybe<Scalars['Float']['output']>;
  sector3?: Maybe<Scalars['Float']['output']>;
  sector3_ts?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed_trap_fastest_lap?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector1?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector2?: Maybe<Scalars['Float']['output']>;
  speed_trap_straight?: Maybe<Scalars['Float']['output']>;
  stint?: Maybe<Scalars['Float']['output']>;
  tyre_life?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "laps" */
export type Laps_Stddev_Samp_Order_By = {
  lap_number?: InputMaybe<Order_By>;
  lap_start_time?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  sector1?: InputMaybe<Order_By>;
  sector1_ts?: InputMaybe<Order_By>;
  sector2?: InputMaybe<Order_By>;
  sector2_ts?: InputMaybe<Order_By>;
  sector3?: InputMaybe<Order_By>;
  sector3_ts?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed_trap_fastest_lap?: InputMaybe<Order_By>;
  speed_trap_sector1?: InputMaybe<Order_By>;
  speed_trap_sector2?: InputMaybe<Order_By>;
  speed_trap_straight?: InputMaybe<Order_By>;
  stint?: InputMaybe<Order_By>;
  tyre_life?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "laps" */
export type Laps_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Laps_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Laps_Stream_Cursor_Value_Input = {
  compound?: InputMaybe<Tyre_Compounds_Enum>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  deleted_reason?: InputMaybe<Scalars['String']['input']>;
  driver_session_id?: InputMaybe<Scalars['String']['input']>;
  fastf1_generated?: InputMaybe<Scalars['Boolean']['input']>;
  fresh_tyre?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  is_accurate?: InputMaybe<Scalars['Boolean']['input']>;
  is_personal_best?: InputMaybe<Scalars['Boolean']['input']>;
  lap_number?: InputMaybe<Scalars['Int']['input']>;
  lap_start_date?: InputMaybe<Scalars['String']['input']>;
  lap_start_time?: InputMaybe<Scalars['bigint']['input']>;
  lap_time?: InputMaybe<Scalars['bigint']['input']>;
  pitin_time?: InputMaybe<Scalars['bigint']['input']>;
  pitout_time?: InputMaybe<Scalars['bigint']['input']>;
  position?: InputMaybe<Scalars['numeric']['input']>;
  sector1?: InputMaybe<Scalars['bigint']['input']>;
  sector1_ts?: InputMaybe<Scalars['bigint']['input']>;
  sector2?: InputMaybe<Scalars['bigint']['input']>;
  sector2_ts?: InputMaybe<Scalars['bigint']['input']>;
  sector3?: InputMaybe<Scalars['bigint']['input']>;
  sector3_ts?: InputMaybe<Scalars['bigint']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  speed_trap_fastest_lap?: InputMaybe<Scalars['numeric']['input']>;
  speed_trap_sector1?: InputMaybe<Scalars['numeric']['input']>;
  speed_trap_sector2?: InputMaybe<Scalars['numeric']['input']>;
  speed_trap_straight?: InputMaybe<Scalars['numeric']['input']>;
  stint?: InputMaybe<Scalars['Int']['input']>;
  track_status?: InputMaybe<Scalars['String']['input']>;
  tyre_life?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Laps_Sum_Fields = {
  __typename?: 'laps_sum_fields';
  lap_number?: Maybe<Scalars['Int']['output']>;
  lap_start_time?: Maybe<Scalars['bigint']['output']>;
  lap_time?: Maybe<Scalars['bigint']['output']>;
  pitin_time?: Maybe<Scalars['bigint']['output']>;
  pitout_time?: Maybe<Scalars['bigint']['output']>;
  position?: Maybe<Scalars['numeric']['output']>;
  sector1?: Maybe<Scalars['bigint']['output']>;
  sector1_ts?: Maybe<Scalars['bigint']['output']>;
  sector2?: Maybe<Scalars['bigint']['output']>;
  sector2_ts?: Maybe<Scalars['bigint']['output']>;
  sector3?: Maybe<Scalars['bigint']['output']>;
  sector3_ts?: Maybe<Scalars['bigint']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  speed_trap_fastest_lap?: Maybe<Scalars['numeric']['output']>;
  speed_trap_sector1?: Maybe<Scalars['numeric']['output']>;
  speed_trap_sector2?: Maybe<Scalars['numeric']['output']>;
  speed_trap_straight?: Maybe<Scalars['numeric']['output']>;
  stint?: Maybe<Scalars['Int']['output']>;
  tyre_life?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "laps" */
export type Laps_Sum_Order_By = {
  lap_number?: InputMaybe<Order_By>;
  lap_start_time?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  sector1?: InputMaybe<Order_By>;
  sector1_ts?: InputMaybe<Order_By>;
  sector2?: InputMaybe<Order_By>;
  sector2_ts?: InputMaybe<Order_By>;
  sector3?: InputMaybe<Order_By>;
  sector3_ts?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed_trap_fastest_lap?: InputMaybe<Order_By>;
  speed_trap_sector1?: InputMaybe<Order_By>;
  speed_trap_sector2?: InputMaybe<Order_By>;
  speed_trap_straight?: InputMaybe<Order_By>;
  stint?: InputMaybe<Order_By>;
  tyre_life?: InputMaybe<Order_By>;
};

/** update columns of table "laps" */
export enum Laps_Update_Column {
  /** column name */
  Compound = 'compound',
  /** column name */
  Deleted = 'deleted',
  /** column name */
  DeletedReason = 'deleted_reason',
  /** column name */
  DriverSessionId = 'driver_session_id',
  /** column name */
  Fastf1Generated = 'fastf1_generated',
  /** column name */
  FreshTyre = 'fresh_tyre',
  /** column name */
  Id = 'id',
  /** column name */
  IsAccurate = 'is_accurate',
  /** column name */
  IsPersonalBest = 'is_personal_best',
  /** column name */
  LapNumber = 'lap_number',
  /** column name */
  LapStartDate = 'lap_start_date',
  /** column name */
  LapStartTime = 'lap_start_time',
  /** column name */
  LapTime = 'lap_time',
  /** column name */
  PitinTime = 'pitin_time',
  /** column name */
  PitoutTime = 'pitout_time',
  /** column name */
  Position = 'position',
  /** column name */
  Sector1 = 'sector1',
  /** column name */
  Sector1Ts = 'sector1_ts',
  /** column name */
  Sector2 = 'sector2',
  /** column name */
  Sector2Ts = 'sector2_ts',
  /** column name */
  Sector3 = 'sector3',
  /** column name */
  Sector3Ts = 'sector3_ts',
  /** column name */
  SessionTime = 'session_time',
  /** column name */
  SpeedTrapFastestLap = 'speed_trap_fastest_lap',
  /** column name */
  SpeedTrapSector1 = 'speed_trap_sector1',
  /** column name */
  SpeedTrapSector2 = 'speed_trap_sector2',
  /** column name */
  SpeedTrapStraight = 'speed_trap_straight',
  /** column name */
  Stint = 'stint',
  /** column name */
  TrackStatus = 'track_status',
  /** column name */
  TyreLife = 'tyre_life',
}

export type Laps_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Laps_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Laps_Set_Input>;
  /** filter the rows which have to be updated */
  where: Laps_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Laps_Var_Pop_Fields = {
  __typename?: 'laps_var_pop_fields';
  lap_number?: Maybe<Scalars['Float']['output']>;
  lap_start_time?: Maybe<Scalars['Float']['output']>;
  lap_time?: Maybe<Scalars['Float']['output']>;
  pitin_time?: Maybe<Scalars['Float']['output']>;
  pitout_time?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  sector1?: Maybe<Scalars['Float']['output']>;
  sector1_ts?: Maybe<Scalars['Float']['output']>;
  sector2?: Maybe<Scalars['Float']['output']>;
  sector2_ts?: Maybe<Scalars['Float']['output']>;
  sector3?: Maybe<Scalars['Float']['output']>;
  sector3_ts?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed_trap_fastest_lap?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector1?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector2?: Maybe<Scalars['Float']['output']>;
  speed_trap_straight?: Maybe<Scalars['Float']['output']>;
  stint?: Maybe<Scalars['Float']['output']>;
  tyre_life?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "laps" */
export type Laps_Var_Pop_Order_By = {
  lap_number?: InputMaybe<Order_By>;
  lap_start_time?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  sector1?: InputMaybe<Order_By>;
  sector1_ts?: InputMaybe<Order_By>;
  sector2?: InputMaybe<Order_By>;
  sector2_ts?: InputMaybe<Order_By>;
  sector3?: InputMaybe<Order_By>;
  sector3_ts?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed_trap_fastest_lap?: InputMaybe<Order_By>;
  speed_trap_sector1?: InputMaybe<Order_By>;
  speed_trap_sector2?: InputMaybe<Order_By>;
  speed_trap_straight?: InputMaybe<Order_By>;
  stint?: InputMaybe<Order_By>;
  tyre_life?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Laps_Var_Samp_Fields = {
  __typename?: 'laps_var_samp_fields';
  lap_number?: Maybe<Scalars['Float']['output']>;
  lap_start_time?: Maybe<Scalars['Float']['output']>;
  lap_time?: Maybe<Scalars['Float']['output']>;
  pitin_time?: Maybe<Scalars['Float']['output']>;
  pitout_time?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  sector1?: Maybe<Scalars['Float']['output']>;
  sector1_ts?: Maybe<Scalars['Float']['output']>;
  sector2?: Maybe<Scalars['Float']['output']>;
  sector2_ts?: Maybe<Scalars['Float']['output']>;
  sector3?: Maybe<Scalars['Float']['output']>;
  sector3_ts?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed_trap_fastest_lap?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector1?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector2?: Maybe<Scalars['Float']['output']>;
  speed_trap_straight?: Maybe<Scalars['Float']['output']>;
  stint?: Maybe<Scalars['Float']['output']>;
  tyre_life?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "laps" */
export type Laps_Var_Samp_Order_By = {
  lap_number?: InputMaybe<Order_By>;
  lap_start_time?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  sector1?: InputMaybe<Order_By>;
  sector1_ts?: InputMaybe<Order_By>;
  sector2?: InputMaybe<Order_By>;
  sector2_ts?: InputMaybe<Order_By>;
  sector3?: InputMaybe<Order_By>;
  sector3_ts?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed_trap_fastest_lap?: InputMaybe<Order_By>;
  speed_trap_sector1?: InputMaybe<Order_By>;
  speed_trap_sector2?: InputMaybe<Order_By>;
  speed_trap_straight?: InputMaybe<Order_By>;
  stint?: InputMaybe<Order_By>;
  tyre_life?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Laps_Variance_Fields = {
  __typename?: 'laps_variance_fields';
  lap_number?: Maybe<Scalars['Float']['output']>;
  lap_start_time?: Maybe<Scalars['Float']['output']>;
  lap_time?: Maybe<Scalars['Float']['output']>;
  pitin_time?: Maybe<Scalars['Float']['output']>;
  pitout_time?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  sector1?: Maybe<Scalars['Float']['output']>;
  sector1_ts?: Maybe<Scalars['Float']['output']>;
  sector2?: Maybe<Scalars['Float']['output']>;
  sector2_ts?: Maybe<Scalars['Float']['output']>;
  sector3?: Maybe<Scalars['Float']['output']>;
  sector3_ts?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed_trap_fastest_lap?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector1?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector2?: Maybe<Scalars['Float']['output']>;
  speed_trap_straight?: Maybe<Scalars['Float']['output']>;
  stint?: Maybe<Scalars['Float']['output']>;
  tyre_life?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "laps" */
export type Laps_Variance_Order_By = {
  lap_number?: InputMaybe<Order_By>;
  lap_start_time?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  sector1?: InputMaybe<Order_By>;
  sector1_ts?: InputMaybe<Order_By>;
  sector2?: InputMaybe<Order_By>;
  sector2_ts?: InputMaybe<Order_By>;
  sector3?: InputMaybe<Order_By>;
  sector3_ts?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed_trap_fastest_lap?: InputMaybe<Order_By>;
  speed_trap_sector1?: InputMaybe<Order_By>;
  speed_trap_sector2?: InputMaybe<Order_By>;
  speed_trap_straight?: InputMaybe<Order_By>;
  stint?: InputMaybe<Order_By>;
  tyre_life?: InputMaybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "circuits" */
  delete_circuits?: Maybe<Circuits_Mutation_Response>;
  /** delete single row from the table: "circuits" */
  delete_circuits_by_pk?: Maybe<Circuits>;
  /** delete data from the table: "constructor_standings" */
  delete_constructor_standings?: Maybe<Constructor_Standings_Mutation_Response>;
  /** delete single row from the table: "constructor_standings" */
  delete_constructor_standings_by_pk?: Maybe<Constructor_Standings>;
  /** delete data from the table: "constructors" */
  delete_constructors?: Maybe<Constructors_Mutation_Response>;
  /** delete single row from the table: "constructors" */
  delete_constructors_by_pk?: Maybe<Constructors>;
  /** delete data from the table: "driver_sessions" */
  delete_driver_sessions?: Maybe<Driver_Sessions_Mutation_Response>;
  /** delete single row from the table: "driver_sessions" */
  delete_driver_sessions_by_pk?: Maybe<Driver_Sessions>;
  /** delete data from the table: "driver_standings" */
  delete_driver_standings?: Maybe<Driver_Standings_Mutation_Response>;
  /** delete single row from the table: "driver_standings" */
  delete_driver_standings_by_pk?: Maybe<Driver_Standings>;
  /** delete data from the table: "drivers" */
  delete_drivers?: Maybe<Drivers_Mutation_Response>;
  /** delete single row from the table: "drivers" */
  delete_drivers_by_pk?: Maybe<Drivers>;
  /** delete data from the table: "event_format_choices" */
  delete_event_format_choices?: Maybe<Event_Format_Choices_Mutation_Response>;
  /** delete single row from the table: "event_format_choices" */
  delete_event_format_choices_by_pk?: Maybe<Event_Format_Choices>;
  /** delete data from the table: "events" */
  delete_events?: Maybe<Events_Mutation_Response>;
  /** delete single row from the table: "events" */
  delete_events_by_pk?: Maybe<Events>;
  /** delete data from the table: "fia_documents" */
  delete_fia_documents?: Maybe<Fia_Documents_Mutation_Response>;
  /** delete single row from the table: "fia_documents" */
  delete_fia_documents_by_pk?: Maybe<Fia_Documents>;
  /** delete data from the table: "laps" */
  delete_laps?: Maybe<Laps_Mutation_Response>;
  /** delete single row from the table: "laps" */
  delete_laps_by_pk?: Maybe<Laps>;
  /** delete data from the table: "race_control_messages" */
  delete_race_control_messages?: Maybe<Race_Control_Messages_Mutation_Response>;
  /** delete single row from the table: "race_control_messages" */
  delete_race_control_messages_by_pk?: Maybe<Race_Control_Messages>;
  /** delete data from the table: "race_control_messages_categories" */
  delete_race_control_messages_categories?: Maybe<Race_Control_Messages_Categories_Mutation_Response>;
  /** delete single row from the table: "race_control_messages_categories" */
  delete_race_control_messages_categories_by_pk?: Maybe<Race_Control_Messages_Categories>;
  /** delete data from the table: "race_control_messages_flags" */
  delete_race_control_messages_flags?: Maybe<Race_Control_Messages_Flags_Mutation_Response>;
  /** delete single row from the table: "race_control_messages_flags" */
  delete_race_control_messages_flags_by_pk?: Maybe<Race_Control_Messages_Flags>;
  /** delete data from the table: "race_control_messages_scopes" */
  delete_race_control_messages_scopes?: Maybe<Race_Control_Messages_Scopes_Mutation_Response>;
  /** delete single row from the table: "race_control_messages_scopes" */
  delete_race_control_messages_scopes_by_pk?: Maybe<Race_Control_Messages_Scopes>;
  /** delete data from the table: "results" */
  delete_results?: Maybe<Results_Mutation_Response>;
  /** delete single row from the table: "results" */
  delete_results_by_pk?: Maybe<Results>;
  /** delete data from the table: "schedule" */
  delete_schedule?: Maybe<Schedule_Mutation_Response>;
  /** delete single row from the table: "schedule" */
  delete_schedule_by_pk?: Maybe<Schedule>;
  /** delete data from the table: "session_name_choices" */
  delete_session_name_choices?: Maybe<Session_Name_Choices_Mutation_Response>;
  /** delete single row from the table: "session_name_choices" */
  delete_session_name_choices_by_pk?: Maybe<Session_Name_Choices>;
  /** delete data from the table: "sessions" */
  delete_sessions?: Maybe<Sessions_Mutation_Response>;
  /** delete single row from the table: "sessions" */
  delete_sessions_by_pk?: Maybe<Sessions>;
  /** delete data from the table: "telemetry" */
  delete_telemetry?: Maybe<Telemetry_Mutation_Response>;
  /** delete single row from the table: "telemetry" */
  delete_telemetry_by_pk?: Maybe<Telemetry>;
  /** delete data from the table: "telemetry_car_status" */
  delete_telemetry_car_status?: Maybe<Telemetry_Car_Status_Mutation_Response>;
  /** delete single row from the table: "telemetry_car_status" */
  delete_telemetry_car_status_by_pk?: Maybe<Telemetry_Car_Status>;
  /** delete data from the table: "telemetry_sources" */
  delete_telemetry_sources?: Maybe<Telemetry_Sources_Mutation_Response>;
  /** delete single row from the table: "telemetry_sources" */
  delete_telemetry_sources_by_pk?: Maybe<Telemetry_Sources>;
  /** delete data from the table: "track_status" */
  delete_track_status?: Maybe<Track_Status_Mutation_Response>;
  /** delete single row from the table: "track_status" */
  delete_track_status_by_pk?: Maybe<Track_Status>;
  /** delete data from the table: "tyre_compounds" */
  delete_tyre_compounds?: Maybe<Tyre_Compounds_Mutation_Response>;
  /** delete single row from the table: "tyre_compounds" */
  delete_tyre_compounds_by_pk?: Maybe<Tyre_Compounds>;
  /** delete data from the table: "weather_data" */
  delete_weather_data?: Maybe<Weather_Data_Mutation_Response>;
  /** delete single row from the table: "weather_data" */
  delete_weather_data_by_pk?: Maybe<Weather_Data>;
  /** insert data into the table: "circuits" */
  insert_circuits?: Maybe<Circuits_Mutation_Response>;
  /** insert a single row into the table: "circuits" */
  insert_circuits_one?: Maybe<Circuits>;
  /** insert data into the table: "constructor_standings" */
  insert_constructor_standings?: Maybe<Constructor_Standings_Mutation_Response>;
  /** insert a single row into the table: "constructor_standings" */
  insert_constructor_standings_one?: Maybe<Constructor_Standings>;
  /** insert data into the table: "constructors" */
  insert_constructors?: Maybe<Constructors_Mutation_Response>;
  /** insert a single row into the table: "constructors" */
  insert_constructors_one?: Maybe<Constructors>;
  /** insert data into the table: "driver_sessions" */
  insert_driver_sessions?: Maybe<Driver_Sessions_Mutation_Response>;
  /** insert a single row into the table: "driver_sessions" */
  insert_driver_sessions_one?: Maybe<Driver_Sessions>;
  /** insert data into the table: "driver_standings" */
  insert_driver_standings?: Maybe<Driver_Standings_Mutation_Response>;
  /** insert a single row into the table: "driver_standings" */
  insert_driver_standings_one?: Maybe<Driver_Standings>;
  /** insert data into the table: "drivers" */
  insert_drivers?: Maybe<Drivers_Mutation_Response>;
  /** insert a single row into the table: "drivers" */
  insert_drivers_one?: Maybe<Drivers>;
  /** insert data into the table: "event_format_choices" */
  insert_event_format_choices?: Maybe<Event_Format_Choices_Mutation_Response>;
  /** insert a single row into the table: "event_format_choices" */
  insert_event_format_choices_one?: Maybe<Event_Format_Choices>;
  /** insert data into the table: "events" */
  insert_events?: Maybe<Events_Mutation_Response>;
  /** insert a single row into the table: "events" */
  insert_events_one?: Maybe<Events>;
  /** insert data into the table: "fia_documents" */
  insert_fia_documents?: Maybe<Fia_Documents_Mutation_Response>;
  /** insert a single row into the table: "fia_documents" */
  insert_fia_documents_one?: Maybe<Fia_Documents>;
  /** insert data into the table: "laps" */
  insert_laps?: Maybe<Laps_Mutation_Response>;
  /** insert a single row into the table: "laps" */
  insert_laps_one?: Maybe<Laps>;
  /** insert data into the table: "race_control_messages" */
  insert_race_control_messages?: Maybe<Race_Control_Messages_Mutation_Response>;
  /** insert data into the table: "race_control_messages_categories" */
  insert_race_control_messages_categories?: Maybe<Race_Control_Messages_Categories_Mutation_Response>;
  /** insert a single row into the table: "race_control_messages_categories" */
  insert_race_control_messages_categories_one?: Maybe<Race_Control_Messages_Categories>;
  /** insert data into the table: "race_control_messages_flags" */
  insert_race_control_messages_flags?: Maybe<Race_Control_Messages_Flags_Mutation_Response>;
  /** insert a single row into the table: "race_control_messages_flags" */
  insert_race_control_messages_flags_one?: Maybe<Race_Control_Messages_Flags>;
  /** insert a single row into the table: "race_control_messages" */
  insert_race_control_messages_one?: Maybe<Race_Control_Messages>;
  /** insert data into the table: "race_control_messages_scopes" */
  insert_race_control_messages_scopes?: Maybe<Race_Control_Messages_Scopes_Mutation_Response>;
  /** insert a single row into the table: "race_control_messages_scopes" */
  insert_race_control_messages_scopes_one?: Maybe<Race_Control_Messages_Scopes>;
  /** insert data into the table: "results" */
  insert_results?: Maybe<Results_Mutation_Response>;
  /** insert a single row into the table: "results" */
  insert_results_one?: Maybe<Results>;
  /** insert data into the table: "schedule" */
  insert_schedule?: Maybe<Schedule_Mutation_Response>;
  /** insert a single row into the table: "schedule" */
  insert_schedule_one?: Maybe<Schedule>;
  /** insert data into the table: "session_name_choices" */
  insert_session_name_choices?: Maybe<Session_Name_Choices_Mutation_Response>;
  /** insert a single row into the table: "session_name_choices" */
  insert_session_name_choices_one?: Maybe<Session_Name_Choices>;
  /** insert data into the table: "sessions" */
  insert_sessions?: Maybe<Sessions_Mutation_Response>;
  /** insert a single row into the table: "sessions" */
  insert_sessions_one?: Maybe<Sessions>;
  /** insert data into the table: "telemetry" */
  insert_telemetry?: Maybe<Telemetry_Mutation_Response>;
  /** insert data into the table: "telemetry_car_status" */
  insert_telemetry_car_status?: Maybe<Telemetry_Car_Status_Mutation_Response>;
  /** insert a single row into the table: "telemetry_car_status" */
  insert_telemetry_car_status_one?: Maybe<Telemetry_Car_Status>;
  /** insert a single row into the table: "telemetry" */
  insert_telemetry_one?: Maybe<Telemetry>;
  /** insert data into the table: "telemetry_sources" */
  insert_telemetry_sources?: Maybe<Telemetry_Sources_Mutation_Response>;
  /** insert a single row into the table: "telemetry_sources" */
  insert_telemetry_sources_one?: Maybe<Telemetry_Sources>;
  /** insert data into the table: "track_status" */
  insert_track_status?: Maybe<Track_Status_Mutation_Response>;
  /** insert a single row into the table: "track_status" */
  insert_track_status_one?: Maybe<Track_Status>;
  /** insert data into the table: "tyre_compounds" */
  insert_tyre_compounds?: Maybe<Tyre_Compounds_Mutation_Response>;
  /** insert a single row into the table: "tyre_compounds" */
  insert_tyre_compounds_one?: Maybe<Tyre_Compounds>;
  /** insert data into the table: "weather_data" */
  insert_weather_data?: Maybe<Weather_Data_Mutation_Response>;
  /** insert a single row into the table: "weather_data" */
  insert_weather_data_one?: Maybe<Weather_Data>;
  /** update data of the table: "circuits" */
  update_circuits?: Maybe<Circuits_Mutation_Response>;
  /** update single row of the table: "circuits" */
  update_circuits_by_pk?: Maybe<Circuits>;
  /** update multiples rows of table: "circuits" */
  update_circuits_many?: Maybe<Array<Maybe<Circuits_Mutation_Response>>>;
  /** update data of the table: "constructor_standings" */
  update_constructor_standings?: Maybe<Constructor_Standings_Mutation_Response>;
  /** update single row of the table: "constructor_standings" */
  update_constructor_standings_by_pk?: Maybe<Constructor_Standings>;
  /** update multiples rows of table: "constructor_standings" */
  update_constructor_standings_many?: Maybe<
    Array<Maybe<Constructor_Standings_Mutation_Response>>
  >;
  /** update data of the table: "constructors" */
  update_constructors?: Maybe<Constructors_Mutation_Response>;
  /** update single row of the table: "constructors" */
  update_constructors_by_pk?: Maybe<Constructors>;
  /** update multiples rows of table: "constructors" */
  update_constructors_many?: Maybe<
    Array<Maybe<Constructors_Mutation_Response>>
  >;
  /** update data of the table: "driver_sessions" */
  update_driver_sessions?: Maybe<Driver_Sessions_Mutation_Response>;
  /** update single row of the table: "driver_sessions" */
  update_driver_sessions_by_pk?: Maybe<Driver_Sessions>;
  /** update multiples rows of table: "driver_sessions" */
  update_driver_sessions_many?: Maybe<
    Array<Maybe<Driver_Sessions_Mutation_Response>>
  >;
  /** update data of the table: "driver_standings" */
  update_driver_standings?: Maybe<Driver_Standings_Mutation_Response>;
  /** update single row of the table: "driver_standings" */
  update_driver_standings_by_pk?: Maybe<Driver_Standings>;
  /** update multiples rows of table: "driver_standings" */
  update_driver_standings_many?: Maybe<
    Array<Maybe<Driver_Standings_Mutation_Response>>
  >;
  /** update data of the table: "drivers" */
  update_drivers?: Maybe<Drivers_Mutation_Response>;
  /** update single row of the table: "drivers" */
  update_drivers_by_pk?: Maybe<Drivers>;
  /** update multiples rows of table: "drivers" */
  update_drivers_many?: Maybe<Array<Maybe<Drivers_Mutation_Response>>>;
  /** update data of the table: "event_format_choices" */
  update_event_format_choices?: Maybe<Event_Format_Choices_Mutation_Response>;
  /** update single row of the table: "event_format_choices" */
  update_event_format_choices_by_pk?: Maybe<Event_Format_Choices>;
  /** update multiples rows of table: "event_format_choices" */
  update_event_format_choices_many?: Maybe<
    Array<Maybe<Event_Format_Choices_Mutation_Response>>
  >;
  /** update data of the table: "events" */
  update_events?: Maybe<Events_Mutation_Response>;
  /** update single row of the table: "events" */
  update_events_by_pk?: Maybe<Events>;
  /** update multiples rows of table: "events" */
  update_events_many?: Maybe<Array<Maybe<Events_Mutation_Response>>>;
  /** update data of the table: "fia_documents" */
  update_fia_documents?: Maybe<Fia_Documents_Mutation_Response>;
  /** update single row of the table: "fia_documents" */
  update_fia_documents_by_pk?: Maybe<Fia_Documents>;
  /** update multiples rows of table: "fia_documents" */
  update_fia_documents_many?: Maybe<
    Array<Maybe<Fia_Documents_Mutation_Response>>
  >;
  /** update data of the table: "laps" */
  update_laps?: Maybe<Laps_Mutation_Response>;
  /** update single row of the table: "laps" */
  update_laps_by_pk?: Maybe<Laps>;
  /** update multiples rows of table: "laps" */
  update_laps_many?: Maybe<Array<Maybe<Laps_Mutation_Response>>>;
  /** update data of the table: "race_control_messages" */
  update_race_control_messages?: Maybe<Race_Control_Messages_Mutation_Response>;
  /** update single row of the table: "race_control_messages" */
  update_race_control_messages_by_pk?: Maybe<Race_Control_Messages>;
  /** update data of the table: "race_control_messages_categories" */
  update_race_control_messages_categories?: Maybe<Race_Control_Messages_Categories_Mutation_Response>;
  /** update single row of the table: "race_control_messages_categories" */
  update_race_control_messages_categories_by_pk?: Maybe<Race_Control_Messages_Categories>;
  /** update multiples rows of table: "race_control_messages_categories" */
  update_race_control_messages_categories_many?: Maybe<
    Array<Maybe<Race_Control_Messages_Categories_Mutation_Response>>
  >;
  /** update data of the table: "race_control_messages_flags" */
  update_race_control_messages_flags?: Maybe<Race_Control_Messages_Flags_Mutation_Response>;
  /** update single row of the table: "race_control_messages_flags" */
  update_race_control_messages_flags_by_pk?: Maybe<Race_Control_Messages_Flags>;
  /** update multiples rows of table: "race_control_messages_flags" */
  update_race_control_messages_flags_many?: Maybe<
    Array<Maybe<Race_Control_Messages_Flags_Mutation_Response>>
  >;
  /** update multiples rows of table: "race_control_messages" */
  update_race_control_messages_many?: Maybe<
    Array<Maybe<Race_Control_Messages_Mutation_Response>>
  >;
  /** update data of the table: "race_control_messages_scopes" */
  update_race_control_messages_scopes?: Maybe<Race_Control_Messages_Scopes_Mutation_Response>;
  /** update single row of the table: "race_control_messages_scopes" */
  update_race_control_messages_scopes_by_pk?: Maybe<Race_Control_Messages_Scopes>;
  /** update multiples rows of table: "race_control_messages_scopes" */
  update_race_control_messages_scopes_many?: Maybe<
    Array<Maybe<Race_Control_Messages_Scopes_Mutation_Response>>
  >;
  /** update data of the table: "results" */
  update_results?: Maybe<Results_Mutation_Response>;
  /** update single row of the table: "results" */
  update_results_by_pk?: Maybe<Results>;
  /** update multiples rows of table: "results" */
  update_results_many?: Maybe<Array<Maybe<Results_Mutation_Response>>>;
  /** update data of the table: "schedule" */
  update_schedule?: Maybe<Schedule_Mutation_Response>;
  /** update single row of the table: "schedule" */
  update_schedule_by_pk?: Maybe<Schedule>;
  /** update multiples rows of table: "schedule" */
  update_schedule_many?: Maybe<Array<Maybe<Schedule_Mutation_Response>>>;
  /** update data of the table: "session_name_choices" */
  update_session_name_choices?: Maybe<Session_Name_Choices_Mutation_Response>;
  /** update single row of the table: "session_name_choices" */
  update_session_name_choices_by_pk?: Maybe<Session_Name_Choices>;
  /** update multiples rows of table: "session_name_choices" */
  update_session_name_choices_many?: Maybe<
    Array<Maybe<Session_Name_Choices_Mutation_Response>>
  >;
  /** update data of the table: "sessions" */
  update_sessions?: Maybe<Sessions_Mutation_Response>;
  /** update single row of the table: "sessions" */
  update_sessions_by_pk?: Maybe<Sessions>;
  /** update multiples rows of table: "sessions" */
  update_sessions_many?: Maybe<Array<Maybe<Sessions_Mutation_Response>>>;
  /** update data of the table: "telemetry" */
  update_telemetry?: Maybe<Telemetry_Mutation_Response>;
  /** update single row of the table: "telemetry" */
  update_telemetry_by_pk?: Maybe<Telemetry>;
  /** update data of the table: "telemetry_car_status" */
  update_telemetry_car_status?: Maybe<Telemetry_Car_Status_Mutation_Response>;
  /** update single row of the table: "telemetry_car_status" */
  update_telemetry_car_status_by_pk?: Maybe<Telemetry_Car_Status>;
  /** update multiples rows of table: "telemetry_car_status" */
  update_telemetry_car_status_many?: Maybe<
    Array<Maybe<Telemetry_Car_Status_Mutation_Response>>
  >;
  /** update multiples rows of table: "telemetry" */
  update_telemetry_many?: Maybe<Array<Maybe<Telemetry_Mutation_Response>>>;
  /** update data of the table: "telemetry_sources" */
  update_telemetry_sources?: Maybe<Telemetry_Sources_Mutation_Response>;
  /** update single row of the table: "telemetry_sources" */
  update_telemetry_sources_by_pk?: Maybe<Telemetry_Sources>;
  /** update multiples rows of table: "telemetry_sources" */
  update_telemetry_sources_many?: Maybe<
    Array<Maybe<Telemetry_Sources_Mutation_Response>>
  >;
  /** update data of the table: "track_status" */
  update_track_status?: Maybe<Track_Status_Mutation_Response>;
  /** update single row of the table: "track_status" */
  update_track_status_by_pk?: Maybe<Track_Status>;
  /** update multiples rows of table: "track_status" */
  update_track_status_many?: Maybe<
    Array<Maybe<Track_Status_Mutation_Response>>
  >;
  /** update data of the table: "tyre_compounds" */
  update_tyre_compounds?: Maybe<Tyre_Compounds_Mutation_Response>;
  /** update single row of the table: "tyre_compounds" */
  update_tyre_compounds_by_pk?: Maybe<Tyre_Compounds>;
  /** update multiples rows of table: "tyre_compounds" */
  update_tyre_compounds_many?: Maybe<
    Array<Maybe<Tyre_Compounds_Mutation_Response>>
  >;
  /** update data of the table: "weather_data" */
  update_weather_data?: Maybe<Weather_Data_Mutation_Response>;
  /** update single row of the table: "weather_data" */
  update_weather_data_by_pk?: Maybe<Weather_Data>;
  /** update multiples rows of table: "weather_data" */
  update_weather_data_many?: Maybe<
    Array<Maybe<Weather_Data_Mutation_Response>>
  >;
};

/** mutation root */
export type Mutation_RootDelete_CircuitsArgs = {
  where: Circuits_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Circuits_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Constructor_StandingsArgs = {
  where: Constructor_Standings_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Constructor_Standings_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_ConstructorsArgs = {
  where: Constructors_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Constructors_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Driver_SessionsArgs = {
  where: Driver_Sessions_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Driver_Sessions_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Driver_StandingsArgs = {
  where: Driver_Standings_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Driver_Standings_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_DriversArgs = {
  where: Drivers_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Drivers_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Event_Format_ChoicesArgs = {
  where: Event_Format_Choices_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Event_Format_Choices_By_PkArgs = {
  value: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_EventsArgs = {
  where: Events_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Events_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Fia_DocumentsArgs = {
  where: Fia_Documents_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Fia_Documents_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_LapsArgs = {
  where: Laps_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Laps_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Race_Control_MessagesArgs = {
  where: Race_Control_Messages_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Race_Control_Messages_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Race_Control_Messages_CategoriesArgs = {
  where: Race_Control_Messages_Categories_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Race_Control_Messages_Categories_By_PkArgs = {
  value: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Race_Control_Messages_FlagsArgs = {
  where: Race_Control_Messages_Flags_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Race_Control_Messages_Flags_By_PkArgs = {
  value: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Race_Control_Messages_ScopesArgs = {
  where: Race_Control_Messages_Scopes_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Race_Control_Messages_Scopes_By_PkArgs = {
  value: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_ResultsArgs = {
  where: Results_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Results_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_ScheduleArgs = {
  where: Schedule_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Schedule_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Session_Name_ChoicesArgs = {
  where: Session_Name_Choices_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Session_Name_Choices_By_PkArgs = {
  value: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_SessionsArgs = {
  where: Sessions_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Sessions_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_TelemetryArgs = {
  where: Telemetry_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Telemetry_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Telemetry_Car_StatusArgs = {
  where: Telemetry_Car_Status_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Telemetry_Car_Status_By_PkArgs = {
  value: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Telemetry_SourcesArgs = {
  where: Telemetry_Sources_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Telemetry_Sources_By_PkArgs = {
  value: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Track_StatusArgs = {
  where: Track_Status_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Track_Status_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Tyre_CompoundsArgs = {
  where: Tyre_Compounds_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Tyre_Compounds_By_PkArgs = {
  value: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Weather_DataArgs = {
  where: Weather_Data_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Weather_Data_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootInsert_CircuitsArgs = {
  objects: Array<Circuits_Insert_Input>;
  on_conflict?: InputMaybe<Circuits_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Circuits_OneArgs = {
  object: Circuits_Insert_Input;
  on_conflict?: InputMaybe<Circuits_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Constructor_StandingsArgs = {
  objects: Array<Constructor_Standings_Insert_Input>;
  on_conflict?: InputMaybe<Constructor_Standings_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Constructor_Standings_OneArgs = {
  object: Constructor_Standings_Insert_Input;
  on_conflict?: InputMaybe<Constructor_Standings_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_ConstructorsArgs = {
  objects: Array<Constructors_Insert_Input>;
  on_conflict?: InputMaybe<Constructors_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Constructors_OneArgs = {
  object: Constructors_Insert_Input;
  on_conflict?: InputMaybe<Constructors_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Driver_SessionsArgs = {
  objects: Array<Driver_Sessions_Insert_Input>;
  on_conflict?: InputMaybe<Driver_Sessions_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Driver_Sessions_OneArgs = {
  object: Driver_Sessions_Insert_Input;
  on_conflict?: InputMaybe<Driver_Sessions_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Driver_StandingsArgs = {
  objects: Array<Driver_Standings_Insert_Input>;
  on_conflict?: InputMaybe<Driver_Standings_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Driver_Standings_OneArgs = {
  object: Driver_Standings_Insert_Input;
  on_conflict?: InputMaybe<Driver_Standings_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_DriversArgs = {
  objects: Array<Drivers_Insert_Input>;
  on_conflict?: InputMaybe<Drivers_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Drivers_OneArgs = {
  object: Drivers_Insert_Input;
  on_conflict?: InputMaybe<Drivers_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Event_Format_ChoicesArgs = {
  objects: Array<Event_Format_Choices_Insert_Input>;
  on_conflict?: InputMaybe<Event_Format_Choices_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Event_Format_Choices_OneArgs = {
  object: Event_Format_Choices_Insert_Input;
  on_conflict?: InputMaybe<Event_Format_Choices_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_EventsArgs = {
  objects: Array<Events_Insert_Input>;
  on_conflict?: InputMaybe<Events_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Events_OneArgs = {
  object: Events_Insert_Input;
  on_conflict?: InputMaybe<Events_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Fia_DocumentsArgs = {
  objects: Array<Fia_Documents_Insert_Input>;
  on_conflict?: InputMaybe<Fia_Documents_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Fia_Documents_OneArgs = {
  object: Fia_Documents_Insert_Input;
  on_conflict?: InputMaybe<Fia_Documents_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_LapsArgs = {
  objects: Array<Laps_Insert_Input>;
  on_conflict?: InputMaybe<Laps_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Laps_OneArgs = {
  object: Laps_Insert_Input;
  on_conflict?: InputMaybe<Laps_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Race_Control_MessagesArgs = {
  objects: Array<Race_Control_Messages_Insert_Input>;
  on_conflict?: InputMaybe<Race_Control_Messages_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Race_Control_Messages_CategoriesArgs = {
  objects: Array<Race_Control_Messages_Categories_Insert_Input>;
  on_conflict?: InputMaybe<Race_Control_Messages_Categories_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Race_Control_Messages_Categories_OneArgs = {
  object: Race_Control_Messages_Categories_Insert_Input;
  on_conflict?: InputMaybe<Race_Control_Messages_Categories_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Race_Control_Messages_FlagsArgs = {
  objects: Array<Race_Control_Messages_Flags_Insert_Input>;
  on_conflict?: InputMaybe<Race_Control_Messages_Flags_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Race_Control_Messages_Flags_OneArgs = {
  object: Race_Control_Messages_Flags_Insert_Input;
  on_conflict?: InputMaybe<Race_Control_Messages_Flags_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Race_Control_Messages_OneArgs = {
  object: Race_Control_Messages_Insert_Input;
  on_conflict?: InputMaybe<Race_Control_Messages_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Race_Control_Messages_ScopesArgs = {
  objects: Array<Race_Control_Messages_Scopes_Insert_Input>;
  on_conflict?: InputMaybe<Race_Control_Messages_Scopes_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Race_Control_Messages_Scopes_OneArgs = {
  object: Race_Control_Messages_Scopes_Insert_Input;
  on_conflict?: InputMaybe<Race_Control_Messages_Scopes_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_ResultsArgs = {
  objects: Array<Results_Insert_Input>;
  on_conflict?: InputMaybe<Results_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Results_OneArgs = {
  object: Results_Insert_Input;
  on_conflict?: InputMaybe<Results_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_ScheduleArgs = {
  objects: Array<Schedule_Insert_Input>;
  on_conflict?: InputMaybe<Schedule_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Schedule_OneArgs = {
  object: Schedule_Insert_Input;
  on_conflict?: InputMaybe<Schedule_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Session_Name_ChoicesArgs = {
  objects: Array<Session_Name_Choices_Insert_Input>;
  on_conflict?: InputMaybe<Session_Name_Choices_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Session_Name_Choices_OneArgs = {
  object: Session_Name_Choices_Insert_Input;
  on_conflict?: InputMaybe<Session_Name_Choices_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_SessionsArgs = {
  objects: Array<Sessions_Insert_Input>;
  on_conflict?: InputMaybe<Sessions_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Sessions_OneArgs = {
  object: Sessions_Insert_Input;
  on_conflict?: InputMaybe<Sessions_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_TelemetryArgs = {
  objects: Array<Telemetry_Insert_Input>;
  on_conflict?: InputMaybe<Telemetry_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Telemetry_Car_StatusArgs = {
  objects: Array<Telemetry_Car_Status_Insert_Input>;
  on_conflict?: InputMaybe<Telemetry_Car_Status_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Telemetry_Car_Status_OneArgs = {
  object: Telemetry_Car_Status_Insert_Input;
  on_conflict?: InputMaybe<Telemetry_Car_Status_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Telemetry_OneArgs = {
  object: Telemetry_Insert_Input;
  on_conflict?: InputMaybe<Telemetry_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Telemetry_SourcesArgs = {
  objects: Array<Telemetry_Sources_Insert_Input>;
  on_conflict?: InputMaybe<Telemetry_Sources_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Telemetry_Sources_OneArgs = {
  object: Telemetry_Sources_Insert_Input;
  on_conflict?: InputMaybe<Telemetry_Sources_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Track_StatusArgs = {
  objects: Array<Track_Status_Insert_Input>;
  on_conflict?: InputMaybe<Track_Status_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Track_Status_OneArgs = {
  object: Track_Status_Insert_Input;
  on_conflict?: InputMaybe<Track_Status_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Tyre_CompoundsArgs = {
  objects: Array<Tyre_Compounds_Insert_Input>;
  on_conflict?: InputMaybe<Tyre_Compounds_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Tyre_Compounds_OneArgs = {
  object: Tyre_Compounds_Insert_Input;
  on_conflict?: InputMaybe<Tyre_Compounds_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Weather_DataArgs = {
  objects: Array<Weather_Data_Insert_Input>;
  on_conflict?: InputMaybe<Weather_Data_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Weather_Data_OneArgs = {
  object: Weather_Data_Insert_Input;
  on_conflict?: InputMaybe<Weather_Data_On_Conflict>;
};

/** mutation root */
export type Mutation_RootUpdate_CircuitsArgs = {
  _append?: InputMaybe<Circuits_Append_Input>;
  _delete_at_path?: InputMaybe<Circuits_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Circuits_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Circuits_Delete_Key_Input>;
  _inc?: InputMaybe<Circuits_Inc_Input>;
  _prepend?: InputMaybe<Circuits_Prepend_Input>;
  _set?: InputMaybe<Circuits_Set_Input>;
  where: Circuits_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Circuits_By_PkArgs = {
  _append?: InputMaybe<Circuits_Append_Input>;
  _delete_at_path?: InputMaybe<Circuits_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Circuits_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Circuits_Delete_Key_Input>;
  _inc?: InputMaybe<Circuits_Inc_Input>;
  _prepend?: InputMaybe<Circuits_Prepend_Input>;
  _set?: InputMaybe<Circuits_Set_Input>;
  pk_columns: Circuits_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Circuits_ManyArgs = {
  updates: Array<Circuits_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Constructor_StandingsArgs = {
  _inc?: InputMaybe<Constructor_Standings_Inc_Input>;
  _set?: InputMaybe<Constructor_Standings_Set_Input>;
  where: Constructor_Standings_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Constructor_Standings_By_PkArgs = {
  _inc?: InputMaybe<Constructor_Standings_Inc_Input>;
  _set?: InputMaybe<Constructor_Standings_Set_Input>;
  pk_columns: Constructor_Standings_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Constructor_Standings_ManyArgs = {
  updates: Array<Constructor_Standings_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_ConstructorsArgs = {
  _inc?: InputMaybe<Constructors_Inc_Input>;
  _set?: InputMaybe<Constructors_Set_Input>;
  where: Constructors_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Constructors_By_PkArgs = {
  _inc?: InputMaybe<Constructors_Inc_Input>;
  _set?: InputMaybe<Constructors_Set_Input>;
  pk_columns: Constructors_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Constructors_ManyArgs = {
  updates: Array<Constructors_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Driver_SessionsArgs = {
  _set?: InputMaybe<Driver_Sessions_Set_Input>;
  where: Driver_Sessions_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Driver_Sessions_By_PkArgs = {
  _set?: InputMaybe<Driver_Sessions_Set_Input>;
  pk_columns: Driver_Sessions_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Driver_Sessions_ManyArgs = {
  updates: Array<Driver_Sessions_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Driver_StandingsArgs = {
  _inc?: InputMaybe<Driver_Standings_Inc_Input>;
  _set?: InputMaybe<Driver_Standings_Set_Input>;
  where: Driver_Standings_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Driver_Standings_By_PkArgs = {
  _inc?: InputMaybe<Driver_Standings_Inc_Input>;
  _set?: InputMaybe<Driver_Standings_Set_Input>;
  pk_columns: Driver_Standings_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Driver_Standings_ManyArgs = {
  updates: Array<Driver_Standings_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_DriversArgs = {
  _inc?: InputMaybe<Drivers_Inc_Input>;
  _set?: InputMaybe<Drivers_Set_Input>;
  where: Drivers_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Drivers_By_PkArgs = {
  _inc?: InputMaybe<Drivers_Inc_Input>;
  _set?: InputMaybe<Drivers_Set_Input>;
  pk_columns: Drivers_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Drivers_ManyArgs = {
  updates: Array<Drivers_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Event_Format_ChoicesArgs = {
  _set?: InputMaybe<Event_Format_Choices_Set_Input>;
  where: Event_Format_Choices_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Event_Format_Choices_By_PkArgs = {
  _set?: InputMaybe<Event_Format_Choices_Set_Input>;
  pk_columns: Event_Format_Choices_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Event_Format_Choices_ManyArgs = {
  updates: Array<Event_Format_Choices_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_EventsArgs = {
  _inc?: InputMaybe<Events_Inc_Input>;
  _set?: InputMaybe<Events_Set_Input>;
  where: Events_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Events_By_PkArgs = {
  _inc?: InputMaybe<Events_Inc_Input>;
  _set?: InputMaybe<Events_Set_Input>;
  pk_columns: Events_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Events_ManyArgs = {
  updates: Array<Events_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Fia_DocumentsArgs = {
  _inc?: InputMaybe<Fia_Documents_Inc_Input>;
  _set?: InputMaybe<Fia_Documents_Set_Input>;
  where: Fia_Documents_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Fia_Documents_By_PkArgs = {
  _inc?: InputMaybe<Fia_Documents_Inc_Input>;
  _set?: InputMaybe<Fia_Documents_Set_Input>;
  pk_columns: Fia_Documents_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Fia_Documents_ManyArgs = {
  updates: Array<Fia_Documents_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_LapsArgs = {
  _inc?: InputMaybe<Laps_Inc_Input>;
  _set?: InputMaybe<Laps_Set_Input>;
  where: Laps_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Laps_By_PkArgs = {
  _inc?: InputMaybe<Laps_Inc_Input>;
  _set?: InputMaybe<Laps_Set_Input>;
  pk_columns: Laps_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Laps_ManyArgs = {
  updates: Array<Laps_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Race_Control_MessagesArgs = {
  _inc?: InputMaybe<Race_Control_Messages_Inc_Input>;
  _set?: InputMaybe<Race_Control_Messages_Set_Input>;
  where: Race_Control_Messages_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Race_Control_Messages_By_PkArgs = {
  _inc?: InputMaybe<Race_Control_Messages_Inc_Input>;
  _set?: InputMaybe<Race_Control_Messages_Set_Input>;
  pk_columns: Race_Control_Messages_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Race_Control_Messages_CategoriesArgs = {
  _set?: InputMaybe<Race_Control_Messages_Categories_Set_Input>;
  where: Race_Control_Messages_Categories_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Race_Control_Messages_Categories_By_PkArgs = {
  _set?: InputMaybe<Race_Control_Messages_Categories_Set_Input>;
  pk_columns: Race_Control_Messages_Categories_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Race_Control_Messages_Categories_ManyArgs = {
  updates: Array<Race_Control_Messages_Categories_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Race_Control_Messages_FlagsArgs = {
  _set?: InputMaybe<Race_Control_Messages_Flags_Set_Input>;
  where: Race_Control_Messages_Flags_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Race_Control_Messages_Flags_By_PkArgs = {
  _set?: InputMaybe<Race_Control_Messages_Flags_Set_Input>;
  pk_columns: Race_Control_Messages_Flags_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Race_Control_Messages_Flags_ManyArgs = {
  updates: Array<Race_Control_Messages_Flags_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Race_Control_Messages_ManyArgs = {
  updates: Array<Race_Control_Messages_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Race_Control_Messages_ScopesArgs = {
  _set?: InputMaybe<Race_Control_Messages_Scopes_Set_Input>;
  where: Race_Control_Messages_Scopes_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Race_Control_Messages_Scopes_By_PkArgs = {
  _set?: InputMaybe<Race_Control_Messages_Scopes_Set_Input>;
  pk_columns: Race_Control_Messages_Scopes_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Race_Control_Messages_Scopes_ManyArgs = {
  updates: Array<Race_Control_Messages_Scopes_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_ResultsArgs = {
  _inc?: InputMaybe<Results_Inc_Input>;
  _set?: InputMaybe<Results_Set_Input>;
  where: Results_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Results_By_PkArgs = {
  _inc?: InputMaybe<Results_Inc_Input>;
  _set?: InputMaybe<Results_Set_Input>;
  pk_columns: Results_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Results_ManyArgs = {
  updates: Array<Results_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_ScheduleArgs = {
  _inc?: InputMaybe<Schedule_Inc_Input>;
  _set?: InputMaybe<Schedule_Set_Input>;
  where: Schedule_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Schedule_By_PkArgs = {
  _inc?: InputMaybe<Schedule_Inc_Input>;
  _set?: InputMaybe<Schedule_Set_Input>;
  pk_columns: Schedule_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Schedule_ManyArgs = {
  updates: Array<Schedule_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Session_Name_ChoicesArgs = {
  _set?: InputMaybe<Session_Name_Choices_Set_Input>;
  where: Session_Name_Choices_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Session_Name_Choices_By_PkArgs = {
  _set?: InputMaybe<Session_Name_Choices_Set_Input>;
  pk_columns: Session_Name_Choices_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Session_Name_Choices_ManyArgs = {
  updates: Array<Session_Name_Choices_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_SessionsArgs = {
  _inc?: InputMaybe<Sessions_Inc_Input>;
  _set?: InputMaybe<Sessions_Set_Input>;
  where: Sessions_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Sessions_By_PkArgs = {
  _inc?: InputMaybe<Sessions_Inc_Input>;
  _set?: InputMaybe<Sessions_Set_Input>;
  pk_columns: Sessions_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Sessions_ManyArgs = {
  updates: Array<Sessions_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_TelemetryArgs = {
  _inc?: InputMaybe<Telemetry_Inc_Input>;
  _set?: InputMaybe<Telemetry_Set_Input>;
  where: Telemetry_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Telemetry_By_PkArgs = {
  _inc?: InputMaybe<Telemetry_Inc_Input>;
  _set?: InputMaybe<Telemetry_Set_Input>;
  pk_columns: Telemetry_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Telemetry_Car_StatusArgs = {
  _set?: InputMaybe<Telemetry_Car_Status_Set_Input>;
  where: Telemetry_Car_Status_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Telemetry_Car_Status_By_PkArgs = {
  _set?: InputMaybe<Telemetry_Car_Status_Set_Input>;
  pk_columns: Telemetry_Car_Status_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Telemetry_Car_Status_ManyArgs = {
  updates: Array<Telemetry_Car_Status_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Telemetry_ManyArgs = {
  updates: Array<Telemetry_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Telemetry_SourcesArgs = {
  _set?: InputMaybe<Telemetry_Sources_Set_Input>;
  where: Telemetry_Sources_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Telemetry_Sources_By_PkArgs = {
  _set?: InputMaybe<Telemetry_Sources_Set_Input>;
  pk_columns: Telemetry_Sources_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Telemetry_Sources_ManyArgs = {
  updates: Array<Telemetry_Sources_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Track_StatusArgs = {
  _inc?: InputMaybe<Track_Status_Inc_Input>;
  _set?: InputMaybe<Track_Status_Set_Input>;
  where: Track_Status_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Track_Status_By_PkArgs = {
  _inc?: InputMaybe<Track_Status_Inc_Input>;
  _set?: InputMaybe<Track_Status_Set_Input>;
  pk_columns: Track_Status_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Track_Status_ManyArgs = {
  updates: Array<Track_Status_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Tyre_CompoundsArgs = {
  _set?: InputMaybe<Tyre_Compounds_Set_Input>;
  where: Tyre_Compounds_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Tyre_Compounds_By_PkArgs = {
  _set?: InputMaybe<Tyre_Compounds_Set_Input>;
  pk_columns: Tyre_Compounds_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Tyre_Compounds_ManyArgs = {
  updates: Array<Tyre_Compounds_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Weather_DataArgs = {
  _inc?: InputMaybe<Weather_Data_Inc_Input>;
  _set?: InputMaybe<Weather_Data_Set_Input>;
  where: Weather_Data_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Weather_Data_By_PkArgs = {
  _inc?: InputMaybe<Weather_Data_Inc_Input>;
  _set?: InputMaybe<Weather_Data_Set_Input>;
  pk_columns: Weather_Data_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Weather_Data_ManyArgs = {
  updates: Array<Weather_Data_Updates>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last',
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "circuits" */
  circuits: Array<Circuits>;
  /** fetch aggregated fields from the table: "circuits" */
  circuits_aggregate: Circuits_Aggregate;
  /** fetch data from the table: "circuits" using primary key columns */
  circuits_by_pk?: Maybe<Circuits>;
  /** An array relationship */
  constructor_standings: Array<Constructor_Standings>;
  /** An aggregate relationship */
  constructor_standings_aggregate: Constructor_Standings_Aggregate;
  /** fetch data from the table: "constructor_standings" using primary key columns */
  constructor_standings_by_pk?: Maybe<Constructor_Standings>;
  /** fetch data from the table: "constructors" */
  constructors: Array<Constructors>;
  /** fetch aggregated fields from the table: "constructors" */
  constructors_aggregate: Constructors_Aggregate;
  /** fetch data from the table: "constructors" using primary key columns */
  constructors_by_pk?: Maybe<Constructors>;
  /** An array relationship */
  driver_sessions: Array<Driver_Sessions>;
  /** An aggregate relationship */
  driver_sessions_aggregate: Driver_Sessions_Aggregate;
  /** fetch data from the table: "driver_sessions" using primary key columns */
  driver_sessions_by_pk?: Maybe<Driver_Sessions>;
  /** An array relationship */
  driver_standings: Array<Driver_Standings>;
  /** An aggregate relationship */
  driver_standings_aggregate: Driver_Standings_Aggregate;
  /** fetch data from the table: "driver_standings" using primary key columns */
  driver_standings_by_pk?: Maybe<Driver_Standings>;
  /** fetch data from the table: "drivers" */
  drivers: Array<Drivers>;
  /** fetch aggregated fields from the table: "drivers" */
  drivers_aggregate: Drivers_Aggregate;
  /** fetch data from the table: "drivers" using primary key columns */
  drivers_by_pk?: Maybe<Drivers>;
  /** fetch data from the table: "event_format_choices" */
  event_format_choices: Array<Event_Format_Choices>;
  /** fetch aggregated fields from the table: "event_format_choices" */
  event_format_choices_aggregate: Event_Format_Choices_Aggregate;
  /** fetch data from the table: "event_format_choices" using primary key columns */
  event_format_choices_by_pk?: Maybe<Event_Format_Choices>;
  /** An array relationship */
  events: Array<Events>;
  /** An aggregate relationship */
  events_aggregate: Events_Aggregate;
  /** fetch data from the table: "events" using primary key columns */
  events_by_pk?: Maybe<Events>;
  /** fetch data from the table: "fia_documents" */
  fia_documents: Array<Fia_Documents>;
  /** fetch aggregated fields from the table: "fia_documents" */
  fia_documents_aggregate: Fia_Documents_Aggregate;
  /** fetch data from the table: "fia_documents" using primary key columns */
  fia_documents_by_pk?: Maybe<Fia_Documents>;
  /** An array relationship */
  laps: Array<Laps>;
  /** An aggregate relationship */
  laps_aggregate: Laps_Aggregate;
  /** fetch data from the table: "laps" using primary key columns */
  laps_by_pk?: Maybe<Laps>;
  /** An array relationship */
  race_control_messages: Array<Race_Control_Messages>;
  /** An aggregate relationship */
  race_control_messages_aggregate: Race_Control_Messages_Aggregate;
  /** fetch data from the table: "race_control_messages" using primary key columns */
  race_control_messages_by_pk?: Maybe<Race_Control_Messages>;
  /** fetch data from the table: "race_control_messages_categories" */
  race_control_messages_categories: Array<Race_Control_Messages_Categories>;
  /** fetch aggregated fields from the table: "race_control_messages_categories" */
  race_control_messages_categories_aggregate: Race_Control_Messages_Categories_Aggregate;
  /** fetch data from the table: "race_control_messages_categories" using primary key columns */
  race_control_messages_categories_by_pk?: Maybe<Race_Control_Messages_Categories>;
  /** fetch data from the table: "race_control_messages_flags" */
  race_control_messages_flags: Array<Race_Control_Messages_Flags>;
  /** fetch aggregated fields from the table: "race_control_messages_flags" */
  race_control_messages_flags_aggregate: Race_Control_Messages_Flags_Aggregate;
  /** fetch data from the table: "race_control_messages_flags" using primary key columns */
  race_control_messages_flags_by_pk?: Maybe<Race_Control_Messages_Flags>;
  /** fetch data from the table: "race_control_messages_scopes" */
  race_control_messages_scopes: Array<Race_Control_Messages_Scopes>;
  /** fetch aggregated fields from the table: "race_control_messages_scopes" */
  race_control_messages_scopes_aggregate: Race_Control_Messages_Scopes_Aggregate;
  /** fetch data from the table: "race_control_messages_scopes" using primary key columns */
  race_control_messages_scopes_by_pk?: Maybe<Race_Control_Messages_Scopes>;
  /** An array relationship */
  results: Array<Results>;
  /** An aggregate relationship */
  results_aggregate: Results_Aggregate;
  /** fetch data from the table: "results" using primary key columns */
  results_by_pk?: Maybe<Results>;
  /** fetch data from the table: "schedule" */
  schedule: Array<Schedule>;
  /** fetch aggregated fields from the table: "schedule" */
  schedule_aggregate: Schedule_Aggregate;
  /** fetch data from the table: "schedule" using primary key columns */
  schedule_by_pk?: Maybe<Schedule>;
  /** fetch data from the table: "session_name_choices" */
  session_name_choices: Array<Session_Name_Choices>;
  /** fetch aggregated fields from the table: "session_name_choices" */
  session_name_choices_aggregate: Session_Name_Choices_Aggregate;
  /** fetch data from the table: "session_name_choices" using primary key columns */
  session_name_choices_by_pk?: Maybe<Session_Name_Choices>;
  /** An array relationship */
  sessions: Array<Sessions>;
  /** An aggregate relationship */
  sessions_aggregate: Sessions_Aggregate;
  /** fetch data from the table: "sessions" using primary key columns */
  sessions_by_pk?: Maybe<Sessions>;
  /** fetch data from the table: "telemetry" */
  telemetry: Array<Telemetry>;
  /** fetch aggregated fields from the table: "telemetry" */
  telemetry_aggregate: Telemetry_Aggregate;
  /** fetch data from the table: "telemetry" using primary key columns */
  telemetry_by_pk?: Maybe<Telemetry>;
  /** fetch data from the table: "telemetry_car_status" */
  telemetry_car_status: Array<Telemetry_Car_Status>;
  /** fetch aggregated fields from the table: "telemetry_car_status" */
  telemetry_car_status_aggregate: Telemetry_Car_Status_Aggregate;
  /** fetch data from the table: "telemetry_car_status" using primary key columns */
  telemetry_car_status_by_pk?: Maybe<Telemetry_Car_Status>;
  /** fetch data from the table: "telemetry_sources" */
  telemetry_sources: Array<Telemetry_Sources>;
  /** fetch aggregated fields from the table: "telemetry_sources" */
  telemetry_sources_aggregate: Telemetry_Sources_Aggregate;
  /** fetch data from the table: "telemetry_sources" using primary key columns */
  telemetry_sources_by_pk?: Maybe<Telemetry_Sources>;
  /** fetch data from the table: "track_status" */
  track_status: Array<Track_Status>;
  /** fetch aggregated fields from the table: "track_status" */
  track_status_aggregate: Track_Status_Aggregate;
  /** fetch data from the table: "track_status" using primary key columns */
  track_status_by_pk?: Maybe<Track_Status>;
  /** fetch data from the table: "tyre_compounds" */
  tyre_compounds: Array<Tyre_Compounds>;
  /** fetch aggregated fields from the table: "tyre_compounds" */
  tyre_compounds_aggregate: Tyre_Compounds_Aggregate;
  /** fetch data from the table: "tyre_compounds" using primary key columns */
  tyre_compounds_by_pk?: Maybe<Tyre_Compounds>;
  /** An array relationship */
  weather_data: Array<Weather_Data>;
  /** An aggregate relationship */
  weather_data_aggregate: Weather_Data_Aggregate;
  /** fetch data from the table: "weather_data" using primary key columns */
  weather_data_by_pk?: Maybe<Weather_Data>;
};

export type Query_RootCircuitsArgs = {
  distinct_on?: InputMaybe<Array<Circuits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Circuits_Order_By>>;
  where?: InputMaybe<Circuits_Bool_Exp>;
};

export type Query_RootCircuits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Circuits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Circuits_Order_By>>;
  where?: InputMaybe<Circuits_Bool_Exp>;
};

export type Query_RootCircuits_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootConstructor_StandingsArgs = {
  distinct_on?: InputMaybe<Array<Constructor_Standings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Constructor_Standings_Order_By>>;
  where?: InputMaybe<Constructor_Standings_Bool_Exp>;
};

export type Query_RootConstructor_Standings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Constructor_Standings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Constructor_Standings_Order_By>>;
  where?: InputMaybe<Constructor_Standings_Bool_Exp>;
};

export type Query_RootConstructor_Standings_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootConstructorsArgs = {
  distinct_on?: InputMaybe<Array<Constructors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Constructors_Order_By>>;
  where?: InputMaybe<Constructors_Bool_Exp>;
};

export type Query_RootConstructors_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Constructors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Constructors_Order_By>>;
  where?: InputMaybe<Constructors_Bool_Exp>;
};

export type Query_RootConstructors_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootDriver_SessionsArgs = {
  distinct_on?: InputMaybe<Array<Driver_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Sessions_Order_By>>;
  where?: InputMaybe<Driver_Sessions_Bool_Exp>;
};

export type Query_RootDriver_Sessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Driver_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Sessions_Order_By>>;
  where?: InputMaybe<Driver_Sessions_Bool_Exp>;
};

export type Query_RootDriver_Sessions_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootDriver_StandingsArgs = {
  distinct_on?: InputMaybe<Array<Driver_Standings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Standings_Order_By>>;
  where?: InputMaybe<Driver_Standings_Bool_Exp>;
};

export type Query_RootDriver_Standings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Driver_Standings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Standings_Order_By>>;
  where?: InputMaybe<Driver_Standings_Bool_Exp>;
};

export type Query_RootDriver_Standings_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootDriversArgs = {
  distinct_on?: InputMaybe<Array<Drivers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Drivers_Order_By>>;
  where?: InputMaybe<Drivers_Bool_Exp>;
};

export type Query_RootDrivers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Drivers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Drivers_Order_By>>;
  where?: InputMaybe<Drivers_Bool_Exp>;
};

export type Query_RootDrivers_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootEvent_Format_ChoicesArgs = {
  distinct_on?: InputMaybe<Array<Event_Format_Choices_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Format_Choices_Order_By>>;
  where?: InputMaybe<Event_Format_Choices_Bool_Exp>;
};

export type Query_RootEvent_Format_Choices_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Event_Format_Choices_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Format_Choices_Order_By>>;
  where?: InputMaybe<Event_Format_Choices_Bool_Exp>;
};

export type Query_RootEvent_Format_Choices_By_PkArgs = {
  value: Scalars['String']['input'];
};

export type Query_RootEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};

export type Query_RootEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};

export type Query_RootEvents_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootFia_DocumentsArgs = {
  distinct_on?: InputMaybe<Array<Fia_Documents_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Fia_Documents_Order_By>>;
  where?: InputMaybe<Fia_Documents_Bool_Exp>;
};

export type Query_RootFia_Documents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Fia_Documents_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Fia_Documents_Order_By>>;
  where?: InputMaybe<Fia_Documents_Bool_Exp>;
};

export type Query_RootFia_Documents_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootLapsArgs = {
  distinct_on?: InputMaybe<Array<Laps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Laps_Order_By>>;
  where?: InputMaybe<Laps_Bool_Exp>;
};

export type Query_RootLaps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Laps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Laps_Order_By>>;
  where?: InputMaybe<Laps_Bool_Exp>;
};

export type Query_RootLaps_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootRace_Control_MessagesArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
};

export type Query_RootRace_Control_Messages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
};

export type Query_RootRace_Control_Messages_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootRace_Control_Messages_CategoriesArgs = {
  distinct_on?: InputMaybe<
    Array<Race_Control_Messages_Categories_Select_Column>
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Categories_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Categories_Bool_Exp>;
};

export type Query_RootRace_Control_Messages_Categories_AggregateArgs = {
  distinct_on?: InputMaybe<
    Array<Race_Control_Messages_Categories_Select_Column>
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Categories_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Categories_Bool_Exp>;
};

export type Query_RootRace_Control_Messages_Categories_By_PkArgs = {
  value: Scalars['String']['input'];
};

export type Query_RootRace_Control_Messages_FlagsArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Flags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Flags_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Flags_Bool_Exp>;
};

export type Query_RootRace_Control_Messages_Flags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Flags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Flags_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Flags_Bool_Exp>;
};

export type Query_RootRace_Control_Messages_Flags_By_PkArgs = {
  value: Scalars['String']['input'];
};

export type Query_RootRace_Control_Messages_ScopesArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Scopes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Scopes_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Scopes_Bool_Exp>;
};

export type Query_RootRace_Control_Messages_Scopes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Scopes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Scopes_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Scopes_Bool_Exp>;
};

export type Query_RootRace_Control_Messages_Scopes_By_PkArgs = {
  value: Scalars['String']['input'];
};

export type Query_RootResultsArgs = {
  distinct_on?: InputMaybe<Array<Results_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Results_Order_By>>;
  where?: InputMaybe<Results_Bool_Exp>;
};

export type Query_RootResults_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Results_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Results_Order_By>>;
  where?: InputMaybe<Results_Bool_Exp>;
};

export type Query_RootResults_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootScheduleArgs = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

export type Query_RootSchedule_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

export type Query_RootSchedule_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootSession_Name_ChoicesArgs = {
  distinct_on?: InputMaybe<Array<Session_Name_Choices_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Session_Name_Choices_Order_By>>;
  where?: InputMaybe<Session_Name_Choices_Bool_Exp>;
};

export type Query_RootSession_Name_Choices_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Session_Name_Choices_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Session_Name_Choices_Order_By>>;
  where?: InputMaybe<Session_Name_Choices_Bool_Exp>;
};

export type Query_RootSession_Name_Choices_By_PkArgs = {
  value: Scalars['String']['input'];
};

export type Query_RootSessionsArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

export type Query_RootSessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

export type Query_RootSessions_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootTelemetryArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Order_By>>;
  where?: InputMaybe<Telemetry_Bool_Exp>;
};

export type Query_RootTelemetry_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Order_By>>;
  where?: InputMaybe<Telemetry_Bool_Exp>;
};

export type Query_RootTelemetry_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootTelemetry_Car_StatusArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Car_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Car_Status_Order_By>>;
  where?: InputMaybe<Telemetry_Car_Status_Bool_Exp>;
};

export type Query_RootTelemetry_Car_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Car_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Car_Status_Order_By>>;
  where?: InputMaybe<Telemetry_Car_Status_Bool_Exp>;
};

export type Query_RootTelemetry_Car_Status_By_PkArgs = {
  value: Scalars['String']['input'];
};

export type Query_RootTelemetry_SourcesArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Sources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Sources_Order_By>>;
  where?: InputMaybe<Telemetry_Sources_Bool_Exp>;
};

export type Query_RootTelemetry_Sources_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Sources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Sources_Order_By>>;
  where?: InputMaybe<Telemetry_Sources_Bool_Exp>;
};

export type Query_RootTelemetry_Sources_By_PkArgs = {
  value: Scalars['String']['input'];
};

export type Query_RootTrack_StatusArgs = {
  distinct_on?: InputMaybe<Array<Track_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Track_Status_Order_By>>;
  where?: InputMaybe<Track_Status_Bool_Exp>;
};

export type Query_RootTrack_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Track_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Track_Status_Order_By>>;
  where?: InputMaybe<Track_Status_Bool_Exp>;
};

export type Query_RootTrack_Status_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootTyre_CompoundsArgs = {
  distinct_on?: InputMaybe<Array<Tyre_Compounds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tyre_Compounds_Order_By>>;
  where?: InputMaybe<Tyre_Compounds_Bool_Exp>;
};

export type Query_RootTyre_Compounds_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tyre_Compounds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tyre_Compounds_Order_By>>;
  where?: InputMaybe<Tyre_Compounds_Bool_Exp>;
};

export type Query_RootTyre_Compounds_By_PkArgs = {
  value: Scalars['String']['input'];
};

export type Query_RootWeather_DataArgs = {
  distinct_on?: InputMaybe<Array<Weather_Data_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Weather_Data_Order_By>>;
  where?: InputMaybe<Weather_Data_Bool_Exp>;
};

export type Query_RootWeather_Data_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Weather_Data_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Weather_Data_Order_By>>;
  where?: InputMaybe<Weather_Data_Bool_Exp>;
};

export type Query_RootWeather_Data_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** columns and relationships of "race_control_messages" */
export type Race_Control_Messages = {
  __typename?: 'race_control_messages';
  category?: Maybe<Race_Control_Messages_Categories_Enum>;
  flag?: Maybe<Race_Control_Messages_Flags_Enum>;
  id: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  race_control_messages_category?: Maybe<Race_Control_Messages_Categories>;
  /** An object relationship */
  race_control_messages_flag?: Maybe<Race_Control_Messages_Flags>;
  /** An object relationship */
  race_control_messages_scope?: Maybe<Race_Control_Messages_Scopes>;
  racing_number?: Maybe<Scalars['String']['output']>;
  scope?: Maybe<Race_Control_Messages_Scopes_Enum>;
  sector?: Maybe<Scalars['numeric']['output']>;
  /** An object relationship */
  session?: Maybe<Sessions>;
  session_id?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "race_control_messages" */
export type Race_Control_Messages_Aggregate = {
  __typename?: 'race_control_messages_aggregate';
  aggregate?: Maybe<Race_Control_Messages_Aggregate_Fields>;
  nodes: Array<Race_Control_Messages>;
};

export type Race_Control_Messages_Aggregate_Bool_Exp = {
  count?: InputMaybe<Race_Control_Messages_Aggregate_Bool_Exp_Count>;
};

export type Race_Control_Messages_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Race_Control_Messages_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "race_control_messages" */
export type Race_Control_Messages_Aggregate_Fields = {
  __typename?: 'race_control_messages_aggregate_fields';
  avg?: Maybe<Race_Control_Messages_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Race_Control_Messages_Max_Fields>;
  min?: Maybe<Race_Control_Messages_Min_Fields>;
  stddev?: Maybe<Race_Control_Messages_Stddev_Fields>;
  stddev_pop?: Maybe<Race_Control_Messages_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Race_Control_Messages_Stddev_Samp_Fields>;
  sum?: Maybe<Race_Control_Messages_Sum_Fields>;
  var_pop?: Maybe<Race_Control_Messages_Var_Pop_Fields>;
  var_samp?: Maybe<Race_Control_Messages_Var_Samp_Fields>;
  variance?: Maybe<Race_Control_Messages_Variance_Fields>;
};

/** aggregate fields of "race_control_messages" */
export type Race_Control_Messages_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "race_control_messages" */
export type Race_Control_Messages_Aggregate_Order_By = {
  avg?: InputMaybe<Race_Control_Messages_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Race_Control_Messages_Max_Order_By>;
  min?: InputMaybe<Race_Control_Messages_Min_Order_By>;
  stddev?: InputMaybe<Race_Control_Messages_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Race_Control_Messages_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Race_Control_Messages_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Race_Control_Messages_Sum_Order_By>;
  var_pop?: InputMaybe<Race_Control_Messages_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Race_Control_Messages_Var_Samp_Order_By>;
  variance?: InputMaybe<Race_Control_Messages_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "race_control_messages" */
export type Race_Control_Messages_Arr_Rel_Insert_Input = {
  data: Array<Race_Control_Messages_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Race_Control_Messages_On_Conflict>;
};

/** aggregate avg on columns */
export type Race_Control_Messages_Avg_Fields = {
  __typename?: 'race_control_messages_avg_fields';
  sector?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "race_control_messages" */
export type Race_Control_Messages_Avg_Order_By = {
  sector?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "race_control_messages". All fields are combined with a logical 'AND'. */
export type Race_Control_Messages_Bool_Exp = {
  _and?: InputMaybe<Array<Race_Control_Messages_Bool_Exp>>;
  _not?: InputMaybe<Race_Control_Messages_Bool_Exp>;
  _or?: InputMaybe<Array<Race_Control_Messages_Bool_Exp>>;
  category?: InputMaybe<Race_Control_Messages_Categories_Enum_Comparison_Exp>;
  flag?: InputMaybe<Race_Control_Messages_Flags_Enum_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  message?: InputMaybe<String_Comparison_Exp>;
  race_control_messages_category?: InputMaybe<Race_Control_Messages_Categories_Bool_Exp>;
  race_control_messages_flag?: InputMaybe<Race_Control_Messages_Flags_Bool_Exp>;
  race_control_messages_scope?: InputMaybe<Race_Control_Messages_Scopes_Bool_Exp>;
  racing_number?: InputMaybe<String_Comparison_Exp>;
  scope?: InputMaybe<Race_Control_Messages_Scopes_Enum_Comparison_Exp>;
  sector?: InputMaybe<Numeric_Comparison_Exp>;
  session?: InputMaybe<Sessions_Bool_Exp>;
  session_id?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  time?: InputMaybe<String_Comparison_Exp>;
};

/** columns and relationships of "race_control_messages_categories" */
export type Race_Control_Messages_Categories = {
  __typename?: 'race_control_messages_categories';
  comment?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  race_control_messages: Array<Race_Control_Messages>;
  /** An aggregate relationship */
  race_control_messages_aggregate: Race_Control_Messages_Aggregate;
  value: Scalars['String']['output'];
};

/** columns and relationships of "race_control_messages_categories" */
export type Race_Control_Messages_CategoriesRace_Control_MessagesArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
};

/** columns and relationships of "race_control_messages_categories" */
export type Race_Control_Messages_CategoriesRace_Control_Messages_AggregateArgs =
  {
    distinct_on?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
    limit?: InputMaybe<Scalars['Int']['input']>;
    offset?: InputMaybe<Scalars['Int']['input']>;
    order_by?: InputMaybe<Array<Race_Control_Messages_Order_By>>;
    where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
  };

/** aggregated selection of "race_control_messages_categories" */
export type Race_Control_Messages_Categories_Aggregate = {
  __typename?: 'race_control_messages_categories_aggregate';
  aggregate?: Maybe<Race_Control_Messages_Categories_Aggregate_Fields>;
  nodes: Array<Race_Control_Messages_Categories>;
};

/** aggregate fields of "race_control_messages_categories" */
export type Race_Control_Messages_Categories_Aggregate_Fields = {
  __typename?: 'race_control_messages_categories_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Race_Control_Messages_Categories_Max_Fields>;
  min?: Maybe<Race_Control_Messages_Categories_Min_Fields>;
};

/** aggregate fields of "race_control_messages_categories" */
export type Race_Control_Messages_Categories_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Race_Control_Messages_Categories_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "race_control_messages_categories". All fields are combined with a logical 'AND'. */
export type Race_Control_Messages_Categories_Bool_Exp = {
  _and?: InputMaybe<Array<Race_Control_Messages_Categories_Bool_Exp>>;
  _not?: InputMaybe<Race_Control_Messages_Categories_Bool_Exp>;
  _or?: InputMaybe<Array<Race_Control_Messages_Categories_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  race_control_messages?: InputMaybe<Race_Control_Messages_Bool_Exp>;
  race_control_messages_aggregate?: InputMaybe<Race_Control_Messages_Aggregate_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "race_control_messages_categories" */
export enum Race_Control_Messages_Categories_Constraint {
  /** unique or primary key constraint on columns "value" */
  RaceControlMessagesCategoriesPkey = 'race_control_messages_categories_pkey',
}

export enum Race_Control_Messages_Categories_Enum {
  /** Car event category */
  CarEvent = 'CarEvent',
  /** DRS category */
  Drs = 'Drs',
  /** Flag category */
  Flag = 'Flag',
  /** Other category */
  Other = 'Other',
  /** Safety car category */
  SafetyCar = 'SafetyCar',
}

/** Boolean expression to compare columns of type "race_control_messages_categories_enum". All fields are combined with logical 'AND'. */
export type Race_Control_Messages_Categories_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Race_Control_Messages_Categories_Enum>;
  _in?: InputMaybe<Array<Race_Control_Messages_Categories_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Race_Control_Messages_Categories_Enum>;
  _nin?: InputMaybe<Array<Race_Control_Messages_Categories_Enum>>;
};

/** input type for inserting data into table "race_control_messages_categories" */
export type Race_Control_Messages_Categories_Insert_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  race_control_messages?: InputMaybe<Race_Control_Messages_Arr_Rel_Insert_Input>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Race_Control_Messages_Categories_Max_Fields = {
  __typename?: 'race_control_messages_categories_max_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Race_Control_Messages_Categories_Min_Fields = {
  __typename?: 'race_control_messages_categories_min_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "race_control_messages_categories" */
export type Race_Control_Messages_Categories_Mutation_Response = {
  __typename?: 'race_control_messages_categories_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Race_Control_Messages_Categories>;
};

/** input type for inserting object relation for remote table "race_control_messages_categories" */
export type Race_Control_Messages_Categories_Obj_Rel_Insert_Input = {
  data: Race_Control_Messages_Categories_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Race_Control_Messages_Categories_On_Conflict>;
};

/** on_conflict condition type for table "race_control_messages_categories" */
export type Race_Control_Messages_Categories_On_Conflict = {
  constraint: Race_Control_Messages_Categories_Constraint;
  update_columns?: Array<Race_Control_Messages_Categories_Update_Column>;
  where?: InputMaybe<Race_Control_Messages_Categories_Bool_Exp>;
};

/** Ordering options when selecting data from "race_control_messages_categories". */
export type Race_Control_Messages_Categories_Order_By = {
  comment?: InputMaybe<Order_By>;
  race_control_messages_aggregate?: InputMaybe<Race_Control_Messages_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: race_control_messages_categories */
export type Race_Control_Messages_Categories_Pk_Columns_Input = {
  value: Scalars['String']['input'];
};

/** select columns of table "race_control_messages_categories" */
export enum Race_Control_Messages_Categories_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value',
}

/** input type for updating data in table "race_control_messages_categories" */
export type Race_Control_Messages_Categories_Set_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "race_control_messages_categories" */
export type Race_Control_Messages_Categories_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Race_Control_Messages_Categories_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Race_Control_Messages_Categories_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "race_control_messages_categories" */
export enum Race_Control_Messages_Categories_Update_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value',
}

export type Race_Control_Messages_Categories_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Race_Control_Messages_Categories_Set_Input>;
  /** filter the rows which have to be updated */
  where: Race_Control_Messages_Categories_Bool_Exp;
};

/** unique or primary key constraints on table "race_control_messages" */
export enum Race_Control_Messages_Constraint {
  /** unique or primary key constraint on columns "id" */
  RaceControlMessagesPkey = 'race_control_messages_pkey',
}

/** columns and relationships of "race_control_messages_flags" */
export type Race_Control_Messages_Flags = {
  __typename?: 'race_control_messages_flags';
  comment?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  race_control_messages: Array<Race_Control_Messages>;
  /** An aggregate relationship */
  race_control_messages_aggregate: Race_Control_Messages_Aggregate;
  value: Scalars['String']['output'];
};

/** columns and relationships of "race_control_messages_flags" */
export type Race_Control_Messages_FlagsRace_Control_MessagesArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
};

/** columns and relationships of "race_control_messages_flags" */
export type Race_Control_Messages_FlagsRace_Control_Messages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
};

/** aggregated selection of "race_control_messages_flags" */
export type Race_Control_Messages_Flags_Aggregate = {
  __typename?: 'race_control_messages_flags_aggregate';
  aggregate?: Maybe<Race_Control_Messages_Flags_Aggregate_Fields>;
  nodes: Array<Race_Control_Messages_Flags>;
};

/** aggregate fields of "race_control_messages_flags" */
export type Race_Control_Messages_Flags_Aggregate_Fields = {
  __typename?: 'race_control_messages_flags_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Race_Control_Messages_Flags_Max_Fields>;
  min?: Maybe<Race_Control_Messages_Flags_Min_Fields>;
};

/** aggregate fields of "race_control_messages_flags" */
export type Race_Control_Messages_Flags_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Race_Control_Messages_Flags_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "race_control_messages_flags". All fields are combined with a logical 'AND'. */
export type Race_Control_Messages_Flags_Bool_Exp = {
  _and?: InputMaybe<Array<Race_Control_Messages_Flags_Bool_Exp>>;
  _not?: InputMaybe<Race_Control_Messages_Flags_Bool_Exp>;
  _or?: InputMaybe<Array<Race_Control_Messages_Flags_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  race_control_messages?: InputMaybe<Race_Control_Messages_Bool_Exp>;
  race_control_messages_aggregate?: InputMaybe<Race_Control_Messages_Aggregate_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "race_control_messages_flags" */
export enum Race_Control_Messages_Flags_Constraint {
  /** unique or primary key constraint on columns "value" */
  RaceControlMessagesFlagsPkey = 'race_control_messages_flags_pkey',
}

export enum Race_Control_Messages_Flags_Enum {
  /** Black flag */
  Black = 'BLACK',
  /** Black and white flag */
  BlackAndWhite = 'BLACK_AND_WHITE',
  /** Blue flag */
  Blue = 'BLUE',
  /** Chequered flag */
  Chequered = 'CHEQUERED',
  /** Clear flag */
  Clear = 'CLEAR',
  /** Double yellow flag */
  DoubleYellow = 'DOUBLE_YELLOW',
  /** Green flag */
  Green = 'GREEN',
  /** Red flag */
  Red = 'RED',
  /** Yellow flag */
  Yellow = 'YELLOW',
}

/** Boolean expression to compare columns of type "race_control_messages_flags_enum". All fields are combined with logical 'AND'. */
export type Race_Control_Messages_Flags_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Race_Control_Messages_Flags_Enum>;
  _in?: InputMaybe<Array<Race_Control_Messages_Flags_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Race_Control_Messages_Flags_Enum>;
  _nin?: InputMaybe<Array<Race_Control_Messages_Flags_Enum>>;
};

/** input type for inserting data into table "race_control_messages_flags" */
export type Race_Control_Messages_Flags_Insert_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  race_control_messages?: InputMaybe<Race_Control_Messages_Arr_Rel_Insert_Input>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Race_Control_Messages_Flags_Max_Fields = {
  __typename?: 'race_control_messages_flags_max_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Race_Control_Messages_Flags_Min_Fields = {
  __typename?: 'race_control_messages_flags_min_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "race_control_messages_flags" */
export type Race_Control_Messages_Flags_Mutation_Response = {
  __typename?: 'race_control_messages_flags_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Race_Control_Messages_Flags>;
};

/** input type for inserting object relation for remote table "race_control_messages_flags" */
export type Race_Control_Messages_Flags_Obj_Rel_Insert_Input = {
  data: Race_Control_Messages_Flags_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Race_Control_Messages_Flags_On_Conflict>;
};

/** on_conflict condition type for table "race_control_messages_flags" */
export type Race_Control_Messages_Flags_On_Conflict = {
  constraint: Race_Control_Messages_Flags_Constraint;
  update_columns?: Array<Race_Control_Messages_Flags_Update_Column>;
  where?: InputMaybe<Race_Control_Messages_Flags_Bool_Exp>;
};

/** Ordering options when selecting data from "race_control_messages_flags". */
export type Race_Control_Messages_Flags_Order_By = {
  comment?: InputMaybe<Order_By>;
  race_control_messages_aggregate?: InputMaybe<Race_Control_Messages_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: race_control_messages_flags */
export type Race_Control_Messages_Flags_Pk_Columns_Input = {
  value: Scalars['String']['input'];
};

/** select columns of table "race_control_messages_flags" */
export enum Race_Control_Messages_Flags_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value',
}

/** input type for updating data in table "race_control_messages_flags" */
export type Race_Control_Messages_Flags_Set_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "race_control_messages_flags" */
export type Race_Control_Messages_Flags_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Race_Control_Messages_Flags_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Race_Control_Messages_Flags_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "race_control_messages_flags" */
export enum Race_Control_Messages_Flags_Update_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value',
}

export type Race_Control_Messages_Flags_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Race_Control_Messages_Flags_Set_Input>;
  /** filter the rows which have to be updated */
  where: Race_Control_Messages_Flags_Bool_Exp;
};

/** input type for incrementing numeric columns in table "race_control_messages" */
export type Race_Control_Messages_Inc_Input = {
  sector?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "race_control_messages" */
export type Race_Control_Messages_Insert_Input = {
  category?: InputMaybe<Race_Control_Messages_Categories_Enum>;
  flag?: InputMaybe<Race_Control_Messages_Flags_Enum>;
  id?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  race_control_messages_category?: InputMaybe<Race_Control_Messages_Categories_Obj_Rel_Insert_Input>;
  race_control_messages_flag?: InputMaybe<Race_Control_Messages_Flags_Obj_Rel_Insert_Input>;
  race_control_messages_scope?: InputMaybe<Race_Control_Messages_Scopes_Obj_Rel_Insert_Input>;
  racing_number?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Race_Control_Messages_Scopes_Enum>;
  sector?: InputMaybe<Scalars['numeric']['input']>;
  session?: InputMaybe<Sessions_Obj_Rel_Insert_Input>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Race_Control_Messages_Max_Fields = {
  __typename?: 'race_control_messages_max_fields';
  id?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  racing_number?: Maybe<Scalars['String']['output']>;
  sector?: Maybe<Scalars['numeric']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "race_control_messages" */
export type Race_Control_Messages_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  racing_number?: InputMaybe<Order_By>;
  sector?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Race_Control_Messages_Min_Fields = {
  __typename?: 'race_control_messages_min_fields';
  id?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  racing_number?: Maybe<Scalars['String']['output']>;
  sector?: Maybe<Scalars['numeric']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "race_control_messages" */
export type Race_Control_Messages_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  racing_number?: InputMaybe<Order_By>;
  sector?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "race_control_messages" */
export type Race_Control_Messages_Mutation_Response = {
  __typename?: 'race_control_messages_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Race_Control_Messages>;
};

/** on_conflict condition type for table "race_control_messages" */
export type Race_Control_Messages_On_Conflict = {
  constraint: Race_Control_Messages_Constraint;
  update_columns?: Array<Race_Control_Messages_Update_Column>;
  where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
};

/** Ordering options when selecting data from "race_control_messages". */
export type Race_Control_Messages_Order_By = {
  category?: InputMaybe<Order_By>;
  flag?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  race_control_messages_category?: InputMaybe<Race_Control_Messages_Categories_Order_By>;
  race_control_messages_flag?: InputMaybe<Race_Control_Messages_Flags_Order_By>;
  race_control_messages_scope?: InputMaybe<Race_Control_Messages_Scopes_Order_By>;
  racing_number?: InputMaybe<Order_By>;
  scope?: InputMaybe<Order_By>;
  sector?: InputMaybe<Order_By>;
  session?: InputMaybe<Sessions_Order_By>;
  session_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
};

/** primary key columns input for table: race_control_messages */
export type Race_Control_Messages_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** columns and relationships of "race_control_messages_scopes" */
export type Race_Control_Messages_Scopes = {
  __typename?: 'race_control_messages_scopes';
  comment?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  race_control_messages: Array<Race_Control_Messages>;
  /** An aggregate relationship */
  race_control_messages_aggregate: Race_Control_Messages_Aggregate;
  value: Scalars['String']['output'];
};

/** columns and relationships of "race_control_messages_scopes" */
export type Race_Control_Messages_ScopesRace_Control_MessagesArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
};

/** columns and relationships of "race_control_messages_scopes" */
export type Race_Control_Messages_ScopesRace_Control_Messages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
};

/** aggregated selection of "race_control_messages_scopes" */
export type Race_Control_Messages_Scopes_Aggregate = {
  __typename?: 'race_control_messages_scopes_aggregate';
  aggregate?: Maybe<Race_Control_Messages_Scopes_Aggregate_Fields>;
  nodes: Array<Race_Control_Messages_Scopes>;
};

/** aggregate fields of "race_control_messages_scopes" */
export type Race_Control_Messages_Scopes_Aggregate_Fields = {
  __typename?: 'race_control_messages_scopes_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Race_Control_Messages_Scopes_Max_Fields>;
  min?: Maybe<Race_Control_Messages_Scopes_Min_Fields>;
};

/** aggregate fields of "race_control_messages_scopes" */
export type Race_Control_Messages_Scopes_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Race_Control_Messages_Scopes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "race_control_messages_scopes". All fields are combined with a logical 'AND'. */
export type Race_Control_Messages_Scopes_Bool_Exp = {
  _and?: InputMaybe<Array<Race_Control_Messages_Scopes_Bool_Exp>>;
  _not?: InputMaybe<Race_Control_Messages_Scopes_Bool_Exp>;
  _or?: InputMaybe<Array<Race_Control_Messages_Scopes_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  race_control_messages?: InputMaybe<Race_Control_Messages_Bool_Exp>;
  race_control_messages_aggregate?: InputMaybe<Race_Control_Messages_Aggregate_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "race_control_messages_scopes" */
export enum Race_Control_Messages_Scopes_Constraint {
  /** unique or primary key constraint on columns "value" */
  RaceControlMessagesScopesPkey = 'race_control_messages_scopes_pkey',
}

export enum Race_Control_Messages_Scopes_Enum {
  /** Driver scope */
  Driver = 'Driver',
  /** Sector scope */
  Sector = 'Sector',
  /** Track scope */
  Track = 'Track',
}

/** Boolean expression to compare columns of type "race_control_messages_scopes_enum". All fields are combined with logical 'AND'. */
export type Race_Control_Messages_Scopes_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Race_Control_Messages_Scopes_Enum>;
  _in?: InputMaybe<Array<Race_Control_Messages_Scopes_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Race_Control_Messages_Scopes_Enum>;
  _nin?: InputMaybe<Array<Race_Control_Messages_Scopes_Enum>>;
};

/** input type for inserting data into table "race_control_messages_scopes" */
export type Race_Control_Messages_Scopes_Insert_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  race_control_messages?: InputMaybe<Race_Control_Messages_Arr_Rel_Insert_Input>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Race_Control_Messages_Scopes_Max_Fields = {
  __typename?: 'race_control_messages_scopes_max_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Race_Control_Messages_Scopes_Min_Fields = {
  __typename?: 'race_control_messages_scopes_min_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "race_control_messages_scopes" */
export type Race_Control_Messages_Scopes_Mutation_Response = {
  __typename?: 'race_control_messages_scopes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Race_Control_Messages_Scopes>;
};

/** input type for inserting object relation for remote table "race_control_messages_scopes" */
export type Race_Control_Messages_Scopes_Obj_Rel_Insert_Input = {
  data: Race_Control_Messages_Scopes_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Race_Control_Messages_Scopes_On_Conflict>;
};

/** on_conflict condition type for table "race_control_messages_scopes" */
export type Race_Control_Messages_Scopes_On_Conflict = {
  constraint: Race_Control_Messages_Scopes_Constraint;
  update_columns?: Array<Race_Control_Messages_Scopes_Update_Column>;
  where?: InputMaybe<Race_Control_Messages_Scopes_Bool_Exp>;
};

/** Ordering options when selecting data from "race_control_messages_scopes". */
export type Race_Control_Messages_Scopes_Order_By = {
  comment?: InputMaybe<Order_By>;
  race_control_messages_aggregate?: InputMaybe<Race_Control_Messages_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: race_control_messages_scopes */
export type Race_Control_Messages_Scopes_Pk_Columns_Input = {
  value: Scalars['String']['input'];
};

/** select columns of table "race_control_messages_scopes" */
export enum Race_Control_Messages_Scopes_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value',
}

/** input type for updating data in table "race_control_messages_scopes" */
export type Race_Control_Messages_Scopes_Set_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "race_control_messages_scopes" */
export type Race_Control_Messages_Scopes_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Race_Control_Messages_Scopes_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Race_Control_Messages_Scopes_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "race_control_messages_scopes" */
export enum Race_Control_Messages_Scopes_Update_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value',
}

export type Race_Control_Messages_Scopes_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Race_Control_Messages_Scopes_Set_Input>;
  /** filter the rows which have to be updated */
  where: Race_Control_Messages_Scopes_Bool_Exp;
};

/** select columns of table "race_control_messages" */
export enum Race_Control_Messages_Select_Column {
  /** column name */
  Category = 'category',
  /** column name */
  Flag = 'flag',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  RacingNumber = 'racing_number',
  /** column name */
  Scope = 'scope',
  /** column name */
  Sector = 'sector',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  Status = 'status',
  /** column name */
  Time = 'time',
}

/** input type for updating data in table "race_control_messages" */
export type Race_Control_Messages_Set_Input = {
  category?: InputMaybe<Race_Control_Messages_Categories_Enum>;
  flag?: InputMaybe<Race_Control_Messages_Flags_Enum>;
  id?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  racing_number?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Race_Control_Messages_Scopes_Enum>;
  sector?: InputMaybe<Scalars['numeric']['input']>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Race_Control_Messages_Stddev_Fields = {
  __typename?: 'race_control_messages_stddev_fields';
  sector?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "race_control_messages" */
export type Race_Control_Messages_Stddev_Order_By = {
  sector?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Race_Control_Messages_Stddev_Pop_Fields = {
  __typename?: 'race_control_messages_stddev_pop_fields';
  sector?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "race_control_messages" */
export type Race_Control_Messages_Stddev_Pop_Order_By = {
  sector?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Race_Control_Messages_Stddev_Samp_Fields = {
  __typename?: 'race_control_messages_stddev_samp_fields';
  sector?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "race_control_messages" */
export type Race_Control_Messages_Stddev_Samp_Order_By = {
  sector?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "race_control_messages" */
export type Race_Control_Messages_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Race_Control_Messages_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Race_Control_Messages_Stream_Cursor_Value_Input = {
  category?: InputMaybe<Race_Control_Messages_Categories_Enum>;
  flag?: InputMaybe<Race_Control_Messages_Flags_Enum>;
  id?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  racing_number?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Race_Control_Messages_Scopes_Enum>;
  sector?: InputMaybe<Scalars['numeric']['input']>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Race_Control_Messages_Sum_Fields = {
  __typename?: 'race_control_messages_sum_fields';
  sector?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "race_control_messages" */
export type Race_Control_Messages_Sum_Order_By = {
  sector?: InputMaybe<Order_By>;
};

/** update columns of table "race_control_messages" */
export enum Race_Control_Messages_Update_Column {
  /** column name */
  Category = 'category',
  /** column name */
  Flag = 'flag',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  RacingNumber = 'racing_number',
  /** column name */
  Scope = 'scope',
  /** column name */
  Sector = 'sector',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  Status = 'status',
  /** column name */
  Time = 'time',
}

export type Race_Control_Messages_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Race_Control_Messages_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Race_Control_Messages_Set_Input>;
  /** filter the rows which have to be updated */
  where: Race_Control_Messages_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Race_Control_Messages_Var_Pop_Fields = {
  __typename?: 'race_control_messages_var_pop_fields';
  sector?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "race_control_messages" */
export type Race_Control_Messages_Var_Pop_Order_By = {
  sector?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Race_Control_Messages_Var_Samp_Fields = {
  __typename?: 'race_control_messages_var_samp_fields';
  sector?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "race_control_messages" */
export type Race_Control_Messages_Var_Samp_Order_By = {
  sector?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Race_Control_Messages_Variance_Fields = {
  __typename?: 'race_control_messages_variance_fields';
  sector?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "race_control_messages" */
export type Race_Control_Messages_Variance_Order_By = {
  sector?: InputMaybe<Order_By>;
};

/** columns and relationships of "results" */
export type Results = {
  __typename?: 'results';
  /** This is either an INTEGER value if the driver is officially classified or one of “R” (retired), “D” (disqualified), “E” (excluded), “W” (withdrawn), “F” (failed to qualify) or “N” (not classified) */
  classified_position?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  driver_session?: Maybe<Driver_Sessions>;
  driver_session_id?: Maybe<Scalars['String']['output']>;
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: Maybe<Scalars['Int']['output']>;
  grid_position?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  laps?: Maybe<Scalars['numeric']['output']>;
  points?: Maybe<Scalars['numeric']['output']>;
  q1_time?: Maybe<Scalars['bigint']['output']>;
  q2_time?: Maybe<Scalars['bigint']['output']>;
  q3_time?: Maybe<Scalars['bigint']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  total_race_time?: Maybe<Scalars['bigint']['output']>;
};

/** aggregated selection of "results" */
export type Results_Aggregate = {
  __typename?: 'results_aggregate';
  aggregate?: Maybe<Results_Aggregate_Fields>;
  nodes: Array<Results>;
};

export type Results_Aggregate_Bool_Exp = {
  count?: InputMaybe<Results_Aggregate_Bool_Exp_Count>;
};

export type Results_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Results_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Results_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "results" */
export type Results_Aggregate_Fields = {
  __typename?: 'results_aggregate_fields';
  avg?: Maybe<Results_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Results_Max_Fields>;
  min?: Maybe<Results_Min_Fields>;
  stddev?: Maybe<Results_Stddev_Fields>;
  stddev_pop?: Maybe<Results_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Results_Stddev_Samp_Fields>;
  sum?: Maybe<Results_Sum_Fields>;
  var_pop?: Maybe<Results_Var_Pop_Fields>;
  var_samp?: Maybe<Results_Var_Samp_Fields>;
  variance?: Maybe<Results_Variance_Fields>;
};

/** aggregate fields of "results" */
export type Results_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Results_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "results" */
export type Results_Aggregate_Order_By = {
  avg?: InputMaybe<Results_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Results_Max_Order_By>;
  min?: InputMaybe<Results_Min_Order_By>;
  stddev?: InputMaybe<Results_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Results_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Results_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Results_Sum_Order_By>;
  var_pop?: InputMaybe<Results_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Results_Var_Samp_Order_By>;
  variance?: InputMaybe<Results_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "results" */
export type Results_Arr_Rel_Insert_Input = {
  data: Array<Results_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Results_On_Conflict>;
};

/** aggregate avg on columns */
export type Results_Avg_Fields = {
  __typename?: 'results_avg_fields';
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: Maybe<Scalars['Float']['output']>;
  grid_position?: Maybe<Scalars['Float']['output']>;
  laps?: Maybe<Scalars['Float']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  q1_time?: Maybe<Scalars['Float']['output']>;
  q2_time?: Maybe<Scalars['Float']['output']>;
  q3_time?: Maybe<Scalars['Float']['output']>;
  total_race_time?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "results" */
export type Results_Avg_Order_By = {
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Order_By>;
  grid_position?: InputMaybe<Order_By>;
  laps?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  q1_time?: InputMaybe<Order_By>;
  q2_time?: InputMaybe<Order_By>;
  q3_time?: InputMaybe<Order_By>;
  total_race_time?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "results". All fields are combined with a logical 'AND'. */
export type Results_Bool_Exp = {
  _and?: InputMaybe<Array<Results_Bool_Exp>>;
  _not?: InputMaybe<Results_Bool_Exp>;
  _or?: InputMaybe<Array<Results_Bool_Exp>>;
  classified_position?: InputMaybe<String_Comparison_Exp>;
  driver_session?: InputMaybe<Driver_Sessions_Bool_Exp>;
  driver_session_id?: InputMaybe<String_Comparison_Exp>;
  finishing_position?: InputMaybe<Int_Comparison_Exp>;
  grid_position?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  laps?: InputMaybe<Numeric_Comparison_Exp>;
  points?: InputMaybe<Numeric_Comparison_Exp>;
  q1_time?: InputMaybe<Bigint_Comparison_Exp>;
  q2_time?: InputMaybe<Bigint_Comparison_Exp>;
  q3_time?: InputMaybe<Bigint_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  total_race_time?: InputMaybe<Bigint_Comparison_Exp>;
};

/** unique or primary key constraints on table "results" */
export enum Results_Constraint {
  /** unique or primary key constraint on columns "id" */
  ResultsPkey = 'results_pkey',
}

/** input type for incrementing numeric columns in table "results" */
export type Results_Inc_Input = {
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Scalars['Int']['input']>;
  grid_position?: InputMaybe<Scalars['Int']['input']>;
  laps?: InputMaybe<Scalars['numeric']['input']>;
  points?: InputMaybe<Scalars['numeric']['input']>;
  q1_time?: InputMaybe<Scalars['bigint']['input']>;
  q2_time?: InputMaybe<Scalars['bigint']['input']>;
  q3_time?: InputMaybe<Scalars['bigint']['input']>;
  total_race_time?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "results" */
export type Results_Insert_Input = {
  /** This is either an INTEGER value if the driver is officially classified or one of “R” (retired), “D” (disqualified), “E” (excluded), “W” (withdrawn), “F” (failed to qualify) or “N” (not classified) */
  classified_position?: InputMaybe<Scalars['String']['input']>;
  driver_session?: InputMaybe<Driver_Sessions_Obj_Rel_Insert_Input>;
  driver_session_id?: InputMaybe<Scalars['String']['input']>;
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Scalars['Int']['input']>;
  grid_position?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  laps?: InputMaybe<Scalars['numeric']['input']>;
  points?: InputMaybe<Scalars['numeric']['input']>;
  q1_time?: InputMaybe<Scalars['bigint']['input']>;
  q2_time?: InputMaybe<Scalars['bigint']['input']>;
  q3_time?: InputMaybe<Scalars['bigint']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  total_race_time?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate max on columns */
export type Results_Max_Fields = {
  __typename?: 'results_max_fields';
  /** This is either an INTEGER value if the driver is officially classified or one of “R” (retired), “D” (disqualified), “E” (excluded), “W” (withdrawn), “F” (failed to qualify) or “N” (not classified) */
  classified_position?: Maybe<Scalars['String']['output']>;
  driver_session_id?: Maybe<Scalars['String']['output']>;
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: Maybe<Scalars['Int']['output']>;
  grid_position?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  laps?: Maybe<Scalars['numeric']['output']>;
  points?: Maybe<Scalars['numeric']['output']>;
  q1_time?: Maybe<Scalars['bigint']['output']>;
  q2_time?: Maybe<Scalars['bigint']['output']>;
  q3_time?: Maybe<Scalars['bigint']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  total_race_time?: Maybe<Scalars['bigint']['output']>;
};

/** order by max() on columns of table "results" */
export type Results_Max_Order_By = {
  /** This is either an INTEGER value if the driver is officially classified or one of “R” (retired), “D” (disqualified), “E” (excluded), “W” (withdrawn), “F” (failed to qualify) or “N” (not classified) */
  classified_position?: InputMaybe<Order_By>;
  driver_session_id?: InputMaybe<Order_By>;
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Order_By>;
  grid_position?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  laps?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  q1_time?: InputMaybe<Order_By>;
  q2_time?: InputMaybe<Order_By>;
  q3_time?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  total_race_time?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Results_Min_Fields = {
  __typename?: 'results_min_fields';
  /** This is either an INTEGER value if the driver is officially classified or one of “R” (retired), “D” (disqualified), “E” (excluded), “W” (withdrawn), “F” (failed to qualify) or “N” (not classified) */
  classified_position?: Maybe<Scalars['String']['output']>;
  driver_session_id?: Maybe<Scalars['String']['output']>;
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: Maybe<Scalars['Int']['output']>;
  grid_position?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  laps?: Maybe<Scalars['numeric']['output']>;
  points?: Maybe<Scalars['numeric']['output']>;
  q1_time?: Maybe<Scalars['bigint']['output']>;
  q2_time?: Maybe<Scalars['bigint']['output']>;
  q3_time?: Maybe<Scalars['bigint']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  total_race_time?: Maybe<Scalars['bigint']['output']>;
};

/** order by min() on columns of table "results" */
export type Results_Min_Order_By = {
  /** This is either an INTEGER value if the driver is officially classified or one of “R” (retired), “D” (disqualified), “E” (excluded), “W” (withdrawn), “F” (failed to qualify) or “N” (not classified) */
  classified_position?: InputMaybe<Order_By>;
  driver_session_id?: InputMaybe<Order_By>;
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Order_By>;
  grid_position?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  laps?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  q1_time?: InputMaybe<Order_By>;
  q2_time?: InputMaybe<Order_By>;
  q3_time?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  total_race_time?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "results" */
export type Results_Mutation_Response = {
  __typename?: 'results_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Results>;
};

/** on_conflict condition type for table "results" */
export type Results_On_Conflict = {
  constraint: Results_Constraint;
  update_columns?: Array<Results_Update_Column>;
  where?: InputMaybe<Results_Bool_Exp>;
};

/** Ordering options when selecting data from "results". */
export type Results_Order_By = {
  classified_position?: InputMaybe<Order_By>;
  driver_session?: InputMaybe<Driver_Sessions_Order_By>;
  driver_session_id?: InputMaybe<Order_By>;
  finishing_position?: InputMaybe<Order_By>;
  grid_position?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  laps?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  q1_time?: InputMaybe<Order_By>;
  q2_time?: InputMaybe<Order_By>;
  q3_time?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  total_race_time?: InputMaybe<Order_By>;
};

/** primary key columns input for table: results */
export type Results_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "results" */
export enum Results_Select_Column {
  /** column name */
  ClassifiedPosition = 'classified_position',
  /** column name */
  DriverSessionId = 'driver_session_id',
  /** column name */
  FinishingPosition = 'finishing_position',
  /** column name */
  GridPosition = 'grid_position',
  /** column name */
  Id = 'id',
  /** column name */
  Laps = 'laps',
  /** column name */
  Points = 'points',
  /** column name */
  Q1Time = 'q1_time',
  /** column name */
  Q2Time = 'q2_time',
  /** column name */
  Q3Time = 'q3_time',
  /** column name */
  Status = 'status',
  /** column name */
  TotalRaceTime = 'total_race_time',
}

/** input type for updating data in table "results" */
export type Results_Set_Input = {
  /** This is either an INTEGER value if the driver is officially classified or one of “R” (retired), “D” (disqualified), “E” (excluded), “W” (withdrawn), “F” (failed to qualify) or “N” (not classified) */
  classified_position?: InputMaybe<Scalars['String']['input']>;
  driver_session_id?: InputMaybe<Scalars['String']['input']>;
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Scalars['Int']['input']>;
  grid_position?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  laps?: InputMaybe<Scalars['numeric']['input']>;
  points?: InputMaybe<Scalars['numeric']['input']>;
  q1_time?: InputMaybe<Scalars['bigint']['input']>;
  q2_time?: InputMaybe<Scalars['bigint']['input']>;
  q3_time?: InputMaybe<Scalars['bigint']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  total_race_time?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate stddev on columns */
export type Results_Stddev_Fields = {
  __typename?: 'results_stddev_fields';
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: Maybe<Scalars['Float']['output']>;
  grid_position?: Maybe<Scalars['Float']['output']>;
  laps?: Maybe<Scalars['Float']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  q1_time?: Maybe<Scalars['Float']['output']>;
  q2_time?: Maybe<Scalars['Float']['output']>;
  q3_time?: Maybe<Scalars['Float']['output']>;
  total_race_time?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "results" */
export type Results_Stddev_Order_By = {
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Order_By>;
  grid_position?: InputMaybe<Order_By>;
  laps?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  q1_time?: InputMaybe<Order_By>;
  q2_time?: InputMaybe<Order_By>;
  q3_time?: InputMaybe<Order_By>;
  total_race_time?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Results_Stddev_Pop_Fields = {
  __typename?: 'results_stddev_pop_fields';
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: Maybe<Scalars['Float']['output']>;
  grid_position?: Maybe<Scalars['Float']['output']>;
  laps?: Maybe<Scalars['Float']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  q1_time?: Maybe<Scalars['Float']['output']>;
  q2_time?: Maybe<Scalars['Float']['output']>;
  q3_time?: Maybe<Scalars['Float']['output']>;
  total_race_time?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "results" */
export type Results_Stddev_Pop_Order_By = {
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Order_By>;
  grid_position?: InputMaybe<Order_By>;
  laps?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  q1_time?: InputMaybe<Order_By>;
  q2_time?: InputMaybe<Order_By>;
  q3_time?: InputMaybe<Order_By>;
  total_race_time?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Results_Stddev_Samp_Fields = {
  __typename?: 'results_stddev_samp_fields';
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: Maybe<Scalars['Float']['output']>;
  grid_position?: Maybe<Scalars['Float']['output']>;
  laps?: Maybe<Scalars['Float']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  q1_time?: Maybe<Scalars['Float']['output']>;
  q2_time?: Maybe<Scalars['Float']['output']>;
  q3_time?: Maybe<Scalars['Float']['output']>;
  total_race_time?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "results" */
export type Results_Stddev_Samp_Order_By = {
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Order_By>;
  grid_position?: InputMaybe<Order_By>;
  laps?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  q1_time?: InputMaybe<Order_By>;
  q2_time?: InputMaybe<Order_By>;
  q3_time?: InputMaybe<Order_By>;
  total_race_time?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "results" */
export type Results_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Results_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Results_Stream_Cursor_Value_Input = {
  /** This is either an INTEGER value if the driver is officially classified or one of “R” (retired), “D” (disqualified), “E” (excluded), “W” (withdrawn), “F” (failed to qualify) or “N” (not classified) */
  classified_position?: InputMaybe<Scalars['String']['input']>;
  driver_session_id?: InputMaybe<Scalars['String']['input']>;
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Scalars['Int']['input']>;
  grid_position?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  laps?: InputMaybe<Scalars['numeric']['input']>;
  points?: InputMaybe<Scalars['numeric']['input']>;
  q1_time?: InputMaybe<Scalars['bigint']['input']>;
  q2_time?: InputMaybe<Scalars['bigint']['input']>;
  q3_time?: InputMaybe<Scalars['bigint']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  total_race_time?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate sum on columns */
export type Results_Sum_Fields = {
  __typename?: 'results_sum_fields';
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: Maybe<Scalars['Int']['output']>;
  grid_position?: Maybe<Scalars['Int']['output']>;
  laps?: Maybe<Scalars['numeric']['output']>;
  points?: Maybe<Scalars['numeric']['output']>;
  q1_time?: Maybe<Scalars['bigint']['output']>;
  q2_time?: Maybe<Scalars['bigint']['output']>;
  q3_time?: Maybe<Scalars['bigint']['output']>;
  total_race_time?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "results" */
export type Results_Sum_Order_By = {
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Order_By>;
  grid_position?: InputMaybe<Order_By>;
  laps?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  q1_time?: InputMaybe<Order_By>;
  q2_time?: InputMaybe<Order_By>;
  q3_time?: InputMaybe<Order_By>;
  total_race_time?: InputMaybe<Order_By>;
};

/** update columns of table "results" */
export enum Results_Update_Column {
  /** column name */
  ClassifiedPosition = 'classified_position',
  /** column name */
  DriverSessionId = 'driver_session_id',
  /** column name */
  FinishingPosition = 'finishing_position',
  /** column name */
  GridPosition = 'grid_position',
  /** column name */
  Id = 'id',
  /** column name */
  Laps = 'laps',
  /** column name */
  Points = 'points',
  /** column name */
  Q1Time = 'q1_time',
  /** column name */
  Q2Time = 'q2_time',
  /** column name */
  Q3Time = 'q3_time',
  /** column name */
  Status = 'status',
  /** column name */
  TotalRaceTime = 'total_race_time',
}

export type Results_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Results_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Results_Set_Input>;
  /** filter the rows which have to be updated */
  where: Results_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Results_Var_Pop_Fields = {
  __typename?: 'results_var_pop_fields';
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: Maybe<Scalars['Float']['output']>;
  grid_position?: Maybe<Scalars['Float']['output']>;
  laps?: Maybe<Scalars['Float']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  q1_time?: Maybe<Scalars['Float']['output']>;
  q2_time?: Maybe<Scalars['Float']['output']>;
  q3_time?: Maybe<Scalars['Float']['output']>;
  total_race_time?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "results" */
export type Results_Var_Pop_Order_By = {
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Order_By>;
  grid_position?: InputMaybe<Order_By>;
  laps?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  q1_time?: InputMaybe<Order_By>;
  q2_time?: InputMaybe<Order_By>;
  q3_time?: InputMaybe<Order_By>;
  total_race_time?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Results_Var_Samp_Fields = {
  __typename?: 'results_var_samp_fields';
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: Maybe<Scalars['Float']['output']>;
  grid_position?: Maybe<Scalars['Float']['output']>;
  laps?: Maybe<Scalars['Float']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  q1_time?: Maybe<Scalars['Float']['output']>;
  q2_time?: Maybe<Scalars['Float']['output']>;
  q3_time?: Maybe<Scalars['Float']['output']>;
  total_race_time?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "results" */
export type Results_Var_Samp_Order_By = {
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Order_By>;
  grid_position?: InputMaybe<Order_By>;
  laps?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  q1_time?: InputMaybe<Order_By>;
  q2_time?: InputMaybe<Order_By>;
  q3_time?: InputMaybe<Order_By>;
  total_race_time?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Results_Variance_Fields = {
  __typename?: 'results_variance_fields';
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: Maybe<Scalars['Float']['output']>;
  grid_position?: Maybe<Scalars['Float']['output']>;
  laps?: Maybe<Scalars['Float']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  q1_time?: Maybe<Scalars['Float']['output']>;
  q2_time?: Maybe<Scalars['Float']['output']>;
  q3_time?: Maybe<Scalars['Float']['output']>;
  total_race_time?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "results" */
export type Results_Variance_Order_By = {
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Order_By>;
  grid_position?: InputMaybe<Order_By>;
  laps?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  q1_time?: InputMaybe<Order_By>;
  q2_time?: InputMaybe<Order_By>;
  q3_time?: InputMaybe<Order_By>;
  total_race_time?: InputMaybe<Order_By>;
};

/** columns and relationships of "schedule" */
export type Schedule = {
  __typename?: 'schedule';
  country?: Maybe<Scalars['String']['output']>;
  event_date?: Maybe<Scalars['String']['output']>;
  event_format?: Maybe<Event_Format_Choices_Enum>;
  /** An object relationship */
  event_format_choice?: Maybe<Event_Format_Choices>;
  event_name?: Maybe<Scalars['String']['output']>;
  f1_api_support?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
  latitude?: Maybe<Scalars['numeric']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['numeric']['output']>;
  official_event_name?: Maybe<Scalars['String']['output']>;
  round_number?: Maybe<Scalars['Int']['output']>;
  session1?: Maybe<Session_Name_Choices_Enum>;
  session1_date?: Maybe<Scalars['String']['output']>;
  session1_date_utc?: Maybe<Scalars['String']['output']>;
  session2?: Maybe<Session_Name_Choices_Enum>;
  session2_date?: Maybe<Scalars['String']['output']>;
  session2_date_utc?: Maybe<Scalars['String']['output']>;
  session3?: Maybe<Session_Name_Choices_Enum>;
  session3_date?: Maybe<Scalars['String']['output']>;
  session3_date_utc?: Maybe<Scalars['String']['output']>;
  session4?: Maybe<Session_Name_Choices_Enum>;
  session4_date?: Maybe<Scalars['String']['output']>;
  session4_date_utc?: Maybe<Scalars['String']['output']>;
  session5?: Maybe<Session_Name_Choices_Enum>;
  session5_date?: Maybe<Scalars['String']['output']>;
  session5_date_utc?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  sessionNameChoiceBySession2?: Maybe<Session_Name_Choices>;
  /** An object relationship */
  sessionNameChoiceBySession3?: Maybe<Session_Name_Choices>;
  /** An object relationship */
  sessionNameChoiceBySession4?: Maybe<Session_Name_Choices>;
  /** An object relationship */
  sessionNameChoiceBySession5?: Maybe<Session_Name_Choices>;
  /** An object relationship */
  session_name_choice?: Maybe<Session_Name_Choices>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** aggregated selection of "schedule" */
export type Schedule_Aggregate = {
  __typename?: 'schedule_aggregate';
  aggregate?: Maybe<Schedule_Aggregate_Fields>;
  nodes: Array<Schedule>;
};

export type Schedule_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Schedule_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Schedule_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Schedule_Aggregate_Bool_Exp_Count>;
};

export type Schedule_Aggregate_Bool_Exp_Bool_And = {
  arguments: Schedule_Select_Column_Schedule_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Schedule_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Schedule_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Schedule_Select_Column_Schedule_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Schedule_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Schedule_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Schedule_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Schedule_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "schedule" */
export type Schedule_Aggregate_Fields = {
  __typename?: 'schedule_aggregate_fields';
  avg?: Maybe<Schedule_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Schedule_Max_Fields>;
  min?: Maybe<Schedule_Min_Fields>;
  stddev?: Maybe<Schedule_Stddev_Fields>;
  stddev_pop?: Maybe<Schedule_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Schedule_Stddev_Samp_Fields>;
  sum?: Maybe<Schedule_Sum_Fields>;
  var_pop?: Maybe<Schedule_Var_Pop_Fields>;
  var_samp?: Maybe<Schedule_Var_Samp_Fields>;
  variance?: Maybe<Schedule_Variance_Fields>;
};

/** aggregate fields of "schedule" */
export type Schedule_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Schedule_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "schedule" */
export type Schedule_Aggregate_Order_By = {
  avg?: InputMaybe<Schedule_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Schedule_Max_Order_By>;
  min?: InputMaybe<Schedule_Min_Order_By>;
  stddev?: InputMaybe<Schedule_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Schedule_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Schedule_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Schedule_Sum_Order_By>;
  var_pop?: InputMaybe<Schedule_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Schedule_Var_Samp_Order_By>;
  variance?: InputMaybe<Schedule_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "schedule" */
export type Schedule_Arr_Rel_Insert_Input = {
  data: Array<Schedule_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Schedule_On_Conflict>;
};

/** aggregate avg on columns */
export type Schedule_Avg_Fields = {
  __typename?: 'schedule_avg_fields';
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "schedule" */
export type Schedule_Avg_Order_By = {
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "schedule". All fields are combined with a logical 'AND'. */
export type Schedule_Bool_Exp = {
  _and?: InputMaybe<Array<Schedule_Bool_Exp>>;
  _not?: InputMaybe<Schedule_Bool_Exp>;
  _or?: InputMaybe<Array<Schedule_Bool_Exp>>;
  country?: InputMaybe<String_Comparison_Exp>;
  event_date?: InputMaybe<String_Comparison_Exp>;
  event_format?: InputMaybe<Event_Format_Choices_Enum_Comparison_Exp>;
  event_format_choice?: InputMaybe<Event_Format_Choices_Bool_Exp>;
  event_name?: InputMaybe<String_Comparison_Exp>;
  f1_api_support?: InputMaybe<Boolean_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  latitude?: InputMaybe<Numeric_Comparison_Exp>;
  location?: InputMaybe<String_Comparison_Exp>;
  longitude?: InputMaybe<Numeric_Comparison_Exp>;
  official_event_name?: InputMaybe<String_Comparison_Exp>;
  round_number?: InputMaybe<Int_Comparison_Exp>;
  session1?: InputMaybe<Session_Name_Choices_Enum_Comparison_Exp>;
  session1_date?: InputMaybe<String_Comparison_Exp>;
  session1_date_utc?: InputMaybe<String_Comparison_Exp>;
  session2?: InputMaybe<Session_Name_Choices_Enum_Comparison_Exp>;
  session2_date?: InputMaybe<String_Comparison_Exp>;
  session2_date_utc?: InputMaybe<String_Comparison_Exp>;
  session3?: InputMaybe<Session_Name_Choices_Enum_Comparison_Exp>;
  session3_date?: InputMaybe<String_Comparison_Exp>;
  session3_date_utc?: InputMaybe<String_Comparison_Exp>;
  session4?: InputMaybe<Session_Name_Choices_Enum_Comparison_Exp>;
  session4_date?: InputMaybe<String_Comparison_Exp>;
  session4_date_utc?: InputMaybe<String_Comparison_Exp>;
  session5?: InputMaybe<Session_Name_Choices_Enum_Comparison_Exp>;
  session5_date?: InputMaybe<String_Comparison_Exp>;
  session5_date_utc?: InputMaybe<String_Comparison_Exp>;
  sessionNameChoiceBySession2?: InputMaybe<Session_Name_Choices_Bool_Exp>;
  sessionNameChoiceBySession3?: InputMaybe<Session_Name_Choices_Bool_Exp>;
  sessionNameChoiceBySession4?: InputMaybe<Session_Name_Choices_Bool_Exp>;
  sessionNameChoiceBySession5?: InputMaybe<Session_Name_Choices_Bool_Exp>;
  session_name_choice?: InputMaybe<Session_Name_Choices_Bool_Exp>;
  year?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "schedule" */
export enum Schedule_Constraint {
  /** unique or primary key constraint on columns "id" */
  SchedulePkey = 'schedule_pkey',
}

/** input type for incrementing numeric columns in table "schedule" */
export type Schedule_Inc_Input = {
  latitude?: InputMaybe<Scalars['numeric']['input']>;
  longitude?: InputMaybe<Scalars['numeric']['input']>;
  round_number?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "schedule" */
export type Schedule_Insert_Input = {
  country?: InputMaybe<Scalars['String']['input']>;
  event_date?: InputMaybe<Scalars['String']['input']>;
  event_format?: InputMaybe<Event_Format_Choices_Enum>;
  event_format_choice?: InputMaybe<Event_Format_Choices_Obj_Rel_Insert_Input>;
  event_name?: InputMaybe<Scalars['String']['input']>;
  f1_api_support?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['numeric']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['numeric']['input']>;
  official_event_name?: InputMaybe<Scalars['String']['input']>;
  round_number?: InputMaybe<Scalars['Int']['input']>;
  session1?: InputMaybe<Session_Name_Choices_Enum>;
  session1_date?: InputMaybe<Scalars['String']['input']>;
  session1_date_utc?: InputMaybe<Scalars['String']['input']>;
  session2?: InputMaybe<Session_Name_Choices_Enum>;
  session2_date?: InputMaybe<Scalars['String']['input']>;
  session2_date_utc?: InputMaybe<Scalars['String']['input']>;
  session3?: InputMaybe<Session_Name_Choices_Enum>;
  session3_date?: InputMaybe<Scalars['String']['input']>;
  session3_date_utc?: InputMaybe<Scalars['String']['input']>;
  session4?: InputMaybe<Session_Name_Choices_Enum>;
  session4_date?: InputMaybe<Scalars['String']['input']>;
  session4_date_utc?: InputMaybe<Scalars['String']['input']>;
  session5?: InputMaybe<Session_Name_Choices_Enum>;
  session5_date?: InputMaybe<Scalars['String']['input']>;
  session5_date_utc?: InputMaybe<Scalars['String']['input']>;
  sessionNameChoiceBySession2?: InputMaybe<Session_Name_Choices_Obj_Rel_Insert_Input>;
  sessionNameChoiceBySession3?: InputMaybe<Session_Name_Choices_Obj_Rel_Insert_Input>;
  sessionNameChoiceBySession4?: InputMaybe<Session_Name_Choices_Obj_Rel_Insert_Input>;
  sessionNameChoiceBySession5?: InputMaybe<Session_Name_Choices_Obj_Rel_Insert_Input>;
  session_name_choice?: InputMaybe<Session_Name_Choices_Obj_Rel_Insert_Input>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Schedule_Max_Fields = {
  __typename?: 'schedule_max_fields';
  country?: Maybe<Scalars['String']['output']>;
  event_date?: Maybe<Scalars['String']['output']>;
  event_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  latitude?: Maybe<Scalars['numeric']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['numeric']['output']>;
  official_event_name?: Maybe<Scalars['String']['output']>;
  round_number?: Maybe<Scalars['Int']['output']>;
  session1_date?: Maybe<Scalars['String']['output']>;
  session1_date_utc?: Maybe<Scalars['String']['output']>;
  session2_date?: Maybe<Scalars['String']['output']>;
  session2_date_utc?: Maybe<Scalars['String']['output']>;
  session3_date?: Maybe<Scalars['String']['output']>;
  session3_date_utc?: Maybe<Scalars['String']['output']>;
  session4_date?: Maybe<Scalars['String']['output']>;
  session4_date_utc?: Maybe<Scalars['String']['output']>;
  session5_date?: Maybe<Scalars['String']['output']>;
  session5_date_utc?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "schedule" */
export type Schedule_Max_Order_By = {
  country?: InputMaybe<Order_By>;
  event_date?: InputMaybe<Order_By>;
  event_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  official_event_name?: InputMaybe<Order_By>;
  round_number?: InputMaybe<Order_By>;
  session1_date?: InputMaybe<Order_By>;
  session1_date_utc?: InputMaybe<Order_By>;
  session2_date?: InputMaybe<Order_By>;
  session2_date_utc?: InputMaybe<Order_By>;
  session3_date?: InputMaybe<Order_By>;
  session3_date_utc?: InputMaybe<Order_By>;
  session4_date?: InputMaybe<Order_By>;
  session4_date_utc?: InputMaybe<Order_By>;
  session5_date?: InputMaybe<Order_By>;
  session5_date_utc?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Schedule_Min_Fields = {
  __typename?: 'schedule_min_fields';
  country?: Maybe<Scalars['String']['output']>;
  event_date?: Maybe<Scalars['String']['output']>;
  event_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  latitude?: Maybe<Scalars['numeric']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['numeric']['output']>;
  official_event_name?: Maybe<Scalars['String']['output']>;
  round_number?: Maybe<Scalars['Int']['output']>;
  session1_date?: Maybe<Scalars['String']['output']>;
  session1_date_utc?: Maybe<Scalars['String']['output']>;
  session2_date?: Maybe<Scalars['String']['output']>;
  session2_date_utc?: Maybe<Scalars['String']['output']>;
  session3_date?: Maybe<Scalars['String']['output']>;
  session3_date_utc?: Maybe<Scalars['String']['output']>;
  session4_date?: Maybe<Scalars['String']['output']>;
  session4_date_utc?: Maybe<Scalars['String']['output']>;
  session5_date?: Maybe<Scalars['String']['output']>;
  session5_date_utc?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "schedule" */
export type Schedule_Min_Order_By = {
  country?: InputMaybe<Order_By>;
  event_date?: InputMaybe<Order_By>;
  event_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  official_event_name?: InputMaybe<Order_By>;
  round_number?: InputMaybe<Order_By>;
  session1_date?: InputMaybe<Order_By>;
  session1_date_utc?: InputMaybe<Order_By>;
  session2_date?: InputMaybe<Order_By>;
  session2_date_utc?: InputMaybe<Order_By>;
  session3_date?: InputMaybe<Order_By>;
  session3_date_utc?: InputMaybe<Order_By>;
  session4_date?: InputMaybe<Order_By>;
  session4_date_utc?: InputMaybe<Order_By>;
  session5_date?: InputMaybe<Order_By>;
  session5_date_utc?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "schedule" */
export type Schedule_Mutation_Response = {
  __typename?: 'schedule_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Schedule>;
};

/** on_conflict condition type for table "schedule" */
export type Schedule_On_Conflict = {
  constraint: Schedule_Constraint;
  update_columns?: Array<Schedule_Update_Column>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

/** Ordering options when selecting data from "schedule". */
export type Schedule_Order_By = {
  country?: InputMaybe<Order_By>;
  event_date?: InputMaybe<Order_By>;
  event_format?: InputMaybe<Order_By>;
  event_format_choice?: InputMaybe<Event_Format_Choices_Order_By>;
  event_name?: InputMaybe<Order_By>;
  f1_api_support?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  official_event_name?: InputMaybe<Order_By>;
  round_number?: InputMaybe<Order_By>;
  session1?: InputMaybe<Order_By>;
  session1_date?: InputMaybe<Order_By>;
  session1_date_utc?: InputMaybe<Order_By>;
  session2?: InputMaybe<Order_By>;
  session2_date?: InputMaybe<Order_By>;
  session2_date_utc?: InputMaybe<Order_By>;
  session3?: InputMaybe<Order_By>;
  session3_date?: InputMaybe<Order_By>;
  session3_date_utc?: InputMaybe<Order_By>;
  session4?: InputMaybe<Order_By>;
  session4_date?: InputMaybe<Order_By>;
  session4_date_utc?: InputMaybe<Order_By>;
  session5?: InputMaybe<Order_By>;
  session5_date?: InputMaybe<Order_By>;
  session5_date_utc?: InputMaybe<Order_By>;
  sessionNameChoiceBySession2?: InputMaybe<Session_Name_Choices_Order_By>;
  sessionNameChoiceBySession3?: InputMaybe<Session_Name_Choices_Order_By>;
  sessionNameChoiceBySession4?: InputMaybe<Session_Name_Choices_Order_By>;
  sessionNameChoiceBySession5?: InputMaybe<Session_Name_Choices_Order_By>;
  session_name_choice?: InputMaybe<Session_Name_Choices_Order_By>;
  year?: InputMaybe<Order_By>;
};

/** primary key columns input for table: schedule */
export type Schedule_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "schedule" */
export enum Schedule_Select_Column {
  /** column name */
  Country = 'country',
  /** column name */
  EventDate = 'event_date',
  /** column name */
  EventFormat = 'event_format',
  /** column name */
  EventName = 'event_name',
  /** column name */
  F1ApiSupport = 'f1_api_support',
  /** column name */
  Id = 'id',
  /** column name */
  Latitude = 'latitude',
  /** column name */
  Location = 'location',
  /** column name */
  Longitude = 'longitude',
  /** column name */
  OfficialEventName = 'official_event_name',
  /** column name */
  RoundNumber = 'round_number',
  /** column name */
  Session1 = 'session1',
  /** column name */
  Session1Date = 'session1_date',
  /** column name */
  Session1DateUtc = 'session1_date_utc',
  /** column name */
  Session2 = 'session2',
  /** column name */
  Session2Date = 'session2_date',
  /** column name */
  Session2DateUtc = 'session2_date_utc',
  /** column name */
  Session3 = 'session3',
  /** column name */
  Session3Date = 'session3_date',
  /** column name */
  Session3DateUtc = 'session3_date_utc',
  /** column name */
  Session4 = 'session4',
  /** column name */
  Session4Date = 'session4_date',
  /** column name */
  Session4DateUtc = 'session4_date_utc',
  /** column name */
  Session5 = 'session5',
  /** column name */
  Session5Date = 'session5_date',
  /** column name */
  Session5DateUtc = 'session5_date_utc',
  /** column name */
  Year = 'year',
}

/** select "schedule_aggregate_bool_exp_bool_and_arguments_columns" columns of table "schedule" */
export enum Schedule_Select_Column_Schedule_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  F1ApiSupport = 'f1_api_support',
}

/** select "schedule_aggregate_bool_exp_bool_or_arguments_columns" columns of table "schedule" */
export enum Schedule_Select_Column_Schedule_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  F1ApiSupport = 'f1_api_support',
}

/** input type for updating data in table "schedule" */
export type Schedule_Set_Input = {
  country?: InputMaybe<Scalars['String']['input']>;
  event_date?: InputMaybe<Scalars['String']['input']>;
  event_format?: InputMaybe<Event_Format_Choices_Enum>;
  event_name?: InputMaybe<Scalars['String']['input']>;
  f1_api_support?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['numeric']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['numeric']['input']>;
  official_event_name?: InputMaybe<Scalars['String']['input']>;
  round_number?: InputMaybe<Scalars['Int']['input']>;
  session1?: InputMaybe<Session_Name_Choices_Enum>;
  session1_date?: InputMaybe<Scalars['String']['input']>;
  session1_date_utc?: InputMaybe<Scalars['String']['input']>;
  session2?: InputMaybe<Session_Name_Choices_Enum>;
  session2_date?: InputMaybe<Scalars['String']['input']>;
  session2_date_utc?: InputMaybe<Scalars['String']['input']>;
  session3?: InputMaybe<Session_Name_Choices_Enum>;
  session3_date?: InputMaybe<Scalars['String']['input']>;
  session3_date_utc?: InputMaybe<Scalars['String']['input']>;
  session4?: InputMaybe<Session_Name_Choices_Enum>;
  session4_date?: InputMaybe<Scalars['String']['input']>;
  session4_date_utc?: InputMaybe<Scalars['String']['input']>;
  session5?: InputMaybe<Session_Name_Choices_Enum>;
  session5_date?: InputMaybe<Scalars['String']['input']>;
  session5_date_utc?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Schedule_Stddev_Fields = {
  __typename?: 'schedule_stddev_fields';
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "schedule" */
export type Schedule_Stddev_Order_By = {
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Schedule_Stddev_Pop_Fields = {
  __typename?: 'schedule_stddev_pop_fields';
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "schedule" */
export type Schedule_Stddev_Pop_Order_By = {
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Schedule_Stddev_Samp_Fields = {
  __typename?: 'schedule_stddev_samp_fields';
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "schedule" */
export type Schedule_Stddev_Samp_Order_By = {
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "schedule" */
export type Schedule_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Schedule_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Schedule_Stream_Cursor_Value_Input = {
  country?: InputMaybe<Scalars['String']['input']>;
  event_date?: InputMaybe<Scalars['String']['input']>;
  event_format?: InputMaybe<Event_Format_Choices_Enum>;
  event_name?: InputMaybe<Scalars['String']['input']>;
  f1_api_support?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['numeric']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['numeric']['input']>;
  official_event_name?: InputMaybe<Scalars['String']['input']>;
  round_number?: InputMaybe<Scalars['Int']['input']>;
  session1?: InputMaybe<Session_Name_Choices_Enum>;
  session1_date?: InputMaybe<Scalars['String']['input']>;
  session1_date_utc?: InputMaybe<Scalars['String']['input']>;
  session2?: InputMaybe<Session_Name_Choices_Enum>;
  session2_date?: InputMaybe<Scalars['String']['input']>;
  session2_date_utc?: InputMaybe<Scalars['String']['input']>;
  session3?: InputMaybe<Session_Name_Choices_Enum>;
  session3_date?: InputMaybe<Scalars['String']['input']>;
  session3_date_utc?: InputMaybe<Scalars['String']['input']>;
  session4?: InputMaybe<Session_Name_Choices_Enum>;
  session4_date?: InputMaybe<Scalars['String']['input']>;
  session4_date_utc?: InputMaybe<Scalars['String']['input']>;
  session5?: InputMaybe<Session_Name_Choices_Enum>;
  session5_date?: InputMaybe<Scalars['String']['input']>;
  session5_date_utc?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Schedule_Sum_Fields = {
  __typename?: 'schedule_sum_fields';
  latitude?: Maybe<Scalars['numeric']['output']>;
  longitude?: Maybe<Scalars['numeric']['output']>;
  round_number?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "schedule" */
export type Schedule_Sum_Order_By = {
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** update columns of table "schedule" */
export enum Schedule_Update_Column {
  /** column name */
  Country = 'country',
  /** column name */
  EventDate = 'event_date',
  /** column name */
  EventFormat = 'event_format',
  /** column name */
  EventName = 'event_name',
  /** column name */
  F1ApiSupport = 'f1_api_support',
  /** column name */
  Id = 'id',
  /** column name */
  Latitude = 'latitude',
  /** column name */
  Location = 'location',
  /** column name */
  Longitude = 'longitude',
  /** column name */
  OfficialEventName = 'official_event_name',
  /** column name */
  RoundNumber = 'round_number',
  /** column name */
  Session1 = 'session1',
  /** column name */
  Session1Date = 'session1_date',
  /** column name */
  Session1DateUtc = 'session1_date_utc',
  /** column name */
  Session2 = 'session2',
  /** column name */
  Session2Date = 'session2_date',
  /** column name */
  Session2DateUtc = 'session2_date_utc',
  /** column name */
  Session3 = 'session3',
  /** column name */
  Session3Date = 'session3_date',
  /** column name */
  Session3DateUtc = 'session3_date_utc',
  /** column name */
  Session4 = 'session4',
  /** column name */
  Session4Date = 'session4_date',
  /** column name */
  Session4DateUtc = 'session4_date_utc',
  /** column name */
  Session5 = 'session5',
  /** column name */
  Session5Date = 'session5_date',
  /** column name */
  Session5DateUtc = 'session5_date_utc',
  /** column name */
  Year = 'year',
}

export type Schedule_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Schedule_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Schedule_Set_Input>;
  /** filter the rows which have to be updated */
  where: Schedule_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Schedule_Var_Pop_Fields = {
  __typename?: 'schedule_var_pop_fields';
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "schedule" */
export type Schedule_Var_Pop_Order_By = {
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Schedule_Var_Samp_Fields = {
  __typename?: 'schedule_var_samp_fields';
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "schedule" */
export type Schedule_Var_Samp_Order_By = {
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Schedule_Variance_Fields = {
  __typename?: 'schedule_variance_fields';
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "schedule" */
export type Schedule_Variance_Order_By = {
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** columns and relationships of "session_name_choices" */
export type Session_Name_Choices = {
  __typename?: 'session_name_choices';
  comment?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  schedules: Array<Schedule>;
  /** An array relationship */
  schedulesBySession2: Array<Schedule>;
  /** An aggregate relationship */
  schedulesBySession2_aggregate: Schedule_Aggregate;
  /** An array relationship */
  schedulesBySession3: Array<Schedule>;
  /** An aggregate relationship */
  schedulesBySession3_aggregate: Schedule_Aggregate;
  /** An array relationship */
  schedulesBySession4: Array<Schedule>;
  /** An aggregate relationship */
  schedulesBySession4_aggregate: Schedule_Aggregate;
  /** An array relationship */
  schedulesBySession5: Array<Schedule>;
  /** An aggregate relationship */
  schedulesBySession5_aggregate: Schedule_Aggregate;
  /** An aggregate relationship */
  schedules_aggregate: Schedule_Aggregate;
  /** An array relationship */
  sessions: Array<Sessions>;
  /** An aggregate relationship */
  sessions_aggregate: Sessions_Aggregate;
  value: Scalars['String']['output'];
};

/** columns and relationships of "session_name_choices" */
export type Session_Name_ChoicesSchedulesArgs = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

/** columns and relationships of "session_name_choices" */
export type Session_Name_ChoicesSchedulesBySession2Args = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

/** columns and relationships of "session_name_choices" */
export type Session_Name_ChoicesSchedulesBySession2_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

/** columns and relationships of "session_name_choices" */
export type Session_Name_ChoicesSchedulesBySession3Args = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

/** columns and relationships of "session_name_choices" */
export type Session_Name_ChoicesSchedulesBySession3_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

/** columns and relationships of "session_name_choices" */
export type Session_Name_ChoicesSchedulesBySession4Args = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

/** columns and relationships of "session_name_choices" */
export type Session_Name_ChoicesSchedulesBySession4_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

/** columns and relationships of "session_name_choices" */
export type Session_Name_ChoicesSchedulesBySession5Args = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

/** columns and relationships of "session_name_choices" */
export type Session_Name_ChoicesSchedulesBySession5_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

/** columns and relationships of "session_name_choices" */
export type Session_Name_ChoicesSchedules_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

/** columns and relationships of "session_name_choices" */
export type Session_Name_ChoicesSessionsArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

/** columns and relationships of "session_name_choices" */
export type Session_Name_ChoicesSessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

/** aggregated selection of "session_name_choices" */
export type Session_Name_Choices_Aggregate = {
  __typename?: 'session_name_choices_aggregate';
  aggregate?: Maybe<Session_Name_Choices_Aggregate_Fields>;
  nodes: Array<Session_Name_Choices>;
};

/** aggregate fields of "session_name_choices" */
export type Session_Name_Choices_Aggregate_Fields = {
  __typename?: 'session_name_choices_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Session_Name_Choices_Max_Fields>;
  min?: Maybe<Session_Name_Choices_Min_Fields>;
};

/** aggregate fields of "session_name_choices" */
export type Session_Name_Choices_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Session_Name_Choices_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "session_name_choices". All fields are combined with a logical 'AND'. */
export type Session_Name_Choices_Bool_Exp = {
  _and?: InputMaybe<Array<Session_Name_Choices_Bool_Exp>>;
  _not?: InputMaybe<Session_Name_Choices_Bool_Exp>;
  _or?: InputMaybe<Array<Session_Name_Choices_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  schedules?: InputMaybe<Schedule_Bool_Exp>;
  schedulesBySession2?: InputMaybe<Schedule_Bool_Exp>;
  schedulesBySession2_aggregate?: InputMaybe<Schedule_Aggregate_Bool_Exp>;
  schedulesBySession3?: InputMaybe<Schedule_Bool_Exp>;
  schedulesBySession3_aggregate?: InputMaybe<Schedule_Aggregate_Bool_Exp>;
  schedulesBySession4?: InputMaybe<Schedule_Bool_Exp>;
  schedulesBySession4_aggregate?: InputMaybe<Schedule_Aggregate_Bool_Exp>;
  schedulesBySession5?: InputMaybe<Schedule_Bool_Exp>;
  schedulesBySession5_aggregate?: InputMaybe<Schedule_Aggregate_Bool_Exp>;
  schedules_aggregate?: InputMaybe<Schedule_Aggregate_Bool_Exp>;
  sessions?: InputMaybe<Sessions_Bool_Exp>;
  sessions_aggregate?: InputMaybe<Sessions_Aggregate_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "session_name_choices" */
export enum Session_Name_Choices_Constraint {
  /** unique or primary key constraint on columns "value" */
  SessionNameChoicesPkey = 'session_name_choices_pkey',
}

export enum Session_Name_Choices_Enum {
  /** Practice 1 session */
  Practice_1 = 'Practice_1',
  /** Practice 2 session */
  Practice_2 = 'Practice_2',
  /** Practice 3 session */
  Practice_3 = 'Practice_3',
  /** Qualifying session */
  Qualifying = 'Qualifying',
  /** Race session */
  Race = 'Race',
  /** Sprint session */
  Sprint = 'Sprint',
  /** Sprint Qualifying session */
  SprintQualifying = 'Sprint_Qualifying',
  /** Sprint Shootout session */
  SprintShootout = 'Sprint_Shootout',
  /** Test session */
  TestSession = 'Test_Session',
}

/** Boolean expression to compare columns of type "session_name_choices_enum". All fields are combined with logical 'AND'. */
export type Session_Name_Choices_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Session_Name_Choices_Enum>;
  _in?: InputMaybe<Array<Session_Name_Choices_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Session_Name_Choices_Enum>;
  _nin?: InputMaybe<Array<Session_Name_Choices_Enum>>;
};

/** input type for inserting data into table "session_name_choices" */
export type Session_Name_Choices_Insert_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  schedules?: InputMaybe<Schedule_Arr_Rel_Insert_Input>;
  schedulesBySession2?: InputMaybe<Schedule_Arr_Rel_Insert_Input>;
  schedulesBySession3?: InputMaybe<Schedule_Arr_Rel_Insert_Input>;
  schedulesBySession4?: InputMaybe<Schedule_Arr_Rel_Insert_Input>;
  schedulesBySession5?: InputMaybe<Schedule_Arr_Rel_Insert_Input>;
  sessions?: InputMaybe<Sessions_Arr_Rel_Insert_Input>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Session_Name_Choices_Max_Fields = {
  __typename?: 'session_name_choices_max_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Session_Name_Choices_Min_Fields = {
  __typename?: 'session_name_choices_min_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "session_name_choices" */
export type Session_Name_Choices_Mutation_Response = {
  __typename?: 'session_name_choices_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Session_Name_Choices>;
};

/** input type for inserting object relation for remote table "session_name_choices" */
export type Session_Name_Choices_Obj_Rel_Insert_Input = {
  data: Session_Name_Choices_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Session_Name_Choices_On_Conflict>;
};

/** on_conflict condition type for table "session_name_choices" */
export type Session_Name_Choices_On_Conflict = {
  constraint: Session_Name_Choices_Constraint;
  update_columns?: Array<Session_Name_Choices_Update_Column>;
  where?: InputMaybe<Session_Name_Choices_Bool_Exp>;
};

/** Ordering options when selecting data from "session_name_choices". */
export type Session_Name_Choices_Order_By = {
  comment?: InputMaybe<Order_By>;
  schedulesBySession2_aggregate?: InputMaybe<Schedule_Aggregate_Order_By>;
  schedulesBySession3_aggregate?: InputMaybe<Schedule_Aggregate_Order_By>;
  schedulesBySession4_aggregate?: InputMaybe<Schedule_Aggregate_Order_By>;
  schedulesBySession5_aggregate?: InputMaybe<Schedule_Aggregate_Order_By>;
  schedules_aggregate?: InputMaybe<Schedule_Aggregate_Order_By>;
  sessions_aggregate?: InputMaybe<Sessions_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: session_name_choices */
export type Session_Name_Choices_Pk_Columns_Input = {
  value: Scalars['String']['input'];
};

/** select columns of table "session_name_choices" */
export enum Session_Name_Choices_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value',
}

/** input type for updating data in table "session_name_choices" */
export type Session_Name_Choices_Set_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "session_name_choices" */
export type Session_Name_Choices_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Session_Name_Choices_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Session_Name_Choices_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "session_name_choices" */
export enum Session_Name_Choices_Update_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value',
}

export type Session_Name_Choices_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Session_Name_Choices_Set_Input>;
  /** filter the rows which have to be updated */
  where: Session_Name_Choices_Bool_Exp;
};

/** columns and relationships of "sessions" */
export type Sessions = {
  __typename?: 'sessions';
  /** An object relationship */
  circuit?: Maybe<Circuits>;
  circuit_id?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  driver_sessions: Array<Driver_Sessions>;
  /** An aggregate relationship */
  driver_sessions_aggregate: Driver_Sessions_Aggregate;
  /** An object relationship */
  event?: Maybe<Events>;
  event_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name?: Maybe<Session_Name_Choices_Enum>;
  /** An array relationship */
  race_control_messages: Array<Race_Control_Messages>;
  /** An aggregate relationship */
  race_control_messages_aggregate: Race_Control_Messages_Aggregate;
  scheduled_start_time?: Maybe<Scalars['String']['output']>;
  scheduled_start_time_utc?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  session_name_choice?: Maybe<Session_Name_Choices>;
  start_time?: Maybe<Scalars['numeric']['output']>;
  total_laps?: Maybe<Scalars['Int']['output']>;
  /** An array relationship */
  track_statuses: Array<Track_Status>;
  /** An aggregate relationship */
  track_statuses_aggregate: Track_Status_Aggregate;
  /** An array relationship */
  weather_data: Array<Weather_Data>;
  /** An aggregate relationship */
  weather_data_aggregate: Weather_Data_Aggregate;
};

/** columns and relationships of "sessions" */
export type SessionsDriver_SessionsArgs = {
  distinct_on?: InputMaybe<Array<Driver_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Sessions_Order_By>>;
  where?: InputMaybe<Driver_Sessions_Bool_Exp>;
};

/** columns and relationships of "sessions" */
export type SessionsDriver_Sessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Driver_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Sessions_Order_By>>;
  where?: InputMaybe<Driver_Sessions_Bool_Exp>;
};

/** columns and relationships of "sessions" */
export type SessionsRace_Control_MessagesArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
};

/** columns and relationships of "sessions" */
export type SessionsRace_Control_Messages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
};

/** columns and relationships of "sessions" */
export type SessionsTrack_StatusesArgs = {
  distinct_on?: InputMaybe<Array<Track_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Track_Status_Order_By>>;
  where?: InputMaybe<Track_Status_Bool_Exp>;
};

/** columns and relationships of "sessions" */
export type SessionsTrack_Statuses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Track_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Track_Status_Order_By>>;
  where?: InputMaybe<Track_Status_Bool_Exp>;
};

/** columns and relationships of "sessions" */
export type SessionsWeather_DataArgs = {
  distinct_on?: InputMaybe<Array<Weather_Data_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Weather_Data_Order_By>>;
  where?: InputMaybe<Weather_Data_Bool_Exp>;
};

/** columns and relationships of "sessions" */
export type SessionsWeather_Data_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Weather_Data_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Weather_Data_Order_By>>;
  where?: InputMaybe<Weather_Data_Bool_Exp>;
};

/** aggregated selection of "sessions" */
export type Sessions_Aggregate = {
  __typename?: 'sessions_aggregate';
  aggregate?: Maybe<Sessions_Aggregate_Fields>;
  nodes: Array<Sessions>;
};

export type Sessions_Aggregate_Bool_Exp = {
  count?: InputMaybe<Sessions_Aggregate_Bool_Exp_Count>;
};

export type Sessions_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Sessions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Sessions_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "sessions" */
export type Sessions_Aggregate_Fields = {
  __typename?: 'sessions_aggregate_fields';
  avg?: Maybe<Sessions_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Sessions_Max_Fields>;
  min?: Maybe<Sessions_Min_Fields>;
  stddev?: Maybe<Sessions_Stddev_Fields>;
  stddev_pop?: Maybe<Sessions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Sessions_Stddev_Samp_Fields>;
  sum?: Maybe<Sessions_Sum_Fields>;
  var_pop?: Maybe<Sessions_Var_Pop_Fields>;
  var_samp?: Maybe<Sessions_Var_Samp_Fields>;
  variance?: Maybe<Sessions_Variance_Fields>;
};

/** aggregate fields of "sessions" */
export type Sessions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Sessions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "sessions" */
export type Sessions_Aggregate_Order_By = {
  avg?: InputMaybe<Sessions_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Sessions_Max_Order_By>;
  min?: InputMaybe<Sessions_Min_Order_By>;
  stddev?: InputMaybe<Sessions_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Sessions_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Sessions_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Sessions_Sum_Order_By>;
  var_pop?: InputMaybe<Sessions_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Sessions_Var_Samp_Order_By>;
  variance?: InputMaybe<Sessions_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "sessions" */
export type Sessions_Arr_Rel_Insert_Input = {
  data: Array<Sessions_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Sessions_On_Conflict>;
};

/** aggregate avg on columns */
export type Sessions_Avg_Fields = {
  __typename?: 'sessions_avg_fields';
  start_time?: Maybe<Scalars['Float']['output']>;
  total_laps?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "sessions" */
export type Sessions_Avg_Order_By = {
  start_time?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "sessions". All fields are combined with a logical 'AND'. */
export type Sessions_Bool_Exp = {
  _and?: InputMaybe<Array<Sessions_Bool_Exp>>;
  _not?: InputMaybe<Sessions_Bool_Exp>;
  _or?: InputMaybe<Array<Sessions_Bool_Exp>>;
  circuit?: InputMaybe<Circuits_Bool_Exp>;
  circuit_id?: InputMaybe<String_Comparison_Exp>;
  date?: InputMaybe<String_Comparison_Exp>;
  driver_sessions?: InputMaybe<Driver_Sessions_Bool_Exp>;
  driver_sessions_aggregate?: InputMaybe<Driver_Sessions_Aggregate_Bool_Exp>;
  event?: InputMaybe<Events_Bool_Exp>;
  event_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<Session_Name_Choices_Enum_Comparison_Exp>;
  race_control_messages?: InputMaybe<Race_Control_Messages_Bool_Exp>;
  race_control_messages_aggregate?: InputMaybe<Race_Control_Messages_Aggregate_Bool_Exp>;
  scheduled_start_time?: InputMaybe<String_Comparison_Exp>;
  scheduled_start_time_utc?: InputMaybe<String_Comparison_Exp>;
  session_name_choice?: InputMaybe<Session_Name_Choices_Bool_Exp>;
  start_time?: InputMaybe<Numeric_Comparison_Exp>;
  total_laps?: InputMaybe<Int_Comparison_Exp>;
  track_statuses?: InputMaybe<Track_Status_Bool_Exp>;
  track_statuses_aggregate?: InputMaybe<Track_Status_Aggregate_Bool_Exp>;
  weather_data?: InputMaybe<Weather_Data_Bool_Exp>;
  weather_data_aggregate?: InputMaybe<Weather_Data_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "sessions" */
export enum Sessions_Constraint {
  /** unique or primary key constraint on columns "id" */
  SessionsPkey = 'sessions_pkey',
}

/** input type for incrementing numeric columns in table "sessions" */
export type Sessions_Inc_Input = {
  start_time?: InputMaybe<Scalars['numeric']['input']>;
  total_laps?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "sessions" */
export type Sessions_Insert_Input = {
  circuit?: InputMaybe<Circuits_Obj_Rel_Insert_Input>;
  circuit_id?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  driver_sessions?: InputMaybe<Driver_Sessions_Arr_Rel_Insert_Input>;
  event?: InputMaybe<Events_Obj_Rel_Insert_Input>;
  event_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Session_Name_Choices_Enum>;
  race_control_messages?: InputMaybe<Race_Control_Messages_Arr_Rel_Insert_Input>;
  scheduled_start_time?: InputMaybe<Scalars['String']['input']>;
  scheduled_start_time_utc?: InputMaybe<Scalars['String']['input']>;
  session_name_choice?: InputMaybe<Session_Name_Choices_Obj_Rel_Insert_Input>;
  start_time?: InputMaybe<Scalars['numeric']['input']>;
  total_laps?: InputMaybe<Scalars['Int']['input']>;
  track_statuses?: InputMaybe<Track_Status_Arr_Rel_Insert_Input>;
  weather_data?: InputMaybe<Weather_Data_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Sessions_Max_Fields = {
  __typename?: 'sessions_max_fields';
  circuit_id?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  event_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  scheduled_start_time?: Maybe<Scalars['String']['output']>;
  scheduled_start_time_utc?: Maybe<Scalars['String']['output']>;
  start_time?: Maybe<Scalars['numeric']['output']>;
  total_laps?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "sessions" */
export type Sessions_Max_Order_By = {
  circuit_id?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  scheduled_start_time?: InputMaybe<Order_By>;
  scheduled_start_time_utc?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Sessions_Min_Fields = {
  __typename?: 'sessions_min_fields';
  circuit_id?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  event_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  scheduled_start_time?: Maybe<Scalars['String']['output']>;
  scheduled_start_time_utc?: Maybe<Scalars['String']['output']>;
  start_time?: Maybe<Scalars['numeric']['output']>;
  total_laps?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "sessions" */
export type Sessions_Min_Order_By = {
  circuit_id?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  scheduled_start_time?: InputMaybe<Order_By>;
  scheduled_start_time_utc?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "sessions" */
export type Sessions_Mutation_Response = {
  __typename?: 'sessions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Sessions>;
};

/** input type for inserting object relation for remote table "sessions" */
export type Sessions_Obj_Rel_Insert_Input = {
  data: Sessions_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Sessions_On_Conflict>;
};

/** on_conflict condition type for table "sessions" */
export type Sessions_On_Conflict = {
  constraint: Sessions_Constraint;
  update_columns?: Array<Sessions_Update_Column>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

/** Ordering options when selecting data from "sessions". */
export type Sessions_Order_By = {
  circuit?: InputMaybe<Circuits_Order_By>;
  circuit_id?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  driver_sessions_aggregate?: InputMaybe<Driver_Sessions_Aggregate_Order_By>;
  event?: InputMaybe<Events_Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  race_control_messages_aggregate?: InputMaybe<Race_Control_Messages_Aggregate_Order_By>;
  scheduled_start_time?: InputMaybe<Order_By>;
  scheduled_start_time_utc?: InputMaybe<Order_By>;
  session_name_choice?: InputMaybe<Session_Name_Choices_Order_By>;
  start_time?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
  track_statuses_aggregate?: InputMaybe<Track_Status_Aggregate_Order_By>;
  weather_data_aggregate?: InputMaybe<Weather_Data_Aggregate_Order_By>;
};

/** primary key columns input for table: sessions */
export type Sessions_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "sessions" */
export enum Sessions_Select_Column {
  /** column name */
  CircuitId = 'circuit_id',
  /** column name */
  Date = 'date',
  /** column name */
  EventId = 'event_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  ScheduledStartTime = 'scheduled_start_time',
  /** column name */
  ScheduledStartTimeUtc = 'scheduled_start_time_utc',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  TotalLaps = 'total_laps',
}

/** input type for updating data in table "sessions" */
export type Sessions_Set_Input = {
  circuit_id?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  event_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Session_Name_Choices_Enum>;
  scheduled_start_time?: InputMaybe<Scalars['String']['input']>;
  scheduled_start_time_utc?: InputMaybe<Scalars['String']['input']>;
  start_time?: InputMaybe<Scalars['numeric']['input']>;
  total_laps?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Sessions_Stddev_Fields = {
  __typename?: 'sessions_stddev_fields';
  start_time?: Maybe<Scalars['Float']['output']>;
  total_laps?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "sessions" */
export type Sessions_Stddev_Order_By = {
  start_time?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Sessions_Stddev_Pop_Fields = {
  __typename?: 'sessions_stddev_pop_fields';
  start_time?: Maybe<Scalars['Float']['output']>;
  total_laps?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "sessions" */
export type Sessions_Stddev_Pop_Order_By = {
  start_time?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Sessions_Stddev_Samp_Fields = {
  __typename?: 'sessions_stddev_samp_fields';
  start_time?: Maybe<Scalars['Float']['output']>;
  total_laps?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "sessions" */
export type Sessions_Stddev_Samp_Order_By = {
  start_time?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "sessions" */
export type Sessions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Sessions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Sessions_Stream_Cursor_Value_Input = {
  circuit_id?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  event_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Session_Name_Choices_Enum>;
  scheduled_start_time?: InputMaybe<Scalars['String']['input']>;
  scheduled_start_time_utc?: InputMaybe<Scalars['String']['input']>;
  start_time?: InputMaybe<Scalars['numeric']['input']>;
  total_laps?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Sessions_Sum_Fields = {
  __typename?: 'sessions_sum_fields';
  start_time?: Maybe<Scalars['numeric']['output']>;
  total_laps?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "sessions" */
export type Sessions_Sum_Order_By = {
  start_time?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
};

/** update columns of table "sessions" */
export enum Sessions_Update_Column {
  /** column name */
  CircuitId = 'circuit_id',
  /** column name */
  Date = 'date',
  /** column name */
  EventId = 'event_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  ScheduledStartTime = 'scheduled_start_time',
  /** column name */
  ScheduledStartTimeUtc = 'scheduled_start_time_utc',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  TotalLaps = 'total_laps',
}

export type Sessions_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Sessions_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Sessions_Set_Input>;
  /** filter the rows which have to be updated */
  where: Sessions_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Sessions_Var_Pop_Fields = {
  __typename?: 'sessions_var_pop_fields';
  start_time?: Maybe<Scalars['Float']['output']>;
  total_laps?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "sessions" */
export type Sessions_Var_Pop_Order_By = {
  start_time?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Sessions_Var_Samp_Fields = {
  __typename?: 'sessions_var_samp_fields';
  start_time?: Maybe<Scalars['Float']['output']>;
  total_laps?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "sessions" */
export type Sessions_Var_Samp_Order_By = {
  start_time?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Sessions_Variance_Fields = {
  __typename?: 'sessions_variance_fields';
  start_time?: Maybe<Scalars['Float']['output']>;
  total_laps?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "sessions" */
export type Sessions_Variance_Order_By = {
  start_time?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "circuits" */
  circuits: Array<Circuits>;
  /** fetch aggregated fields from the table: "circuits" */
  circuits_aggregate: Circuits_Aggregate;
  /** fetch data from the table: "circuits" using primary key columns */
  circuits_by_pk?: Maybe<Circuits>;
  /** fetch data from the table in a streaming manner: "circuits" */
  circuits_stream: Array<Circuits>;
  /** An array relationship */
  constructor_standings: Array<Constructor_Standings>;
  /** An aggregate relationship */
  constructor_standings_aggregate: Constructor_Standings_Aggregate;
  /** fetch data from the table: "constructor_standings" using primary key columns */
  constructor_standings_by_pk?: Maybe<Constructor_Standings>;
  /** fetch data from the table in a streaming manner: "constructor_standings" */
  constructor_standings_stream: Array<Constructor_Standings>;
  /** fetch data from the table: "constructors" */
  constructors: Array<Constructors>;
  /** fetch aggregated fields from the table: "constructors" */
  constructors_aggregate: Constructors_Aggregate;
  /** fetch data from the table: "constructors" using primary key columns */
  constructors_by_pk?: Maybe<Constructors>;
  /** fetch data from the table in a streaming manner: "constructors" */
  constructors_stream: Array<Constructors>;
  /** An array relationship */
  driver_sessions: Array<Driver_Sessions>;
  /** An aggregate relationship */
  driver_sessions_aggregate: Driver_Sessions_Aggregate;
  /** fetch data from the table: "driver_sessions" using primary key columns */
  driver_sessions_by_pk?: Maybe<Driver_Sessions>;
  /** fetch data from the table in a streaming manner: "driver_sessions" */
  driver_sessions_stream: Array<Driver_Sessions>;
  /** An array relationship */
  driver_standings: Array<Driver_Standings>;
  /** An aggregate relationship */
  driver_standings_aggregate: Driver_Standings_Aggregate;
  /** fetch data from the table: "driver_standings" using primary key columns */
  driver_standings_by_pk?: Maybe<Driver_Standings>;
  /** fetch data from the table in a streaming manner: "driver_standings" */
  driver_standings_stream: Array<Driver_Standings>;
  /** fetch data from the table: "drivers" */
  drivers: Array<Drivers>;
  /** fetch aggregated fields from the table: "drivers" */
  drivers_aggregate: Drivers_Aggregate;
  /** fetch data from the table: "drivers" using primary key columns */
  drivers_by_pk?: Maybe<Drivers>;
  /** fetch data from the table in a streaming manner: "drivers" */
  drivers_stream: Array<Drivers>;
  /** fetch data from the table: "event_format_choices" */
  event_format_choices: Array<Event_Format_Choices>;
  /** fetch aggregated fields from the table: "event_format_choices" */
  event_format_choices_aggregate: Event_Format_Choices_Aggregate;
  /** fetch data from the table: "event_format_choices" using primary key columns */
  event_format_choices_by_pk?: Maybe<Event_Format_Choices>;
  /** fetch data from the table in a streaming manner: "event_format_choices" */
  event_format_choices_stream: Array<Event_Format_Choices>;
  /** An array relationship */
  events: Array<Events>;
  /** An aggregate relationship */
  events_aggregate: Events_Aggregate;
  /** fetch data from the table: "events" using primary key columns */
  events_by_pk?: Maybe<Events>;
  /** fetch data from the table in a streaming manner: "events" */
  events_stream: Array<Events>;
  /** fetch data from the table: "fia_documents" */
  fia_documents: Array<Fia_Documents>;
  /** fetch aggregated fields from the table: "fia_documents" */
  fia_documents_aggregate: Fia_Documents_Aggregate;
  /** fetch data from the table: "fia_documents" using primary key columns */
  fia_documents_by_pk?: Maybe<Fia_Documents>;
  /** fetch data from the table in a streaming manner: "fia_documents" */
  fia_documents_stream: Array<Fia_Documents>;
  /** An array relationship */
  laps: Array<Laps>;
  /** An aggregate relationship */
  laps_aggregate: Laps_Aggregate;
  /** fetch data from the table: "laps" using primary key columns */
  laps_by_pk?: Maybe<Laps>;
  /** fetch data from the table in a streaming manner: "laps" */
  laps_stream: Array<Laps>;
  /** An array relationship */
  race_control_messages: Array<Race_Control_Messages>;
  /** An aggregate relationship */
  race_control_messages_aggregate: Race_Control_Messages_Aggregate;
  /** fetch data from the table: "race_control_messages" using primary key columns */
  race_control_messages_by_pk?: Maybe<Race_Control_Messages>;
  /** fetch data from the table: "race_control_messages_categories" */
  race_control_messages_categories: Array<Race_Control_Messages_Categories>;
  /** fetch aggregated fields from the table: "race_control_messages_categories" */
  race_control_messages_categories_aggregate: Race_Control_Messages_Categories_Aggregate;
  /** fetch data from the table: "race_control_messages_categories" using primary key columns */
  race_control_messages_categories_by_pk?: Maybe<Race_Control_Messages_Categories>;
  /** fetch data from the table in a streaming manner: "race_control_messages_categories" */
  race_control_messages_categories_stream: Array<Race_Control_Messages_Categories>;
  /** fetch data from the table: "race_control_messages_flags" */
  race_control_messages_flags: Array<Race_Control_Messages_Flags>;
  /** fetch aggregated fields from the table: "race_control_messages_flags" */
  race_control_messages_flags_aggregate: Race_Control_Messages_Flags_Aggregate;
  /** fetch data from the table: "race_control_messages_flags" using primary key columns */
  race_control_messages_flags_by_pk?: Maybe<Race_Control_Messages_Flags>;
  /** fetch data from the table in a streaming manner: "race_control_messages_flags" */
  race_control_messages_flags_stream: Array<Race_Control_Messages_Flags>;
  /** fetch data from the table: "race_control_messages_scopes" */
  race_control_messages_scopes: Array<Race_Control_Messages_Scopes>;
  /** fetch aggregated fields from the table: "race_control_messages_scopes" */
  race_control_messages_scopes_aggregate: Race_Control_Messages_Scopes_Aggregate;
  /** fetch data from the table: "race_control_messages_scopes" using primary key columns */
  race_control_messages_scopes_by_pk?: Maybe<Race_Control_Messages_Scopes>;
  /** fetch data from the table in a streaming manner: "race_control_messages_scopes" */
  race_control_messages_scopes_stream: Array<Race_Control_Messages_Scopes>;
  /** fetch data from the table in a streaming manner: "race_control_messages" */
  race_control_messages_stream: Array<Race_Control_Messages>;
  /** An array relationship */
  results: Array<Results>;
  /** An aggregate relationship */
  results_aggregate: Results_Aggregate;
  /** fetch data from the table: "results" using primary key columns */
  results_by_pk?: Maybe<Results>;
  /** fetch data from the table in a streaming manner: "results" */
  results_stream: Array<Results>;
  /** fetch data from the table: "schedule" */
  schedule: Array<Schedule>;
  /** fetch aggregated fields from the table: "schedule" */
  schedule_aggregate: Schedule_Aggregate;
  /** fetch data from the table: "schedule" using primary key columns */
  schedule_by_pk?: Maybe<Schedule>;
  /** fetch data from the table in a streaming manner: "schedule" */
  schedule_stream: Array<Schedule>;
  /** fetch data from the table: "session_name_choices" */
  session_name_choices: Array<Session_Name_Choices>;
  /** fetch aggregated fields from the table: "session_name_choices" */
  session_name_choices_aggregate: Session_Name_Choices_Aggregate;
  /** fetch data from the table: "session_name_choices" using primary key columns */
  session_name_choices_by_pk?: Maybe<Session_Name_Choices>;
  /** fetch data from the table in a streaming manner: "session_name_choices" */
  session_name_choices_stream: Array<Session_Name_Choices>;
  /** An array relationship */
  sessions: Array<Sessions>;
  /** An aggregate relationship */
  sessions_aggregate: Sessions_Aggregate;
  /** fetch data from the table: "sessions" using primary key columns */
  sessions_by_pk?: Maybe<Sessions>;
  /** fetch data from the table in a streaming manner: "sessions" */
  sessions_stream: Array<Sessions>;
  /** fetch data from the table: "telemetry" */
  telemetry: Array<Telemetry>;
  /** fetch aggregated fields from the table: "telemetry" */
  telemetry_aggregate: Telemetry_Aggregate;
  /** fetch data from the table: "telemetry" using primary key columns */
  telemetry_by_pk?: Maybe<Telemetry>;
  /** fetch data from the table: "telemetry_car_status" */
  telemetry_car_status: Array<Telemetry_Car_Status>;
  /** fetch aggregated fields from the table: "telemetry_car_status" */
  telemetry_car_status_aggregate: Telemetry_Car_Status_Aggregate;
  /** fetch data from the table: "telemetry_car_status" using primary key columns */
  telemetry_car_status_by_pk?: Maybe<Telemetry_Car_Status>;
  /** fetch data from the table in a streaming manner: "telemetry_car_status" */
  telemetry_car_status_stream: Array<Telemetry_Car_Status>;
  /** fetch data from the table: "telemetry_sources" */
  telemetry_sources: Array<Telemetry_Sources>;
  /** fetch aggregated fields from the table: "telemetry_sources" */
  telemetry_sources_aggregate: Telemetry_Sources_Aggregate;
  /** fetch data from the table: "telemetry_sources" using primary key columns */
  telemetry_sources_by_pk?: Maybe<Telemetry_Sources>;
  /** fetch data from the table in a streaming manner: "telemetry_sources" */
  telemetry_sources_stream: Array<Telemetry_Sources>;
  /** fetch data from the table in a streaming manner: "telemetry" */
  telemetry_stream: Array<Telemetry>;
  /** fetch data from the table: "track_status" */
  track_status: Array<Track_Status>;
  /** fetch aggregated fields from the table: "track_status" */
  track_status_aggregate: Track_Status_Aggregate;
  /** fetch data from the table: "track_status" using primary key columns */
  track_status_by_pk?: Maybe<Track_Status>;
  /** fetch data from the table in a streaming manner: "track_status" */
  track_status_stream: Array<Track_Status>;
  /** fetch data from the table: "tyre_compounds" */
  tyre_compounds: Array<Tyre_Compounds>;
  /** fetch aggregated fields from the table: "tyre_compounds" */
  tyre_compounds_aggregate: Tyre_Compounds_Aggregate;
  /** fetch data from the table: "tyre_compounds" using primary key columns */
  tyre_compounds_by_pk?: Maybe<Tyre_Compounds>;
  /** fetch data from the table in a streaming manner: "tyre_compounds" */
  tyre_compounds_stream: Array<Tyre_Compounds>;
  /** An array relationship */
  weather_data: Array<Weather_Data>;
  /** An aggregate relationship */
  weather_data_aggregate: Weather_Data_Aggregate;
  /** fetch data from the table: "weather_data" using primary key columns */
  weather_data_by_pk?: Maybe<Weather_Data>;
  /** fetch data from the table in a streaming manner: "weather_data" */
  weather_data_stream: Array<Weather_Data>;
};

export type Subscription_RootCircuitsArgs = {
  distinct_on?: InputMaybe<Array<Circuits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Circuits_Order_By>>;
  where?: InputMaybe<Circuits_Bool_Exp>;
};

export type Subscription_RootCircuits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Circuits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Circuits_Order_By>>;
  where?: InputMaybe<Circuits_Bool_Exp>;
};

export type Subscription_RootCircuits_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootCircuits_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Circuits_Stream_Cursor_Input>>;
  where?: InputMaybe<Circuits_Bool_Exp>;
};

export type Subscription_RootConstructor_StandingsArgs = {
  distinct_on?: InputMaybe<Array<Constructor_Standings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Constructor_Standings_Order_By>>;
  where?: InputMaybe<Constructor_Standings_Bool_Exp>;
};

export type Subscription_RootConstructor_Standings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Constructor_Standings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Constructor_Standings_Order_By>>;
  where?: InputMaybe<Constructor_Standings_Bool_Exp>;
};

export type Subscription_RootConstructor_Standings_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootConstructor_Standings_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Constructor_Standings_Stream_Cursor_Input>>;
  where?: InputMaybe<Constructor_Standings_Bool_Exp>;
};

export type Subscription_RootConstructorsArgs = {
  distinct_on?: InputMaybe<Array<Constructors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Constructors_Order_By>>;
  where?: InputMaybe<Constructors_Bool_Exp>;
};

export type Subscription_RootConstructors_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Constructors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Constructors_Order_By>>;
  where?: InputMaybe<Constructors_Bool_Exp>;
};

export type Subscription_RootConstructors_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootConstructors_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Constructors_Stream_Cursor_Input>>;
  where?: InputMaybe<Constructors_Bool_Exp>;
};

export type Subscription_RootDriver_SessionsArgs = {
  distinct_on?: InputMaybe<Array<Driver_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Sessions_Order_By>>;
  where?: InputMaybe<Driver_Sessions_Bool_Exp>;
};

export type Subscription_RootDriver_Sessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Driver_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Sessions_Order_By>>;
  where?: InputMaybe<Driver_Sessions_Bool_Exp>;
};

export type Subscription_RootDriver_Sessions_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootDriver_Sessions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Driver_Sessions_Stream_Cursor_Input>>;
  where?: InputMaybe<Driver_Sessions_Bool_Exp>;
};

export type Subscription_RootDriver_StandingsArgs = {
  distinct_on?: InputMaybe<Array<Driver_Standings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Standings_Order_By>>;
  where?: InputMaybe<Driver_Standings_Bool_Exp>;
};

export type Subscription_RootDriver_Standings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Driver_Standings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Standings_Order_By>>;
  where?: InputMaybe<Driver_Standings_Bool_Exp>;
};

export type Subscription_RootDriver_Standings_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootDriver_Standings_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Driver_Standings_Stream_Cursor_Input>>;
  where?: InputMaybe<Driver_Standings_Bool_Exp>;
};

export type Subscription_RootDriversArgs = {
  distinct_on?: InputMaybe<Array<Drivers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Drivers_Order_By>>;
  where?: InputMaybe<Drivers_Bool_Exp>;
};

export type Subscription_RootDrivers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Drivers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Drivers_Order_By>>;
  where?: InputMaybe<Drivers_Bool_Exp>;
};

export type Subscription_RootDrivers_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootDrivers_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Drivers_Stream_Cursor_Input>>;
  where?: InputMaybe<Drivers_Bool_Exp>;
};

export type Subscription_RootEvent_Format_ChoicesArgs = {
  distinct_on?: InputMaybe<Array<Event_Format_Choices_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Format_Choices_Order_By>>;
  where?: InputMaybe<Event_Format_Choices_Bool_Exp>;
};

export type Subscription_RootEvent_Format_Choices_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Event_Format_Choices_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Format_Choices_Order_By>>;
  where?: InputMaybe<Event_Format_Choices_Bool_Exp>;
};

export type Subscription_RootEvent_Format_Choices_By_PkArgs = {
  value: Scalars['String']['input'];
};

export type Subscription_RootEvent_Format_Choices_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Event_Format_Choices_Stream_Cursor_Input>>;
  where?: InputMaybe<Event_Format_Choices_Bool_Exp>;
};

export type Subscription_RootEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};

export type Subscription_RootEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};

export type Subscription_RootEvents_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootEvents_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Events_Stream_Cursor_Input>>;
  where?: InputMaybe<Events_Bool_Exp>;
};

export type Subscription_RootFia_DocumentsArgs = {
  distinct_on?: InputMaybe<Array<Fia_Documents_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Fia_Documents_Order_By>>;
  where?: InputMaybe<Fia_Documents_Bool_Exp>;
};

export type Subscription_RootFia_Documents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Fia_Documents_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Fia_Documents_Order_By>>;
  where?: InputMaybe<Fia_Documents_Bool_Exp>;
};

export type Subscription_RootFia_Documents_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootFia_Documents_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Fia_Documents_Stream_Cursor_Input>>;
  where?: InputMaybe<Fia_Documents_Bool_Exp>;
};

export type Subscription_RootLapsArgs = {
  distinct_on?: InputMaybe<Array<Laps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Laps_Order_By>>;
  where?: InputMaybe<Laps_Bool_Exp>;
};

export type Subscription_RootLaps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Laps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Laps_Order_By>>;
  where?: InputMaybe<Laps_Bool_Exp>;
};

export type Subscription_RootLaps_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootLaps_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Laps_Stream_Cursor_Input>>;
  where?: InputMaybe<Laps_Bool_Exp>;
};

export type Subscription_RootRace_Control_MessagesArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
};

export type Subscription_RootRace_Control_Messages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
};

export type Subscription_RootRace_Control_Messages_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootRace_Control_Messages_CategoriesArgs = {
  distinct_on?: InputMaybe<
    Array<Race_Control_Messages_Categories_Select_Column>
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Categories_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Categories_Bool_Exp>;
};

export type Subscription_RootRace_Control_Messages_Categories_AggregateArgs = {
  distinct_on?: InputMaybe<
    Array<Race_Control_Messages_Categories_Select_Column>
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Categories_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Categories_Bool_Exp>;
};

export type Subscription_RootRace_Control_Messages_Categories_By_PkArgs = {
  value: Scalars['String']['input'];
};

export type Subscription_RootRace_Control_Messages_Categories_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<
    InputMaybe<Race_Control_Messages_Categories_Stream_Cursor_Input>
  >;
  where?: InputMaybe<Race_Control_Messages_Categories_Bool_Exp>;
};

export type Subscription_RootRace_Control_Messages_FlagsArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Flags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Flags_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Flags_Bool_Exp>;
};

export type Subscription_RootRace_Control_Messages_Flags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Flags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Flags_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Flags_Bool_Exp>;
};

export type Subscription_RootRace_Control_Messages_Flags_By_PkArgs = {
  value: Scalars['String']['input'];
};

export type Subscription_RootRace_Control_Messages_Flags_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Race_Control_Messages_Flags_Stream_Cursor_Input>>;
  where?: InputMaybe<Race_Control_Messages_Flags_Bool_Exp>;
};

export type Subscription_RootRace_Control_Messages_ScopesArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Scopes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Scopes_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Scopes_Bool_Exp>;
};

export type Subscription_RootRace_Control_Messages_Scopes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Scopes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Scopes_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Scopes_Bool_Exp>;
};

export type Subscription_RootRace_Control_Messages_Scopes_By_PkArgs = {
  value: Scalars['String']['input'];
};

export type Subscription_RootRace_Control_Messages_Scopes_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Race_Control_Messages_Scopes_Stream_Cursor_Input>>;
  where?: InputMaybe<Race_Control_Messages_Scopes_Bool_Exp>;
};

export type Subscription_RootRace_Control_Messages_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Race_Control_Messages_Stream_Cursor_Input>>;
  where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
};

export type Subscription_RootResultsArgs = {
  distinct_on?: InputMaybe<Array<Results_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Results_Order_By>>;
  where?: InputMaybe<Results_Bool_Exp>;
};

export type Subscription_RootResults_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Results_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Results_Order_By>>;
  where?: InputMaybe<Results_Bool_Exp>;
};

export type Subscription_RootResults_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootResults_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Results_Stream_Cursor_Input>>;
  where?: InputMaybe<Results_Bool_Exp>;
};

export type Subscription_RootScheduleArgs = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

export type Subscription_RootSchedule_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

export type Subscription_RootSchedule_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootSchedule_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Schedule_Stream_Cursor_Input>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

export type Subscription_RootSession_Name_ChoicesArgs = {
  distinct_on?: InputMaybe<Array<Session_Name_Choices_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Session_Name_Choices_Order_By>>;
  where?: InputMaybe<Session_Name_Choices_Bool_Exp>;
};

export type Subscription_RootSession_Name_Choices_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Session_Name_Choices_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Session_Name_Choices_Order_By>>;
  where?: InputMaybe<Session_Name_Choices_Bool_Exp>;
};

export type Subscription_RootSession_Name_Choices_By_PkArgs = {
  value: Scalars['String']['input'];
};

export type Subscription_RootSession_Name_Choices_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Session_Name_Choices_Stream_Cursor_Input>>;
  where?: InputMaybe<Session_Name_Choices_Bool_Exp>;
};

export type Subscription_RootSessionsArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

export type Subscription_RootSessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

export type Subscription_RootSessions_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootSessions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Sessions_Stream_Cursor_Input>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

export type Subscription_RootTelemetryArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Order_By>>;
  where?: InputMaybe<Telemetry_Bool_Exp>;
};

export type Subscription_RootTelemetry_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Order_By>>;
  where?: InputMaybe<Telemetry_Bool_Exp>;
};

export type Subscription_RootTelemetry_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootTelemetry_Car_StatusArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Car_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Car_Status_Order_By>>;
  where?: InputMaybe<Telemetry_Car_Status_Bool_Exp>;
};

export type Subscription_RootTelemetry_Car_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Car_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Car_Status_Order_By>>;
  where?: InputMaybe<Telemetry_Car_Status_Bool_Exp>;
};

export type Subscription_RootTelemetry_Car_Status_By_PkArgs = {
  value: Scalars['String']['input'];
};

export type Subscription_RootTelemetry_Car_Status_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Telemetry_Car_Status_Stream_Cursor_Input>>;
  where?: InputMaybe<Telemetry_Car_Status_Bool_Exp>;
};

export type Subscription_RootTelemetry_SourcesArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Sources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Sources_Order_By>>;
  where?: InputMaybe<Telemetry_Sources_Bool_Exp>;
};

export type Subscription_RootTelemetry_Sources_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Sources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Sources_Order_By>>;
  where?: InputMaybe<Telemetry_Sources_Bool_Exp>;
};

export type Subscription_RootTelemetry_Sources_By_PkArgs = {
  value: Scalars['String']['input'];
};

export type Subscription_RootTelemetry_Sources_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Telemetry_Sources_Stream_Cursor_Input>>;
  where?: InputMaybe<Telemetry_Sources_Bool_Exp>;
};

export type Subscription_RootTelemetry_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Telemetry_Stream_Cursor_Input>>;
  where?: InputMaybe<Telemetry_Bool_Exp>;
};

export type Subscription_RootTrack_StatusArgs = {
  distinct_on?: InputMaybe<Array<Track_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Track_Status_Order_By>>;
  where?: InputMaybe<Track_Status_Bool_Exp>;
};

export type Subscription_RootTrack_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Track_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Track_Status_Order_By>>;
  where?: InputMaybe<Track_Status_Bool_Exp>;
};

export type Subscription_RootTrack_Status_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootTrack_Status_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Track_Status_Stream_Cursor_Input>>;
  where?: InputMaybe<Track_Status_Bool_Exp>;
};

export type Subscription_RootTyre_CompoundsArgs = {
  distinct_on?: InputMaybe<Array<Tyre_Compounds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tyre_Compounds_Order_By>>;
  where?: InputMaybe<Tyre_Compounds_Bool_Exp>;
};

export type Subscription_RootTyre_Compounds_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tyre_Compounds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tyre_Compounds_Order_By>>;
  where?: InputMaybe<Tyre_Compounds_Bool_Exp>;
};

export type Subscription_RootTyre_Compounds_By_PkArgs = {
  value: Scalars['String']['input'];
};

export type Subscription_RootTyre_Compounds_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Tyre_Compounds_Stream_Cursor_Input>>;
  where?: InputMaybe<Tyre_Compounds_Bool_Exp>;
};

export type Subscription_RootWeather_DataArgs = {
  distinct_on?: InputMaybe<Array<Weather_Data_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Weather_Data_Order_By>>;
  where?: InputMaybe<Weather_Data_Bool_Exp>;
};

export type Subscription_RootWeather_Data_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Weather_Data_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Weather_Data_Order_By>>;
  where?: InputMaybe<Weather_Data_Bool_Exp>;
};

export type Subscription_RootWeather_Data_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootWeather_Data_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Weather_Data_Stream_Cursor_Input>>;
  where?: InputMaybe<Weather_Data_Bool_Exp>;
};

/** columns and relationships of "telemetry" */
export type Telemetry = {
  __typename?: 'telemetry';
  brake?: Maybe<Scalars['Boolean']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  distance?: Maybe<Scalars['numeric']['output']>;
  distance_to_driver_ahead?: Maybe<Scalars['numeric']['output']>;
  driver_ahead?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  driver_session?: Maybe<Driver_Sessions>;
  driver_session_id?: Maybe<Scalars['String']['output']>;
  drs?: Maybe<Scalars['Int']['output']>;
  gear?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  relative_distance?: Maybe<Scalars['numeric']['output']>;
  rpm?: Maybe<Scalars['Int']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  source?: Maybe<Telemetry_Sources_Enum>;
  speed?: Maybe<Scalars['numeric']['output']>;
  status?: Maybe<Telemetry_Car_Status_Enum>;
  /** An object relationship */
  telemetry_car_status?: Maybe<Telemetry_Car_Status>;
  /** An object relationship */
  telemetry_source?: Maybe<Telemetry_Sources>;
  throttle?: Maybe<Scalars['numeric']['output']>;
  time?: Maybe<Scalars['bigint']['output']>;
  x?: Maybe<Scalars['numeric']['output']>;
  y?: Maybe<Scalars['numeric']['output']>;
  z?: Maybe<Scalars['numeric']['output']>;
};

/** aggregated selection of "telemetry" */
export type Telemetry_Aggregate = {
  __typename?: 'telemetry_aggregate';
  aggregate?: Maybe<Telemetry_Aggregate_Fields>;
  nodes: Array<Telemetry>;
};

export type Telemetry_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Telemetry_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Telemetry_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Telemetry_Aggregate_Bool_Exp_Count>;
};

export type Telemetry_Aggregate_Bool_Exp_Bool_And = {
  arguments: Telemetry_Select_Column_Telemetry_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Telemetry_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Telemetry_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Telemetry_Select_Column_Telemetry_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Telemetry_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Telemetry_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Telemetry_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Telemetry_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "telemetry" */
export type Telemetry_Aggregate_Fields = {
  __typename?: 'telemetry_aggregate_fields';
  avg?: Maybe<Telemetry_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Telemetry_Max_Fields>;
  min?: Maybe<Telemetry_Min_Fields>;
  stddev?: Maybe<Telemetry_Stddev_Fields>;
  stddev_pop?: Maybe<Telemetry_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Telemetry_Stddev_Samp_Fields>;
  sum?: Maybe<Telemetry_Sum_Fields>;
  var_pop?: Maybe<Telemetry_Var_Pop_Fields>;
  var_samp?: Maybe<Telemetry_Var_Samp_Fields>;
  variance?: Maybe<Telemetry_Variance_Fields>;
};

/** aggregate fields of "telemetry" */
export type Telemetry_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Telemetry_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "telemetry" */
export type Telemetry_Aggregate_Order_By = {
  avg?: InputMaybe<Telemetry_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Telemetry_Max_Order_By>;
  min?: InputMaybe<Telemetry_Min_Order_By>;
  stddev?: InputMaybe<Telemetry_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Telemetry_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Telemetry_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Telemetry_Sum_Order_By>;
  var_pop?: InputMaybe<Telemetry_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Telemetry_Var_Samp_Order_By>;
  variance?: InputMaybe<Telemetry_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "telemetry" */
export type Telemetry_Arr_Rel_Insert_Input = {
  data: Array<Telemetry_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Telemetry_On_Conflict>;
};

/** aggregate avg on columns */
export type Telemetry_Avg_Fields = {
  __typename?: 'telemetry_avg_fields';
  distance?: Maybe<Scalars['Float']['output']>;
  distance_to_driver_ahead?: Maybe<Scalars['Float']['output']>;
  drs?: Maybe<Scalars['Float']['output']>;
  gear?: Maybe<Scalars['Float']['output']>;
  relative_distance?: Maybe<Scalars['Float']['output']>;
  rpm?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed?: Maybe<Scalars['Float']['output']>;
  throttle?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['Float']['output']>;
  x?: Maybe<Scalars['Float']['output']>;
  y?: Maybe<Scalars['Float']['output']>;
  z?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "telemetry" */
export type Telemetry_Avg_Order_By = {
  distance?: InputMaybe<Order_By>;
  distance_to_driver_ahead?: InputMaybe<Order_By>;
  drs?: InputMaybe<Order_By>;
  gear?: InputMaybe<Order_By>;
  relative_distance?: InputMaybe<Order_By>;
  rpm?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed?: InputMaybe<Order_By>;
  throttle?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  x?: InputMaybe<Order_By>;
  y?: InputMaybe<Order_By>;
  z?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "telemetry". All fields are combined with a logical 'AND'. */
export type Telemetry_Bool_Exp = {
  _and?: InputMaybe<Array<Telemetry_Bool_Exp>>;
  _not?: InputMaybe<Telemetry_Bool_Exp>;
  _or?: InputMaybe<Array<Telemetry_Bool_Exp>>;
  brake?: InputMaybe<Boolean_Comparison_Exp>;
  date?: InputMaybe<String_Comparison_Exp>;
  distance?: InputMaybe<Numeric_Comparison_Exp>;
  distance_to_driver_ahead?: InputMaybe<Numeric_Comparison_Exp>;
  driver_ahead?: InputMaybe<String_Comparison_Exp>;
  driver_session?: InputMaybe<Driver_Sessions_Bool_Exp>;
  driver_session_id?: InputMaybe<String_Comparison_Exp>;
  drs?: InputMaybe<Int_Comparison_Exp>;
  gear?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  relative_distance?: InputMaybe<Numeric_Comparison_Exp>;
  rpm?: InputMaybe<Int_Comparison_Exp>;
  session_time?: InputMaybe<Bigint_Comparison_Exp>;
  source?: InputMaybe<Telemetry_Sources_Enum_Comparison_Exp>;
  speed?: InputMaybe<Numeric_Comparison_Exp>;
  status?: InputMaybe<Telemetry_Car_Status_Enum_Comparison_Exp>;
  telemetry_car_status?: InputMaybe<Telemetry_Car_Status_Bool_Exp>;
  telemetry_source?: InputMaybe<Telemetry_Sources_Bool_Exp>;
  throttle?: InputMaybe<Numeric_Comparison_Exp>;
  time?: InputMaybe<Bigint_Comparison_Exp>;
  x?: InputMaybe<Numeric_Comparison_Exp>;
  y?: InputMaybe<Numeric_Comparison_Exp>;
  z?: InputMaybe<Numeric_Comparison_Exp>;
};

/** columns and relationships of "telemetry_car_status" */
export type Telemetry_Car_Status = {
  __typename?: 'telemetry_car_status';
  comment?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  telemetries: Array<Telemetry>;
  /** An aggregate relationship */
  telemetries_aggregate: Telemetry_Aggregate;
  value: Scalars['String']['output'];
};

/** columns and relationships of "telemetry_car_status" */
export type Telemetry_Car_StatusTelemetriesArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Order_By>>;
  where?: InputMaybe<Telemetry_Bool_Exp>;
};

/** columns and relationships of "telemetry_car_status" */
export type Telemetry_Car_StatusTelemetries_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Order_By>>;
  where?: InputMaybe<Telemetry_Bool_Exp>;
};

/** aggregated selection of "telemetry_car_status" */
export type Telemetry_Car_Status_Aggregate = {
  __typename?: 'telemetry_car_status_aggregate';
  aggregate?: Maybe<Telemetry_Car_Status_Aggregate_Fields>;
  nodes: Array<Telemetry_Car_Status>;
};

/** aggregate fields of "telemetry_car_status" */
export type Telemetry_Car_Status_Aggregate_Fields = {
  __typename?: 'telemetry_car_status_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Telemetry_Car_Status_Max_Fields>;
  min?: Maybe<Telemetry_Car_Status_Min_Fields>;
};

/** aggregate fields of "telemetry_car_status" */
export type Telemetry_Car_Status_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Telemetry_Car_Status_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "telemetry_car_status". All fields are combined with a logical 'AND'. */
export type Telemetry_Car_Status_Bool_Exp = {
  _and?: InputMaybe<Array<Telemetry_Car_Status_Bool_Exp>>;
  _not?: InputMaybe<Telemetry_Car_Status_Bool_Exp>;
  _or?: InputMaybe<Array<Telemetry_Car_Status_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  telemetries?: InputMaybe<Telemetry_Bool_Exp>;
  telemetries_aggregate?: InputMaybe<Telemetry_Aggregate_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "telemetry_car_status" */
export enum Telemetry_Car_Status_Constraint {
  /** unique or primary key constraint on columns "value" */
  TelemetryCarStatusPkey = 'telemetry_car_status_pkey',
}

export enum Telemetry_Car_Status_Enum {
  /** Car is off track */
  OffTrack = 'OffTrack',
  /** Car is on track */
  OnTrack = 'OnTrack',
}

/** Boolean expression to compare columns of type "telemetry_car_status_enum". All fields are combined with logical 'AND'. */
export type Telemetry_Car_Status_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Telemetry_Car_Status_Enum>;
  _in?: InputMaybe<Array<Telemetry_Car_Status_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Telemetry_Car_Status_Enum>;
  _nin?: InputMaybe<Array<Telemetry_Car_Status_Enum>>;
};

/** input type for inserting data into table "telemetry_car_status" */
export type Telemetry_Car_Status_Insert_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  telemetries?: InputMaybe<Telemetry_Arr_Rel_Insert_Input>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Telemetry_Car_Status_Max_Fields = {
  __typename?: 'telemetry_car_status_max_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Telemetry_Car_Status_Min_Fields = {
  __typename?: 'telemetry_car_status_min_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "telemetry_car_status" */
export type Telemetry_Car_Status_Mutation_Response = {
  __typename?: 'telemetry_car_status_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Telemetry_Car_Status>;
};

/** input type for inserting object relation for remote table "telemetry_car_status" */
export type Telemetry_Car_Status_Obj_Rel_Insert_Input = {
  data: Telemetry_Car_Status_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Telemetry_Car_Status_On_Conflict>;
};

/** on_conflict condition type for table "telemetry_car_status" */
export type Telemetry_Car_Status_On_Conflict = {
  constraint: Telemetry_Car_Status_Constraint;
  update_columns?: Array<Telemetry_Car_Status_Update_Column>;
  where?: InputMaybe<Telemetry_Car_Status_Bool_Exp>;
};

/** Ordering options when selecting data from "telemetry_car_status". */
export type Telemetry_Car_Status_Order_By = {
  comment?: InputMaybe<Order_By>;
  telemetries_aggregate?: InputMaybe<Telemetry_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: telemetry_car_status */
export type Telemetry_Car_Status_Pk_Columns_Input = {
  value: Scalars['String']['input'];
};

/** select columns of table "telemetry_car_status" */
export enum Telemetry_Car_Status_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value',
}

/** input type for updating data in table "telemetry_car_status" */
export type Telemetry_Car_Status_Set_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "telemetry_car_status" */
export type Telemetry_Car_Status_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Telemetry_Car_Status_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Telemetry_Car_Status_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "telemetry_car_status" */
export enum Telemetry_Car_Status_Update_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value',
}

export type Telemetry_Car_Status_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Telemetry_Car_Status_Set_Input>;
  /** filter the rows which have to be updated */
  where: Telemetry_Car_Status_Bool_Exp;
};

/** unique or primary key constraints on table "telemetry" */
export enum Telemetry_Constraint {
  /** unique or primary key constraint on columns "id" */
  TelemetryPkey = 'telemetry_pkey',
}

/** input type for incrementing numeric columns in table "telemetry" */
export type Telemetry_Inc_Input = {
  distance?: InputMaybe<Scalars['numeric']['input']>;
  distance_to_driver_ahead?: InputMaybe<Scalars['numeric']['input']>;
  drs?: InputMaybe<Scalars['Int']['input']>;
  gear?: InputMaybe<Scalars['Int']['input']>;
  relative_distance?: InputMaybe<Scalars['numeric']['input']>;
  rpm?: InputMaybe<Scalars['Int']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  speed?: InputMaybe<Scalars['numeric']['input']>;
  throttle?: InputMaybe<Scalars['numeric']['input']>;
  time?: InputMaybe<Scalars['bigint']['input']>;
  x?: InputMaybe<Scalars['numeric']['input']>;
  y?: InputMaybe<Scalars['numeric']['input']>;
  z?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "telemetry" */
export type Telemetry_Insert_Input = {
  brake?: InputMaybe<Scalars['Boolean']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  distance?: InputMaybe<Scalars['numeric']['input']>;
  distance_to_driver_ahead?: InputMaybe<Scalars['numeric']['input']>;
  driver_ahead?: InputMaybe<Scalars['String']['input']>;
  driver_session?: InputMaybe<Driver_Sessions_Obj_Rel_Insert_Input>;
  driver_session_id?: InputMaybe<Scalars['String']['input']>;
  drs?: InputMaybe<Scalars['Int']['input']>;
  gear?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  relative_distance?: InputMaybe<Scalars['numeric']['input']>;
  rpm?: InputMaybe<Scalars['Int']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  source?: InputMaybe<Telemetry_Sources_Enum>;
  speed?: InputMaybe<Scalars['numeric']['input']>;
  status?: InputMaybe<Telemetry_Car_Status_Enum>;
  telemetry_car_status?: InputMaybe<Telemetry_Car_Status_Obj_Rel_Insert_Input>;
  telemetry_source?: InputMaybe<Telemetry_Sources_Obj_Rel_Insert_Input>;
  throttle?: InputMaybe<Scalars['numeric']['input']>;
  time?: InputMaybe<Scalars['bigint']['input']>;
  x?: InputMaybe<Scalars['numeric']['input']>;
  y?: InputMaybe<Scalars['numeric']['input']>;
  z?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate max on columns */
export type Telemetry_Max_Fields = {
  __typename?: 'telemetry_max_fields';
  date?: Maybe<Scalars['String']['output']>;
  distance?: Maybe<Scalars['numeric']['output']>;
  distance_to_driver_ahead?: Maybe<Scalars['numeric']['output']>;
  driver_ahead?: Maybe<Scalars['String']['output']>;
  driver_session_id?: Maybe<Scalars['String']['output']>;
  drs?: Maybe<Scalars['Int']['output']>;
  gear?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  relative_distance?: Maybe<Scalars['numeric']['output']>;
  rpm?: Maybe<Scalars['Int']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  speed?: Maybe<Scalars['numeric']['output']>;
  throttle?: Maybe<Scalars['numeric']['output']>;
  time?: Maybe<Scalars['bigint']['output']>;
  x?: Maybe<Scalars['numeric']['output']>;
  y?: Maybe<Scalars['numeric']['output']>;
  z?: Maybe<Scalars['numeric']['output']>;
};

/** order by max() on columns of table "telemetry" */
export type Telemetry_Max_Order_By = {
  date?: InputMaybe<Order_By>;
  distance?: InputMaybe<Order_By>;
  distance_to_driver_ahead?: InputMaybe<Order_By>;
  driver_ahead?: InputMaybe<Order_By>;
  driver_session_id?: InputMaybe<Order_By>;
  drs?: InputMaybe<Order_By>;
  gear?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  relative_distance?: InputMaybe<Order_By>;
  rpm?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed?: InputMaybe<Order_By>;
  throttle?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  x?: InputMaybe<Order_By>;
  y?: InputMaybe<Order_By>;
  z?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Telemetry_Min_Fields = {
  __typename?: 'telemetry_min_fields';
  date?: Maybe<Scalars['String']['output']>;
  distance?: Maybe<Scalars['numeric']['output']>;
  distance_to_driver_ahead?: Maybe<Scalars['numeric']['output']>;
  driver_ahead?: Maybe<Scalars['String']['output']>;
  driver_session_id?: Maybe<Scalars['String']['output']>;
  drs?: Maybe<Scalars['Int']['output']>;
  gear?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  relative_distance?: Maybe<Scalars['numeric']['output']>;
  rpm?: Maybe<Scalars['Int']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  speed?: Maybe<Scalars['numeric']['output']>;
  throttle?: Maybe<Scalars['numeric']['output']>;
  time?: Maybe<Scalars['bigint']['output']>;
  x?: Maybe<Scalars['numeric']['output']>;
  y?: Maybe<Scalars['numeric']['output']>;
  z?: Maybe<Scalars['numeric']['output']>;
};

/** order by min() on columns of table "telemetry" */
export type Telemetry_Min_Order_By = {
  date?: InputMaybe<Order_By>;
  distance?: InputMaybe<Order_By>;
  distance_to_driver_ahead?: InputMaybe<Order_By>;
  driver_ahead?: InputMaybe<Order_By>;
  driver_session_id?: InputMaybe<Order_By>;
  drs?: InputMaybe<Order_By>;
  gear?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  relative_distance?: InputMaybe<Order_By>;
  rpm?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed?: InputMaybe<Order_By>;
  throttle?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  x?: InputMaybe<Order_By>;
  y?: InputMaybe<Order_By>;
  z?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "telemetry" */
export type Telemetry_Mutation_Response = {
  __typename?: 'telemetry_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Telemetry>;
};

/** on_conflict condition type for table "telemetry" */
export type Telemetry_On_Conflict = {
  constraint: Telemetry_Constraint;
  update_columns?: Array<Telemetry_Update_Column>;
  where?: InputMaybe<Telemetry_Bool_Exp>;
};

/** Ordering options when selecting data from "telemetry". */
export type Telemetry_Order_By = {
  brake?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  distance?: InputMaybe<Order_By>;
  distance_to_driver_ahead?: InputMaybe<Order_By>;
  driver_ahead?: InputMaybe<Order_By>;
  driver_session?: InputMaybe<Driver_Sessions_Order_By>;
  driver_session_id?: InputMaybe<Order_By>;
  drs?: InputMaybe<Order_By>;
  gear?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  relative_distance?: InputMaybe<Order_By>;
  rpm?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  source?: InputMaybe<Order_By>;
  speed?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  telemetry_car_status?: InputMaybe<Telemetry_Car_Status_Order_By>;
  telemetry_source?: InputMaybe<Telemetry_Sources_Order_By>;
  throttle?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  x?: InputMaybe<Order_By>;
  y?: InputMaybe<Order_By>;
  z?: InputMaybe<Order_By>;
};

/** primary key columns input for table: telemetry */
export type Telemetry_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "telemetry" */
export enum Telemetry_Select_Column {
  /** column name */
  Brake = 'brake',
  /** column name */
  Date = 'date',
  /** column name */
  Distance = 'distance',
  /** column name */
  DistanceToDriverAhead = 'distance_to_driver_ahead',
  /** column name */
  DriverAhead = 'driver_ahead',
  /** column name */
  DriverSessionId = 'driver_session_id',
  /** column name */
  Drs = 'drs',
  /** column name */
  Gear = 'gear',
  /** column name */
  Id = 'id',
  /** column name */
  RelativeDistance = 'relative_distance',
  /** column name */
  Rpm = 'rpm',
  /** column name */
  SessionTime = 'session_time',
  /** column name */
  Source = 'source',
  /** column name */
  Speed = 'speed',
  /** column name */
  Status = 'status',
  /** column name */
  Throttle = 'throttle',
  /** column name */
  Time = 'time',
  /** column name */
  X = 'x',
  /** column name */
  Y = 'y',
  /** column name */
  Z = 'z',
}

/** select "telemetry_aggregate_bool_exp_bool_and_arguments_columns" columns of table "telemetry" */
export enum Telemetry_Select_Column_Telemetry_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Brake = 'brake',
}

/** select "telemetry_aggregate_bool_exp_bool_or_arguments_columns" columns of table "telemetry" */
export enum Telemetry_Select_Column_Telemetry_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Brake = 'brake',
}

/** input type for updating data in table "telemetry" */
export type Telemetry_Set_Input = {
  brake?: InputMaybe<Scalars['Boolean']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  distance?: InputMaybe<Scalars['numeric']['input']>;
  distance_to_driver_ahead?: InputMaybe<Scalars['numeric']['input']>;
  driver_ahead?: InputMaybe<Scalars['String']['input']>;
  driver_session_id?: InputMaybe<Scalars['String']['input']>;
  drs?: InputMaybe<Scalars['Int']['input']>;
  gear?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  relative_distance?: InputMaybe<Scalars['numeric']['input']>;
  rpm?: InputMaybe<Scalars['Int']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  source?: InputMaybe<Telemetry_Sources_Enum>;
  speed?: InputMaybe<Scalars['numeric']['input']>;
  status?: InputMaybe<Telemetry_Car_Status_Enum>;
  throttle?: InputMaybe<Scalars['numeric']['input']>;
  time?: InputMaybe<Scalars['bigint']['input']>;
  x?: InputMaybe<Scalars['numeric']['input']>;
  y?: InputMaybe<Scalars['numeric']['input']>;
  z?: InputMaybe<Scalars['numeric']['input']>;
};

/** columns and relationships of "telemetry_sources" */
export type Telemetry_Sources = {
  __typename?: 'telemetry_sources';
  comment?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  telemetries: Array<Telemetry>;
  /** An aggregate relationship */
  telemetries_aggregate: Telemetry_Aggregate;
  value: Scalars['String']['output'];
};

/** columns and relationships of "telemetry_sources" */
export type Telemetry_SourcesTelemetriesArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Order_By>>;
  where?: InputMaybe<Telemetry_Bool_Exp>;
};

/** columns and relationships of "telemetry_sources" */
export type Telemetry_SourcesTelemetries_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Order_By>>;
  where?: InputMaybe<Telemetry_Bool_Exp>;
};

/** aggregated selection of "telemetry_sources" */
export type Telemetry_Sources_Aggregate = {
  __typename?: 'telemetry_sources_aggregate';
  aggregate?: Maybe<Telemetry_Sources_Aggregate_Fields>;
  nodes: Array<Telemetry_Sources>;
};

/** aggregate fields of "telemetry_sources" */
export type Telemetry_Sources_Aggregate_Fields = {
  __typename?: 'telemetry_sources_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Telemetry_Sources_Max_Fields>;
  min?: Maybe<Telemetry_Sources_Min_Fields>;
};

/** aggregate fields of "telemetry_sources" */
export type Telemetry_Sources_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Telemetry_Sources_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "telemetry_sources". All fields are combined with a logical 'AND'. */
export type Telemetry_Sources_Bool_Exp = {
  _and?: InputMaybe<Array<Telemetry_Sources_Bool_Exp>>;
  _not?: InputMaybe<Telemetry_Sources_Bool_Exp>;
  _or?: InputMaybe<Array<Telemetry_Sources_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  telemetries?: InputMaybe<Telemetry_Bool_Exp>;
  telemetries_aggregate?: InputMaybe<Telemetry_Aggregate_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "telemetry_sources" */
export enum Telemetry_Sources_Constraint {
  /** unique or primary key constraint on columns "value" */
  TelemetrySourcesPkey = 'telemetry_sources_pkey',
}

export enum Telemetry_Sources_Enum {
  /** Car telemetry source */
  Car = 'car',
  /** Interpolation telemetry source */
  Interpolation = 'interpolation',
  /** Position telemetry source */
  Pos = 'pos',
}

/** Boolean expression to compare columns of type "telemetry_sources_enum". All fields are combined with logical 'AND'. */
export type Telemetry_Sources_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Telemetry_Sources_Enum>;
  _in?: InputMaybe<Array<Telemetry_Sources_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Telemetry_Sources_Enum>;
  _nin?: InputMaybe<Array<Telemetry_Sources_Enum>>;
};

/** input type for inserting data into table "telemetry_sources" */
export type Telemetry_Sources_Insert_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  telemetries?: InputMaybe<Telemetry_Arr_Rel_Insert_Input>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Telemetry_Sources_Max_Fields = {
  __typename?: 'telemetry_sources_max_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Telemetry_Sources_Min_Fields = {
  __typename?: 'telemetry_sources_min_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "telemetry_sources" */
export type Telemetry_Sources_Mutation_Response = {
  __typename?: 'telemetry_sources_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Telemetry_Sources>;
};

/** input type for inserting object relation for remote table "telemetry_sources" */
export type Telemetry_Sources_Obj_Rel_Insert_Input = {
  data: Telemetry_Sources_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Telemetry_Sources_On_Conflict>;
};

/** on_conflict condition type for table "telemetry_sources" */
export type Telemetry_Sources_On_Conflict = {
  constraint: Telemetry_Sources_Constraint;
  update_columns?: Array<Telemetry_Sources_Update_Column>;
  where?: InputMaybe<Telemetry_Sources_Bool_Exp>;
};

/** Ordering options when selecting data from "telemetry_sources". */
export type Telemetry_Sources_Order_By = {
  comment?: InputMaybe<Order_By>;
  telemetries_aggregate?: InputMaybe<Telemetry_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: telemetry_sources */
export type Telemetry_Sources_Pk_Columns_Input = {
  value: Scalars['String']['input'];
};

/** select columns of table "telemetry_sources" */
export enum Telemetry_Sources_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value',
}

/** input type for updating data in table "telemetry_sources" */
export type Telemetry_Sources_Set_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "telemetry_sources" */
export type Telemetry_Sources_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Telemetry_Sources_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Telemetry_Sources_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "telemetry_sources" */
export enum Telemetry_Sources_Update_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value',
}

export type Telemetry_Sources_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Telemetry_Sources_Set_Input>;
  /** filter the rows which have to be updated */
  where: Telemetry_Sources_Bool_Exp;
};

/** aggregate stddev on columns */
export type Telemetry_Stddev_Fields = {
  __typename?: 'telemetry_stddev_fields';
  distance?: Maybe<Scalars['Float']['output']>;
  distance_to_driver_ahead?: Maybe<Scalars['Float']['output']>;
  drs?: Maybe<Scalars['Float']['output']>;
  gear?: Maybe<Scalars['Float']['output']>;
  relative_distance?: Maybe<Scalars['Float']['output']>;
  rpm?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed?: Maybe<Scalars['Float']['output']>;
  throttle?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['Float']['output']>;
  x?: Maybe<Scalars['Float']['output']>;
  y?: Maybe<Scalars['Float']['output']>;
  z?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "telemetry" */
export type Telemetry_Stddev_Order_By = {
  distance?: InputMaybe<Order_By>;
  distance_to_driver_ahead?: InputMaybe<Order_By>;
  drs?: InputMaybe<Order_By>;
  gear?: InputMaybe<Order_By>;
  relative_distance?: InputMaybe<Order_By>;
  rpm?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed?: InputMaybe<Order_By>;
  throttle?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  x?: InputMaybe<Order_By>;
  y?: InputMaybe<Order_By>;
  z?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Telemetry_Stddev_Pop_Fields = {
  __typename?: 'telemetry_stddev_pop_fields';
  distance?: Maybe<Scalars['Float']['output']>;
  distance_to_driver_ahead?: Maybe<Scalars['Float']['output']>;
  drs?: Maybe<Scalars['Float']['output']>;
  gear?: Maybe<Scalars['Float']['output']>;
  relative_distance?: Maybe<Scalars['Float']['output']>;
  rpm?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed?: Maybe<Scalars['Float']['output']>;
  throttle?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['Float']['output']>;
  x?: Maybe<Scalars['Float']['output']>;
  y?: Maybe<Scalars['Float']['output']>;
  z?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "telemetry" */
export type Telemetry_Stddev_Pop_Order_By = {
  distance?: InputMaybe<Order_By>;
  distance_to_driver_ahead?: InputMaybe<Order_By>;
  drs?: InputMaybe<Order_By>;
  gear?: InputMaybe<Order_By>;
  relative_distance?: InputMaybe<Order_By>;
  rpm?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed?: InputMaybe<Order_By>;
  throttle?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  x?: InputMaybe<Order_By>;
  y?: InputMaybe<Order_By>;
  z?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Telemetry_Stddev_Samp_Fields = {
  __typename?: 'telemetry_stddev_samp_fields';
  distance?: Maybe<Scalars['Float']['output']>;
  distance_to_driver_ahead?: Maybe<Scalars['Float']['output']>;
  drs?: Maybe<Scalars['Float']['output']>;
  gear?: Maybe<Scalars['Float']['output']>;
  relative_distance?: Maybe<Scalars['Float']['output']>;
  rpm?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed?: Maybe<Scalars['Float']['output']>;
  throttle?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['Float']['output']>;
  x?: Maybe<Scalars['Float']['output']>;
  y?: Maybe<Scalars['Float']['output']>;
  z?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "telemetry" */
export type Telemetry_Stddev_Samp_Order_By = {
  distance?: InputMaybe<Order_By>;
  distance_to_driver_ahead?: InputMaybe<Order_By>;
  drs?: InputMaybe<Order_By>;
  gear?: InputMaybe<Order_By>;
  relative_distance?: InputMaybe<Order_By>;
  rpm?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed?: InputMaybe<Order_By>;
  throttle?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  x?: InputMaybe<Order_By>;
  y?: InputMaybe<Order_By>;
  z?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "telemetry" */
export type Telemetry_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Telemetry_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Telemetry_Stream_Cursor_Value_Input = {
  brake?: InputMaybe<Scalars['Boolean']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  distance?: InputMaybe<Scalars['numeric']['input']>;
  distance_to_driver_ahead?: InputMaybe<Scalars['numeric']['input']>;
  driver_ahead?: InputMaybe<Scalars['String']['input']>;
  driver_session_id?: InputMaybe<Scalars['String']['input']>;
  drs?: InputMaybe<Scalars['Int']['input']>;
  gear?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  relative_distance?: InputMaybe<Scalars['numeric']['input']>;
  rpm?: InputMaybe<Scalars['Int']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  source?: InputMaybe<Telemetry_Sources_Enum>;
  speed?: InputMaybe<Scalars['numeric']['input']>;
  status?: InputMaybe<Telemetry_Car_Status_Enum>;
  throttle?: InputMaybe<Scalars['numeric']['input']>;
  time?: InputMaybe<Scalars['bigint']['input']>;
  x?: InputMaybe<Scalars['numeric']['input']>;
  y?: InputMaybe<Scalars['numeric']['input']>;
  z?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Telemetry_Sum_Fields = {
  __typename?: 'telemetry_sum_fields';
  distance?: Maybe<Scalars['numeric']['output']>;
  distance_to_driver_ahead?: Maybe<Scalars['numeric']['output']>;
  drs?: Maybe<Scalars['Int']['output']>;
  gear?: Maybe<Scalars['Int']['output']>;
  relative_distance?: Maybe<Scalars['numeric']['output']>;
  rpm?: Maybe<Scalars['Int']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  speed?: Maybe<Scalars['numeric']['output']>;
  throttle?: Maybe<Scalars['numeric']['output']>;
  time?: Maybe<Scalars['bigint']['output']>;
  x?: Maybe<Scalars['numeric']['output']>;
  y?: Maybe<Scalars['numeric']['output']>;
  z?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "telemetry" */
export type Telemetry_Sum_Order_By = {
  distance?: InputMaybe<Order_By>;
  distance_to_driver_ahead?: InputMaybe<Order_By>;
  drs?: InputMaybe<Order_By>;
  gear?: InputMaybe<Order_By>;
  relative_distance?: InputMaybe<Order_By>;
  rpm?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed?: InputMaybe<Order_By>;
  throttle?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  x?: InputMaybe<Order_By>;
  y?: InputMaybe<Order_By>;
  z?: InputMaybe<Order_By>;
};

/** update columns of table "telemetry" */
export enum Telemetry_Update_Column {
  /** column name */
  Brake = 'brake',
  /** column name */
  Date = 'date',
  /** column name */
  Distance = 'distance',
  /** column name */
  DistanceToDriverAhead = 'distance_to_driver_ahead',
  /** column name */
  DriverAhead = 'driver_ahead',
  /** column name */
  DriverSessionId = 'driver_session_id',
  /** column name */
  Drs = 'drs',
  /** column name */
  Gear = 'gear',
  /** column name */
  Id = 'id',
  /** column name */
  RelativeDistance = 'relative_distance',
  /** column name */
  Rpm = 'rpm',
  /** column name */
  SessionTime = 'session_time',
  /** column name */
  Source = 'source',
  /** column name */
  Speed = 'speed',
  /** column name */
  Status = 'status',
  /** column name */
  Throttle = 'throttle',
  /** column name */
  Time = 'time',
  /** column name */
  X = 'x',
  /** column name */
  Y = 'y',
  /** column name */
  Z = 'z',
}

export type Telemetry_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Telemetry_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Telemetry_Set_Input>;
  /** filter the rows which have to be updated */
  where: Telemetry_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Telemetry_Var_Pop_Fields = {
  __typename?: 'telemetry_var_pop_fields';
  distance?: Maybe<Scalars['Float']['output']>;
  distance_to_driver_ahead?: Maybe<Scalars['Float']['output']>;
  drs?: Maybe<Scalars['Float']['output']>;
  gear?: Maybe<Scalars['Float']['output']>;
  relative_distance?: Maybe<Scalars['Float']['output']>;
  rpm?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed?: Maybe<Scalars['Float']['output']>;
  throttle?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['Float']['output']>;
  x?: Maybe<Scalars['Float']['output']>;
  y?: Maybe<Scalars['Float']['output']>;
  z?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "telemetry" */
export type Telemetry_Var_Pop_Order_By = {
  distance?: InputMaybe<Order_By>;
  distance_to_driver_ahead?: InputMaybe<Order_By>;
  drs?: InputMaybe<Order_By>;
  gear?: InputMaybe<Order_By>;
  relative_distance?: InputMaybe<Order_By>;
  rpm?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed?: InputMaybe<Order_By>;
  throttle?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  x?: InputMaybe<Order_By>;
  y?: InputMaybe<Order_By>;
  z?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Telemetry_Var_Samp_Fields = {
  __typename?: 'telemetry_var_samp_fields';
  distance?: Maybe<Scalars['Float']['output']>;
  distance_to_driver_ahead?: Maybe<Scalars['Float']['output']>;
  drs?: Maybe<Scalars['Float']['output']>;
  gear?: Maybe<Scalars['Float']['output']>;
  relative_distance?: Maybe<Scalars['Float']['output']>;
  rpm?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed?: Maybe<Scalars['Float']['output']>;
  throttle?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['Float']['output']>;
  x?: Maybe<Scalars['Float']['output']>;
  y?: Maybe<Scalars['Float']['output']>;
  z?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "telemetry" */
export type Telemetry_Var_Samp_Order_By = {
  distance?: InputMaybe<Order_By>;
  distance_to_driver_ahead?: InputMaybe<Order_By>;
  drs?: InputMaybe<Order_By>;
  gear?: InputMaybe<Order_By>;
  relative_distance?: InputMaybe<Order_By>;
  rpm?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed?: InputMaybe<Order_By>;
  throttle?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  x?: InputMaybe<Order_By>;
  y?: InputMaybe<Order_By>;
  z?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Telemetry_Variance_Fields = {
  __typename?: 'telemetry_variance_fields';
  distance?: Maybe<Scalars['Float']['output']>;
  distance_to_driver_ahead?: Maybe<Scalars['Float']['output']>;
  drs?: Maybe<Scalars['Float']['output']>;
  gear?: Maybe<Scalars['Float']['output']>;
  relative_distance?: Maybe<Scalars['Float']['output']>;
  rpm?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed?: Maybe<Scalars['Float']['output']>;
  throttle?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['Float']['output']>;
  x?: Maybe<Scalars['Float']['output']>;
  y?: Maybe<Scalars['Float']['output']>;
  z?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "telemetry" */
export type Telemetry_Variance_Order_By = {
  distance?: InputMaybe<Order_By>;
  distance_to_driver_ahead?: InputMaybe<Order_By>;
  drs?: InputMaybe<Order_By>;
  gear?: InputMaybe<Order_By>;
  relative_distance?: InputMaybe<Order_By>;
  rpm?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed?: InputMaybe<Order_By>;
  throttle?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  x?: InputMaybe<Order_By>;
  y?: InputMaybe<Order_By>;
  z?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "track_status" */
export type Track_Status = {
  __typename?: 'track_status';
  id: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  session?: Maybe<Sessions>;
  session_id?: Maybe<Scalars['String']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "track_status" */
export type Track_Status_Aggregate = {
  __typename?: 'track_status_aggregate';
  aggregate?: Maybe<Track_Status_Aggregate_Fields>;
  nodes: Array<Track_Status>;
};

export type Track_Status_Aggregate_Bool_Exp = {
  count?: InputMaybe<Track_Status_Aggregate_Bool_Exp_Count>;
};

export type Track_Status_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Track_Status_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Track_Status_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "track_status" */
export type Track_Status_Aggregate_Fields = {
  __typename?: 'track_status_aggregate_fields';
  avg?: Maybe<Track_Status_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Track_Status_Max_Fields>;
  min?: Maybe<Track_Status_Min_Fields>;
  stddev?: Maybe<Track_Status_Stddev_Fields>;
  stddev_pop?: Maybe<Track_Status_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Track_Status_Stddev_Samp_Fields>;
  sum?: Maybe<Track_Status_Sum_Fields>;
  var_pop?: Maybe<Track_Status_Var_Pop_Fields>;
  var_samp?: Maybe<Track_Status_Var_Samp_Fields>;
  variance?: Maybe<Track_Status_Variance_Fields>;
};

/** aggregate fields of "track_status" */
export type Track_Status_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Track_Status_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "track_status" */
export type Track_Status_Aggregate_Order_By = {
  avg?: InputMaybe<Track_Status_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Track_Status_Max_Order_By>;
  min?: InputMaybe<Track_Status_Min_Order_By>;
  stddev?: InputMaybe<Track_Status_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Track_Status_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Track_Status_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Track_Status_Sum_Order_By>;
  var_pop?: InputMaybe<Track_Status_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Track_Status_Var_Samp_Order_By>;
  variance?: InputMaybe<Track_Status_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "track_status" */
export type Track_Status_Arr_Rel_Insert_Input = {
  data: Array<Track_Status_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Track_Status_On_Conflict>;
};

/** aggregate avg on columns */
export type Track_Status_Avg_Fields = {
  __typename?: 'track_status_avg_fields';
  session_time?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "track_status" */
export type Track_Status_Avg_Order_By = {
  session_time?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "track_status". All fields are combined with a logical 'AND'. */
export type Track_Status_Bool_Exp = {
  _and?: InputMaybe<Array<Track_Status_Bool_Exp>>;
  _not?: InputMaybe<Track_Status_Bool_Exp>;
  _or?: InputMaybe<Array<Track_Status_Bool_Exp>>;
  id?: InputMaybe<String_Comparison_Exp>;
  message?: InputMaybe<String_Comparison_Exp>;
  session?: InputMaybe<Sessions_Bool_Exp>;
  session_id?: InputMaybe<String_Comparison_Exp>;
  session_time?: InputMaybe<Bigint_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "track_status" */
export enum Track_Status_Constraint {
  /** unique or primary key constraint on columns "id" */
  TrackStatusPkey = 'track_status_pkey',
}

/** input type for incrementing numeric columns in table "track_status" */
export type Track_Status_Inc_Input = {
  session_time?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "track_status" */
export type Track_Status_Insert_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  session?: InputMaybe<Sessions_Obj_Rel_Insert_Input>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Track_Status_Max_Fields = {
  __typename?: 'track_status_max_fields';
  id?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "track_status" */
export type Track_Status_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Track_Status_Min_Fields = {
  __typename?: 'track_status_min_fields';
  id?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "track_status" */
export type Track_Status_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "track_status" */
export type Track_Status_Mutation_Response = {
  __typename?: 'track_status_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Track_Status>;
};

/** on_conflict condition type for table "track_status" */
export type Track_Status_On_Conflict = {
  constraint: Track_Status_Constraint;
  update_columns?: Array<Track_Status_Update_Column>;
  where?: InputMaybe<Track_Status_Bool_Exp>;
};

/** Ordering options when selecting data from "track_status". */
export type Track_Status_Order_By = {
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  session?: InputMaybe<Sessions_Order_By>;
  session_id?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** primary key columns input for table: track_status */
export type Track_Status_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "track_status" */
export enum Track_Status_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  SessionTime = 'session_time',
  /** column name */
  Status = 'status',
}

/** input type for updating data in table "track_status" */
export type Track_Status_Set_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Track_Status_Stddev_Fields = {
  __typename?: 'track_status_stddev_fields';
  session_time?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "track_status" */
export type Track_Status_Stddev_Order_By = {
  session_time?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Track_Status_Stddev_Pop_Fields = {
  __typename?: 'track_status_stddev_pop_fields';
  session_time?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "track_status" */
export type Track_Status_Stddev_Pop_Order_By = {
  session_time?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Track_Status_Stddev_Samp_Fields = {
  __typename?: 'track_status_stddev_samp_fields';
  session_time?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "track_status" */
export type Track_Status_Stddev_Samp_Order_By = {
  session_time?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "track_status" */
export type Track_Status_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Track_Status_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Track_Status_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Track_Status_Sum_Fields = {
  __typename?: 'track_status_sum_fields';
  session_time?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "track_status" */
export type Track_Status_Sum_Order_By = {
  session_time?: InputMaybe<Order_By>;
};

/** update columns of table "track_status" */
export enum Track_Status_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  SessionTime = 'session_time',
  /** column name */
  Status = 'status',
}

export type Track_Status_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Track_Status_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Track_Status_Set_Input>;
  /** filter the rows which have to be updated */
  where: Track_Status_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Track_Status_Var_Pop_Fields = {
  __typename?: 'track_status_var_pop_fields';
  session_time?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "track_status" */
export type Track_Status_Var_Pop_Order_By = {
  session_time?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Track_Status_Var_Samp_Fields = {
  __typename?: 'track_status_var_samp_fields';
  session_time?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "track_status" */
export type Track_Status_Var_Samp_Order_By = {
  session_time?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Track_Status_Variance_Fields = {
  __typename?: 'track_status_variance_fields';
  session_time?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "track_status" */
export type Track_Status_Variance_Order_By = {
  session_time?: InputMaybe<Order_By>;
};

/** columns and relationships of "tyre_compounds" */
export type Tyre_Compounds = {
  __typename?: 'tyre_compounds';
  comment?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  laps: Array<Laps>;
  /** An aggregate relationship */
  laps_aggregate: Laps_Aggregate;
  value: Scalars['String']['output'];
};

/** columns and relationships of "tyre_compounds" */
export type Tyre_CompoundsLapsArgs = {
  distinct_on?: InputMaybe<Array<Laps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Laps_Order_By>>;
  where?: InputMaybe<Laps_Bool_Exp>;
};

/** columns and relationships of "tyre_compounds" */
export type Tyre_CompoundsLaps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Laps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Laps_Order_By>>;
  where?: InputMaybe<Laps_Bool_Exp>;
};

/** aggregated selection of "tyre_compounds" */
export type Tyre_Compounds_Aggregate = {
  __typename?: 'tyre_compounds_aggregate';
  aggregate?: Maybe<Tyre_Compounds_Aggregate_Fields>;
  nodes: Array<Tyre_Compounds>;
};

/** aggregate fields of "tyre_compounds" */
export type Tyre_Compounds_Aggregate_Fields = {
  __typename?: 'tyre_compounds_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Tyre_Compounds_Max_Fields>;
  min?: Maybe<Tyre_Compounds_Min_Fields>;
};

/** aggregate fields of "tyre_compounds" */
export type Tyre_Compounds_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Tyre_Compounds_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "tyre_compounds". All fields are combined with a logical 'AND'. */
export type Tyre_Compounds_Bool_Exp = {
  _and?: InputMaybe<Array<Tyre_Compounds_Bool_Exp>>;
  _not?: InputMaybe<Tyre_Compounds_Bool_Exp>;
  _or?: InputMaybe<Array<Tyre_Compounds_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  laps?: InputMaybe<Laps_Bool_Exp>;
  laps_aggregate?: InputMaybe<Laps_Aggregate_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "tyre_compounds" */
export enum Tyre_Compounds_Constraint {
  /** unique or primary key constraint on columns "value" */
  TyreCompoundsPkey = 'tyre_compounds_pkey',
}

export enum Tyre_Compounds_Enum {
  /** Hard tyre compound */
  Hard = 'HARD',
  /** Hypersoft tyre compound */
  Hypersoft = 'HYPERSOFT',
  /** Intermediate tyre compound */
  Intermediate = 'INTERMEDIATE',
  /** Medium tyre compound */
  Medium = 'MEDIUM',
  /** Soft tyre compound */
  Soft = 'SOFT',
  /** Supersoft tyre compound */
  Supersoft = 'SUPERSOFT',
  /** Test tyre compound */
  Test = 'TEST',
  /** Unknown test tyre compound */
  TestUnknown = 'TEST_UNKNOWN',
  /** Ultrasoft tyre compound */
  Ultrasoft = 'ULTRASOFT',
  /** Unknown tyre compound */
  Unknown = 'UNKNOWN',
  /** Wet tyre compound */
  Wet = 'WET',
}

/** Boolean expression to compare columns of type "tyre_compounds_enum". All fields are combined with logical 'AND'. */
export type Tyre_Compounds_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Tyre_Compounds_Enum>;
  _in?: InputMaybe<Array<Tyre_Compounds_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Tyre_Compounds_Enum>;
  _nin?: InputMaybe<Array<Tyre_Compounds_Enum>>;
};

/** input type for inserting data into table "tyre_compounds" */
export type Tyre_Compounds_Insert_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  laps?: InputMaybe<Laps_Arr_Rel_Insert_Input>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Tyre_Compounds_Max_Fields = {
  __typename?: 'tyre_compounds_max_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Tyre_Compounds_Min_Fields = {
  __typename?: 'tyre_compounds_min_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "tyre_compounds" */
export type Tyre_Compounds_Mutation_Response = {
  __typename?: 'tyre_compounds_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Tyre_Compounds>;
};

/** input type for inserting object relation for remote table "tyre_compounds" */
export type Tyre_Compounds_Obj_Rel_Insert_Input = {
  data: Tyre_Compounds_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Tyre_Compounds_On_Conflict>;
};

/** on_conflict condition type for table "tyre_compounds" */
export type Tyre_Compounds_On_Conflict = {
  constraint: Tyre_Compounds_Constraint;
  update_columns?: Array<Tyre_Compounds_Update_Column>;
  where?: InputMaybe<Tyre_Compounds_Bool_Exp>;
};

/** Ordering options when selecting data from "tyre_compounds". */
export type Tyre_Compounds_Order_By = {
  comment?: InputMaybe<Order_By>;
  laps_aggregate?: InputMaybe<Laps_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: tyre_compounds */
export type Tyre_Compounds_Pk_Columns_Input = {
  value: Scalars['String']['input'];
};

/** select columns of table "tyre_compounds" */
export enum Tyre_Compounds_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value',
}

/** input type for updating data in table "tyre_compounds" */
export type Tyre_Compounds_Set_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "tyre_compounds" */
export type Tyre_Compounds_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Tyre_Compounds_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Tyre_Compounds_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "tyre_compounds" */
export enum Tyre_Compounds_Update_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value',
}

export type Tyre_Compounds_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Tyre_Compounds_Set_Input>;
  /** filter the rows which have to be updated */
  where: Tyre_Compounds_Bool_Exp;
};

/** columns and relationships of "weather_data" */
export type Weather_Data = {
  __typename?: 'weather_data';
  air_temperature?: Maybe<Scalars['numeric']['output']>;
  humidity?: Maybe<Scalars['numeric']['output']>;
  id: Scalars['String']['output'];
  pressure?: Maybe<Scalars['numeric']['output']>;
  rainfall?: Maybe<Scalars['Boolean']['output']>;
  /** An object relationship */
  session?: Maybe<Sessions>;
  session_id?: Maybe<Scalars['String']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  track_temperature?: Maybe<Scalars['numeric']['output']>;
  wind_direction?: Maybe<Scalars['Int']['output']>;
  wind_speed?: Maybe<Scalars['numeric']['output']>;
};

/** aggregated selection of "weather_data" */
export type Weather_Data_Aggregate = {
  __typename?: 'weather_data_aggregate';
  aggregate?: Maybe<Weather_Data_Aggregate_Fields>;
  nodes: Array<Weather_Data>;
};

export type Weather_Data_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Weather_Data_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Weather_Data_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Weather_Data_Aggregate_Bool_Exp_Count>;
};

export type Weather_Data_Aggregate_Bool_Exp_Bool_And = {
  arguments: Weather_Data_Select_Column_Weather_Data_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Weather_Data_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Weather_Data_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Weather_Data_Select_Column_Weather_Data_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Weather_Data_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Weather_Data_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Weather_Data_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Weather_Data_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "weather_data" */
export type Weather_Data_Aggregate_Fields = {
  __typename?: 'weather_data_aggregate_fields';
  avg?: Maybe<Weather_Data_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Weather_Data_Max_Fields>;
  min?: Maybe<Weather_Data_Min_Fields>;
  stddev?: Maybe<Weather_Data_Stddev_Fields>;
  stddev_pop?: Maybe<Weather_Data_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Weather_Data_Stddev_Samp_Fields>;
  sum?: Maybe<Weather_Data_Sum_Fields>;
  var_pop?: Maybe<Weather_Data_Var_Pop_Fields>;
  var_samp?: Maybe<Weather_Data_Var_Samp_Fields>;
  variance?: Maybe<Weather_Data_Variance_Fields>;
};

/** aggregate fields of "weather_data" */
export type Weather_Data_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Weather_Data_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "weather_data" */
export type Weather_Data_Aggregate_Order_By = {
  avg?: InputMaybe<Weather_Data_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Weather_Data_Max_Order_By>;
  min?: InputMaybe<Weather_Data_Min_Order_By>;
  stddev?: InputMaybe<Weather_Data_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Weather_Data_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Weather_Data_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Weather_Data_Sum_Order_By>;
  var_pop?: InputMaybe<Weather_Data_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Weather_Data_Var_Samp_Order_By>;
  variance?: InputMaybe<Weather_Data_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "weather_data" */
export type Weather_Data_Arr_Rel_Insert_Input = {
  data: Array<Weather_Data_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Weather_Data_On_Conflict>;
};

/** aggregate avg on columns */
export type Weather_Data_Avg_Fields = {
  __typename?: 'weather_data_avg_fields';
  air_temperature?: Maybe<Scalars['Float']['output']>;
  humidity?: Maybe<Scalars['Float']['output']>;
  pressure?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  track_temperature?: Maybe<Scalars['Float']['output']>;
  wind_direction?: Maybe<Scalars['Float']['output']>;
  wind_speed?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "weather_data" */
export type Weather_Data_Avg_Order_By = {
  air_temperature?: InputMaybe<Order_By>;
  humidity?: InputMaybe<Order_By>;
  pressure?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  track_temperature?: InputMaybe<Order_By>;
  wind_direction?: InputMaybe<Order_By>;
  wind_speed?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "weather_data". All fields are combined with a logical 'AND'. */
export type Weather_Data_Bool_Exp = {
  _and?: InputMaybe<Array<Weather_Data_Bool_Exp>>;
  _not?: InputMaybe<Weather_Data_Bool_Exp>;
  _or?: InputMaybe<Array<Weather_Data_Bool_Exp>>;
  air_temperature?: InputMaybe<Numeric_Comparison_Exp>;
  humidity?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  pressure?: InputMaybe<Numeric_Comparison_Exp>;
  rainfall?: InputMaybe<Boolean_Comparison_Exp>;
  session?: InputMaybe<Sessions_Bool_Exp>;
  session_id?: InputMaybe<String_Comparison_Exp>;
  session_time?: InputMaybe<Bigint_Comparison_Exp>;
  track_temperature?: InputMaybe<Numeric_Comparison_Exp>;
  wind_direction?: InputMaybe<Int_Comparison_Exp>;
  wind_speed?: InputMaybe<Numeric_Comparison_Exp>;
};

/** unique or primary key constraints on table "weather_data" */
export enum Weather_Data_Constraint {
  /** unique or primary key constraint on columns "id" */
  WeatherDataPkey = 'weather_data_pkey',
}

/** input type for incrementing numeric columns in table "weather_data" */
export type Weather_Data_Inc_Input = {
  air_temperature?: InputMaybe<Scalars['numeric']['input']>;
  humidity?: InputMaybe<Scalars['numeric']['input']>;
  pressure?: InputMaybe<Scalars['numeric']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  track_temperature?: InputMaybe<Scalars['numeric']['input']>;
  wind_direction?: InputMaybe<Scalars['Int']['input']>;
  wind_speed?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "weather_data" */
export type Weather_Data_Insert_Input = {
  air_temperature?: InputMaybe<Scalars['numeric']['input']>;
  humidity?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  pressure?: InputMaybe<Scalars['numeric']['input']>;
  rainfall?: InputMaybe<Scalars['Boolean']['input']>;
  session?: InputMaybe<Sessions_Obj_Rel_Insert_Input>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  track_temperature?: InputMaybe<Scalars['numeric']['input']>;
  wind_direction?: InputMaybe<Scalars['Int']['input']>;
  wind_speed?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate max on columns */
export type Weather_Data_Max_Fields = {
  __typename?: 'weather_data_max_fields';
  air_temperature?: Maybe<Scalars['numeric']['output']>;
  humidity?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  pressure?: Maybe<Scalars['numeric']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  track_temperature?: Maybe<Scalars['numeric']['output']>;
  wind_direction?: Maybe<Scalars['Int']['output']>;
  wind_speed?: Maybe<Scalars['numeric']['output']>;
};

/** order by max() on columns of table "weather_data" */
export type Weather_Data_Max_Order_By = {
  air_temperature?: InputMaybe<Order_By>;
  humidity?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pressure?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  track_temperature?: InputMaybe<Order_By>;
  wind_direction?: InputMaybe<Order_By>;
  wind_speed?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Weather_Data_Min_Fields = {
  __typename?: 'weather_data_min_fields';
  air_temperature?: Maybe<Scalars['numeric']['output']>;
  humidity?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  pressure?: Maybe<Scalars['numeric']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  track_temperature?: Maybe<Scalars['numeric']['output']>;
  wind_direction?: Maybe<Scalars['Int']['output']>;
  wind_speed?: Maybe<Scalars['numeric']['output']>;
};

/** order by min() on columns of table "weather_data" */
export type Weather_Data_Min_Order_By = {
  air_temperature?: InputMaybe<Order_By>;
  humidity?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pressure?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  track_temperature?: InputMaybe<Order_By>;
  wind_direction?: InputMaybe<Order_By>;
  wind_speed?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "weather_data" */
export type Weather_Data_Mutation_Response = {
  __typename?: 'weather_data_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Weather_Data>;
};

/** on_conflict condition type for table "weather_data" */
export type Weather_Data_On_Conflict = {
  constraint: Weather_Data_Constraint;
  update_columns?: Array<Weather_Data_Update_Column>;
  where?: InputMaybe<Weather_Data_Bool_Exp>;
};

/** Ordering options when selecting data from "weather_data". */
export type Weather_Data_Order_By = {
  air_temperature?: InputMaybe<Order_By>;
  humidity?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pressure?: InputMaybe<Order_By>;
  rainfall?: InputMaybe<Order_By>;
  session?: InputMaybe<Sessions_Order_By>;
  session_id?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  track_temperature?: InputMaybe<Order_By>;
  wind_direction?: InputMaybe<Order_By>;
  wind_speed?: InputMaybe<Order_By>;
};

/** primary key columns input for table: weather_data */
export type Weather_Data_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "weather_data" */
export enum Weather_Data_Select_Column {
  /** column name */
  AirTemperature = 'air_temperature',
  /** column name */
  Humidity = 'humidity',
  /** column name */
  Id = 'id',
  /** column name */
  Pressure = 'pressure',
  /** column name */
  Rainfall = 'rainfall',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  SessionTime = 'session_time',
  /** column name */
  TrackTemperature = 'track_temperature',
  /** column name */
  WindDirection = 'wind_direction',
  /** column name */
  WindSpeed = 'wind_speed',
}

/** select "weather_data_aggregate_bool_exp_bool_and_arguments_columns" columns of table "weather_data" */
export enum Weather_Data_Select_Column_Weather_Data_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Rainfall = 'rainfall',
}

/** select "weather_data_aggregate_bool_exp_bool_or_arguments_columns" columns of table "weather_data" */
export enum Weather_Data_Select_Column_Weather_Data_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Rainfall = 'rainfall',
}

/** input type for updating data in table "weather_data" */
export type Weather_Data_Set_Input = {
  air_temperature?: InputMaybe<Scalars['numeric']['input']>;
  humidity?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  pressure?: InputMaybe<Scalars['numeric']['input']>;
  rainfall?: InputMaybe<Scalars['Boolean']['input']>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  track_temperature?: InputMaybe<Scalars['numeric']['input']>;
  wind_direction?: InputMaybe<Scalars['Int']['input']>;
  wind_speed?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate stddev on columns */
export type Weather_Data_Stddev_Fields = {
  __typename?: 'weather_data_stddev_fields';
  air_temperature?: Maybe<Scalars['Float']['output']>;
  humidity?: Maybe<Scalars['Float']['output']>;
  pressure?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  track_temperature?: Maybe<Scalars['Float']['output']>;
  wind_direction?: Maybe<Scalars['Float']['output']>;
  wind_speed?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "weather_data" */
export type Weather_Data_Stddev_Order_By = {
  air_temperature?: InputMaybe<Order_By>;
  humidity?: InputMaybe<Order_By>;
  pressure?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  track_temperature?: InputMaybe<Order_By>;
  wind_direction?: InputMaybe<Order_By>;
  wind_speed?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Weather_Data_Stddev_Pop_Fields = {
  __typename?: 'weather_data_stddev_pop_fields';
  air_temperature?: Maybe<Scalars['Float']['output']>;
  humidity?: Maybe<Scalars['Float']['output']>;
  pressure?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  track_temperature?: Maybe<Scalars['Float']['output']>;
  wind_direction?: Maybe<Scalars['Float']['output']>;
  wind_speed?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "weather_data" */
export type Weather_Data_Stddev_Pop_Order_By = {
  air_temperature?: InputMaybe<Order_By>;
  humidity?: InputMaybe<Order_By>;
  pressure?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  track_temperature?: InputMaybe<Order_By>;
  wind_direction?: InputMaybe<Order_By>;
  wind_speed?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Weather_Data_Stddev_Samp_Fields = {
  __typename?: 'weather_data_stddev_samp_fields';
  air_temperature?: Maybe<Scalars['Float']['output']>;
  humidity?: Maybe<Scalars['Float']['output']>;
  pressure?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  track_temperature?: Maybe<Scalars['Float']['output']>;
  wind_direction?: Maybe<Scalars['Float']['output']>;
  wind_speed?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "weather_data" */
export type Weather_Data_Stddev_Samp_Order_By = {
  air_temperature?: InputMaybe<Order_By>;
  humidity?: InputMaybe<Order_By>;
  pressure?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  track_temperature?: InputMaybe<Order_By>;
  wind_direction?: InputMaybe<Order_By>;
  wind_speed?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "weather_data" */
export type Weather_Data_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Weather_Data_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Weather_Data_Stream_Cursor_Value_Input = {
  air_temperature?: InputMaybe<Scalars['numeric']['input']>;
  humidity?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  pressure?: InputMaybe<Scalars['numeric']['input']>;
  rainfall?: InputMaybe<Scalars['Boolean']['input']>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  track_temperature?: InputMaybe<Scalars['numeric']['input']>;
  wind_direction?: InputMaybe<Scalars['Int']['input']>;
  wind_speed?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Weather_Data_Sum_Fields = {
  __typename?: 'weather_data_sum_fields';
  air_temperature?: Maybe<Scalars['numeric']['output']>;
  humidity?: Maybe<Scalars['numeric']['output']>;
  pressure?: Maybe<Scalars['numeric']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  track_temperature?: Maybe<Scalars['numeric']['output']>;
  wind_direction?: Maybe<Scalars['Int']['output']>;
  wind_speed?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "weather_data" */
export type Weather_Data_Sum_Order_By = {
  air_temperature?: InputMaybe<Order_By>;
  humidity?: InputMaybe<Order_By>;
  pressure?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  track_temperature?: InputMaybe<Order_By>;
  wind_direction?: InputMaybe<Order_By>;
  wind_speed?: InputMaybe<Order_By>;
};

/** update columns of table "weather_data" */
export enum Weather_Data_Update_Column {
  /** column name */
  AirTemperature = 'air_temperature',
  /** column name */
  Humidity = 'humidity',
  /** column name */
  Id = 'id',
  /** column name */
  Pressure = 'pressure',
  /** column name */
  Rainfall = 'rainfall',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  SessionTime = 'session_time',
  /** column name */
  TrackTemperature = 'track_temperature',
  /** column name */
  WindDirection = 'wind_direction',
  /** column name */
  WindSpeed = 'wind_speed',
}

export type Weather_Data_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Weather_Data_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Weather_Data_Set_Input>;
  /** filter the rows which have to be updated */
  where: Weather_Data_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Weather_Data_Var_Pop_Fields = {
  __typename?: 'weather_data_var_pop_fields';
  air_temperature?: Maybe<Scalars['Float']['output']>;
  humidity?: Maybe<Scalars['Float']['output']>;
  pressure?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  track_temperature?: Maybe<Scalars['Float']['output']>;
  wind_direction?: Maybe<Scalars['Float']['output']>;
  wind_speed?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "weather_data" */
export type Weather_Data_Var_Pop_Order_By = {
  air_temperature?: InputMaybe<Order_By>;
  humidity?: InputMaybe<Order_By>;
  pressure?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  track_temperature?: InputMaybe<Order_By>;
  wind_direction?: InputMaybe<Order_By>;
  wind_speed?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Weather_Data_Var_Samp_Fields = {
  __typename?: 'weather_data_var_samp_fields';
  air_temperature?: Maybe<Scalars['Float']['output']>;
  humidity?: Maybe<Scalars['Float']['output']>;
  pressure?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  track_temperature?: Maybe<Scalars['Float']['output']>;
  wind_direction?: Maybe<Scalars['Float']['output']>;
  wind_speed?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "weather_data" */
export type Weather_Data_Var_Samp_Order_By = {
  air_temperature?: InputMaybe<Order_By>;
  humidity?: InputMaybe<Order_By>;
  pressure?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  track_temperature?: InputMaybe<Order_By>;
  wind_direction?: InputMaybe<Order_By>;
  wind_speed?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Weather_Data_Variance_Fields = {
  __typename?: 'weather_data_variance_fields';
  air_temperature?: Maybe<Scalars['Float']['output']>;
  humidity?: Maybe<Scalars['Float']['output']>;
  pressure?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  track_temperature?: Maybe<Scalars['Float']['output']>;
  wind_direction?: Maybe<Scalars['Float']['output']>;
  wind_speed?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "weather_data" */
export type Weather_Data_Variance_Order_By = {
  air_temperature?: InputMaybe<Order_By>;
  humidity?: InputMaybe<Order_By>;
  pressure?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  track_temperature?: InputMaybe<Order_By>;
  wind_direction?: InputMaybe<Order_By>;
  wind_speed?: InputMaybe<Order_By>;
};

export type EventWinnersFragment = {
  __typename?: 'drivers';
  full_name?: string | null;
  year?: number | null;
  driver_sessions: Array<{
    __typename?: 'driver_sessions';
    constructorByConstructorId?: {
      __typename?: 'constructors';
      name?: string | null;
      color?: string | null;
    } | null;
  }>;
} & { ' $fragmentName'?: 'EventWinnersFragment' };

export type FiaDocsFragment = {
  __typename?: 'fia_documents';
  title: string;
  url?: string | null;
  publish_time?: any | null;
} & { ' $fragmentName'?: 'FiaDocsFragment' };

export type EventSessionResultsFragment = {
  __typename?: 'events';
  competition: Array<
    {
      __typename?: 'sessions';
      scheduled_start_time_utc?: string | null;
      name?: Session_Name_Choices_Enum | null;
    } & {
      ' $fragmentRefs'?: {
        EventCompetitionResultsFragment: EventCompetitionResultsFragment;
      };
    }
  >;
  qualifying: Array<
    {
      __typename?: 'sessions';
      scheduled_start_time_utc?: string | null;
      name?: Session_Name_Choices_Enum | null;
    } & {
      ' $fragmentRefs'?: {
        EventQualifyingResultsFragment: EventQualifyingResultsFragment;
      };
    }
  >;
  practice: Array<
    {
      __typename?: 'sessions';
      scheduled_start_time_utc?: string | null;
      name?: Session_Name_Choices_Enum | null;
    } & {
      ' $fragmentRefs'?: {
        EventPracticeResultsFragment: EventPracticeResultsFragment;
      };
    }
  >;
} & { ' $fragmentName'?: 'EventSessionResultsFragment' };

export type EventCompetitionResultsFragment = {
  __typename?: 'sessions';
  driver_sessions: Array<{
    __typename?: 'driver_sessions';
    driver?: {
      __typename?: 'drivers';
      abbreviation?: string | null;
      full_name?: string | null;
      number?: string | null;
      headshot_url?: string | null;
    } | null;
    constructorByConstructorId?: {
      __typename?: 'constructors';
      color?: string | null;
      name?: string | null;
    } | null;
    results: Array<{
      __typename?: 'results';
      finishing_position?: number | null;
      classified_position?: string | null;
      grid_position?: number | null;
      total_race_time?: number | null;
      laps?: number | null;
      points?: number | null;
    }>;
    fastest_lap: Array<{
      __typename?: 'laps';
      lap_time?: number | null;
      lap_number?: number | null;
    }>;
  }>;
} & { ' $fragmentName'?: 'EventCompetitionResultsFragment' };

export type EventPracticeResultsFragment = {
  __typename?: 'sessions';
  driver_sessions: Array<{
    __typename?: 'driver_sessions';
    driver?: {
      __typename?: 'drivers';
      abbreviation?: string | null;
      full_name?: string | null;
      number?: string | null;
      headshot_url?: string | null;
    } | null;
    constructorByConstructorId?: {
      __typename?: 'constructors';
      color?: string | null;
      name?: string | null;
    } | null;
    fastest_lap: Array<{
      __typename?: 'laps';
      lap_time?: number | null;
      lap_number?: number | null;
    }>;
    laps_aggregate: {
      __typename?: 'laps_aggregate';
      aggregate?: {
        __typename?: 'laps_aggregate_fields';
        count: number;
      } | null;
    };
  }>;
} & { ' $fragmentName'?: 'EventPracticeResultsFragment' };

export type EventQualifyingResultsFragment = {
  __typename?: 'sessions';
  driver_sessions: Array<{
    __typename?: 'driver_sessions';
    driver?: {
      __typename?: 'drivers';
      abbreviation?: string | null;
      full_name?: string | null;
      number?: string | null;
      headshot_url?: string | null;
    } | null;
    constructorByConstructorId?: {
      __typename?: 'constructors';
      color?: string | null;
      name?: string | null;
    } | null;
    results: Array<{
      __typename?: 'results';
      finishing_position?: number | null;
      q1_time?: number | null;
      q2_time?: number | null;
      q3_time?: number | null;
    }>;
  }>;
} & { ' $fragmentName'?: 'EventQualifyingResultsFragment' };

export type EventSessionCardsFragment = {
  __typename?: 'schedule';
  session1?: Session_Name_Choices_Enum | null;
  session1_date?: string | null;
  session2?: Session_Name_Choices_Enum | null;
  session2_date?: string | null;
  session3?: Session_Name_Choices_Enum | null;
  session3_date?: string | null;
  session4?: Session_Name_Choices_Enum | null;
  session4_date?: string | null;
  session5?: Session_Name_Choices_Enum | null;
  session5_date?: string | null;
} & { ' $fragmentName'?: 'EventSessionCardsFragment' };

export type Event_ScheduleFragmentFragment = {
  __typename?: 'schedule';
  event_name?: string | null;
  round_number?: number | null;
  event_date?: string | null;
  event_format?: Event_Format_Choices_Enum | null;
  year?: number | null;
  location?: string | null;
  country?: string | null;
  session1?: Session_Name_Choices_Enum | null;
  session1_date?: string | null;
  session2?: Session_Name_Choices_Enum | null;
  session2_date?: string | null;
  session3?: Session_Name_Choices_Enum | null;
  session3_date?: string | null;
  session4?: Session_Name_Choices_Enum | null;
  session4_date?: string | null;
  session5?: Session_Name_Choices_Enum | null;
  session5_date?: string | null;
} & { ' $fragmentName'?: 'Event_ScheduleFragmentFragment' };

export type SeasonScheduleFragment = ({
  __typename?: 'schedule';
  event_name?: string | null;
  round_number?: number | null;
  location?: string | null;
  country?: string | null;
  session5_date_utc?: string | null;
} & {
  ' $fragmentRefs'?: {
    Event_ScheduleFragmentFragment: Event_ScheduleFragmentFragment;
  };
}) & { ' $fragmentName'?: 'SeasonScheduleFragment' };

export type SeasonCircuitsFragment = ({
  __typename?: 'circuits';
  location?: string | null;
  country?: string | null;
} & {
  ' $fragmentRefs'?: { CircuitDetailsFragment: CircuitDetailsFragment };
}) & { ' $fragmentName'?: 'SeasonCircuitsFragment' };

export type DriverStandingsFragment = {
  __typename?: 'drivers';
  abbreviation?: string | null;
  full_name?: string | null;
  latest_constructor: Array<{
    __typename?: 'driver_sessions';
    constructor?: {
      __typename?: 'constructors';
      name?: string | null;
      color?: string | null;
    } | null;
  }>;
  driver_standings: Array<{
    __typename?: 'driver_standings';
    round?: number | null;
    points?: number | null;
    position?: number | null;
  }>;
} & { ' $fragmentName'?: 'DriverStandingsFragment' };

export type ConstructorStandingsFragment = {
  __typename?: 'constructors';
  name?: string | null;
  color?: string | null;
  constructor_standings: Array<{
    __typename?: 'constructor_standings';
    round?: number | null;
    points?: number | null;
    position?: number | null;
  }>;
} & { ' $fragmentName'?: 'ConstructorStandingsFragment' };

export type MapScheduleLocationFragment = {
  __typename?: 'schedule';
  round_number?: number | null;
  event_name?: string | null;
  event_date?: string | null;
  location?: string | null;
  longitude?: number | null;
  latitude?: number | null;
} & { ' $fragmentName'?: 'MapScheduleLocationFragment' };

export type ScheduleSessionsFragment = {
  __typename?: 'schedule';
  year?: number | null;
  event_name?: string | null;
  session1?: Session_Name_Choices_Enum | null;
  session2?: Session_Name_Choices_Enum | null;
  session3?: Session_Name_Choices_Enum | null;
  session4?: Session_Name_Choices_Enum | null;
  session5?: Session_Name_Choices_Enum | null;
  session1_date_utc?: string | null;
  session2_date_utc?: string | null;
  session3_date_utc?: string | null;
  session4_date_utc?: string | null;
  session5_date_utc?: string | null;
} & { ' $fragmentName'?: 'ScheduleSessionsFragment' };

export type MapScheduleFragmentFragment = {
  __typename?: 'schedule';
  event_name?: string | null;
  round_number?: number | null;
  event_date?: string | null;
  year?: number | null;
} & { ' $fragmentName'?: 'MapScheduleFragmentFragment' };

export type TopThreeRaceResultsFragment = {
  __typename?: 'events';
  topThreeRace: Array<{
    __typename?: 'sessions';
    driver_sessions: Array<{
      __typename?: 'driver_sessions';
      results: Array<{
        __typename?: 'results';
        finishing_position?: number | null;
      }>;
      driver?: { __typename?: 'drivers'; full_name?: string | null } | null;
      constructorByConstructorId?: {
        __typename?: 'constructors';
        name?: string | null;
        color?: string | null;
      } | null;
    }>;
  }>;
} & { ' $fragmentName'?: 'TopThreeRaceResultsFragment' };

export type GetMapScheduleQueryVariables = Exact<{
  year: Scalars['Int']['input'];
}>;

export type GetMapScheduleQuery = {
  __typename?: 'query_root';
  schedule: Array<
    { __typename?: 'schedule'; event_name?: string | null } & {
      ' $fragmentRefs'?: {
        MapScheduleFragmentFragment: MapScheduleFragmentFragment;
        MapScheduleLocationFragment: MapScheduleLocationFragment;
        ScheduleEventDetailsFragment: ScheduleEventDetailsFragment;
        ScheduleSessionsFragment: ScheduleSessionsFragment;
      };
    }
  >;
  events: Array<
    { __typename?: 'events'; name?: string | null } & {
      ' $fragmentRefs'?: {
        RaceResultsFragment: RaceResultsFragment;
        TopThreeRaceResultsFragment: TopThreeRaceResultsFragment;
      };
    }
  >;
};

export type GetSeasonPageQueryVariables = Exact<{
  year: Scalars['Int']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetSeasonPageQuery = {
  __typename?: 'query_root';
  drivers: Array<
    { __typename?: 'drivers' } & {
      ' $fragmentRefs'?: { DriverStandingsFragment: DriverStandingsFragment };
    }
  >;
  constructors: Array<
    { __typename?: 'constructors' } & {
      ' $fragmentRefs'?: {
        ConstructorStandingsFragment: ConstructorStandingsFragment;
      };
    }
  >;
  schedule: Array<
    { __typename?: 'schedule' } & {
      ' $fragmentRefs'?: { SeasonScheduleFragment: SeasonScheduleFragment };
    }
  >;
  circuits: Array<
    { __typename?: 'circuits' } & {
      ' $fragmentRefs'?: { SeasonCircuitsFragment: SeasonCircuitsFragment };
    }
  >;
};

export type CircuitDetailsFragment = {
  __typename?: 'circuits';
  circuit_details?: unknown | null;
} & { ' $fragmentName'?: 'CircuitDetailsFragment' };

export type ScheduleEventDetailsFragment = {
  __typename?: 'schedule';
  year?: number | null;
  event_name?: string | null;
  event_date?: string | null;
  round_number?: number | null;
  location?: string | null;
  country?: string | null;
  event_format?: Event_Format_Choices_Enum | null;
} & { ' $fragmentName'?: 'ScheduleEventDetailsFragment' };

export type GetSeasonEventNamesQueryVariables = Exact<{
  year: Scalars['Int']['input'];
  event: Scalars['String']['input'];
}>;

export type GetSeasonEventNamesQuery = {
  __typename?: 'query_root';
  schedule: Array<{ __typename?: 'schedule'; event_name?: string | null }>;
};

export type GetNavEventsQueryVariables = Exact<{
  year: Scalars['Int']['input'];
}>;

export type GetNavEventsQuery = {
  __typename?: 'query_root';
  schedule: Array<{
    __typename?: 'schedule';
    round_number?: number | null;
    event_name?: string | null;
    event_format?: Event_Format_Choices_Enum | null;
  }>;
};

export type GetNavSessionsQueryVariables = Exact<{
  year: Scalars['Int']['input'];
  event: Scalars['String']['input'];
}>;

export type GetNavSessionsQuery = {
  __typename?: 'query_root';
  events: Array<{
    __typename?: 'events';
    sessions: Array<{
      __typename?: 'sessions';
      name?: Session_Name_Choices_Enum | null;
    }>;
  }>;
};

export type GetNextEventQueryVariables = Exact<{
  today: Scalars['String']['input'];
}>;

export type GetNextEventQuery = {
  __typename?: 'query_root';
  schedule: Array<{
    __typename?: 'schedule';
    year?: number | null;
    event_name?: string | null;
    round_number?: number | null;
    location?: string | null;
    country?: string | null;
    event_format?: Event_Format_Choices_Enum | null;
    session1_date_utc?: string | null;
    session2_date_utc?: string | null;
    session3_date_utc?: string | null;
    session4_date_utc?: string | null;
    session5_date_utc?: string | null;
  }>;
};

export type GetNextEventCircuitQueryVariables = Exact<{
  location: Scalars['String']['input'];
  country: Scalars['String']['input'];
  year: Scalars['Int']['input'];
}>;

export type GetNextEventCircuitQuery = {
  __typename?: 'query_root';
  circuits: Array<
    { __typename?: 'circuits' } & {
      ' $fragmentRefs'?: { CircuitDetailsFragment: CircuitDetailsFragment };
    }
  >;
};

export type RaceResultsFragment = {
  __typename?: 'events';
  name?: string | null;
  raceSession: Array<{
    __typename?: 'sessions';
    driver_sessions: Array<{
      __typename?: 'driver_sessions';
      results: Array<{
        __typename?: 'results';
        finishing_position?: number | null;
      }>;
      driver?: { __typename?: 'drivers'; full_name?: string | null } | null;
      constructorByConstructorId?: {
        __typename?: 'constructors';
        name?: string | null;
        color?: string | null;
      } | null;
    }>;
  }>;
} & { ' $fragmentName'?: 'RaceResultsFragment' };

export type GetConstructorQueryVariables = Exact<{
  _id: Scalars['String']['input'];
}>;

export type GetConstructorQuery = {
  __typename?: 'query_root';
  constructors: Array<{
    __typename?: 'constructors';
    name?: string | null;
    color?: string | null;
    year?: number | null;
    driver_sessions: Array<{
      __typename?: 'driver_sessions';
      driver?: {
        __typename?: 'drivers';
        full_name?: string | null;
        number?: string | null;
        headshot_url?: string | null;
        country_code?: string | null;
      } | null;
      session?: {
        __typename?: 'sessions';
        name?: Session_Name_Choices_Enum | null;
        event?: {
          __typename?: 'events';
          round_number?: number | null;
          name?: string | null;
          year?: number | null;
        } | null;
      } | null;
      results: Array<{
        __typename?: 'results';
        points?: number | null;
        classified_position?: string | null;
        grid_position?: number | null;
      }>;
    }>;
  }>;
};

export type GetEventDetailsQueryVariables = Exact<{
  year: Scalars['Int']['input'];
  event: Scalars['String']['input'];
}>;

export type GetEventDetailsQuery = {
  __typename?: 'query_root';
  events: Array<
    {
      __typename?: 'events';
      sessions_aggregate: {
        __typename?: 'sessions_aggregate';
        aggregate?: {
          __typename?: 'sessions_aggregate_fields';
          count: number;
        } | null;
      };
    } & {
      ' $fragmentRefs'?: {
        EventSessionResultsFragment: EventSessionResultsFragment;
      };
    }
  >;
  circuits: Array<
    { __typename?: 'circuits' } & {
      ' $fragmentRefs'?: { CircuitDetailsFragment: CircuitDetailsFragment };
    }
  >;
  fia_documents: Array<
    { __typename?: 'fia_documents' } & {
      ' $fragmentRefs'?: { FiaDocsFragment: FiaDocsFragment };
    }
  >;
  drivers: Array<
    { __typename?: 'drivers' } & {
      ' $fragmentRefs'?: { EventWinnersFragment: EventWinnersFragment };
    }
  >;
  schedule: Array<
    {
      __typename?: 'schedule';
      location?: string | null;
      event_name?: string | null;
    } & {
      ' $fragmentRefs'?: {
        EventSessionCardsFragment: EventSessionCardsFragment;
        ScheduleEventDetailsFragment: ScheduleEventDetailsFragment;
      };
    }
  >;
};

export type GetStandingsQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;

export type GetStandingsQuery = {
  __typename?: 'query_root';
  events: Array<{
    __typename?: 'events';
    round_number?: number | null;
    name?: string | null;
    format?: Event_Format_Choices_Enum | null;
    race_sessions: Array<{
      __typename?: 'sessions';
      driver_sessions: Array<{
        __typename?: 'driver_sessions';
        driver?: {
          __typename?: 'drivers';
          abbreviation?: string | null;
        } | null;
        constructorByConstructorId?: {
          __typename?: 'constructors';
          name?: string | null;
        } | null;
        results: Array<{
          __typename?: 'results';
          classified_position?: string | null;
        }>;
      }>;
    }>;
  }>;
  drivers: Array<{
    __typename?: 'drivers';
    abbreviation?: string | null;
    full_name?: string | null;
    latest_constructor: Array<{
      __typename?: 'driver_sessions';
      constructor?: {
        __typename?: 'constructors';
        name?: string | null;
        color?: string | null;
      } | null;
    }>;
    driver_standings: Array<{
      __typename?: 'driver_standings';
      round?: number | null;
      points?: number | null;
      position?: number | null;
    }>;
  }>;
  constructors: Array<{
    __typename?: 'constructors';
    name?: string | null;
    color?: string | null;
    lastRoundPoints: Array<{
      __typename?: 'constructor_standings';
      points?: number | null;
    }>;
    constructor_standings: Array<{
      __typename?: 'constructor_standings';
      round?: number | null;
      points?: number | null;
      position?: number | null;
    }>;
  }>;
};

export type SessionQueryVariables = Exact<{
  year: Scalars['Int']['input'];
  event: Scalars['String']['input'];
  session: Session_Name_Choices_Enum;
}>;

export type SessionQuery = {
  __typename?: 'query_root';
  sessions: Array<{
    __typename?: 'sessions';
    name?: Session_Name_Choices_Enum | null;
    total_laps?: number | null;
    scheduled_start_time_utc?: string | null;
    event?: { __typename?: 'events'; name?: string | null } | null;
  }>;
};

export type SessionResultsQueryVariables = Exact<{
  year: Scalars['Int']['input'];
  event: Scalars['String']['input'];
  session: Session_Name_Choices_Enum;
}>;

export type SessionResultsQuery = {
  __typename?: 'query_root';
  sessions: Array<{
    __typename?: 'sessions';
    name?: Session_Name_Choices_Enum | null;
    event?: { __typename?: 'events'; name?: string | null } | null;
    driver_sessions: Array<{
      __typename?: 'driver_sessions';
      constructorByConstructorId?: {
        __typename?: 'constructors';
        name?: string | null;
        color?: string | null;
      } | null;
      driver?: {
        __typename?: 'drivers';
        abbreviation?: string | null;
        full_name?: string | null;
        number?: string | null;
        headshot_url?: string | null;
      } | null;
      results: Array<{
        __typename?: 'results';
        grid_position?: number | null;
        finishing_position?: number | null;
        points?: number | null;
        status?: string | null;
        classified_position?: string | null;
        total_race_time?: number | null;
      }>;
      fastest_lap: Array<{
        __typename?: 'laps';
        lap_number?: number | null;
        stint?: number | null;
        lap_time?: number | null;
      }>;
    }>;
  }>;
};

export type GetSessionFastestTimesQueryVariables = Exact<{
  year: Scalars['Int']['input'];
  event: Scalars['String']['input'];
  session: Session_Name_Choices_Enum;
}>;

export type GetSessionFastestTimesQuery = {
  __typename?: 'query_root';
  sessions: Array<{
    __typename?: 'sessions';
    name?: Session_Name_Choices_Enum | null;
    event?: { __typename?: 'events'; name?: string | null } | null;
    driver_sessions: Array<{
      __typename?: 'driver_sessions';
      constructorByConstructorId?: {
        __typename?: 'constructors';
        name?: string | null;
        color?: string | null;
      } | null;
      driver?: { __typename?: 'drivers'; abbreviation?: string | null } | null;
      fastest_lap: Array<{
        __typename?: 'laps';
        lap_number?: number | null;
        stint?: number | null;
        lap_time?: number | null;
        sector1?: number | null;
        sector2?: number | null;
        sector3?: number | null;
      }>;
      fastest_sector1: Array<{
        __typename?: 'laps';
        lap_number?: number | null;
        stint?: number | null;
        sector1?: number | null;
      }>;
      fastest_sector2: Array<{
        __typename?: 'laps';
        lap_number?: number | null;
        stint?: number | null;
        sector2?: number | null;
      }>;
      fastest_sector3: Array<{
        __typename?: 'laps';
        lap_number?: number | null;
        stint?: number | null;
        sector3?: number | null;
      }>;
    }>;
  }>;
};

export type GetSessionStintsQueryVariables = Exact<{
  year: Scalars['Int']['input'];
  event: Scalars['String']['input'];
  session: Session_Name_Choices_Enum;
}>;

export type GetSessionStintsQuery = {
  __typename?: 'query_root';
  sessions: Array<{
    __typename?: 'sessions';
    driver_sessions: Array<{
      __typename?: 'driver_sessions';
      driver?: {
        __typename?: 'drivers';
        abbreviation?: string | null;
        full_name?: string | null;
      } | null;
      laps: Array<{
        __typename?: 'laps';
        stint?: number | null;
        tyre_life?: number | null;
        fresh_tyre?: boolean | null;
        tyre_compound?: { __typename?: 'tyre_compounds'; value: string } | null;
      }>;
    }>;
  }>;
};

export type GetSessionLapTimesQueryVariables = Exact<{
  year: Scalars['Int']['input'];
  event: Scalars['String']['input'];
  session: Session_Name_Choices_Enum;
}>;

export type GetSessionLapTimesQuery = {
  __typename?: 'query_root';
  sessions: Array<{
    __typename?: 'sessions';
    driver_sessions: Array<{
      __typename?: 'driver_sessions';
      constructorByConstructorId?: {
        __typename?: 'constructors';
        name?: string | null;
        color?: string | null;
      } | null;
      driver?: {
        __typename?: 'drivers';
        abbreviation?: string | null;
        full_name?: string | null;
        number?: string | null;
      } | null;
      laps: Array<{
        __typename?: 'laps';
        lap_number?: number | null;
        lap_time?: number | null;
        compound?: Tyre_Compounds_Enum | null;
        session_time?: number | null;
        pitout_time?: number | null;
      }>;
    }>;
  }>;
};

export const EventWinnersFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventWinners' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'drivers' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'driver_sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'session' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'event' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'name' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: '_eq' },
                                        value: {
                                          kind: 'Variable',
                                          name: {
                                            kind: 'Name',
                                            value: 'event',
                                          },
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'name' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: { kind: 'EnumValue', value: 'Race' },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'results' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: {
                              kind: 'Name',
                              value: 'classified_position',
                            },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'StringValue',
                                    value: '1',
                                    block: false,
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'constructorByConstructorId' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'full_name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'year' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EventWinnersFragment, unknown>;
export const FiaDocsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'FIADocs' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'fia_documents' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
          { kind: 'Field', name: { kind: 'Name', value: 'publish_time' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FiaDocsFragment, unknown>;
export const EventCompetitionResultsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventCompetitionResults' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'sessions' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'driver_sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'results_aggregate' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'min' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: {
                                    kind: 'Name',
                                    value: 'finishing_position',
                                  },
                                  value: { kind: 'EnumValue', value: 'asc' },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'driver' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'abbreviation' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'full_name' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'number' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'headshot_url' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'constructorByConstructorId' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'results' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'finishing_position' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'classified_position' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'grid_position' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'total_race_time' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'laps' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'points' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'fastest_lap' },
                  name: { kind: 'Name', value: 'laps' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '1' },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'order_by' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'lap_time' },
                            value: { kind: 'EnumValue', value: 'asc' },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lap_time' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lap_number' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EventCompetitionResultsFragment, unknown>;
export const EventQualifyingResultsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventQualifyingResults' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'sessions' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'driver_sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'results_aggregate' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'min' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: {
                                    kind: 'Name',
                                    value: 'finishing_position',
                                  },
                                  value: { kind: 'EnumValue', value: 'asc' },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'driver' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'abbreviation' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'full_name' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'number' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'headshot_url' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'constructorByConstructorId' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'results' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'finishing_position' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'q1_time' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'q2_time' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'q3_time' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EventQualifyingResultsFragment, unknown>;
export const EventPracticeResultsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventPracticeResults' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'sessions' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'driver_sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'laps_aggregate' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'min' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'lap_time' },
                                  value: { kind: 'EnumValue', value: 'asc' },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'driver' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'abbreviation' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'full_name' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'number' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'headshot_url' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'constructorByConstructorId' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'fastest_lap' },
                  name: { kind: 'Name', value: 'laps' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '1' },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'order_by' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'lap_time' },
                            value: { kind: 'EnumValue', value: 'asc' },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lap_time' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lap_number' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'laps_aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'aggregate' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'count' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EventPracticeResultsFragment, unknown>;
export const EventSessionResultsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventSessionResults' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'events' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'competition' },
            name: { kind: 'Name', value: 'sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'scheduled_start_time_utc' },
                      value: { kind: 'EnumValue', value: 'asc' },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_in' },
                            value: {
                              kind: 'ListValue',
                              values: [
                                { kind: 'EnumValue', value: 'Sprint' },
                                { kind: 'EnumValue', value: 'Race' },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'IntValue', value: '2' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'scheduled_start_time_utc' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'EventCompetitionResults' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'qualifying' },
            name: { kind: 'Name', value: 'sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'scheduled_start_time_utc' },
                      value: { kind: 'EnumValue', value: 'asc' },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_in' },
                            value: {
                              kind: 'ListValue',
                              values: [
                                { kind: 'EnumValue', value: 'Sprint_Shootout' },
                                {
                                  kind: 'EnumValue',
                                  value: 'Sprint_Qualifying',
                                },
                                { kind: 'EnumValue', value: 'Qualifying' },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'IntValue', value: '2' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'scheduled_start_time_utc' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'EventQualifyingResults' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'practice' },
            name: { kind: 'Name', value: 'sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'scheduled_start_time_utc' },
                      value: { kind: 'EnumValue', value: 'asc' },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_in' },
                            value: {
                              kind: 'ListValue',
                              values: [
                                { kind: 'EnumValue', value: 'Practice_1' },
                                { kind: 'EnumValue', value: 'Practice_2' },
                                { kind: 'EnumValue', value: 'Practice_3' },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'IntValue', value: '3' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'scheduled_start_time_utc' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'EventPracticeResults' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventCompetitionResults' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'sessions' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'driver_sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'results_aggregate' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'min' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: {
                                    kind: 'Name',
                                    value: 'finishing_position',
                                  },
                                  value: { kind: 'EnumValue', value: 'asc' },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'driver' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'abbreviation' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'full_name' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'number' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'headshot_url' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'constructorByConstructorId' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'results' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'finishing_position' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'classified_position' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'grid_position' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'total_race_time' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'laps' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'points' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'fastest_lap' },
                  name: { kind: 'Name', value: 'laps' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '1' },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'order_by' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'lap_time' },
                            value: { kind: 'EnumValue', value: 'asc' },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lap_time' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lap_number' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventQualifyingResults' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'sessions' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'driver_sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'results_aggregate' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'min' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: {
                                    kind: 'Name',
                                    value: 'finishing_position',
                                  },
                                  value: { kind: 'EnumValue', value: 'asc' },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'driver' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'abbreviation' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'full_name' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'number' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'headshot_url' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'constructorByConstructorId' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'results' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'finishing_position' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'q1_time' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'q2_time' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'q3_time' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventPracticeResults' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'sessions' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'driver_sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'laps_aggregate' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'min' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'lap_time' },
                                  value: { kind: 'EnumValue', value: 'asc' },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'driver' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'abbreviation' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'full_name' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'number' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'headshot_url' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'constructorByConstructorId' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'fastest_lap' },
                  name: { kind: 'Name', value: 'laps' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '1' },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'order_by' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'lap_time' },
                            value: { kind: 'EnumValue', value: 'asc' },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lap_time' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lap_number' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'laps_aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'aggregate' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'count' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EventSessionResultsFragment, unknown>;
export const EventSessionCardsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventSessionCards' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'schedule' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'session1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session1_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session2' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session2_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session3' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session3_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session4' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session4_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session5' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session5_date' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EventSessionCardsFragment, unknown>;
export const Event_ScheduleFragmentFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Event_ScheduleFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'schedule' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'event_name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'round_number' } },
          { kind: 'Field', name: { kind: 'Name', value: 'event_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'event_format' } },
          { kind: 'Field', name: { kind: 'Name', value: 'year' } },
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          { kind: 'Field', name: { kind: 'Name', value: 'country' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session1_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session2' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session2_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session3' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session3_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session4' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session4_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session5' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session5_date' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<Event_ScheduleFragmentFragment, unknown>;
export const SeasonScheduleFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SeasonSchedule' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'schedule' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'event_name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'round_number' } },
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          { kind: 'Field', name: { kind: 'Name', value: 'country' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session5_date_utc' } },
          {
            kind: 'FragmentSpread',
            name: { kind: 'Name', value: 'Event_ScheduleFragment' },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Event_ScheduleFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'schedule' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'event_name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'round_number' } },
          { kind: 'Field', name: { kind: 'Name', value: 'event_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'event_format' } },
          { kind: 'Field', name: { kind: 'Name', value: 'year' } },
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          { kind: 'Field', name: { kind: 'Name', value: 'country' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session1_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session2' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session2_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session3' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session3_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session4' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session4_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session5' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session5_date' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SeasonScheduleFragment, unknown>;
export const CircuitDetailsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CircuitDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'circuits' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'circuit_details' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CircuitDetailsFragment, unknown>;
export const SeasonCircuitsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SeasonCircuits' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'circuits' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          { kind: 'Field', name: { kind: 'Name', value: 'country' } },
          {
            kind: 'FragmentSpread',
            name: { kind: 'Name', value: 'CircuitDetails' },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CircuitDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'circuits' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'circuit_details' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SeasonCircuitsFragment, unknown>;
export const DriverStandingsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DriverStandings' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'drivers' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'abbreviation' } },
          { kind: 'Field', name: { kind: 'Name', value: 'full_name' } },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'latest_constructor' },
            name: { kind: 'Name', value: 'driver_sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'IntValue', value: '1' },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'session' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'date' },
                            value: { kind: 'EnumValue', value: 'desc' },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'constructor' },
                  name: { kind: 'Name', value: 'constructorByConstructorId' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'driver_standings' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'season' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'year' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'round' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'IntValue', value: '1' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'round' } },
                { kind: 'Field', name: { kind: 'Name', value: 'points' } },
                { kind: 'Field', name: { kind: 'Name', value: 'position' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DriverStandingsFragment, unknown>;
export const ConstructorStandingsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ConstructorStandings' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'constructors' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'color' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'constructor_standings' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'season' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'year' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'round' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'IntValue', value: '1' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'round' } },
                { kind: 'Field', name: { kind: 'Name', value: 'points' } },
                { kind: 'Field', name: { kind: 'Name', value: 'position' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ConstructorStandingsFragment, unknown>;
export const MapScheduleLocationFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MapScheduleLocation' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'schedule' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'round_number' } },
          { kind: 'Field', name: { kind: 'Name', value: 'event_name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'event_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
          { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MapScheduleLocationFragment, unknown>;
export const ScheduleSessionsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ScheduleSessions' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'schedule' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'year' } },
          { kind: 'Field', name: { kind: 'Name', value: 'event_name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session2' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session3' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session4' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session5' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session1_date_utc' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session2_date_utc' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session3_date_utc' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session4_date_utc' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session5_date_utc' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ScheduleSessionsFragment, unknown>;
export const MapScheduleFragmentFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MapScheduleFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'schedule' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'event_name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'round_number' } },
          { kind: 'Field', name: { kind: 'Name', value: 'event_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'year' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MapScheduleFragmentFragment, unknown>;
export const TopThreeRaceResultsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TopThreeRaceResults' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'events' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'topThreeRace' },
            name: { kind: 'Name', value: 'sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'event' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'year' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'year' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: { kind: 'EnumValue', value: 'Race' },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'driver_sessions' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '3' },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'order_by' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'results_aggregate' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'max' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: {
                                          kind: 'Name',
                                          value: 'finishing_position',
                                        },
                                        value: {
                                          kind: 'EnumValue',
                                          value: 'asc',
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'results' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'finishing_position',
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'driver' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'full_name' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'constructorByConstructorId',
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'color' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TopThreeRaceResultsFragment, unknown>;
export const ScheduleEventDetailsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ScheduleEventDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'schedule' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'year' } },
          { kind: 'Field', name: { kind: 'Name', value: 'event_name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'event_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'round_number' } },
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          { kind: 'Field', name: { kind: 'Name', value: 'country' } },
          { kind: 'Field', name: { kind: 'Name', value: 'event_format' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ScheduleEventDetailsFragment, unknown>;
export const RaceResultsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'RaceResults' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'events' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'raceSession' },
            name: { kind: 'Name', value: 'sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'event' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'year' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'year' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: { kind: 'EnumValue', value: 'Race' },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'driver_sessions' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '30' },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'order_by' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'results_aggregate' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'max' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: {
                                          kind: 'Name',
                                          value: 'finishing_position',
                                        },
                                        value: {
                                          kind: 'EnumValue',
                                          value: 'asc',
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'results' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'finishing_position',
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'driver' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'full_name' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'constructorByConstructorId',
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'color' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RaceResultsFragment, unknown>;
export const GetMapScheduleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMapSchedule' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'year' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      directives: [
        { kind: 'Directive', name: { kind: 'Name', value: 'cached' } },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'schedule' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'year' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'year' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'round_number' },
                      value: { kind: 'EnumValue', value: 'asc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'event_name' } },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MapScheduleFragment' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MapScheduleLocation' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ScheduleEventDetails' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ScheduleSessions' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'events' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'year' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'year' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'RaceResults' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'TopThreeRaceResults' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MapScheduleFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'schedule' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'event_name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'round_number' } },
          { kind: 'Field', name: { kind: 'Name', value: 'event_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'year' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MapScheduleLocation' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'schedule' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'round_number' } },
          { kind: 'Field', name: { kind: 'Name', value: 'event_name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'event_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
          { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ScheduleEventDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'schedule' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'year' } },
          { kind: 'Field', name: { kind: 'Name', value: 'event_name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'event_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'round_number' } },
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          { kind: 'Field', name: { kind: 'Name', value: 'country' } },
          { kind: 'Field', name: { kind: 'Name', value: 'event_format' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ScheduleSessions' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'schedule' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'year' } },
          { kind: 'Field', name: { kind: 'Name', value: 'event_name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session2' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session3' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session4' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session5' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session1_date_utc' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session2_date_utc' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session3_date_utc' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session4_date_utc' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session5_date_utc' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'RaceResults' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'events' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'raceSession' },
            name: { kind: 'Name', value: 'sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'event' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'year' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'year' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: { kind: 'EnumValue', value: 'Race' },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'driver_sessions' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '30' },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'order_by' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'results_aggregate' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'max' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: {
                                          kind: 'Name',
                                          value: 'finishing_position',
                                        },
                                        value: {
                                          kind: 'EnumValue',
                                          value: 'asc',
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'results' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'finishing_position',
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'driver' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'full_name' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'constructorByConstructorId',
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'color' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TopThreeRaceResults' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'events' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'topThreeRace' },
            name: { kind: 'Name', value: 'sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'event' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'year' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'year' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: { kind: 'EnumValue', value: 'Race' },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'driver_sessions' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '3' },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'order_by' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'results_aggregate' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'max' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: {
                                          kind: 'Name',
                                          value: 'finishing_position',
                                        },
                                        value: {
                                          kind: 'EnumValue',
                                          value: 'asc',
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'results' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'finishing_position',
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'driver' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'full_name' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'constructorByConstructorId',
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'color' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetMapScheduleQuery, GetMapScheduleQueryVariables>;
export const GetSeasonPageDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetSeasonPage' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'year' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          defaultValue: { kind: 'IntValue', value: '3' },
        },
      ],
      directives: [
        { kind: 'Directive', name: { kind: 'Name', value: 'cached' } },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'drivers' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'driver_standings' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'season' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'year' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: {
                        kind: 'Name',
                        value: 'driver_standings_aggregate',
                      },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'max' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'points' },
                                  value: { kind: 'EnumValue', value: 'desc' },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'DriverStandings' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'constructors' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'constructor_standings' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'season' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'year' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: {
                        kind: 'Name',
                        value: 'constructor_standings_aggregate',
                      },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'max' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'points' },
                                  value: { kind: 'EnumValue', value: 'desc' },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ConstructorStandings' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'schedule' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'year' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'year' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'SeasonSchedule' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'circuits' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'year' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'year' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'SeasonCircuits' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Event_ScheduleFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'schedule' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'event_name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'round_number' } },
          { kind: 'Field', name: { kind: 'Name', value: 'event_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'event_format' } },
          { kind: 'Field', name: { kind: 'Name', value: 'year' } },
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          { kind: 'Field', name: { kind: 'Name', value: 'country' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session1_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session2' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session2_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session3' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session3_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session4' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session4_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session5' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session5_date' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CircuitDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'circuits' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'circuit_details' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DriverStandings' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'drivers' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'abbreviation' } },
          { kind: 'Field', name: { kind: 'Name', value: 'full_name' } },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'latest_constructor' },
            name: { kind: 'Name', value: 'driver_sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'IntValue', value: '1' },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'session' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'date' },
                            value: { kind: 'EnumValue', value: 'desc' },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'constructor' },
                  name: { kind: 'Name', value: 'constructorByConstructorId' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'driver_standings' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'season' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'year' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'round' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'IntValue', value: '1' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'round' } },
                { kind: 'Field', name: { kind: 'Name', value: 'points' } },
                { kind: 'Field', name: { kind: 'Name', value: 'position' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ConstructorStandings' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'constructors' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'color' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'constructor_standings' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'season' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'year' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'round' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'IntValue', value: '1' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'round' } },
                { kind: 'Field', name: { kind: 'Name', value: 'points' } },
                { kind: 'Field', name: { kind: 'Name', value: 'position' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SeasonSchedule' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'schedule' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'event_name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'round_number' } },
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          { kind: 'Field', name: { kind: 'Name', value: 'country' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session5_date_utc' } },
          {
            kind: 'FragmentSpread',
            name: { kind: 'Name', value: 'Event_ScheduleFragment' },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SeasonCircuits' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'circuits' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          { kind: 'Field', name: { kind: 'Name', value: 'country' } },
          {
            kind: 'FragmentSpread',
            name: { kind: 'Name', value: 'CircuitDetails' },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetSeasonPageQuery, GetSeasonPageQueryVariables>;
export const GetSeasonEventNamesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetSeasonEventNames' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'year' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'event' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      directives: [
        { kind: 'Directive', name: { kind: 'Name', value: 'cached' } },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'schedule' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'year' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'year' },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: '_or' },
                      value: {
                        kind: 'ListValue',
                        values: [
                          {
                            kind: 'ObjectValue',
                            fields: [
                              {
                                kind: 'ObjectField',
                                name: { kind: 'Name', value: 'event_name' },
                                value: {
                                  kind: 'ObjectValue',
                                  fields: [
                                    {
                                      kind: 'ObjectField',
                                      name: { kind: 'Name', value: '_regex' },
                                      value: {
                                        kind: 'Variable',
                                        name: { kind: 'Name', value: 'event' },
                                      },
                                    },
                                  ],
                                },
                              },
                            ],
                          },
                          {
                            kind: 'ObjectValue',
                            fields: [
                              {
                                kind: 'ObjectField',
                                name: { kind: 'Name', value: 'country' },
                                value: {
                                  kind: 'ObjectValue',
                                  fields: [
                                    {
                                      kind: 'ObjectField',
                                      name: { kind: 'Name', value: '_regex' },
                                      value: {
                                        kind: 'Variable',
                                        name: { kind: 'Name', value: 'event' },
                                      },
                                    },
                                  ],
                                },
                              },
                            ],
                          },
                          {
                            kind: 'ObjectValue',
                            fields: [
                              {
                                kind: 'ObjectField',
                                name: { kind: 'Name', value: 'location' },
                                value: {
                                  kind: 'ObjectValue',
                                  fields: [
                                    {
                                      kind: 'ObjectField',
                                      name: { kind: 'Name', value: '_regex' },
                                      value: {
                                        kind: 'Variable',
                                        name: { kind: 'Name', value: 'event' },
                                      },
                                    },
                                  ],
                                },
                              },
                            ],
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'event_name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetSeasonEventNamesQuery,
  GetSeasonEventNamesQueryVariables
>;
export const GetNavEventsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetNavEvents' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'year' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      directives: [
        { kind: 'Directive', name: { kind: 'Name', value: 'cached' } },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'schedule' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'round_number' },
                      value: { kind: 'EnumValue', value: 'asc' },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'year' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'year' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'round_number' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'event_name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'event_format' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetNavEventsQuery, GetNavEventsQueryVariables>;
export const GetNavSessionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetNavSessions' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'year' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'event' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      directives: [
        { kind: 'Directive', name: { kind: 'Name', value: 'cached' } },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'events' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'distinct_on' },
                value: { kind: 'EnumValue', value: 'name' },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'year' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'year' },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'event' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'IntValue', value: '1' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sessions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetNavSessionsQuery, GetNavSessionsQueryVariables>;
export const GetNextEventDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetNextEvent' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'today' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'schedule' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'session5_date_utc' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_gte' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'today' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'event_date' },
                      value: { kind: 'EnumValue', value: 'asc' },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'IntValue', value: '1' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'year' } },
                { kind: 'Field', name: { kind: 'Name', value: 'event_name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'round_number' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'location' } },
                { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'event_format' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'session1_date_utc' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'session2_date_utc' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'session3_date_utc' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'session4_date_utc' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'session5_date_utc' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetNextEventQuery, GetNextEventQueryVariables>;
export const GetNextEventCircuitDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetNextEventCircuit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'location' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'country' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'year' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'circuits' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: '_and' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'location' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'location' },
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'country' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'country' },
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'year' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'year' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'IntValue', value: '1' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CircuitDetails' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CircuitDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'circuits' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'circuit_details' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetNextEventCircuitQuery,
  GetNextEventCircuitQueryVariables
>;
export const GetConstructorDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetConstructor' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: '_id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      directives: [
        { kind: 'Directive', name: { kind: 'Name', value: 'cached' } },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'constructors' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'ergast_id' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: '_id' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                { kind: 'Field', name: { kind: 'Name', value: 'year' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'driver_sessions' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'order_by' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'session' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'event' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'year' },
                                        value: {
                                          kind: 'EnumValue',
                                          value: 'asc',
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'session' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'total_laps' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: {
                                          kind: 'Name',
                                          value: '_is_null',
                                        },
                                        value: {
                                          kind: 'BooleanValue',
                                          value: false,
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'driver' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'full_name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'number' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'headshot_url' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'country_code' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'session' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'event' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'round_number',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'year' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'results' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'points' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'classified_position',
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'grid_position' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetConstructorQuery, GetConstructorQueryVariables>;
export const GetEventDetailsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetEventDetails' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'year' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'event' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      directives: [
        { kind: 'Directive', name: { kind: 'Name', value: 'cached' } },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'events' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'event' },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'year' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'year' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'IntValue', value: '1' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sessions_aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'aggregate' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'count' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'EventSessionResults' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'circuits' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'year' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'year' },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'sessions' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'name' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: { kind: 'EnumValue', value: 'Race' },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'event' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'name' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: '_eq' },
                                        value: {
                                          kind: 'Variable',
                                          name: {
                                            kind: 'Name',
                                            value: 'event',
                                          },
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'IntValue', value: '1' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CircuitDetails' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'fia_documents' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: '_and' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'event_name' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'event' },
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'year' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'year' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'publish_time' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'FIADocs' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'drivers' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'distinct_on' },
                value: { kind: 'EnumValue', value: 'year' },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'driver_sessions' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'session' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'event' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'name' },
                                        value: {
                                          kind: 'ObjectValue',
                                          fields: [
                                            {
                                              kind: 'ObjectField',
                                              name: {
                                                kind: 'Name',
                                                value: '_eq',
                                              },
                                              value: {
                                                kind: 'Variable',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'event',
                                                },
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    ],
                                  },
                                },
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'name' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: '_eq' },
                                        value: {
                                          kind: 'EnumValue',
                                          value: 'Race',
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'results' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: {
                                    kind: 'Name',
                                    value: 'classified_position',
                                  },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: '_eq' },
                                        value: {
                                          kind: 'StringValue',
                                          value: '1',
                                          block: false,
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'year' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'EventWinners' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'schedule' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: '_and' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'event_name' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'event' },
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'year' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'year' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'round_number' },
                      value: { kind: 'EnumValue', value: 'asc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'location' } },
                { kind: 'Field', name: { kind: 'Name', value: 'event_name' } },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'EventSessionCards' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ScheduleEventDetails' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventCompetitionResults' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'sessions' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'driver_sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'results_aggregate' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'min' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: {
                                    kind: 'Name',
                                    value: 'finishing_position',
                                  },
                                  value: { kind: 'EnumValue', value: 'asc' },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'driver' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'abbreviation' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'full_name' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'number' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'headshot_url' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'constructorByConstructorId' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'results' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'finishing_position' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'classified_position' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'grid_position' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'total_race_time' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'laps' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'points' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'fastest_lap' },
                  name: { kind: 'Name', value: 'laps' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '1' },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'order_by' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'lap_time' },
                            value: { kind: 'EnumValue', value: 'asc' },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lap_time' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lap_number' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventQualifyingResults' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'sessions' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'driver_sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'results_aggregate' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'min' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: {
                                    kind: 'Name',
                                    value: 'finishing_position',
                                  },
                                  value: { kind: 'EnumValue', value: 'asc' },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'driver' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'abbreviation' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'full_name' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'number' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'headshot_url' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'constructorByConstructorId' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'results' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'finishing_position' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'q1_time' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'q2_time' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'q3_time' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventPracticeResults' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'sessions' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'driver_sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'laps_aggregate' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'min' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'lap_time' },
                                  value: { kind: 'EnumValue', value: 'asc' },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'driver' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'abbreviation' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'full_name' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'number' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'headshot_url' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'constructorByConstructorId' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'fastest_lap' },
                  name: { kind: 'Name', value: 'laps' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '1' },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'order_by' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'lap_time' },
                            value: { kind: 'EnumValue', value: 'asc' },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lap_time' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lap_number' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'laps_aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'aggregate' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'count' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventSessionResults' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'events' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'competition' },
            name: { kind: 'Name', value: 'sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'scheduled_start_time_utc' },
                      value: { kind: 'EnumValue', value: 'asc' },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_in' },
                            value: {
                              kind: 'ListValue',
                              values: [
                                { kind: 'EnumValue', value: 'Sprint' },
                                { kind: 'EnumValue', value: 'Race' },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'IntValue', value: '2' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'scheduled_start_time_utc' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'EventCompetitionResults' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'qualifying' },
            name: { kind: 'Name', value: 'sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'scheduled_start_time_utc' },
                      value: { kind: 'EnumValue', value: 'asc' },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_in' },
                            value: {
                              kind: 'ListValue',
                              values: [
                                { kind: 'EnumValue', value: 'Sprint_Shootout' },
                                {
                                  kind: 'EnumValue',
                                  value: 'Sprint_Qualifying',
                                },
                                { kind: 'EnumValue', value: 'Qualifying' },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'IntValue', value: '2' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'scheduled_start_time_utc' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'EventQualifyingResults' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'practice' },
            name: { kind: 'Name', value: 'sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'scheduled_start_time_utc' },
                      value: { kind: 'EnumValue', value: 'asc' },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_in' },
                            value: {
                              kind: 'ListValue',
                              values: [
                                { kind: 'EnumValue', value: 'Practice_1' },
                                { kind: 'EnumValue', value: 'Practice_2' },
                                { kind: 'EnumValue', value: 'Practice_3' },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'IntValue', value: '3' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'scheduled_start_time_utc' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'EventPracticeResults' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CircuitDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'circuits' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'circuit_details' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'FIADocs' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'fia_documents' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
          { kind: 'Field', name: { kind: 'Name', value: 'publish_time' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventWinners' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'drivers' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'driver_sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'session' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'event' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'name' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: '_eq' },
                                        value: {
                                          kind: 'Variable',
                                          name: {
                                            kind: 'Name',
                                            value: 'event',
                                          },
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'name' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: { kind: 'EnumValue', value: 'Race' },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'results' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: {
                              kind: 'Name',
                              value: 'classified_position',
                            },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'StringValue',
                                    value: '1',
                                    block: false,
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'constructorByConstructorId' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'full_name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'year' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventSessionCards' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'schedule' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'session1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session1_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session2' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session2_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session3' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session3_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session4' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session4_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session5' } },
          { kind: 'Field', name: { kind: 'Name', value: 'session5_date' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ScheduleEventDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'schedule' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'year' } },
          { kind: 'Field', name: { kind: 'Name', value: 'event_name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'event_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'round_number' } },
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          { kind: 'Field', name: { kind: 'Name', value: 'country' } },
          { kind: 'Field', name: { kind: 'Name', value: 'event_format' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetEventDetailsQuery,
  GetEventDetailsQueryVariables
>;
export const GetStandingsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetStandings' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'season' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      directives: [
        { kind: 'Directive', name: { kind: 'Name', value: 'cached' } },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'events' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'year' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'season' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'round_number' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'format' } },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'race_sessions' },
                  name: { kind: 'Name', value: 'sessions' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'name' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: { kind: 'EnumValue', value: 'Race' },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'driver_sessions' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'driver' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'abbreviation',
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'constructorByConstructorId',
                              },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'results' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'classified_position',
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'drivers' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'driver_standings' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'season' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'season' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: {
                        kind: 'Name',
                        value: 'driver_standings_aggregate',
                      },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'max' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'points' },
                                  value: { kind: 'EnumValue', value: 'desc' },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'abbreviation' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'full_name' } },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'latest_constructor' },
                  name: { kind: 'Name', value: 'driver_sessions' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '1' },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'order_by' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'session' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'date' },
                                  value: { kind: 'EnumValue', value: 'desc' },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: {
                              kind: 'Name',
                              value: 'constructorByConstructorId',
                            },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'name' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: {
                                          kind: 'Name',
                                          value: '_is_null',
                                        },
                                        value: {
                                          kind: 'BooleanValue',
                                          value: false,
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'constructor' },
                        name: {
                          kind: 'Name',
                          value: 'constructorByConstructorId',
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'color' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'driver_standings' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'season' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'season' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'order_by' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'round' },
                            value: { kind: 'EnumValue', value: 'asc' },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'round' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'points' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'position' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'constructors' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'constructor_standings' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'season' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'season' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: {
                        kind: 'Name',
                        value: 'constructor_standings_aggregate',
                      },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'max' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'points' },
                                  value: { kind: 'EnumValue', value: 'desc' },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'lastRoundPoints' },
                  name: { kind: 'Name', value: 'constructor_standings' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'season' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'season' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'order_by' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'round' },
                            value: { kind: 'EnumValue', value: 'desc' },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '1' },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'points' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'constructor_standings' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'season' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'season' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'order_by' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'round' },
                            value: { kind: 'EnumValue', value: 'desc' },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'round' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'points' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'position' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetStandingsQuery, GetStandingsQueryVariables>;
export const SessionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Session' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'year' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'event' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'session' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'session_name_choices_enum' },
            },
          },
        },
      ],
      directives: [
        { kind: 'Directive', name: { kind: 'Name', value: 'cached' } },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'IntValue', value: '1' },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'event' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'year' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'year' },
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'name' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'event' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'session' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'total_laps' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'scheduled_start_time_utc' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'event' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SessionQuery, SessionQueryVariables>;
export const SessionResultsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SessionResults' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'year' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'event' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'session' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'session_name_choices_enum' },
            },
          },
        },
      ],
      directives: [
        { kind: 'Directive', name: { kind: 'Name', value: 'cached' } },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'IntValue', value: '1' },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'event' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'year' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'year' },
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'name' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'event' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'session' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'event' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'driver_sessions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'constructorByConstructorId',
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'color' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'driver' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'abbreviation' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'full_name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'number' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'headshot_url' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'results' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'where' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_or' },
                                  value: {
                                    kind: 'ListValue',
                                    values: [
                                      {
                                        kind: 'ObjectValue',
                                        fields: [
                                          {
                                            kind: 'ObjectField',
                                            name: {
                                              kind: 'Name',
                                              value: 'grid_position',
                                            },
                                            value: {
                                              kind: 'ObjectValue',
                                              fields: [
                                                {
                                                  kind: 'ObjectField',
                                                  name: {
                                                    kind: 'Name',
                                                    value: '_is_null',
                                                  },
                                                  value: {
                                                    kind: 'BooleanValue',
                                                    value: false,
                                                  },
                                                },
                                              ],
                                            },
                                          },
                                        ],
                                      },
                                      {
                                        kind: 'ObjectValue',
                                        fields: [
                                          {
                                            kind: 'ObjectField',
                                            name: {
                                              kind: 'Name',
                                              value: 'finishing_position',
                                            },
                                            value: {
                                              kind: 'ObjectValue',
                                              fields: [
                                                {
                                                  kind: 'ObjectField',
                                                  name: {
                                                    kind: 'Name',
                                                    value: '_is_null',
                                                  },
                                                  value: {
                                                    kind: 'BooleanValue',
                                                    value: false,
                                                  },
                                                },
                                              ],
                                            },
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'grid_position' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'finishing_position',
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'points' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'status' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'classified_position',
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'total_race_time' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'fastest_lap' },
                        name: { kind: 'Name', value: 'laps' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'order_by' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'lap_time' },
                                  value: { kind: 'EnumValue', value: 'asc' },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'limit' },
                            value: { kind: 'IntValue', value: '1' },
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lap_number' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stint' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lap_time' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SessionResultsQuery, SessionResultsQueryVariables>;
export const GetSessionFastestTimesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetSessionFastestTimes' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'year' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'event' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'session' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'session_name_choices_enum' },
            },
          },
        },
      ],
      directives: [
        { kind: 'Directive', name: { kind: 'Name', value: 'cached' } },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'IntValue', value: '1' },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'event' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'year' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'year' },
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'name' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'event' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'session' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'event' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'driver_sessions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'constructorByConstructorId',
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'color' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'driver' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'abbreviation' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'fastest_lap' },
                        name: { kind: 'Name', value: 'laps' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'order_by' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'lap_time' },
                                  value: { kind: 'EnumValue', value: 'asc' },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'limit' },
                            value: { kind: 'IntValue', value: '1' },
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lap_number' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stint' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lap_time' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'sector1' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'sector2' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'sector3' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'fastest_sector1' },
                        name: { kind: 'Name', value: 'laps' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'order_by' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'sector1' },
                                  value: { kind: 'EnumValue', value: 'asc' },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'limit' },
                            value: { kind: 'IntValue', value: '1' },
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lap_number' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stint' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'sector1' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'fastest_sector2' },
                        name: { kind: 'Name', value: 'laps' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'order_by' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'sector2' },
                                  value: { kind: 'EnumValue', value: 'asc' },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'limit' },
                            value: { kind: 'IntValue', value: '1' },
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lap_number' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stint' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'sector2' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'fastest_sector3' },
                        name: { kind: 'Name', value: 'laps' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'order_by' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'sector3' },
                                  value: { kind: 'EnumValue', value: 'asc' },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'limit' },
                            value: { kind: 'IntValue', value: '1' },
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lap_number' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stint' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'sector3' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetSessionFastestTimesQuery,
  GetSessionFastestTimesQueryVariables
>;
export const GetSessionStintsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetSessionStints' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'year' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'event' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'session' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'session_name_choices_enum' },
            },
          },
        },
      ],
      directives: [
        { kind: 'Directive', name: { kind: 'Name', value: 'cached' } },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'IntValue', value: '1' },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'event' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'year' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'year' },
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'name' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'event' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'session' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'driver_sessions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'driver' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'abbreviation' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'full_name' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'laps' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stint' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'tyre_compound' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'value' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'tyre_life' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'fresh_tyre' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetSessionStintsQuery,
  GetSessionStintsQueryVariables
>;
export const GetSessionLapTimesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetSessionLapTimes' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'year' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'event' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'session' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'session_name_choices_enum' },
            },
          },
        },
      ],
      directives: [
        { kind: 'Directive', name: { kind: 'Name', value: 'cached' } },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'sessions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'IntValue', value: '1' },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'event' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'year' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'year' },
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'name' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'event' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'session' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'driver_sessions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'constructorByConstructorId',
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'color' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'driver' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'abbreviation' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'full_name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'number' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'laps' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'order_by' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'lap_number' },
                                  value: { kind: 'EnumValue', value: 'asc' },
                                },
                              ],
                            },
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lap_number' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lap_time' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'compound' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'session_time' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pitout_time' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetSessionLapTimesQuery,
  GetSessionLapTimesQueryVariables
>;
