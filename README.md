<p align="center">
  <a href="https://github.com/hellhub-collective/sdk">
    <img src="https://raw.githubusercontent.com/hellhub-collective/sdk/main/assets/logo.png" width="150px" alt="HellHub SDK Logo" />
  </a>
</p>

<h3 align="center">The Official SDK For The Community Driven HellHub API.</h3>
<p align="center">Written 100% in <a href="https://github.com/microsoft/TypeScript">TypeScript</a>, Filter and collect data with full type safety out of the box. Make your life easier and try it today!</p>

<br />

<p align="center">
  <a href="https://github.com/hellhub-collective/sdk/actions/workflows/github-code-scanning/codeql">
    <img src="https://github.com/hellhub-collective/sdk/actions/workflows/github-code-scanning/codeql/badge.svg?branch=main" alt="CodeQL" />
  </a>
  <a href="https://github.com/hellhub-collective/sdk/actions/workflows/test.yml">
    <img src="https://github.com/hellhub-collective/sdk/actions/workflows/test.yml/badge.svg" alt="Tests" />
  </a>
  <a href="https://bundlephobia.com/package/@hellhub-collective/sdk">
    <img src="https://img.shields.io/bundlephobia/min/@hellhub-collective/sdk" alt="Bundle Size (Minified)" />
  </a>
  <a href="https://bundlephobia.com/package/@hellhub-collective/sdk">
    <img src="https://img.shields.io/bundlephobia/minzip/@hellhub-collective/sdk" alt="Bundle Size (Minified & Zipped)" />
  </a>
</p>

## What is the HellHub SDK?

The HellHub SDK is a TypeScript library that provides a simple and easy-to-use interface for interacting with the HellHub API. It is designed to make it easy for developers to filter and collect data with full type safety out of the box.

## Installation

To install the HellHub SDK, you can use npm, yarn or bun. For simplicity, we will use bun in this example:

```bash
bun add @hellhub-collective/sdk
```

## Usage

To use the HellHub SDK, you will need to import the `HellHub` class from the `@hellhub-collective/sdk` package.

```typescript
import HellHub from "@hellhub-collective/sdk";
```

You can then use the `HellHub` class to interact with the HellHub API. For example, you can use the `planets` method to retrieve a single or a list of planets:

```typescript
// get the planet with id 1
const response = await HellHub.planets(1);

// get a list of all planets
const response = await HellHub.planets();

// get a list of planets with a filter and limit
const response = await HellHub.planets({
  limit: 15,
  filters: { name: { $contains: "Earth" } },
});
```

### Requesting complex endpoints

The HellHub SDK also supports more complex endpoints that require additional parameters. You can also use the `request` method if you need more control over the request:

```typescript
import HellHub, { type Planet } from "@hellhub-collective/sdk";

const response = await HellHub.request<Planet[]>("/sectors/1/planets", {
  query: {
    limit: 15,
    filters: { name: { $contains: "Earth" } },
  },
});
```

## Bring your own API

If you are using a self-hosted version of the HellHub API, you can specify the `HELLHUB_API_URL` environment variable to point to your API endpoint. Note that the value will need to include the `/api` path.

```bash
export HELLHUB_API_URL="https://my-hellhub-api.com/api"
```

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/hellhub-collective/sdk/blob/main/LICENSE) file for details.
