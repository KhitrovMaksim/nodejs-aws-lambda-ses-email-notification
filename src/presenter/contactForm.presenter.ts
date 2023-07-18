export class ContactFormPresenter {
  static getHtml(): string {
    return `
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
      <title>Contact form</title>
    </head>
    <body class="bg-body-tertiary">
      <div class="container">
        <main>
          <div class="py-5 text-center">
            <h2>Contact form</h2>
            <p class="lead">Welcome to the contact form. In this form, we can ask your question, and we, in turn, will try to answer you as soon as possible. Please fill in all fields according to their purpose.</p>
          </div>
          <div class="row g-5">
            <div class="col-md-7 col-lg-12">
              <form action="https://3qp3itv6eitge37uh7kmzpvpda0twptx.lambda-url.us-east-1.on.aws/" method="post">
                <div class="row g-3">
                  <div class="col-12">
                    <label for="firstName" class="form-label">Question</label>
                    <input type="text" class="form-control" id="question" name="question" placeholder="question">
                  </div>
                  <div class="col-12">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" name="name" placeholder="name">
                  </div>
                  <div class="col-12">
                    <label for="email" class="form-label">Email </label>
                    <input type="email" class="form-control" id="email" name="email" placeholder="you@example.com">
                  </div>
                </div>
                <hr class="my-4">
                <button class="w-100 btn btn-primary btn-lg" type="submit">Send</button>
              </form>
            </div>
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
