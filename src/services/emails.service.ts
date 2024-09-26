import nodemailer from 'nodemailer'


export interface SendMailOption{
    to:string|string[];
    subject:string;
    htmlBody:string;
    attachements?:attachment[]
}
export interface attachment{
    filename:string;
    path:string;
}
export interface options{
    service:string;
    email:string;
    pass:string;
    
}

export class EmailService{
    
   
    private transporter;

    public constructor(option:options ){
        const {service,email,pass}= option;
        this.transporter =nodemailer.createTransport({
            service: service,
             auth:{
                 user:email,
                 pass:pass
             }
         });
    }

    async sendEmail(options:SendMailOption):Promise<boolean>
    {
        const{to,subject,htmlBody,attachements =  []} = options;
        try{
            const sentInformation = await this.transporter.sendMail({
                to:to,
                subject:subject,
                html:htmlBody,
                attachments:attachements
                
            });
           
            return true;
        }
        catch{
            return false;
        }
    }

    async SendEmailWithfileSystemLogs(to:string|string[]){
        const subject='PRUEBA DE ENVIOS DE EMAIL';
        const htmlBody= `
            <h2>Hola MAMI TE QUIERO MUCHO!</h2>
            <p>este es un correo generado por NOC-APP</p>
        `;
       
        return await this.sendEmail({
            to:to,
            subject:subject,
            htmlBody:htmlBody,
           
        })
        

    }


}