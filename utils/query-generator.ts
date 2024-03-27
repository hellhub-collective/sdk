import type { APIRequestInit, Entity } from "types/api-entities";

/**
 * Generate a query string from a query object, automatically encodes values
 * and renames properties that were prefixed with a dollar sign.
 */
export default function generateQuery<T extends Entity | Array<Entity> = any>(
  input: APIRequestInit<T>["query"],
): string {
  if (!input) return "";

  const encodeQueryParamValue = (value: any): string => {
    if (typeof value !== "string") {
      value = JSON.stringify(value);
    }

    return encodeURIComponent(value);
  };

  const processKey = (key: string): string => {
    let _key = key;
    if (_key.startsWith("$")) _key = _key.replace("$", "");
    if (["not", "and", "or"].includes(_key)) _key = _key.toUpperCase();
    return _key;
  };

  const buildQuery = (params: any, parentKey = ""): string => {
    let _query = "";

    for (const key in params) {
      if (!params.hasOwnProperty(key)) continue;

      const value = params[key];

      const encodedKey = parentKey
        ? `${parentKey}[${processKey(key)}]`
        : processKey(key);

      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const arrayValue = value[i];
          const arrayKey = `${encodedKey}[${i}]`;

          if (typeof arrayValue === "object" && arrayValue !== null) {
            _query += buildQuery(arrayValue, arrayKey) + "&";
          } else {
            _query += `${arrayKey}=${encodeQueryParamValue(arrayValue)}&`;
          }
        }
      } else if (typeof value === "object" && value !== null) {
        _query += buildQuery(value, encodedKey) + "&";
      } else {
        _query += `${encodedKey}=${encodeQueryParamValue(value)}&`;
      }
    }

    return _query;
  };

  return buildQuery(input as any)
    .slice(0, -1)
    .replace(/&+/g, "&")
    .replace(/&$/g, "");
}
