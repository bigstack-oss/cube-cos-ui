# COS API Request Hooks

To make response handling (e.g., error message parsing) more consistent across the application, we’ve introduced two hooks: [`useCosGetRequest`](#usecosgetrequest) and [`useCosMutationRequest`](#usecosmutationrequest).

## `useCosGetRequest`

`useCosGetRequest` is designed for managing HTTP GET requests from our API server.

### Requests Without Parameters

```ts
const {
  isLoading,
  data: bars,
  getResource: getBars,
  errorState,
} = useCosGetRequest(fooApi.getBars)
```

You can call `getBars` to manually trigger the request when necessary:

```ts
const myFunction = async () => {
  const bars = await getBars()
}
```

### Requests With Parameters

```ts
const {
  isLoading,
  data: bars,
  getResource: getBars,
  errorState,
} = useCosGetRequest(fooApi.getBars, () => {
  if (shouldNotFetch) {
    // Returns `null` or `undefined` to prevent the hook from sending
    // a request with nullish parameter.
    return null
  }
  const req: GetBarsRequest = {
    // ...
  }
  return req
})
```

#### Requests With Parameters and Axios Request Config

```ts
const {
  isLoading,
  data: bars,
  getResource: getBars,
  errorState,
} = useCosGetRequest(
  (params) => {
    const { req, options } = params
    return fooApi.getBars(req, options)
  },
  () => {
    if (shouldNotFetch) {
      // Returns `null` or `undefined` to prevent the hook from sending
      // a request with nullish parameter.
      return null
    }
    const req: GetBarsRequest = {
      // ...
    }
    const options: RawAxiosRequestConfig = {
      // ...
    }
    return { req, options }
  },
)
```

## `useCosMutationRequest`

`useCosMutationRequest` is designed for managing non-GET requests from our API server, such as POST, PUT, and DELETE.

### Request Without Parameters

```ts
const {
  isLoading,
  data: bar,
  mutateResource: updateBar,
  errorState,
} = useCosMutationRequest(fooApi.updateBar)

const onClick = async () => {
  try {
    await updateBar()
  } catch (error) {
    if (isCosRequestError(error)) {
      const { nativeError, apiError } = error
      // Do extra error handling if necessary.
    }
  }
}
```

### Request With Parameters and Axios Request Config

```ts
const {
  isLoading,
  data: bar,
  mutateResource: createBar,
  errorState,
} = useCosMutationRequest(fooApi.createBar)

const onClick = async () => {
  try {
    const req: CreateBarsRequest = {
      // ...
    }
    const options: RawAxiosRequestConfig = {
      // ...
    }

    // Immediately retrieve the response returned by the API if necessary.
    const bar = await createBar(req, options) // `options` is optional.
    console.log(bar)
  } catch (error) {
    if (isCosRequestError(error)) {
      const { nativeError, apiError } = error
      // Do extra error handling if necessary.
    }
  }
}
```

## Displaying Error Messages

TODO: Implement a component display request error consistently.
