import { ContactFormPresenter } from './presenter/contactForm.presenter'
import { SuccessfullySubmittedPresenter } from './presenter/successfullySubmitted.presenter'
import { ContactFormFields } from './ContactFormFields.interface'
import { Event } from './event.interface'
import { ContentTypes } from './enums/http/contentTypes'
import { Headers } from './enums/http/headers'
import { ResponseStatusCodes } from './enums/http/responseStatusCodes'
import { HttpResponse } from './httpResponse.interface'

export const controller = async (event: Event) => {
  const httpMethod: string = event.requestContext.http.method

  let response: HttpResponse = {
    statusCode: ResponseStatusCodes.OK,
    headers: { [Headers.CONTENT_TYPE]: ContentTypes.TEXT_HTML },
    body: ContactFormPresenter.getHtml(),
  }

  if (httpMethod === 'POST') {
    const formDataCodedBase64 = event.body
    const formDataDecoded: string = new Buffer(formDataCodedBase64, 'base64').toString()
    const contactFormFields: ContactFormFields = {
      question: formDataDecoded.split('&')[0].split('=')[1],
      name: formDataDecoded.split('&')[1].split('=')[1],
      email: formDataDecoded.split('&')[2].split('=')[1].replace('%40', '@'),
    }

    response = {
      statusCode: ResponseStatusCodes.OK,
      headers: { [Headers.CONTENT_TYPE]: ContentTypes.TEXT_HTML },
      body: SuccessfullySubmittedPresenter.getHtml(contactFormFields),
    }
  }

  return response
}
