import { ResponseStatusCodes } from './enums/http/responseStatusCodes'
import { Headers } from './enums/http/headers'
import { ContentTypes } from './enums/http/contentTypes'

type Header = {
  [key in Headers]?: ContentTypes
}

export interface HttpResponse {
  statusCode: ResponseStatusCodes
  headers: Header
  body: string
}
