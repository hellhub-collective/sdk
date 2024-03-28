import type { Entity } from "types/api-entities";

export declare type Defined<T> = {
  [K in keyof NonNullable<T>]: NonNullable<NonNullable<T>[K]>;
};

export declare type PopulationMap<T> = {
  [K in keyof T]?: T[K] extends Entity
    ? T[K] extends Array<any> // @ts-ignore
      ? PopulationMap<T[K][0]> | boolean
      : PopulationMap<T[K]> | boolean
    : boolean;
};

export type RelationField<T, K extends keyof T> = {
  [P in keyof T]?: T[K] extends Entity ? T[K] : never;
};

export type RelationOperator<T> = {
  $is?: RelationFilter<Defined<T extends Array<Entity> ? T[0] : T>>;
  $some?: RelationFilter<Defined<T extends Array<Entity> ? T[0] : T>>;
  $none?: RelationFilter<Defined<T extends Array<Entity> ? T[0] : T>>;
  $every?: RelationFilter<Defined<T extends Array<Entity> ? T[0] : T>>;
  $isNot?: RelationFilter<Defined<T extends Array<Entity> ? T[0] : T>>;
};

export type FieldOperator<T, K extends keyof T> = {
  $not?: T[K];
  $equals?: T[K];
  $in?: Array<T[K]>;
  $notIn?: Array<T[K]>;
} & (T[K] extends string
  ? {
      $search?: T[K];
      $contains?: T[K];
      $endsWith?: T[K];
      $startsWith?: T[K];
      $lt?: T[K];
      $gt?: T[K];
      $lte?: T[K];
      $gte?: T[K];
    }
  : {
      $lt?: T[K];
      $gt?: T[K];
      $lte?: T[K];
      $gte?: T[K];
    });

export interface RootOperator<T> {
  $or?: Array<Filter<Defined<T>>>;
  $not?: Filter<Defined<T>>;
  $and?: Array<Filter<Defined<T>>>;
}

export type RelationFilter<T> = {
  [K in keyof T]?: Defined<T[K]> extends Array<any>
    ? RelationOperator<Defined<T[K]>>
    : Defined<T[K]> extends Entity
      ? RelationFilter<Defined<T[K]>>
      : FieldOperator<T, K> | T[K];
};

export type Filter<T> =
  | {
      [K in keyof T]?: Defined<T[K]> extends Array<Entity>
        ? RelationOperator<Defined<T[K]>>
        : Defined<T[K]> extends Entity
          ? RelationFilter<Defined<T[K]>>
          : FieldOperator<T, K> | T[K];
    }
  | RootOperator<T>;

export interface QueryOptions<T> {
  limit?: number;
  start?: number;
  filters?: Filter<Defined<T>>;
  select?: Array<keyof T> | Array<string>;
  include?: Array<keyof T> | PopulationMap<T> | Array<string>;
  sort?: Array<keyof T> | Array<string> | keyof T | string;
}
