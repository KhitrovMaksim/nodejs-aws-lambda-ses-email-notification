import { Headers } from '../enums/http/headers'
import { ContentTypes } from '../enums/http/content-types'

export type Header = {
  [key in Headers]?: ContentTypes
}
