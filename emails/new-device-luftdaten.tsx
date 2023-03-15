import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Text,
  } from '@react-email/components';
  import * as React from 'react';
  
  interface User {
    name: string
  }

  interface Device {
    _id: string
    name: string
  }

  interface NewDeviceLuftdatenEmailProps {
    user: User,
    device: Device
  }
  
  const baseUrl = process.env.OSEM_URL
    ? `https://${process.env.OSEM_URL}`
    : 'https://opensensemap.org';
  
  export const NewDeviceLuftdatenEmail = ({user = {name: "Max Mustermann"}, device = {_id: "1234567890", name: "Luftdaten Test Gerät"}}: NewDeviceLuftdatenEmailProps) => (
    <Html lang="de" dir="ltr">
      <Head />
      <Preview>Dein neues Gerät auf der openSenseMap</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Dein neues Gerät auf der openSenseMap</Heading>
          <Text>Hallo {user.name},</Text>
          <Text>vielen Dank für die Registrierung deines Feinstaubsensors "{device.name}" auf der openSenseMap!</Text>
          <Text>
            🎉 Damit deine Daten auch die openSenseMap erreichen, musst du noch deinen Feinstaubsensor konfigurieren. Eine Anleitung findest du unter <Link href="https://docs.sensebox.de/opensensemap/opensensemap-luftdaten/" target="_blank">https://docs.sensebox.de/opensensemap/opensensemap-luftdaten/</Link>.
          </Text>
          <Text>Vielen lieben Dank, dass du dich am Projekt beteiligst.</Text>
          <Text>Deine senseBox-ID lautet: <b>{ device._id }</b></Text>
          <Text>Du findest deine Station auf der openSenseMap unter dieser Adresse:</Text>
          <Link href={`${baseUrl}/explore/${device._id}`} target="_blank">{`${baseUrl}/explore/${device._id}`}</Link>
          <Text>
            Wenn Du Fragen hast schreib uns eine Mail an: { }
            <Link
                href={`mailto:support@sensebox.de?Subject=Hilfe%20bei%20der%20Einrichtung&body=Bitte%20bei%20jeder%20Anfrage%20die%20senseBox-ID%20(${ device._id })%20mit%20angeben.%20Danke!`}
            >
                support@sensebox.de
            </Link>
          </Text>
          <Text>Viel Spaß wünscht dein openSenseMap Team</Text>
        </Container>
      </Body>
    </Html>
  );
  
  export default NewDeviceLuftdatenEmail;
  
  const main = {
    backgroundColor: '#ffffff',
  };
  
  const container = {
    paddingLeft: '12px',
    paddingRight: '12px',
    margin: '0 auto',
  };
  
  const h1 = {
    color: '#333',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '40px 0',
    padding: '0',
  };
  
  const link = {
    color: '#2754C5',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '14px',
    textDecoration: 'underline',
  };
  
  const text = {
    color: '#333',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '14px',
    margin: '24px 0',
  };
  
  const code = {
    display: 'inline-block',
    padding: '16px 4.5%',
    width: '90.5%',
    backgroundColor: '#f4f4f4',
    borderRadius: '5px',
    border: '1px solid #eee',
    color: '#333',
  };
  