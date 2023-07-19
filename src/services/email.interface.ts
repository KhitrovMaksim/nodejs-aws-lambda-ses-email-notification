import { SendEmailCommandOutput } from '@aws-sdk/client-ses'
import { EmailData } from '../types/emailData.type'

export interface Email {
  send(data: EmailData): Promise<SendEmailCommandOutput>
}
