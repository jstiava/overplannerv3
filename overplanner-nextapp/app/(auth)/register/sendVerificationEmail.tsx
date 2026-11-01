'use server'

import VerifyAccountEmail from "@/emails/VerifyAccountEmail";
import { NodemailerEmailTransporter } from "@/lib/emails";
import { User } from "better-auth";
import { render } from "react-email";



export default async function sendVerificationEmail(props: { user: User, token: string }) {


      const activationUrl = new URL(
        '/activate-account',
        process.env.NODE_ENV == 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_SITE_URL
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