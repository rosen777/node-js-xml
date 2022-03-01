'use strict'
import bp  from 'body-parser'
import morgan from 'morgan'
import express from 'express'
import soap from "soap";

export const app = express()

app.disable('x-powered-by')

app.use(morgan('dev'))

const host = "localhost";
const port = 8000;

const soapAPI = "http://www.dneonline.com/calculator.asmx?wsdl";

const wsdlOptions = {
  escapeXML: false,
  stream: true,
  returnFault: true,
  stream: true,
  parseReponseAttachments: true,
};

const args = {}

app.get('/', async (req, res) => {
    soap.createClient(
      soapAPI,
      wsdlOptions,
      (err, result) => {
        if (err) {
          console.log("error", err);
        }
        console.log(result);
      },
      { timeout: 5000 }
    );
})

app.listen(port, host, () => {
    console.log(`Server on ${host}:${port}`)
})
