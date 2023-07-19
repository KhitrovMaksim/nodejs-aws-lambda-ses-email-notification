import { Headers } from '../enums/http/headers'
import { ContentTypes } from '../enums/http/contentTypes'

export type Header = {
  [key in Headers]?: ContentTypes
}
