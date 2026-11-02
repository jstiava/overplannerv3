'use server'

import VerifyAccountEmail from "@/emails/VerifyAccountEmail";
import { NodemailerEmailTransporter } from "@/lib/emails";
import { User } from "better-auth";
import { render } from "react-email";


const NEXT_PUBLIC_SITE_URI = 'https://overplannerv3.vercel.app'

export default async function sendVerificationEmail(props: { user: User, token: string }) {


      const activationUrl = new URL(
        '/activate-account',
        process.env.NODE_ENV == 'development' ? 'http://localhost:3000' : NEXT_PUBLIC_SITE_URI
      )

      activationUrl.searchParams.set('token', props.token)

      const EmailComponent = (<VerifyAccountEmail {...{
        url: activationUrl.toString()
      }} />)

      const emailHtml = await render(EmailComponent);
      const theSubject = 'Activate your Overplanner account';
      const theRecipients = props.user.email;

      await NodemailerEmailTransporter.sendMail({
        from: 'no-reply@stiava.dev',
        to: [...theRecipients.split(',')],
        subject: theSubject,
        html: emailHtml,
      })

}