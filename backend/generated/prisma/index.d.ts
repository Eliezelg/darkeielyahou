
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model FormRequest
 * 
 */
export type FormRequest = $Result.DefaultSelection<Prisma.$FormRequestPayload>
/**
 * Model AdminUser
 * 
 */
export type AdminUser = $Result.DefaultSelection<Prisma.$AdminUserPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const RequestStatus: {
  PENDING: 'PENDING',
  IN_REVIEW: 'IN_REVIEW',
  COMPLETED: 'COMPLETED',
  REJECTED: 'REJECTED'
};

export type RequestStatus = (typeof RequestStatus)[keyof typeof RequestStatus]


export const FormType: {
  SOCIAL_AID: 'SOCIAL_AID',
  LOAN_REQUEST: 'LOAN_REQUEST',
  KOL_JOIN: 'KOL_JOIN',
  GALA: 'GALA',
  DONATION: 'DONATION',
  OTHER: 'OTHER'
};

export type FormType = (typeof FormType)[keyof typeof FormType]

}

export type RequestStatus = $Enums.RequestStatus

export const RequestStatus: typeof $Enums.RequestStatus

export type FormType = $Enums.FormType

export const FormType: typeof $Enums.FormType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more FormRequests
 * const formRequests = await prisma.formRequest.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more FormRequests
   * const formRequests = await prisma.formRequest.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.formRequest`: Exposes CRUD operations for the **FormRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FormRequests
    * const formRequests = await prisma.formRequest.findMany()
    * ```
    */
  get formRequest(): Prisma.FormRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.adminUser`: Exposes CRUD operations for the **AdminUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminUsers
    * const adminUsers = await prisma.adminUser.findMany()
    * ```
    */
  get adminUser(): Prisma.AdminUserDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    FormRequest: 'FormRequest',
    AdminUser: 'AdminUser'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "formRequest" | "adminUser"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      FormRequest: {
        payload: Prisma.$FormRequestPayload<ExtArgs>
        fields: Prisma.FormRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FormRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FormRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormRequestPayload>
          }
          findFirst: {
            args: Prisma.FormRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FormRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormRequestPayload>
          }
          findMany: {
            args: Prisma.FormRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormRequestPayload>[]
          }
          create: {
            args: Prisma.FormRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormRequestPayload>
          }
          createMany: {
            args: Prisma.FormRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FormRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormRequestPayload>[]
          }
          delete: {
            args: Prisma.FormRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormRequestPayload>
          }
          update: {
            args: Prisma.FormRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormRequestPayload>
          }
          deleteMany: {
            args: Prisma.FormRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FormRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FormRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormRequestPayload>[]
          }
          upsert: {
            args: Prisma.FormRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormRequestPayload>
          }
          aggregate: {
            args: Prisma.FormRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFormRequest>
          }
          groupBy: {
            args: Prisma.FormRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<FormRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.FormRequestCountArgs<ExtArgs>
            result: $Utils.Optional<FormRequestCountAggregateOutputType> | number
          }
        }
      }
      AdminUser: {
        payload: Prisma.$AdminUserPayload<ExtArgs>
        fields: Prisma.AdminUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          findFirst: {
            args: Prisma.AdminUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          findMany: {
            args: Prisma.AdminUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>[]
          }
          create: {
            args: Prisma.AdminUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          createMany: {
            args: Prisma.AdminUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>[]
          }
          delete: {
            args: Prisma.AdminUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          update: {
            args: Prisma.AdminUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          deleteMany: {
            args: Prisma.AdminUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminUserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>[]
          }
          upsert: {
            args: Prisma.AdminUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          aggregate: {
            args: Prisma.AdminUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminUser>
          }
          groupBy: {
            args: Prisma.AdminUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminUserCountArgs<ExtArgs>
            result: $Utils.Optional<AdminUserCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    formRequest?: FormRequestOmit
    adminUser?: AdminUserOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AdminUserCountOutputType
   */

  export type AdminUserCountOutputType = {
    assignedRequests: number
    createdRequests: number
  }

  export type AdminUserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignedRequests?: boolean | AdminUserCountOutputTypeCountAssignedRequestsArgs
    createdRequests?: boolean | AdminUserCountOutputTypeCountCreatedRequestsArgs
  }

  // Custom InputTypes
  /**
   * AdminUserCountOutputType without action
   */
  export type AdminUserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUserCountOutputType
     */
    select?: AdminUserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AdminUserCountOutputType without action
   */
  export type AdminUserCountOutputTypeCountAssignedRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormRequestWhereInput
  }

  /**
   * AdminUserCountOutputType without action
   */
  export type AdminUserCountOutputTypeCountCreatedRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormRequestWhereInput
  }


  /**
   * Models
   */

  /**
   * Model FormRequest
   */

  export type AggregateFormRequest = {
    _count: FormRequestCountAggregateOutputType | null
    _min: FormRequestMinAggregateOutputType | null
    _max: FormRequestMaxAggregateOutputType | null
  }

  export type FormRequestMinAggregateOutputType = {
    id: string | null
    formType: $Enums.FormType | null
    status: $Enums.RequestStatus | null
    notes: string | null
    createdBy: string | null
    assignedTo: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FormRequestMaxAggregateOutputType = {
    id: string | null
    formType: $Enums.FormType | null
    status: $Enums.RequestStatus | null
    notes: string | null
    createdBy: string | null
    assignedTo: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FormRequestCountAggregateOutputType = {
    id: number
    formType: number
    formData: number
    status: number
    notes: number
    metadata: number
    createdBy: number
    assignedTo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FormRequestMinAggregateInputType = {
    id?: true
    formType?: true
    status?: true
    notes?: true
    createdBy?: true
    assignedTo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FormRequestMaxAggregateInputType = {
    id?: true
    formType?: true
    status?: true
    notes?: true
    createdBy?: true
    assignedTo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FormRequestCountAggregateInputType = {
    id?: true
    formType?: true
    formData?: true
    status?: true
    notes?: true
    metadata?: true
    createdBy?: true
    assignedTo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FormRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FormRequest to aggregate.
     */
    where?: FormRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormRequests to fetch.
     */
    orderBy?: FormRequestOrderByWithRelationInput | FormRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FormRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FormRequests
    **/
    _count?: true | FormRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FormRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FormRequestMaxAggregateInputType
  }

  export type GetFormRequestAggregateType<T extends FormRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateFormRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFormRequest[P]>
      : GetScalarType<T[P], AggregateFormRequest[P]>
  }




  export type FormRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormRequestWhereInput
    orderBy?: FormRequestOrderByWithAggregationInput | FormRequestOrderByWithAggregationInput[]
    by: FormRequestScalarFieldEnum[] | FormRequestScalarFieldEnum
    having?: FormRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FormRequestCountAggregateInputType | true
    _min?: FormRequestMinAggregateInputType
    _max?: FormRequestMaxAggregateInputType
  }

  export type FormRequestGroupByOutputType = {
    id: string
    formType: $Enums.FormType
    formData: JsonValue
    status: $Enums.RequestStatus
    notes: string | null
    metadata: JsonValue | null
    createdBy: string | null
    assignedTo: string | null
    createdAt: Date
    updatedAt: Date
    _count: FormRequestCountAggregateOutputType | null
    _min: FormRequestMinAggregateOutputType | null
    _max: FormRequestMaxAggregateOutputType | null
  }

  type GetFormRequestGroupByPayload<T extends FormRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FormRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FormRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FormRequestGroupByOutputType[P]>
            : GetScalarType<T[P], FormRequestGroupByOutputType[P]>
        }
      >
    >


  export type FormRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    formType?: boolean
    formData?: boolean
    status?: boolean
    notes?: boolean
    metadata?: boolean
    createdBy?: boolean
    assignedTo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assignedToUser?: boolean | FormRequest$assignedToUserArgs<ExtArgs>
    createdByUser?: boolean | FormRequest$createdByUserArgs<ExtArgs>
  }, ExtArgs["result"]["formRequest"]>

  export type FormRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    formType?: boolean
    formData?: boolean
    status?: boolean
    notes?: boolean
    metadata?: boolean
    createdBy?: boolean
    assignedTo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assignedToUser?: boolean | FormRequest$assignedToUserArgs<ExtArgs>
    createdByUser?: boolean | FormRequest$createdByUserArgs<ExtArgs>
  }, ExtArgs["result"]["formRequest"]>

  export type FormRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    formType?: boolean
    formData?: boolean
    status?: boolean
    notes?: boolean
    metadata?: boolean
    createdBy?: boolean
    assignedTo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assignedToUser?: boolean | FormRequest$assignedToUserArgs<ExtArgs>
    createdByUser?: boolean | FormRequest$createdByUserArgs<ExtArgs>
  }, ExtArgs["result"]["formRequest"]>

  export type FormRequestSelectScalar = {
    id?: boolean
    formType?: boolean
    formData?: boolean
    status?: boolean
    notes?: boolean
    metadata?: boolean
    createdBy?: boolean
    assignedTo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FormRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "formType" | "formData" | "status" | "notes" | "metadata" | "createdBy" | "assignedTo" | "createdAt" | "updatedAt", ExtArgs["result"]["formRequest"]>
  export type FormRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignedToUser?: boolean | FormRequest$assignedToUserArgs<ExtArgs>
    createdByUser?: boolean | FormRequest$createdByUserArgs<ExtArgs>
  }
  export type FormRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignedToUser?: boolean | FormRequest$assignedToUserArgs<ExtArgs>
    createdByUser?: boolean | FormRequest$createdByUserArgs<ExtArgs>
  }
  export type FormRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignedToUser?: boolean | FormRequest$assignedToUserArgs<ExtArgs>
    createdByUser?: boolean | FormRequest$createdByUserArgs<ExtArgs>
  }

  export type $FormRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FormRequest"
    objects: {
      assignedToUser: Prisma.$AdminUserPayload<ExtArgs> | null
      createdByUser: Prisma.$AdminUserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      formType: $Enums.FormType
      formData: Prisma.JsonValue
      status: $Enums.RequestStatus
      notes: string | null
      metadata: Prisma.JsonValue | null
      createdBy: string | null
      assignedTo: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["formRequest"]>
    composites: {}
  }

  type FormRequestGetPayload<S extends boolean | null | undefined | FormRequestDefaultArgs> = $Result.GetResult<Prisma.$FormRequestPayload, S>

  type FormRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FormRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FormRequestCountAggregateInputType | true
    }

  export interface FormRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FormRequest'], meta: { name: 'FormRequest' } }
    /**
     * Find zero or one FormRequest that matches the filter.
     * @param {FormRequestFindUniqueArgs} args - Arguments to find a FormRequest
     * @example
     * // Get one FormRequest
     * const formRequest = await prisma.formRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FormRequestFindUniqueArgs>(args: SelectSubset<T, FormRequestFindUniqueArgs<ExtArgs>>): Prisma__FormRequestClient<$Result.GetResult<Prisma.$FormRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FormRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FormRequestFindUniqueOrThrowArgs} args - Arguments to find a FormRequest
     * @example
     * // Get one FormRequest
     * const formRequest = await prisma.formRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FormRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, FormRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FormRequestClient<$Result.GetResult<Prisma.$FormRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FormRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormRequestFindFirstArgs} args - Arguments to find a FormRequest
     * @example
     * // Get one FormRequest
     * const formRequest = await prisma.formRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FormRequestFindFirstArgs>(args?: SelectSubset<T, FormRequestFindFirstArgs<ExtArgs>>): Prisma__FormRequestClient<$Result.GetResult<Prisma.$FormRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FormRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormRequestFindFirstOrThrowArgs} args - Arguments to find a FormRequest
     * @example
     * // Get one FormRequest
     * const formRequest = await prisma.formRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FormRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, FormRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__FormRequestClient<$Result.GetResult<Prisma.$FormRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FormRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FormRequests
     * const formRequests = await prisma.formRequest.findMany()
     * 
     * // Get first 10 FormRequests
     * const formRequests = await prisma.formRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const formRequestWithIdOnly = await prisma.formRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FormRequestFindManyArgs>(args?: SelectSubset<T, FormRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FormRequest.
     * @param {FormRequestCreateArgs} args - Arguments to create a FormRequest.
     * @example
     * // Create one FormRequest
     * const FormRequest = await prisma.formRequest.create({
     *   data: {
     *     // ... data to create a FormRequest
     *   }
     * })
     * 
     */
    create<T extends FormRequestCreateArgs>(args: SelectSubset<T, FormRequestCreateArgs<ExtArgs>>): Prisma__FormRequestClient<$Result.GetResult<Prisma.$FormRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FormRequests.
     * @param {FormRequestCreateManyArgs} args - Arguments to create many FormRequests.
     * @example
     * // Create many FormRequests
     * const formRequest = await prisma.formRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FormRequestCreateManyArgs>(args?: SelectSubset<T, FormRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FormRequests and returns the data saved in the database.
     * @param {FormRequestCreateManyAndReturnArgs} args - Arguments to create many FormRequests.
     * @example
     * // Create many FormRequests
     * const formRequest = await prisma.formRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FormRequests and only return the `id`
     * const formRequestWithIdOnly = await prisma.formRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FormRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, FormRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FormRequest.
     * @param {FormRequestDeleteArgs} args - Arguments to delete one FormRequest.
     * @example
     * // Delete one FormRequest
     * const FormRequest = await prisma.formRequest.delete({
     *   where: {
     *     // ... filter to delete one FormRequest
     *   }
     * })
     * 
     */
    delete<T extends FormRequestDeleteArgs>(args: SelectSubset<T, FormRequestDeleteArgs<ExtArgs>>): Prisma__FormRequestClient<$Result.GetResult<Prisma.$FormRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FormRequest.
     * @param {FormRequestUpdateArgs} args - Arguments to update one FormRequest.
     * @example
     * // Update one FormRequest
     * const formRequest = await prisma.formRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FormRequestUpdateArgs>(args: SelectSubset<T, FormRequestUpdateArgs<ExtArgs>>): Prisma__FormRequestClient<$Result.GetResult<Prisma.$FormRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FormRequests.
     * @param {FormRequestDeleteManyArgs} args - Arguments to filter FormRequests to delete.
     * @example
     * // Delete a few FormRequests
     * const { count } = await prisma.formRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FormRequestDeleteManyArgs>(args?: SelectSubset<T, FormRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FormRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FormRequests
     * const formRequest = await prisma.formRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FormRequestUpdateManyArgs>(args: SelectSubset<T, FormRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FormRequests and returns the data updated in the database.
     * @param {FormRequestUpdateManyAndReturnArgs} args - Arguments to update many FormRequests.
     * @example
     * // Update many FormRequests
     * const formRequest = await prisma.formRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FormRequests and only return the `id`
     * const formRequestWithIdOnly = await prisma.formRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FormRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, FormRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FormRequest.
     * @param {FormRequestUpsertArgs} args - Arguments to update or create a FormRequest.
     * @example
     * // Update or create a FormRequest
     * const formRequest = await prisma.formRequest.upsert({
     *   create: {
     *     // ... data to create a FormRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FormRequest we want to update
     *   }
     * })
     */
    upsert<T extends FormRequestUpsertArgs>(args: SelectSubset<T, FormRequestUpsertArgs<ExtArgs>>): Prisma__FormRequestClient<$Result.GetResult<Prisma.$FormRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FormRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormRequestCountArgs} args - Arguments to filter FormRequests to count.
     * @example
     * // Count the number of FormRequests
     * const count = await prisma.formRequest.count({
     *   where: {
     *     // ... the filter for the FormRequests we want to count
     *   }
     * })
    **/
    count<T extends FormRequestCountArgs>(
      args?: Subset<T, FormRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FormRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FormRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FormRequestAggregateArgs>(args: Subset<T, FormRequestAggregateArgs>): Prisma.PrismaPromise<GetFormRequestAggregateType<T>>

    /**
     * Group by FormRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FormRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FormRequestGroupByArgs['orderBy'] }
        : { orderBy?: FormRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FormRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFormRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FormRequest model
   */
  readonly fields: FormRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FormRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FormRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assignedToUser<T extends FormRequest$assignedToUserArgs<ExtArgs> = {}>(args?: Subset<T, FormRequest$assignedToUserArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    createdByUser<T extends FormRequest$createdByUserArgs<ExtArgs> = {}>(args?: Subset<T, FormRequest$createdByUserArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FormRequest model
   */
  interface FormRequestFieldRefs {
    readonly id: FieldRef<"FormRequest", 'String'>
    readonly formType: FieldRef<"FormRequest", 'FormType'>
    readonly formData: FieldRef<"FormRequest", 'Json'>
    readonly status: FieldRef<"FormRequest", 'RequestStatus'>
    readonly notes: FieldRef<"FormRequest", 'String'>
    readonly metadata: FieldRef<"FormRequest", 'Json'>
    readonly createdBy: FieldRef<"FormRequest", 'String'>
    readonly assignedTo: FieldRef<"FormRequest", 'String'>
    readonly createdAt: FieldRef<"FormRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"FormRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FormRequest findUnique
   */
  export type FormRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormRequest
     */
    select?: FormRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormRequest
     */
    omit?: FormRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormRequestInclude<ExtArgs> | null
    /**
     * Filter, which FormRequest to fetch.
     */
    where: FormRequestWhereUniqueInput
  }

  /**
   * FormRequest findUniqueOrThrow
   */
  export type FormRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormRequest
     */
    select?: FormRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormRequest
     */
    omit?: FormRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormRequestInclude<ExtArgs> | null
    /**
     * Filter, which FormRequest to fetch.
     */
    where: FormRequestWhereUniqueInput
  }

  /**
   * FormRequest findFirst
   */
  export type FormRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormRequest
     */
    select?: FormRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormRequest
     */
    omit?: FormRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormRequestInclude<ExtArgs> | null
    /**
     * Filter, which FormRequest to fetch.
     */
    where?: FormRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormRequests to fetch.
     */
    orderBy?: FormRequestOrderByWithRelationInput | FormRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FormRequests.
     */
    cursor?: FormRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FormRequests.
     */
    distinct?: FormRequestScalarFieldEnum | FormRequestScalarFieldEnum[]
  }

  /**
   * FormRequest findFirstOrThrow
   */
  export type FormRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormRequest
     */
    select?: FormRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormRequest
     */
    omit?: FormRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormRequestInclude<ExtArgs> | null
    /**
     * Filter, which FormRequest to fetch.
     */
    where?: FormRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormRequests to fetch.
     */
    orderBy?: FormRequestOrderByWithRelationInput | FormRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FormRequests.
     */
    cursor?: FormRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FormRequests.
     */
    distinct?: FormRequestScalarFieldEnum | FormRequestScalarFieldEnum[]
  }

  /**
   * FormRequest findMany
   */
  export type FormRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormRequest
     */
    select?: FormRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormRequest
     */
    omit?: FormRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormRequestInclude<ExtArgs> | null
    /**
     * Filter, which FormRequests to fetch.
     */
    where?: FormRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormRequests to fetch.
     */
    orderBy?: FormRequestOrderByWithRelationInput | FormRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FormRequests.
     */
    cursor?: FormRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormRequests.
     */
    skip?: number
    distinct?: FormRequestScalarFieldEnum | FormRequestScalarFieldEnum[]
  }

  /**
   * FormRequest create
   */
  export type FormRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormRequest
     */
    select?: FormRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormRequest
     */
    omit?: FormRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a FormRequest.
     */
    data: XOR<FormRequestCreateInput, FormRequestUncheckedCreateInput>
  }

  /**
   * FormRequest createMany
   */
  export type FormRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FormRequests.
     */
    data: FormRequestCreateManyInput | FormRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FormRequest createManyAndReturn
   */
  export type FormRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormRequest
     */
    select?: FormRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FormRequest
     */
    omit?: FormRequestOmit<ExtArgs> | null
    /**
     * The data used to create many FormRequests.
     */
    data: FormRequestCreateManyInput | FormRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FormRequest update
   */
  export type FormRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormRequest
     */
    select?: FormRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormRequest
     */
    omit?: FormRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a FormRequest.
     */
    data: XOR<FormRequestUpdateInput, FormRequestUncheckedUpdateInput>
    /**
     * Choose, which FormRequest to update.
     */
    where: FormRequestWhereUniqueInput
  }

  /**
   * FormRequest updateMany
   */
  export type FormRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FormRequests.
     */
    data: XOR<FormRequestUpdateManyMutationInput, FormRequestUncheckedUpdateManyInput>
    /**
     * Filter which FormRequests to update
     */
    where?: FormRequestWhereInput
    /**
     * Limit how many FormRequests to update.
     */
    limit?: number
  }

  /**
   * FormRequest updateManyAndReturn
   */
  export type FormRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormRequest
     */
    select?: FormRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FormRequest
     */
    omit?: FormRequestOmit<ExtArgs> | null
    /**
     * The data used to update FormRequests.
     */
    data: XOR<FormRequestUpdateManyMutationInput, FormRequestUncheckedUpdateManyInput>
    /**
     * Filter which FormRequests to update
     */
    where?: FormRequestWhereInput
    /**
     * Limit how many FormRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FormRequest upsert
   */
  export type FormRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormRequest
     */
    select?: FormRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormRequest
     */
    omit?: FormRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the FormRequest to update in case it exists.
     */
    where: FormRequestWhereUniqueInput
    /**
     * In case the FormRequest found by the `where` argument doesn't exist, create a new FormRequest with this data.
     */
    create: XOR<FormRequestCreateInput, FormRequestUncheckedCreateInput>
    /**
     * In case the FormRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FormRequestUpdateInput, FormRequestUncheckedUpdateInput>
  }

  /**
   * FormRequest delete
   */
  export type FormRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormRequest
     */
    select?: FormRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormRequest
     */
    omit?: FormRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormRequestInclude<ExtArgs> | null
    /**
     * Filter which FormRequest to delete.
     */
    where: FormRequestWhereUniqueInput
  }

  /**
   * FormRequest deleteMany
   */
  export type FormRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FormRequests to delete
     */
    where?: FormRequestWhereInput
    /**
     * Limit how many FormRequests to delete.
     */
    limit?: number
  }

  /**
   * FormRequest.assignedToUser
   */
  export type FormRequest$assignedToUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    where?: AdminUserWhereInput
  }

  /**
   * FormRequest.createdByUser
   */
  export type FormRequest$createdByUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    where?: AdminUserWhereInput
  }

  /**
   * FormRequest without action
   */
  export type FormRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormRequest
     */
    select?: FormRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormRequest
     */
    omit?: FormRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormRequestInclude<ExtArgs> | null
  }


  /**
   * Model AdminUser
   */

  export type AggregateAdminUser = {
    _count: AdminUserCountAggregateOutputType | null
    _min: AdminUserMinAggregateOutputType | null
    _max: AdminUserMaxAggregateOutputType | null
  }

  export type AdminUserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    fullName: string | null
    isActive: boolean | null
    lastLoginAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminUserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    fullName: string | null
    isActive: boolean | null
    lastLoginAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminUserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    fullName: number
    isActive: number
    lastLoginAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AdminUserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    fullName?: true
    isActive?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminUserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    fullName?: true
    isActive?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminUserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    fullName?: true
    isActive?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AdminUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminUser to aggregate.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminUsers
    **/
    _count?: true | AdminUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminUserMaxAggregateInputType
  }

  export type GetAdminUserAggregateType<T extends AdminUserAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminUser[P]>
      : GetScalarType<T[P], AggregateAdminUser[P]>
  }




  export type AdminUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminUserWhereInput
    orderBy?: AdminUserOrderByWithAggregationInput | AdminUserOrderByWithAggregationInput[]
    by: AdminUserScalarFieldEnum[] | AdminUserScalarFieldEnum
    having?: AdminUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminUserCountAggregateInputType | true
    _min?: AdminUserMinAggregateInputType
    _max?: AdminUserMaxAggregateInputType
  }

  export type AdminUserGroupByOutputType = {
    id: string
    email: string
    password: string
    fullName: string
    isActive: boolean
    lastLoginAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: AdminUserCountAggregateOutputType | null
    _min: AdminUserMinAggregateOutputType | null
    _max: AdminUserMaxAggregateOutputType | null
  }

  type GetAdminUserGroupByPayload<T extends AdminUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminUserGroupByOutputType[P]>
            : GetScalarType<T[P], AdminUserGroupByOutputType[P]>
        }
      >
    >


  export type AdminUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    fullName?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assignedRequests?: boolean | AdminUser$assignedRequestsArgs<ExtArgs>
    createdRequests?: boolean | AdminUser$createdRequestsArgs<ExtArgs>
    _count?: boolean | AdminUserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["adminUser"]>

  export type AdminUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    fullName?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["adminUser"]>

  export type AdminUserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    fullName?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["adminUser"]>

  export type AdminUserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    fullName?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AdminUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "fullName" | "isActive" | "lastLoginAt" | "createdAt" | "updatedAt", ExtArgs["result"]["adminUser"]>
  export type AdminUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignedRequests?: boolean | AdminUser$assignedRequestsArgs<ExtArgs>
    createdRequests?: boolean | AdminUser$createdRequestsArgs<ExtArgs>
    _count?: boolean | AdminUserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AdminUserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AdminUserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AdminUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminUser"
    objects: {
      assignedRequests: Prisma.$FormRequestPayload<ExtArgs>[]
      createdRequests: Prisma.$FormRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      fullName: string
      isActive: boolean
      lastLoginAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["adminUser"]>
    composites: {}
  }

  type AdminUserGetPayload<S extends boolean | null | undefined | AdminUserDefaultArgs> = $Result.GetResult<Prisma.$AdminUserPayload, S>

  type AdminUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminUserCountAggregateInputType | true
    }

  export interface AdminUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminUser'], meta: { name: 'AdminUser' } }
    /**
     * Find zero or one AdminUser that matches the filter.
     * @param {AdminUserFindUniqueArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminUserFindUniqueArgs>(args: SelectSubset<T, AdminUserFindUniqueArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AdminUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminUserFindUniqueOrThrowArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminUserFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserFindFirstArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminUserFindFirstArgs>(args?: SelectSubset<T, AdminUserFindFirstArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserFindFirstOrThrowArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminUserFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AdminUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminUsers
     * const adminUsers = await prisma.adminUser.findMany()
     * 
     * // Get first 10 AdminUsers
     * const adminUsers = await prisma.adminUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminUserWithIdOnly = await prisma.adminUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminUserFindManyArgs>(args?: SelectSubset<T, AdminUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AdminUser.
     * @param {AdminUserCreateArgs} args - Arguments to create a AdminUser.
     * @example
     * // Create one AdminUser
     * const AdminUser = await prisma.adminUser.create({
     *   data: {
     *     // ... data to create a AdminUser
     *   }
     * })
     * 
     */
    create<T extends AdminUserCreateArgs>(args: SelectSubset<T, AdminUserCreateArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AdminUsers.
     * @param {AdminUserCreateManyArgs} args - Arguments to create many AdminUsers.
     * @example
     * // Create many AdminUsers
     * const adminUser = await prisma.adminUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminUserCreateManyArgs>(args?: SelectSubset<T, AdminUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdminUsers and returns the data saved in the database.
     * @param {AdminUserCreateManyAndReturnArgs} args - Arguments to create many AdminUsers.
     * @example
     * // Create many AdminUsers
     * const adminUser = await prisma.adminUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdminUsers and only return the `id`
     * const adminUserWithIdOnly = await prisma.adminUser.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminUserCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AdminUser.
     * @param {AdminUserDeleteArgs} args - Arguments to delete one AdminUser.
     * @example
     * // Delete one AdminUser
     * const AdminUser = await prisma.adminUser.delete({
     *   where: {
     *     // ... filter to delete one AdminUser
     *   }
     * })
     * 
     */
    delete<T extends AdminUserDeleteArgs>(args: SelectSubset<T, AdminUserDeleteArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AdminUser.
     * @param {AdminUserUpdateArgs} args - Arguments to update one AdminUser.
     * @example
     * // Update one AdminUser
     * const adminUser = await prisma.adminUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUserUpdateArgs>(args: SelectSubset<T, AdminUserUpdateArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AdminUsers.
     * @param {AdminUserDeleteManyArgs} args - Arguments to filter AdminUsers to delete.
     * @example
     * // Delete a few AdminUsers
     * const { count } = await prisma.adminUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminUserDeleteManyArgs>(args?: SelectSubset<T, AdminUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminUsers
     * const adminUser = await prisma.adminUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUserUpdateManyArgs>(args: SelectSubset<T, AdminUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminUsers and returns the data updated in the database.
     * @param {AdminUserUpdateManyAndReturnArgs} args - Arguments to update many AdminUsers.
     * @example
     * // Update many AdminUsers
     * const adminUser = await prisma.adminUser.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AdminUsers and only return the `id`
     * const adminUserWithIdOnly = await prisma.adminUser.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminUserUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminUserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AdminUser.
     * @param {AdminUserUpsertArgs} args - Arguments to update or create a AdminUser.
     * @example
     * // Update or create a AdminUser
     * const adminUser = await prisma.adminUser.upsert({
     *   create: {
     *     // ... data to create a AdminUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminUser we want to update
     *   }
     * })
     */
    upsert<T extends AdminUserUpsertArgs>(args: SelectSubset<T, AdminUserUpsertArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AdminUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserCountArgs} args - Arguments to filter AdminUsers to count.
     * @example
     * // Count the number of AdminUsers
     * const count = await prisma.adminUser.count({
     *   where: {
     *     // ... the filter for the AdminUsers we want to count
     *   }
     * })
    **/
    count<T extends AdminUserCountArgs>(
      args?: Subset<T, AdminUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminUserAggregateArgs>(args: Subset<T, AdminUserAggregateArgs>): Prisma.PrismaPromise<GetAdminUserAggregateType<T>>

    /**
     * Group by AdminUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminUserGroupByArgs['orderBy'] }
        : { orderBy?: AdminUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminUser model
   */
  readonly fields: AdminUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assignedRequests<T extends AdminUser$assignedRequestsArgs<ExtArgs> = {}>(args?: Subset<T, AdminUser$assignedRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdRequests<T extends AdminUser$createdRequestsArgs<ExtArgs> = {}>(args?: Subset<T, AdminUser$createdRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdminUser model
   */
  interface AdminUserFieldRefs {
    readonly id: FieldRef<"AdminUser", 'String'>
    readonly email: FieldRef<"AdminUser", 'String'>
    readonly password: FieldRef<"AdminUser", 'String'>
    readonly fullName: FieldRef<"AdminUser", 'String'>
    readonly isActive: FieldRef<"AdminUser", 'Boolean'>
    readonly lastLoginAt: FieldRef<"AdminUser", 'DateTime'>
    readonly createdAt: FieldRef<"AdminUser", 'DateTime'>
    readonly updatedAt: FieldRef<"AdminUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AdminUser findUnique
   */
  export type AdminUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser findUniqueOrThrow
   */
  export type AdminUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser findFirst
   */
  export type AdminUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminUsers.
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminUsers.
     */
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * AdminUser findFirstOrThrow
   */
  export type AdminUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminUsers.
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminUsers.
     */
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * AdminUser findMany
   */
  export type AdminUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUsers to fetch.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminUsers.
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * AdminUser create
   */
  export type AdminUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * The data needed to create a AdminUser.
     */
    data: XOR<AdminUserCreateInput, AdminUserUncheckedCreateInput>
  }

  /**
   * AdminUser createMany
   */
  export type AdminUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminUsers.
     */
    data: AdminUserCreateManyInput | AdminUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminUser createManyAndReturn
   */
  export type AdminUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * The data used to create many AdminUsers.
     */
    data: AdminUserCreateManyInput | AdminUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminUser update
   */
  export type AdminUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * The data needed to update a AdminUser.
     */
    data: XOR<AdminUserUpdateInput, AdminUserUncheckedUpdateInput>
    /**
     * Choose, which AdminUser to update.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser updateMany
   */
  export type AdminUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminUsers.
     */
    data: XOR<AdminUserUpdateManyMutationInput, AdminUserUncheckedUpdateManyInput>
    /**
     * Filter which AdminUsers to update
     */
    where?: AdminUserWhereInput
    /**
     * Limit how many AdminUsers to update.
     */
    limit?: number
  }

  /**
   * AdminUser updateManyAndReturn
   */
  export type AdminUserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * The data used to update AdminUsers.
     */
    data: XOR<AdminUserUpdateManyMutationInput, AdminUserUncheckedUpdateManyInput>
    /**
     * Filter which AdminUsers to update
     */
    where?: AdminUserWhereInput
    /**
     * Limit how many AdminUsers to update.
     */
    limit?: number
  }

  /**
   * AdminUser upsert
   */
  export type AdminUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * The filter to search for the AdminUser to update in case it exists.
     */
    where: AdminUserWhereUniqueInput
    /**
     * In case the AdminUser found by the `where` argument doesn't exist, create a new AdminUser with this data.
     */
    create: XOR<AdminUserCreateInput, AdminUserUncheckedCreateInput>
    /**
     * In case the AdminUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUserUpdateInput, AdminUserUncheckedUpdateInput>
  }

  /**
   * AdminUser delete
   */
  export type AdminUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter which AdminUser to delete.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser deleteMany
   */
  export type AdminUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminUsers to delete
     */
    where?: AdminUserWhereInput
    /**
     * Limit how many AdminUsers to delete.
     */
    limit?: number
  }

  /**
   * AdminUser.assignedRequests
   */
  export type AdminUser$assignedRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormRequest
     */
    select?: FormRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormRequest
     */
    omit?: FormRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormRequestInclude<ExtArgs> | null
    where?: FormRequestWhereInput
    orderBy?: FormRequestOrderByWithRelationInput | FormRequestOrderByWithRelationInput[]
    cursor?: FormRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FormRequestScalarFieldEnum | FormRequestScalarFieldEnum[]
  }

  /**
   * AdminUser.createdRequests
   */
  export type AdminUser$createdRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormRequest
     */
    select?: FormRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormRequest
     */
    omit?: FormRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormRequestInclude<ExtArgs> | null
    where?: FormRequestWhereInput
    orderBy?: FormRequestOrderByWithRelationInput | FormRequestOrderByWithRelationInput[]
    cursor?: FormRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FormRequestScalarFieldEnum | FormRequestScalarFieldEnum[]
  }

  /**
   * AdminUser without action
   */
  export type AdminUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const FormRequestScalarFieldEnum: {
    id: 'id',
    formType: 'formType',
    formData: 'formData',
    status: 'status',
    notes: 'notes',
    metadata: 'metadata',
    createdBy: 'createdBy',
    assignedTo: 'assignedTo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FormRequestScalarFieldEnum = (typeof FormRequestScalarFieldEnum)[keyof typeof FormRequestScalarFieldEnum]


  export const AdminUserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    fullName: 'fullName',
    isActive: 'isActive',
    lastLoginAt: 'lastLoginAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AdminUserScalarFieldEnum = (typeof AdminUserScalarFieldEnum)[keyof typeof AdminUserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'FormType'
   */
  export type EnumFormTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FormType'>
    


  /**
   * Reference to a field of type 'FormType[]'
   */
  export type ListEnumFormTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FormType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'RequestStatus'
   */
  export type EnumRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestStatus'>
    


  /**
   * Reference to a field of type 'RequestStatus[]'
   */
  export type ListEnumRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type FormRequestWhereInput = {
    AND?: FormRequestWhereInput | FormRequestWhereInput[]
    OR?: FormRequestWhereInput[]
    NOT?: FormRequestWhereInput | FormRequestWhereInput[]
    id?: StringFilter<"FormRequest"> | string
    formType?: EnumFormTypeFilter<"FormRequest"> | $Enums.FormType
    formData?: JsonFilter<"FormRequest">
    status?: EnumRequestStatusFilter<"FormRequest"> | $Enums.RequestStatus
    notes?: StringNullableFilter<"FormRequest"> | string | null
    metadata?: JsonNullableFilter<"FormRequest">
    createdBy?: StringNullableFilter<"FormRequest"> | string | null
    assignedTo?: StringNullableFilter<"FormRequest"> | string | null
    createdAt?: DateTimeFilter<"FormRequest"> | Date | string
    updatedAt?: DateTimeFilter<"FormRequest"> | Date | string
    assignedToUser?: XOR<AdminUserNullableScalarRelationFilter, AdminUserWhereInput> | null
    createdByUser?: XOR<AdminUserNullableScalarRelationFilter, AdminUserWhereInput> | null
  }

  export type FormRequestOrderByWithRelationInput = {
    id?: SortOrder
    formType?: SortOrder
    formData?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    assignedTo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    assignedToUser?: AdminUserOrderByWithRelationInput
    createdByUser?: AdminUserOrderByWithRelationInput
  }

  export type FormRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FormRequestWhereInput | FormRequestWhereInput[]
    OR?: FormRequestWhereInput[]
    NOT?: FormRequestWhereInput | FormRequestWhereInput[]
    formType?: EnumFormTypeFilter<"FormRequest"> | $Enums.FormType
    formData?: JsonFilter<"FormRequest">
    status?: EnumRequestStatusFilter<"FormRequest"> | $Enums.RequestStatus
    notes?: StringNullableFilter<"FormRequest"> | string | null
    metadata?: JsonNullableFilter<"FormRequest">
    createdBy?: StringNullableFilter<"FormRequest"> | string | null
    assignedTo?: StringNullableFilter<"FormRequest"> | string | null
    createdAt?: DateTimeFilter<"FormRequest"> | Date | string
    updatedAt?: DateTimeFilter<"FormRequest"> | Date | string
    assignedToUser?: XOR<AdminUserNullableScalarRelationFilter, AdminUserWhereInput> | null
    createdByUser?: XOR<AdminUserNullableScalarRelationFilter, AdminUserWhereInput> | null
  }, "id">

  export type FormRequestOrderByWithAggregationInput = {
    id?: SortOrder
    formType?: SortOrder
    formData?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    assignedTo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FormRequestCountOrderByAggregateInput
    _max?: FormRequestMaxOrderByAggregateInput
    _min?: FormRequestMinOrderByAggregateInput
  }

  export type FormRequestScalarWhereWithAggregatesInput = {
    AND?: FormRequestScalarWhereWithAggregatesInput | FormRequestScalarWhereWithAggregatesInput[]
    OR?: FormRequestScalarWhereWithAggregatesInput[]
    NOT?: FormRequestScalarWhereWithAggregatesInput | FormRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FormRequest"> | string
    formType?: EnumFormTypeWithAggregatesFilter<"FormRequest"> | $Enums.FormType
    formData?: JsonWithAggregatesFilter<"FormRequest">
    status?: EnumRequestStatusWithAggregatesFilter<"FormRequest"> | $Enums.RequestStatus
    notes?: StringNullableWithAggregatesFilter<"FormRequest"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"FormRequest">
    createdBy?: StringNullableWithAggregatesFilter<"FormRequest"> | string | null
    assignedTo?: StringNullableWithAggregatesFilter<"FormRequest"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"FormRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FormRequest"> | Date | string
  }

  export type AdminUserWhereInput = {
    AND?: AdminUserWhereInput | AdminUserWhereInput[]
    OR?: AdminUserWhereInput[]
    NOT?: AdminUserWhereInput | AdminUserWhereInput[]
    id?: StringFilter<"AdminUser"> | string
    email?: StringFilter<"AdminUser"> | string
    password?: StringFilter<"AdminUser"> | string
    fullName?: StringFilter<"AdminUser"> | string
    isActive?: BoolFilter<"AdminUser"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"AdminUser"> | Date | string | null
    createdAt?: DateTimeFilter<"AdminUser"> | Date | string
    updatedAt?: DateTimeFilter<"AdminUser"> | Date | string
    assignedRequests?: FormRequestListRelationFilter
    createdRequests?: FormRequestListRelationFilter
  }

  export type AdminUserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    assignedRequests?: FormRequestOrderByRelationAggregateInput
    createdRequests?: FormRequestOrderByRelationAggregateInput
  }

  export type AdminUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: AdminUserWhereInput | AdminUserWhereInput[]
    OR?: AdminUserWhereInput[]
    NOT?: AdminUserWhereInput | AdminUserWhereInput[]
    password?: StringFilter<"AdminUser"> | string
    fullName?: StringFilter<"AdminUser"> | string
    isActive?: BoolFilter<"AdminUser"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"AdminUser"> | Date | string | null
    createdAt?: DateTimeFilter<"AdminUser"> | Date | string
    updatedAt?: DateTimeFilter<"AdminUser"> | Date | string
    assignedRequests?: FormRequestListRelationFilter
    createdRequests?: FormRequestListRelationFilter
  }, "id" | "email">

  export type AdminUserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AdminUserCountOrderByAggregateInput
    _max?: AdminUserMaxOrderByAggregateInput
    _min?: AdminUserMinOrderByAggregateInput
  }

  export type AdminUserScalarWhereWithAggregatesInput = {
    AND?: AdminUserScalarWhereWithAggregatesInput | AdminUserScalarWhereWithAggregatesInput[]
    OR?: AdminUserScalarWhereWithAggregatesInput[]
    NOT?: AdminUserScalarWhereWithAggregatesInput | AdminUserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AdminUser"> | string
    email?: StringWithAggregatesFilter<"AdminUser"> | string
    password?: StringWithAggregatesFilter<"AdminUser"> | string
    fullName?: StringWithAggregatesFilter<"AdminUser"> | string
    isActive?: BoolWithAggregatesFilter<"AdminUser"> | boolean
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"AdminUser"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AdminUser"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AdminUser"> | Date | string
  }

  export type FormRequestCreateInput = {
    id?: string
    formType?: $Enums.FormType
    formData: JsonNullValueInput | InputJsonValue
    status?: $Enums.RequestStatus
    notes?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedToUser?: AdminUserCreateNestedOneWithoutAssignedRequestsInput
    createdByUser?: AdminUserCreateNestedOneWithoutCreatedRequestsInput
  }

  export type FormRequestUncheckedCreateInput = {
    id?: string
    formType?: $Enums.FormType
    formData: JsonNullValueInput | InputJsonValue
    status?: $Enums.RequestStatus
    notes?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdBy?: string | null
    assignedTo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FormRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    formType?: EnumFormTypeFieldUpdateOperationsInput | $Enums.FormType
    formData?: JsonNullValueInput | InputJsonValue
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedToUser?: AdminUserUpdateOneWithoutAssignedRequestsNestedInput
    createdByUser?: AdminUserUpdateOneWithoutCreatedRequestsNestedInput
  }

  export type FormRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    formType?: EnumFormTypeFieldUpdateOperationsInput | $Enums.FormType
    formData?: JsonNullValueInput | InputJsonValue
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormRequestCreateManyInput = {
    id?: string
    formType?: $Enums.FormType
    formData: JsonNullValueInput | InputJsonValue
    status?: $Enums.RequestStatus
    notes?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdBy?: string | null
    assignedTo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FormRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    formType?: EnumFormTypeFieldUpdateOperationsInput | $Enums.FormType
    formData?: JsonNullValueInput | InputJsonValue
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    formType?: EnumFormTypeFieldUpdateOperationsInput | $Enums.FormType
    formData?: JsonNullValueInput | InputJsonValue
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserCreateInput = {
    id?: string
    email: string
    password: string
    fullName: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedRequests?: FormRequestCreateNestedManyWithoutAssignedToUserInput
    createdRequests?: FormRequestCreateNestedManyWithoutCreatedByUserInput
  }

  export type AdminUserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    fullName: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedRequests?: FormRequestUncheckedCreateNestedManyWithoutAssignedToUserInput
    createdRequests?: FormRequestUncheckedCreateNestedManyWithoutCreatedByUserInput
  }

  export type AdminUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedRequests?: FormRequestUpdateManyWithoutAssignedToUserNestedInput
    createdRequests?: FormRequestUpdateManyWithoutCreatedByUserNestedInput
  }

  export type AdminUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedRequests?: FormRequestUncheckedUpdateManyWithoutAssignedToUserNestedInput
    createdRequests?: FormRequestUncheckedUpdateManyWithoutCreatedByUserNestedInput
  }

  export type AdminUserCreateManyInput = {
    id?: string
    email: string
    password: string
    fullName: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumFormTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FormType | EnumFormTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FormType[] | ListEnumFormTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FormType[] | ListEnumFormTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFormTypeFilter<$PrismaModel> | $Enums.FormType
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusFilter<$PrismaModel> | $Enums.RequestStatus
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AdminUserNullableScalarRelationFilter = {
    is?: AdminUserWhereInput | null
    isNot?: AdminUserWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FormRequestCountOrderByAggregateInput = {
    id?: SortOrder
    formType?: SortOrder
    formData?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    metadata?: SortOrder
    createdBy?: SortOrder
    assignedTo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FormRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    formType?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdBy?: SortOrder
    assignedTo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FormRequestMinOrderByAggregateInput = {
    id?: SortOrder
    formType?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdBy?: SortOrder
    assignedTo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumFormTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FormType | EnumFormTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FormType[] | ListEnumFormTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FormType[] | ListEnumFormTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFormTypeWithAggregatesFilter<$PrismaModel> | $Enums.FormType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFormTypeFilter<$PrismaModel>
    _max?: NestedEnumFormTypeFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.RequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumRequestStatusFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FormRequestListRelationFilter = {
    every?: FormRequestWhereInput
    some?: FormRequestWhereInput
    none?: FormRequestWhereInput
  }

  export type FormRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AdminUserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminUserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminUserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type AdminUserCreateNestedOneWithoutAssignedRequestsInput = {
    create?: XOR<AdminUserCreateWithoutAssignedRequestsInput, AdminUserUncheckedCreateWithoutAssignedRequestsInput>
    connectOrCreate?: AdminUserCreateOrConnectWithoutAssignedRequestsInput
    connect?: AdminUserWhereUniqueInput
  }

  export type AdminUserCreateNestedOneWithoutCreatedRequestsInput = {
    create?: XOR<AdminUserCreateWithoutCreatedRequestsInput, AdminUserUncheckedCreateWithoutCreatedRequestsInput>
    connectOrCreate?: AdminUserCreateOrConnectWithoutCreatedRequestsInput
    connect?: AdminUserWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumFormTypeFieldUpdateOperationsInput = {
    set?: $Enums.FormType
  }

  export type EnumRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.RequestStatus
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AdminUserUpdateOneWithoutAssignedRequestsNestedInput = {
    create?: XOR<AdminUserCreateWithoutAssignedRequestsInput, AdminUserUncheckedCreateWithoutAssignedRequestsInput>
    connectOrCreate?: AdminUserCreateOrConnectWithoutAssignedRequestsInput
    upsert?: AdminUserUpsertWithoutAssignedRequestsInput
    disconnect?: AdminUserWhereInput | boolean
    delete?: AdminUserWhereInput | boolean
    connect?: AdminUserWhereUniqueInput
    update?: XOR<XOR<AdminUserUpdateToOneWithWhereWithoutAssignedRequestsInput, AdminUserUpdateWithoutAssignedRequestsInput>, AdminUserUncheckedUpdateWithoutAssignedRequestsInput>
  }

  export type AdminUserUpdateOneWithoutCreatedRequestsNestedInput = {
    create?: XOR<AdminUserCreateWithoutCreatedRequestsInput, AdminUserUncheckedCreateWithoutCreatedRequestsInput>
    connectOrCreate?: AdminUserCreateOrConnectWithoutCreatedRequestsInput
    upsert?: AdminUserUpsertWithoutCreatedRequestsInput
    disconnect?: AdminUserWhereInput | boolean
    delete?: AdminUserWhereInput | boolean
    connect?: AdminUserWhereUniqueInput
    update?: XOR<XOR<AdminUserUpdateToOneWithWhereWithoutCreatedRequestsInput, AdminUserUpdateWithoutCreatedRequestsInput>, AdminUserUncheckedUpdateWithoutCreatedRequestsInput>
  }

  export type FormRequestCreateNestedManyWithoutAssignedToUserInput = {
    create?: XOR<FormRequestCreateWithoutAssignedToUserInput, FormRequestUncheckedCreateWithoutAssignedToUserInput> | FormRequestCreateWithoutAssignedToUserInput[] | FormRequestUncheckedCreateWithoutAssignedToUserInput[]
    connectOrCreate?: FormRequestCreateOrConnectWithoutAssignedToUserInput | FormRequestCreateOrConnectWithoutAssignedToUserInput[]
    createMany?: FormRequestCreateManyAssignedToUserInputEnvelope
    connect?: FormRequestWhereUniqueInput | FormRequestWhereUniqueInput[]
  }

  export type FormRequestCreateNestedManyWithoutCreatedByUserInput = {
    create?: XOR<FormRequestCreateWithoutCreatedByUserInput, FormRequestUncheckedCreateWithoutCreatedByUserInput> | FormRequestCreateWithoutCreatedByUserInput[] | FormRequestUncheckedCreateWithoutCreatedByUserInput[]
    connectOrCreate?: FormRequestCreateOrConnectWithoutCreatedByUserInput | FormRequestCreateOrConnectWithoutCreatedByUserInput[]
    createMany?: FormRequestCreateManyCreatedByUserInputEnvelope
    connect?: FormRequestWhereUniqueInput | FormRequestWhereUniqueInput[]
  }

  export type FormRequestUncheckedCreateNestedManyWithoutAssignedToUserInput = {
    create?: XOR<FormRequestCreateWithoutAssignedToUserInput, FormRequestUncheckedCreateWithoutAssignedToUserInput> | FormRequestCreateWithoutAssignedToUserInput[] | FormRequestUncheckedCreateWithoutAssignedToUserInput[]
    connectOrCreate?: FormRequestCreateOrConnectWithoutAssignedToUserInput | FormRequestCreateOrConnectWithoutAssignedToUserInput[]
    createMany?: FormRequestCreateManyAssignedToUserInputEnvelope
    connect?: FormRequestWhereUniqueInput | FormRequestWhereUniqueInput[]
  }

  export type FormRequestUncheckedCreateNestedManyWithoutCreatedByUserInput = {
    create?: XOR<FormRequestCreateWithoutCreatedByUserInput, FormRequestUncheckedCreateWithoutCreatedByUserInput> | FormRequestCreateWithoutCreatedByUserInput[] | FormRequestUncheckedCreateWithoutCreatedByUserInput[]
    connectOrCreate?: FormRequestCreateOrConnectWithoutCreatedByUserInput | FormRequestCreateOrConnectWithoutCreatedByUserInput[]
    createMany?: FormRequestCreateManyCreatedByUserInputEnvelope
    connect?: FormRequestWhereUniqueInput | FormRequestWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type FormRequestUpdateManyWithoutAssignedToUserNestedInput = {
    create?: XOR<FormRequestCreateWithoutAssignedToUserInput, FormRequestUncheckedCreateWithoutAssignedToUserInput> | FormRequestCreateWithoutAssignedToUserInput[] | FormRequestUncheckedCreateWithoutAssignedToUserInput[]
    connectOrCreate?: FormRequestCreateOrConnectWithoutAssignedToUserInput | FormRequestCreateOrConnectWithoutAssignedToUserInput[]
    upsert?: FormRequestUpsertWithWhereUniqueWithoutAssignedToUserInput | FormRequestUpsertWithWhereUniqueWithoutAssignedToUserInput[]
    createMany?: FormRequestCreateManyAssignedToUserInputEnvelope
    set?: FormRequestWhereUniqueInput | FormRequestWhereUniqueInput[]
    disconnect?: FormRequestWhereUniqueInput | FormRequestWhereUniqueInput[]
    delete?: FormRequestWhereUniqueInput | FormRequestWhereUniqueInput[]
    connect?: FormRequestWhereUniqueInput | FormRequestWhereUniqueInput[]
    update?: FormRequestUpdateWithWhereUniqueWithoutAssignedToUserInput | FormRequestUpdateWithWhereUniqueWithoutAssignedToUserInput[]
    updateMany?: FormRequestUpdateManyWithWhereWithoutAssignedToUserInput | FormRequestUpdateManyWithWhereWithoutAssignedToUserInput[]
    deleteMany?: FormRequestScalarWhereInput | FormRequestScalarWhereInput[]
  }

  export type FormRequestUpdateManyWithoutCreatedByUserNestedInput = {
    create?: XOR<FormRequestCreateWithoutCreatedByUserInput, FormRequestUncheckedCreateWithoutCreatedByUserInput> | FormRequestCreateWithoutCreatedByUserInput[] | FormRequestUncheckedCreateWithoutCreatedByUserInput[]
    connectOrCreate?: FormRequestCreateOrConnectWithoutCreatedByUserInput | FormRequestCreateOrConnectWithoutCreatedByUserInput[]
    upsert?: FormRequestUpsertWithWhereUniqueWithoutCreatedByUserInput | FormRequestUpsertWithWhereUniqueWithoutCreatedByUserInput[]
    createMany?: FormRequestCreateManyCreatedByUserInputEnvelope
    set?: FormRequestWhereUniqueInput | FormRequestWhereUniqueInput[]
    disconnect?: FormRequestWhereUniqueInput | FormRequestWhereUniqueInput[]
    delete?: FormRequestWhereUniqueInput | FormRequestWhereUniqueInput[]
    connect?: FormRequestWhereUniqueInput | FormRequestWhereUniqueInput[]
    update?: FormRequestUpdateWithWhereUniqueWithoutCreatedByUserInput | FormRequestUpdateWithWhereUniqueWithoutCreatedByUserInput[]
    updateMany?: FormRequestUpdateManyWithWhereWithoutCreatedByUserInput | FormRequestUpdateManyWithWhereWithoutCreatedByUserInput[]
    deleteMany?: FormRequestScalarWhereInput | FormRequestScalarWhereInput[]
  }

  export type FormRequestUncheckedUpdateManyWithoutAssignedToUserNestedInput = {
    create?: XOR<FormRequestCreateWithoutAssignedToUserInput, FormRequestUncheckedCreateWithoutAssignedToUserInput> | FormRequestCreateWithoutAssignedToUserInput[] | FormRequestUncheckedCreateWithoutAssignedToUserInput[]
    connectOrCreate?: FormRequestCreateOrConnectWithoutAssignedToUserInput | FormRequestCreateOrConnectWithoutAssignedToUserInput[]
    upsert?: FormRequestUpsertWithWhereUniqueWithoutAssignedToUserInput | FormRequestUpsertWithWhereUniqueWithoutAssignedToUserInput[]
    createMany?: FormRequestCreateManyAssignedToUserInputEnvelope
    set?: FormRequestWhereUniqueInput | FormRequestWhereUniqueInput[]
    disconnect?: FormRequestWhereUniqueInput | FormRequestWhereUniqueInput[]
    delete?: FormRequestWhereUniqueInput | FormRequestWhereUniqueInput[]
    connect?: FormRequestWhereUniqueInput | FormRequestWhereUniqueInput[]
    update?: FormRequestUpdateWithWhereUniqueWithoutAssignedToUserInput | FormRequestUpdateWithWhereUniqueWithoutAssignedToUserInput[]
    updateMany?: FormRequestUpdateManyWithWhereWithoutAssignedToUserInput | FormRequestUpdateManyWithWhereWithoutAssignedToUserInput[]
    deleteMany?: FormRequestScalarWhereInput | FormRequestScalarWhereInput[]
  }

  export type FormRequestUncheckedUpdateManyWithoutCreatedByUserNestedInput = {
    create?: XOR<FormRequestCreateWithoutCreatedByUserInput, FormRequestUncheckedCreateWithoutCreatedByUserInput> | FormRequestCreateWithoutCreatedByUserInput[] | FormRequestUncheckedCreateWithoutCreatedByUserInput[]
    connectOrCreate?: FormRequestCreateOrConnectWithoutCreatedByUserInput | FormRequestCreateOrConnectWithoutCreatedByUserInput[]
    upsert?: FormRequestUpsertWithWhereUniqueWithoutCreatedByUserInput | FormRequestUpsertWithWhereUniqueWithoutCreatedByUserInput[]
    createMany?: FormRequestCreateManyCreatedByUserInputEnvelope
    set?: FormRequestWhereUniqueInput | FormRequestWhereUniqueInput[]
    disconnect?: FormRequestWhereUniqueInput | FormRequestWhereUniqueInput[]
    delete?: FormRequestWhereUniqueInput | FormRequestWhereUniqueInput[]
    connect?: FormRequestWhereUniqueInput | FormRequestWhereUniqueInput[]
    update?: FormRequestUpdateWithWhereUniqueWithoutCreatedByUserInput | FormRequestUpdateWithWhereUniqueWithoutCreatedByUserInput[]
    updateMany?: FormRequestUpdateManyWithWhereWithoutCreatedByUserInput | FormRequestUpdateManyWithWhereWithoutCreatedByUserInput[]
    deleteMany?: FormRequestScalarWhereInput | FormRequestScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumFormTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FormType | EnumFormTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FormType[] | ListEnumFormTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FormType[] | ListEnumFormTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFormTypeFilter<$PrismaModel> | $Enums.FormType
  }

  export type NestedEnumRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusFilter<$PrismaModel> | $Enums.RequestStatus
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumFormTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FormType | EnumFormTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FormType[] | ListEnumFormTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FormType[] | ListEnumFormTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFormTypeWithAggregatesFilter<$PrismaModel> | $Enums.FormType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFormTypeFilter<$PrismaModel>
    _max?: NestedEnumFormTypeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.RequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumRequestStatusFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type AdminUserCreateWithoutAssignedRequestsInput = {
    id?: string
    email: string
    password: string
    fullName: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdRequests?: FormRequestCreateNestedManyWithoutCreatedByUserInput
  }

  export type AdminUserUncheckedCreateWithoutAssignedRequestsInput = {
    id?: string
    email: string
    password: string
    fullName: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdRequests?: FormRequestUncheckedCreateNestedManyWithoutCreatedByUserInput
  }

  export type AdminUserCreateOrConnectWithoutAssignedRequestsInput = {
    where: AdminUserWhereUniqueInput
    create: XOR<AdminUserCreateWithoutAssignedRequestsInput, AdminUserUncheckedCreateWithoutAssignedRequestsInput>
  }

  export type AdminUserCreateWithoutCreatedRequestsInput = {
    id?: string
    email: string
    password: string
    fullName: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedRequests?: FormRequestCreateNestedManyWithoutAssignedToUserInput
  }

  export type AdminUserUncheckedCreateWithoutCreatedRequestsInput = {
    id?: string
    email: string
    password: string
    fullName: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedRequests?: FormRequestUncheckedCreateNestedManyWithoutAssignedToUserInput
  }

  export type AdminUserCreateOrConnectWithoutCreatedRequestsInput = {
    where: AdminUserWhereUniqueInput
    create: XOR<AdminUserCreateWithoutCreatedRequestsInput, AdminUserUncheckedCreateWithoutCreatedRequestsInput>
  }

  export type AdminUserUpsertWithoutAssignedRequestsInput = {
    update: XOR<AdminUserUpdateWithoutAssignedRequestsInput, AdminUserUncheckedUpdateWithoutAssignedRequestsInput>
    create: XOR<AdminUserCreateWithoutAssignedRequestsInput, AdminUserUncheckedCreateWithoutAssignedRequestsInput>
    where?: AdminUserWhereInput
  }

  export type AdminUserUpdateToOneWithWhereWithoutAssignedRequestsInput = {
    where?: AdminUserWhereInput
    data: XOR<AdminUserUpdateWithoutAssignedRequestsInput, AdminUserUncheckedUpdateWithoutAssignedRequestsInput>
  }

  export type AdminUserUpdateWithoutAssignedRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdRequests?: FormRequestUpdateManyWithoutCreatedByUserNestedInput
  }

  export type AdminUserUncheckedUpdateWithoutAssignedRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdRequests?: FormRequestUncheckedUpdateManyWithoutCreatedByUserNestedInput
  }

  export type AdminUserUpsertWithoutCreatedRequestsInput = {
    update: XOR<AdminUserUpdateWithoutCreatedRequestsInput, AdminUserUncheckedUpdateWithoutCreatedRequestsInput>
    create: XOR<AdminUserCreateWithoutCreatedRequestsInput, AdminUserUncheckedCreateWithoutCreatedRequestsInput>
    where?: AdminUserWhereInput
  }

  export type AdminUserUpdateToOneWithWhereWithoutCreatedRequestsInput = {
    where?: AdminUserWhereInput
    data: XOR<AdminUserUpdateWithoutCreatedRequestsInput, AdminUserUncheckedUpdateWithoutCreatedRequestsInput>
  }

  export type AdminUserUpdateWithoutCreatedRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedRequests?: FormRequestUpdateManyWithoutAssignedToUserNestedInput
  }

  export type AdminUserUncheckedUpdateWithoutCreatedRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedRequests?: FormRequestUncheckedUpdateManyWithoutAssignedToUserNestedInput
  }

  export type FormRequestCreateWithoutAssignedToUserInput = {
    id?: string
    formType?: $Enums.FormType
    formData: JsonNullValueInput | InputJsonValue
    status?: $Enums.RequestStatus
    notes?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    createdByUser?: AdminUserCreateNestedOneWithoutCreatedRequestsInput
  }

  export type FormRequestUncheckedCreateWithoutAssignedToUserInput = {
    id?: string
    formType?: $Enums.FormType
    formData: JsonNullValueInput | InputJsonValue
    status?: $Enums.RequestStatus
    notes?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FormRequestCreateOrConnectWithoutAssignedToUserInput = {
    where: FormRequestWhereUniqueInput
    create: XOR<FormRequestCreateWithoutAssignedToUserInput, FormRequestUncheckedCreateWithoutAssignedToUserInput>
  }

  export type FormRequestCreateManyAssignedToUserInputEnvelope = {
    data: FormRequestCreateManyAssignedToUserInput | FormRequestCreateManyAssignedToUserInput[]
    skipDuplicates?: boolean
  }

  export type FormRequestCreateWithoutCreatedByUserInput = {
    id?: string
    formType?: $Enums.FormType
    formData: JsonNullValueInput | InputJsonValue
    status?: $Enums.RequestStatus
    notes?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedToUser?: AdminUserCreateNestedOneWithoutAssignedRequestsInput
  }

  export type FormRequestUncheckedCreateWithoutCreatedByUserInput = {
    id?: string
    formType?: $Enums.FormType
    formData: JsonNullValueInput | InputJsonValue
    status?: $Enums.RequestStatus
    notes?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    assignedTo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FormRequestCreateOrConnectWithoutCreatedByUserInput = {
    where: FormRequestWhereUniqueInput
    create: XOR<FormRequestCreateWithoutCreatedByUserInput, FormRequestUncheckedCreateWithoutCreatedByUserInput>
  }

  export type FormRequestCreateManyCreatedByUserInputEnvelope = {
    data: FormRequestCreateManyCreatedByUserInput | FormRequestCreateManyCreatedByUserInput[]
    skipDuplicates?: boolean
  }

  export type FormRequestUpsertWithWhereUniqueWithoutAssignedToUserInput = {
    where: FormRequestWhereUniqueInput
    update: XOR<FormRequestUpdateWithoutAssignedToUserInput, FormRequestUncheckedUpdateWithoutAssignedToUserInput>
    create: XOR<FormRequestCreateWithoutAssignedToUserInput, FormRequestUncheckedCreateWithoutAssignedToUserInput>
  }

  export type FormRequestUpdateWithWhereUniqueWithoutAssignedToUserInput = {
    where: FormRequestWhereUniqueInput
    data: XOR<FormRequestUpdateWithoutAssignedToUserInput, FormRequestUncheckedUpdateWithoutAssignedToUserInput>
  }

  export type FormRequestUpdateManyWithWhereWithoutAssignedToUserInput = {
    where: FormRequestScalarWhereInput
    data: XOR<FormRequestUpdateManyMutationInput, FormRequestUncheckedUpdateManyWithoutAssignedToUserInput>
  }

  export type FormRequestScalarWhereInput = {
    AND?: FormRequestScalarWhereInput | FormRequestScalarWhereInput[]
    OR?: FormRequestScalarWhereInput[]
    NOT?: FormRequestScalarWhereInput | FormRequestScalarWhereInput[]
    id?: StringFilter<"FormRequest"> | string
    formType?: EnumFormTypeFilter<"FormRequest"> | $Enums.FormType
    formData?: JsonFilter<"FormRequest">
    status?: EnumRequestStatusFilter<"FormRequest"> | $Enums.RequestStatus
    notes?: StringNullableFilter<"FormRequest"> | string | null
    metadata?: JsonNullableFilter<"FormRequest">
    createdBy?: StringNullableFilter<"FormRequest"> | string | null
    assignedTo?: StringNullableFilter<"FormRequest"> | string | null
    createdAt?: DateTimeFilter<"FormRequest"> | Date | string
    updatedAt?: DateTimeFilter<"FormRequest"> | Date | string
  }

  export type FormRequestUpsertWithWhereUniqueWithoutCreatedByUserInput = {
    where: FormRequestWhereUniqueInput
    update: XOR<FormRequestUpdateWithoutCreatedByUserInput, FormRequestUncheckedUpdateWithoutCreatedByUserInput>
    create: XOR<FormRequestCreateWithoutCreatedByUserInput, FormRequestUncheckedCreateWithoutCreatedByUserInput>
  }

  export type FormRequestUpdateWithWhereUniqueWithoutCreatedByUserInput = {
    where: FormRequestWhereUniqueInput
    data: XOR<FormRequestUpdateWithoutCreatedByUserInput, FormRequestUncheckedUpdateWithoutCreatedByUserInput>
  }

  export type FormRequestUpdateManyWithWhereWithoutCreatedByUserInput = {
    where: FormRequestScalarWhereInput
    data: XOR<FormRequestUpdateManyMutationInput, FormRequestUncheckedUpdateManyWithoutCreatedByUserInput>
  }

  export type FormRequestCreateManyAssignedToUserInput = {
    id?: string
    formType?: $Enums.FormType
    formData: JsonNullValueInput | InputJsonValue
    status?: $Enums.RequestStatus
    notes?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FormRequestCreateManyCreatedByUserInput = {
    id?: string
    formType?: $Enums.FormType
    formData: JsonNullValueInput | InputJsonValue
    status?: $Enums.RequestStatus
    notes?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    assignedTo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FormRequestUpdateWithoutAssignedToUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    formType?: EnumFormTypeFieldUpdateOperationsInput | $Enums.FormType
    formData?: JsonNullValueInput | InputJsonValue
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdByUser?: AdminUserUpdateOneWithoutCreatedRequestsNestedInput
  }

  export type FormRequestUncheckedUpdateWithoutAssignedToUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    formType?: EnumFormTypeFieldUpdateOperationsInput | $Enums.FormType
    formData?: JsonNullValueInput | InputJsonValue
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormRequestUncheckedUpdateManyWithoutAssignedToUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    formType?: EnumFormTypeFieldUpdateOperationsInput | $Enums.FormType
    formData?: JsonNullValueInput | InputJsonValue
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormRequestUpdateWithoutCreatedByUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    formType?: EnumFormTypeFieldUpdateOperationsInput | $Enums.FormType
    formData?: JsonNullValueInput | InputJsonValue
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedToUser?: AdminUserUpdateOneWithoutAssignedRequestsNestedInput
  }

  export type FormRequestUncheckedUpdateWithoutCreatedByUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    formType?: EnumFormTypeFieldUpdateOperationsInput | $Enums.FormType
    formData?: JsonNullValueInput | InputJsonValue
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormRequestUncheckedUpdateManyWithoutCreatedByUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    formType?: EnumFormTypeFieldUpdateOperationsInput | $Enums.FormType
    formData?: JsonNullValueInput | InputJsonValue
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}