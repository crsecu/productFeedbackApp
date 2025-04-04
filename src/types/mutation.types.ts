// Represents a successful result from a data mutation (submission/update operation)
export type MutationSuccess<T> = {
  success: true;
  payload: T;
};

// Represents a failed result from a data mutation (submission/update operation)
export type MutationFailure = {
  success: false;
  error: unknown;
};

//Union type for handling mutation outcomes (success or failure)
export type MutationResult<T> = MutationSuccess<T> | MutationFailure;
