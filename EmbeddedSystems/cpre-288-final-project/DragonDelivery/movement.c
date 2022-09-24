/*
 * movement.c
 *
 *  Created on: Sep 8, 2021
 *      Author: ridgeway
 */

#include "movement.h"
#include "open_interface.h"
#include "lcd.h"
#include "uart.h"
#include "driverlib/interrupt.h"
#include "adc.h"


void move_forward(oi_t *sensor_data, int centimeters){  //Method to move the roomba forward

        double sum = 0;
        oi_setWheels(100, 100); // move forward; full speed
        while (sum < centimeters) {  //moves until 50 centimeters is traveled
        oi_update(sensor_data);
        if (sensor_data->bumpLeft || sensor_data->bumpRight){
            sensor(sensor_data);
            oi_setWheels(100, 100);
        }

        sum += sensor_data->distance;  //points at distance
        }

        oi_setWheels(0, 0); // stop
}

void move_backward(oi_t *sensor_data, int centimeters){  //Method to move the roomba backwards

        double sum = 0;
        oi_setWheels(-100, -100); // move backward; full speed
        while (-sum < centimeters) {  //moves until 50 centimeters is traveled
        oi_update(sensor_data);
        sum += sensor_data->distance;  //points at distance

        }

        oi_setWheels(0, 0); // stop
}

void turn_clockwise(oi_t *sensor_data, int degrees){  //Method to turn the roomba clockwise

           double sum = 0;
           while (-sum < degrees) {  //turns until 90 degrees is covered
               oi_setWheels(-50, 50); // turns clockwise
               oi_update(sensor_data);
               sum += sensor_data->angle;  //points at angle
           }

           oi_setWheels(0, 0); //stop
}
void turn_counterclockwise(oi_t *sensor_data, int degrees){  //Method to turn the roomba counterclockwise

           double sum = 0;
           while (sum < degrees) {  //turns until 90 degrees is covered
               oi_setWheels(50, -50); // turns counterclockwise
               oi_update(sensor_data);
               sum += sensor_data->angle;  //points at angle
           }

           oi_setWheels(0, 0); //stop
}

void sensor(oi_t *sensor_data){  //Method to detect which bumper goes off and executes the "evasive maneuvers"

    oi_update(sensor_data); // get current state of all sensors

    if (sensor_data->bumpLeft) {                     //If statement when left bumper gets triggered
        move_backward(sensor_data, 100);
        turn_clockwise(sensor_data, 85);
        move_forward(sensor_data, 250);
        turn_counterclockwise(sensor_data, 85);
        flag = '1';
    }

    if (sensor_data->bumpRight) {                    //If statement when right bumper gets triggered

       move_backward(sensor_data, 100);
       turn_counterclockwise(sensor_data, 85);
       move_forward(sensor_data, 250);
       turn_clockwise(sensor_data, 85);
       flag = '1';
    }

}



