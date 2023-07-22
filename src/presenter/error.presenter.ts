export class Error {
  static getHtml(error: string): string {
    return `
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
      <title>Error</title>
    </head>
    <body class="bg-body-tertiary">
      <div class="container">
        <main>
          <div class="py-5 text-center">
            <h2 style="color: var(--bs-danger-text-emphasis)">Some error occurred</h2>
            <p class="lead mt-5">Error: ${error}!</p>
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
