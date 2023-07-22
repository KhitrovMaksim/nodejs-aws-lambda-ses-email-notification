import { ContactFormPresenter } from './presenter/contact-form.presenter'
import { SuccessfullySubmittedPresenter } from './presenter/successfully-submitted.presenter'
import { ContactFormFields } from './types/contact-form-fields.type'
import { EventLambda } from './types/event-lambda.type'
import { ContentTypes } from './enums/http/content-types'
import { Headers } from './enums/http/headers'
import { ResponseStatusCodes } from './enums/http/response-status-codes'
import { EmailService } from './services/email.servise'
import { Error } from './presenter/error.presenter'
import { config } from './config'
import { HttpMethods } from './enums/http/http-methods'
import { ContactFormDecoder } from './services/contact-form-decoder.service'

export const controller = async (event: EventLambda) => {
  const httpMethod: string = event.requestContext.http.method

  if (httpMethod === HttpMethods.GET) {
    return {
      statusCode: ResponseStatusCodes.OK,
      headers: { [Headers.CONTENT_TYPE]: ContentTypes.TEXT_HTML },
      body: ContactFormPresenter.getHtml(),
    }
  }

  if (httpMethod === HttpMethods.POST) {
    const formDataCodedBase64 = event.body
    const contactFormFields: ContactFormFields = ContactFormDecoder.decode(formDataCodedBase64)
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
