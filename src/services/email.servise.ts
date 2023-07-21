import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
import { Email } from './email.interface'
import { SesRegions } from '../enums/aws/ses-regions'
import { Charsets } from '../enums/text/charsets'
import { EmailData } from '../types/email-data.type'

export class EmailService implements Email {
  sesClient: SESClient
  constructor() {
    this.sesClient = new SESClient({ region: SesRegions.NORTHERN_VIRGINIA })
  }

  async send(data: EmailData) {
    const sendEmailCommand = this.createSendEmailCommand(data)

    return await this.sesClient.send(sendEmailCommand)
  }

  private createSendEmailCommand = (data: EmailData) => {
    return new SendEmailCommand({
      Destination: {
        CcAddresses: [data.sender],
        ToAddresses: [data.receiver],
      },
      Message: {
        Body: {
          Html: {
            Charset: Charsets.UTF_8,
            Data: data.body,
          },
        },
        Subject: {
          Charset: Charsets.UTF_8,
          Data: data.subject,
        },
      },
      Source: data.sender,
      ReplyToAddresses: [],
    })
  }
}
