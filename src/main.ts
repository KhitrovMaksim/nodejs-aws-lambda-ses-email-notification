import { ContactFormPresenter } from './presenter/contactForm.presenter'
import { SuccessfullySubmittedPresenter } from './presenter/successfullySubmitted.presenter'
import { ContactFormFields } from './ContactFormFields.interface'

interface Event {
  body: string
  requestContext: {
    http: {
      method: string
    }
  }
}

export const controller = async (event: Event) => {
  const httpMethod: string = event.requestContext.http.method

  if (httpMethod === 'POST') {
    const formDataCodedBase64 = event.body
    const formDataDecoded: string = new Buffer(formDataCodedBase64, 'base64').toString()
    const contactFormFields: ContactFormFields = {
      question: formDataDecoded.split('&')[0].split('=')[1],
      name: formDataDecoded.split('&')[1].split('=')[1],
      email: formDataDecoded.split('&')[2].split('=')[1].replace('%40', '@'),
    }

    return {
      statusCode: 201,
      headers: { 'Content-Type': 'text/html' },
      body: SuccessfullySubmittedPresenter.getHtml(contactFormFields),
    }
  }

  if (httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: ContactFormPresenter.getHtml(),
    }
  }
}
