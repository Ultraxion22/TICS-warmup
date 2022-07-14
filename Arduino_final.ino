#include <SoftwareSerial.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#define DHTPIN 2
#define DHTTYPE    DHT22  

int soundsens = 0;
int mq135 = 0;

SoftwareSerial Arduino_SoftSerial(10,11);
SoftwareSerial Arduino_SoftSerial2(5,6);
DHT_Unified dht(DHTPIN, DHTTYPE);

void setup() {
Serial.begin(115200);
dht.begin();
sensor_t sensor;
dht.temperature().getSensor(&sensor);
dht.humidity().getSensor(&sensor);
Arduino_SoftSerial.begin(9600);
Arduino_SoftSerial2.begin(9600);
}
void loop() {
sensors_event_t event;
dht.temperature().getEvent(&event);
if (isnan(event.temperature)) {
    Serial.println(F("Error reading temperature!"));
  }
  else {
    Serial.println(event.temperature);
    Arduino_SoftSerial.println(event.temperature);
  }
  // Get humidity event and print its value.
  dht.humidity().getEvent(&event);
  if (isnan(event.relative_humidity)) {
    Serial.println(F("Error reading humidity!"));
  }
  else {
    Serial.println(event.relative_humidity);
  }
soundsens=analogRead(2);
mq135 = analogRead(0);
Serial.println(mq135, DEC);
Serial.println(soundsens, DEC);
Arduino_SoftSerial2.println(mq135); 

}
