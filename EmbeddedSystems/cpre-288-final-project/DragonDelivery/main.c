
#include "adc.h"
#include "lcd.h"
#include "Timer.h"
#include <inc/tm4c123gh6pm.h>
#include <stdint.h>
#include <stdbool.h>
#include "driverlib/interrupt.h"
#include "cyBot_Scan.h"
#include <Math.h>
#include "movement.h"
#include "uart.h"
#include "open_interface.h"
#include "main.h"
#include "ping.h"
#include "servo.h"

int main(void) {

    timer_init();
    lcd_init();
    adc_init();
    ping_initialize();
    servo_initialize();
    cyBOT_init_Scan();
    uart_init(115200);
    uart_interrupt_init();
    oi_t *sensor_data = oi_alloc();
    oi_init(sensor_data);
    oi_setWheels(0, 0);

    right_calibration_value = 332500;
    left_calibration_value = 1314150;

    servo_movement(90);

    char message[50];
    float distanceDetected;
    char m = uart_receive();
    if (m == 'm')
    {

        int smallestAngle = 0;             //finding which value is the smallest
        smallestAngle = scan();
        int angle = smallestAngle;
        servo_movement(angle);

        if (uart_data == 't')
        {
            while (1)
            {
                servo_movement(90);
                distanceDetected = 34000 * (ping_read() / 16000000.0) / 2;
                sprintf(message, "Distance (cm)");
                sendString(message);
                sprintf(message, "%f\n\r", distanceDetected);
                sendString(message);
                oi_setWheels(0, 0);
                char c = uart_receive();
                if (c == 'w')
                {
                    move_forward(sensor_data, 30);
                }
                else if (c == 'a')
                {
                    turn_counterclockwise(sensor_data, 10);
                }
                else if (c == 's')
                {
                    move_backward(sensor_data, 30);
                }
                else if (c == 'd')
                {
                    turn_clockwise(sensor_data, 10);
                }
                else if (c == 'f')
                {
                    break;
                }
            }
        } //cyBot scans in order to point the sensor at the correct smallest width

        if (uart_data == 'f')
        {
            uart_data = 'l';
            oi_setWheels(0, 0);
            angle = scan();  //rescan for smallest object if moved manually
            if (angle > 90)
            {
                turn_counterclockwise(sensor_data, (angle - 90)); //turn the difference of the angle counterclockwise
            }
            else
            {
                turn_clockwise(sensor_data, (90 - angle)); //turn the difference of the angle clockwise
            }
        }
        else
        {
            if (angle > 90)
            {
                turn_counterclockwise(sensor_data, (angle - 90)); //turn the difference of the angle counterclockwise
            }
            else
            {
                turn_clockwise(sensor_data, (90 - angle)); //turn the difference of the angle clockwise
            }
        }
        distanceDetected = adc_read();
        distanceDetected = (191735 * pow(distanceDetected, -1.252));

        while (distanceDetected > 5)
        {

            if (uart_data == 't')           //switches to manual
            {
                while (1)
                {
                    servo_movement(90);                   //faces sensor forward
                    distanceDetected = adc_read();
                    distanceDetected = (191735 * pow(distanceDetected, -1.252));

                    sprintf(message, "Distance (cm)");           //prints header
                    sendString(message);
                    sprintf(message, "%f\n\r", distanceDetected);
                    sendString(message);
                    oi_setWheels(0, 0);

                    char c = uart_receive();
                    if (c == 'w')
                    {
                        move_forward(sensor_data, 30);
                    }
                    else if (c == 'a')
                    {
                        turn_counterclockwise(sensor_data, 10);
                    }
                    else if (c == 's')
                    {
                        move_backward(sensor_data, 30);
                    }
                    else if (c == 'd')
                    {
                        turn_clockwise(sensor_data, 10);
                    }
                    else if (c == 'f')
                    {

                        break;
                    }
                }
            }

            if (uart_data == 'f')
            {
                uart_data = 'j';
                oi_setWheels(0, 0);
                angle = scan();
                if (angle > 90)
                {
                    turn_counterclockwise(sensor_data, (angle - 90)); //turn the difference of the angle counterclockwise
                }
                else
                {
                    turn_clockwise(sensor_data, (90 - angle)); //turn the difference of the angle clockwise
                }
            }
            if (flag == '1')
            {
                angle = scan();
                if (angle > 90)
                {
                    turn_counterclockwise(sensor_data, (angle - 90)); //turn the difference of the angle counterclockwise
                }
                else
                {
                    turn_clockwise(sensor_data, (90 - angle)); //turn the difference of the angle clockwise
                }
                flag = '0';
            }
            move_forward(sensor_data, 50);
            servo_movement(90); //go forward while sensor detects it is less than 5 cm away
            distanceDetected = adc_read();
            distanceDetected = (191735 * pow(distanceDetected, -1.252));
        }
    }
    oi_setWheels(0, 0);    //stop

    return 0;
}

void sendString(char str[]) {                 //method to print to putty
    int i;
    for (i = 0; i < strlen(str); i++)
    {
        uart_sendChar(str[i]);
    }
}

int scan() {

    int m;
    char message[50];
    double e;
    double f;
    double IR_dist_avg[90];
    int midAngle[45];
    int angleMeasure[45];
    int objectCounter = 0;
    // cyBOT_Scan_t x;
    int i;
    int j;
    int c = 0;
    int a1 = -1;
    int a2 = -1;
    int smallestIndex = 0;

    sprintf(message, "Degrees\t\tAverage Distance (cm)\n\r"); //prints the message on putty
    sendString(message);
    m = 0;
    for (i = 0; i <= 180; i += 2)
    {
        servo_movement(i);

        j = adc_read();
        e = (191735 * pow(j, -1.252));

        IR_dist_avg[m] = e;
        timer_waitMillis(2);

        sprintf(message, "%d\t\t%f\n\r", i, IR_dist_avg[m]); //prints it on putty
        sendString(message);
        m++;
    }

    i = 0;
    for (m = 0; m < 90; m++)
    {
        if (a1 < 0 && IR_dist_avg[m] <= 70)
        {
            a1 = i;
            a2 = -1; //find first angle  makes sure angle 2 is less than 0
        }
        if (a1 >= 0 && IR_dist_avg[m] > 70)
        {
            a2 = i;
            midAngle[c] = a1 + (a2 - a1) / 2; //calculates mid angle,
            angleMeasure[c] = a2 - a1;
            a1 = -1;
            c++;
            objectCounter++; // increments indexes for midAngle and object counter

        }
        i += 2;
    }

    if (a1 >= 0 && m >= 90)
    { //if in the middle of scaning object and hits 180 sets a2 to 180 and finds middle of that one
        a2 = 180;
        midAngle[c] = (a2 - a1) / 2;
        a1 = -1;
        c++;
        objectCounter++;
    }

    int smallestAngle = angleMeasure[0];
    sprintf(message, "Object Midpoints \n\r");     //prints the message on putty
    sendString(message);
    for (c = 0; c < objectCounter; c++)
    {
        servo_movement(midAngle[c]);
        j = adc_read();
        f = (191735 * pow(j, -1.252));
        sprintf(message, "%d\t%f\n\r", midAngle[c], f);
        sendString(message);
    }

    for (c = 0; c < objectCounter; c++)
    {
        if (smallestAngle < angleMeasure[c])
        {
            smallestIndex = c;
        }
    }

    return midAngle[smallestIndex];
}


