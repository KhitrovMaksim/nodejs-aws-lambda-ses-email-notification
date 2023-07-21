export type EventLambda = {
  body: string
  requestContext: {
    http: {
      method: string
    }
  }
}
