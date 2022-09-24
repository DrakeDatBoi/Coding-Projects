/*
 * movement.c
 *
 *  Created on: Sep 8, 2021
 *      Author: trolston
 */
#include "movement.h"

void move_forward(oi_t *sensor, double centimeters){

    oi_setWheels(100, 100);
    double sum = 0;
    while(abs(sum) <= abs(centimeters * 10)){
        oi_update(sensor);
        sum += sensor->distance;
        lcd_printf("%f", sum);
        if(sensor->bumpLeft){
            uart_sendStr("hit object on left\n\r");
            move_backward(sensor,15);
            turn_clockwise(sensor,80);
            move_forward(sensor,25);
            turn_anticlockwise(sensor,80);
            move_forward(sensor,15);
            oi_update(sensor);
            sum = sum - 100;
            oi_setWheels(100, 100);
            uart_sendStr("finished maneuver\n\r");
        }
        if(sensor->bumpRight){
            uart_sendStr("hit object on right\n\r");
            move_backward(sensor,15);
            turn_anticlockwise(sensor,80);
            move_forward(sensor,25);
            turn_clockwise(sensor,80);
            move_forward(sensor,15);
            oi_update(sensor);
            sum = sum - 100;
            oi_setWheels(100, 100);
            uart_sendStr("finished maneuver\n\r");
        }
    }
    oi_setWheels(0,0);
}

void move_backward(oi_t *sensor, double centimeters){

    oi_setWheels(-100, -100);
    double sum = 0;
    while( abs(sum) < abs(centimeters * 10)){
        oi_update(sensor);
        sum += sensor->distance;
        lcd_printf("%f", sum);
    }
    oi_setWheels(0,0);

}



void turn_clockwise(oi_t *sensor, double degrees){
//turn left specified degrees
    oi_setWheels(-20, 20);
       double sum = 0;
       while(abs(sum) < abs(degrees)){
           oi_update(sensor);
           sum += sensor->angle;
           lcd_printf("%f", sum);
       }
       oi_setWheels(0,0);
}

void turn_anticlockwise(oi_t *sensor, double degrees){

    oi_setWheels(20, -20);
    double sum = 0;
    while(abs(sum) < abs(degrees)){
        oi_update(sensor);
        sum += sensor->angle;
        lcd_printf("%f", sum);
    }
    oi_setWheels(0,0);

}
