export interface Event {
  body: string
  requestContext: {
    http: {
      method: string
    }
  }
}
