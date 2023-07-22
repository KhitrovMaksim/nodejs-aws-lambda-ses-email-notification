import { ContactFormFields } from '../types/contact-form-fields.type'

export class ContactFormDecoder {
  static decode(formData: string): ContactFormFields {
    const formDataDecoded: string = decodeURIComponent(Buffer.from(formData, 'base64').toString('utf8'))
    return {
      question: formDataDecoded.split('&')[0].split('=')[1],
      name: formDataDecoded.split('&')[1].split('=')[1],
      email: formDataDecoded.split('&')[2].split('=')[1],
    }
  }
}
