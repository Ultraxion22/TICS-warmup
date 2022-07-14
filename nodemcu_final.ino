#include <ESP8266WiFi.h>
#include <SoftwareSerial.h>
 
String apiKey = "GM1U83A3GPYT4X3W";     //  Enter your Write API key from ThingSpeak
 
const char *ssid =  "antonio";     // replace with your wifi ssid and wpa2 key
const char *pass =  "lolito100";
const char *server = "api.thingspeak.com";
char c;
String dataIn;
String result;
char c2;
String dataIn2;
String result2;

int mq135 = A0; // smoke sensor is connected with the analog pin A0 
int data = 0; 

SoftwareSerial NodeMcu_SoftSerial(D5,D6);
SoftwareSerial NodeMcu_SoftSerial2(D1,D2);
WiFiClient client;
 
void setup() 
{
       Serial.begin(115200);
       delay(10);
       NodeMcu_SoftSerial.begin(9600);
       NodeMcu_SoftSerial2.begin(9600);
       Serial.println("Connecting to ");
       Serial.println(ssid);
 
 
       WiFi.begin(ssid, pass);
 
      while (WiFi.status() != WL_CONNECTED) 
     {
            delay(500);
            Serial.print(".");
     }
      Serial.println("");
      Serial.println("WiFi connected");
 
}
 
void loop() 
{
  data = analogRead(mq135); 
  while(NodeMcu_SoftSerial.available()>0)
  {
    c = NodeMcu_SoftSerial.read();
    if(c=='\n'){
      break;
    }
    else{
      dataIn+=c;
    }
  }

  if(c=='\n')
  {
    result = dataIn;
    c=0;
    dataIn="";
  }
  while(NodeMcu_SoftSerial2.available()>0)
  {
    c2 = NodeMcu_SoftSerial2.read();
    if(c2=='\n'){
      break;
    }
    else{
      dataIn2+=c2;
    }
  }

  if(c2=='\n')
  {
    result2 = dataIn2;
    c2=0;
    dataIn2="";
  }
  if (client.connect(server,80))   //   "184.106.153.149" or api.thingspeak.com
  {  
                            
                             String postStr = apiKey;
                             postStr +="&field1=";
                             postStr += String(result);
                             postStr +="&field2=";
                             postStr += String(result2);
                             postStr +="&field3=";
                             postStr += String(data);
                             postStr += "\r\n\r\n";
 
                             client.print("POST /update HTTP/1.1\n");
                             client.print("Host: api.thingspeak.com\n");
                             client.print("Connection: close\n");
                             client.print("X-THINGSPEAKAPIKEY: "+apiKey+"\n");
                             client.print("Content-Type: application/x-www-form-urlencoded\n");
                             client.print("Content-Length: ");
                             client.print(postStr.length());
                             client.print("\n\n");
                             client.print(postStr);
 
                             //Serial.println(result);
                             //Serial.println(result2);
                             Serial.println(data);
                             
                        }
          client.stop();
  result = "";
  result2 = "";
  // thingspeak needs minimum 15 sec delay between updates
  //delay(500);
}
