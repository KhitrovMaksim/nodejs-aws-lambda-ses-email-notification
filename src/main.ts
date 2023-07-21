import { ContactFormPresenter } from './presenter/contactForm.presenter'
import { SuccessfullySubmittedPresenter } from './presenter/successfullySubmitted.presenter'
import { ContactFormFields } from './types/contactFormFields.type'
import { EventLambda } from './types/eventLambda.type'
import { ContentTypes } from './enums/http/contentTypes'
import { Headers } from './enums/http/headers'
import { ResponseStatusCodes } from './enums/http/responseStatusCodes'
import { EmailService } from './services/email.servise'
import { Error } from './presenter/error.presenter'
import { config } from './config'

export const controller = async (event: EventLambda) => {
  const httpMethod: string = event.requestContext.http.method

  if (httpMethod === 'GET') {
    return {
      statusCode: ResponseStatusCodes.OK,
      headers: { [Headers.CONTENT_TYPE]: ContentTypes.TEXT_HTML },
      body: ContactFormPresenter.getHtml(),
    }
  }

  if (httpMethod === 'POST') {
    const formDataCodedBase64 = event.body
    const formDataDecoded: string = new Buffer(formDataCodedBase64, 'base64').toString()
    const contactFormFields: ContactFormFields = {
      question: formDataDecoded.split('&')[0].split('=')[1],
      name: formDataDecoded.split('&')[1].split('=')[1],
      email: formDataDecoded.split('&')[2].split('=')[1].replace('%40', '@'),
    }

    const emailService = new EmailService()

    try {
      await emailService.send({
        sender: config.emailSender,
        receiver: contactFormFields.email,
        subject: contactFormFields.name,
        body: contactFormFields.question,
      })

      return {
        statusCode: ResponseStatusCodes.OK,
        headers: { [Headers.CONTENT_TYPE]: ContentTypes.TEXT_HTML },
        body: SuccessfullySubmittedPresenter.getHtml(contactFormFields),
      }
    } catch (e) {
      return {
        statusCode: ResponseStatusCodes.INTERNAL_SERVER_ERROR,
        headers: { [Headers.CONTENT_TYPE]: ContentTypes.TEXT_HTML },
        body: Error.getHtml(JSON.stringify(e)),
      }
    }
  }
}
