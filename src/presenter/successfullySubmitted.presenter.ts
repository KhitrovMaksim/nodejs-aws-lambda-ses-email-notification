import { ContactFormFields } from '../ContactFormFields.interface'

export class SuccessfullySubmittedPresenter {
  static getHtml(contactFormFields: ContactFormFields): string {
    return `
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
      <title>Successfully submitted</title>
    </head>
    <body class="bg-body-tertiary">
      <div class="container">
        <main>
          <div class="py-5 text-center">
            <h2>Successfully submitted</h2>
            <p class="lead mt-5">Thank you for your question ${contactFormFields.name}!</p>
          </div>
        </main>
        <footer class="my-5 pt-5 text-body-secondary text-center text-small">
        <p class="mb-1">Created by Khitrov Maksim · © 2023</p>
        </footer>
      </div>
    </body>
    </html>
    `
  }
}
