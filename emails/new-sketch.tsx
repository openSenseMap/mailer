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

  interface Sensor {
    _id: string
    title: string
    sensorType: string
  }
  
  interface Device {
    _id: string
    name: string
    sensors: Sensor[]
  }
  
  interface NewSketchProps {
    user: User,
    device: Device
  }
  
  const baseUrl = process.env.OSEM_URL
    ? `https://${process.env.OSEM_URL}`
    : 'https://opensensemap.org';
  
  export const NewSketchEmail = ({user = {name: "Max Mustermann"}, device = {_id: "1234567890", name: "senseBox Test Gerät", sensors: [{_id: "9876543210", title: "Temperatur", sensorType: "HDC1080"}]}}: NewSketchProps) => (
    <Html lang="de" dir="ltr">
      <Head />
      <Preview>Dein neuer Sketch</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Dein neuer Sketch</Heading>
          <Text>Hallo {user.name},</Text>
          <Text>du hast gerade das Modell oder die Sensoren deiner Wetterstation auf der openSenseMap geändert. Deswegen schicken wir dir hier einen aktualisierten Arduino-Sketch, den du im Anhang findest.</Text>
          <Heading as="h4">Achtung!</Heading>
          <Text>Der Sketch im Anhang befindet sich im Rohzustand. Das bedeutet:</Text>
          <ul>
            <li>Netzwerkeinstellungen für Wifi oder statische Ethernetkonfigurationen müssen vom alten Sketch übernommen werden.</li>
            <li>Jegliche Änderungen für zum Beispiel: andere Sensoren müssen vom alten Sketch übernommen werden.</li>
            <li>Jede andere Änderung ist nicht enthalten!</li>
          </ul>
          <Text>Deine senseBox-ID lautet: <b>{ device._id }</b></Text>
          <Text>Außerdem wurden die folgenden IDs für die Sensoren deiner Station generiert:</Text>
          <ul>
            {device.sensors.map(sensor => (
                <li>{sensor.title} ({sensor.sensorType}): {sensor._id}</li>
            ))}
          </ul>
          <Text>
            Wenn Du Fragen hast schreib uns eine Mail an: { }
            <Link
                href={`mailto:support@sensebox.de?Subject=Neuer%20Sketch%20Box-Id%20${ device._id }`}
            >
                support@sensebox.de
            </Link>
          </Text>
          <Text>Viel Spaß wünscht dein openSenseMap Team</Text>
        </Container>
      </Body>
    </Html>
  );
  
  export default NewSketchEmail;
  
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
  